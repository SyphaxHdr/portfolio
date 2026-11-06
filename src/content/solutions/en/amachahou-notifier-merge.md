---
projet: en/amachahou
ordre: 7
titre: Reminding everyone to rebase after each merge → an automatic notification
pistes: [production, devops]
importance: 1
branche: feature/notifier-merge
commit: "feat(ci): notifier-merge-develop"
noteDevops: tells the team about every merge into develop

probleme: After every merge into develop, everyone had to be asked to update their branch (rebase).
compte:
  - No more chasing each person
  - Branches kept up to date
options:
  - texte: Remind people to rebase by hand
    raison: to be done again after every merge
  - texte: An automatic notification
    retenue: true
etapes:
  - A pull request is merged into develop.
  - The notifier-merge-develop workflow tells the team to update their branch.
resultat: No need to remind each person to rebase anymore.
devops:
  declencheur: A merge into develop.
  etapes:
    - detects the merge into develop
    - tells the team
---
