# capstone_report_AI_Chart_Builder
사용자 맞춤형 데이터 분석 효율화를 위한 AI 기반 스마트 차트 생성 웹 애플리케이션 An AI-powered web application that enables non-experts to instantly visualize uploaded data through both a manual drag-and-drop chart builder and an automated Google Gemini-based chart recommendation engine.
# Smart Chart Builder

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

> 🇰🇷 **사용자 맞춤형 데이터 분석 효율화를 위한 AI 기반 스마트 차트 생성 웹 애플리케이션**
>
> 🇻🇳 **Ứng dụng web tạo biểu đồ thông minh dựa trên AI, giúp người dùng phân tích và trực quan hóa dữ liệu một cách hiệu quả**

---

## 프로젝트 소개 · Giới thiệu dự án

🇰🇷 **Smart Chart Builder**는 CSV, Excel, JSON 형식의 데이터 파일을 업로드하면 두 가지 방식으로 즉시 차트를 생성할 수 있는 웹 기반 데이터 시각화 솔루션입니다. 전문 지식 없이도 누구나 데이터를 분석하고 시각화할 수 있도록 설계되었습니다.

🇻🇳 **Smart Chart Builder** là giải pháp trực quan hóa dữ liệu trên nền web, cho phép người dùng tải lên file CSV, Excel, JSON và tạo biểu đồ ngay lập tức theo hai cách. Ứng dụng được thiết kế để bất kỳ ai — kể cả người không có kiến thức chuyên môn — cũng có thể phân tích và trực quan hóa dữ liệu của mình.

- 🇰🇷 **수동 모드:** 드래그 앤 드롭으로 축 변수를 선택하고 6종의 차트를 직접 커스터마이징
- 🇻🇳 **Chế độ thủ công:** Kéo thả để chọn biến trục X/Y và tùy chỉnh 6 loại biểu đồ trực tiếp

- 🇰🇷 **AI 추천 모드:** Google Gemini API가 데이터를 자동 분석하여 최적 차트 2~3종을 추천 근거와 함께 제시
- 🇻🇳 **Chế độ AI:** Google Gemini API tự động phân tích dữ liệu và đề xuất 2~3 loại biểu đồ phù hợp nhất kèm lý do

> 🇰🇷 2026학년도 SW종합설계 캡스톤디자인 · 대구대학교 컴퓨터정보공학부
>
> 🇻🇳 Đồ án Capstone Design môn SW종합설계 năm học 2026 · Khoa Kỹ thuật Thông tin Máy tính, Đại học Daegu

---

##  주요 기능 · Tính năng chính

| 🇰🇷 기능 | 🇻🇳 Tính năng | 설명 · Mô tả |
|-----------|----------------|--------------|
|  파일 업로드 | Tải file lên | CSV / Excel(.xlsx) / JSON, kéo thả · 드래그 앤 드롭 지원 |
|  데이터 미리보기 | Xem trước dữ liệu | Tự động phát hiện kiểu cột (số/danh mục/ngày) + 5 hàng đầu · 컬럼 타입 자동 감지 + 상위 5행 |
|  수동 차트 생성 | Tạo biểu đồ thủ công | Kéo thả trục, 6 loại biểu đồ, tùy chỉnh màu sắc · 드래그 앤 드롭 축 설정, 6종 차트 |
|  AI 차트 추천 | AI gợi ý biểu đồ | Gemini phân tích → 2~3 biểu đồ tối ưu + lý do · 자동 분석 + 추천 근거 |
|  일일 쿼터 | Hạn mức hàng ngày | 2 lần miễn phí/ngày · 일 2회 무료 |
|  차트 비교 뷰 | So sánh biểu đồ | AI vs thủ công cạnh nhau · AI 차트 vs 수동 차트 나란히 |
|  내보내기 | Xuất file | PNG / JPG / PDF |

---

## 화면 구성 · Giao diện màn hình

