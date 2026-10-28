# Como contribuir

Obrigado por ajudar. Este projeto é uma proposta comunitária de documentação e depende de revisão de quem implementa FHIR no Brasil.

## Issues

- **Erro de conteúdo:** algo no site está incorreto ou desatualizado. Inclua o link da página e a fonte que mostra o correto.
- **Sugestão:** um tema, exemplo ou melhoria.

Afirmações regulatórias (portarias, prazos, obrigações) e operacionais (endpoints, headers, fluxos de credenciamento) só entram no site com fonte primária verificada. Quando algo depende de verificação, a issue recebe o rótulo `pendente-verificacao` e o conteúdo só é publicado depois de confirmado.

## Pull requests

1. Crie um branch a partir da `main`.
2. Siga o [guia de estilo](GUIA-DE-ESTILO.md).
3. Rode `npm run build`, que também valida os links internos.
4. Se alterou ou criou exemplos, rode `npm run fhir:validate`. É necessário ter Java 21 ou Docker. O resultado precisa ter 0 erros.
5. Use [Conventional Commits](https://www.conventionalcommits.org/) em inglês (`docs: explain CNS validation`, `fix: correct RIA example dose code`).

## Exemplos FHIR

- Um recurso ou Bundle por arquivo em `examples/<dominio>/`. Exemplos no formato da RNDS de produção ficam em `examples/rnds/<dominio>/`.
- Use somente dados fictícios, com CPF e CNS de dígitos verificadores válidos.
- A validação roda sem servidor de terminologia (`-tx n/a`). Não existe servidor público brasileiro verificado, e a maior parte das CodeSystems do pacote de terminologia é publicada com `content = not-present`. Por isso, avisos de "CodeSystem não encontrado" e de narrativa (`dom-6`) são esperados e aceitos.

## Dados gerados

Não edite `src/data/generated/` à mão. Rode `npm run fhir:update` depois de mudar `fhir-packages.json`, ou `npm run fhir:vendor-rnds && npm run fhir:generate` para recapturar a RNDS.
