/* Perguntas frequentes sobre a franquia.

   POR QUE ESTA PÁGINA, E NÃO UMA "PÁGINA DE SEO".

   O pedido foi uma página para indexar melhor. A resposta clássica para isso —
   uma página com a palavra-chave repetida, feita para o buscador e não para
   gente — é o que o Google chama de doorway page e penaliza desde 2015. Ela não
   sobe o site; ela derruba o domínio inteiro, e leva meses para desfazer.

   O formato que serve ao mesmo objetivo sem nada disso é este. Três razões:

   1. Ele casa com o que a pessoa digita. Ninguém busca "franquia de
      personalização com inteligência artificial". Busca "quanto custa franquia
      grava ai", "franquia de personalização vale a pena", "qual o payback".
      São perguntas, e uma página de perguntas responde na forma da busca.
   2. `FAQPage` em JSON-LD é um dos poucos tipos que o Google ainda mostra como
      resultado rico. A resposta aparece na própria busca, com o site assinando.
   3. É útil de verdade. Toda dúvida respondida aqui é uma que não precisa
      ocupar a conversa do WhatsApp — e o WhatsApp é a única métrica do site.

   REGRA DE CONTEÚDO, QUE VALE MAIS QUE O RESTO.

   Nenhuma resposta aqui inventa fato. Todas saem do material da franqueadora
   (`docs/brand-and-content.md`, transcrito da apresentação de 7 slides) ou do
   que a própria landing já afirma. Onde a rede não forneceu dado, a pergunta
   não existe — página de FAQ é justamente onde a tentação de preencher lacuna
   com estimativa é maior, e é onde ela custa mais caro: resposta errada aqui
   vira resposta errada no resultado do Google, com a marca assinando embaixo.

   Antes de publicar: a franqueadora precisa revisar e confirmar cada resposta. */

import type { Metadata } from "next";
import Link from "next/link";
import "../v5.css";
import "../variacoes.css";
import "../temas.css";
import "./perguntas.css";
import { Casca, Heroi, WHATSAPP } from "../casca";
import { Rodape } from "../rodape";
import { SITE_URL } from "../site";

const TITULO = "Perguntas frequentes sobre a franquia GRAVA.AI";
const DESCRICAO =
  "Investimento, payback, taxas, onde instalar e o que a rede entrega: as dúvidas mais comuns de quem está avaliando uma unidade GRAVA.AI.";

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: `${SITE_URL}/perguntas` },
  openGraph: {
    title: TITULO,
    description: DESCRICAO,
    url: `${SITE_URL}/perguntas`,
    locale: "pt_BR",
    type: "website",
  },
};

/* A resposta é texto puro, e não JSX, porque ela é usada duas vezes: na página
   e dentro do JSON-LD. Duas fontes para a mesma frase é a receita para o
   resultado rico do Google divergir do que a página mostra — e isso o Google
   trata como marcação enganosa, não como descuido. */
type Pergunta = { q: string; a: string };

