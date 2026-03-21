# 🔍 SecureCheck

![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-7c3aed?style=flat-square)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Node](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)

**Auditez la sécurité de n'importe quel site web en quelques secondes.**
SecureCheck analyse les headers HTTP, le certificat SSL et génère des recommandations concrètes pour renforcer la sécurité d'un domaine.

---

## 📸 Aperçu

![SecureCheck screenshot](https://via.placeholder.com/880x500/0d0d1a/7c3aed?text=SecureCheck+–+remplacer+par+un+vrai+screenshot)

> ⚠️ Remplacez ce lien par un vrai screenshot de l'application.

---

## ✨ Fonctionnalités

### 🛡️ Analyse des Headers HTTP
Vérifie la présence des headers de sécurité critiques (`Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`, etc.) et calcule un score sur 100.

### 🔒 Certificat SSL
Récupère le grade du certificat, la date d'expiration et le nombre de jours restants avant renouvellement.

### 💡 Recommandations personnalisées
Pour chaque header manquant, SecureCheck génère une explication claire et une correction prête à copier-coller, classée par priorité (haute / moyenne / faible).

---

## 🧰 Stack technique

| Couche     | Technologie                          |
|------------|--------------------------------------|
| Frontend   | React 19, Vite                       |
| Backend    | Node.js, Express 5                   |
| SSL        | [`ssl-checker`](https://www.npmjs.com/package/ssl-checker) |
| HTTP       | Axios                                |
| Style      | CSS custom properties, Google Fonts  |

---

## 🚀 Lancer le projet en local

### Prérequis
- Node.js ≥ 18
- npm ≥ 9

### 1. Cloner le dépôt

```bash
git clone https://github.com/Kimiko4/securecheck.git
cd securecheck
```

### 2. Démarrer le serveur (port 5000)

```bash
cd server
npm install
npm run dev
```

### 3. Démarrer le client (port 5173)

```bash
cd client
npm install
npm run dev
```

### 4. Ouvrir dans le navigateur

```
http://localhost:5173
```

---

## 📁 Structure du projet

```
securecheck/
├── client/          # Frontend React + Vite
│   └── src/
│       ├── App.jsx
│       └── index.css
└── server/          # Backend Express
    └── index.js
```

---

## 👤 Auteur

**Kimy LAOU**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Kimy_LAOU-0077b5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/kimy-laou/)
[![GitHub](https://img.shields.io/badge/GitHub-Kimiko4-181717?style=flat-square&logo=github)](https://github.com/Kimiko4)

---

*SecureCheck 2026*
