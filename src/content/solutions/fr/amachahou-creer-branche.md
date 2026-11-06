---
projet: fr/amachahou
ordre: 5
titre: Les artistes devaient créer leurs branches → la branche se crée toute seule
pistes: [production, devops]
importance: 1
branche: feature/creer-branche
commit: "feat(ci): creer-branche"
noteDevops: branche créée quand la tâche passe « à faire »

probleme: Les artistes, qui découvraient Git, devaient créer eux-mêmes une branche pour chaque tâche.
compte:
  - Rien à apprendre pour les artistes
  - Une branche seulement quand elle sert
options:
  - texte: Laisser chacun créer sa branche
    raison: les artistes découvrent Git
  - texte: Créer la branche automatiquement
    retenue: true
schema:
  - Tâche assignée
  - Passe « à faire »
  - Branche créée
etapes:
  - Une tâche assignée passe en « à faire ».
  - Si c'est du travail dans Unity (feature, intégration), sa branche est créée automatiquement.
laisse: Pas de branche pour l'art pur ni pour la documentation.
resultat: Les artistes n'ont plus de branche à créer.
devops:
  declencheur: Une issue assignée passe en « à faire ».
  etapes:
    - vérifie le type de tâche (feature ou intégration)
    - crée la branche de la tâche
  choix: Pas de branche pour l'art pur ni pour la documentation.
---
