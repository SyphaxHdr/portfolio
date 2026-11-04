import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Langue = 'fr' | 'en';
export type FaceProjet = 'production' | 'devops';
export type Face = 'neutre' | FaceProjet;
export type Projet = CollectionEntry<'projets'>;
export type Solution = CollectionEntry<'solutions'>;

export const FACES: FaceProjet[] = ['production', 'devops'];

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
  if (face === 'production') return `${t.production} · ${p.nom}`;
  if (face === 'devops') return `${t.devops} · ${p.nom}`;
  return p.nom;
}

// « fr/amachahou » → « amachahou »
export const slug = (id: string) => id.slice(id.indexOf('/') + 1);

export const adresseProjet = (face: FaceProjet, projet: Projet) =>
  `/${face}/projets/${slug(projet.id)}/`;

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
