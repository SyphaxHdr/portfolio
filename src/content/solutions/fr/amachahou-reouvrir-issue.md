---
projet: fr/amachahou
ordre: 6
titre: Des tâches fermées sans responsable → la tâche se rouvre toute seule
pistes: [production, devops]
importance: 1
branche: feature/reouvrir-issue
commit: "fix(ci): reouvrir-issue-non-assignee"
noteDevops: pas de tâche fermée sans assigné

probleme: "En cours de projet, des tâches ont été fermées sans personne assignée : impossible de savoir qui avait fait quoi, ni de répartir la charge."
compte:
  - Savoir qui a fait quoi
  - Répartir la charge
options:
  - texte: Empêcher de fermer une tâche sans assigné
    raison: GitHub ne réagit qu'après la fermeture
  - texte: Rouvrir la tâche et le signaler
    retenue: true
etapes:
  - Quand une tâche est fermée sans assigné, elle est rouverte et un message le signale.
  - Quand une pull request est fusionnée, la tâche liée se ferme toute seule.
resultat: Chaque tâche fermée a un responsable.
devops:
  declencheur: Une issue est fermée.
  etapes:
    - si personne n'est assigné, rouvre l'issue
    - commente pour le signaler
  choix: "GitHub ne réagit qu'à la fermeture : on corrige juste après au lieu de bloquer."
  lie: Le workflow fermer-issue-liee, qui ferme la tâche à la fusion de sa pull request.
---
