# Palavras-chave do site grava.ai

> Escrito em 11/08/2026. Público: técnico/interno (Lucas). Não é material de
> cliente.
> Complementa `seo-implementacao.md`, que cobre a infraestrutura (sitemap,
> robots, canônicas, dados estruturados).

---

## 1. Onde as palavras-chave entram — e onde não entram

**Não existe `<meta name="keywords">` neste site, e isso é decisão, não
esquecimento.** O Google publicou em 21/09/2009 um post inteiro para dizer que
não usa a tag no ranqueamento, pelo motivo óbvio: quem preenche é o dono do
site, então ela não prova nada. Nenhum buscador relevante voltou atrás desde
então. Preencher a tag hoje não penaliza — só entrega ao concorrente, de graça,
a lista dos termos que você está perseguindo.

Os lugares onde o termo de fato conta:

| Lugar | Peso | Onde está no repo |
|---|---|---|
| `<title>` | alto | `metadata.title` de cada rota |
| `<h1>` e subtítulos | alto | JSX de cada página |
| Texto do corpo, em frase natural | alto | JSX de cada página |
| Perguntas do FAQ (são a busca literal) | alto | `perguntas/page.tsx`, `GRUPOS` |
| Texto de link interno | médio | rodapé e navbar |
| `<meta name="description">` | zero para ranquear, alto para clique | `metadata.description` |

A descrição merece a distinção. Ela **não é sinal de ranqueamento** — e o Google
reescreve a maior parte delas de qualquer jeito: a medição da Ahrefs em ~192 mil
páginas deu 62,78% de reescrita, e a da Portent deu 71% no desktop. O que a
descrição decide é o clique quando o Google resolve usar a sua. Por isso a regra
aplicada nas quatro rotas é: até ~155 caracteres, com a carga útil nos primeiros
110, que é o que sobrevive ao corte no celular.

---

## 2. O termo principal por página

A regra é uma página, um termo. Duas páginas disputando a mesma busca é
canibalização: o Google escolhe uma das duas — normalmente a errada — e a outra
some.

### `/seja-franqueado` — a landing de captação (a página que paga a conta)

- **Primário:** `franquia de personalização com IA`
- **Secundários:** `franquia GRAVA.AI` · `franquia com inteligência artificial`
  · `franquia de totem de personalização` · `franquia em shopping`
- **Cauda longa (é onde a conversão está):** `quanto custa a franquia GRAVA.AI`
  · `franquia de personalização vale a pena` · `franquia de baixo investimento
  em shopping` · `como abrir uma franquia de personalização`

Hoje o título é *"GRAVA.AI — uma franquia que a IA opera junto com você"*. Ele
carrega a marca e a categoria, e está certo assim: quem já ouviu o nome busca
pelo nome, e quem não ouviu ainda encontra pela categoria dentro do texto.

### `/perguntas` — o motor de cauda longa

Cada pergunta do FAQ **é** uma consulta. As 12 já cobrem, quase palavra por
palavra, o que a pessoa digita:

| Pergunta na página | Busca que ela responde |
|---|---|
| "Quanto custa a franquia GRAVA.AI?" | `quanto custa franquia grava ai` |
| "Em quanto tempo o investimento volta?" | `payback franquia personalização` |
| "Existe taxa mensal?" | `royalties franquia grava ai` |
| "Qual o ticket médio de uma peça?" | `ticket médio franquia personalização` |
| "Onde a unidade pode ser instalada?" | `franquia para shopping / aeroporto` |
| "Preciso saber desenhar…?" | `franquia sem experiência` |

É a página com maior chance real de ranquear primeiro, e por dois motivos que
não dependem de autoridade de domínio: a concorrência na cauda longa é baixa, e
o formato pergunta-resposta curta é o que os buscadores com resposta gerada
conseguem recortar e citar.

> **Não é mais pelo resultado rico.** O Google restringiu o `FAQPage` a sites de
> governo e saúde em ago/2023 e desligou o recurso de vez em 07/05/2026. A
> marcação continua na página pelo dado, não pelo enfeite — detalhe em
> `seo-implementacao.md` §6.4.

Se alguma pergunta nova chegar pelo WhatsApp três vezes, ela vira linha nova
aqui — e a data em `sitemap.ts` sobe junto.

### `/` — a home, a marca

- **Primário:** `GRAVA.AI` (busca por nome)
- **Secundários:** `personalização de produtos com inteligência artificial` ·
  `gravação a laser personalizada`

