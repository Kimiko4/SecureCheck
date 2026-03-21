const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Fonction qui analyse les headers HTTP
const analyzeHeaders = async (url) => {
  try {
    const res = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
      headers: { 'User-Agent': 'SecureCheck-Scanner/1.0' }
    })

    const headers = res.headers
    const checks = {
      'Content-Security-Policy': !!headers['content-security-policy'],
      'X-Frame-Options':         !!headers['x-frame-options'],
      'X-Content-Type-Options':  !!headers['x-content-type-options'],
      'Strict-Transport-Security': !!headers['strict-transport-security'],
      'Referrer-Policy':         !!headers['referrer-policy'],
      'Permissions-Policy':      !!headers['permissions-policy'],
    }

    const passed = Object.values(checks).filter(Boolean).length
    const total  = Object.keys(checks).length
    const score  = Math.round((passed / total) * 100)

    return { checks, score, passed, total }
  } catch (err) {
    throw new Error('Site inaccessible ou URL invalide')
  }
}

app.post('/api/analyze', async (req, res) => {
  let { url } = req.body

  if (!url) return res.status(400).json({ error: 'URL manquante' })
  if (!url.startsWith('http')) url = 'https://' + url

  try {
    const [headers, ssl] = await Promise.all([
      analyzeHeaders(url),
      analyzeSSL(url)
    ])

    // Score global combiné (headers 50%, SSL 50%)
    const globalScore = ssl.status === 'ready'
  ? Math.round((headers.score * 0.5) + (ssl.score * 0.5))
  : headers.score

    res.json({ url, headers, ssl, globalScore })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Fonction qui analyse le certificat SSL
const analyzeSSL = async (url) => {
  try {
    const hostname = new URL(url).hostname
    const res = await axios.get(
      `https://api.ssllabs.com/api/v3/analyze?host=${hostname}&startNew=on&all=done`,
      { timeout: 15000 }
    )

    const data = res.data

    // SSL Labs prend du temps, on retourne le statut
    if (data.status === 'DNS' || data.status === 'IN_PROGRESS') {
      return { status: 'pending', message: 'Analyse SSL en cours...' }
    }

    if (data.status === 'READY') {
      const endpoint = data.endpoints?.[0]
      const grade = endpoint?.grade || 'N/A'
      const score = gradeToScore(grade)
      return { status: 'ready', grade, score }
    }

    return { status: 'error', grade: 'N/A', score: 0 }
  } catch (err) {
    return { status: 'error', grade: 'N/A', score: 0 }
  }
}

// Convertit le grade SSL en score numérique
const gradeToScore = (grade) => {
  const grades = { 'A+': 100, 'A': 90, 'A-': 85, 'B': 70, 'C': 50, 'D': 30, 'E': 10, 'F': 0 }
  return grades[grade] ?? 0
}

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})