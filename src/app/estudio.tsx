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
   — baixar antes de precisar. Buscar quadro em vídeo que ainda não chegou não
     desenha nada, então os elementos nascem com `preload="none"` e o download
     começa quando a seção está a duas telas de distância. O áudio foi removido
     dos ARQUIVOS, e não apenas silenciado no elemento: vídeo movido por rolagem
     não toca áudio em sentido nenhum, e a faixa só ocupava banda.

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

/* A conversa por TURNOS, e não por mensagem. Falas seguidas da mesma parte ficam
   juntas sob uma marca só — é assim que uma conversa de verdade se lê, e é a
   diferença entre parecer alguém falando e parecer log de sistema.

   A última fala da IA ganha o cursor piscando: ela está gerando enquanto o feixe
   entra, e é esse detalhe que faz a cena parecer ao vivo em vez de encenada. */
const TURNOS: { de: "cliente" | "ia"; textos: string[] }[] = [
  { de: "ia", textos: ["Oi! O que você quer gravar hoje?"] },
  { de: "cliente", textos: [PEDIDO] },
  {
    de: "ia",
    textos: [
      "Metal, cerâmica, lona, plástico — grava em tudo isso.",
      "Eu fecho o traço e ajusto na área de cada peça. Você não precisa saber nada disso.",
      "Gerando",
    ],
  },
];

