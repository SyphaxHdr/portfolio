# Portfolio · Syphax Hadri

Mon site portfolio, en deux faces :

- **Production** : comment j'organise une équipe de jeu vidéo et je débloque son travail.
- **DevOps** : comment j'automatise ce travail avec Git et GitHub Actions.

Chaque projet est une branche sur un fil, comme dans un historique Git. Chaque solution part d'un vrai problème d'équipe.

## Lancer le site en local

Il faut Node.js (version LTS) et npm.

```bash
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:4321.

## Où est le contenu

Tout le texte du site est dans `src/content/`. Il n'y a aucun texte dans le code.

| Dossier | Ce qu'il contient |
|---|---|
| `src/content.config.ts` | le schéma : les champs obligatoires de chaque type de fichier |
| `src/content/projets/fr/` | un fichier par projet (un dossier par langue) |
| `src/content/solutions/fr/` | un fichier par problème réglé (les deux faces dans le même fichier) |
| `src/content/parcours/` | les étapes du parcours |
| `src/content/profil.yaml` | nom, accroche, liens |
| `src/content/i18n/` | les textes de l'interface : `fr.yaml` (puis `en.yaml`) |
| `src/assets/` | les images d'origine (le build les convertit en WebP) |
| `public/cv/` | les CV en PDF (un par face) et leur aperçu |

## Ajouter un projet

1. Créer une branche : `content/nom-du-projet`.
2. Copier le modèle `modeles/projet.md` dans `src/content/projets/fr/`.
3. Remplir les champs. Le site refuse de se construire si un champ obligatoire manque.
4. Ouvrir une pull request. La CI vérifie tout.
5. Fusionner : le site est publié tout seul.

## Ce que vérifie la CI

À chaque pull request, la fusion est bloquée si :

- le site ne se construit pas ;
- un fichier de contenu a un champ manquant ;
- un lien est cassé ;
- une image est trop lourde ;
- un mot est mal écrit (les noms propres et les mots kabyles sont dans `cspell.json`).

À chaque fusion sur `main` : le site est publié sur GitHub Pages. La date « Mis à jour le » vient du dernier commit.

## Technique

Astro (site statique), CSS sans framework, un peu de JavaScript (pièce, changement de face, apparition des branches). Hébergé sur GitHub Pages.

## Versions

Versionnage sémantique : `0.x` pendant la construction, `1.0.0` quand le site est complet.
Chaque version a un milestone (ses issues), un tag sur `main` et une release GitHub. Les changements sont notés dans `CHANGELOG.md`.

## Branches

`main` est protégée : on n'y pousse jamais directement. Une branche courte par tâche (`feat/…`, `fix/…`, `content/…`, `ci/…`, `docs/…`), puis une pull request.
