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
    statut: z.enum(['en-cours', 'sorti', 'arrete']),
    role: z.string(),
    equipe: z.number().int().positive(),
    pistes,
    importance,
    couleur: z.number().int().min(1).max(4),
    version: z.string().optional(),
    resume: z.string(),
    resumeDevops: z.string(),
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
    nomSite: z.string(),
    accroche: z.string(),
    production: z.string(),
    devops: z.string(),
    projets: z.string(),
    solutions: z.string(),
    miseAJour: z.string(),
  }),
});

export const collections = { projets, solutions, ui };
