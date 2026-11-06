---
projet: fr/amachahou    # langue/nom du fichier du projet (en/amachahou pour l'anglais)
ordre: 1                # place dans la liste du projet
titre: Deux personnes sur la même scène → une alerte avant le conflit
pistes: [production, devops]
importance: 1
branche: feature/alerte-conflit-scene   # obligatoire si la piste devops est cochée
commit: "feat(ci): alerte-conflit-scene" # obligatoire si la piste devops est cochée
noteDevops: deux tâches sur la même scène # une ligne sous le commit, sur le fil DevOps
sousProjet: ""          # un id déclaré dans sousProjets du projet, sinon supprimer la ligne
brouillon: false

# Face production : la fiche qui s'ouvre sous « Voir la solution »
probleme: Deux ou trois phrases sur le problème.
compte:                 # « Ce qui comptait » : des pastilles courtes
  - Prévenir avant le conflit
  - Garder le libre choix des tâches
options:                # au moins deux, une avec retenue: true
  - texte: Verrouiller les fichiers
    raison: trop lourd pour une équipe étudiante   # facultatif
  - texte: Indiquer la scène et alerter
    retenue: true
schema:                 # facultatif : 2 à 4 cases reliées par des flèches
  - Tâche A en cours sur la scène X
  - Tâche B démarre sur X
  - Alerte
etapes:                 # « La solution », étapes numérotées
  - Chaque tâche indique la scène qu'elle touche.
  - Si une autre tâche en cours touche la même scène, un message prévient.
laisse: Ce qu'on a choisi de ne pas faire (facultatif).
resultat: Ce qui a changé pour l'équipe.
preuves:                # facultatif : liens
  - label: Voir le workflow sur GitHub
    url: https://github.com/…

# Face DevOps : obligatoire si la piste devops est cochée
devops:
  declencheur: Une issue passe « en cours ».        # facultatif
  fichier: .github/workflows/alerte-conflit-scene.yml  # facultatif
  etapes:                                          # « Ce que ça fait »
    - lit la scène indiquée dans l'issue
    - commente si une autre issue en cours touche la même scène
  choix: Un avertissement, pas un blocage.         # facultatif
  lie: Les règles des scènes.                      # facultatif
---
