# Interop Saúde BR

Documentação sobre interoperabilidade em saúde no Brasil com HL7 FHIR R4, o [BR Core](https://hl7.org.br/fhir/core/) e a Rede Nacional de Dados em Saúde (RNDS).

**Site:** https://open-health-brazil.github.io/fhir-ig/

> **Proposta comunitária, não oficial.** Este projeto não é mantido pelo Ministério da Saúde nem pelo DATASUS. Ele foi escrito para um dia ser proposto como documentação oficial. Até lá, prevalecem as publicações oficiais: o [Portal de Serviços do DATASUS](https://servicos-datasus.saude.gov.br/), o [guia da RNDS](https://rnds-guia.saude.gov.br/) e o [BR Core](https://hl7.org.br/fhir/core/).

## O que tem aqui

- **Trilha Gestão:** o que é a RNDS, adesão e credenciamento, base legal e LGPD, casos de uso e prazos.
- **Trilha Desenvolvimento:** ambientes, autenticação, envio de documentos, identificadores, terminologias, perfis do BR Core e da RNDS lado a lado, exemplos validados e o mapeamento RNDS ↔ BR Core.

As tabelas de perfis são geradas a partir dos pacotes oficiais, e os exemplos FHIR são validados no CI com o validador oficial da HL7.

## Rodando localmente

Requer Node.js 22.18 ou mais recente (os scripts usam TypeScript nativo do Node).

```sh
npm install
npm run dev        # http://localhost:4321/fhir-ig/
npm run build      # build estático em dist/ + verificação de links internos
```

## Dados FHIR

| Comando | O que faz |
|---|---|
| `npm run fhir:fetch` | Baixa os pacotes fixados em `fhir-packages.json` para `.fhir-cache/` |
| `npm run fhir:generate` | Gera `src/data/generated/` (perfis, NamingSystems, terminologias) |
| `npm run fhir:update` | `fhir:fetch` + `fhir:generate` |
| `npm run fhir:check-updates` | Compara as versões fixadas com as marcadas como `current` pelos publicadores |
| `npm run fhir:vendor-rnds` | Recaptura os perfis da RNDS do Simplifier em `vendor/rnds/` (manual) |
| `npm run fhir:validate` | Valida `examples/` com o validador HL7 (Java local ou Docker) |

Particularidades dos pacotes:

- O BR Core não está em packages.fhir.org. Cada pacote em `fhir-packages.json` declara a URL do próprio tarball.
- O BR Core 1.7.1 declara a terminologia 1.2.0, que não foi publicada. A versão fixada é a 1.1.0, e `scripts/prepare-validator-cache.ts` a registra como alias para o validador.
- A RNDS não publica pacote versionado. Os perfis de produção são capturados do Simplifier e versionados em `vendor/rnds/`.

## Estrutura

```
src/content/docs/      páginas (MDX)
src/components/        componentes (tabelas de perfil, exemplos, identificadores)
src/data/generated/    dados gerados dos pacotes (commitados; não editar à mão)
examples/              exemplos FHIR validados
vendor/rnds/           perfis da RNDS capturados do Simplifier
scripts/               download, geração, validação e checagem de versões
.github/workflows/     deploy, validação e atualização semanal dos pacotes
```

## Automação

- `deploy.yml`: publica o site no GitHub Pages a cada push na `main`. Em Settings → Pages, a fonte precisa estar em "GitHub Actions".
- `validate.yml`: valida os exemplos e o build (com links) em cada PR.
- `update-packages.yml`: toda segunda-feira, verifica se há nova versão `current` do BR Core ou da terminologia. Se houver, regenera os dados e abre um PR. Para o PR disparar a validação, configure o secret `UPDATE_PR_TOKEN` com um token de acesso pessoal (fine-grained) com permissão de escrita em conteúdo e pull requests.

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) e o [guia de estilo](GUIA-DE-ESTILO.md).

## Licença

Conteúdo do projeto em [CC0 1.0](LICENSE). Os arquivos em `vendor/` são de terceiros e mantêm a licença original.
