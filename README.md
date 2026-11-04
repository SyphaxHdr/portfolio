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
| `src/content/profil.yaml` | nom, situation, liens, identifiant du formulaire de contact (Formspree) |
| `src/content/i18n/` | les textes de l'interface, accroches comprises : `fr.yaml` (puis `en.yaml`) |
| `src/assets/` | les images d'origine, converties en WebP au build (à venir) |
| `public/cv/` | les CV en PDF (`cv-production.pdf`, `cv-devops.pdf`) et l'aperçu de leur première page en WebP ; le bouton CV n'apparaît que si le PDF est là |

## Ajouter un projet

1. Créer une branche : `content/nom-du-projet`.
2. Copier le modèle `modeles/projet.md` dans `src/content/projets/fr/`.
3. Remplir les champs. Le site refuse de se construire si un champ obligatoire manque.
4. Ouvrir une pull request. La CI vérifie tout.
5. Fusionner : le site est publié tout seul.

Le projet apparaît sur le fil de chaque face listée dans `pistes`, avec sa page : `/production/projets/<nom-du-fichier>/` et `/devops/projets/<nom-du-fichier>/`.

## Ajouter une solution

1. Copier le modèle `modeles/solution.md` dans `src/content/solutions/fr/` et le nommer `<projet>-<sujet>.md`.
2. Remplir les champs : le problème, ce qui comptait, les options (une avec `retenue: true`), les étapes, le résultat et, si la piste DevOps est cochée, la partie `devops`.
3. Ouvrir une pull request comme pour un projet.

## Ce que vérifie la CI

À chaque pull request, la fusion est bloquée si :

- le site ne se construit pas ;
- un fichier de contenu a un champ manquant.

Avant la version 1.0 s'ajoutent : les liens cassés, le poids des images et l'orthographe (les noms propres et les mots kabyles sont dans `cspell.json`).

À chaque fusion sur `main` : le site est publié sur GitHub Pages. La date « Mis à jour le » vient du dernier commit.

## Technique

Astro (site statique), CSS sans framework, un peu de JavaScript (pièce, changement de face, fenêtres). Sans JavaScript, tout reste accessible par des liens et des pages. Le fondu au défilement est en CSS pur. Hébergé sur GitHub Pages.

## Versions

Versionnage sémantique : `0.x` pendant la construction, `1.0.0` quand le site est complet.
La version vient de `package.json` : on la monte dans la pull request de la version, avec le `CHANGELOG.md`. Le pied de page affiche la version, le commit et la publication GitHub Actions qui a mis le site en ligne.
Chaque version a un milestone (ses issues), un tag sur `main` et une release GitHub. Les changements sont notés dans `CHANGELOG.md`.

## Branches

`main` est protégée : on n'y pousse jamais directement. Une branche courte par tâche (`feat/…`, `fix/…`, `content/…`, `ci/…`, `docs/…`), puis une pull request.
