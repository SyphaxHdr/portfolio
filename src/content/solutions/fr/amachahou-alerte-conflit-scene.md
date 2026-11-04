---
projet: fr/amachahou
ordre: 2
titre: Deux personnes sur la même scène → une alerte avant le conflit
pistes: [production, devops]
importance: 1
branche: feature/alerte-conflit-scene
commit: "feat(ci): alerte-conflit-scene"
noteDevops: deux tâches sur la même scène

probleme: Le projet grossit vite et chacun choisit librement ses tâches. Deux personnes peuvent modifier la même scène Unity sans le savoir. Or une scène se corrompt facilement et ne se fusionne presque jamais proprement.
compte:
  - Prévenir avant le conflit
  - Garder le libre choix des tâches
  - Rien à apprendre
options:
  - texte: Verrouiller les fichiers
    raison: trop lourd pour une équipe étudiante
  - texte: Se prévenir à l'oral
    raison: ça finit toujours par être oublié
  - texte: Indiquer la scène dans chaque tâche et laisser un outil surveiller
    retenue: true
schema:
  - Tâche A en cours sur la scène X
  - Tâche B démarre sur X
  - Alerte
etapes:
  - Chaque tâche indique la ou les scènes qu'elle touche.
  - Quand une tâche passe « en cours », on cherche une autre tâche en cours sur la même scène.
  - "Si c'est le cas, un message prévient : on change de tâche ou on attend."
laisse: "Pas de blocage : la personne garde le choix si elle n'a pas d'autre tâche."
resultat: Les conflits sont repérés avant d'exister, au moment où l'on choisit sa tâche.
devops:
  declencheur: Une issue passe « en cours ».
  fichier: .github/workflows/alerte-conflit-scene.yml
  etapes:
    - lit la scène indiquée dans l'issue
    - cherche les autres issues en cours sur la même scène
    - si elle en trouve une, commente pour prévenir
  choix: "Un avertissement, pas un blocage : le projet avance même en cas de conflit inévitable."
  lie: Les 6 règles des scènes (une scène de test personnelle, tout en prefab, une scène par zone…).
---
