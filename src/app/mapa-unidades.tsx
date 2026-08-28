"use client";

/* Onde a rede está — mapa de São Paulo, e uma unidade em foco de cada vez.

   Substitui a seção que era uma grade de três placeholders ("A unidade em
   operação", "Peça saindo do totem") com um cartão de texto no meio. Aquilo
   mostrava molduras vazias esperando foto; isto mostra um dado que o franqueado
   quer de fato: onde já tem unidade, e o que abre perto dele.

   ───────────────────────────────────────────────────────────────────────────
   O QUE ACONTECE AQUI

   Três coisas, e elas são uma só:

   — o mapa passa de unidade em unidade sozinho, acendendo um ponto por vez;
   — o painel à direita acompanha, com a foto e os dados daquela unidade;
   — quem clicar FIXA a unidade, e o ciclo para. É a mesma tecla de novo, ou o
     botão "voltar ao ciclo", que solta.

   O ciclo também para sozinho enquanto o cursor está sobre a seção. Sem isso, a
   pessoa que se interessou por uma cidade e foi ler o painel perde a leitura no
   meio — a seção estaria disputando com quem está tentando usá-la. Pelo mesmo
   motivo ele nem começa quando o sistema pede movimento reduzido: ali a lista de
   cidades continua inteira e clicável, e nada se mexe sem comando.

   ───────────────────────────────────────────────────────────────────────────
   A LISTA SAIU, E O PONTO DO MAPA ASSUMIU O LUGAR DELA

   Havia aqui uma lista das nove cidades embaixo do painel. Ela saiu a pedido: a
   seção passa a ser mapa e painel, e a escolha se faz clicando no mapa.

   O que ela carregava NÃO podia sair junto, e por isso cada marcador virou um
   `<button>` de fato — `role`, `tabIndex`, Enter e espaço, e `aria-pressed` para
   dizer qual está fixada. Sem isso, tirar a lista teria tirado três coisas de
   uma vez sem ninguém notar:

   — o TECLADO. Os pontos eram `aria-hidden` justamente porque a lista já dava a
     rota; sem ela, a seção inteira ficaria inalcançável sem mouse;
   — o LEITOR DE TELA. Cada ponto agora se anuncia com a cidade e a situação;
   — o BUSCADOR. Os nomes das cidades e as datas continuam no HTML como texto,
     dentro dos `<text>` do SVG — invisíveis até o ponto acender, presentes o
     tempo todo. "Campinas" continua sendo palavra na página, e não coordenada.

   O que de fato se perdeu com o JavaScript é a leitura sem script: o ciclo e a
   contagem regressiva precisam dele. A DATA de abertura, que é o dado, continua
   vindo pronta do servidor — o relógio só substitui aquele texto depois de
   montar, na mesma caixa, sem mover nada de lugar.

   ───────────────────────────────────────────────────────────────────────────
   OS DADOS SÃO DE EXEMPLO E PRECISAM SER SUBSTITUÍDOS

   Está tudo em `UNIDADES`, logo abaixo, e em nenhum outro lugar.

   As coordenadas das cidades são reais. O QUE NÃO É REAL é quais delas têm
   unidade, quais estão previstas e em que data — isso a franqueadora precisa
   informar. As datas de abertura ficam ABSOLUTAS aqui: "30 dias" apodrece no
   arquivo em silêncio, uma data vence à vista de todos.

   AS FOTOS TAMBÉM. Enquanto não vierem as fotos de cada loja, o painel usa duas
   imagens genéricas e cada uma diz uma coisa diferente: a unidade em operação
   aparece montada num shopping, a prevista aparece como o MODELO do quiosque,
   fora de qualquer lugar. Não é economia de arte — é a diferença entre "esta
   loja existe" e "esta loja vai ser assim". Trocar a foto de uma unidade é
   preencher `foto` na linha dela.

   Isto não é preciosismo: numa página de captação, unidade inventada no mapa é
   um candidato acreditando que existe loja na cidade dele. É a mesma regra que
   já vale para os números da rede, e o motivo de a seção "Diferenciais" ter sido
   extinta em vez de reescrita. */

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { CONTORNO_SP, MAPA_LARG, MAPA_ALT, projetar } from "./sp-geo";
import quiosqueOperando from "./unidades/quiosque-operando.jpg";
import quiosqueModelo from "./unidades/quiosque-modelo.png";

