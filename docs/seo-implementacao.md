# SEO do site grava.ai — o que foi feito e o que falta

> Estado: implementado em 04/08/2026. Build e lint passando.
> Segunda rodada em 11/08/2026 (§5): `llms.txt`, correção do `lastmod`,
> descrições reescritas, decisão sobre meta keywords.
> Mapa de termos por página: `palavras-chave.md`.
> Público: técnico (Lucas). Não é material de cliente.

---

## 1. O pedido e o ajuste na premissa

O pedido foi "um botão no rodapé para uma página de SEO, para indexar melhor no
Google".

**Uma "página de SEO" no sentido clássico não foi construída, de propósito.**
Página feita para o buscador — palavra-chave repetida, conteúdo raso, existindo
só para ranquear — é o que o Google chama de *doorway page*. Está na
documentação de spam dele desde 2015, e a penalidade não atinge a página: atinge
o domínio inteiro. Leva meses para reverter.

O formato que atende ao mesmo objetivo sem esse risco é **FAQ**. Três razões
concretas:

1. **Casa com o que a pessoa digita.** Ninguém busca "franquia de personalização
   com inteligência artificial". Busca "quanto custa franquia grava ai", "qual o
   payback", "franquia de personalização vale a pena". São perguntas, e uma
   página de perguntas responde no formato da busca.
2. ~~**`FAQPage` é um dos poucos schemas que o Google ainda mostra como resultado
   rico.** A resposta aparece na própria página de busca, com o site assinando.~~
   **Vencido — ver §6.4.** O Google desligou o resultado rico de FAQ em
   07/05/2026. O motivo real hoje é outro: pergunta-resposta curta é o formato
   que os buscadores com resposta gerada conseguem recortar e citar.
3. **É útil de verdade.** Cada dúvida respondida ali é uma que não ocupa a
   conversa do WhatsApp — que é a única métrica do site.

---

## 2. O que entrou

### 2.1 Página nova: `/perguntas`

| Item | Valor |
|---|---|
| Arquivo | `src/app/perguntas/page.tsx` + `perguntas.css` |
| Conteúdo | 12 perguntas em 4 grupos: Dinheiro, O ponto, A operação, Como começar |
| Marcação | `<details>` nativo |
| Entrada | Link no rodapé das 4 rotas |

**Por que `<details>` nativo e não acordeão em React:** abre sem JavaScript, é
acessível por teclado de fábrica, e o Ctrl+F do navegador acha texto dentro dele
mesmo fechado. O rastreador também lê o conteúdo fechado — ninguém precisa
clicar para o Google enxergar a resposta.

**Regra de conteúdo aplicada:** nenhuma resposta inventa fato. Todas saem de
`docs/brand-and-content.md` (transcrição da apresentação de 7 slides da
franqueadora) ou do que a landing já afirma. Onde a rede não forneceu dado, a
pergunta não existe.

> FAQ é onde a tentação de preencher lacuna com estimativa é maior, e é onde ela
> custa mais caro: resposta errada ali vira resposta errada **dentro do resultado
> do Google**, com a marca assinando embaixo.

O payback está redigido como estimativa da franqueadora, não como garantia de
retorno — é a formulação que evita problema jurídico em página de captação de
franqueado.

### 2.2 Infraestrutura técnica

Nada disso existia. Sem ela, nenhuma página indexa bem, independente do conteúdo.

| Arquivo | O que resolve |
|---|---|
| `src/app/site.ts` | Domínio num lugar só — entra em 4 lugares que precisam concordar |
| `src/app/sitemap.ts` | Declara quais URLs são as boas |
| `src/app/robots.ts` | Primeira coisa que o rastreador lê; carrega a linha `Sitemap:` e o `Host:` |
| `layout.tsx` → `metadataBase` | **Faltava.** Sem ele o Next emitia OG relativo |
| `alternates.canonical` nas 4 rotas | Impede o site de competir consigo mesmo |
| JSON-LD `Organization` (layout) | Liga o site à marca em vez de tratá-lo como domínio anônimo |
| JSON-LD `FAQPage` (`/perguntas`) | ~~Habilita o resultado rico~~ → dá às respostas forma legível por máquina (§6.4) |

