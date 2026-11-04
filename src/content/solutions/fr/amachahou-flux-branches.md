---
projet: fr/amachahou
ordre: 1
titre: Des noms de branches anarchiques → un flux de branches vérifié automatiquement
pistes: [production, devops]
importance: 1
branche: feature/validate-branch-flow
commit: "feat(ci): validate-branch-flow"
noteDevops: feature → develop → main, vérifié à chaque PR

probleme: Sur Drealm, l'année précédente, les branches portaient le nom des tickets Jira, sans vraie règle. L'historique devenait vite illisible et personne ne savait ce qui était prêt.
compte:
  - Une règle simple
  - Comprise par toute l'équipe
  - Facile pour les artistes qui découvrent Git
options:
  - texte: Une convention écrite dans un document
    raison: facile, mais personne ne la relit
  - texte: Une vérification automatique
    raison: un peu plus de travail au départ, mais la règle se fait respecter toute seule
    retenue: true
schema: [feature/…, develop, main]
etapes:
  - Chaque tâche part d'une branche feature.
  - Elle est fusionnée dans develop, puis develop dans main, qui est protégée.
  - Le workflow validate-branch-flow refuse une pull request qui ne suit pas ce chemin.
resultat: Un historique lisible et une branche main toujours présentable.
devops:
  declencheur: Chaque pull request.
  etapes:
    - compare la branche source et la branche cible
    - bloque la fusion si le chemin n'est pas autorisé
  choix: La règle est vérifiée par un outil, pas seulement écrite dans un document.
  lie: Une leçon de Drealm (2025-26).
---
