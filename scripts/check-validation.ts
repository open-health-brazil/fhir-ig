// Summarises the validator output and fails on any error or fatal issue.
// Warnings are printed but do not fail the build.
import { readFileSync } from 'node:fs';

const FILE_EXT = 'http://hl7.org/fhir/StructureDefinition/operationoutcome-file';
const output = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const outcomes: any[] = output.resourceType === 'Bundle' ? output.entry.map((e: any) => e.resource) : [output];

let errors = 0;
let warnings = 0;
for (const oo of outcomes) {
  const file = oo.extension?.find((e: any) => e.url === FILE_EXT)?.valueString ?? '(unknown file)';
  for (const issue of oo.issue ?? []) {
    const where = (issue.expression ?? issue.location ?? []).join(', ');
    const line = `${issue.severity.padEnd(11)} ${file} ${where}\n            ${issue.details?.text ?? issue.diagnostics ?? ''}`;
    if (issue.severity === 'error' || issue.severity === 'fatal') {
      errors++;
      console.error(line);
    } else if (issue.severity === 'warning') {
      warnings++;
      console.log(line);
    }
  }
}

console.log(`\n${outcomes.length} file(s), ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors > 0 ? 1 : 0);
