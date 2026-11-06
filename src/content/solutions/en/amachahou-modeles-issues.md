---
projet: en/amachahou
ordre: 4
titre: Creating a task took too long → one issue template per discipline
pistes: [production, devops]
importance: 1
branche: feature/modeles-issues
commit: "chore: 9 modèles d'issues + valider-titre-issue"
noteDevops: one template per discipline, title checked

probleme: Creating a task meant writing the whole context again every time.
compte:
  - Create a task quickly
  - The same format for everyone
  - Suited to each discipline
options:
  - texte: Write the context again for every task
    raison: too long, and everyone writes it their own way
  - texte: One template per discipline, with a checked title
    retenue: true
etapes:
  - "9 issue templates, one per discipline: art, bug, doc, feature, GD, integration, LD, tech."
  - Each template includes the usual context of its discipline.
  - The valider-titre-issue workflow checks the title of every new task.
resultat: A task takes a minute to create, in the same format for the whole team.
devops:
  etapes:
    - 9 issue templates, one per discipline
    - valider-titre-issue checks the title of every new issue
---
