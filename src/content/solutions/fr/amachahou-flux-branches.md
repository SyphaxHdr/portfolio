---
projet: fr/amachahou
ordre: 1
titre: Des noms de branches anarchiques → un flux de branches vérifié automatiquement
pistes: [production, devops]
importance: 1
branche: feature/validate-branch-flow
commit: "feat(ci): validate-branch-flow"
---

## Le problème

Sur Drealm, l'année précédente, les branches portaient le nom des tickets Jira, sans vraie règle. L'historique devenait vite illisible et personne ne savait ce qui était prêt.

## Ce qui comptait

Une règle simple, compréhensible par toute l'équipe, y compris les artistes qui découvrent Git.

## Les options

- Une convention écrite dans un document : facile, mais personne ne la relit.
- Une vérification automatique : un peu plus de travail au départ, mais la règle se fait respecter toute seule.

## La solution

Un flux unique : feature → develop → main, avec `main` protégée. Le workflow `validate-branch-flow` refuse une pull request qui ne suit pas ce chemin.

## Le résultat

Un historique lisible et une branche `main` toujours présentable.

## Côté DevOps

Déclencheur : chaque pull request. Le workflow compare la branche source et la branche cible, et bloque la fusion si le chemin n'est pas autorisé.
