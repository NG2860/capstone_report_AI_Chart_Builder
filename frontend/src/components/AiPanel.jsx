export default function AiPanel({ charts, loading, onRequest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%',
                      background: '#0F6E56' }} />
        <span style={{ fontSize: 12, fontWeight: 500 }}>AI 추천 결과</span>
      </div>

      {charts.map((c, i) => (
        <div key={i} style={{
          border: i === 0 ? '2px solid #534AB7' : '1px solid #eee',
          borderRadius: 10, padding: '10px 12px',
          background: i === 0 ? '#EEEDFE' : '#fff',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 500,
                           color: i === 0 ? '#3C3489' : '#333' }}>
              {c.type} 차트
            </span>
            {i === 0 && (
              <span style={{ fontSize: 9, background: '#534AB7', color: '#fff',
                             padding: '2px 7px', borderRadius: 20, fontWeight: 500 }}>
                최적 추천
              </span>
            )}
          </div>
          <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5 }}>
            {c.reason}
          </div>
          {c.score && (
            <div style={{ fontSize: 10, color: '#aaa', marginTop: 3 }}>
              신뢰도: {Math.round(c.score * 100)}%
            </div>
          )}
        </div>
      ))}

      <div style={{ borderTop: '1px solid #eee', paddingTop: 8 }}>
        <button
          onClick={onRequest}
          disabled={loading}
          style={{
            width: '100%', background: loading ? '#aaa' : '#534AB7',
            color: '#EEEDFE', border: 'none', borderRadius: 8,
            padding: 9, fontSize: 12, fontWeight: 500, cursor: 'pointer',
          }}>
          {loading ? '분석 중...' : 'AI 차트 추천 실행'}
        </button>
      </div>
    </div>
  )
}
