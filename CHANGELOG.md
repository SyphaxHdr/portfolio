# Journal des changements

Format : une section par version, la plus récente en haut.

## [Non publié]

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
