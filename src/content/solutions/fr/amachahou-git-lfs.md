---
projet: fr/amachahou
ordre: 10
titre: De gros fichiers repoussés à chaque fois → Git LFS et un guide pour toute l'équipe
pistes: [production]
importance: 2

probleme: Sur Drealm, il fallait repousser de gros fichiers à chaque reprise de branche.
compte:
  - Un dépôt léger
  - Une installation sans erreur pour tous
options:
  - texte: Garder les gros fichiers dans Git
    raison: repoussés à chaque reprise de branche
  - texte: Git LFS, avec un guide d'installation
    retenue: true
etapes:
  - Les gros fichiers passent par Git LFS.
  - "Un LFS mal installé est le piège n°1 : un guide DevOps en 17 parties explique l'installation à toute l'équipe."
  - Le guide s'appuie sur la documentation officielle ; des vidéos sont prévues.
resultat: Toute l'équipe installe Git LFS de la même façon, guide à l'appui.
---
