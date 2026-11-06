import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Langue = 'fr' | 'en';
export type FaceProjet = 'production' | 'devops';
export type Face = 'neutre' | FaceProjet;
export type Projet = CollectionEntry<'projets'>;
export type Solution = CollectionEntry<'solutions'>;

export const FACES: FaceProjet[] = ['production', 'devops'];
export const LANGUES: Langue[] = ['fr', 'en'];

// Le français est à la racine (/devops/), l'anglais sous /en/ (/en/devops/).
export const racine = (langue: Langue) => (langue === 'fr' ? '' : `/${langue}`);
export const adresse = (langue: Langue, chemin: string) => `${racine(langue)}${chemin}`;
export const autreLangue = (langue: Langue): Langue => (langue === 'fr' ? 'en' : 'fr');

// L'adresse d'une page sans sa langue : « /en/devops/ » → « /devops/ ».
export function sansLangue(chemin: string) {
  const sans = chemin.replace(/^\/en(?=\/|$)/, '') || '/';
  return sans.endsWith('/') ? sans : `${sans}/`;
}

export async function textes(langue: Langue) {
  const ui = await getEntry('ui', langue);
  if (!ui) throw new Error(`Textes d'interface manquants : src/content/i18n/${langue}.yaml`);
  return ui.data;
}

export async function profil() {
  const entree = await getEntry('profil', 'profil');
  if (!entree) throw new Error('Profil manquant : src/content/profil.yaml');
  return entree.data;
}

export async function projets(langue: Langue, face: FaceProjet) {
  const liste = await getCollection(
    'projets',
    ({ id, data }) => id.startsWith(`${langue}/`) && !data.brouillon && data.pistes.includes(face),
  );
  // Le plus récent en haut : les projets en cours d'abord, puis par date de fin.
  const fin = (p: Projet) => p.data.fin?.getTime() ?? Infinity;
  return liste.sort(
    (a, b) => fin(b) - fin(a) || b.data.debut.getTime() - a.data.debut.getTime(),
  );
}

export async function solutions(langue: Langue, face: FaceProjet) {
  const liste = await getCollection(
    'solutions',
    ({ id, data }) => id.startsWith(`${langue}/`) && !data.brouillon && data.pistes.includes(face),
  );
  return liste.sort((a, b) => a.data.ordre - b.data.ordre);
}

export async function parcours(langue: Langue) {
  const entree = await getEntry('parcours', langue);
  return entree?.data.etapes ?? [];
}

export type Textes = Awaited<ReturnType<typeof textes>>;
type Profil = Awaited<ReturnType<typeof profil>>;

export function titrePage(face: Face, t: Textes, p: Profil) {
  if (face === 'production') return `${p.nom} · ${t.portfolio} · ${t.production}`;
  if (face === 'devops') return `${p.nom} · ${t.portfolio} · ${t.devops}`;
  return `${p.nom} · ${t.portfolio}`;
}

// Un CV par face et par langue, dans public/cv/ : cv-<face>-<langue>.pdf, son
// image (.webp, 1600 px, et -petit.webp, 900 px) et .json (taille de l'image,
// position des liens en % de la page). Il n'apparaît sur le site que si le PDF
// et l'image existent. La page CV montre l'image : elle s'affiche vite, sur
// toute la largeur, et se zoome ; les liens restent cliquables par-dessus.
export interface LienCV {
  href: string;
  texte: string;
  x: number;
  y: number;
  l: number;
  h: number;
}

export function cv(face: FaceProjet, langue: Langue) {
  const chemin = (fichier: string) => join(process.cwd(), 'public', fichier);
  const base = `/cv/cv-${face}-${langue}`;
  if (!existsSync(chemin(`${base}.pdf`)) || !existsSync(chemin(`${base}.json`))) return undefined;
  const infos = JSON.parse(readFileSync(chemin(`${base}.json`), 'utf-8')) as {
    largeur: number;
    hauteur: number;
    liens: LienCV[];
  };
  return {
    pdf: `${base}.pdf`,
    image: `${base}.webp`,
    petit: existsSync(chemin(`${base}-petit.webp`)) ? `${base}-petit.webp` : undefined,
    ...infos,
  };
}

