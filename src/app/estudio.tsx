"use client";

/* A cena do totem — dois vídeos com a conversa viva no meio.

   ───────────────────────────────────────────────────────────────────────────
   A DIVISÃO, E POR QUE ELA É ASSIM

   1. VÍDEO   o totem se aproximando no vazio, a tela inundando de azul
   2. DOM     a conversa, em texto de verdade
   3. DOM     o feixe de laser e o estouro
   4. VÍDEO   as peças chegando e flutuando em gravidade zero

   O meio é DOM e não vídeo por um motivo que não é estético: é texto. Texto em
   vídeo é pixel — não é lido por leitor de tela, não é indexado, não acompanha o
   tema, e mudar uma vírgula da copy exigiria refazer o vídeo. Aqui a conversa é
   marcação, e trocar a fala do cliente é editar uma linha deste arquivo.

   Foi também o que resolveu o problema da marca: nenhum dos dois vídeos precisa
   conter logo ou letra, então não existe risco de a marca tremer entre quadros.
   O vídeo 1 termina com a tela preta e é o DOM que desenha nela.

   ───────────────────────────────────────────────────────────────────────────
   COMO O VÍDEO É TOCADO

   Não é `play()`. O `currentTime` é escrito pela linha do tempo do GSAP, então a
   rolagem É a cabeça de leitura: desce e o vídeo avança, sobe e ele volta. Isso
   sai de graça no `scrub` — o mesmo mecanismo que move o resto da cena.

   Três exigências que isso impõe, todas codificadas abaixo:

   — os arquivos precisam ser ALL-INTRA. É a diferença entre fluido e travando
     em blocos, e está explicada no bloco do `FPS`.
   — buscar só quando o quadro muda. Rolagem dispara dezenas de atualizações por
     segundo; o vídeo tem 24 quadros.
   — `preload="auto"`. Buscar quadro em vídeo que ainda não baixou não desenha
     nada. O áudio foi removido dos arquivos, não apenas silenciado no elemento:
     vídeo movido por rolagem não toca áudio em sentido nenhum, e a faixa só
     ocupava banda.

   ───────────────────────────────────────────────────────────────────────────
   ANTES DO JAVASCRIPT

   O HTML do servidor é uma composição legível: os pôsteres dos vídeos, a
   conversa inteira e o catálogo, em fluxo normal. `est-vivo` só entra quando a
   animação vai mesmo rodar. Sem script, com movimento reduzido ou se o GSAP
   falhar, é isso que fica — seção correta, sem gesto. */

import { useEffect, useRef } from "react";
import "./estudio.css";

/* A fala do cliente. Aberta de propósito: "me mostre o que você pode fazer" é o
   que justifica o catálogo INTEIRO chegando no fim. Um pedido específico ("arte
   de abelha num copo") entregaria um copo — e aí as outras cinco peças voando
   seriam enfeite sem resposta. A pergunta tem que ser do tamanho da resposta. */
const PEDIDO = "me mostre o que você pode fazer";

const CONVERSA: { de: "cliente" | "ia"; texto: string }[] = [
  { de: "ia", texto: "Oi! O que você quer gravar hoje?" },
  { de: "cliente", texto: PEDIDO },
  { de: "ia", texto: "Metal, cerâmica, lona, plástico — grava em tudo isso." },
  { de: "ia", texto: "Eu fecho o traço e ajusto no tamanho da área de cada peça. Você não precisa saber nada disso." },
  { de: "ia", texto: "Gerando…" },
];

const BATIDAS = [
  { chave: "chegada", texto: "Um totem, num corredor de alto fluxo." },
  { chave: "acende", texto: "Ninguém precisa chamar um atendente." },
  { chave: "conversa", texto: "A cliente escreve o que quer. Em português, do jeito dela." },
  { chave: "gera", texto: "A IA resolve o que ela nem sabe que precisa ser resolvido." },
  { chave: "laser", texto: "A gravação acontece ali, na frente dela." },
  { chave: "pecas", texto: "E a rede vende isso o dia inteiro, em qualquer produto do catálogo." },
];