type Unidade = {
  cidade: string;
  /* Coordenadas reais das cidades — estas podem ficar. */
  lat: number;
  lon: number;
  /* Isto é o que precisa vir da franqueadora. */
  estado: "aberta" | "prevista";
  /* Data de abertura, só para previstas. ISO, e absoluta de propósito: é dela
     que sai tanto o texto do servidor quanto a contagem no navegador. */
  abertura?: string;
  /* Opcional, para as duas: o ponto. "Shopping Iguatemi · Piso L2". */
  ponto?: string;
  /* Opcional: uma linha sobre a praça. Some quando não existe — melhor um
     cartão curto que um cartão com frase de encher. */
  nota?: string;
  /* Opcional: a foto daquela loja. Sem ela, entra a genérica do estado. */
  foto?: StaticImageData;
};

const UNIDADES: Unidade[] = [
  { cidade: "São Paulo", lat: -23.5505, lon: -46.6333, estado: "aberta" },
  { cidade: "Campinas", lat: -22.9099, lon: -47.0626, estado: "aberta" },
  { cidade: "Santos", lat: -23.9608, lon: -46.3336, estado: "aberta" },
  { cidade: "Ribeirão Preto", lat: -21.1775, lon: -47.8103, estado: "aberta" },
  { cidade: "São José dos Campos", lat: -23.1791, lon: -45.8872, estado: "aberta" },
  { cidade: "Sorocaba", lat: -23.5015, lon: -47.4526, estado: "prevista", abertura: "2026-09-26" },
  { cidade: "São José do Rio Preto", lat: -20.8113, lon: -49.3758, estado: "prevista", abertura: "2026-10-11" },
  { cidade: "Bauru", lat: -22.3145, lon: -49.0606, estado: "prevista", abertura: "2026-10-26" },
  { cidade: "Presidente Prudente", lat: -22.1256, lon: -51.3889, estado: "prevista", abertura: "2026-11-25" },
];

/* Quanto tempo cada unidade fica em foco. Longo: aqui há uma foto e três linhas
   para ler, e não uma peça passando no canto do olho como no herói. */
const PERMANENCIA = 5200;

/* A hora que conta como "aberta" na data marcada. Fixa e com fuso escrito: sem
   ela a contagem terminaria à meia-noite, e nenhuma loja abre à meia-noite. */
const HORA_DE_ABRIR = "T10:00:00-03:00";

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/* Data por fatiamento de string, sem `Date` e sem `Intl`.

   Não é implicância com as duas: é que este texto é renderizado no servidor e de
   novo no navegador, e tem que sair IGUAL nas duas vezes. `Date` traz o fuso de
   quem renderiza e `Intl` traz a tabela de idiomas de quem renderiza — duas
   fontes de divergência para formatar três números que já vêm prontos na
   string. */
function dataCurta(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  return `${Number(dia)} ${MESES[Number(mes) - 1]} ${ano}`;
}

/* Ordem de leitura: abertas primeiro, e as previstas pela data de entrega. É a
   ordem em que a informação interessa a quem está decidindo — o que já existe
   prova a rede, o que abre logo é a janela que está fechando. As datas são ISO,
   então ordenar como texto ordena como data. */
function ordenar(a: Unidade, b: Unidade) {
  if (a.estado !== b.estado) return a.estado === "aberta" ? -1 : 1;
  if (a.estado === "prevista") return (a.abertura ?? "").localeCompare(b.abertura ?? "");
  return a.cidade.localeCompare(b.cidade, "pt-BR");
}

function situacao(u: Unidade) {
  return u.estado === "aberta" ? "Em operação" : `Abre em ${dataCurta(u.abertura ?? "")}`;
}

