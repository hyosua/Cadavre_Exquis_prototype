🧩 Cadavre Exquis (Prototype)

Un prototype de jeu du cadavre exquis développé en HTML, CSS et JavaScript vanilla, organisé selon une architecture MVC pour s’entraîner à structurer une application front-end sans backend.

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

🧠 Architecture MVC
KADAVEXKI/
├── config/
│   └── constants.js
├── controller/
│   └── GameController.js
├── model/
│   └── GameModel.js
├── view/
│   ├── components/
│   │   └── Word.js
│   ├── GameView.js
│   └── SetupView.js
├── index.html
├── index.js
├── styles.css
└── .gitignore

Structure logique :

Model : gère l’état du jeu (joueurs, mots, phases).

View : gère l’affichage et les interactions avec le DOM.

Controller : fait le lien entre le modèle et la vue, orchestre la logique.

Config : contient les constantes globales.

🧩 Technologies utilisées

HTML5

CSS3

JavaScript (ES6)

Architecture MVC

🚧 Améliorations possibles

Persistance des données (localStorage ou backend).

Mode multi-joueurs en ligne.

Interface responsive et animations visuelles.

Historique des parties et partage de phrases.

📄 Licence

Projet libre à usage éducatif et personnel.