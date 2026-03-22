# 🔍 SecureCheck

![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-7c3aed?style=flat-square)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![Node](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)

**Auditez la sécurité de n'importe quel site web en quelques secondes.**  
SecureCheck analyse les headers HTTP, le certificat SSL et génère des recommandations concrètes pour renforcer la sécurité d'un domaine.

> Projet développé dans le cadre de ma formation en cybersécurité à l'EFREI Paris (label SecNumEdu ANSSI), après avoir travaillé sur des audits applicatifs en stage.

---

## 📸 Aperçu

<img width="1753" height="938" alt="interface" src="https://github.com/user-attachments/assets/c9ee1b5b-f82f-44e9-9ddb-59dca40478e1" />
<img width="1737" height="906" alt="recommendations" src="https://github.com/user-attachments/assets/03653e8c-584f-46a3-b28f-cc3b8be27d01" />

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

## 🗺️ Roadmap

- [ ] Scan de ports basique
- [ ] Détection des cookies non sécurisés (HttpOnly, Secure, SameSite)
- [ ] Export PDF du rapport d'audit
- [ ] Historique des audits par domaine

---

## 👤 Auteur

**Kimy LAOU**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Kimy_LAOU-0077b5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/kimy-laou/)
[![GitHub](https://img.shields.io/badge/GitHub-Kimiko4-181717?style=flat-square&logo=github)](https://github.com/Kimiko4)

---

*SecureCheck 2026*
