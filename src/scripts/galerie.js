// Carrousel des images d'un projet. Sans JavaScript, c'est une bande qu'on
// fait défiler au doigt, et chaque image s'ouvre en grand dans une page.
// Avec JavaScript : les points disent quelles images sont affichées, on
// avance avec les flèches, les points, la molette ou en glissant à la souris,
// et un clic ouvre l'image dans une visionneuse.

const pas = (liste) => {
  const items = liste.children;
  if (items.length < 2) return liste.clientWidth;
  return items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left;
};

const allerA = (liste, index) => {
  const items = [...liste.children];
  const i = Math.max(0, Math.min(index, items.length - 1));
  const gauche = items[i].getBoundingClientRect().left - liste.getBoundingClientRect().left + liste.scrollLeft;
  liste.scrollTo({ left: gauche, behavior: 'smooth' });
};

// Première image visible (à une demi-image près).
const premiere = (liste) => Math.round(liste.scrollLeft / pas(liste));

document.querySelectorAll('[data-galerie]').forEach((galerie) => {
  const liste = galerie.querySelector('.visuels');
  const items = [...liste.children];
  const nav = galerie.querySelector('.galerie__nav');
  const points = [...galerie.querySelectorAll('.galerie__point')];
  const [avant, apres] = nav ? nav.querySelectorAll('.galerie__fleche') : [];
  const visionneuse = galerie.querySelector('.visionneuse');

  // Points et flèches : on les montre seulement s'il y a à faire défiler.
  const visibles = new Set();
  const majPoints = () => {
    const tout = liste.scrollWidth <= liste.clientWidth + 1;
    if (nav) nav.hidden = tout;
    points.forEach((p, i) => p.setAttribute('aria-current', String(visibles.has(i))));
    if (avant) avant.disabled = liste.scrollLeft <= 1;
    if (apres) apres.disabled = liste.scrollLeft + liste.clientWidth >= liste.scrollWidth - 1;
  };
  const vu = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((e) => {
        const i = items.indexOf(e.target);
        if (e.intersectionRatio >= 0.6) visibles.add(i);
        else visibles.delete(i);
      });
      majPoints();
    },
    { root: liste, threshold: [0, 0.6, 1] },
  );
  items.forEach((item) => vu.observe(item));
  liste.addEventListener('scroll', majPoints, { passive: true });
  new ResizeObserver(majPoints).observe(liste);

  avant?.addEventListener('click', () => allerA(liste, premiere(liste) - 1));
  apres?.addEventListener('click', () => allerA(liste, premiere(liste) + 1));
  points.forEach((p, i) =>
    p.addEventListener('click', () => {
      // Si l'image est déjà affichée, rien ; sinon, on la met en premier.
      if (!visibles.has(i)) allerA(liste, i);
    }),
  );

  // Molette : une image à la fois ; au bout du carrousel, la page défile.
  let attente = false;
  liste.addEventListener(
    'wheel',
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.ctrlKey) return;
      const sens = Math.sign(e.deltaY);
      const auDebut = liste.scrollLeft <= 1;
      const aLaFin = liste.scrollLeft + liste.clientWidth >= liste.scrollWidth - 1;
      if (!sens || (sens < 0 && auDebut) || (sens > 0 && aLaFin)) return;
      e.preventDefault();
      if (attente) return;
      attente = true;
      setTimeout(() => {
        attente = false;
      }, 450);
      allerA(liste, premiere(liste) + sens);
    },
    { passive: false },
  );

  // Glisser à la souris (au doigt, le navigateur le fait déjà). On bloque le
  // glisser-déposer natif des liens et des images, qui couperait le geste.
  liste.addEventListener('dragstart', (e) => e.preventDefault());
  let depart = null;
  let glisse = false;
  liste.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    depart = { x: e.clientX, gauche: liste.scrollLeft };
    glisse = false;
  });
  window.addEventListener('pointermove', (e) => {
    if (!depart) return;
    const dx = e.clientX - depart.x;
    if (!glisse && Math.abs(dx) > 6) {
      glisse = true;
      liste.classList.add('visuels--glisse');
    }
    if (glisse) {
      e.preventDefault();
      liste.scrollLeft = depart.gauche - dx;
    }
  });
  window.addEventListener('pointerup', () => {
    if (!depart) return;
    depart = null;
    if (!glisse) return;
    liste.classList.remove('visuels--glisse');
    allerA(liste, premiere(liste));
    // Le clic qui suit un glissement n'ouvre pas l'image.
    setTimeout(() => {
      glisse = false;
    }, 0);
  });

  // La visionneuse.
  if (!visionneuse) return;
  const image = visionneuse.querySelector('.visionneuse__image');
  const legende = visionneuse.querySelector('.visionneuse__legende');
  const compte = visionneuse.querySelector('.visionneuse__compte');
  const [vAvant, vApres] = visionneuse.querySelectorAll('.galerie__fleche');
  let courant = 0;
  const montrer = (i) => {
    courant = (i + items.length) % items.length;
    const lien = items[courant].querySelector('.visuel');
    const vignette = lien.querySelector('img');
    image.src = lien.getAttribute('href');
    image.alt = vignette.alt;
    image.width = vignette.width;
    image.height = vignette.height;
    legende.textContent = vignette.alt;
    if (compte) compte.textContent = `${courant + 1} / ${items.length}`;
  };
  liste.addEventListener('click', (e) => {
    const lien = e.target instanceof Element ? e.target.closest('.visuel') : null;
    if (!lien) return;
    e.preventDefault();
    if (glisse) return;
    montrer(Number(lien.dataset.index));
    visionneuse.showModal();
  });
  vAvant?.addEventListener('click', () => montrer(courant - 1));
  vApres?.addEventListener('click', () => montrer(courant + 1));
  visionneuse.querySelector('[data-fermer]').addEventListener('click', () => visionneuse.close());
  visionneuse.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') montrer(courant - 1);
    else if (e.key === 'ArrowRight') montrer(courant + 1);
    else return;
    e.preventDefault();
  });
  // Un clic à côté de l'image (sur le fond) ferme la visionneuse.
  visionneuse.addEventListener('click', (e) => {
    if (e.target !== visionneuse) return;
    const r = visionneuse.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) visionneuse.close();
  });
  // Quand on ferme, le carrousel montre l'image qu'on regardait.
  visionneuse.addEventListener('close', () => {
    if (!visibles.has(courant)) allerA(liste, courant);
  });
});
