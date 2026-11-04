import { execSync } from 'node:child_process';

// Date du dernier commit, lue au moment du build.
export function dateDernierCommit(): Date {
  try {
    const iso = execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim();
    if (iso) return new Date(iso);
  } catch {
    // Pas de dépôt Git disponible : on garde la date du build.
  }
  return new Date();
}
