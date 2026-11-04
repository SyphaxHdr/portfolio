// Changement de face : flèches, pièce, clavier (← →), glissement au doigt
// et bouton « retour » du navigateur.
// Sans JavaScript, les flèches restent de simples liens.

const racine = document.documentElement;
const faces = document.querySelector('.faces');

if (faces) {
  const adresses = { neutre: '/', production: '/production/', devops: '/devops/' };
  const titres = JSON.parse(faces.dataset.titres || '{}');
  const annonces = JSON.parse(faces.dataset.annonces || '{}');
  const scene = faces.querySelector('.piece-scene');
  const piece = faces.querySelector('.piece');
  const rotation = faces.querySelector('.piece__rotation');
  const annonce = faces.querySelector('.annonce');

  const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)');
  let face = racine.dataset.face || 'neutre';
  let angle = face === 'devops' ? 180 : 0;
  let finDeRotation = 0;

  // Au repos, la pièce est à plat (nette) ; on active la 3D le temps de tourner.
  const tourner = () => {
    if (!piece || !rotation) return;
    const cote = angle % 360 === 180 ? 'devops' : 'production';
    clearTimeout(finDeRotation);

    if (mouvementReduit.matches) {
      piece.dataset.cote = cote;
      return;
    }

    if (piece.classList.contains('piece--repos')) {
      rotation.style.transition = 'none';
      piece.classList.remove('piece--repos');
      void rotation.offsetWidth; // la 3D reprend sans animation parasite
      rotation.style.transition = '';
    }

    rotation.style.setProperty('--angle', `${angle}deg`);
    piece.dataset.cote = cote;

    const auRepos = () => {
      clearTimeout(finDeRotation);
      piece.classList.add('piece--repos');
    };
    rotation.addEventListener('transitionend', auRepos, { once: true });
    finDeRotation = setTimeout(auRepos, 1400);
  };

  const faceDeLAdresse = () => {
    if (location.pathname.startsWith('/production')) return 'production';
    if (location.pathname.startsWith('/devops')) return 'devops';
    return 'neutre';
  };

  // Rotation à ajouter pour montrer la bonne face de la pièce.
  // Face production = 0°, face DevOps = 180° (modulo 360°).
  const rotationVers = (cible, lancer) => {
    if (cible === 'neutre') return angle % 360 === 180 ? 180 : 0;
    if (lancer) return face === 'neutre' && cible === 'production' ? 1080 : 900;
    if (face === 'neutre') return cible === 'devops' ? 180 : 360;
    return cible === 'devops' ? 180 : -180;
  };

  const marquerFaceCourante = () => {
    document.querySelectorAll('a[data-vers]').forEach((lien) => {
      if (lien.dataset.vers === face) lien.setAttribute('aria-current', 'page');
      else lien.removeAttribute('aria-current');
    });
  };

  const afficher = (cible, { lancer = false, historique = true } = {}) => {
    if (!(cible in adresses) || cible === face) return;

    angle += rotationVers(cible, lancer);
    face = cible;
    racine.dataset.face = cible;
    tourner();

    if (scene) {
      scene.classList.remove('lancer');
      if (lancer) {
        void scene.offsetWidth; // relance l'animation du saut
        scene.classList.add('lancer');
      }
    }

    marquerFaceCourante();
    if (titres[cible]) document.title = titres[cible];
    if (historique) history.pushState({ face: cible }, '', adresses[cible]);
    if (annonce) annonce.textContent = annonces[cible] || '';
  };

  // Liens vers une face : on reste sur la page (Ctrl+clic ouvre toujours un onglet).
  document.addEventListener('click', (e) => {
    const lien = e.target instanceof Element ? e.target.closest('a[data-vers]') : null;
    if (!lien || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    afficher(lien.dataset.vers);
  });

  // La pièce : sur l'accueil, elle tombe au hasard ; sinon elle se retourne.
  if (piece) {
    piece.hidden = false;
    piece.addEventListener('click', () => {
      const autre = { production: 'devops', devops: 'production' }[face];
      const cible = autre || (Math.random() < 0.5 ? 'production' : 'devops');
      afficher(cible, { lancer: true });
    });
  }
  scene?.addEventListener('animationend', () => scene.classList.remove('lancer'));

  // Clavier : ← production, → DevOps (sauf pendant une saisie).
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const cibleClavier = e.target instanceof Element ? e.target : null;
    if (cibleClavier?.closest('input, textarea, select, [contenteditable="true"], dialog')) return;
    if (e.key === 'ArrowRight') afficher('devops');
    else if (e.key === 'ArrowLeft') afficher('production');
  });

  // Glissement au doigt (pas à la souris, pour ne pas gêner la sélection de
  // texte) : vers la gauche = DevOps, vers la droite = production.
  let depart = null;
  faces.addEventListener('pointerdown', (e) => {
    depart = null;
    if (e.pointerType === 'mouse' || !(e.target instanceof Element)) return;
    if (e.target.closest('a, button, summary, input, textarea, select, label')) return;
    depart = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener('pointercancel', () => {
    depart = null;
  });
  window.addEventListener('pointerup', (e) => {
    if (!depart) return;
    const dx = e.clientX - depart.x;
    const dy = e.clientY - depart.y;
    depart = null;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    afficher(dx < 0 ? 'devops' : 'production');
  });

  // Boutons « précédent » et « suivant » du navigateur.
  history.replaceState({ face }, '');
  window.addEventListener('popstate', () => afficher(faceDeLAdresse(), { historique: false }));
}
