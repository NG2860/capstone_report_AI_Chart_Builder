from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import io
import json
import sqlite3
import os
from datetime import date
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

app = FastAPI(title="Smart Chart Builder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
gemini_client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

DAILY_LIMIT = 2
DB_PATH = os.path.join(os.path.dirname(__file__), "quota.db")


def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS quota (
            ip   TEXT,
            date TEXT,
            count INTEGER DEFAULT 0,
            PRIMARY KEY (ip, date)
        )
    """)
    conn.commit()
    conn.close()


init_db()


def check_and_use_quota(ip: str) -> int:
    today = str(date.today())
    conn = sqlite3.connect(DB_PATH)
    row = conn.execute(
        "SELECT count FROM quota WHERE ip=? AND date=?", (ip, today)
    ).fetchone()
    current = row[0] if row else 0
    if current >= DAILY_LIMIT:
        conn.close()
        raise HTTPException(status_code=429, detail="일일 사용 한도 초과 (2회/일)")
    new_count = current + 1
    conn.execute(
        """INSERT INTO quota (ip, date, count) VALUES (?, ?, ?)
           ON CONFLICT(ip, date) DO UPDATE SET count=excluded.count""",
        (ip, today, new_count),
    )
    conn.commit()
    conn.close()
    return DAILY_LIMIT - new_count


def detect_column_type(series: pd.Series) -> str:
    if pd.api.types.is_numeric_dtype(series):
        return "numeric"
    try:
        pd.to_datetime(series.dropna().head(20), infer_datetime_format=True)
        return "date"
    except Exception:
        return "categorical"


def parse_file(file_bytes: bytes, filename: str) -> pd.DataFrame:
    ext = filename.rsplit(".", 1)[-1].lower()
    if ext == "csv":
        return pd.read_csv(io.BytesIO(file_bytes))
    elif ext in ("xlsx", "xls"):
        return pd.read_excel(io.BytesIO(file_bytes))
    elif ext == "json":
        return pd.read_json(io.BytesIO(file_bytes))
    raise HTTPException(status_code=400, detail="지원하지 않는 파일 형식 (CSV, Excel, JSON만 가능)")


def build_summary(df: pd.DataFrame) -> dict:
    summary: dict = {"rows": len(df), "columns": {}}
    for col in df.columns:
        s = df[col]
        col_type = detect_column_type(s)
        info: dict = {"type": col_type, "nulls": int(s.isna().sum())}
        if col_type == "numeric":
            info["min"] = float(s.min()) if not s.isna().all() else None
            info["max"] = float(s.max()) if not s.isna().all() else None
            info["mean"] = round(float(s.mean()), 4) if not s.isna().all() else None
        elif col_type == "categorical":
            info["unique"] = int(s.nunique())
            info["top"] = {str(k): int(v) for k, v in s.value_counts().head(3).items()}
        summary["columns"][col] = info
    return summary


def clean_gemini_json(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        parts = text.split("```")
        text = parts[1] if len(parts) > 1 else text
        if text.startswith("json"):
            text = text[4:]
    return text.strip()


# ── API Endpoints ──────────────────────────────────────────────


@app.get("/")
def root():
    return {"status": "ok", "message": "Smart Chart Builder API"}


@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    try:
        df = parse_file(content, file.filename or "upload.csv")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"파일 파싱 오류: {e}")

    columns = [{"name": col, "type": detect_column_type(df[col])} for col in df.columns]
    preview = df.head(5).replace({np.nan: None}).to_dict(orient="records")
    summary = build_summary(df)

    return {"columns": columns, "preview": preview, "summary": summary, "rows": len(df)}


@app.post("/api/ai-recommend")
async def ai_recommend(request: Request, file: UploadFile = File(...)):
    ip = request.client.host if request.client else "unknown"
    content = await file.read()
    try:
        df = parse_file(content, file.filename or "upload.csv")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"파일 파싱 오류: {e}")

    remaining = check_and_use_quota(ip)

    summary = build_summary(df)
    sample = df.head(3).replace({np.nan: None}).to_dict(orient="records")

    prompt = f"""You are a data visualization expert.
Analyze this dataset and recommend 2-3 optimal chart types.

Dataset info:
- Rows: {summary['rows']}
- Columns: {json.dumps(summary['columns'], ensure_ascii=False)}
- Sample (3 rows): {json.dumps(sample, ensure_ascii=False, default=str)}

Return ONLY a valid JSON array (no markdown fences, no explanation):
[
  {{
    "type": "bar|line|pie|scatter|area",
    "title": "chart title",
    "x": "x-axis column name",
    "y": "y-axis column name",
    "reason": "Why this chart is optimal (1-2 sentences in Korean)",
    "score": 0.0
  }}
]"""

    if not gemini_client:
        raise HTTPException(status_code=503, detail="GEMINI_API_KEY가 설정되지 않았습니다.")

    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        charts = json.loads(clean_gemini_json(response.text))
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Gemini 응답 파싱 오류: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API 오류: {e}")

    return {"charts": charts, "remaining": remaining}


class StoryRequest(BaseModel):
    chart_type: str
    x_column: str
    y_column: str
    title: str
    data_summary: dict
    sample_data: list
    language: str = "ko"


@app.post("/api/storytelling")
async def storytelling(req: StoryRequest):
    lang = "Korean" if req.language == "ko" else "English"

    prompt = f"""You are a data storytelling expert. Respond entirely in {lang}.

Chart: {req.chart_type} — {req.title}
X-axis: {req.x_column} | Y-axis: {req.y_column}
Data summary: {json.dumps(req.data_summary, ensure_ascii=False, default=str)}
Sample data: {json.dumps(req.sample_data, ensure_ascii=False, default=str)}

Return ONLY a valid JSON object (no markdown fences):
{{
  "story": "2-3 sentence narrative insight about the data",
  "insights": [
    {{"label": "short label", "value": "key metric or value", "type": "positive|negative|neutral"}},
    {{"label": "short label", "value": "key metric or value", "type": "positive|negative|neutral"}},
    {{"label": "short label", "value": "key metric or value", "type": "positive|negative|neutral"}}
  ],
  "recommendation": "1 actionable recommendation based on the data"
}}"""

    if not gemini_client:
        raise HTTPException(status_code=503, detail="GEMINI_API_KEY가 설정되지 않았습니다.")

    try:
        response = gemini_client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        result = json.loads(clean_gemini_json(response.text))
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Gemini 응답 파싱 오류: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API 오류: {e}")

    return result
