/* O CARD DE COMPARTILHAMENTO — o que WhatsApp, Teams, Slack, LinkedIn e
   iMessage desenham quando alguém cola um link do site.

   AQUI ESTAVA ESCRITO QUE ELE NÃO EXISTIA. O `layout.tsx` trazia um comentário
   dizendo que não havia imagem de Open Graph porque não existia ativo real e
   inventar um contrariava a regra que mantém número e depoimento fora da
   página. A regra continua de pé — o que mudou é que este card não afirma
   nada: ele é a marca, uma frase que já está na `<title>` da própria rota e o
   rótulo do assunto da página. Nenhum dado novo entra por aqui, e nenhum
   número — o payback que chegou a sair no pé do card de captação foi retirado
   pelo mesmo motivo: promessa de retorno estampada numa imagem que circula
   solta, fora da página que a contextualiza, é o tipo de afirmação que uma
   captação de franqueado não deve deixar viajar sozinha.

   POR QUE UM CARD IMPORTA MAIS QUE O NORMAL NESTE SITE. A captação começa em
   link colado: o time da franqueadora manda a página no WhatsApp e no Teams
   para o candidato. Sem `og:image`, o WhatsApp desenha uma tira de texto
   cinza com a favicon — que ao lado de qualquer concorrente com card lê como
   link improvisado. É o primeiro frame da marca, e ele acontece antes de a
   página carregar.

   ────────────────────────────────────────────────────────────────────────────
   O PESO DO ARQUIVO É REQUISITO, NÃO DETALHE. O WhatsApp só desenha a
   miniatura de pré-visualização se a imagem for pequena — na prática, poucas
   centenas de KB; acima disso ele cai no card sem imagem, que é exatamente o
   que este arquivo existe para evitar. Por isso o card é gráfico e não
   fotográfico: fundo chapado, curvas de nível em traço fino e o logotipo. Uma
   foto de peça em PNG a 1200×630 passa fácil de 800 KB e derruba o card no
   lugar em que ele mais é usado.

   POR QUE NÃO TEM MANCHETE EM 600. A Switzer do site é um arquivo variável
   (100–900), e o motor que desenha esta imagem (Satori) lê a tabela `fvar`
   mas não aplica a `gvar`: qualquer peso pedido sai na instância padrão, 400.
   Em vez de fingir um 600 que não vem, a manchete é 400 com um contorno fino
   da própria cor — o mesmo truque que uma fundição chama de encorpar —, que
   devolve ao caule a espessura que falta sem trocar o desenho da letra. O
   logotipo continua sendo o elemento mais alto da hierarquia, que é o que se
   quer num card: quem passa o olho lê a marca, não a frase. */

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const TAMANHO = { width: 1200, height: 630 };
export const TIPO_CONTEUDO = "image/png";

/* As cores são as mesmas variáveis do `v5.css`, escritas em literal porque o
   Satori não lê CSS do site — ele recebe estilo inline e mais nada. Se um
   token mudar lá, muda aqui; são quatro valores e a divergência aparece no
   primeiro card gerado. */
const BG = "#05090d";
const FG = "#f2f8ff";
const FG_2 = "#7c8fa0";
const CIANO = "#66cdff";

/* AS CURVAS DE NÍVEL — a assinatura de material da marca.

   No site elas são um shader que recalcula o campo de elevação a cada quadro
   (`topography.tsx` / `carta-viva.tsx`). Aqui a imagem é um quadro só, então o
   terreno é desenhado de uma vez: cada linha é uma soma de senos, e o que faz
   o conjunto ler como carta topográfica em vez de listra ondulada é o
   deslocamento de fase por linha (`i * 0.42`) — ele aproxima e afasta linhas
   vizinhas, que é como a cota se comporta onde o terreno sobe mais rápido.

   Sai em SVG dentro de um `data:` URI: nenhum arquivo novo no repositório e
   nenhuma requisição de rede durante o build. */
