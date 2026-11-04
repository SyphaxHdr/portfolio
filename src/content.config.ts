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
      brouillon: z.boolean().default(false),
    })
    .refine((s) => !s.pistes.includes('devops') || (s.branche && s.commit), {
      error: 'Une solution de la piste devops doit avoir une branche et un commit.',
      path: ['commit'],
    }),
});

// Textes de l'interface, un fichier par langue (fr.yaml, en.yaml).
const ui = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/i18n' }),
  schema: z.object({
    accroche: z.string(),
    choisirFace: z.string(),
    faces: z.string(),
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
