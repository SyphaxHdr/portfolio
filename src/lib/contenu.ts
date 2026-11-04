import { getCollection, getEntry } from 'astro:content';

export type Langue = 'fr' | 'en';
export type FaceProjet = 'production' | 'devops';
export type Face = 'neutre' | FaceProjet;

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
  const fin = (p: (typeof liste)[number]) => p.data.fin?.getTime() ?? Infinity;
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
