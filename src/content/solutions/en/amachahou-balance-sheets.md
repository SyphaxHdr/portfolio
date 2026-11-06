---
projet: en/amachahou
ordre: 3
titre: The game designer can't tune values without digging in the code → sheets, like in tabletop role-playing games
pistes: [production, devops]
importance: 1
branche: feature/fiches-de-valeurs
commit: "feat: fiches de référence et variantes"
noteDevops: a Unity package installed from its Git URL
sousProjet: balance-sheets

probleme: To balance the game, the game designer had to ask the developers to change values in the code, or look for them in the scripts himself.
compte:
  - The game designer tunes on his own
  - Without touching the code
  - Compare several settings
options:
  - texte: A spreadsheet copied into Unity by hand
    raison: a source of mistakes
  - texte: Show every value in the inspector
    raison: settings get lost from one scene to another
  - texte: A dedicated tool, made for the game designer
    retenue: true
schema:
  - Reference sheet
  - Variants to test
  - The best one is approved
etapes:
  - Value sheets, inspired by tabletop role-playing character sheets.
  - A reference sheet and variants, on the same idea as Git versions.
  - In the game, you switch from one sheet to another, then approve the best one.
resultat: The game designer tunes and compares values himself, without waiting for a developer.
devops:
  etapes:
    - a separate Unity package, in its own repository
    - versioned
    - installed in Amachahou from its Git URL
  lie: "The Gameplay Balance Sheets sub-project (Unity tool, June to August 2026)."
---
