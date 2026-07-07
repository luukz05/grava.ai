@AGENTS.md

# Projeto GRAVA.AI — Contexto de negócio (proposta comercial FSK)

**Quem/o quê:** Lucas (FSK, dev/consultor) vende à **franqueadora GRAVA.AI**
(personalização de produtos com IA via totens/quiosques) um **site premium de
captação de franqueados + gestão de tráfego pago**. Este repo é o site (Next.js,
identidade dark + azul + hexágonos) + os documentos comerciais em `docs/`.

## Planos e preços atuais (fonte da verdade: `docs/proposta-*.md`)

- **Plano A — Presença Digital:** R$ 7.500 setup + R$ 850/mês (site premium sob
  medida + manutenção). Setup colado no B **de propósito** (gap pequeno empurra
  pro B: a decisão vira "quero leads ou não?", não "quanto site compro").
- **Buyout (comprar o site outright):** ~R$ 10.000, uma vez (dono do código,
  self-host, sem mensalidade; inclui handoff). É o valor sem subsídio da
  recorrência.
- **Plano B — Aquisição de Franqueados:** R$ 8.500 setup + R$ 1.500/mês + verba de
  anúncio à parte (tudo do A + rastreamento server-side + tráfego Meta/Google +
  **4 criativos estáticos/mês** + relatório de CPL; **Mês 1 de gestão cortesia**).
- **Plano B− (sem criativos):** R$ 8.500 setup + R$ 1.250/mês (cliente fornece os
  criativos). Serve de opção do meio no combo A / B− / B.
- **Acabamento premium (nível fsk.tax) é baseline** nos planos.

## Decisões e dilemas já resolvidos (não reabrir sem motivo)

- **Preço premium = "primeiro-case":** o redesign premium isolado vale R$ 14–22k
  (faixa bespoke de mercado). Está embutido a preço de lançamento em troca de
  case/depoimento — **não é o preço-régua**, não ancorar futuros clientes nisso.
  Teto deliberado de setup abaixo de R$ 10k (pedido do Lucas por ser o 1º trabalho).
- **Domínio:** cliente paga **direto**, registrado no **CNPJ dele** — NÃO embutir
  na mensalidade nem registrar no nome do Lucas (evita virar refém/financiar).
  `.com.br` ~R$ 40/ano (Registro.br); `grava.ai` ~R$ 358/ano (Spaceship, mín. 2
  anos). **Confirmar antes o que o cliente já possui** — `gravaai.com` e
  `gravaai.com.br` já estavam registrados (jul/2026, provavelmente do cliente).
- **Zero lock-in — preciso, não solto.** Vale pra **contas (Meta BM, Pixel, GA4,
  Google Ads), domínio, dados e leads**: no nome do cliente **desde o dia 1**,
  incondicional; sair = remover acesso, sem multa. **NÃO vale pro código:** o
  código é **PI da FSK** (cliente tem licença de uso do site publicado); só
  transfere no **término do prazo mínimo de 6 meses quitado** (sem custo) OU via
  **buyout/acerto** (buyout − setup pago). **Hospedagem (repo + deploy) fica com a
  FSK** durante o contrato — é a trava de inadimplência (corta hospedagem no A;
  pausa campanhas + corta hospedagem no B). Saída antes dos 6 meses = leva os
  ativos, **não leva o código** salvo pagando o acerto. Detalhes em
  `proposta-comercial.md` §6 "Propriedade do código, saída e prazo mínimo".
- **Verba de anúncio SEMPRE separada** (paga direto às plataformas) — nunca
  embutida na mensalidade. É anti "caixa-preta" e **linha vermelha**.
- **Rastreamento server-side** (Meta CAPI + Google Enhanced Conversions + GA4) é
  baseline no Plano B e **linha vermelha** — nunca cede. Meta Ads engloba
  Facebook + Instagram + Messenger + Audience Network (1 Pixel/CAPI cobre tudo).
- **Descontos = escada, só no setup, sempre com contrapartida.** Pisos: setup A
  R$ 5.000 / B R$ 6.800; mensal A R$ 500 (só reduzindo escopo) / B R$ 1.200 (só 1
  plataforma). **Mês 1 cortesia ≠ desconto de setup** (é um OU outro). A carta
  "preço de primeiro case" só no **fechamento**, nunca na abertura.
- **Posicionamento: comparar SEMPRE pra cima** (agências R$ 2–8k/mês numa
  caixa-preta, teto WordPress/Elementor, o Next.js quebrado do Gelato) — **NUNCA
  pra baixo** (Fiverr/Wix) na proposta. Fiverr só como objeção falada, jamais
  escrita (ancorar pra baixo cheapa a marca).
- **Ponto fraco honesto:** é o 1º case de franquia do Lucas (sem portfólio no
  vertical; especialistas como Prospecta têm +300 franqueadoras). Prova disponível
  = **fsk.tax** (execução premium, NÃO prova de franquia). Assumir de frente e
  virar vantagem (boutique sem overhead, zero lock-in, Mês 1 cortesia).
- **Módulos:** não expor preço de módulo na proposta ao cliente (lead-gen: o valor
  é entregue no contato). "Subir fidelidade visual" saiu da lista (virou baseline);
  "Rastreamento & Analytics" é baseline no Plano B.

## Regras de trabalho nos docs

- **Nunca vazar dado interno no material do cliente.** Piso, margem, playbook de
  negociação, simulação de faturamento, "primeiro case", preço-régua vivem SÓ nos
  docs internos. Os docs client-facing (`proposta-cliente`, `pitch-vs-mercado`,
  `apresentacao-10-slides`) ficam limpos.
- **Uma fonte da verdade pra preços/módulos** (`proposta-comercial.md`). Ao mudar
  um valor, **propagar pra todos os docs dependentes** (comparações, simulação de
  faturamento, pitch, slides, objeções) — senão o kit fica contraditório.
- Converter datas relativas em absolutas ao registrar algo.

## Mapa dos docs (+ agente especializado)

| Doc | O que é | Público | Agente |
|---|---|---|---|
| `proposta-cliente.md` | Proposta de envio (planos, preços, domínio, condições) | Cliente | `proposta-cliente` |
| `proposta-comercial.md` | Interno: planos, playbook, pisos, descontos, simulação, desmame | Interno | `estrategia-comercial` |
| `analise-concorrencia.md` | Pesquisa de mercado, players, LPs reais dos concorrentes, fontes | Interno | `analise-mercado` |
| `pitch-vs-mercado.md` | Peça de venda "Você × Mercado" (texto) | Cliente | `pitch-venda` |
| `apresentacao-10-slides.md` | Estrutura do deck de 10 slides (com narração) | Cliente | `apresentacao` |
| `tracking-stack.md` | Stack técnico de tracking Meta+Google (Next.js) | Técnico | `tracking-tecnico` |
| `tratamento-objecoes.md` | Guia de objeções (fala/medo/resposta/não faça) | Interno | `objecoes` |

Outros docs (`brand-and-content.md`, `guia-marketing-digital.md`, `ia-spec.md`,
`fsk-design-system.md`) são material de referência, não parte do kit comercial.

`fsk-design-system.md` é a fonte da verdade técnica do estilo FSK (stack, tokens,
componentes, layouts, padrões de seção, princípios). Consultar ao construir ou
adaptar qualquer site nesse estilo.
