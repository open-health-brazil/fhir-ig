# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Gestores** de secretarias de saúde, hospitais, laboratórios e fornecedores de software: precisam entender o que é a RNDS, quem precisa aderir, base legal e prazos.
- **Desenvolvedores** que integram prontuários e sistemas à RNDS ou trocam dados no padrão BR Core: consultam perfis, identificadores, terminologias e exemplos JSON enquanto implementam.

## Product Purpose

Documentação independente, em português do Brasil, sobre interoperabilidade em saúde com HL7 FHIR R4, BR Core e RNDS. Consolida em um só lugar o que está espalhado entre o BR Core, o guia da RNDS, o Simplifier e as portarias do Ministério da Saúde. Sucesso: ser completa e confiável o bastante para ser proposta ao Ministério da Saúde como documentação oficial, sem retrabalho.

## Positioning

Tabelas de perfis geradas automaticamente dos pacotes oficiais e todos os exemplos validados no CI com o validador oficial da HL7. Distingue explicitamente BR Core de RNDS em cada página técnica.

## Capabilities and Constraints

- Astro + Starlight; site estático publicado em GitHub Pages (`/fhir-ig`).
- Componentes próprios: ProfileHeader, ProfileTable, FhirExample, IdentifierTable, TerminologyCard, Disclaimer.
- Duas trilhas de conteúdo: Gestão e Desenvolvimento, mais Sobre.
- Todas as cores e fontes isoladas em `src/styles/tokens.css`, para que o Design System gov.br possa ser aplicado se o projeto for adotado.

## Brand Commitments

- Nome: Interop Saúde BR. Licença CC0.
- Proposta comunitária, **não oficial**: aviso visível em todas as páginas; nenhum brasão, marca gov.br ou do Ministério da Saúde, nem visual que imite site do governo.
- Tom: formal e direto, segunda pessoa (ver GUIA-DE-ESTILO.md).

## Evidence on Hand

- Conteúdo completo em `src/content/docs/`, exemplos validados em `examples/`, dados gerados em `src/data/generated/`.
- Não há depoimentos, adotantes ou métricas de uso; não inventar.

## Product Principles

1. Não inventar: toda afirmação regulatória ou operacional tem fonte primária.
2. Completa: nenhuma página "em construção".
3. BR Core e RNDS sempre distinguidos.
4. Nunca se apresentar como oficial.
5. Adotável: trocar a identidade visual pela oficial não deve exigir reescrever componentes.
