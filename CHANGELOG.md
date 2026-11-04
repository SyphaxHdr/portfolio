# Journal des changements

Format : une section par version, la plus récente en haut.

## [Non publié]

## [0.8.0] - 2026-11-04

Une page par projet.

### Ajouté

- Une page par projet, sur chaque face : `/production/projets/<projet>/` et `/devops/projets/<projet>/`.
- En haut de la page : le titre, l'état, le résumé, le rôle, l'équipe, la période, le texte du projet et ses liens ; sur la face DevOps, les outils en étiquettes.
- Les problèmes réglés dessinés comme un historique Git : la branche du projet part du tronc au début du projet et y revient à sa sortie ; chaque solution est une branche feature qui part de la branche du projet et la rejoint au niveau de son titre. Sur la face DevOps, le nom de la branche s'affiche au-dessus du commit.
- « Voir la solution » ouvre une fiche qui se lit d'un coup d'œil : le problème, ce qui comptait (en pastilles), les options écartées et celle retenue, la solution en schéma et en étapes numérotées, ce qui a été laissé de côté, le résultat et les preuves. Sur la face DevOps : le déclencheur, le fichier, ce que ça fait, le choix et ce à quoi c'est lié.
- On passe d'une solution à la précédente ou à la suivante sans refermer.
- Sur le fil, le titre d'un projet et chacune de ses solutions mènent à la page projet ; une solution s'y ouvre directement.
- Sur une page projet, ← → et le glissement au doigt passent à l'autre face du même projet en gardant la solution ouverte ; un lien en haut fait la même chose.
- « Retour au fil » ramène au projet sur le fil ; en bas, les projets voisins.
- Un fondu enchaîné d'une page à l'autre, coupé si le mouvement est réduit.

### Changé

- Une solution s'écrit en champs (problème, ce qui comptait, options, étapes, résultat, partie DevOps) au lieu d'un texte libre ; le site refuse de se construire si un champ obligatoire manque. Le modèle `modeles/solution.md` montre tous les champs.

### Corrigé

- « Parcours » dans la barre du haut fonctionne aussi depuis une page projet.
- Le README et `MAINTENANCE.md` n'annoncent plus comme faites des vérifications qui arrivent avant la version 1.0.

## [0.7.0] - 2026-11-04

Le fil au défilement, l'autre face en filigrane.

### Ajouté

