# Perfis da RNDS (captura)

Cópia dos StructureDefinitions do projeto
[Rede Nacional de Dados em Saúde no Simplifier](https://simplifier.net/redenacionaldedadosemsaude),
obtidos pela API FHIR `https://fhir.simplifier.net/RedeNacionaldeDadosemSaude` com `scripts/vendor-rnds.ts`.
A data e a lista da captura estão em `manifest.json`.

- **Por que estão aqui:** a RNDS não publica um pacote FHIR versionado com os perfis de produção. A cópia permite gerar as tabelas do site e validar os exemplos no formato da RNDS.
- **O que foi capturado:** só os perfis com canônica `http://www.saude.gov.br/fhir/r4/`. O projeto no Simplifier também guarda uma cópia antiga dos perfis do BR Core, que foi ignorada em favor do pacote oficial `br.gov.saude.br-core.fhir`.
- **Licença:** estes arquivos são de terceiros e mantêm os termos da fonte original. Eles **não** estão cobertos pela licença CC0 deste repositório.
- **Autoridade:** o próprio projeto no Simplifier informa que não é o repositório oficial e indica o [Portal de Serviços do DATASUS](https://servicos-datasus.saude.gov.br/) como fonte oficial.

Os arquivos não devem ser editados à mão. Para atualizar, rode `npm run fhir:vendor-rnds && npm run fhir:generate`.