```
┌─────────────────────────────────────────────────────────────────┐
│   스마트 차트 빌더 · Smart Chart Builder    │  AI 잔여: 2회  │
├──────────────┬────────────────────────────┬─────────────────────┤
│ 🇰🇷 데이터소스 │   [수동모드] [AI추천모드]  │   AI 추천 결과   │
│ 🇻🇳 Nguồn DL  │   🇻🇳 [Thủ công] [AI]      │  🇻🇳 Gợi ý AI       │
│               │                            │                     │
│  파일 목록    │   차트 유형 선택           │  ① 막대차트  ★     │
│  Danh sách    │   Chọn loại biểu đồ        │  ② 꺾은선차트       │
│               │                            │  ③ 영역차트         │
│  + 업로드     │   X축 / Y축 설정           │                     │
│  + Tải lên    │   Trục X / trục Y          │  [AI 추천 실행]     │
│               │                            │  [Chạy AI]          │
│               │   [차트 미리보기]          │  잔여: ██░ 1/2     │
│               │   [Xem trước biểu đồ]      │  Còn lại: 1/2      │
└──────────────┴────────────────────────────┴─────────────────────┘
```

---

##  기술 스택 · Công nghệ sử dụng

### 🇰🇷 프론트엔드 · 🇻🇳 Frontend

| 기술 · Công nghệ | 버전 · Phiên bản | 용도 · Mục đích |
|------------------|------------------|-----------------|
| React.js | 18.x | UI 컴포넌트 · Xây dựng giao diện |
| Vite | 5.x | 빌드 도구 · Công cụ build |
| Chart.js | 4.x | 차트 렌더링 · Vẽ biểu đồ |
| @dnd-kit/core | 6.x | 드래그 앤 드롭 · Kéo thả |
| axios | 1.x | API 통신 · Gọi API |
| html2canvas | 1.x | 차트 캡처 · Chụp màn hình biểu đồ |
| jsPDF | 2.x | PDF 내보내기 · Xuất PDF |

### 🇰🇷 백엔드 · 🇻🇳 Backend

| 기술 · Công nghệ | 버전 · Phiên bản | 용도 · Mục đích |
|------------------|------------------|-----------------|
| Python | 3.11+ | 언어 · Ngôn ngữ lập trình |
| FastAPI | 0.100+ | REST API 서버 · Server API |
| pandas | 2.x | 데이터 파싱 · Phân tích dữ liệu |
| google-generativeai | 0.7+ | Gemini API 연동 · Kết nối Gemini |
| SQLite | 3 | 쿼터 관리 DB · Quản lý hạn mức |
| uvicorn | 0.x | ASGI 서버 · Server ASGI |

### 🇰🇷 배포 · 🇻🇳 Triển khai

| 서비스 · Dịch vụ | 용도 · Mục đích |
|------------------|-----------------|
| Vercel | 프론트엔드 배포 · Triển khai frontend |
| Render | 백엔드 배포 · Triển khai backend |
| GitHub | 버전 관리 및 협업 · Quản lý phiên bản |

---

##  프로젝트 구조 · Cấu trúc dự án

```
smart-chart-builder/
│
├── frontend/                        # 🇰🇷 React 앱 · 🇻🇳 Ứng dụng React
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx       # 파일 업로드 · Tải file lên
│   │   │   ├── DataPreview.jsx      # 데이터 미리보기 · Xem trước dữ liệu
│   │   │   ├── ManualChart.jsx      # 수동 차트 빌더 · Tạo biểu đồ thủ công
│   │   │   ├── AiPanel.jsx          # AI 추천 패널 · Bảng gợi ý AI
│   │   │   └── ExportPanel.jsx      # 내보내기 · Xuất file
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                         # 🇰🇷 FastAPI 서버 · 🇻🇳 Server FastAPI
│   ├── main.py                      # 메인 앱 · Ứng dụng chính
│   ├── requirements.txt             # 의존성 목록 · Danh sách thư viện
│   ├── quota.db                     # SQLite DB (자동 생성 · tự tạo)
│   └── .env                         # 환경변수 (미포함 · không đưa lên Git)
│
├── .gitignore
└── README.md
```

---

##  로컬 실행 방법 · Hướng dẫn chạy trên máy

### 1. 🇰🇷 저장소 클론 · 🇻🇳 Clone dự án về máy

```bash
git clone https://github.com/본인아이디/smart-chart-builder.git
cd smart-chart-builder
```

### 2. 🇰🇷 환경변수 설정 · 🇻🇳 Cấu hình biến môi trường

🇰🇷 `backend/.env` 파일을 생성하고 아래 내용을 입력합니다.

🇻🇳 Tạo file `backend/.env` và điền nội dung sau:

```env
GEMINI_API_KEY=여기에_Gemini_API_키_입력
gen-lang-client-0647249111
```