**O `metadataBase` era o buraco mais caro.** Sem ele, as URLs de Open Graph saem
relativas, e URL relativa em meta tag não resolve em lugar nenhum: o card do
WhatsApp e do Instagram sai quebrado. É por WhatsApp que esta página converte.

**As canônicas importam mais aqui que no site médio.** O `CLAUDE.md` registra que
`gravaai.com` e `gravaai.com.br` já estavam registrados. Se os dois responderem o
mesmo conteúdo — cenário provável —, sem canônica o site divide a própria
autoridade entre dois endereços idênticos.

**O JSON-LD do FAQ é gerado da mesma lista que a página renderiza.** Duas fontes
para a mesma frase é como o resultado rico passa a divergir do conteúdo visível,
e isso o Google trata como marcação enganosa, não como descuido.

O `Organization` leva só campo verificável: nome, tagline, site, logo, Instagram
e o WhatsApp. Sem `aggregateRating`, sem número de unidades, sem `foundingDate`.
Dado estruturado inventado é a via mais rápida para uma ação manual de spam,
porque ali a afirmação é legível por máquina e fica registrada.

---

## 3. Pendências — precisam de decisão ou de terceiro

### 3.1 O domínio está chutado 🔴

`src/app/site.ts` usa `NEXT_PUBLIC_SITE_URL` com fallback `https://gravaai.com.br`.
O fallback existe só para o build não quebrar.

**Antes de publicar:** definir `NEXT_PUBLIC_SITE_URL` no ambiente da Vercel com o
domínio real.

```bash
vercel env add NEXT_PUBLIC_SITE_URL
```

Publicar com o domínio errado é **pior** que publicar sem nenhum: o Google indexa
canônicas apontando para um site que não existe.

### 3.2 A franqueadora precisa revisar as 12 respostas 🔴

São fatos dela, reescritos em forma de pergunta. Antes de ir ao ar, cada resposta
precisa de confirmação — principalmente as quatro de dinheiro.

### 3.3 Depois do deploy

- [ ] Cadastrar a propriedade no **Google Search Console** e enviar o sitemap
- [ ] ~~Rodar o **Rich Results Test** na `/perguntas` para confirmar o FAQ
      elegível~~ — não há mais o que confirmar, o recurso acabou (§6.4). Rodar o
      **Schema Markup Validator** apenas para checar que o JSON-LD parseia
- [ ] Conferir o card de compartilhamento colando o link num WhatsApp de verdade
- [ ] A lista de outros buscadores e assistentes está em §6.6

### 3.4 O que continua faltando e não foi feito

- **Sem imagem de Open Graph.** Decisão anterior do projeto, registrada no
  `layout.tsx`: não existe ativo real e inventar um contraria a mesma regra que
  mantém números e depoimentos fora da página. Entra quando houver foto.
- **`/perguntas` não está na navbar**, só no rodapé. A navbar tem três pílulas e
  um quarto item mudaria o desenho dela. A página se identifica como
  `atual="franqueado"`, então a pílula de Franqueado fica acesa.
- **Galeria e institucional continuam com conteúdo de placeholder.** Página com
  placeholder indexada é página fraca; considerar `noindex` nelas até a
  fotografia real chegar.

---

## 4. Como verificar

```bash
npm run build

curl -s http://localhost:4040/robots.txt
curl -s http://localhost:4040/sitemap.xml
curl -s http://localhost:4040/ | grep -o '<link rel="canonical"[^>]*>'
```

Verificado em 04/08/2026: `robots.txt` e `sitemap.xml` servindo, canônicas
corretas nas 4 rotas, os 5 blocos de JSON-LD parseando sem erro.

**Não houve conferência visual** da `/perguntas` — a extensão do Chrome não
conectou nesta sessão. O que pede olhos é a animação de abertura do `<details>`
(usa `::details-content` + `interpolate-size`, com degradação para abertura seca
onde não houver suporte).

---

## 5. Segunda rodada — 11/08/2026

Pedido: criar `sitemap.xml`, `llms.txt`, meta description e palavras-chave, e
conferir na literatura se cada uma dessas coisas de fato ajuda a indexação.

A conferência mudou o desenho de três das quatro. Registro do que a evidência
disse e do que foi feito com ela.

### 5.1 O `lastmod` do sitemap estava mentindo 🔧 corrigido

