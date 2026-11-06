// Refuse les fichiers trop lourds : images d'origine (src/assets, public) et
// CV en PDF. Une image plus lourde doit être réduite avant d'être ajoutée.
// Usage : node scripts/verifier-images.mjs
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const LIMITES = [
  { type: 'image', motif: /\.(png|jpe?g|webp|avif|gif|svg)$/i, max: 500 * 1024 },
  { type: 'PDF', motif: /\.pdf$/i, max: 2 * 1024 * 1024 },
];
const ko = (octets) => `${Math.round(octets / 1024)} Ko`;

const trop = [];
let nombre = 0;
const parcourir = (dossier) => {
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    const infos = statSync(chemin);
    if (infos.isDirectory()) {
      parcourir(chemin);
      continue;
    }
    const limite = LIMITES.find((l) => l.motif.test(nom));
    if (!limite) continue;
    nombre++;
    if (infos.size > limite.max) {
      trop.push(`${chemin} : ${ko(infos.size)} (${limite.type}, maximum ${ko(limite.max)})`);
    }
  }
};
for (const dossier of ['src/assets', 'public']) if (existsSync(dossier)) parcourir(dossier);

if (trop.length) {
  console.error(`${trop.length} fichier(s) trop lourd(s) :\n- ${trop.join('\n- ')}`);
  process.exit(1);
}
console.log(`Poids des fichiers : ${nombre} vérifiés, tous sous la limite.`);