> 🇰🇷 **Gemini API 키 발급:** https://aistudio.google.com 에서 무료 발급
>
> 🇻🇳 **Lấy Gemini API key miễn phí tại:** https://aistudio.google.com

### 3. 🇰🇷 백엔드 실행 · 🇻🇳 Chạy Backend

```bash
cd backend

# 🇰🇷 가상환경 생성 및 활성화 · 🇻🇳 Tạo và kích hoạt môi trường ảo
python -m venv venv
source venv/bin/activate          # Mac / Linux
# venv\Scripts\activate           # Windows

# 🇰🇷 패키지 설치 · 🇻🇳 Cài đặt thư viện
pip install -r requirements.txt

# 🇰🇷 서버 실행 · 🇻🇳 Khởi động server
uvicorn main:app --reload
```

🇰🇷 서버 주소: `http://localhost:8000` · API 문서: `http://localhost:8000/docs`

🇻🇳 Địa chỉ server: `http://localhost:8000` · Tài liệu API: `http://localhost:8000/docs`

### 4. 🇰🇷 프론트엔드 실행 · 🇻🇳 Chạy Frontend

```bash
# 🇰🇷 새 터미널에서 · 🇻🇳 Mở terminal mới
cd frontend

# 🇰🇷 패키지 설치 · 🇻🇳 Cài đặt thư viện
npm install

# 🇰🇷 개발 서버 실행 · 🇻🇳 Khởi động server phát triển
npm run dev
```

🇰🇷 접속 주소: `http://localhost:5173`

🇻🇳 Truy cập tại: `http://localhost:5173`

---

##  API 명세 · Tài liệu API

### `POST /api/upload` — 🇰🇷 파일 업로드 · 🇻🇳 Tải file lên

🇰🇷 **Request:** `multipart/form-data` — `file` 필드에 데이터 파일 첨부

🇻🇳 **Request:** `multipart/form-data` — đính kèm file dữ liệu vào trường `file`

**Response:**
```json
{
  "columns": [
    { "name": "월",  "type": "date" },
    { "name": "매출", "type": "numeric" },
    { "name": "지역", "type": "categorical" }
  ],
  "preview": [...],
  "rows": 1248
}
```

---

### `POST /api/ai-recommend` — 🇰🇷 AI 차트 추천 · 🇻🇳 AI gợi ý biểu đồ

**Response:**
```json
{
  "charts": [
    {
      "type": "bar",
      "title": "지역별 월간 매출 · Doanh thu theo tháng và khu vực",
      "x": "월",
      "y": "매출",
      "reason": "범주형 데이터 비교에 최적화된 차트입니다.",
      "score": 0.92
    },
    {
      "type": "line",
      "title": "월별 매출 추세 · Xu hướng doanh thu theo tháng",
      "x": "월",
      "y": "매출",
      "reason": "시계열 데이터의 추세 파악에 적합합니다.",
      "score": 0.85
    }
  ],
  "remaining": 1
}
```

🇰🇷 **쿼터 초과 시 에러:** `429 - "일일 사용 한도 초과"`

🇻🇳 **Lỗi khi vượt hạn mức:** `429 - "일일 사용 한도 초과"`

---

## AI 동작 원리 · Nguyên lý hoạt động của AI

```
🇰🇷 사용자 파일 업로드          🇻🇳 Người dùng tải file lên
           ↓
🇰🇷 FastAPI — pandas로 파싱     🇻🇳 FastAPI phân tích bằng pandas
  ├── 컬럼 타입 감지            ├── Phát hiện kiểu cột
  ├── 통계 요약 생성            ├── Tạo thống kê tóm tắt
  └── 샘플 3행 추출             └── Lấy 3 hàng mẫu
           ↓
🇰🇷 구조화된 프롬프트 → Gemini  🇻🇳 Prompt có cấu trúc → Gemini
           ↓
🇰🇷 Gemini — 데이터 패턴 분석  🇻🇳 Gemini phân tích mẫu dữ liệu
  └── 최적 차트 2~3종 → JSON   └── 2~3 biểu đồ tối ưu → JSON
           ↓
🇰🇷 FastAPI — 파싱 + 쿼터 차감 🇻🇳 FastAPI xử lý + trừ hạn mức
           ↓
🇰🇷 React — 차트 카드 렌더링   🇻🇳 React hiển thị thẻ biểu đồ
```

---

##  팀 구성 · Thành viên nhóm

