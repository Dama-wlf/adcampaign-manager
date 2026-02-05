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

## Installation et lancement

### Backend

1. Se placer dans le dossier backend :


- cd backend

2. Installer les dépendances :

- npm install

3. Créer un fichier .env :

- PORT=5000
- MONGO_URI=mongodb://localhost:27017/adcampaign

4. Explications :

- PORT : port du serveur Express
- MONGO_URI : URL de MongoDB locale ou cloud (ex: MongoDB Atlas)

5. Lancer le serveur :

- npm run dev

Backend disponible sur http://localhost:5000

### Frontend 

1. Se placer dans le dossier frontend :

- cd frontend


2. Installer les dépendances :

- npm install


3. Lancer le frontend :

- npm run dev

- Frontend disponible sur http://localhost:5173

Assurez-vous que le backend tourne pour que l’API fonctionne.

## Choix techniques

- Node.js + Express + MongoDB = API REST simple et rapide

- React + Tailwind CSS = UI moderne, responsive, facile à maintenir

- React Hook Form = gestion simple du formulaire et validation

- Axios = communication frontend ↔ backend

- Simulation dynamique = incrémentation automatique des impressions et clicks pour démonstration

## Améliorations possibles avec plus de temps

- Authentification / rôles (admin / annonceur)

- filtres avancés

- Historique complet des impressions et clicks

- Graphiques pour les statistiques (Chart.js, Recharts)

- Amélioration du design

- Notifications temps réel pour changement de status