/* Os dois arquivos são re-encodados ALL-INTRA (todo quadro é keyframe) e já vêm
   cortados no trecho útil, então a rolagem cobre 100% de cada um.

   O all-intra é o que faz a cena ser fluida, e não é detalhe: vídeo de IA sai
   com keyframe a cada 1 ou 2 segundos, e pedir `currentTime` entre keyframes
   obriga o decodificador a voltar ao anterior e decodificar tudo de novo. A
   60Hz de rolagem ele não dá conta e descarta quase toda busca — o sintoma é
   exatamente "travando em blocos". Com todo quadro sendo keyframe a busca é
   direta. Custa arquivo maior: são ~12MB nos dois, na resolução nativa de
   1920px. Reduzir para 1280px derrubava para 3,7MB, mas aí o navegador ampliava
   em janela larga — e ampliar era exatamente o que fazia a cena parecer de
   qualidade menor que a do arquivo. O peso é pago por carregamento tardio, não
   por resolução.

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
          /* A sangria é medida no próprio elemento, sem a classe: a distância da
             borda esquerda dele até a borda da janela é exatamente o que falta
             de cada lado. Medir o pai erra — o `<section>` tem respiro interno, e
             a conta saía 32px curta, deixando faixa preta na lateral.

             E é medida, nunca `50vw`: `100vw` inclui a barra de rolagem. */
          const sangrar = () => {
            no.classList.remove("est-vivo");
            const folga = no.getBoundingClientRect().left;
            no.classList.add("est-vivo");
            no.style.setProperty("--est-sangria", `${Math.max(0, folga)}px`);
          };
          sangrar();

          const vTotem = um<HTMLVideoElement>(".est-vid--totem");
          const vPecas = um<HTMLVideoElement>(".est-vid--pecas");
          const ui = um(".est-ui");

          /* CARREGAMENTO TARDIO, e não `preload="auto"` no marcado.

             Os dois arquivos somam ~12MB: estão na resolução nativa de 1920px
             porque abaixo disso o navegador amplia, e ampliar era o que fazia a
             cena parecer de qualidade menor que a do arquivo.

             Esse peso não pode competir com o herói. Com `preload="auto"` no
             HTML, o download começa no carregamento da página e rouba banda de
             tudo que a primeira tela precisa. Aqui ele só começa quando a seção
             está a duas telas de distância — o suficiente para chegar antes de
             alguém rolar até ela, e tarde o bastante para não atrapalhar nada.

             Buscar quadro em vídeo sem dados não desenha nada, então o gatilho é
             deliberadamente folgado: melhor baixar cedo demais que a cena abrir
             em preto. */
          const puxar = ScrollTrigger.create({
            trigger: no,
            start: "top bottom+=200%",
            once: true,
            onEnter: () => {
              vTotem.preload = "auto";
              vPecas.preload = "auto";
              vTotem.load();
              vPecas.load();
            },
          });

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

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: no,
              pin: um(".est-palco"),
              start: "top top",
              /* SENSIBILIDADE. Era 5600 — quase seis telas de rolagem para seis
                 batidas, e cada gesto de trackpad mexia pouco na cena. 3400 dá
                 pouco mais de meia tela por batida: a cena responde ao gesto em
                 vez de arrastar atrás dele. */
              end: "+=3400",
              /* Suavização quase nula: valor alto faz o vídeo continuar buscando
                 depois que a pessoa parou de rolar, e buscar sem rolagem lê como
                 atraso, não como suavidade. Com todo quadro sendo keyframe a
                 busca é barata, então não é preciso amortecer para dar conta. */
              scrub: 0.18,
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
          const batida = (nome: string, i: number, folga = 0.3) =>
            tl.addLabel(nome, i === 0 ? 0 : `>+=${folga}`);

          /* 1 — o totem chega. A rolagem é a cabeça de leitura do vídeo. */
          const chTotem = cabeca(vTotem);
          batida("chegada", 0);
          tl.to(chTotem.alvo, { ...chTotem.fim, duration: 3 }, "chegada");

          /* 2 — a tela acesa. Só um rótulo: quem entrega esta batida é o próprio
             vídeo, e o que ela faz na linha do tempo é reservar o tempo de
             rolagem em que o azul inunda a tela. */
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

          /* A classe `est-vivo` sangra a seção para a largura da tela, e isso
             muda a altura do documento. O ScrollTrigger já mediu antes disso —
             ele não observa mudanças de layout que ele próprio não causou — e
             fica com início e fim errados. O sintoma é cruel de diagnosticar:
             tudo carrega, o espaçador tem a altura certa, a rolagem funciona, e
             mesmo assim o pin nunca engata e a cena não sai do primeiro quadro.

             Uma remedição depois de tudo montado resolve. Vale também para os
             vídeos: `loadedmetadata` pode mudar caixa no estado sem palco. */
          ScrollTrigger.refresh();

          const remedir = () => {
            sangrar();
            ScrollTrigger.refresh();
          };
          vTotem.addEventListener("loadedmetadata", remedir);
          vPecas.addEventListener("loadedmetadata", remedir);
          /* A sangria depende da largura da janela; sem isto ela fica errada
             depois de redimensionar. O `refresh` do ScrollTrigger já vem junto. */
          window.addEventListener("resize", remedir);

          return () => {
            vTotem.removeEventListener("loadedmetadata", remedir);
            vPecas.removeEventListener("loadedmetadata", remedir);
            window.removeEventListener("resize", remedir);
            puxar.kill();
            no.style.removeProperty("--est-sangria");
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
            preload="none"
            aria-hidden="true"
          />
          <video
            className="est-vid est-vid--pecas"
            src="/cena/pecas.mp4"
            muted
            playsInline
            preload="none"
            aria-hidden="true"
          />

          {/* A conversa, sobre a tela que o vídeo deixou preta.

              AGRUPADA POR TURNO, e não uma linha por vez. Falas seguidas da IA
              ficam sob UMA marca só — repetir o avatar em cada parágrafo é o que
              faz uma conversa parecer log de sistema em vez de alguém falando. */}
          <div className="est-ui">
            <div className="est-conversa">
              {TURNOS.map((t, i) => (
                <div key={i} className={`est-turno est-turno--${t.de}`}>
                  {t.de === "ia" && (
                    <span className="est-marca" aria-hidden="true">
                      <Marca />
                    </span>
                  )}
                  <div className="est-falas">
                    {t.textos.map((texto, j) => {
                      /* A última fala do último turno é a que está acontecendo:
                         ela ganha os pontos pulsando. */
                      const gerando =
                        t.de === "ia" &&
                        i === TURNOS.length - 1 &&
                        j === t.textos.length - 1;
                      return (
                        <p key={j} className="est-fala">
                          {texto}
                          {gerando && (
                            <span className="est-pontos" aria-hidden="true">
                              <i />
                              <i />
                              <i />
                            </span>
                          )}
                        </p>
                      );
                    })}
                  </div>
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

      </div>
    </div>
  );
}
