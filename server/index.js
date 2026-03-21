const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Route de test
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'SecureCheck API is running' })
})

// Route principale d'analyse
app.post('/api/analyze', async (req, res) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).json({ error: 'URL manquante' })
  }

  res.json({ message: 'Analyse reçue', url })
})

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
})
