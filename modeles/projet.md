---
titre: Nom du projet
titreDevops: nom-du-depot
type: equipe            # equipe | solo | jam | etudes | outil
periode: "2026-27"
debut: 2026-09-01         # sert à ranger le fil (le plus récent en haut)
fin: 2027-02-28           # date de sortie ou de fin ; supprimer la ligne si en cours
statut: en-cours        # en-cours | sorti | arrete
role: Producteur et outils
equipe: 16
pistes: [production, devops]   # au moins une des deux
importance: 1           # 1 vitrine, 2 secondaire, 3 archive
couleur: 1              # 1 à 4 : la couleur de branche
version: ""             # ex. "v1.0 · 10 oct. 2026" si sorti, sinon supprimer la ligne
resume: Une phrase sur le projet.
resumeDevops: Une phrase technique.
pile: [Unity 6, Git LFS]  # étiquettes de la face DevOps
sousProjets:              # facultatif
  - id: balance-sheets
    titre: Gameplay Balance Sheets
    titreDevops: "package · unity-gameplay-balance-sheets"
liens:
  - label: itch.io
    url: https://exemple.itch.io/jeu
brouillon: false        # true = le fichier existe mais n'est pas affiché
---

Texte libre de la page projet (contexte, équipe).
