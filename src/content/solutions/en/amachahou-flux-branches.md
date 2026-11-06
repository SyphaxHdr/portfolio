---
projet: en/amachahou
ordre: 1
titre: Random branch names → a branch flow checked automatically
pistes: [production, devops]
importance: 1
branche: feature/validate-branch-flow
commit: "feat(ci): validate-branch-flow"
noteDevops: feature → develop → main, checked on every PR

probleme: On Drealm, the year before, branches were named after Jira tickets, with no real rule. The history quickly became hard to read and nobody knew what was ready.
compte:
  - A simple rule
  - Understood by the whole team
  - Easy for artists who are new to Git
options:
  - texte: A convention written in a document
    raison: easy, but nobody reads it again
  - texte: An automatic check
    raison: a bit more work at first, but the rule enforces itself
    retenue: true
schema: [feature/…, develop, main]
etapes:
  - Every task starts from a feature branch.
  - It is merged into develop, then develop into main, which is protected.
  - The validate-branch-flow workflow rejects a pull request that does not follow this path.
resultat: A readable history and a main branch that is always presentable.
devops:
  declencheur: Every pull request.
  etapes:
    - compares the source branch and the target branch
    - blocks the merge if the path is not allowed
  choix: The rule is checked by a tool, not only written in a document.
  lie: A lesson from Drealm (2025-26).
---
