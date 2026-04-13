import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const CHART_TYPES = [
  { value: 'bar',     label: '막대' },
  { value: 'line',    label: '꺾은선' },
  { value: 'pie',     label: '원형' },
  { value: 'scatter', label: '산점도' },
]

export default function ManualChart({ columns, onConfigChange }) {
  const canvasRef = useRef(null)
  const chartRef  = useRef(null)
  const [xAxis, setXAxis] = useState('')
  const [yAxis, setYAxis] = useState('')
  const [type,  setType]  = useState('bar')

  const numericCols = columns.filter(c => c.type === 'numeric')

  // 설정 변경 → 상위 컴포넌트로 전달
  useEffect(() => {
    if (xAxis && yAxis && onConfigChange) {
      onConfigChange({ type, xAxis, yAxis, title: `${xAxis}별 ${yAxis}` })
    }
  }, [xAxis, yAxis, type])

  // 차트 렌더링
  useEffect(() => {
    if (!xAxis || !yAxis || !canvasRef.current) return
    if (chartRef.current) chartRef.current.destroy()
    const ctx = canvasRef.current.getContext('2d')
    chartRef.current = new Chart(ctx, {
      type,
      data: {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [{
          label: yAxis,
          data: [65, 78, 52, 91, 67, 84],
          backgroundColor: '#7F77DD',
          borderColor: '#534AB7',
          borderWidth: 1.5,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
      },
    })
  }, [xAxis, yAxis, type])

  return (
    <div style={{ background: '#fff', border: '1px solid #eee',
                  borderRadius: 10, padding: 14 }}>
      <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 10 }}>
        수동 모드 — 차트 설정
      </p>

      {/* 차트 유형 선택 */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {CHART_TYPES.map(t => (
          <button key={t.value}
            onClick={() => setType(t.value)}
            style={{
              flex: 1, padding: '6px 0', fontSize: 11, borderRadius: 6,
              border: type === t.value ? '2px solid #534AB7' : '1px solid #ddd',
              background: type === t.value ? '#EEEDFE' : '#fff',
              color: type === t.value ? '#3C3489' : '#666',
              cursor: 'pointer', fontWeight: type === t.value ? 500 : 400,
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* 축 선택 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 10, color: '#888' }}>X축</label>
          <select value={xAxis} onChange={e => setXAxis(e.target.value)}
            style={{ width: '100%', marginTop: 3, padding: '5px 8px',
                     fontSize: 11, borderRadius: 6, border: '1px solid #ddd' }}>
            <option value="">선택</option>
            {columns.map(c => <option key={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 10, color: '#888' }}>Y축</label>
          <select value={yAxis} onChange={e => setYAxis(e.target.value)}
            style={{ width: '100%', marginTop: 3, padding: '5px 8px',
                     fontSize: 11, borderRadius: 6, border: '1px solid #ddd' }}>
            <option value="">선택</option>
            {numericCols.map(c => <option key={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* 차트 캔버스 */}
      {xAxis && yAxis ? (
        <canvas ref={canvasRef} style={{ maxHeight: 240 }} />
      ) : (
        <div style={{ height: 160, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: '#aaa', fontSize: 12,
                      border: '1px dashed #ddd', borderRadius: 8 }}>
          X축과 Y축을 선택하면 차트가 표시됩니다
        </div>
      )}
    </div>
  )
}
