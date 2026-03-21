const express = require('express')
const cors = require('cors')
const axios = require('axios')
const sslChecker = require('ssl-checker')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

const analyzeHeaders = async (url) => {
  try {
    const res = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
      headers: { 'User-Agent': 'SecureCheck-Scanner/1.0' }
    })
    const headers = res.headers
    const checks = {
      'Content-Security-Policy':   !!headers['content-security-policy'],
      'X-Frame-Options':           !!headers['x-frame-options'],
      'X-Content-Type-Options':    !!headers['x-content-type-options'],
      'Strict-Transport-Security': !!headers['strict-transport-security'],
      'Referrer-Policy':           !!headers['referrer-policy'],
      'Permissions-Policy':        !!headers['permissions-policy'],
    }
    const passed = Object.values(checks).filter(Boolean).length
    const total  = Object.keys(checks).length
    const score  = Math.round((passed / total) * 100)
    return { checks, score, passed, total }
  } catch (err) {
    throw new Error('Site inaccessible ou URL invalide')
  }
}

const analyzeSSL = async (url) => {
  try {
    const hostname = new URL(url).hostname
    const data = await sslChecker(hostname)
    const daysLeft = data.daysRemaining
    const valid = data.valid
    let grade = 'F', score = 0
    if (valid && daysLeft > 60)      { grade = 'A'; score = 90 }
    else if (valid && daysLeft > 30) { grade = 'B'; score = 70 }
    else if (valid && daysLeft > 0)  { grade = 'C'; score = 50 }
    return { status: 'ready', grade, score, daysLeft, valid }
  } catch (err) {
    return { status: 'error', grade: 'N/A', score: 0, daysLeft: 0, valid: false }
  }
}

const getRecommendations = (checks, ssl) => {
  const recs = []
  if (!checks['Content-Security-Policy'])
    recs.push({ header: 'Content-Security-Policy', priority: 'haute',
      description: 'Protège contre les attaques XSS en contrôlant les ressources chargées.',
      fix: "Ajoute : Content-Security-Policy: default-src 'self'" })
  if (!checks['X-Frame-Options'])
    recs.push({ header: 'X-Frame-Options', priority: 'haute',
      description: "Empêche ton site d'être intégré dans une iframe (clickjacking).",
      fix: 'Ajoute : X-Frame-Options: DENY' })
  if (!checks['X-Content-Type-Options'])
    recs.push({ header: 'X-Content-Type-Options', priority: 'moyenne',
      description: 'Empêche le navigateur de deviner le type de fichier.',
      fix: 'Ajoute : X-Content-Type-Options: nosniff' })
  if (!checks['Strict-Transport-Security'])
    recs.push({ header: 'Strict-Transport-Security', priority: 'haute',
      description: 'Force les connexions HTTPS uniquement.',
      fix: 'Ajoute : Strict-Transport-Security: max-age=31536000' })
  if (!checks['Referrer-Policy'])
    recs.push({ header: 'Referrer-Policy', priority: 'faible',
      description: 'Contrôle les infos envoyées lors de la navigation.',
      fix: 'Ajoute : Referrer-Policy: strict-origin-when-cross-origin' })
  if (!checks['Permissions-Policy'])
    recs.push({ header: 'Permissions-Policy', priority: 'faible',
      description: "Contrôle l'accès aux APIs du navigateur (caméra, micro...).",
      fix: 'Ajoute : Permissions-Policy: camera=(), microphone=()' })
  if (ssl.status === 'ready' && ssl.daysLeft < 30)
    recs.push({ header: 'Certificat SSL', priority: 'haute',
      description: `Ton certificat expire dans ${ssl.daysLeft} jours !`,
      fix: 'Renouvelle ton certificat SSL immédiatement.' })
  return recs
}

app.post('/api/analyze', async (req, res) => {
  let { url } = req.body
  if (!url) return res.status(400).json({ error: 'URL manquante' })
  if (!url.startsWith('http')) url = 'https://' + url

  // Validation URL
  try {
    new URL(url)
  } catch {
    return res.status(400).json({ error: 'URL invalide' })
  }

  // Vérifie que c'est un vrai domaine
  const hostname = new URL(url).hostname
  if (!hostname.includes('.')) {
    return res.status(400).json({ error: 'Domaine invalide — exemple : google.com' })
  }

  try {
    const [headers, ssl] = await Promise.all([
      analyzeHeaders(url),
      analyzeSSL(url)
    ])
    const globalScore = ssl.status === 'ready'
      ? Math.round((headers.score * 0.5) + (ssl.score * 0.5))
      : headers.score
    const recommendations = getRecommendations(headers.checks, ssl)
    res.json({ url, headers, ssl, globalScore, recommendations })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})