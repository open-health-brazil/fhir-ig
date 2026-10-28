// Turns the cached FHIR packages and vendor/rnds into the JSON files the site
// renders (src/data/generated/). Output is deterministic so diffs stay clean.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, packageDir, readConfig, toJson } from './lib/packages.ts';

const OUT = join(ROOT, 'src', 'data', 'generated');
const config = readConfig();
const spec = (id: string) => {
  const found = config.packages.find((p) => p.id === id);
  if (!found) throw new Error(`${id} missing from fhir-packages.json`);
  return found;
};
const brCore = spec('br.gov.saude.br-core.fhir');
const terminologia = spec('br.gov.saude.terminologia.fhir');

function readResources(dir: string, prefix: string): any[] {
  return readdirSync(dir)
    .filter((f) => f.startsWith(prefix) && f.endsWith('.json'))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')));
}

const lastSegment = (url: string) => url.split('/').pop()!;

type Source = { kind: 'package'; package: string; version: string } | { kind: 'vendor'; name: 'rnds'; capturedAt: string };

/** An element is shown when the profile actually constrains it, not when it only translates `short`. */
function isConstrained(el: any): boolean {
  if (!el.path.includes('.')) return false;
  return (
    el.min !== undefined ||
    el.max !== undefined ||
    el.type !== undefined ||
    el.mustSupport !== undefined ||
    el.binding !== undefined ||
    el.slicing !== undefined ||
    el.sliceName !== undefined ||
    Object.keys(el).some((k) => k.startsWith('fixed') || k.startsWith('pattern'))
  );
}

function fixedValue(el: any): unknown {
  const key = Object.keys(el).find((k) => k.startsWith('fixed') || k.startsWith('pattern'));
  return key ? { kind: key.startsWith('fixed') ? 'fixed' : 'pattern', value: el[key] } : undefined;
}

function profileData(sd: any, source: Source) {
  const snapshot = new Map<string, any>((sd.snapshot?.element ?? []).map((e: any) => [e.id, e]));
  const elements = (sd.differential?.element ?? []).filter(isConstrained).map((diff: any) => {
    const el = { ...snapshot.get(diff.id), ...diff };
    return {
      id: el.id,
      path: el.path,
      sliceName: el.sliceName,
      min: el.min,
      max: el.max,
      types: el.type?.map((t: any) => ({
        code: t.code,
        profiles: t.profile ?? t.targetProfile,
      })),
      mustSupport: el.mustSupport === true || undefined,
      binding: el.binding ? { strength: el.binding.strength, valueSet: el.binding.valueSet } : undefined,
      fixed: fixedValue(diff),
      sliced: el.slicing ? true : undefined,
      short: el.short,
    };
  });
  return {
    key: lastSegment(sd.url),
    source,
    url: sd.url,
    version: sd.version ?? null,
    name: sd.name,
    title: sd.title ?? null,
    status: sd.status,
    kind: sd.kind,
    type: sd.type,
    baseDefinition: sd.baseDefinition,
    description: sd.description ?? null,
    hasSnapshot: snapshot.size > 0,
    elements,
  };
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'profiles', 'br-core'), { recursive: true });
mkdirSync(join(OUT, 'profiles', 'rnds'), { recursive: true });

const index: any[] = [];
function writeProfiles(dirName: string, sds: any[], source: Source) {
  for (const sd of sds) {
    const data = profileData(sd, source);
    writeFileSync(join(OUT, 'profiles', dirName, `${data.key}.json`), toJson(data));
    index.push({
      source: dirName,
      key: data.key,
      name: data.name,
      title: data.title,
      url: data.url,
      version: data.version,
      status: data.status,
      kind: data.kind,
      type: data.type,
    });
  }
}

writeProfiles('br-core', readResources(packageDir(brCore), 'StructureDefinition-'), {
  kind: 'package',
  package: brCore.id,
  version: brCore.version,
});

const rndsDir = join(ROOT, 'vendor', 'rnds');
const rndsManifest = JSON.parse(readFileSync(join(rndsDir, 'manifest.json'), 'utf8'));
writeProfiles('rnds', readResources(rndsDir, 'StructureDefinition-'), {
  kind: 'vendor',
  name: 'rnds',
  capturedAt: rndsManifest.capturedAt,
});

index.sort((a, b) => a.source.localeCompare(b.source) || a.key.localeCompare(b.key));
writeFileSync(join(OUT, 'profiles', 'index.json'), toJson(index));

// NamingSystems carry both the preferred canonical and the legacy RNDS URIs.
const termDir = packageDir(terminologia);
const namingSystems = readResources(termDir, 'NamingSystem-').map((ns) => ({
  id: ns.id,
  name: ns.name,
  kind: ns.kind,
  status: ns.status,
  description: ns.description ?? null,
  preferred: ns.uniqueId?.find((u: any) => u.preferred)?.value ?? null,
  legacy: (ns.uniqueId ?? []).filter((u: any) => !u.preferred).map((u: any) => u.value),
}));
writeFileSync(join(OUT, 'naming-systems.json'), toJson(namingSystems));

const legacyByCanonical = new Map(namingSystems.filter((n) => n.preferred).map((n) => [n.preferred, n.legacy]));
const terminologies = [
  ...readResources(termDir, 'CodeSystem-').map((cs) => ({
    resourceType: 'CodeSystem',
    id: cs.id,
    name: cs.name,
    title: cs.title ?? null,
    url: cs.url,
    status: cs.status,
    content: cs.content,
    count: cs.count ?? cs.concept?.length ?? null,
    description: cs.description ?? null,
    legacy: legacyByCanonical.get(cs.url) ?? [],
  })),
  ...readResources(termDir, 'ValueSet-').map((vs) => ({
    resourceType: 'ValueSet',
    id: vs.id,
    name: vs.name,
    title: vs.title ?? null,
    url: vs.url,
    status: vs.status,
    description: vs.description ?? null,
    includes: (vs.compose?.include ?? []).map((i: any) => i.system).filter(Boolean),
  })),
];
writeFileSync(join(OUT, 'terminologies.json'), toJson(terminologies));

const brCoreManifest = JSON.parse(readFileSync(join(packageDir(brCore), 'package.json'), 'utf8'));
writeFileSync(
  join(OUT, 'meta.json'),
  toJson({
    fhirVersion: config.fhirVersion,
    packages: config.packages.map((p) => ({ id: p.id, version: p.version })),
    brCoreDeclaredDependencies: brCoreManifest.dependencies,
    rnds: { source: rndsManifest.source, capturedAt: rndsManifest.capturedAt, count: rndsManifest.count },
  }),
);

console.log(`profiles: ${index.length}, naming systems: ${namingSystems.length}, terminologies: ${terminologies.length}`);

for (const [id, declared] of Object.entries<string>(brCoreManifest.dependencies)) {
  const pinned = config.packages.find((p) => p.id === id);
  if (pinned && pinned.version !== declared) {
    console.warn(`warning: BR Core declares ${id}#${declared}, pinned ${pinned.version}`);
  }
}
