---
projet: en/amachahou
ordre: 6
titre: Tasks closed with no owner → the task reopens itself
pistes: [production, devops]
importance: 1
branche: feature/reouvrir-issue
commit: "fix(ci): reouvrir-issue-non-assignee"
noteDevops: no task closed without an assignee

probleme: "During the project, some tasks were closed with nobody assigned: no way to know who had done what, or to share the workload."
compte:
  - Know who did what
  - Share the workload
options:
  - texte: Prevent closing a task without an assignee
    raison: GitHub only reacts after the task is closed
  - texte: Reopen the task and flag it
    retenue: true
etapes:
  - When a task is closed with no assignee, it is reopened and a message flags it.
  - When a pull request is merged, the linked task closes on its own.
resultat: Every closed task has an owner.
devops:
  declencheur: An issue is closed.
  etapes:
    - if nobody is assigned, reopens the issue
    - posts a comment to flag it
  choix: "GitHub only reacts once the issue is closed: we fix it right after instead of blocking."
  lie: The fermer-issue-liee workflow, which closes the task when its pull request is merged.
---
