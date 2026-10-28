// Compares the pinned versions in fhir-packages.json with the version each
// publisher marks as `current` in its package-list.json (not the highest one:
// BR Core lists releases newer than the one it marks current).
// With --write, bumps the pinned versions whose tarball is actually downloadable.
import { appendFileSync, writeFileSync } from 'node:fs';
import { CONFIG_PATH, readConfig, tarballUrl, toJson } from './lib/packages.ts';

const write = process.argv.includes('--write');
const config = readConfig();
const lines: string[] = [];
let changed = false;

for (const spec of config.packages.filter((p) => p.track)) {
  const res = await fetch(spec.packageList);
  if (!res.ok) throw new Error(`HTTP ${res.status} at ${spec.packageList}`);
  const list: any = await res.json();
  const current = list.list.find((v: any) => v.current === true)?.version;
  if (!current) {
    lines.push(`- \`${spec.id}\`: no version marked current in package-list.json`);
    continue;
  }
  if (current === spec.version) {
    lines.push(`- \`${spec.id}\`: ${spec.version} is current`);
    continue;
  }

  const tarball = await fetch(tarballUrl(spec, current), { method: 'HEAD' });
  if (!tarball.ok) {
    lines.push(`- \`${spec.id}\`: ${current} is marked current but its tarball returns HTTP ${tarball.status}; kept ${spec.version}`);
    continue;
  }

  lines.push(`- \`${spec.id}\`: ${spec.version} → **${current}**`);
  if (write) spec.version = current;
  changed = true;
}

if (write && changed) writeFileSync(CONFIG_PATH, toJson(config));

const summary = lines.join('\n');
console.log(summary);
if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\nsummary<<EOF\n${summary}\nEOF\n`);
}