/* Os dois arquivos são re-encodados ALL-INTRA (todo quadro é keyframe) e já vêm
   cortados no trecho útil, então a rolagem cobre 100% de cada um.

   O all-intra é o que faz a cena ser fluida, e não é detalhe: vídeo de IA sai
   com keyframe a cada 1 ou 2 segundos, e pedir `currentTime` entre keyframes
   obriga o decodificador a voltar ao anterior e decodificar tudo de novo. A
   60Hz de rolagem ele não dá conta e descarta quase toda busca — o sintoma é
   exatamente "travando em blocos". Com todo quadro sendo keyframe a busca é
   direta. Custa arquivo maior por segundo; a redução para 1280px devolveu isso
   com folga (4,6MB + 9,8MB viraram 0,9MB + 2,8MB).

   A receita está no `scripts/videos.mjs`, para quando trocarem os arquivos. */
const FPS = 24;

function Marca({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 522 628" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M261 0 522 156.4 522 471.2 261 627.6 0 471.2 0 156.4Z M261 170.8 147 238.8 147 388.8 261 456.8 375 388.8 375 315.3 257 315.3 522 159.8 522 156.4 486 134.8 341 217.8Z"
      />
    </svg>
  );
}

export function Estudio() {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;

    let cancelado = false;
    let limpar: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelado) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const q = (s: string) => gsap.utils.toArray<HTMLElement>(no.querySelectorAll(s));
        const um = <T extends HTMLElement>(s: string) => no.querySelector<T>(s)!;
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          no.classList.add("est-vivo");

          const vTotem = um<HTMLVideoElement>(".est-vid--totem");
          const vPecas = um<HTMLVideoElement>(".est-vid--pecas");
          const ui = um(".est-ui");
          const leg = q(".est-legenda");

          /* Buscar quadro num vídeo sem dados não desenha nada. Pedir o download
             agora — e não no primeiro quadro da animação — é o que evita a cena
             começar em preto enquanto o arquivo chega. */
          vTotem.load();
          vPecas.load();

          /* Um objeto por vídeo em vez de tween direto no elemento: o GSAP move
             o número e o `onUpdate` escreve o `currentTime`. Escrever direto na
             propriedade faria o GSAP tentar ler o valor de volta a cada quadro,
             e o navegador devolve o quadro JÁ ENCONTRADO, não o pedido — a
             animação passaria a perseguir a própria latência de busca.

             E o `onUpdate` só busca quando o quadro MUDA. A rolagem dispara
             dezenas de atualizações por segundo, mas o vídeo tem 24 quadros: sem
             esse filtro, a maioria das buscas pede o quadro que já está na tela,
             e cada uma delas ainda assim enfileira trabalho no decodificador.
             Descartá-las é o que sobra de folga para as que importam chegarem a
             tempo. */
          const cabeca = (v: HTMLVideoElement) => {
            const p = { t: 0 };
            let ultimo = -1;
            return {
              alvo: p,
              fim: {
                t: 1,
                ease: "none" as const,
                onUpdate: () => {
                  const d = v.duration;
                  if (!Number.isFinite(d) || d <= 0) return;
                  const quadro = Math.round(p.t * d * FPS);
                  if (quadro === ultimo) return;
                  ultimo = quadro;
                  v.currentTime = Math.min(d - 1 / FPS, quadro / FPS);
                },
              },
            };
          };

          gsap.set(ui, { autoAlpha: 0 });
          gsap.set(q(".est-fala"), { autoAlpha: 0, y: 18 });
          gsap.set(q(".est-feixe"), { autoAlpha: 0 });
          gsap.set(q(".est-flash"), { autoAlpha: 0 });
          gsap.set(vPecas, { autoAlpha: 0 });
          gsap.set(q(".est-assina"), { autoAlpha: 0, y: 18 });
          gsap.set(leg, { autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: no,
              pin: um(".est-palco"),
              start: "top top",
              end: "+=5600",
              /* Suavização baixa de propósito: valor alto faz o vídeo continuar
                 buscando depois que a pessoa parou de rolar, e buscar sem
                 rolagem lê como atraso, não como suavidade. */
              scrub: 0.3,
              /* `snap` desligado: com seis batidas e a cena presa, o encaixe
                 briga com trackpad. Para ligar:
                 snap: { snapTo: "labels", duration: 0.3, delay: 0.08 } */
              invalidateOnRefresh: true,
            },
          });

          /* `">+=0.3"` e não `">+0.3"`. Sem o `=` o GSAP não reconhece o
             deslocamento relativo, o rótulo cai em posição inválida e a linha do
             tempo fica com duração quebrada — o sintoma não é rótulo fora de
             lugar, é o pin travado na página inteira e a cena congelada. Já
             aconteceu neste arquivo. */
          const batida = (nome: string, i: number, folga = 0.3) => {
            tl.addLabel(nome, i === 0 ? 0 : `>+=${folga}`);
            if (i > 0) tl.to(leg[i - 1], { autoAlpha: 0, duration: 0.22 }, nome);
            tl.to(leg[i], { autoAlpha: 1, duration: 0.28 }, `${nome}+=${i > 0 ? 0.14 : 0}`);
          };

          /* 1 — o totem chega. A rolagem é a cabeça de leitura do vídeo. */
          const chTotem = cabeca(vTotem);
          batida("chegada", 0);
          tl.to(chTotem.alvo, { ...chTotem.fim, duration: 3 }, "chegada");

          /* 2 — a tela acesa. O vídeo já entregou o azul; o que entra aqui é só
             a legenda, para a batida existir na leitura de quem não olha a tela. */
          batida("acende", 1);

          /* 3 — a conversa, sobre a tela que o vídeo deixou preta. */
          batida("conversa", 2);
          tl.to(ui, { autoAlpha: 1, duration: 0.5 }, "conversa")
            .to(q(".est-fala"), { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.28 }, "conversa+=0.2");

          /* 4 — gerando. */
          batida("gera", 3);

          /* 5 — o feixe varre e estoura em branco. */
          batida("laser", 4);
          tl.to(q(".est-feixe"), { autoAlpha: 1, duration: 0.2 }, "laser")
            .fromTo(q(".est-feixe"), { xPercent: -65 }, { xPercent: 65, duration: 1.1, ease: "none" }, "laser")
            .to(ui, { autoAlpha: 0, duration: 0.5 }, "laser+=0.7")
            .to(q(".est-flash"), { autoAlpha: 1, duration: 0.4, ease: "power3.in" }, "laser+=0.9")
            .to(q(".est-feixe"), { autoAlpha: 0, duration: 0.2 }, "laser+=1.2");

          /* 6 — as peças chegam voando, saindo do branco. A troca de vídeo
             acontece escondida atrás do estouro: é para isso que ele existe. */
          const chPecas = cabeca(vPecas);
          batida("pecas", 5);
          tl.set(vTotem, { autoAlpha: 0 }, "pecas")
            .set(vPecas, { autoAlpha: 1 }, "pecas")
            .to(q(".est-flash"), { autoAlpha: 0, duration: 0.7 }, "pecas+=0.1")
            .to(chPecas.alvo, { ...chPecas.fim, duration: 3 }, "pecas")
            .to(q(".est-assina"), { autoAlpha: 1, y: 0, duration: 0.6 }, "pecas+=1.6");

          return () => {
            no.classList.remove("est-vivo");
          };
        });

        return () => mm.revert();
      }, no);

      limpar = () => ctx.revert();
    })();

    return () => {
      cancelado = true;
      limpar?.();
    };
  }, []);

  return (
    <div className="estudio" ref={raiz}>
      <div className="est-palco">
        <div className="est-cena">
          {/* Os dois vídeos ocupam a cena inteira e se revezam. `muted` não é
              preferência: é o que deixa o navegador decodificar sem gesto do
              usuário, e vídeo movido por rolagem não tem sentido de áudio. */}
          <video
            className="est-vid est-vid--totem"
            src="/cena/totem.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <video
            className="est-vid est-vid--pecas"
            src="/cena/pecas.mp4"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          {/* A conversa, sobre a tela que o vídeo deixou preta. */}
          <div className="est-ui">
            <div className="est-conversa">
              {CONVERSA.map((f, i) => (
                <div key={i} className={`est-fala est-fala--${f.de}`}>
                  {f.de === "ia" && (
                    <span className="est-avatar" aria-hidden="true">
                      <Marca />
                    </span>
                  )}
                  <p className="est-balao">{f.texto}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="est-feixe" aria-hidden="true" />
          <div className="est-flash" aria-hidden="true" />

          <p className="est-assina">
            <Marca className="est-assina-marca" />
            <span>Uma conversa. Qualquer produto do catálogo.</span>
          </p>
        </div>

        <div className="est-legendas">
          {BATIDAS.map((b) => (
            <p className="est-legenda" key={b.chave}>
              {b.texto}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
