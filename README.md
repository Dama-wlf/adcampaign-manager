# adcampaign-manager
Plateforme de gestion de campagnes publicitaires digitales

**AdCampaign Manager** est une mini-plateforme de gestion de campagnes publicitaires digitales.  

Fonctionnalités principales :  

- Créer des campagnes publicitaires  
- Suivre leurs performances (impressions, clicks, CTR, CPC)  
- Consulter les statistiques d’une campagne  
- Gestion du status : `active`, `paused`, `finished`  

## Fonctionnalités détaillées

- Liste des campagnes avec stats et status (activer/pause/terminer)  
- Formulaire création campagne avec **React Hook Form**  
- Page détail campagne avec CTR / CPC  
- UI moderne et responsive grâce à **Tailwind CSS** 
- Simulation de clics et impression 


## Architecture du projet

### Backend (Node.js + Express + MongoDB)

backend/
│
├─ controllers/ # Gère la logique des routes (interagit avec services)
│ └─ campaignController.js
│
├─ services/ # Contient la logique métier 
│ └─ campaignService.js
│
├─ routes/ # Définit les endpoints
│ └─ campaignRoutes.js
│
├─ middleware/ # Middleware pour validation ou erreurs
│
├─ models/ # Modèles MongoDB (Mongoose)
│ └─ campaignModel.js
├─ .env # Variables d'environnement (PORT, MONGO_URI)
├─ routes/ # Définit les endpoints
│ └─ app.js #Connexion DB
├
└─ server.js # Démarre le serveur

### Frontend (React + Tailwind CSS)

│
├─ src/
│ ├─ pages/ # Pages principales
│ │ ├─ CreateCampaign.jsx # Creation
│ │ ├─ CampaignList.jsx # Liste
│ │ └─ CampaignDetail.jsx # Détail d’une campagne
│ │
│ ├─ components/ # Composants réutilisables
│ │ ├─ CampaignForm.jsx
│ │ ├─ Loading.jsx
│ │
│ ├─ services/ # Appels API
│ │ └─ api.js

## Installation et lancement

### Backend

1. Se placer dans le dossier backend :

```bash
cd backend

    Installer les dépendances :

npm install

    Créer un fichier .env :

PORT=5000
MONGO_URI=mongodb://localhost:27017/adcampaign

    Explications :

        PORT : port du serveur Express

        MONGO_URI : URL de MongoDB locale ou cloud (ex: MongoDB Atlas)

    Lancer le serveur :

npm run dev

    Backend disponible sur http://localhost:5000

### Frontend 

1. Se placer dans le dossier frontend :

cd frontend


2. Installer les dépendances :

npm install


3. Lancer le frontend :

npm run dev


Frontend disponible sur http://localhost:5173

Assurez-vous que le backend tourne pour que l’API fonctionne.

## Choix techniques

Node.js + Express + MongoDB = API REST simple et rapide

React + Tailwind CSS = UI moderne, responsive, facile à maintenir

React Hook Form = gestion simple du formulaire et validation

Axios = communication frontend ↔ backend

Simulation dynamique = incrémentation automatique des impressions et clicks pour démonstration

## Améliorations possibles avec plus de temps

Authentification / rôles (admin / annonceur)

filtres avancés

Historique complet des impressions et clicks

Graphiques pour les statistiques (Chart.js, Recharts)

Amélioration du design

Notifications temps réel pour changement de status


