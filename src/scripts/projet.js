// Page projet : ← → et le glissement au doigt passent à l'autre face du même
// projet ; une adresse avec l'ancre d'une solution ouvre cette solution.
// Sans JavaScript, le lien vers l'autre face et les <details> marchent seuls.

const lienAutreFace = document.querySelector('a[data-autre-face]');
const face = document.documentElement.dataset.face;

const ouvrirSolution = () => {
  const id = decodeURIComponent(location.hash.slice(1));
  const cible = id ? document.getElementById(id) : null;
  const details = cible?.querySelector(':scope > details');
  if (details) details.open = true;
  // L'autre face garde la même solution ouverte, si elle y existe.
  if (lienAutreFace) lienAutreFace.hash = location.hash;
};

ouvrirSolution();
window.addEventListener('hashchange', ouvrirSolution);

if (lienAutreFace) {
  // Production à gauche, DevOps à droite, comme sur l'accueil.
  const versAutreFace = face === 'production' ? 'devops' : 'production';
  const aller = (cible) => {
    if (cible === versAutreFace) location.assign(lienAutreFace.href);
  };

  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const cible = e.target instanceof Element ? e.target : null;
    if (cible?.closest('input, textarea, select, [contenteditable="true"], dialog')) return;
    if (e.key === 'ArrowRight') aller('devops');
    else if (e.key === 'ArrowLeft') aller('production');
  });

  // Glissement au doigt seulement : vers la gauche = DevOps, vers la droite =
  // production.
  let depart = null;
  document.addEventListener('pointerdown', (e) => {
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
    aller(dx < 0 ? 'devops' : 'production');
  });
}
