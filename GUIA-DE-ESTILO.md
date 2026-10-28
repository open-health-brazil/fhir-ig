# Guia de estilo

Regras de escrita para o conteúdo do Interop Saúde BR. Elas valem para todas as páginas em `src/content/docs/`.

## Princípios

1. **Não invente.** Nenhuma afirmação regulatória (portaria, lei, prazo, obrigação) ou operacional (endpoint, header, fluxo de credenciamento) entra no site sem fonte primária verificada. Cite a fonte com link no próprio texto. Se não foi possível verificar, não publique; abra uma issue com o rótulo `pendente-verificacao`.
2. **Seja completo.** Toda página entrega a resposta inteira. Quando um artefato oficial tem um defeito (ValueSet incompleto, código errado, pacote ausente), a página diz como implementar corretamente e aponta a fonte oficial dos dados. Não existem páginas "em construção".
3. **Distinga BR Core de RNDS.** O BR Core é o guia de perfis FHIR do Brasil. A RNDS é a plataforma nacional que recebe os documentos, com perfis próprios de produção. Toda página técnica diz qual dos dois se aplica.
4. **Não se apresente como oficial.** Escreva "o Ministério da Saúde publica...", nunca "publicamos". O site é uma proposta comunitária.

## Tom e linguagem

- Português do Brasil, formal e direto, na segunda pessoa ("você").
- Frases curtas. Um parágrafo, uma ideia.
- Termos FHIR em inglês e em código: `Patient`, `Bundle`, `Composition.section`.
- Termos de negócio em português: Estabelecimento de Saúde, Lotação, Imunobiológico.
- Siglas por extenso na primeira ocorrência da página: "Cadastro Nacional de Estabelecimentos de Saúde (CNES)".
- Datas no formato "27 de novembro de 2023" no texto e ISO 8601 nos exemplos.

## Estrutura das páginas

**Páginas técnicas** (trilha Desenvolvimento):

1. Visão geral: o que é e para que serve
2. Quando usar
3. Perfis: `<ProfileHeader>` + `<ProfileTable>` do BR Core e, quando houver, do equivalente RNDS
4. Nuances brasileiras: regras que não são óbvias para quem conhece FHIR de outros países
5. Exemplo: `<FhirExample>` (sempre um arquivo validado em `examples/`)
6. Erros comuns

**Páginas de gestão** (trilha Gestão):

1. O que é
2. Quem precisa
3. O que fazer (passos numerados)
4. Prazos e obrigações (só os verificados, com link para a portaria)
5. Próximos passos

## Componentes

| Componente | Uso |
|---|---|
| `<ProfileHeader source="br-core" id="br-core-patient" />` | Cartão com canônica, status e fonte do perfil |
| `<ProfileTable source="rnds" id="BRIndividuo-1.0" only="Patient.identifier" hideProhibited />` | Tabela de elementos gerada dos pacotes |
| `<FhirExample file="recursos/paciente.json" />` | Exemplo JSON incluído de `examples/` |
| `<IdentifierTable ids={['cpf', 'cns']} />` | Tabela de NamingSystems |
| `<TerminologyCard id="BRCBO" />` | Resumo de uma CodeSystem do pacote de terminologia |

O `id` de perfil é o último segmento da URL canônica (`br-core-patient`, `BRImunobiologicoAdministrado-3.0`). A lista completa está em `src/data/generated/profiles/index.json`.

## Exemplos

- Um recurso ou Bundle por arquivo em `examples/<dominio>/`.
- Exemplos no formato BR Core declaram `meta.profile` com a canônica do BR Core. Exemplos no formato da RNDS de produção ficam em `examples/rnds/<dominio>/` e declaram a canônica RNDS.
- Use somente dados fictícios. CPF e CNS precisam ter dígitos verificadores válidos, e nomes e endereços devem ser obviamente fictícios ("Rua Fictícia", "Exemplo").
- Todo exemplo precisa passar em `npm run fhir:validate` sem erros. Avisos de terminologia (CodeSystem `not-present`) e de narrativa (`dom-6`) são aceitos.
