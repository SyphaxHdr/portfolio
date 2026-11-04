// Fenêtres : CV, contact, « Comment ce site est maintenu ? ».
// Sans JavaScript, les liens mènent au PDF ou aux pages /cv/, /contact/ et
// /maintenance/. Échap, la croix et un clic sur le fond ferment la fenêtre ;
// le navigateur rend alors le focus au bouton qui l'a ouverte.

// Statut de la dernière publication, lu dans l'API publique de GitHub.
const relatif = (date, langue) => {
  const format = new Intl.RelativeTimeFormat(langue, { numeric: 'auto' });
  const secondes = (date.getTime() - Date.now()) / 1000;
  const unites = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unite, duree] of unites) {
    if (Math.abs(secondes) >= duree) return format.format(Math.round(secondes / duree), unite);
  }
  return format.format(Math.round(secondes), 'second');
};

const chargerStatut = async (pipeline) => {
  const depot = pipeline.dataset.depot;
  if (!depot || pipeline.dataset.charge) return;
  pipeline.dataset.charge = 'oui';
  const textes = JSON.parse(pipeline.dataset.statut || '{}');
  try {
    const reponse = await fetch(
      `https://api.github.com/repos/${depot}/actions/workflows/deploy.yml/runs?branch=main&per_page=1`,
      { headers: { Accept: 'application/vnd.github+json' } },
    );
    if (!reponse.ok) return;
    const run = (await reponse.json()).workflow_runs?.[0];
    if (!run) return;

    const etat =
      run.status !== 'completed' ? 'enCours' : run.conclusion === 'success' ? 'reussi' : 'echoue';
    const ligne = pipeline.querySelector('.pipeline__statut');
    const lien = pipeline.querySelector('.pipeline__run');
    ligne.dataset.etat = etat;
    pipeline.querySelector('.pipeline__statut-texte').textContent =
      `${textes.avant} ${textes[etat]}, ${relatif(new Date(run.updated_at), textes.langue)} ·`;
    lien.href = run.html_url;
    lien.textContent = textes.voir;
    ligne.hidden = false;
  } catch {
    // Pas de réseau ou limite de l'API atteinte : le tampon de build suffit.
  }
};

const ouvrir = (fenetre) => {
  if (fenetre.open) return;
  fenetre.showModal();
  // Le PDF ne se charge qu'à l'ouverture, et seulement s'il est affiché
  // (sur téléphone, c'est l'aperçu en image).
  fenetre.querySelectorAll('iframe[data-src]').forEach((cadre) => {
    if (cadre.offsetParent) {
      cadre.src = cadre.dataset.src;
      cadre.removeAttribute('data-src');
    }
  });
  fenetre.querySelectorAll('.pipeline').forEach(chargerStatut);
};

document.addEventListener('click', (e) => {
  const lien = e.target instanceof Element ? e.target.closest('a[data-fenetre]') : null;
  if (!lien || e.defaultPrevented || e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const fenetre = document.getElementById(`fenetre-${lien.dataset.fenetre}`);
  if (!(fenetre instanceof HTMLDialogElement)) return;
  e.preventDefault();
  ouvrir(fenetre);
});

const focalisables =
  'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), textarea, iframe';

document.querySelectorAll('dialog.fenetre').forEach((fenetre) => {
  // Un clic sur le fond (hors de la fenêtre) la ferme.
  fenetre.addEventListener('click', (e) => {
    if (e.target !== fenetre) return;
    const r = fenetre.getBoundingClientRect();
    const dehors =
      e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    if (dehors) fenetre.close();
  });

  // Tab boucle dans la fenêtre au lieu de partir vers la barre du navigateur.
  fenetre.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const elements = [...fenetre.querySelectorAll(focalisables)].filter((el) => el.offsetParent);
    const premier = elements[0];
    const dernier = elements.at(-1);
    if (!premier) return;
    if (e.shiftKey && document.activeElement === premier) {
      e.preventDefault();
      dernier.focus();
    } else if (!e.shiftKey && document.activeElement === dernier) {
      e.preventDefault();
      premier.focus();
    }
  });
});

// Sur la page /maintenance/, le statut se charge tout de suite.
document.querySelectorAll('main .pipeline').forEach(chargerStatut);

// Formulaire de contact : envoi sans quitter la page. Sans JavaScript, le
// formulaire est envoyé normalement à Formspree.
document.querySelectorAll('form.contact').forEach((formulaire) => {
  formulaire.addEventListener('submit', async (e) => {
    e.preventDefault();
    const etat = formulaire.querySelector('.contact__etat');
    const bouton = formulaire.querySelector('button[type="submit"]');
    bouton.disabled = true;
    etat.textContent = formulaire.dataset.envoi;
    try {
      const reponse = await fetch(formulaire.action, {
        method: 'POST',
        body: new FormData(formulaire),
        headers: { Accept: 'application/json' },
      });
      if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
      formulaire.reset();
      formulaire.classList.add('contact--envoye');
      etat.textContent = formulaire.dataset.merci;
    } catch {
      etat.textContent = formulaire.dataset.erreur;
      bouton.disabled = false;
    }
  });
});
