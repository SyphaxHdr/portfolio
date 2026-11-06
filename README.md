# Portfolio · Syphax Hadri

Mon site portfolio, en français et en anglais (sous `/en/`), en deux faces :

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
| `src/content/projets/fr/`, `en/` | un fichier par projet, un dossier par langue |
| `src/content/solutions/fr/`, `en/` | un fichier par problème réglé (les deux faces dans le même fichier), un dossier par langue |
| `src/content/parcours/` | les étapes du parcours : `fr.yaml`, `en.yaml` |
| `src/content/profil.yaml` | nom, situation (dans chaque langue), liens, identifiant du formulaire de contact (Formspree) |
| `src/content/i18n/` | les textes de l'interface, accroches comprises : `fr.yaml` et `en.yaml`, avec les mêmes clés |
| `public/projets/<projet>/` | les images des projets en WebP (moins de 500 Ko chacune), listées dans le champ `visuels` du fichier projet |
| `public/cv/` | les CV en PDF, un par face et par langue (`cv-production-fr.pdf`, `cv-devops-en.pdf`…), leur image en WebP (même nom, `.webp` et `-petit.webp`) et la place de leurs liens (`.json`) ; chaque CV a sa page (`/production/cv/`, `/en/devops/cv/`…) ; le bouton CV n'apparaît que si un PDF est là |

## Ajouter un projet

1. Créer une branche : `content/nom-du-projet`.
2. Copier le modèle `modeles/projet.md` dans `src/content/projets/fr/`, puis sa traduction dans `src/content/projets/en/`.
3. Remplir les champs. Le site refuse de se construire si un champ obligatoire manque.
4. Ouvrir une pull request. La CI vérifie tout.
5. Fusionner : le site est publié tout seul.

Le projet apparaît sur le fil de chaque face listée dans `pistes`, avec sa page : `/production/projets/<nom-du-fichier>/` et `/devops/projets/<nom-du-fichier>/`.

## Les deux langues

Le français est à la racine (`/devops/`), l'anglais sous `/en/` (`/en/devops/`). Les pages anglaises sont dans `src/pages/en/` : ce sont les mêmes que les pages françaises, seule la ligne `const langue` change.

Chaque fichier de contenu existe dans les deux langues, avec le même nom : `projets/fr/drealm.md` et `projets/en/drealm.md`. Dans une solution anglaise, `projet:` commence par `en/`. Les champs techniques (dates, `pistes`, `branche`, `commit`, `visuels`…) restent les mêmes ; seuls les textes changent.

Si un projet ou une solution manque dans une langue, le site refuse de se construire et la pull request est bloquée.

## Ajouter une solution

1. Copier le modèle `modeles/solution.md` dans `src/content/solutions/fr/` et le nommer `<projet>-<sujet>.md` ; même nom pour la version anglaise, dans `src/content/solutions/en/`.
2. Remplir les champs : le problème, ce qui comptait, les options (une avec `retenue: true`), les étapes, le résultat et, si la piste DevOps est cochée, la partie `devops`.
3. Ouvrir une pull request comme pour un projet.

## Ce que vérifie la CI

À chaque pull request, la fusion est bloquée si :

- le site ne se construit pas ;
- un fichier de contenu a un champ manquant ;
- un lien interne mène à une page, un fichier ou une ancre qui n'existe pas (`npm run verifier:liens`, après `npm run build`) ;
- une image dépasse 500 Ko ou un CV dépasse 2 Mo (`npm run verifier:images`) ;
- un mot est inconnu du correcteur d'orthographe (cspell, en français et en anglais).

Un mot correct mais inconnu (nom propre, mot kabyle, terme technique) s'ajoute en une ligne dans la liste `words` de `cspell.json`.

Lighthouse mesure aussi la performance et l'accessibilité de chaque page (objectif : 90 ou plus). Il ne bloque pas la fusion.

Dependabot propose chaque semaine la mise à jour des actions des workflows, épinglées sur un SHA complet.

À chaque fusion sur `main` : le site est publié sur GitHub Pages. La date « Mis à jour le » vient du dernier commit.

## Technique

Astro (site statique), CSS sans framework, un peu de JavaScript (pièce, changement de face, fenêtres, carrousel, lien de langue). Sans JavaScript, tout reste accessible par des liens et des pages. Le fondu au défilement est en CSS pur. Hébergé sur GitHub Pages.

## Versions

Versionnage sémantique : `0.x` pendant la construction, `1.0.0` quand le site est complet.
La version vient de `package.json` : on la monte dans la pull request de la version, avec le `CHANGELOG.md`. Le pied de page affiche la version, le commit et la publication GitHub Actions qui a mis le site en ligne.
Chaque version a un milestone (ses issues), un tag sur `main` et une release GitHub. Les changements sont notés dans `CHANGELOG.md`.

## Branches

`main` est protégée : on n'y pousse jamais directement. Une branche courte par tâche (`feat/…`, `fix/…`, `content/…`, `ci/…`, `docs/…`), puis une pull request.
