"use client";

/* As quatro frentes que a mesma IA opera — agora um stepper que roda sozinho.

   ───────────────────────────────────────────────────────────────────────────
   POR QUE DEIXOU DE SER QUATRO COLUNAS EM LINHA

   A versão anterior punha as quatro lado a lado, penduradas numa régua. Isso
   resolvia o problema de LISTA VERTICAL (que lê como passos em sequência), mas
   criava outro: quatro blocos de texto do mesmo peso, ao mesmo tempo, na mesma
   tela. Ninguém lê os quatro. A pessoa bate o olho, reconhece "tem quatro
   coisas" e rola.

   Um de cada vez força o olho a pousar. E, principalmente, abre espaço para
   MOSTRAR a frente acontecendo em vez de só nomeá-la: o vídeo à esquerda é o
   que a versão em colunas não tinha onde caber.

   ───────────────────────────────────────────────────────────────────────────
   A RÉGUA VIROU QUATRO SEGMENTOS QUE ENCHEM

   A régua contínua dizia "um sistema só". Os quatro segmentos dizem a mesma
   coisa — continuam sendo uma linha atravessando o topo — e ainda carregam duas
   informações que a régua não dava: onde a pessoa está e quanto falta para
   trocar. O preenchimento é a barra de tempo; segmento cheio à esquerda é
   passado, vazio à direita é o que vem.

   Simultaneidade não se perde porque nada aqui diz "depois". Os rótulos são
   lugares (no totem, nas vendas online, no CRM, no estoque), não etapas — e o
   ciclo volta ao 01 sem fim, que é o oposto de um fluxo com começo e término.

   ───────────────────────────────────────────────────────────────────────────
   O RELÓGIO É rAF, NÃO ANIMAÇÃO DE CSS

   `animation` no segmento ativo seria mais curto de escrever, mas o React
   precisa saber a hora de trocar de frente — e aí seriam DOIS relógios (o do
   CSS e um `setTimeout`) medindo a mesma coisa, que dessincronizam sempre. Um
   laço de `requestAnimationFrame` acumulando tempo é um relógio só: ele pinta o
   preenchimento escrevendo `--p` direto no DOM (sem re-render por quadro, como
   os marcos da carta do herói) e é o mesmo laço que dispara a troca.

   Pausa quando a seção sai da tela, quando a aba vai para o fundo e quando o
   ponteiro ou o foco está no quadro. Este último não é economia de bateria: é a
   válvula de escape exigida por qualquer coisa que troca de conteúdo sozinha —
   ninguém deve perder o texto no meio da leitura porque um cronômetro venceu.

   ───────────────────────────────────────────────────────────────────────────
   O QUE VEM DEPOIS DA QUARTA: O FECHO

   As quatro frentes dizem o que a IA FAZ. Nenhuma delas diz o que sai disso —
   e é essa a pergunta que decide a franquia na cabeça de quem está avaliando:
   "gravar o quê, exatamente?".

   Por isso o ciclo não volta direto da 04 para a 01. Ele passa por um quinto
   quadro que não é uma frente: a mesa inteira, com as peças de verdade e as
   gravações de verdade — o Arthur, a Mariana, "Mãe te amo para sempre", o
   cachorro da Luna, a data de casamento. É a resposta em uma imagem só.

   ELE NÃO É UMA ABA, e essa distinção é o desenho todo. As quatro abas são
   lugares onde a IA opera; o fecho é o resultado. Virar uma quinta aba faria
   duas coisas erradas de uma vez: contradiria a manchete ("as quatro frentes")
   e poria o produto no mesmo nível dos processos que o produzem. Então o
   `tablist` continua com quatro botões e a 04 continua selecionada enquanto o
   fecho está em cena — o que muda é só o conteúdo do painel. */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IcoTotem, IcoOnline, IcoCrm, IcoEstoque } from "./icons";
import { Ph } from "./ph";
/* A foto do FECHO — ver o bloco "O QUE VEM DEPOIS DA QUARTA" logo abaixo.

   JPEG e não PNG: é fotografia de cena, com fundo próprio, e não peça
   recortada precisando de canal alfa. Em PNG o mesmo arquivo pesava 3 MB
   contra 165 KB aqui, para representar exatamente a mesma imagem. */
import mesa from "./produtos/mesa-completa.jpg";

/* Quanto cada frente fica na tela. Medido pelo texto mais longo (o do CRM, 96
   caracteres): ~4s de leitura mais um respiro para o vídeo terminar de dizer o
   que tem a dizer antes de sair. */
const DURACAO = 6500;

/* O fecho fica MAIS TEMPO, e a razão é a densidade da imagem: as quatro frentes
   mostram um clipe com um assunto cada, lido de relance; a mesa tem trinta e
   poucos objetos e umas vinte gravações diferentes — nomes, datas, frases,
   desenhos. Ninguém varre isso em 6,5 s. */
