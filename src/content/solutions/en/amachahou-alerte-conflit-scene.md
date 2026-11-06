---
projet: en/amachahou
ordre: 2
titre: Two people on the same scene → a warning before the conflict
pistes: [production, devops]
importance: 1
branche: feature/alerte-conflit-scene
commit: "feat(ci): alerte-conflit-scene"
noteDevops: two tasks on the same scene

probleme: The project grows fast and everyone picks their own tasks. Two people can edit the same Unity scene without knowing it. A scene breaks easily and almost never merges cleanly.
compte:
  - Warn before the conflict
  - Keep the free choice of tasks
  - Nothing to learn
options:
  - texte: Lock the files
    raison: too heavy for a student team
  - texte: Tell each other out loud
    raison: it always ends up forgotten
  - texte: Name the scene in each task and let a tool watch
    retenue: true
schema:
  - Task A in progress on scene X
  - Task B starts on X
  - Warning
etapes:
  - Each task names the scene or scenes it touches.
  - When a task moves to "in progress", the tool looks for another task in progress on the same scene.
  - "If there is one, a message warns the person: pick another task or wait."
laisse: "No blocking: the person keeps the choice if there is no other task."
resultat: Conflicts are spotted before they exist, at the moment people pick their task.
devops:
  declencheur: An issue moves to "in progress".
  fichier: .github/workflows/alerte-conflit-scene.yml
  etapes:
    - reads the scene named in the issue
    - looks for other issues in progress on the same scene
    - if it finds one, posts a comment as a warning
  choix: "A warning, not a block: the project moves on even when a conflict can't be avoided."
  lie: The 6 scene rules (a personal test scene, everything in prefabs, one scene per area…).
---