// « fr/amachahou » → « amachahou » ; la langue, elle, est avant le « / ».
export const slug = (id: string) => id.slice(id.indexOf('/') + 1);
const langueDe = (id: string) => id.slice(0, id.indexOf('/')) as Langue;

export const adresseProjet = (face: FaceProjet, projet: Projet) =>
  adresse(langueDe(projet.id), `/${face}/projets/${slug(projet.id)}/`);

// Les pages générées, les mêmes en français et en anglais : un CV par face
// (s'il existe), une page par projet et par face.
export const pagesCV = (langue: Langue) =>
  FACES.filter((face) => cv(face, langue)).map((face) => ({ params: { face }, props: { face } }));

// Chaque projet et chaque solution existe dans les deux langues, sous le même
// nom de fichier ; sinon, le site refuse de se construire.
async function verifierTraductions() {
  for (const collection of ['projets', 'solutions'] as const) {
    const ids = new Set((await getCollection(collection)).map((e) => e.id));
    const attendus = [...ids].flatMap((id) => LANGUES.map((l) => `${l}/${slug(id)}`));
    const manquants = [...new Set(attendus.filter((id) => !ids.has(id)))];
    if (manquants.length) {
      throw new Error(`Traduction manquante dans src/content/${collection}/ : ${manquants.join(', ')}`);
    }
  }
}

export async function pagesProjets(langue: Langue) {
  await verifierTraductions();
  const parFace = await Promise.all(
    FACES.map(async (face) => ({ face, liste: await projets(langue, face) })),
  );
  return parFace.flatMap(({ face, liste }) =>
    liste.map((projet, i) => ({
      params: { face, projet: slug(projet.id) },
      props: { face, projet, plusRecent: liste[i - 1], plusAncien: liste[i + 1] },
    })),
  );
}

// L'ancre d'une solution dans sa page projet, sans le nom du projet :
// « amachahou-flux-branches » → « flux-branches ».
export function ancreSolution(solution: Solution) {
  const nom = slug(solution.id);
  const prefixe = `${slug(solution.data.projet.id)}-`;
  return nom.startsWith(prefixe) ? nom.slice(prefixe.length) : nom;
}

export function etatProjet(projet: Projet, t: Textes) {
  if (projet.data.statut === 'en-cours') return t.enCours;
  if (projet.data.statut === 'arrete') return t.arrete;
  return `◆ ${projet.data.version || projet.data.periode}`;
}

export type Element =
  | { type: 'solution'; ordre: number; solution: Solution }
  | {
      type: 'sous-projet';
      ordre: number;
      sousProjet: Projet['data']['sousProjets'][number];
      solutions: Solution[];
    };

// Les solutions d'un projet, regroupées par sous-projet, dans l'ordre.
export function elementsDe(projet: Projet, toutes: Solution[]): Element[] {
  const siennes = toutes.filter((s) => s.data.projet.id === projet.id);

  const inconnue = siennes.find(
    (s) => s.data.sousProjet && !projet.data.sousProjets.some((sp) => sp.id === s.data.sousProjet),
  );
  if (inconnue) {
    throw new Error(`${inconnue.id} : le sous-projet « ${inconnue.data.sousProjet} » n'existe pas dans ${projet.id}`);
  }

  const elements: Element[] = siennes
    .filter((s) => !s.data.sousProjet)
    .map((s): Element => ({ type: 'solution', ordre: s.data.ordre, solution: s }));

  for (const sousProjet of projet.data.sousProjets) {
    const groupe = siennes.filter((s) => s.data.sousProjet === sousProjet.id);
    if (groupe.length === 0) continue;
    elements.push({
      type: 'sous-projet',
      ordre: Math.min(...groupe.map((s) => s.data.ordre)),
      sousProjet,
      solutions: groupe,
    });
  }

  return elements.sort((a, b) => a.ordre - b.ordre);
}
