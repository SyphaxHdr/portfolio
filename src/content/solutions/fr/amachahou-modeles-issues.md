---
projet: fr/amachahou
ordre: 4
titre: Créer une tâche prenait trop de temps → un modèle d'issue par métier
pistes: [production, devops]
importance: 1
branche: feature/modeles-issues
commit: "chore: 9 modèles d'issues + valider-titre-issue"
noteDevops: un modèle par métier, titre vérifié

probleme: Créer une tâche demandait de réécrire tout le contexte à chaque fois.
compte:
  - Créer une tâche vite
  - Le même format pour tous
  - Adapté à chaque métier
options:
  - texte: Réécrire le contexte à chaque tâche
    raison: trop long, et chacun l'écrit à sa façon
  - texte: Un modèle par métier, avec un titre vérifié
    retenue: true
etapes:
  - "9 modèles d'issues, un par métier : art, bug, doc, feature, GD, intégration, LD, tech."
  - Chaque modèle reprend le contexte habituel de son métier.
  - Le workflow valider-titre-issue vérifie le titre de chaque nouvelle tâche.
resultat: Une tâche se crée en une minute, au même format pour toute l'équipe.
devops:
  etapes:
    - 9 modèles d'issues, un par métier
    - valider-titre-issue vérifie le titre de chaque nouvelle issue
---
