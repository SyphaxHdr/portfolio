---
projet: en/amachahou
ordre: 10
titre: Large files pushed again every time → Git LFS and a guide for the whole team
pistes: [production]
importance: 2

probleme: On Drealm, large files had to be pushed again every time someone picked up a branch.
compte:
  - A light repository
  - A setup without mistakes for everyone
options:
  - texte: Keep the large files in Git
    raison: pushed again every time a branch is picked up
  - texte: Git LFS, with a setup guide
    retenue: true
etapes:
  - Large files go through Git LFS.
  - "A badly installed LFS is trap number one: a 17-part DevOps guide explains the setup to the whole team."
  - The guide is based on the official documentation; videos are planned.
resultat: The whole team installs Git LFS the same way, with the guide.
---