- Le bas de l'écran est un fondu : le fil y devient de plus en plus transparent et s'éclaire en montant, au rythme du défilement, sans attendre.
- En haut de la page, les deux lignes partent d'un point sous le nom : une tige commune qui se sépare en deux, chaque ligne rejoint son bord puis descend.
- Après le dernier bloc, le tronc continue jusqu'au pied de page et s'y fond (le fil le plus court s'allonge pour finir au même endroit).
- Sur ordinateur, le fil de l'autre face reste visible en filigrane : ses lignes et ses points, très pâles, sans texte.
- Au changement de face, un fil pâlit pendant que l'autre s'éclaire.
- La barre du haut reste visible au défilement, avec un lien « Parcours ».

### Changé

- Les boutons Production et DevOps quittent la barre du haut : on change de face avec la pièce, les flèches, le clavier ou le doigt, et la barre garde sa place pour les boutons à venir.

### Corrigé

- La consigne des faces production et DevOps ne répète plus la même information : elle indique la pièce ou la flèche (et le glissement sur écran tactile).

## [0.6.0] - 2026-11-04

Faces et pièce.

### Ajouté

- L'accueil neutre : deux lignes descendent du haut, puis « Choisis une face pour voir les projets ».
- La pièce en 3D, bimétal comme une vraie pièce : rebord biseauté, grain du métal, stries, anneau argenté gravé (nom, étoiles, « Production • DevOps »), cœur doré avec le symbole de la face en relief, tranche striée visible quand elle tourne. Sur l'accueil, elle montre « Pile ou face » et un symbole qui mêle les deux faces : le ∞ DevOps portant les trois nœuds de la production.
- Quatre façons de changer de face : les flèches, les boutons du haut, les touches ← → et le glissement au doigt (sur écran tactile).
- Les adresses `/production` et `/devops` suivent la face affichée, et le bouton « retour » du navigateur fonctionne.
- Un message lu par les lecteurs d'écran à chaque changement de face.
- La légende « Comment lire le fil ? ».
- Une consigne adaptée à l'appareil : flèches et clavier sur ordinateur, glissement sur écran tactile.
- Dans le pied de page : la version du site, le commit et un lien vers la publication GitHub Actions qui l'a mise en ligne.

### Changé

- Face DevOps : miroir exact de la face production ; le tronc est à droite, le texte s'aligne contre lui, chaque projet revient sur le tronc à la hauteur de son titre et le parcours garde ses années collées au texte.
- Le nom d'un sous-projet a la taille d'une solution, avec une étiquette « Sous-projet ».
- Le point d'un projet en cours est un arc qui tourne, dessiné en SVG : net et fluide à tous les zooms.
- La pièce est dessinée à plat au repos (nette au pixel près) ; la 3D ne s'active que pendant qu'elle tourne.
- La page est plus large, et le texte un peu plus grand sur les très grands écrans.
- Le titre « Parcours » s'aligne sur les projets ; les années se placent entre le tronc et le texte.
- Sans JavaScript, les flèches et les boutons restent des liens qui fonctionnent.

## [0.5.0] - 2026-11-04

Le fil.

### Ajouté

- Le fil sur chaque face : un tronc, une branche colorée par projet qui part du tronc et y revient, un point par solution.
- Un losange sur le tronc pour un projet sorti, un point qui pulse pour un projet en cours.
- Les sous-projets : une petite branche dans la branche (Gameplay Balance Sheets dans Amachahou).
- Le parcours en bas du tronc, jusqu'au point final.
- Production à gauche, DevOps à droite en miroir sur grand écran ; sur téléphone, le tronc reste à gauche pour garder un texte lisible.

### Changé

- Les projets sont rangés du plus récent au plus ancien.

## [0.4.0] - 2026-11-04

Base visuelle.

### Ajouté

- Les couleurs des trois états : accueil neutre, face production (jour), face DevOps (nuit).
- Les polices Fraunces, Instrument Sans et JetBrains Mono, servies par le site lui-même.
- Une barre du haut avec les deux faces, et un pied de page avec les liens.
- La date « Mis à jour le », prise automatiquement du dernier commit.
- Les pages `/production` et `/devops`, chacune avec ses projets et ses problèmes réglés.

### Changé

- L'accueil devient neutre : il propose de choisir une face.

## [0.3.0] - 2026-11-04

Contenu en fichiers.

### Ajouté

- Le contenu du site vit dans des fichiers : un fichier par projet, un fichier par problème réglé.
- Un schéma vérifie chaque fichier : un champ manquant ou mal rempli fait échouer le build.
- Premiers contenus : les projets Amachahou et Gravewell, et trois problèmes réglés.
- Structure prête pour l'anglais : un dossier par langue et les textes de l'interface dans `src/content/i18n/`.
- La page d'accueil liste les projets et leurs problèmes réglés, lus depuis les fichiers.

## [0.2.0] - 2026-11-04

Pipeline : vérification et publication.

### Ajouté

- Vérification automatique de chaque pull request avec GitHub Actions : le site doit se construire.
- Publication automatique sur GitHub Pages à chaque fusion sur `main`.

### Changé

- Le dépôt s'appelle désormais `syphaxhdr.github.io` : le site est en ligne sur https://syphaxhdr.github.io.

### Organisation

- La vérification du build est obligatoire avant toute fusion sur `main`.

## [0.1.0] - 2026-11-04

Outils et dépôt.

### Ajouté

- Projet Astro (modèle minimal), lancé en local avec `npm run dev`.
- README, journal des changements et explication de la maintenance du site (`MAINTENANCE.md`).
- Configuration commune de l'éditeur (`.editorconfig`), extensions VS Code recommandées et liste de mots acceptés par le correcteur (`cspell.json`).
- Modèles de pull request, d'issues (nouveau projet, problème d'affichage, idée) et de contenu (projet, solution).

### Organisation

- Labels, jalons de v0.1.0 à v1.1.0, une issue par tâche.
- Branche `main` protégée : pull request obligatoire, pas de push direct.
