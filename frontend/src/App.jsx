import { useState } from 'react'
import axios from 'axios'
import FileUpload  from './components/FileUpload'
import DataPreview from './components/DataPreview'
import ManualChart from './components/ManualChart'
import AiPanel     from './components/AiPanel'
import StoryPanel  from './components/StoryPanel'

const API = 'http://localhost:8000'

export default function App() {
  const [columns,     setColumns]     = useState([])
  const [preview,     setPreview]     = useState([])
  const [dataSummary, setDataSummary] = useState({})
  const [file,        setFile]        = useState(null)
  const [aiCharts,    setAiCharts]    = useState([])
  const [remaining,   setRemaining]   = useState(2)
  const [loading,     setLoading]     = useState(false)
  const [chartConfig, setChartConfig] = useState(null)

  const handleUpload = async (f) => {
    setFile(f)
    const fd = new FormData()
    fd.append('file', f)
    try {
      const res = await axios.post(`${API}/api/upload`, fd)
      setColumns(res.data.columns)
      setPreview(res.data.preview)
      setDataSummary(res.data.summary) // lưu summary
    } catch (e) {
      alert('파일 업로드 실패: ' + (e.response?.data?.detail || e.message))
    }
  }

  const handleAiRecommend = async () => {
    if (!file) return
    setLoading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await axios.post(`${API}/api/ai-recommend`, fd)
      setAiCharts(res.data.charts)
      setRemaining(res.data.remaining)
    } catch (e) {
      alert(e.response?.data?.detail || '오류 발생')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <span className="logo">📊 스마트 차트 빌더</span>
        <nav className="nav">
          <a>프로젝트</a>
          <a>데이터셋</a>
          <a>차트</a>
          <a>내보내기</a>
        </nav>
        <span className="quota">AI 잔여: {remaining}회</span>
      </header>

      <div className="body">
        {/* Sidebar: file list */}
        <aside className="sidebar">
          <FileUpload onUpload={handleUpload} />
          {preview.length > 0 && (
            <DataPreview columns={columns} preview={preview} />
          )}
        </aside>

        {/* Main: manual chart + story panel */}
        <main className="main">
          <ManualChart
            columns={columns}
            onConfigChange={(cfg) => setChartConfig(cfg)}
          />

          {/* Data Storytelling */}
          {chartConfig && (
            <StoryPanel
              chartConfig={chartConfig}
              dataSummary={dataSummary}
              sampleData={preview}
              language="ko"
            />
          )}
        </main>

        {/* Right: AI panel */}
        <aside className="right">
          <AiPanel
            charts={aiCharts}
            loading={loading}
            onRequest={handleAiRecommend}
          />
        </aside>
      </div>
    </div>
  )
}
