---
projet: fr/amachahou
ordre: 7
titre: Rappeler le rebase à chacun après chaque fusion → une notification automatique
pistes: [production, devops]
importance: 1
branche: feature/notifier-merge
commit: "feat(ci): notifier-merge-develop"
noteDevops: prévient l'équipe à chaque fusion sur develop

probleme: Après chaque fusion sur develop, il fallait demander à tout le monde de mettre sa branche à jour (rebase).
compte:
  - Ne plus relancer chacun
  - Des branches à jour
options:
  - texte: Rappeler le rebase à la main
    raison: à refaire après chaque fusion
  - texte: Une notification automatique
    retenue: true
etapes:
  - Une pull request est fusionnée sur develop.
  - Le workflow notifier-merge-develop prévient l'équipe qu'il faut mettre sa branche à jour.
resultat: Plus besoin de rappeler le rebase à chacun.
devops:
  declencheur: Une fusion sur develop.
  etapes:
    - détecte la fusion sur develop
    - prévient l'équipe
---
