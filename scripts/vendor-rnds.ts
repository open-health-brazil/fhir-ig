// Captures the RNDS StructureDefinitions from the Simplifier project into vendor/rnds/.
// RNDS publishes no versioned package, so this runs by hand and the output is committed.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, toJson } from './lib/packages.ts';

const SOURCE = 'https://fhir.simplifier.net/RedeNacionaldeDadosemSaude';
// The Simplifier project also holds an older copy of the BR Core profiles; the
// official BR Core package is used instead, so only RNDS canonicals are kept.
const RNDS_CANONICAL = 'http://www.saude.gov.br/fhir/r4/';
const OUT = join(ROOT, 'vendor', 'rnds');

let next: string | undefined = `${SOURCE}/StructureDefinition?_count=200`;
const resources: any[] = [];
while (next) {
  const res = await fetch(next, { headers: { Accept: 'application/fhir+json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} at ${next}`);
  const bundle: any = await res.json();
  for (const entry of bundle.entry ?? []) {
    const sd = entry.resource;
    if (sd?.resourceType === 'StructureDefinition' && sd.url?.startsWith(RNDS_CANONICAL)) {
      resources.push(sd);
    }
  }
  next = bundle.link?.find((l: any) => l.relation === 'next')?.url;
}

mkdirSync(OUT, { recursive: true });
for (const file of readdirSync(OUT)) {
  if (file.startsWith('StructureDefinition-')) rmSync(join(OUT, file));
}

const capturedAt = new Date().toISOString().slice(0, 10);
resources.sort((a, b) => a.id.localeCompare(b.id));
for (const sd of resources) {
  writeFileSync(join(OUT, `StructureDefinition-${sd.id}.json`), toJson(sd));
}

writeFileSync(
  join(OUT, 'manifest.json'),
  toJson({
    source: SOURCE,
    capturedAt,
    count: resources.length,
    resources: resources.map((sd) => ({
      id: sd.id,
      url: sd.url,
      version: sd.version ?? null,
      name: sd.name,
      status: sd.status,
      type: sd.type,
      kind: sd.kind,
    })),
  }),
);
console.log(`captured ${resources.length} StructureDefinitions on ${capturedAt}`);