Esta página existe para a busca por marca, não para captar. É ela que o painel
lateral do Google usa junto com o JSON-LD de `Organization`.

**Ela era `/institucional` até 02/09/2026**, quando a captação estava em `/`.
A inversão põe a busca por nome — que é como a maior parte do tráfego de uma
rede nova chega — na raiz do domínio, que é a URL com mais autoridade. O
endereço antigo redireciona com 308.

### `/galeria` — o produto

- **Primário:** `peças personalizadas com IA`
- **Secundários:** `gravação a laser em shopping` · `presente personalizado na
  hora`

**Ressalva honesta:** a galeria ainda é casca, sem fotografia real. Página fraca
indexada puxa a média do domínio para baixo. Enquanto a foto não chega, a opção
defensável é `noindex` nela — decisão registrada como pendência em
`seo-implementacao.md` §3.4 e ainda não tomada.

---

## 3. Por que a aposta é a cauda longa, e não o termo genérico

Disputar `franquia` ou `franquia rentável` de frente é queimar meses: são os
termos onde estão o Portal do Franchising, a ABF e todas as consultorias com
anos de domínio. `lei de franquia` chegou a ser a palavra-chave mais cara do
Brasil em anúncio pago (US$ 179,55 o clique) — o que mede a competição no
vertical inteiro.

A cauda longa inverte a conta: menos volume por termo, mas quem digita
`quanto custa a franquia GRAVA.AI` já decidiu que quer saber o preço. As
medições públicas de mercado convergem em conversão bem mais alta na cauda longa
que na cabeça — os números específicos variam demais entre fontes para eu citar
um como verdade, mas a direção é consistente e o mecanismo é óbvio: a consulta
específica revela intenção específica.

Para este site, com domínio novo e sem histórico, é também a única faixa onde há
chance de ranquear dentro de meses em vez de anos.

---

## 4. O que ainda falta, e depende de dado real

Tudo acima é mapa de intenção, montado a partir do que a franqueadora informa e
do formato das buscas. **Não há volume de busca medido aqui**, porque volume
honesto exige ferramenta com dado de verdade, e inventar número numa planilha de
palavra-chave é o mesmo erro de inventar número na página.

Quando a conta do Google Ads existir (ela nasce junto com o Plano B):

- [ ] Rodar os termos acima no **Planejador de Palavras-chave**, com região
      Brasil e idioma português, e anotar volume e concorrência reais
- [ ] Cruzar com o **Search Console** depois de 30 dias no ar: a aba de
      consultas mostra o que a página *já* recebe, que quase nunca é o que a
      gente supôs
- [ ] Ajustar título e H1 da home se a busca real divergir do mapa

Até lá, a lista é hipótese fundamentada, não medição — e deve ser apresentada ao
cliente com essa palavra.

---

## 5. O que não fazer (o erro caro no vertical)

- **Nada de página por palavra-chave.** "Franquia de personalização em
  Sorocaba", "…em Campinas", "…em Ribeirão Preto", todas iguais menos o nome da
  cidade, é *doorway page*: está na documentação de spam do Google desde 2015 e
  a penalidade atinge o domínio inteiro, não a página. Página de cidade só se
  houver unidade de verdade lá e conteúdo próprio sobre ela.
- **Nada de repetir o termo além do natural.** Se a frase soa estranha lida em
  voz alta, o termo está sobrando.
- **Nada de dado inventado para preencher lacuna.** Vale mais aqui do que no
  resto do site: número errado dentro do FAQ vira número errado **dentro do
  resultado do Google**, com a marca assinando embaixo, e o `FAQPage` deixa isso
  legível por máquina.
- **Nada de meta keywords.** Ver §1.

---

## 6. Fontes

- [Google Search Central — Google does not use the keywords meta tag in web
  ranking (2009)](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag)
- [Google Search Central — Build and Submit a
  Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Search Engine Journal — Is The Meta Keywords Tag A Ranking
  Factor?](https://www.searchenginejournal.com/ranking-factors/meta-keywords/)
- [Portal do Franchising](https://www.portaldofranchising.com.br/) — quem
  domina os termos genéricos do vertical
- [Inforchannel — palavras-chave mais caras do Brasil em anúncio
  pago](https://inforchannel.com.br/2017/08/15/confira-as-5-palavras-chave-mais-caras-para-anuncios-pagos-no-brasil/)
