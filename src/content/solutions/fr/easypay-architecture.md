---
projet: fr/easypay
ordre: 2
titre: Une application de paiement, quatre développeurs → toute l'architecture en UML
pistes: [production]
importance: 2

probleme: Une application de paiement demande une architecture et une base de données solides, et le choix du back-end a fait débat dans l'équipe.
compte:
  - La sécurité des données
  - Un back-end rigide
  - Un plan commun pour les quatre développeurs
options:
  - texte: Coder d'abord, modéliser ensuite
    raison: trop risqué pour des paiements
  - texte: Modéliser toute l'application avant de coder
    retenue: true
schema:
  - Diagrammes UML
  - Base de données
  - Back-end Java
  - Application mobile
etapes:
  - L'architecture du projet, avec un back-end en Java choisi pour sa rigueur et sa sécurité.
  - Les diagrammes UML de toute l'application.
  - La conception de la base de données à partir de ces diagrammes.
resultat: Toute l'équipe codait à partir du même plan.
---