const DURACAO_FECHO = 9000;

type Frente = {
  id: string;
  rotulo: string;
  titulo: string;
  /* O que ela de fato faz. A lista antiga parava no título e o visitante ficava
     com quatro nomes sem verbo. */
  faz: string;
  /* O clipe da frente. Quando falta, entra o placeholder — é assim que a seção
     continua legível enquanto os quatro vídeos não chegam, em vez de mostrar um
     retângulo preto de `<video>` sem fonte. Mudo e em laço: som aqui competiria
     com a cena logo acima, e um clipe de 6s que termina e congela desmonta a
     leitura de "isto está acontecendo agora". */
  video?: string;
  Icone: (p: { className?: string }) => React.ReactElement;
};

const FRENTES: Frente[] = [
  {
    id: "totem",
    rotulo: "No totem",
    titulo: "Atende e desenha",
    faz: "Conversa com o cliente, entende o pedido e gera a arte pronta para gravar.",
    /* PROVISÓRIO: reaproveitado da cena acima só para o slot não nascer vazio.
       Trocar pelo clipe próprio da frente quando ele existir. */
    video: "/cena/totem.mp4",
    Icone: IcoTotem,
  },
  {
    id: "online",
    rotulo: "Nas vendas online",
    titulo: "Vende fora do ponto",
    faz: "A mesma arte vai para o catálogo da unidade e continua vendendo depois que a loja fecha.",
    Icone: IcoOnline,
  },
  {
    id: "crm",
    rotulo: "No CRM da matriz",
    titulo: "Reporta em tempo real",
    faz: "Cada venda chega à franqueadora no instante em que acontece, sem ninguém preencher planilha.",
    Icone: IcoCrm,
  },
  {
    id: "estoque",
    rotulo: "No estoque",
    titulo: "Pede a reposição",
    faz: "Acompanha o consumo de cada insumo e dispara o pedido antes de faltar.",
    Icone: IcoEstoque,
  },
];

