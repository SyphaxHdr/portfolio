# Comment ce site est maintenu

Ce site est géré comme un petit projet d'équipe, même si je suis seul dessus.

1. **Le contenu est séparé du code.** Chaque projet et chaque solution est un fichier texte. Changer un texte ne demande pas de toucher au code.
2. **Ajouter un projet prend quelques minutes.** On copie un modèle, on le remplit, on ouvre une pull request.
3. **Rien n'est publié sans vérification.** À chaque pull request, GitHub Actions construit le site et vérifie les champs, les liens, le poids des images et l'orthographe. Si quelque chose ne va pas, la fusion est bloquée.
4. **La publication est automatique.** À la fusion sur `main`, le site est reconstruit et mis en ligne. La date de mise à jour vient du dernier commit.
5. **Chaque version est notée.** Un jalon, un tag Git et une release pour chaque version, de la 0.1 à la 1.0.

## Les choix et leurs raisons

- **Site statique (Astro) sur GitHub Pages** : rapide, sans serveur à surveiller, et gratuit.
- **Une seule branche principale** : je travaille seul ; des branches courtes et des pull requests suffisent, et `main` est toujours publiable.
- **Images en WebP** : plus légères à qualité égale, donc une page qui s'affiche plus vite, surtout sur téléphone.
- **Un service pour le formulaire** : un site statique ne peut pas envoyer d'e-mail ; le service transmet les messages sans afficher mon adresse.
- **Le pipeline avant les fonctionnalités** : dès la première version, chaque changement était vérifié et publié automatiquement.

C'est la même méthode que j'applique aux projets de jeu : des règles simples, vérifiées par des outils, pour que l'équipe se concentre sur le travail.
