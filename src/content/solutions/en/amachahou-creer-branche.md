---
projet: en/amachahou
ordre: 5
titre: The artists had to create their own branches → the branch creates itself
pistes: [production, devops]
importance: 1
branche: feature/creer-branche
commit: "feat(ci): creer-branche"
noteDevops: branch created when the task moves to "to do"

probleme: The artists, who were new to Git, had to create a branch themselves for every task.
compte:
  - Nothing for the artists to learn
  - A branch only when it is needed
options:
  - texte: Let everyone create their own branch
    raison: the artists are new to Git
  - texte: Create the branch automatically
    retenue: true
schema:
  - Task assigned
  - Moves to "to do"
  - Branch created
etapes:
  - An assigned task moves to "to do".
  - If it is work in Unity (feature, integration), its branch is created automatically.
laisse: No branch for pure art or for documentation.
resultat: The artists no longer have branches to create.
devops:
  declencheur: An assigned issue moves to "to do".
  etapes:
    - checks the type of task (feature or integration)
    - creates the task's branch
  choix: No branch for pure art or for documentation.
---
