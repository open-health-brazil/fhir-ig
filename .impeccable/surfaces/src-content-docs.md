---
version: 1
slug: "src-content-docs"
primary_target: "src/content/docs"
related_targets: ["src/styles/tokens.css"]
---

# Surface brief: documentação (site inteiro)

Mode: Read. Escopo: retema completo do Starlight (home, páginas de doc, componentes próprios), mantendo conteúdo, navegação e tokens isolados em `src/styles/tokens.css` para troca futura pelo Design System gov.br.

Público: gestores (leitura de orientação) e desenvolvedores (consulta de perfis, identificadores, JSON).

## Direction contract

FORM: seed:1aad0b351dd372c4 · assigned candidate 5, "Formulário em vias" (guias TISS, requisições, receituários carbonados).

THESIS: A documentação como o formulário de saúde que o FHIR substitui: campos com rótulo, tinta de formulário e BR Core / RNDS como duas vias do mesmo documento. Recusa o tema de docs genérico (sans neutra, cartões arredondados, pílulas coloridas).

OWN-WORLD: Papel branco quente; tinta de formulário vermelho-dropout só para estrutura (fios, rótulos de campo, onde o leitor está); tinta de dado preta para conteúdo; 2ª via canário marca tudo que é RNDS. Escuro = papel carbono. Rótulos em Archivo condensado caixa-alta; leitura em Atkinson Hyperlegible Next; código em JetBrains Mono. Fios de 1px, cantos retos, status como carimbo. Picote separa o canhoto (sumário).

STORY: O leitor sabe onde está (nº do documento, sidebar numerada), lê numa coluna calma e distingue BR Core de RNDS pela via.

FIRST VIEWPORT: Cabeçalho em campos (emitente, pesquisa, nº do documento), faixa "via não oficial", sidebar numerada, título grande condensado-largo, canhoto à direita atrás de picote.

SIGNATURE: Cartões de perfil como blocos de campos rotulados; via canário para RNDS; carimbo de status.

RAISES: fios 1px e zero raio (centre-rail); uma grade de rótulos para todo cartão (box-stacks); três tintas (depot-blind); status como carimbo (cutting-bench); tinta reservada a estrutura e localização (orienteering).
