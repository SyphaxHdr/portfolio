---
projet: fr/amachahou
ordre: 3
titre: Le game designer ne peut pas régler les valeurs sans fouiller le code → des fiches, comme en JDR
pistes: [production, devops]
importance: 1
branche: feature/fiches-de-valeurs
commit: "feat: fiches de référence et variantes"
noteDevops: un package Unity installé par l'URL Git
sousProjet: balance-sheets

probleme: Pour équilibrer le jeu, le game designer devait demander aux développeurs de changer des valeurs dans le code, ou les chercher lui-même dans les scripts.
compte:
  - Le game designer règle seul
  - Sans toucher au code
  - Comparer plusieurs réglages
options:
  - texte: Un tableur à recopier à la main dans Unity
    raison: source d'erreurs
  - texte: Exposer chaque valeur dans l'inspecteur
    raison: les réglages se perdent d'une scène à l'autre
  - texte: Un outil dédié, pensé pour le game designer
    retenue: true
schema:
  - Fiche de référence
  - Variantes à tester
  - La meilleure est validée
etapes:
  - Des fiches de valeurs, inspirées des fiches de personnage de jeu de rôle.
  - Une fiche de référence et des variantes, sur le principe des versions de Git.
  - En jeu, on bascule d'une fiche à l'autre, puis on valide la meilleure.
resultat: Le game designer règle et compare les valeurs lui-même, sans attendre un développeur.
devops:
  etapes:
    - un package Unity séparé, dans son propre dépôt
    - versionné
    - installé dans Amachahou par son URL Git
  lie: "Le sous-projet Gameplay Balance Sheets (outil Unity, juin-août 2026)."
---
