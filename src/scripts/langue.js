// Le lien vers l'autre langue garde la page et l'endroit où l'on est. Sur
// l'accueil, la face change l'adresse sans recharger la page (/devops/) et,
// sur une page projet, une solution ouverte est dans l'ancre (#…) : le lien
// suit l'adresse du moment. Sans JavaScript, il mène à la même page, en haut.

const lien = document.querySelector('[data-langue]');

if (lien) {
  const prefixe = lien.dataset.langue === 'fr' ? '' : `/${lien.dataset.langue}`;
  const suivre = () => {
    const chemin = location.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    lien.href = `${prefixe}${chemin}${location.hash}`;
  };
  ['pointerenter', 'focus', 'click'].forEach((evenement) => lien.addEventListener(evenement, suivre));
}