O sitemap já existia (`src/app/sitemap.ts` — o Next serve em `/sitemap.xml`).
Dois defeitos apareceram na revisão:

**`lastModified: new Date()`.** Isso carimbava a hora do build em todas as
quatro URLs. Cada deploy — inclusive um que só mexeu em CSS — passava a anunciar
que o site inteiro tinha mudado. É o modo de falha clássico de gerador estático,
e a consequência não é neutra: o Google confere a data declarada contra a página
que ele busca, e quando o sitemap jura "mudou ontem" numa página parada há
meses, ele para de confiar na coluna inteira. Não existe `lastmod` meio
confiável — ou vale, ou vira decoração.

Trocado por datas fixas escritas à mão, semeadas do último commit que tocou cada
página (`git log -1 --format=%cI -- <arquivo>`). **Ao mudar conteúdo de uma
página, a data dela sobe no arquivo.** Está anotado lá dentro.

> Considerei derivar a data do git em tempo de build. Não vale: a Vercel clona
> raso, então `git log` no build tende a devolver o commit do deploy — o mesmo
> defeito, com mais código.

**`priority` e `changeFrequency`.** Google ignora os dois. Está na documentação
oficial de sitemaps, e Gary Illyes já chamou o par de *"bag of noise"* em
público. O pior era o comentário do arquivo, que descrevia `priority` como
orçamento de rastreio — leitura errada, virava premissa errada na próxima
mexida. Campos e comentário removidos. Sobraram `<loc>` e `<lastmod>`, que é o
que o Google lê.

### 5.2 `llms.txt` — criado, com a expectativa correta ⚠️

Criado em `public/llms.txt` (servido em `/llms.txt`). **Mas a evidência contra
ele é forte, e o número que importa é este: para indexação no Google, o retorno
esperado é zero.** Não "pequeno" — zero, e por declaração do próprio Google.

O que a pesquisa devolveu:

| Fonte | O que diz |
|---|---|
| Documentação de IA do Google (atualizada em 15/06/2026) | *"You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search (including its generative AI capabilities), as Google Search itself doesn't use them."* |
| Gary Illyes, Search Central Live | Google não suporta `llms.txt` e não tem plano de suportar |
| John Mueller, *Search Off the Record* | Comparou o arquivo à **meta keywords**: é o dono do site declarando ser o melhor, então não serve de sinal |
| Ahrefs, 137 mil domínios (mai/2026) | 97% dos `llms.txt` receberam **zero requisição** no mês; das que houve, 96% vieram de bots comuns; nenhum bot de IA procurou o arquivo em domínios que não o tinham |

Então por que ele está lá? Por três motivos que não são "vai ranquear":

1. **Custa um arquivo estático.** Sem build, sem rota, sem manutenção fora de
   quando o preço mudar.
2. **É a versão curta e correta dos números da rede.** Se um assistente qualquer
   raspar o site, a fonte concentrada e revisada compete com o resumo que ele
   faria sozinho a partir do HTML. Não há garantia de que alguém leia — mas se
   ler, lê o texto certo.
3. **O bloco final é o mais útil:** ele declara o que a rede *não* publica
   (número de unidades, faturamento por loja, depoimento) e que payback e ticket
   são estimativa. É a mesma regra do resto do site, dita numa linha que uma
   máquina consegue citar.

**O que não fazer com ele:** vender `llms.txt` ao cliente como item de SEO. Se
entrar na conversa, entra pelo que é — higiene barata para assistentes de IA, com
efeito nulo declarado sobre o Google.

### 5.3 Meta keywords — não entrou, de propósito ❌

O Google não usa a tag desde 2009, e publicou um post só para dizer isso. O
motivo é o mesmo que Mueller usou contra o `llms.txt`: quem preenche é o dono do
site. Adicionar hoje não penaliza — só entrega ao concorrente a lista dos termos
perseguidos.

O trabalho de palavra-chave foi para onde ele conta — título, H1, corpo,
perguntas do FAQ — e está mapeado por página em **`palavras-chave.md`**, com a
ressalva de que é hipótese de intenção, não volume medido. Volume de verdade sai
do Planejador do Google Ads (conta que nasce com o Plano B) e do Search Console
depois de 30 dias no ar.

### 5.4 Descrições reescritas nas quatro rotas ✅

