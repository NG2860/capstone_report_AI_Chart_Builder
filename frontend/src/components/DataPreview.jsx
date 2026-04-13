const TYPE_STYLE = {
  numeric:     { bg: '#EEEDFE', color: '#3C3489' },
  categorical: { bg: '#E1F5EE', color: '#085041' },
  date:        { bg: '#FAEEDA', color: '#633806' },
}

export default function DataPreview({ columns, preview }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ fontSize: 11, fontWeight: 500, color: '#444' }}>
        컬럼 정보 ({columns.length}개)
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {columns.map(col => {
          const s = TYPE_STYLE[col.type] || TYPE_STYLE.categorical
          return (
            <span key={col.name} style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 20,
              background: s.bg, color: s.color, fontWeight: 500,
            }}>
              {col.name}
            </span>
          )
        })}
      </div>
      <p style={{ fontSize: 11, fontWeight: 500, color: '#444', marginTop: 4 }}>
        미리보기 (상위 5행)
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: 10, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.name} style={{
                  padding: '4px 6px', background: '#f5f5f5',
                  textAlign: 'left', borderBottom: '1px solid #eee',
                  whiteSpace: 'nowrap',
                }}>
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, i) => (
              <tr key={i}>
                {columns.map(col => (
                  <td key={col.name} style={{
                    padding: '3px 6px', borderBottom: '1px solid #f0f0f0',
                    whiteSpace: 'nowrap', color: '#333',
                  }}>
                    {String(row[col.name] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
