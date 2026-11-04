import { execSync } from 'node:child_process';
import paquet from '../../package.json';

function git(commande: string) {
  try {
    return execSync(`git ${commande}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

// Ce qui a produit cette version du site : version, commit et publication.
// Dans GitHub Actions, les variables GITHUB_* sont fournies à chaque étape.
export function infosBuild() {
  const depot = process.env.GITHUB_REPOSITORY;
  const serveur = process.env.GITHUB_SERVER_URL ?? 'https://github.com';
  const run = process.env.GITHUB_RUN_ID;
  const sha = process.env.GITHUB_SHA || git('rev-parse HEAD');
  const version = `v${paquet.version}`;
  const racine = depot ? `${serveur}/${depot}` : undefined;

  return {
    depot,
    version,
    court: sha.slice(0, 7),
    lienVersion: racine && `${racine}/releases/tag/${version}`,
    lienCommit: racine && sha ? `${racine}/commit/${sha}` : undefined,
    lienPublication: racine && run ? `${racine}/actions/runs/${run}` : undefined,
    lienDepot: racine,
    lienMaintenance: racine && `${racine}/blob/main/MAINTENANCE.md`,
  };
}
