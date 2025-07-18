# 🚀 Cynoia Spaces Backend

Backend de Cynoia Spaces, développé avec **Node.js**, **Express**, et **MongoDB**.  
Il fournit une API REST pour gérer les espaces collaboratifs, les réservations, événements, utilisateurs, etc.

---

## 📌 Contexte

Ce backend permet de :
- Gérer les ressources (espaces, équipements, experts)
- Gérer les réservations et événements
- Authentifier et gérer les utilisateurs
- Fournir des endpoints sécurisés pour la communication avec le frontend
- Assurer la persistance via MongoDB

---

## ⚙️ Stack Technique

| Outil          | Version / Info        |
|----------------|-----------------------|
| **Langage**    | JavaScript (Node.js)  |
| **Framework**  | Express.js            |
| **Base de données** | MongoDB            |
| **ODM**        | Mongoose              |
| **Authentification** | JWT (JSON Web Tokens) |
| **Logger**     | Morgan (optionnel)    |
| **CORS**       | Middleware configuré  |

---

## 📂 Structure du projet

```plaintext
cynonia-backend/
│
├── src/
│   ├── controllers/     # Logique métier des routes
│   ├── models/          # Schémas Mongoose
│   ├── routes/          # Définition des routes API
│   ├── middlewares/     # Middlewares Express (auth, erreur, etc.)
│   ├── config/          # Configuration DB, environnement
│   └── app.js           # Application Express principale
├── .env                 # Variables d’environnement
├── package.json
├── README.md
└── server.js            # Point d’entrée serveur
