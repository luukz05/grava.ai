# SEO do site grava.ai — o que foi feito e o que falta

> Estado: implementado em 04/08/2026. Build e lint passando.
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
2. **`FAQPage` é um dos poucos schemas que o Google ainda mostra como resultado
   rico.** A resposta aparece na própria página de busca, com o site assinando.
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
| JSON-LD `FAQPage` (`/perguntas`) | Habilita o resultado rico |

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
- [ ] Rodar o **Rich Results Test** na `/perguntas` para confirmar o FAQ elegível
- [ ] Conferir o card de compartilhamento colando o link num WhatsApp de verdade

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
