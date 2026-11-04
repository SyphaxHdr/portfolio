---
projet: fr/amachahou
ordre: 3
titre: Le game designer ne peut pas régler les valeurs sans fouiller le code → des fiches, comme en JDR
pistes: [production, devops]
importance: 1
branche: feature/fiches-de-valeurs
commit: "feat: fiches de référence et variantes"
noteDevops: un package Unity installé par l'URL Git
sousProjet: balance-sheets
---

## Le problème

Pour équilibrer le jeu, le game designer devait demander aux développeurs de changer des valeurs dans le code, ou les chercher lui-même dans les scripts.

## Ce qui comptait

Qu'il règle les valeurs seul, sans toucher au code, et qu'il puisse comparer plusieurs réglages.

## Les options

- Un tableur à recopier à la main dans Unity : source d'erreurs.
- Exposer chaque valeur dans l'inspecteur : les réglages se perdent d'une scène à l'autre.
- Un outil dédié, pensé pour le game designer.

## La solution

Gameplay Balance Sheets : des fiches de valeurs inspirées des fiches de personnage de jeu de rôle, avec le principe des versions de Git. Une fiche de référence, des variantes pour tester, et on bascule de l'une à l'autre en jeu avant de valider la meilleure.

## Le résultat

Le game designer règle et compare les valeurs lui-même, sans attendre un développeur.

## Côté DevOps

Un package Unity séparé, versionné et installé dans Amachahou par son URL Git.
