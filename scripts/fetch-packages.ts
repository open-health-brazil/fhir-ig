// Downloads the pinned FHIR packages from fhir-packages.json into .fhir-cache/.
// BR Core and its dependencies are not on packages.fhir.org, so each package
// declares its own tarball URL template.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { packageDir, readConfig, tarballUrl } from './lib/packages.ts';

const config = readConfig();

for (const spec of config.packages) {
  const target = packageDir(spec);
  if (existsSync(join(target, 'package.json'))) {
    console.log(`cached  ${spec.id}#${spec.version}`);
    continue;
  }

  const url = tarballUrl(spec);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAILED  ${spec.id}#${spec.version}: HTTP ${res.status} at ${url}`);
    process.exit(1);
  }

  const root = dirname(target);
  rmSync(root, { recursive: true, force: true });
  mkdirSync(root, { recursive: true });
  const tgz = join(root, 'package.tgz');
  writeFileSync(tgz, Buffer.from(await res.arrayBuffer()));
  execFileSync('tar', ['-xzf', tgz, '-C', root]);
  rmSync(tgz);
  console.log(`fetched ${spec.id}#${spec.version}`);
}
