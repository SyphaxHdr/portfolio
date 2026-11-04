---
projet: fr/amachahou
ordre: 2
titre: Deux personnes sur la même scène → une alerte avant le conflit
pistes: [production, devops]
importance: 1
branche: feature/alerte-conflit-scene
commit: "feat(ci): alerte-conflit-scene"
---

## Le problème

Le projet grossit vite et chacun choisit librement ses tâches. Deux personnes peuvent modifier la même scène Unity sans le savoir. Or une scène se corrompt facilement et ne se fusionne presque jamais proprement.

## Ce qui comptait

Prévenir avant que le travail commence, plutôt que réparer après.

## Les options

- Verrouiller les fichiers : trop lourd pour une équipe étudiante.
- Se prévenir à l'oral : ça finit toujours par être oublié.
- Indiquer la scène dans chaque tâche et laisser un outil surveiller.

## La solution

Chaque issue indique la scène touchée. Si quelqu'un commence une tâche sur une scène déjà en cours, `alerte-conflit-scene` le prévient : il change de tâche ou il attend. Six règles complètent l'outil : une scène de test personnelle, tout en prefab, une scène par zone…

## Le résultat

Les conflits sont repérés avant d'exister, au moment où l'on choisit sa tâche.

## Côté DevOps

Déclencheur : une issue passe « en cours ». Le workflow lit la scène indiquée, cherche les autres issues en cours sur la même scène et commente si besoin.