function faltam(abertura: string, agora: number) {
  const total = Math.floor((new Date(abertura + HORA_DE_ABRIR).getTime() - agora) / 1000);
  if (total <= 0) return null;
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/* Largura do rótulo, por conta e não por medição. Ela decide de que lado do pino
   o texto sai, e a decisão acontece na montagem — antes de existir tela onde
   medir, e no servidor, onde não existe tela nenhuma.

   Os fatores saíram de comparar a conta com o `getBBox()` real das nove: 11 por
   caractere na linha da cidade (19px, seminegrito) e 8 na de baixo (15px). Os
   dois são folgados de propósito: errar para MAIS empurra o rótulo para o lado
   de dentro, que é feio; errar para menos o joga para fora do quadro, que é
   pior. */
function larguraRotulo(u: Unidade) {
  const segunda = u.estado === "aberta" ? "em operação" : `abre ${dataCurta(u.abertura ?? "")}`;
  return Math.max(u.cidade.length * 11, segunda.length * 8);
}

/* O quanto o texto se afasta do centro do pino. O halo tem raio 13 e cresce para
   1,35 quando a unidade acende — 17,5 —, então 26 é a folga entre o ANEL ACESO e
   a primeira letra. Com os 14 que havia aqui, a palavra começava dentro do
   halo. */
const AFASTAMENTO = 26;

export function MapaUnidades() {
  const lista = [...UNIDADES].sort(ordenar);
  const abertas = UNIDADES.filter((u) => u.estado === "aberta").length;
  const previstas = UNIDADES.length - abertas;

  const raiz = useRef<HTMLDivElement>(null);
  const [emFoco, setEmFoco] = useState(0);
  /* Duas paradas diferentes, e por isso duas variáveis. `fixada` é decisão de
     quem clicou e sobrevive ao cursor sair; `parado` é cortesia enquanto o
     cursor está em cima, e volta atrás sozinho. Uma só variável faria o ciclo
     recomeçar quando o cursor saísse de uma unidade fixada. */
  const [fixada, setFixada] = useState<number | null>(null);
  const [parado, setParado] = useState(false);


  const atual = fixada ?? emFoco;
  const unidade = lista[atual];

  /* A ordem de DESENHO não é a da fila: a unidade em foco vai por último.

     SVG não tem `z-index` — quem pinta depois fica por cima —, e sem isto o
     rótulo aceso passa por baixo de qualquer marcador que venha depois dele na
     lista. Era o caso de São Paulo, cujo nome cruzava o pino de Sorocaba: o pino
     é desenhado depois e furava a palavra no meio.

     Reordenar nove nós a cada troca é barato, e o `key` por cidade faz o React
     mover os nós existentes em vez de recriá-los. */
  const ordemDeDesenho = lista
    .map((_, i) => i)
    .sort((a, b) => Number(a === atual) - Number(b === atual));

  /* O ciclo. Igual ao do herói: só corre com a seção na tela, porque trocar
     estado a cada 5s no rodapé da página é re-render sem espectador. */
  useEffect(() => {
    const alvo = raiz.current;
    if (!alvo || lista.length < 2) return;
    if (fixada !== null || parado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const parar = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const correr = () => {
      if (timer) return;
      timer = setInterval(() => setEmFoco((i) => (i + 1) % lista.length), PERMANENCIA);
    };

    const olho = new IntersectionObserver(
      ([entrada]) => (entrada.isIntersecting ? correr() : parar()),
      { threshold: 0.25 },
    );
    olho.observe(alvo);

    return () => {
      olho.disconnect();
      parar();
    };
  }, [fixada, parado, lista.length]);

  /* O relógio da contagem regressiva.

     `null` até o componente montar, e é isso que mantém servidor e navegador
     dizendo a mesma coisa no primeiro quadro: o servidor não tem "agora", então
     ele escreve a data, e o relógio só troca esse texto depois. Sem isso, o
     React acusaria divergência de marcação a cada carregamento.

     Só corre quando a unidade em foco tem data — as abertas não têm o que
     contar, e um `setInterval` de 1s repintando o mapa à toa é desperdício. */
  const contando = unidade?.estado === "prevista";
  const [agora, setAgora] = useState<number | null>(null);
  useEffect(() => {
    if (!contando) return;
    /* A primeira leitura sai do corpo do efeito e vai para um timer de zero.

       Ler o relógio direto ali seria `setState` síncrono dentro de um efeito: o
       render que acabou de terminar dispara outro na hora, em cascata. Adiar
       resolve, e o atraso é de um tique — ninguém vê a data virar contagem.

       NÃO é `requestAnimationFrame`, que seria o reflexo. Quadro só existe
       quando há pintura, e aba em segundo plano não pinta: a contagem ficaria
       parada esperando a pessoa voltar para a aba, mesmo já montada. Timer roda
       nos dois casos — em segundo plano o navegador o afrouxa para ~1s, que é
       exatamente o passo que este relógio já tem. */
    let relogio: ReturnType<typeof setInterval> | undefined;
    const primeira = setTimeout(() => {
      setAgora(Date.now());
      relogio = setInterval(() => setAgora(Date.now()), 1000);
    }, 0);
    return () => {
      clearTimeout(primeira);
      if (relogio) clearInterval(relogio);
    };
  }, [contando]);

  const restante = contando && agora !== null ? faltam(unidade.abertura ?? "", agora) : null;

  /* Clicar na unidade que já está fixada solta o ciclo, e ele recomeça de onde
     parou — não do começo. Voltar para São Paulo depois de fixar Bauru daria a
     impressão de que o clique quebrou alguma coisa. */
  function escolher(i: number) {
    if (fixada === i) {
      setEmFoco(i);
      setFixada(null);
      return;
    }
    setFixada(i);
  }

  return (
    <div
      className="mapa"
      ref={raiz}
      /* A parada por cortesia é só para quem tem cursor de verdade.

         `mouseenter` não é sinal de cursor: no toque o navegador dispara o par
         de eventos de mouse por compatibilidade, e o "sair" muitas vezes não
         vem — o ciclo pararia no primeiro toque em qualquer lugar da seção e
         não voltaria mais. Filtrando por `pointerType`, dedo não pausa nada, e
         quem toca numa cidade já tem a parada que queria: a unidade fixada. */
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setParado(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setParado(false);
      }}
    >
      <div className="mapa-palco">
        <svg
          className="mapa-svg"
          viewBox={`0 0 ${MAPA_LARG} ${MAPA_ALT}`}
          role="img"
          aria-label={`Mapa de São Paulo com ${abertas} unidades em operação e ${previstas} previstas. Cada unidade é um botão: abra uma para ver os detalhes ao lado.`}
        >
          <path className="mapa-estado" d={CONTORNO_SP} />

          {ordemDeDesenho.map((i) => {
            const u = lista[i];
            const { x, y } = projetar(u.lat, u.lon);
            /* De que lado o rótulo sai. A pergunta é "cabe à direita?", e não "a
               cidade está na metade direita do mapa?" — que era o critério
               antigo e mandava São Paulo para a esquerda por 4 unidades de
               margem, em cima do marcador de Sorocaba, que fica na mesma
               latitude 92 a oeste. Perguntando pelo espaço, São Paulo vai para a
               direita, onde sobra mapa, e só São José dos Campos continua indo
               para a esquerda — porque o nome tem 19 letras e de fato não
               cabe. */
            const paraEsquerda = x + AFASTAMENTO + larguraRotulo(u) > MAPA_LARG - 8;
            return (
              <g
                key={u.cidade}
                className={`mapa-ponto mapa-ponto--${u.estado}`}
                data-ativo={atual === i ? "" : undefined}
                data-fixada={fixada === i ? "" : undefined}
                transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                /* O ponto É o controle agora — ver o comentário do topo. Botão
                   de verdade, mesmo desenhado em SVG: papel declarado, parada de
                   Tab, Enter e espaço, e o estado de fixada dito em voz alta. */
                role="button"
                tabIndex={0}
                aria-label={`${u.cidade}, ${situacao(u)}`}
                aria-pressed={fixada === i}
                onClick={() => escolher(i)}
                onKeyDown={(e) => {
                  /* `<g>` não é `<button>` de verdade: o navegador não converte
                     tecla em clique aqui, então as duas que ativam um botão
                     entram na mão. O `preventDefault` do espaço é o que impede a
                     página de rolar um quadro junto. */
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    escolher(i);
                  }
                }}
              >
                {/* Alvo de toque generoso e invisível: o ponto desenhado tem 5px,
                    que ninguém acerta com o dedo. */}
                <circle className="mapa-alvo" r={22} />
                <circle className="mapa-halo" r={13} />
                <circle className="mapa-pino" r={5} />

                <g
                  className="mapa-etiqueta"
                  transform={`translate(${paraEsquerda ? -AFASTAMENTO : AFASTAMENTO} 0)`}
                >
                  <text className="mapa-cidade" textAnchor={paraEsquerda ? "end" : "start"}>
                    {u.cidade}
                  </text>
                  <text
                    className="mapa-prazo"
                    y={16}
                    textAnchor={paraEsquerda ? "end" : "start"}
                  >
                    {u.estado === "aberta" ? "em operação" : `abre ${dataCurta(u.abertura ?? "")}`}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Legenda e dica ficam colados no mapa, que é o que elas explicam. Com
            a lista fora, este é também o único texto que diz como a seção se
            usa — e ela não é óbvia: ponto de mapa não parece botão. */}
        <div className="mapa-rodape">
          <ul className="mapa-legenda">
            <li>
              <span className="mapa-chave mapa-chave--aberta" aria-hidden="true" />
              {abertas} em operação
            </li>
            <li>
              <span className="mapa-chave mapa-chave--prevista" aria-hidden="true" />
              {previstas} com praça definida
            </li>
          </ul>

          <p className="mapa-dica">
            {fixada !== null
              ? "Unidade fixada — abra de novo para voltar ao ciclo."
              : "Abra uma unidade no mapa para ver os detalhes."}
          </p>
        </div>
      </div>

      <div className="mapa-lado">
        {/* O painel. `key` na cidade para o cartão reentrar a cada troca: é a
            mesma caixa, mas o conteúdo é outro, e sem o corte a foto trocaria
            embaixo de um texto parado. */}
        <figure className="uni" key={unidade.cidade} data-estado={unidade.estado}>
          <div className="uni-foto">
            <Image
              src={unidade.foto ?? (unidade.estado === "aberta" ? quiosqueOperando : quiosqueModelo)}
              alt=""
              fill
              sizes="(max-width: 900px) 92vw, 420px"
              /* `contain` quando é o modelo do quiosque: aquela imagem é a peça
                 recortada, e cortada em `cover` viraria um pedaço de vitrine sem
                 pé nem cabeça. Foto de loja de verdade continua em `cover`. */
              className={!unidade.foto && unidade.estado === "prevista" ? "uni-img uni-img--inteira" : "uni-img"}
            />

            <span className="uni-selo">
              {unidade.estado === "aberta" ? "Em operação" : "Praça definida"}
            </span>

            {/* A faixa da contagem. Ela existe no servidor com a DATA dentro, e o
                relógio só substitui o texto depois que o componente monta — a
                caixa é a mesma, então nada salta quando a troca acontece. */}
            {unidade.estado === "prevista" ? (
              <p className="uni-faixa">
                <span className="uni-faixa-rotulo">Abre em</span>
                {restante ? (
                  <span className="uni-relogio">
                    <b>{restante.d}</b>d <b>{pad(restante.h)}</b>h{" "}
                    <b>{pad(restante.m)}</b>m <b>{pad(restante.s)}</b>s
                  </span>
                ) : (
                  <span className="uni-relogio">
                    <b>{dataCurta(unidade.abertura ?? "")}</b>
                  </span>
                )}
              </p>
            ) : null}
          </div>

          <figcaption className="uni-info">
            <h3 className="uni-cidade">{unidade.cidade}</h3>
            <p className="uni-situacao">{situacao(unidade)}</p>
            {unidade.ponto ? <p className="uni-ponto">{unidade.ponto}</p> : null}
            {unidade.nota ? <p className="uni-nota">{unidade.nota}</p> : null}
          </figcaption>
        </figure>

      </div>
    </div>
  );
}
