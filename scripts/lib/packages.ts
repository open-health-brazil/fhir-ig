import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface PackageSpec {
  id: string;
  version: string;
  track: boolean;
  packageList: string;
  tarball: string;
  note?: string;
}

export interface PackagesConfig {
  fhirVersion: string;
  packages: PackageSpec[];
}

export const ROOT = join(import.meta.dirname, '..', '..');
export const CONFIG_PATH = join(ROOT, 'fhir-packages.json');
export const CACHE_DIR = join(ROOT, '.fhir-cache');

export function readConfig(): PackagesConfig {
  return JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
}

export function tarballUrl(spec: PackageSpec, version = spec.version): string {
  return spec.tarball.replace('{version}', version);
}

export function packageDir(spec: PackageSpec): string {
  return join(CACHE_DIR, `${spec.id}#${spec.version}`, 'package');
}

/** Stable JSON output so regenerated files produce clean diffs. */
export function toJson(value: unknown): string {
  return JSON.stringify(value, null, 2) + '\n';
}
