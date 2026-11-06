// Changement de face : flèches, pièce, clavier (← →), glissement au doigt
// et bouton « retour » du navigateur.
// Sans JavaScript, les flèches restent de simples liens.

const racine = document.documentElement;
const faces = document.querySelector('.faces');

if (faces) {
  // En anglais, les adresses commencent par /en (data-racine).
  const prefixe = faces.dataset.racine || '';
  const adresses = {
    neutre: `${prefixe}/`,
    production: `${prefixe}/production/`,
    devops: `${prefixe}/devops/`,
  };
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
    const chemin = location.pathname.slice(prefixe.length);
    if (chemin.startsWith('/production')) return 'production';
    if (chemin.startsWith('/devops')) return 'devops';
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
    if (e.target.closest('a, button, summary, input, textarea, select, label, dialog')) return;
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

// Les deux bras sous le nom, dessinés chacun d'un seul trait en SVG. En CSS,
// la courbe et la ligne droite sont deux morceaux que le navigateur n'arrondit
// pas au même pixel à certains zooms (90 %, 110 %…) : on voyait une marche.
// Le trait suit exactement le dessin CSS, qui reste sans JavaScript.
const corps = document.querySelector('.heros__corps');
if (corps) {
  const NS = 'http://www.w3.org/2000/svg';
  const sonde = document.createElement('i');
  sonde.setAttribute('aria-hidden', 'true');
  sonde.style.cssText = 'position:absolute;top:0;left:0;height:0;visibility:hidden;pointer-events:none';
  corps.append(sonde);
  const mesure = (variable) => {
    sonde.style.width = `var(${variable})`;
    return sonde.getBoundingClientRect().width;
  };
  const traits = [...corps.querySelectorAll('.bras')].map((bras) => {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'bras__trait');
    svg.setAttribute('aria-hidden', 'true');
    const chemin = document.createElementNS(NS, 'path');
    svg.append(chemin);
    bras.append(svg);
    return { bras, svg, chemin, miroir: bras.classList.contains('bras--devops') };
  });
  const dessiner = () => {
    const { width: W, height: H } = corps.getBoundingClientRect();
    const t = mesure('--trait');
    const xt = mesure('--x-tronc');
    const r = mesure('--r');
    const rt = mesure('--r-tige');
    const yb = mesure('--y-bras');
    const R = rt + t / 2; // rayon de la courbe sous le nom (au milieu du trait)
    const r2 = r - t / 2; // rayon du coin, au bord
    const y = yb + t / 2; // hauteur de la ligne horizontale (au milieu du trait)
    for (const { svg, chemin, miroir } of traits) {
      const x = (v) => (miroir ? W - v : v).toFixed(2);
      const s = (sens) => (miroir ? 1 - sens : sens);
      svg.setAttribute('viewBox', `0 0 ${W.toFixed(2)} ${H.toFixed(2)}`);
      chemin.setAttribute(
        'd',
        [
          `M${x(W / 2)} 0`,
          `V${(yb - rt).toFixed(2)}`,
          `A${R} ${R} 0 0 ${s(1)} ${x(W / 2 - R)} ${y.toFixed(2)}`,
          `H${x(xt + r)}`,
          `A${r2} ${r2} 0 0 ${s(0)} ${x(xt + t / 2)} ${(yb + r).toFixed(2)}`,
          `V${H.toFixed(2)}`,
        ].join(' '),
      );
    }
    corps.classList.add('heros__corps--svg');
  };
  dessiner();
  new ResizeObserver(dessiner).observe(corps);
}
