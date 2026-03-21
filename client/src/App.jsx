import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!url) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError('Impossible de contacter le serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>🔍 SecureCheck</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Analysez la sécurité de n'importe quel site web en quelques secondes.
      </p>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="https://exemple.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          style={{
            flex: 1, padding: '12px 16px', fontSize: '16px',
            border: '1px solid #ddd', borderRadius: '8px', outline: 'none'
          }}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !url}
          style={{
            padding: '12px 24px', fontSize: '16px', fontWeight: '600',
            background: loading ? '#ccc' : '#6C47FF', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Analyse...' : 'Analyser'}
        </button>
      </div>

      {error && (
        <p style={{ marginTop: '20px', color: '#e53e3e' }}>❌ {error}</p>
      )}

      {result && (
        <div style={{ marginTop: '24px' }}>

          {/* Score global */}
          <div style={{
            padding: '16px', borderRadius: '12px', marginBottom: '16px',
            background: '#1a1a2e', border: 'none', textAlign: 'center'
          }}>
            <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>Score global de sécurité</div>
            <div style={{ fontSize: '42px', fontWeight: '700', color: '#fff' }}>
              {result.globalScore}%
            </div>
          </div>

          {/* Score SSL */}
          <div style={{
            padding: '16px', borderRadius: '12px', marginBottom: '16px',
            background: '#f0f4ff', border: '1px solid #a3bffa'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', color: '#333' }}>🔒 Certificat SSL</div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                  {result.ssl.status === 'pending' ? 'Analyse en cours...' : `Grade : ${result.ssl.grade}`}
                </div>
              </div>
              <div style={{
                fontSize: '28px', fontWeight: '700',
                color: result.ssl.score >= 70 ? '#276749' : result.ssl.score >= 40 ? '#c05621' : '#c53030'
              }}>
                {result.ssl.status === 'ready' ? result.ssl.grade : '...'}
              </div>
            </div>
          </div>

          {/* Score headers */}
          <div style={{
            padding: '24px', borderRadius: '12px', textAlign: 'center', marginBottom: '16px',
            background: result.headers.score >= 70 ? '#f0fff4' : result.headers.score >= 40 ? '#fffbeb' : '#fff5f5',
            border: `2px solid ${result.headers.score >= 70 ? '#68d391' : result.headers.score >= 40 ? '#f6ad55' : '#fc8181'}`
          }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>🛡️ Headers HTTP</div>
            <div style={{ fontSize: '48px', fontWeight: '700',
              color: result.headers.score >= 70 ? '#276749' : result.headers.score >= 40 ? '#c05621' : '#c53030'
            }}>
              {result.headers.score}%
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
              {result.headers.passed} / {result.headers.total} headers présents
            </div>
          </div>

          {/* Détail headers */}
          <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
            {Object.entries(result.headers.checks).map(([header, present]) => (
              <div key={header} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 16px', borderBottom: '1px solid #f0f0f0'
              }}>
                <span style={{ fontSize: '14px', fontFamily: 'monospace', color: '#333' }}>{header}</span>
                <span style={{
                  fontSize: '12px', fontWeight: '600', padding: '2px 10px', borderRadius: '99px',
                  background: present ? '#f0fff4' : '#fff5f5',
                  color: present ? '#276749' : '#c53030'
                }}>
                  {present ? '✓ présent' : '✗ manquant'}
                </span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  )
}

export default App