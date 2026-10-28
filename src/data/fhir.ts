// Typed access to the files written by scripts/generate-data.ts.
import index from './generated/profiles/index.json';
import meta from './generated/meta.json';
import namingSystems from './generated/naming-systems.json';
import terminologies from './generated/terminologies.json';

export type ProfileSource = 'br-core' | 'rnds';

export interface ProfileElement {
	id: string;
	path: string;
	sliceName?: string;
	min?: number;
	max?: string;
	types?: { code: string; profiles?: string[] }[];
	mustSupport?: boolean;
	binding?: { strength: string; valueSet?: string };
	fixed?: { kind: 'fixed' | 'pattern'; value: unknown };
	sliced?: boolean;
	short?: string;
}

export interface Profile {
	key: string;
	source: { kind: 'package'; package: string; version: string } | { kind: 'vendor'; name: 'rnds'; capturedAt: string };
	url: string;
	version: string | null;
	name: string;
	title: string | null;
	status: string;
	kind: string;
	type: string;
	baseDefinition: string;
	description: string | null;
	hasSnapshot: boolean;
	elements: ProfileElement[];
}

const files = import.meta.glob<Profile>('./generated/profiles/*/*.json', { eager: true, import: 'default' });

export function getProfile(source: ProfileSource, key: string): Profile {
	const profile = files[`./generated/profiles/${source}/${key}.json`];
	if (!profile) throw new Error(`Profile not found: ${source}/${key}`);
	return profile;
}

export const profileIndex = index as { source: ProfileSource; key: string; name: string; title: string | null; url: string; version: string | null; status: string; kind: string; type: string }[];

export { meta, namingSystems, terminologies };

export const lastSegment = (url: string) => url.split('|')[0].split('/').pop() ?? url;

export function sourceLink(profile: Profile): string {
	if (profile.source.kind === 'package') {
		return `https://hl7.org.br/fhir/core/v${profile.source.version}/StructureDefinition-${lastSegment(profile.url)}.html`;
	}
	return `https://simplifier.net/resolve?canonical=${encodeURIComponent(profile.url)}`;
}

export function sourceLabel(profile: Profile): string {
	return profile.source.kind === 'package'
		? `BR Core ${profile.source.version}`
		: `RNDS · Simplifier, capturado em ${profile.source.capturedAt}`;
}
