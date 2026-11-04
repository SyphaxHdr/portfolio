import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pistes = z.array(z.enum(['production', 'devops'])).min(1);
const importance = z.number().int().min(1).max(3);

const projets = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projets' }),
  schema: z.object({
    titre: z.string(),
    titreDevops: z.string(),
    type: z.enum(['equipe', 'solo', 'jam', 'etudes', 'outil']),
    periode: z.string(),
    debut: z.coerce.date(),
    fin: z.coerce.date().optional(),
    statut: z.enum(['en-cours', 'sorti', 'arrete']),
    role: z.string(),
    equipe: z.number().int().positive(),
    pistes,
    importance,
    couleur: z.number().int().min(1).max(4),
    version: z.string().optional(),
    resume: z.string(),
    resumeDevops: z.string(),
    pile: z.array(z.string()).default([]),
    sousProjets: z
      .array(z.object({ id: z.string(), titre: z.string(), titreDevops: z.string() }))
      .default([]),
    liens: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    brouillon: z.boolean().default(false),
  }),
});

// Une solution est une fiche : chaque champ a sa place dans la page projet.
const solutions = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/solutions' }),
  schema: z
    .object({
      projet: reference('projets'),
      ordre: z.number().int().positive(),
      titre: z.string(),
      pistes,
      importance,
      branche: z.string().optional(),
      commit: z.string().optional(),
      noteDevops: z.string().optional(),
      sousProjet: z.string().optional(),
      probleme: z.string(),
      compte: z.array(z.string()).min(1),
      options: z
        .array(z.object({ texte: z.string(), raison: z.string().optional(), retenue: z.boolean().default(false) }))
        .min(2),
      schema: z.array(z.string()).min(2).optional(),
      etapes: z.array(z.string()).min(1),
      laisse: z.string().optional(),
      resultat: z.string(),
      preuves: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      devops: z
        .object({
          declencheur: z.string().optional(),
          fichier: z.string().optional(),
          etapes: z.array(z.string()).min(1),
          choix: z.string().optional(),
          lie: z.string().optional(),
        })
        .optional(),
      brouillon: z.boolean().default(false),
    })
    .refine((s) => s.options.some((o) => o.retenue), {
      error: 'Une des options doit être retenue (retenue: true).',
      path: ['options'],
    })
    .refine((s) => !s.pistes.includes('devops') || (s.branche && s.commit && s.devops), {
      error: 'Une solution de la piste devops doit avoir une branche, un commit et une partie devops.',
      path: ['devops'],
    }),
});

// Textes de l'interface, un fichier par langue (fr.yaml, en.yaml).
const ui = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/i18n' }),
  schema: z.object({
    accroche: z.string(),
    choisirFace: z.string(),
    production: z.string(),
    devops: z.string(),
    liens: z.string(),
    miseAJour: z.string(),
    enCours: z.string(),
    arrete: z.string(),
    equipeDe: z.string(),
    seul: z.string(),
    sousProjet: z.string(),
    autresSolutions: z.string(),
    autresCommits: z.string(),
    parcours: z.string(),
    parcoursDevops: z.string(),
    accrocheProduction: z.string(),
    accrocheDevops: z.string(),
    maintenant: z.string(),
    consigneNeutre: z.string(),
    consigneNeutreTactile: z.string(),
    consigneProduction: z.string(),
    consigneProductionTactile: z.string(),
    consigneDevops: z.string(),
    consigneDevopsTactile: z.string(),
    lancerPiece: z.string(),
    voirProduction: z.string(),
    voirDevops: z.string(),
    annonceProduction: z.string(),
    annonceDevops: z.string(),
    legende: z.string(),
    legendeTronc: z.string(),
    legendeBranche: z.string(),
    legendeSousProjet: z.string(),
    legendeEnCours: z.string(),
    legendeLosange: z.string(),
    legendeSolution: z.string(),
    publiePar: z.string(),
    construitEnLocal: z.string(),
    navigationProjet: z.string(),
    retourFil: z.string(),
    ficheRole: z.string(),
    ficheEquipe: z.string(),
    fichePeriode: z.string(),
    fichePile: z.string(),
    personnes: z.string(),
    problemes: z.string(),
    problemesDevops: z.string(),
    aideProblemes: z.string(),
    aideProblemesDevops: z.string(),
    voirSolution: z.string(),
    masquerSolution: z.string(),
    ouvrir: z.string(),
    fermer: z.string(),
    blocProbleme: z.string(),
    blocCompte: z.string(),
    blocOptions: z.string(),
    retenue: z.string(),
    ecartee: z.string(),
    blocSolution: z.string(),
    schemaSolution: z.string(),
    blocLaisse: z.string(),
    blocResultat: z.string(),
    blocPreuves: z.string(),
    blocDeclencheur: z.string(),
    blocFichier: z.string(),
    blocEtapesDevops: z.string(),
    blocChoix: z.string(),
    blocLie: z.string(),
    solutionPrecedente: z.string(),
    solutionSuivante: z.string(),
    debut: z.string(),
    debutDevops: z.string(),
    autresProjets: z.string(),
    plusRecent: z.string(),
    plusAncien: z.string(),
  }),
});

const profil = defineCollection({
  loader: glob({ pattern: 'profil.yaml', base: './src/content' }),
  schema: z.object({
    nom: z.string(),
    situation: z.string(),
    liens: z.array(z.object({ label: z.string(), url: z.url() })).min(1),
  }),
});

const parcours = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/parcours' }),
  schema: z.object({
    etapes: z.array(z.object({ annees: z.string(), texte: z.string() })).min(1),
  }),
});

export const collections = { projets, solutions, ui, profil, parcours };