const GRUPOS: { titulo: string; perguntas: Pergunta[] }[] = [
  {
    titulo: "Dinheiro",
    perguntas: [
      {
        q: "Quanto custa a franquia GRAVA.AI?",
        a: "O investimento total é de R$ 99.900, pago uma vez. A taxa de franquia de R$ 35.000 já está dentro desse valor, e com ela cerca de R$ 15.000 em equipamentos e no estoque inicial da unidade.",
      },
      {
        q: "Em quanto tempo o investimento volta?",
        a: "O payback estimado pela rede é de 6 a 12 meses. É uma estimativa da franqueadora, não uma garantia de retorno — o resultado depende do ponto, do fluxo e da operação.",
      },
      {
        q: "Existe taxa mensal?",
        a: "Sim: royalties de 2,5% e taxa de marketing de 1%, ambos sobre o faturamento bruto. Não há mensalidade fixa, e a plataforma de IA que opera a unidade não é cobrada à parte.",
      },
      {
        q: "Qual o ticket médio de uma peça?",
        a: "Entre R$ 60 e R$ 100, segundo o material da rede. É o valor de uma peça personalizada e gravada na hora, no totem.",
      },
      {
        q: "Os valores mudam conforme o tipo de ponto?",
        a: "Não. Investimento, royalties e taxa de marketing são os mesmos em shopping, supermercado ou aeroporto. O que muda de um ponto para outro é o público, não o contrato.",
      },
    ],
  },
  {
    titulo: "O ponto",
    perguntas: [
      {
        q: "Onde a unidade pode ser instalada?",
        a: "Em locais de alto fluxo: shopping centers, supermercados e hipermercados de grande porte, e aeroportos. A unidade ocupa pouca área e vive da circulação que o ponto já tem.",
      },
      {
        q: "Qual tipo de ponto funciona melhor?",
        a: "Cada um funciona de um jeito. O shopping tem fluxo alto e constante, com pico no fim de semana; o supermercado traz o mesmo cliente toda semana; o aeroporto tem público de fora da cidade e tempo de espera longo. O que muda é o tempo que a pessoa tem e o motivo de ela estar ali.",
      },
    ],
  },
  {
    titulo: "A operação",
    perguntas: [
      {
        q: "Preciso saber desenhar ou operar máquina de gravação?",
        a: "Não. A arte é gerada na hora pela inteligência artificial, a partir do que o cliente descreve no totem, e a gravação é feita ali mesmo. É a diferença central para uma loja de gravação tradicional, onde alguém precisa saber desenhar e operar o programa.",
      },
      {
        q: "Quem cuida do estoque e dos fornecedores?",
        a: "A distribuição é centralizada: produtos e matéria-prima saem da matriz, sem o franqueado precisar buscar fornecedor ou negociar preço. A plataforma monitora o consumo da unidade e avisa a hora da reposição.",
      },
      {
        q: "Preciso estar na loja todos os dias?",
        a: "Não. A operação foi desenhada para rodar sem depender da presença do franqueado: a IA atende no totem, a matriz acompanha a unidade em tempo real pelo CRM e o padrão de qualidade é definido e mantido pela rede.",
      },
      {
        q: "A plataforma de IA é cobrada à parte?",
        a: "Não. Ela está inclusa na operação — não é assinatura separada nem custo mensal.",
      },
    ],
  },
  {
    titulo: "Como começar",
    perguntas: [
      {
        q: "Como faço para abrir uma unidade?",
        a: "A conversa começa no WhatsApp da rede e segue com quem opera a franquia, não com um atendente. A apresentação completa da franquia é enviada por lá.",
      },
    ],
  },
];

const TODAS = GRUPOS.flatMap((g) => g.perguntas);

export default function Perguntas() {
  /* O JSON-LD sai da mesma lista que a página renderiza. Se uma resposta mudar,
     as duas mudam juntas — é a única forma de garantir que o que o Google
     mostra é o que a página diz. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TODAS.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  };

  return (
    <Casca atual="franqueado">
      {/* `type="application/ld+json"`: o navegador não executa, só o rastreador
          lê. Vai no corpo da página de propósito — o Google aceita nos dois
          lugares, e aqui ele fica ao lado do conteúdo que descreve. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Heroi>
        <header className="hold hero hero--curto" id="topo">
          <div>
            <h1>Perguntas de quem está avaliando a franquia.</h1>
            <p>
              As dúvidas que mais chegam, respondidas com o que a rede já
              confirmou. O que não estiver aqui, pergunte direto.
            </p>
            <div className="row">
              <a className="cta cta--lg" href={WHATSAPP}>
                Falar no WhatsApp
              </a>
              <Link className="cta cta--lg cta--out" href="/#numeros">
                Ver os números
              </Link>
            </div>
          </div>
        </header>
      </Heroi>

      {GRUPOS.map((g) => (
        <section className="hold sec" key={g.titulo}>
          <div className="sec-cab">
            <h2>{g.titulo}</h2>
          </div>

          {/* `<details>` nativo, e não acordeão em React: abre sem JavaScript,
              é acessível por teclado de fábrica e o Ctrl+F do navegador acha
              texto dentro dele mesmo fechado. O rastreador também lê o conteúdo
              fechado — o que importa aqui é que ninguém precisa clicar para o
              Google enxergar a resposta. */}
          <div className="faq">
            {g.perguntas.map((p) => (
              <details className="faq-item" key={p.q}>
                <summary>
                  <h3>{p.q}</h3>
                  <span className="faq-sinal" aria-hidden="true" />
                </summary>
                <p>{p.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}

      <footer className="hold close" id="falar">
        <div className="sec-cab">
          <h2>Ficou uma dúvida que não está aqui?</h2>
          <p>Do outro lado responde quem opera a rede, não um atendente.</p>
        </div>
        <div className="row" style={{ marginTop: 0 }}>
          <a className="cta cta--lg" href={WHATSAPP}>
            Falar no WhatsApp
          </a>
        </div>
        <Rodape
          links={[
            { href: "/", rotulo: "Seja um franqueado" },
            { href: "/institucional", rotulo: "A marca" },
            { href: "/galeria", rotulo: "Galeria" },
          ]}
        />
      </footer>
    </Casca>
  );
}
