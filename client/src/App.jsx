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
        <div style={{ marginTop: '24px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
          <p style={{ color: '#333' }}>✅ Requête reçue pour : <strong>{result.url}</strong></p>
          <p style={{ color: '#888', fontSize: '14px' }}>Les vrais résultats arrivent à l'étape suivante.</p>
        </div>
      )}
    </div>
  )
}

export default App