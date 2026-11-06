---
projet: en/easypay
ordre: 2
titre: A payment app, four developers → the whole architecture in UML
pistes: [production]
importance: 2

probleme: A payment app needs a solid architecture and database, and the choice of back end was debated in the team.
compte:
  - Data security
  - A strict back end
  - A shared plan for the four developers
options:
  - texte: Code first, model later
    raison: too risky for payments
  - texte: Model the whole app before coding
    retenue: true
schema:
  - UML diagrams
  - Database
  - Java back end
  - Mobile app
etapes:
  - The project architecture, with a Java back end chosen for its rigor and security.
  - The UML diagrams of the whole app.
  - The database design, based on these diagrams.
resultat: The whole team coded from the same plan.
---
