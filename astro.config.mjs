// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

// Site URL and base path come from the GitHub repository (open-health-brazil/fhir-ig).
// Change both here if the repository is renamed or moved.
const REPO = 'https://github.com/open-health-brazil/fhir-ig';

export default defineConfig({
	site: 'https://open-health-brazil.github.io',
	base: '/fhir-ig',
	integrations: [
		starlight({
			title: 'Interop Saúde BR',
			description:
				'Proposta comunitária de documentação sobre interoperabilidade em saúde no Brasil com HL7 FHIR, BR Core e RNDS.',
			defaultLocale: 'root',
			locales: { root: { label: 'Português', lang: 'pt-BR' } },
			favicon: '/favicon.svg',
			logo: { src: './src/assets/logo.svg' },
			customCss: ['./src/styles/tokens.css', './src/styles/theme.css'],
			expressiveCode: {
				themes: ['github-dark-default', 'github-light-default'],
				useStarlightUiThemeColors: true,
				styleOverrides: {
					borderRadius: '0',
					borderColor: 'var(--isb-hair)',
					codeFontFamily: 'var(--__sl-font-mono)',
					uiFontFamily: 'var(--__sl-font)',
					codeBackground: 'var(--isb-paper-2)',
					frames: {
						shadowColor: 'transparent',
						editorActiveTabIndicatorTopColor: 'var(--isb-form-ink)',
						editorActiveTabBackground: 'var(--isb-paper-2)',
						editorTabBarBackground: 'var(--isb-paper)',
						editorTabBarBorderBottomColor: 'var(--isb-hair)',
						terminalTitlebarBackground: 'var(--isb-paper)',
					},
				},
			},
			social: [{ icon: 'github', label: 'GitHub', href: REPO }],
			editLink: { baseUrl: `${REPO}/edit/main/` },
			lastUpdated: true,
			components: {
				Banner: './src/components/overrides/Banner.astro',
				PageTitle: './src/components/overrides/PageTitle.astro',
			},
			plugins: [starlightLinksValidator()],
			sidebar: [
				{
					label: 'Gestão',
					items: [
						{ label: 'O que é a RNDS', slug: 'gestao/o-que-e-a-rnds' },
						{ label: 'Adesão e credenciamento', slug: 'gestao/adesao-e-credenciamento' },
						{ label: 'Base legal e LGPD', slug: 'gestao/base-legal-e-lgpd' },
						{
							label: 'Casos de uso',
							items: [{ autogenerate: { directory: 'gestao/casos-de-uso' } }],
						},
						{ label: 'Glossário', slug: 'gestao/glossario' },
					],
				},
				{
					label: 'Desenvolvimento',
					items: [
						{ label: 'Visão geral', slug: 'desenvolvimento/visao-geral' },
						{ label: 'Ambientes', slug: 'desenvolvimento/ambientes' },
						{ label: 'Autenticação', slug: 'desenvolvimento/autenticacao' },
						{ label: 'Envio de documentos', slug: 'desenvolvimento/envio-de-documentos' },
						{ label: 'Identificadores', slug: 'desenvolvimento/identificadores' },
						{
							label: 'Terminologias',
							collapsed: true,
							items: [{ autogenerate: { directory: 'desenvolvimento/terminologias' } }],
						},
						{
							label: 'Recursos base',
							items: [{ autogenerate: { directory: 'desenvolvimento/recursos' } }],
						},
						{
							label: 'Casos de uso',
							items: [{ autogenerate: { directory: 'desenvolvimento/casos-de-uso' } }],
						},
						{ label: 'Mapeamento RNDS ↔ BR Core', slug: 'desenvolvimento/mapeamento-rnds-br-core' },
						{ label: 'Orientações de implementação', slug: 'desenvolvimento/orientacoes-de-implementacao' },
						{ label: 'Evolução R5/R6', slug: 'desenvolvimento/evolucao-r5-r6' },
					],
				},
				{
					label: 'Sobre',
					items: [
						{ label: 'O projeto', slug: 'sobre' },
						{ label: 'Changelog', slug: 'sobre/changelog' },
						{ label: 'Como contribuir', slug: 'sobre/como-contribuir' },
					],
				},
			],
		}),
	],
});
