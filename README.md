# GRAVA.AI — site

Site de marca + captação de franqueados da **GRAVA.AI** (personalização de
produtos com IA em totens/quiosques). Next.js 16 (App Router), React 19,
TypeScript, CSS próprio — sem framework de UI.

Identidade: dark (`#05090d`), azul, hexágonos. Movimento com GSAP; fundo em
WebGL (shader de topografia com `ogl`) e cena do totem em vídeo percorrido pela
rolagem. Métricas com Vercel Analytics e Speed Insights.

## Rodar

```bash
npm install
npm run dev      # http://localhost:4040
```

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento na porta **4040** |
| `npm run dev:log` | Igual ao `dev`, gravando a saída em `dev.log` — use quando o servidor morre sozinho e o scrollback some junto |
| `npm run build` | Build de produção |
| `npm start` | Serve o build na porta 4040 |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run indexnow` | Ping de IndexNow (Bing, Yandex, Naver, Seznam, Yep). Rodar **depois** de um deploy que mexeu em conteúdo. O Google não usa o protocolo — lá é sitemap + Search Console |
| `npm run og:fonte` | Regenera `src/app/fontes/Switzer-Regular-og.ttf`, a fonte das imagens de Open Graph. Só quando o arquivo da Switzer for trocado |

Scripts de asset, rodados à mão e fora do fluxo normal:

- `node scripts/videos.mjs` — reencoda `public/cena/bruto/*` em `totem.mp4` e
  `pecas.mp4` com keyframe denso, para que a cena possa ser percorrida pela
  rolagem. Precisa de `ffmpeg-static` (já é devDependency). Os brutos não são
  versionados: só existem na máquina de quem os tem.
- `node scripts/brand-assets.mjs` — limpa os PNGs de marca do UIKIT (fundo
  branco vira alfa, corta a folga). **Requer `sharp`, que não está no
  `package.json`** — instale sob demanda (`npm i -D sharp`) antes de rodar. A
  pasta de origem está fixa no script (`SRC`); ajuste antes de rodar em outra
  máquina.

## Rotas

| Rota | Página |
|---|---|
| `/` | Marca / institucional |
| `/seja-franqueado` | Landing de captação (destino do tráfego pago), com o FAQ em `#duvidas` e o formulário em `#falar` |
| `/galeria` | Galeria de peças personalizáveis. Ainda é casca: os slots dizem o que vão receber, sem foto |
| `/api/lead` | `POST` do formulário de captação |

Redirects permanentes (308) em `next.config.ts`, preservando o que já foi
indexado ou colado em anúncio: `/institucional` → `/`, `/franqueado` →
`/seja-franqueado`, `/perguntas` → `/seja-franqueado#duvidas`.

O formulário só existe em `/seja-franqueado`. A home e a galeria encaminham para
lá (`portais.tsx`, `destinoCta` em `lead.ts`), e o mini-formulário do rodapé
manda o e-mail por `GET` para `/seja-franqueado#falar`, que já abre com ele
preenchido.

## Estrutura

```
src/app/
  page.tsx, seja-franqueado/, galeria/               rotas
  landing.tsx                                        conteúdo de /seja-franqueado
  casca.tsx                                          moldura comum (navbar, fixos, tipografia)
  _marca/                                            componentes só da home (centro, curvas, arte)
  rotas.ts                                           itens da navegação
  site.ts                                            domínio, nome, WhatsApp, Instagram
  sitemap.ts, robots.ts                              SEO
  opengraph-image.tsx, og-card.tsx, fontes/          imagens de compartilhamento e fontes
  api/lead/route.ts + lead.ts                        formulário: rota, contrato de resposta e destino dos CTAs
  form-franqueado.tsx                                formulário (usado em /seja-franqueado)
  *.tsx + *.css                                      seções e seus estilos, lado a lado
public/
  cena/, brand/, ref/                                vídeos da cena, marca, referências
  llms.txt, <chave>.txt                              resumo para LLMs, chave do IndexNow
scripts/                                             dev:log, indexnow, og:fonte, assets
```

Convenção: cada seção é um `.tsx` com o `.css` de mesmo nome ao lado. Nomes de
arquivo e comentários em português — o código explica **por que**, não o quê.

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Endereço público. Alimenta `metadataBase`, canônicas, `sitemap.xml` e a linha `Sitemap:` do `robots.txt` |

## Pendências conhecidas

Duas coisas estão de pé como contrato, mas não ligadas — de propósito:

1. **Domínio não decidido.** `SITE_URL` cai no palpite
   `https://gravaai.com.br` só para o build não quebrar. Antes de publicar,
   defina `NEXT_PUBLIC_SITE_URL` no ambiente da Vercel com o domínio real —
   publicar com o domínio errado é pior que publicar sem nenhum, porque o
   Google indexa canônicas apontando para um site que não existe.
   O runbook de ativação pós-domínio saiu do repositório junto com `docs/`, e
   continua no histórico: `git show 94c6514^:docs/seo-implementacao.md`.
2. **Envio de e-mail do lead não ligado.** Nenhum provedor foi provisionado.
   `src/app/api/lead/route.ts` tem o contrato inteiro (validação, normalização
   E.164 do telefone, formato de resposta) e um ponto único de ligação — a
   função `entregar`. Enquanto isso, o lead vai para o log do servidor, e o
   formulário diz exatamente o que aconteceu. Ligar o provedor = trocar o corpo
   de uma função.

Ao publicar, lembre também de atualizar as datas de `ATUALIZADO_EM` em
`src/app/sitemap.ts` quando o **conteúdo** de uma página mudar (texto, FAQ,
preço, dado estruturado) — não em ajuste de estilo ou refator. `lastmod` mentiroso
desqualifica o sitemap inteiro.

## Deploy

Vercel. Definir `NEXT_PUBLIC_SITE_URL` no projeto antes do primeiro deploy de
produção.

## Documentação

`AGENTS.md` avisa o essencial sobre esta versão do Next.js. O `CLAUDE.md` e a
pasta `docs/` (proposta comercial, análise de concorrência, SEO, tracking,
objeções) saíram do repositório no commit `94c6514`; para consultar, use
`git show 94c6514^:<caminho>`.
