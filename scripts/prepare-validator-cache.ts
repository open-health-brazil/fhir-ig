// Fills a FHIR package cache (the layout the HL7 validator reads) with the
// Brazilian packages, which are not on packages.fhir.org.
// Walks the br.gov.saude.* dependencies transitively: downloads the exact
// version when its tarball exists, otherwise aliases the pinned version and warns
// (BR Core 1.7.1 declares terminologia 1.2.0, which was never published).
// Non-Brazilian dependencies are left for the validator to fetch from the registry.
//
// Usage: node scripts/prepare-validator-cache.ts <cache-dir>
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, packageDir, readConfig, tarballUrl } from './lib/packages.ts';

const RNDS_PACKAGE = 'rnds.vendor';
const RNDS_VERSION = '1.0.0';

const cacheDir = process.argv[2];
if (!cacheDir) throw new Error('usage: prepare-validator-cache.ts <cache-dir>');
mkdirSync(cacheDir, { recursive: true });

const config = readConfig();
const pinned = new Map(config.packages.map((p) => [p.id, p]));
const queue = config.packages.map((p) => ({ id: p.id, version: p.version }));
const seen = new Set<string>();

while (queue.length) {
  const { id, version } = queue.shift()!;
  const key = `${id}#${version}`;
  if (seen.has(key)) continue;
  seen.add(key);

  const target = join(cacheDir, key);
  const spec = pinned.get(id)!;
  if (!existsSync(join(target, 'package', 'package.json'))) {
    if (version === spec.version) {
      cpSync(join(packageDir(spec), '..'), target, { recursive: true });
    } else {
      const res = await fetch(tarballUrl(spec, version));
      if (res.ok) {
        mkdirSync(target, { recursive: true });
        const tgz = join(target, 'package.tgz');
        writeFileSync(tgz, Buffer.from(await res.arrayBuffer()));
        execFileSync('tar', ['-xzf', tgz, '-C', target]);
        rmSync(tgz);
        console.log(`fetched ${key}`);
      } else {
        cpSync(join(packageDir(spec), '..'), target, { recursive: true });
        console.warn(`warning: ${key} is not published (HTTP ${res.status}); aliased to ${spec.version}`);
      }
    }
  }

  const manifest = JSON.parse(readFileSync(join(target, 'package', 'package.json'), 'utf8'));
  for (const [depId, depVersion] of Object.entries<string>(manifest.dependencies ?? {})) {
    if (pinned.has(depId)) queue.push({ id: depId, version: depVersion });
  }
}

// vendor/rnds is not a package; wrap it as a local one so RNDS-format examples
// can be validated against the production RNDS profiles.
// Rebuilt only when the capture changes, so concurrent validator runs never see it half-written.
const rndsTarget = join(cacheDir, `${RNDS_PACKAGE}#${RNDS_VERSION}`, 'package');
const capturedAt = JSON.parse(readFileSync(join(ROOT, 'vendor', 'rnds', 'manifest.json'), 'utf8')).capturedAt;
const rndsManifest = join(rndsTarget, 'package.json');
if (!existsSync(rndsManifest) || JSON.parse(readFileSync(rndsManifest, 'utf8')).capturedAt !== capturedAt) {
  rmSync(rndsTarget, { recursive: true, force: true });
  mkdirSync(rndsTarget, { recursive: true });
  cpSync(join(ROOT, 'vendor', 'rnds'), rndsTarget, {
    recursive: true,
    filter: (src) => !src.endsWith('.md') && !src.endsWith('manifest.json'),
  });
  writeFileSync(
    rndsManifest,
    JSON.stringify({
      name: RNDS_PACKAGE,
      version: RNDS_VERSION,
      capturedAt,
      fhirVersions: [config.fhirVersion],
      dependencies: { 'hl7.fhir.r4.core': '4.0.1' },
    }),
  );
}
seen.add(`${RNDS_PACKAGE}#${RNDS_VERSION}`);

console.log(`validator cache ready: ${[...seen].join(', ')}`);