| 구분 · Vai trò | 성명 · Họ tên | 학과 · Ngành | 학번 · MSSV | 담당 · Phụ trách |
|----------------|----------------|--------------|-------------|------------------|
| 팀장 · Trưởng nhóm | 찌에우 티 홍 응옥 | 컴퓨터소프트웨어전공 | 22300525 | 프론트엔드 개발, React UI, UX 설계 · Phát triển frontend |
| 팀원 · Thành viên | 김건우 | 일본어일본학과 | 22101627 | 백엔드 개발, Gemini API 연동, 쿼터 시스템 · Phát triển backend |

🇰🇷 **지도교수:** 장중혁 교수님 (컴퓨터정보공학부)

🇻🇳 **Giáo sư hướng dẫn:** GS. 장중혁 (Khoa Kỹ thuật Thông tin Máy tính)

🇰🇷 **연계 기관:** 경북게임콘텐츠산업협회 · 경북TP · 경상북도콘텐츠진흥원

🇻🇳 **Cơ quan liên kết:** Hiệp hội Nội dung Game Gyeongbuk · Gyeongbuk TP · Trung tâm Xúc tiến Nội dung Gyeongsangbuk-do

---

## 개발 일정 · Lịch trình phát triển

| 기간 · Thời gian | 🇰🇷 내용 | 🇻🇳 Nội dung |
|------------------|----------|--------------|
| 3월 1,2주 · Tuần 1,2 tháng 3 | 환경 설정, Gemini API 키 발급 | Cài đặt môi trường, lấy API key Gemini |
| 3월 3,4주 · Tuần 3,4 tháng 3 | FastAPI 서버, 파일 파싱 모듈 | Server FastAPI, module phân tích file |
| 4월 1주 · Tuần 1 tháng 4     | React 레이아웃, 파일 업로드 UI | Layout React, UI tải file |
| 4월 2주 · Tuần 2 tháng 4     | 수동 모드 차트 빌더 완성 | Hoàn thiện chế độ biểu đồ thủ công |
| 4월 3,4주 · Tuần 3,4 tháng 4 | Gemini AI 연동, 쿼터 시스템 | Kết nối Gemini AI, hệ thống hạn mức |
| 5월 1,2주 · Tuần 1,2 tháng 5 | AI 추천 UI, 비교 뷰, 내보내기 | UI gợi ý AI, so sánh, xuất file |
| 5월 3,4주 · Tuần 3,4 tháng 5 | 통합 테스트 및 버그 수정 | Kiểm thử tổng hợp và sửa lỗi |
| 6월 1주 · Tuần 1 tháng 6 | 배포(Vercel + Render), 최종 보고서 | Triển khai (Vercel + Render), báo cáo cuối |

---

## 기대 효과 · Hiệu quả mong đợi

| 🇰🇷 기대 효과 | 🇻🇳 Hiệu quả |
|----------------|--------------|
| 데이터 시각화 진입장벽 제거 | Xóa bỏ rào cản trực quan hóa dữ liệu |
| AI 자동 추천으로 설정 시간 80% 단축 | Giảm 80% thời gian cấu hình nhờ AI tự động |
| AI가 숨겨진 데이터 패턴 발견 | AI phát hiện các mẫu dữ liệu ẩn |
| 고가 도구(Tableau 등) 대체 | Thay thế các công cụ đắt tiền như Tableau |
| 교육용 데이터 리터러시 도구 | Công cụ học tập về data literacy |

---

## 라이선스 · Giấy phép

🇰🇷 이 프로젝트는 [MIT License](LICENSE)를 따릅니다.

🇻🇳 Dự án này sử dụng [MIT License](LICENSE).

---

##  관련 링크 · Liên kết

| 🇰🇷 항목 | 🇻🇳 Mục | URL |
|----------|---------|-----|
| 배포 주소 · Trang web | Frontend (Vercel) | `https://smart-chart-builder.vercel.app` *(배포 후 업데이트)* |
| 백엔드 API · Backend API | Render | `https://smart-chart-api.onrender.com` *(배포 후 업데이트)* |
| API 문서 · Tài liệu API | Swagger UI | `https://smart-chart-api.onrender.com/docs` *(배포 후 업데이트)* |

---

<div align="center">

**대구대학교 컴퓨터정보공학부 · Khoa KTTTMT, Đại học Daegu**

**2026학년도 SW종합설계 · Đồ án SW종합설계 năm học 2026**

Made with  by **찌에우 티 홍 응옥** 

</div>