A descrição **não é sinal de ranqueamento**, e o Google reescreve a maioria: 62,78%
na medição da Ahrefs sobre ~192 mil páginas, 71% no desktop na da Portent. Ela
decide o clique quando ele resolve usar a sua. Regra aplicada: até ~155
caracteres, carga útil nos primeiros 110 (o que sobra no celular).

| Rota | O que mudou |
|---|---|
| `/` | Passou a abrir pela **categoria** (`Franquia de personalização com IA`), não pelo produto, e fecha com investimento e payback — na captação, a descrição que já filtra quem não tem o valor economiza conversa no WhatsApp |
| `/institucional` | Meta e Open Graph diziam **frases diferentes**; unificadas. Faltava `url` no OG |
| `/galeria` | Tinha 58 caracteres e desperdiçava o espaço — o que não é dito ali o Google preenche com trecho qualquer da página, que ainda é casca. Reescrita, com OG completo |
| `/perguntas` | Já estava dentro da regra; sem mudança |

### 5.5 Fontes desta rodada

- [Google Search Central — Build and Submit a Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Central — Google does not use the keywords meta tag (2009)](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag)
- [Search Engine Journal — Google Confirms LLMs.txt Has No Current Implementation](https://www.searchenginejournal.com/google-says-llms-txt-is-purely-speculative-for-now/577576/)
- [Search Engine Roundtable — Google Search Team Does Not Endorse LLMs.txt Files](https://www.seroundtable.com/google-does-not-endorse-llms-txt-40789.html)
- [Kai Spriestersbach — The llms.txt is dead. More precisely: a dud](https://medium.com/@kaispriestersbach/the-llms-txt-is-dead-more-precisely-a-dud-ab7bee4f469c) (traz os dados da Ahrefs)
- [Digital Applied — Sitemap Lastmod: Google Says Drop Inaccurate Dates](https://www.digitalapplied.com/blog/xml-sitemap-lastmod-hygiene-illyes-directive-seo-2026)
- [Marketing Miner — 5 facts Google confirmed about sitemaps](https://www.marketingminer.com/en/blog/5-interesting-facts-google-has-recently-confirmed-about-sitemaps)

### 5.6 O que continua pendente depois desta rodada

- 🔴 **O domínio ainda está chutado** (§3.1). Nada disto vale enquanto
  `NEXT_PUBLIC_SITE_URL` não apontar para o domínio real — as canônicas, o
  sitemap e o `llms.txt` herdam o valor errado.
- 🔴 **A franqueadora ainda não revisou as 12 respostas** (§3.2). Os mesmos
  números agora estão também no `llms.txt`; a revisão passou a valer para dois
  arquivos.
- 🟡 **`noindex` na galeria e no institucional** continua sem decisão (§3.4).
  Página de casca indexada puxa a média do domínio para baixo.
- 🟡 **Sem imagem de Open Graph** (§3.4). É o item de maior efeito prático que
  falta, porque o site converte por link colado no WhatsApp.

---

## 6. Terceira rodada — 11/08/2026 — outros buscadores, LLMs e serviços

Pergunta: além do Google, tem algo específico a fazer?

Tem, e um dos itens é mais barato que tudo o que veio antes. Também apareceu
aqui uma afirmação **vencida** que estava no próprio doc e no comentário do
código (§6.4).

### 6.1 O caminho para o ChatGPT passa pelo Bing 🔧 implementado

A conclusão que reorganiza a lista: **o ChatGPT não tem um índice próprio que
baste**. Ele combina o crawler dele (`OAI-SearchBot`) com infraestrutura de
índice da Microsoft. Site fora do índice do Bing tende a ficar fora das
respostas do ChatGPT — e o mesmo índice alimenta o Copilot.

Ou seja: cuidar do Bing não é cuidar do Bing. É cuidar de Bing + ChatGPT +
Copilot com um esforço só. E existe um atalho que o Google não tem.

**IndexNow.** É um ping: em vez de esperar o rastreador aparecer, o site avisa
que a URL mudou. Escutam Bing, Yandex, Naver, Seznam e Yep. **O Google não
escuta** e não pretende escutar — para ele continua sendo sitemap e Search
Console.

Implementado:

| Arquivo | O que é |
|---|---|
| `public/c85bd0d6319776caf7a25942dca5c9db.txt` | A chave. Pública por desenho: só amarra o ping ao domínio, não protege nada |
| `scripts/indexnow.mjs` | O ping em si, com as mesmas 4 rotas do sitemap |
| `npm run indexnow` | Como rodar, depois de um deploy que mexeu em conteúdo |

> **Só funciona com o domínio decidido e no ar.** O buscador confere a chave em
> `https://<domínio>/<chave>.txt` antes de aceitar. Rodar antes disso devolve
> 403. É mais uma coisa presa no §3.1.

Rodar a cada deploy não ajuda: o valor está em avisar quando o conteúdo mudou de
verdade — o mesmo raciocínio do `lastmod` (§5.1).

### 6.2 Os robôs de IA — política explícita no `robots.txt` 🔧 implementado

A regra `*` já liberava todos. As linhas nomeadas que entraram em
`src/app/robots.ts` não mudam o comportamento hoje; elas registram a decisão e
sobrevivem ao dia em que alguém apertar o `*` sem pensar nas respostas de IA.

A distinção que importa, e que quase todo mundo erra:

| Grupo | Quem | O que bloquear custa |
|---|---|---|
| **Busca / citação** | `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `DuckAssistBot`, `Amazonbot`, `Applebot` | Sumir das respostas. É por estes que a citação acontece |
| **Treino** | `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `meta-externalagent`, `Bytespider` | Sair do corpus futuro. Não tira o site de resposta nenhuma |

O erro caro é bloquear `GPTBot` achando que protege conteúdo e levar
`OAI-SearchBot` junto — o site some do ChatGPT e ninguém liga uma coisa à outra.
Aqui os dois grupos estão liberados: site de captação quer ser citado em toda
parte onde alguém pergunta sobre franquia.

> **Armadilha da Vercel:** o firewall dela tem opção de bloquear robô de IA, e
> ela vence o `robots.txt` — o bloqueio acontece antes de o arquivo ser lido. Se
> o site sumir das respostas, conferir o painel antes de investigar o código.

### 6.3 HTML puro — já estava certo, e é o requisito mais duro ✅

**Os crawlers da OpenAI não executam JavaScript.** Um experimento da Writesonic
em março/2026 confirmou que o ChatGPT lê como parser de HTML e nada mais. Site
que monta o conteúdo no cliente é, para ele, uma página em branco.

Aqui não é problema, e por acidente feliz de decisões anteriores: o build gera
as 4 rotas como estático (`○ Static` na saída do `next build`), e as respostas do
FAQ estão em `<details>` nativo — que renderiza no HTML mesmo fechado. Conferido
no HTML gerado em 11/08/2026: o texto das respostas e os 4 blocos de JSON-LD
estão lá, sem JavaScript.

É o motivo mais forte para **não** trocar o `<details>` por acordeão em React
depois. A decisão original foi tomada por acessibilidade (§2.1); ela agora tem
um segundo dono.

### 6.4 ⚠️ Vencido: o resultado rico de FAQ acabou

O §1 deste doc e o comentário no topo de `perguntas/page.tsx` diziam que
`FAQPage` é um dos poucos schemas que o Google ainda mostra como resultado rico.
**Não é mais.** A linha do tempo:

- **ago/2023** — Google restringe o resultado rico de FAQ a sites de governo e
  saúde "conhecidos e autoritativos". Motivo declarado: uso abusivo, gente
  grudando FAQ em página de produto e de categoria.
- **07/05/2026** — o recurso para de aparecer **de vez**, inclusive para quem
  tinha mantido elegibilidade. Relatório sai do Search Console em junho, API em
  agosto.

Nenhuma marcação de FAQ produz caixa expansível na busca hoje.

**O que muda na prática: nada no código, tudo na justificativa.** A marcação
continua na página. O que ela entrega mudou de "enfeite no resultado do Google"
para "o mesmo conteúdo em forma legível por máquina" — que é o que os sistemas
de resposta usam para saber que aquilo é uma pergunta com resposta fechada, e de
quem. Corrigido em `perguntas/page.tsx`, no §1 e em `palavras-chave.md`.

A `/perguntas` continua sendo a melhor página do site para isso, só que pelos
motivos 1 e 3 da lista original, não pelo 2.

### 6.5 Dado estruturado passou a valer mais, não menos

Contramão útil: no momento em que o Google desliga resultado rico, os sistemas
de resposta passam a usar o mesmo dado para outra coisa. Google e Microsoft
confirmaram publicamente que dado estruturado ajuda seus sistemas de IA a
entender e citar conteúdo. O estudo de GEO de Princeton (KDD 2024) mediu até
**40% mais citação** em respostas geradas para conteúdo que combina citação de
fonte, estatística e dado estruturado.

Os três elementos do estudo, no estado deste site:

| Elemento | Situação |
|---|---|
| Dado estruturado | ✅ `Organization` + `FAQPage` |
| Estatística concreta | ✅ investimento, royalties, ticket, payback — todos com número |
| Citação de fonte externa | ❌ não há, e **não deve haver inventada** |

O terceiro é o único que falta, e a saída honesta é uma só: quando a rede for
associada à **ABF** ou tiver matéria em veículo de franquia, isso vira link e
menção reais. Fabricar autoridade aqui é o mesmo erro de fabricar número.

Considerei e **descartei** adicionar mais schema agora:

- `BreadcrumbList` — site plano de 4 páginas, ganho perto de zero.
- `Product` / `Offer` para a franquia — tipo errado. Franquia não é produto de
  e-commerce, e forçar o tipo é declarar coisa falsa em linguagem de máquina.
- `LocalBusiness` — só faz sentido com unidade física de endereço confirmado.
  Hoje seria invenção; quando houver quiosque em operação com endereço, aí sim,
  uma entrada por unidade.

### 6.6 O que depende de conta e cadastro — não dá para fazer no código

Lista para quando o domínio existir (§3.1). Tudo aqui é manual, gratuito e leva
minutos:

- [ ] **Bing Webmaster Tools** — o mais importante depois do Google, pelo motivo
      do §6.1. Dá para importar a propriedade direto do Search Console
- [ ] **Rodar `npm run indexnow`** depois do primeiro deploy de conteúdo
- [ ] **Yandex Webmaster** — só se houver público russo. Provavelmente não; o
      IndexNow já avisa o Yandex de qualquer jeito
- [ ] **Google Business Profile** — vale por unidade física, não pela
      franqueadora. Quando houver quiosque em shopping com endereço, cada um é
      uma ficha. É o que faz aparecer no Maps e na busca local, que para quiosque
      é onde o cliente final procura
- [ ] **Bing Places** — o equivalente, e importa mais desde que virou insumo do
      Copilot
- [ ] **Instagram e WhatsApp Business com o site no perfil** — o `sameAs` do
      JSON-LD já aponta para o Instagram; o link de volta fecha o par e é como o
      Google confirma que o perfil e o site são a mesma entidade
- [ ] **ABF / Portal do Franchising** — quando a rede for associada. Além do
      lead direto, é a citação de fonte que falta no §6.5

Fora da lista de propósito: diretório de submissão em massa, "submeta seu site a
500 buscadores" e serviço de indexação paga. São os mesmos vinte diretórios de
sempre, e o rastro que deixam é de perfil de spam.

### 6.7 Fontes desta rodada

- [Search Engine Land — The rise and fall of FAQ schema](https://searchengineland.com/faq-schema-rise-fall-seo-today-463993)
- [Search Engine Journal — Google Drops FAQ Rich Results From Search](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/)
- [Schema App — Changes to FAQ and How-to rich results on Google](https://www.schemaapp.com/schema-app-news/changes-to-faq-and-how-to-rich-results-on-google/)
- [IndexNow.org — protocolo e FAQ](https://www.indexnow.org/faq)
- [Wikipedia — IndexNow (buscadores participantes)](https://en.wikipedia.org/wiki/IndexNow)
- [freeCodeCamp — How to Index Your Next.js Apps Faster Using IndexNow](https://www.freecodecamp.org/news/how-to-index-nextjs-pages-with-indexnow/)
- [honeyb.ai — AI Crawler User Agents Reference 2026](https://www.honeyb.ai/blog/ai-crawler-user-agents-reference-2026)
- [Pressonify — How to Get Cited by ChatGPT Search in 2026](https://pressonify.ai/blog/how-to-get-cited-chatgpt-search-2026)
- [Opace — Structured Data for Google, AI Search and LLMs (2026)](https://opace.agency/blog/structured-data-schema-for-seo/) — traz o número do estudo de GEO de Princeton
