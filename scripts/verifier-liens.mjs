// Vérifie les liens internes du site construit : chaque page, fichier et
// ancre visés doivent exister. Les liens externes ne sont pas suivis.
// Usage : node scripts/verifier-liens.mjs [dist]
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, posix, relative, sep } from 'node:path';

const racine = process.argv[2] ?? 'dist';
const pages = [];
const parcourir = (dossier) => {
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (statSync(chemin).isDirectory()) parcourir(chemin);
    else if (nom.endsWith('.html')) pages.push(chemin);
  }
};
parcourir(racine);

const adresse = (fichier) => '/' + relative(racine, fichier).split(sep).join('/');

const cacheIds = new Map();
const ids = (fichier) => {
  if (!cacheIds.has(fichier)) {
    const html = readFileSync(fichier, 'utf8');
    cacheIds.set(fichier, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return cacheIds.get(fichier);
};

// « /production/ » → dist/production/index.html ; « /cv/cv.pdf » → dist/cv/cv.pdf
const fichierVise = (chemin, page) => {
  const absolu = chemin.startsWith('/') ? chemin : posix.join(posix.dirname(adresse(page)), chemin);
  const fichier = join(racine, decodeURIComponent(absolu));
  if (absolu.endsWith('/') || (existsSync(fichier) && statSync(fichier).isDirectory())) {
    return join(fichier, 'index.html');
  }
  return fichier;
};

const erreurs = [];
let liens = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const [, , url] of html.matchAll(/\s(href|src|data-src)="([^"]*)"/g)) {
    if (url === '' || /^[a-z][a-z0-9+.-]*:/i.test(url)) continue;
    liens++;
    const [avantAncre, ancre] = url.split('#');
    const chemin = avantAncre.split('?')[0];
    const fichier = chemin ? fichierVise(chemin, page) : page;
    if (!existsSync(fichier)) {
      erreurs.push(`${adresse(page)} : « ${url} » n'existe pas`);
    } else if (ancre && fichier.endsWith('.html') && !ids(fichier).has(decodeURIComponent(ancre))) {
      erreurs.push(`${adresse(page)} : l'ancre « #${ancre} » n'existe pas dans ${adresse(fichier)}`);
    }
  }
}

if (erreurs.length) {
  console.error(`${erreurs.length} lien(s) cassé(s) :\n- ${erreurs.join('\n- ')}`);
  process.exit(1);
}
console.log(`Liens internes : ${liens} vérifiés sur ${pages.length} pages, aucun cassé.`);