export function Frentes() {
  /* `passo` vai de 0 a FRENTES.length: os índices das frentes, mais UM no fim
     que é o fecho. `ativo` é a aba SELECIONADA, derivada dele — no fecho ela
     continua sendo a última.

     A separação é o que mantém o resto do componente sem saber que o fecho
     existe: o `tablist`, o `aria-selected`, o teclado e a pintura dos
     segmentos leem `ativo` e continuam vendo quatro frentes. */
  const [passo, setPasso] = useState(0);
  const noFecho = passo === FRENTES.length;
  /* A ABA marcada. No fecho continua sendo a última: ele não é aba, e deixar o
     `tablist` sem nenhuma selecionada seria pior que mantê-la. */
  const ativo = noFecho ? FRENTES.length - 1 : passo;
  /* O SLOT DE MÍDIA visível, que NÃO é a mesma coisa que a aba marcada.

     Durante o fecho nenhuma frente está em cena — quem ocupa a caixa é a foto.
     Sem esta separação, o slot da quarta frente ficava com `data-ativo` (por
     ler `ativo`) ao mesmo tempo que o fecho, e como o clipe e o placeholder
     são opacos a foto ficava embaixo, invisível. */
  const slotAtivo = noFecho ? -1 : passo;

  const quadroRef = useRef<HTMLDivElement>(null);
  /* Os elementos que recebem o `--p`. Um por segmento; escritos a cada quadro,
     nunca por estado. */
  const trilhas = useRef<(HTMLSpanElement | null)[]>([]);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  /* Os três motivos de pausa somados. Ref e não estado: mudar isto não deve
     re-renderizar nada — o laço lê o valor no quadro seguinte e pronto. */
  const parado = useRef({ fora: false, oculta: false, lendo: false });
  /* Só o teclado avança quadro a quadro; o clique reinicia o ciclo do zero. É a
     mesma função nos dois casos, então a diferença mora aqui. */
  const decorrido = useRef(0);

  /* Clique e teclado escolhem uma FRENTE, nunca o fecho: ele não é aba e não
     tem controle próprio — chega no fim do ciclo, como conclusão. */
  const ir = useCallback((i: number) => {
    decorrido.current = 0;
    setPasso(((i % FRENTES.length) + FRENTES.length) % FRENTES.length);
  }, []);

  /* ---- o relógio ---- */
  useEffect(() => {
    const quadro = quadroRef.current;
    if (!quadro) return;

    /* Sem movimento: os segmentos viram só indicadores de posição e a troca
       passa a ser exclusivamente por clique ou teclado. Trocar o conteúdo
       principal sozinho é justamente o que `reduce` pede para não acontecer. */
    const mm = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* Durante o fecho os quatro segmentos ficam CHEIOS: as quatro frentes já
       passaram, e é isso que a régua conta. Um quinto segmento enchendo diria
       que existe uma quinta frente; a régua parada no meio diria que o relógio
       travou. */
    const pintar = (p: number) => {
      trilhas.current.forEach((el, i) => {
        if (!el) return;
        const v = noFecho ? "1" : i < ativo ? "1" : i > ativo ? "0" : p.toFixed(4);
        el.style.setProperty("--p", v);
      });
    };

    const duracao = noFecho ? DURACAO_FECHO : DURACAO;

    if (mm.matches) {
      pintar(1);
      return;
    }

    let id = 0;
    let anterior = 0;

    const passo = (agora: number) => {
      id = requestAnimationFrame(passo);
      const dt = anterior ? agora - anterior : 0;
      anterior = agora;

      const p = parado.current;
      if (p.fora || p.oculta || p.lendo) return;

      decorrido.current += dt;
      if (decorrido.current >= duracao) {
        /* Não chama `ir`: o clique reinicia, o ciclo só continua. Zerar aqui e
           deixar o `setPasso` remontar o efeito dá o mesmo resultado com uma
           volta a menos.

           O módulo é sobre `FRENTES.length + 1`: depois da quarta frente vem o
           fecho, e só depois dele o ciclo volta à primeira. */
        decorrido.current = 0;
        setPasso((a) => (a + 1) % (FRENTES.length + 1));
        return;
      }
      pintar(decorrido.current / duracao);
    };

    pintar(decorrido.current / duracao);
    id = requestAnimationFrame(passo);

    /* A seção fora da tela não gasta quadro — e, mais importante, não consome o
       ciclo pelas costas: quem rola de volta encontra a frente onde deixou, não
       a terceira volta do carrossel. */
    const io = new IntersectionObserver(
      ([e]) => {
        parado.current.fora = !e.isIntersecting;
      },
      { threshold: 0.25 },
    );
    io.observe(quadro);

    const aoVisibilidade = () => {
      parado.current.oculta = document.hidden;
    };
    document.addEventListener("visibilitychange", aoVisibilidade);
    aoVisibilidade();

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      document.removeEventListener("visibilitychange", aoVisibilidade);
    };
  }, [ativo, noFecho]);

  /* ---- o vídeo ----

     Todos ficam montados e se revezam por opacidade (corte seco entre dois
     `<video>` remontados piscaria o fundo do quadro). `preload="none"` deixa a
     rede quieta até a frente virar ativa; o `play()` é quem manda buscar. */
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      /* No fecho NENHUM toca. Sem esta condição o clipe da quarta frente
         continuaria rodando por trás da foto — invisível, decodificando quadro
         a cada volta do ciclo, sem ninguém para ver. */
      if (i === slotAtivo) {
        v.currentTime = 0;
        /* `play()` rejeita quando a aba está no fundo ou a política de
           autoplay muda de ideia. Não é erro que mereça console. */
        void v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [slotAtivo]);

  /* ---- teclado ----

     Padrão de abas: setas andam, Home/End vão às pontas, e o foco acompanha a
     seleção (`tabIndex` móvel) — sem isso a tabulação passaria pelos quatro
     botões antes de chegar ao conteúdo. */
  const aoTeclado = (e: React.KeyboardEvent) => {
    const salto =
      e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    let destino = -1;
    if (salto) destino = ativo + salto;
    else if (e.key === "Home") destino = 0;
    else if (e.key === "End") destino = FRENTES.length - 1;
    if (destino < 0 && !salto) return;
    e.preventDefault();
    const i = ((destino % FRENTES.length) + FRENTES.length) % FRENTES.length;
    ir(i);
    abas.current[i]?.focus();
  };

  const f = FRENTES[ativo];

  return (
    <div className="fre">
      {/* A IA em evidência: ela é o sujeito, e as quatro frentes são o que ela
          alcança. Sem este bloco, o stepper abaixo começaria do nada.

          É `.sec-cab`, como os outros doze cabeçalhos: o mesmo desenho, e mudar
          o padrão muda aqui junto. Vira um `<h2>` de verdade no processo — a
          seção `#ia` não tinha nenhum, de propósito, mas este bloco vem DEPOIS
          da cena, quando ela já provou o que tinha para provar. */}
      <div className="sec-cab fre-fonte">
        <h2>
          O nosso maior diferencial: <mark>a IA</mark>
        </h2>
        <p>
          A mesma inteligência opera as <strong>quatro frentes</strong> da
          unidade — ao mesmo tempo, o dia inteiro, sem ninguém no meio.
        </p>
      </div>

      <div
        className="fre-quadro"
        ref={quadroRef}
        /* Ponteiro em cima ou foco dentro = alguém lendo. O ciclo espera. */
        onPointerEnter={() => {
          parado.current.lendo = true;
        }}
        onPointerLeave={() => {
          parado.current.lendo = false;
        }}
        onFocusCapture={() => {
          parado.current.lendo = true;
        }}
        onBlurCapture={() => {
          parado.current.lendo = false;
        }}
      >
        {/* A linha do topo. `aria-label` porque uma lista de quatro botões sem
            nome não diz do que ela é a navegação. */}
        <div
          className="fre-passos"
          role="tablist"
          aria-label="Frentes que a IA opera"
          aria-orientation="horizontal"
          onKeyDown={aoTeclado}
        >
          {FRENTES.map((item, i) => (
            <button
              type="button"
              key={item.id}
              ref={(el) => {
                abas.current[i] = el;
              }}
              className="fre-passo"
              role="tab"
              id={`fre-aba-${item.id}`}
              aria-selected={i === ativo}
              aria-controls="fre-painel"
              tabIndex={i === ativo ? 0 : -1}
              data-ativo={i === ativo || undefined}
              onClick={() => ir(i)}
            >
              {/* A trilha e o preenchimento. Decorativos: o estado real quem
                  anuncia é o `aria-selected` do botão. */}
              <span className="fre-trilha" aria-hidden="true">
                <span
                  className="fre-enche"
                  ref={(el) => {
                    trilhas.current[i] = el;
                  }}
                />
              </span>
              <span className="fre-num mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="fre-rot">{item.rotulo}</span>
            </button>
          ))}
        </div>

        <div className="fre-corpo">
          {/* Vídeo à esquerda. Os quatro empilhados na mesma caixa; só o ativo
              aparece e só ele roda. */}
          <div className="fre-midia">
            {FRENTES.map((item, i) =>
              item.video ? (
                <video
                  key={item.id}
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  className="fre-slot"
                  data-ativo={i === slotAtivo || undefined}
                  src={item.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                />
              ) : (
                <div
                  key={item.id}
                  className="fre-slot"
                  data-ativo={i === slotAtivo || undefined}
                  aria-hidden={i !== slotAtivo}
                >
                  <Ph ratio="16 / 10" label={`Vídeo — ${item.rotulo}`} />
                </div>
              ),
            )}

            {/* O FECHO ocupa o mesmo slot dos clipes e se revela por opacidade,
                como eles. É o que faz a mesa parecer o último quadro da mesma
                sequência, e não um bloco novo aparecendo embaixo.

                `data-ativo` no slot em vez de `hidden`: a transição de
                opacidade precisa dos dois estados no DOM. */}
            <div className="fre-slot fre-fecho" data-ativo={noFecho || undefined}>
              <Image
                src={mesa}
                alt=""
                /* `eager` porque o slot inativo vive em `opacity: 0`, e o
                   Chrome não dispara carregamento adiado dentro de subárvore
                   transparente — a foto chegaria branca na primeira volta.
                   `low` porque ela só aparece depois de ~26 s de ciclo: tem
                   toda a folga do mundo para carregar. */
                loading="eager"
                fetchPriority="low"
                sizes="(max-width: 900px) 92vw, 55vw"
              />
            </div>
          </div>

          {/* Texto à direita. `key` no painel remonta o bloco a cada troca, que
              é o que re-dispara a animação de entrada — sem isso o texto trocava
              no lugar, sem transição nenhuma. A `key` muda para "fecho" no
              último quadro, então ele entra com a mesma animação das frentes. */}
          <div
            className="fre-texto"
            id="fre-painel"
            role="tabpanel"
            aria-labelledby={`fre-aba-${f.id}`}
            key={noFecho ? "fecho" : f.id}
          >
            {noFecho ? (
              <>
                {/* SEM ÍCONE e sem o rótulo mono de lugar. Os dois marcam "esta
                    é a frente tal"; aqui não há frente nenhuma — há o resultado
                    das quatro. Repetir o desenho de uma aba faria o fecho ler
                    como a quinta, que é justamente o que ele não é. */}
                <h3 className="fre-tit">É isto que sai da máquina</h3>
                <p className="fre-faz">
                  Nome, data, frase, desenho — cada peça sai diferente da
                  anterior. É o mesmo equipamento e o mesmo insumo; o que muda é
                  a arte, e é a IA que a resolve em segundos.
                </p>
              </>
            ) : (
              <>
                <span className="fre-ico" aria-hidden="true">
                  <f.Icone />
                </span>
                <span className="fre-onde mono">{f.rotulo}</span>
                <h3 className="fre-tit">{f.titulo}</h3>
                <p className="fre-faz">{f.faz}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
