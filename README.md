🧩 Cadavre Exquis (Prototype)

Un prototype de jeu du cadavre exquis développé en HTML, CSS et JavaScript vanilla, organisé selon une architecture MVC pour s’entraîner à structurer une application front-end sans backend.

Une démo du projet peut être visible ici: https://hyosua-cadavre-exqui-nc9.bolt.host

🎯 Objectif du projet

Ce projet vise à expérimenter le modèle MVC (Model - View - Controller) dans un contexte simple et ludique : le jeu du cadavre exquis, où plusieurs joueurs créent ensemble une phrase aléatoire et souvent humoristique.

🕹️ Fonctionnement

Configuration du jeu : les joueurs sont ajoutés depuis l’écran de setup.

Déroulement des tours : chaque joueur écrit successivement un mot selon 5 phases :

Nom

Adjectif

Verbe transitif

Nom

Circonstances

Révélation : à la fin du tour, la phrase complète est affichée — parfois logique, souvent absurde.

⚙️ Fonctionnalités

Ajout et suppression de joueurs

Création et suppression de mots

Attribution automatique d’une couleur à chaque joueur

Réinitialisation complète du jeu

Interface simple et fluide en JavaScript vanilla

Structure logique :

Model : gère l’état du jeu (joueurs, mots, phases).

View : gère l’affichage et les interactions avec le DOM.

Controller : fait le lien entre le modèle et la vue, orchestre la logique.

Config : contient les constantes globales.

🧩 Technologies utilisées

HTML5

CSS3

JavaScript (ES6)

Vite

Architecture MVC

## 🚀 Installation et lancement

### Prérequis

Node.js (version 16 ou supérieure)

npm ou yarn

### Installation

```bash
# Cloner le repository
git clone github.com/hyosua/Cadavre_Exquis_prototype

# Aller dans le dossier du projet
cd kadavexki

# Installer les dépendances
npm install
```

### Lancement

```bash
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

Le jeu sera accessible sur `http://localhost:5173`

🚧 Améliorations possibles

Persistance des données (localStorage ou backend).

Mode multi-joueurs en ligne.

Interface responsive et animations visuelles.

Historique des parties et partage de phrases.

📄 Licence

Projet libre à usage éducatif et personnel.
