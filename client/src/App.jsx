import { useState } from 'react'

/* ── SVG Icons ── */
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

/* ── Helpers ── */
function getScoreColor(score) {
  if (score >= 70) return '#10b981'
  if (score >= 40) return '#f59e0b'
  return '#ef4444'
}

function getGradeColor(grade) {
  if (!grade) return '#475569'
  if (grade === 'A+' || grade === 'A') return '#06b6d4'
  if (grade === 'B') return '#10b981'
  if (grade === 'C') return '#f59e0b'
  return '#ef4444'
}

function getPriorityColor(priority) {
  if (priority === 'haute')   return '#ef4444'
  if (priority === 'moyenne') return '#f59e0b'
  return '#10b981'
}

/* ══════════════════════════════════════════
   APP
══════════════════════════════════════════ */
function App() {
  const [url, setUrl]       = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

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
    <div className="app">

      {/* ── Header ── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">🔍</span>
            <span className="logo-text">SecureCheck</span>
          </div>
          <div className="header-right">
            <span className="by-text">par <span className="by-name">Kimy LAOU</span></span>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/kimy-laou/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn de Kimy LAOU"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/Kimiko4"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub de Kimy LAOU"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="main">

        {/* Hero */}
        <div className="hero">
          <h1 className="hero-title">Audit de sécurité web instantané</h1>
          <p className="hero-sub">
            Analysez SSL, headers HTTP et obtenez des recommandations concrètes en quelques secondes.
          </p>
        </div>

        {/* Search */}
        <div className="search-wrap">
          <div className={`search-box${loading ? ' scanning' : ''}`}>
            <input
              type="text"
              placeholder="https://exemple.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              className="search-input"
              aria-label="URL à analyser"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !url}
              className="search-btn"
              aria-label="Lancer l'analyse"
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  Analyse...
                </span>
              ) : 'Analyser'}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="error-msg" role="alert">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="results">

            {/* Score global */}
            <div className="card score-card">
              <div className="score-label">Score global de sécurité</div>
              <div
                className="score-value"
                style={{
                  color: getScoreColor(result.globalScore),
                  '--score-glow': getScoreColor(result.globalScore)
                }}
              >
                {result.globalScore}<span className="score-pct">%</span>
              </div>
              <div className="score-bar-wrap">
                <div
                  className="score-bar"
                  style={{
                    width: `${result.globalScore}%`,
                    background: `linear-gradient(90deg, ${getScoreColor(result.globalScore)}, ${
                      result.globalScore >= 70 ? '#06b6d4' :
                      result.globalScore >= 40 ? '#ef4444' : '#7c3aed'
                    })`
                  }}
                />
              </div>
            </div>

            {/* SSL + Headers score */}
            <div className="cards-row">

              {/* SSL */}
              <div className="card ssl-card">
                <div className="card-header-row">
                  <div>
                    <div className="card-title">🔒 Certificat SSL</div>
                    <div className="card-sub">
                      {result.ssl.status === 'ready'
                        ? `Expire dans ${result.ssl.daysLeft} jours`
                        : 'Non détecté'}
                    </div>
                  </div>
                  {result.ssl.grade && (
                    <div
                      className="grade-badge"
                      style={{
                        color:       getGradeColor(result.ssl.grade),
                        borderColor: getGradeColor(result.ssl.grade),
                        boxShadow:   `0 0 18px ${getGradeColor(result.ssl.grade)}38`
                      }}
                    >
                      {result.ssl.grade}
                    </div>
                  )}
                </div>
              </div>

              {/* Headers score */}
              <div className="card">
                <div className="card-title">🛡️ Headers HTTP</div>
                <div
                  className="headers-score"
                  style={{ color: getScoreColor(result.headers.score) }}
                >
                  {result.headers.score}
                  <span style={{ fontSize: '1rem', opacity: 0.6 }}>%</span>
                </div>
                <div className="card-sub">
                  {result.headers.passed} / {result.headers.total} headers présents
                </div>
              </div>

            </div>

            {/* Headers detail */}
            <div className="card">
              <div className="card-title" style={{ marginBottom: '14px' }}>Détail des headers</div>
              <div className="headers-table">
                {Object.entries(result.headers.checks).map(([header, present], i) => (
                  <div key={header} className={`header-row${i % 2 === 0 ? ' even' : ''}`}>
                    <span className="header-name">{header}</span>
                    <span className={`header-badge ${present ? 'present' : 'missing'}`}>
                      {present ? '✓ présent' : '✗ manquant'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div className="reco-section">
                <h2 className="reco-title">
                  <span className="reco-count">{result.recommendations.length}</span>
                  Recommandations
                </h2>
                {result.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="reco-card"
                    style={{ '--priority-color': getPriorityColor(rec.priority) }}
                  >
                    <div className="reco-header">
                      <span className="reco-header-name">{rec.header}</span>
                      <span
                        className="priority-badge"
                        style={{
                          color:      getPriorityColor(rec.priority),
                          borderColor:`${getPriorityColor(rec.priority)}40`,
                          background: `${getPriorityColor(rec.priority)}14`
                        }}
                      >
                        {rec.priority}
                      </span>
                    </div>
                    <p className="reco-desc">{rec.description}</p>
                    <div className="reco-fix">
                      <span className="fix-icon">💡</span>
                      {rec.fix}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        Réalisé par <span className="footer-name">Kimy LAOU</span> · SecureCheck 2026
      </footer>

    </div>
  )
}

export default App