function carta(largura: number, altura: number) {
  const linhas = 15;
  const vao = altura / (linhas - 3);
  const passos = 60;

  const caminhos: string[] = [];

  for (let i = 0; i < linhas; i++) {
    const base = -vao + i * vao;
    const fase = i * 0.42;

    /* A amplitude varia de linha para linha. Com amplitude fixa as quinze
       linhas ficam paralelas e o conjunto lê como listra ondulada — papel de
       parede. É a diferença de altura entre vizinhas que faz o olho ler
       relevo. */
    const relevo = 0.55 + 0.45 * Math.sin(i * 0.9);

    const pontos: string[] = [];
    for (let p = 0; p <= passos; p++) {
      const x = (p / passos) * largura;
      const t = (x / largura) * Math.PI * 2;
      const y =
        base +
        relevo *
          (34 * Math.sin(t * 1.15 + fase) +
            18 * Math.sin(t * 2.3 - fase * 1.7) +
            8 * Math.sin(t * 4.1 + fase * 0.6));
      pontos.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }

    /* A opacidade cai de cima para baixo porque a manchete mora na metade de
       baixo: onde há texto, o terreno precisa ser fundo, não concorrente. */
    const opacidade = 0.3 - (i / linhas) * 0.16;
    caminhos.push(
      `<polyline points="${pontos.join(" ")}" fill="none" stroke="${CIANO}" stroke-opacity="${opacidade.toFixed(
        3,
      )}" stroke-width="1.15" />`,
    );
  }

  /* O HEXÁGONO QUE VAZA PELA DIREITA. É a forma do símbolo da marca em escala
     de cenário — o mesmo papel que a chapa de entalhe cumpre atrás do herói do
     site. Vaza pela borda de propósito: hexágono inteiro e centrado viraria
     ícone, e o card já tem um. */
  const cx = 1085;
  const cy = 300;
  const r = 250;
  const vertices = Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 180) * (60 * k - 90);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${largura}" height="${altura}" viewBox="0 0 ${largura} ${altura}">` +
    `<polygon points="${vertices}" fill="none" stroke="${CIANO}" stroke-opacity="0.07" stroke-width="26" />` +
    `<polygon points="${vertices}" fill="none" stroke="${CIANO}" stroke-opacity="0.18" stroke-width="1.5" />` +
    caminhos.join("") +
    `</svg>`;

  /* Em base64 e não em `;utf8,` com escape percentual: o Satori aceita as duas
     formas, mas a percentual passa por um decode a mais e qualquer caractere
     que escape dele vira um SVG inválido silenciosamente — a imagem some sem
     erro. Base64 não tem essa aresta. */
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/* O ENDEREÇO SAIU DO PÉ DO CARD.

   Ele esteve ali, escrito a partir do mesmo `SITE_URL` que alimenta canônicas,
   sitemap e robots — a ideia era que se corrigisse sozinho no dia em que o
   domínio fosse decidido. O que a primeira publicação mostrou é o outro lado
   disso: enquanto a decisão não sai, o que se imprime na imagem é o endereço
   provisório da Vercel, e endereço de hospedagem estampado num card é o
   contrário de marca — diz onde o site está, não de quem ele é.

   Não faz falta. Quem vê o card está olhando para um link: o endereço já está
   na prévia, logo abaixo da imagem, escrito pelo próprio WhatsApp. Repetir
   dentro da arte é gastar a única linha do pé com o que já está na tela. */

/* As três rotas do site chamam esta função. Ela existe para que a moldura —
   fundo, terreno, logotipo, régua do pé — seja UMA, e o que muda entre a marca,
   a captação e a galeria seja só a frase. Três cópias da mesma moldura são o
   começo de três cards que envelhecem separados. */
export async function CardOg({
  titulo,
  destaque,
  rodape,
}: {
  /* A frase, quebrada em duas partes: o que vem antes do trecho aceso e o
     trecho aceso em ciano. É o mesmo `<mark>` do herói do site (`.hero h1
     mark`, no `v5.css`), que lá também não pinta fundo — só troca a cor. */
  titulo: string;
  destaque: string;
  /* A linha do pé: o rótulo que diz de que página é o card. Não é claim nem
     número — é o nome do assunto, curto o bastante para caber numa linha. */
  rodape: string;
}) {
  const [fonte, logo] = await Promise.all([
    /* NÃO É O ARQUIVO QUE O SITE SERVE. O navegador recebe o
       `Switzer-Variable.woff2`; o Satori não abre WOFF2 e ainda tropeça na
       tabela `fvar` da fonte variável. Este `.ttf` estático sai daquele mesmo
       arquivo por `npm run og:fonte` e existe só para esta imagem — o porquê
       inteiro está em `scripts/og-fonte.mjs`. */
    readFile(join(process.cwd(), "src/app/fontes/Switzer-Regular-og.ttf")),
    readFile(join(process.cwd(), "public/brand/grava-horizontal.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: BG,
          fontFamily: "Switzer",
          position: "relative",
        }}
      >
        {/* O terreno e o hexágono, em SVG, cobrindo o quadro inteiro. Vem como
            `<img>` e não como `background-image` porque o Satori desenha SVG
            em imagem com fidelidade total e trata fundo em CSS com um
            subconjunto do que o navegador faz. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={carta(TAMANHO.width, TAMANHO.height)}
          alt=""
          width={TAMANHO.width}
          height={TAMANHO.height}
          style={{ position: "absolute", top: 0, left: 0 }}
        />

        {/* A luz. Duas camadas: um brilho azul atrás do logotipo, que é de onde
            a página inteira parece iluminada, e um escurecimento no pé, que é
            o que segura o contraste do texto sobre as curvas. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: TAMANHO.width,
            height: TAMANHO.height,
            backgroundImage:
              "radial-gradient(circle at 18% 12%, rgba(59,165,232,0.30), rgba(5,9,13,0) 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: TAMANHO.width,
            height: TAMANHO.height,
            backgroundImage:
              "linear-gradient(180deg, rgba(5,9,13,0) 35%, rgba(5,9,13,0.85) 100%)",
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo}`}
          alt=""
          width={312}
          height={93}
          style={{ position: "relative" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* A manchete. Corpo, entrelinha e espacejamento saem do `.hero h1`
              do site — entrelinha rente a 1 e tracking negativo —, o que faz o
              card e a página lerem como a mesma peça quando a pessoa clica. O
              `maxWidth` para em 860px para o texto nunca invadir o hexágono da
              direita. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: 860,
              fontSize: 62,
              lineHeight: 1.06,
              letterSpacing: "-0.038em",
              color: FG,
              WebkitTextStroke: `0.9px ${FG}`,
            }}
          >
            <span>{titulo}&nbsp;</span>
            <span style={{ color: CIANO, WebkitTextStroke: `0.9px ${CIANO}` }}>
              {destaque}
            </span>
          </div>

          {/* A régua do pé. Fio de 1px na mesma cor da `--hair` do site, e
              abaixo dele o rótulo em versalete espaçado — que é como o site
              escreve rótulo técnico desde que as três famílias viraram uma.

              Alinhado à esquerda, no mesmo eixo da manchete e do logotipo. Ele
              já dividiu esta linha com o endereço do site, um em cada ponta;
              sozinho e centrado ou à direita, ficaria pendurado sem nada
              sustentando do outro lado. */}
          <div
            style={{
              marginTop: 44,
              height: 1,
              width: "100%",
              background: "rgba(242,248,255,0.12)",
            }}
          />
          <div
            style={{
              marginTop: 22,
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: FG_2,
            }}
          >
            {rodape}
          </div>
        </div>
      </div>
    ),
    {
      ...TAMANHO,
      fonts: [
        {
          name: "Switzer",
          data: fonte,
          style: "normal",
          /* 400 e só 400: é a instância que o arquivo variável entrega sem a
             `gvar`. Declarar 600 aqui faria o Satori escolher esta mesma fonte
             e desenhar 400 do mesmo jeito — com a diferença de que o código
             passaria a mentir sobre o que sai. */
          weight: 400,
        },
      ],
    },
  );
}
