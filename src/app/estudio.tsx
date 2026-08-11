"use client";

/* A cena do totem — dois vídeos com o console da IA vivo no meio.

   ───────────────────────────────────────────────────────────────────────────
   A DIVISÃO, E POR QUE ELA É ASSIM

   1. VÍDEO   o totem se aproximando no vazio, a tela inundando de azul
   2. DOM     o console: saudação, campo de escrita e atalhos
   3. DOM     o ponteiro chega, clica, o campo é digitado em zoom
   4. DOM     a IA raciocina em passos e responde
   5. DOM     o feixe de laser e o estouro
   6. VÍDEO   as peças chegando e flutuando em gravidade zero

   O meio é DOM e não vídeo por um motivo que não é estético: é texto. Texto em
   vídeo é pixel — não é lido por leitor de tela, não é indexado, não acompanha o
   tema, e mudar uma vírgula da copy exigiria refazer o vídeo. Aqui a conversa é
   marcação, e trocar a fala do cliente é editar uma linha deste arquivo.

   Foi também o que resolveu o problema da marca: nenhum dos dois vídeos precisa
   conter logo ou letra, então não existe risco de a marca tremer entre quadros.
   O vídeo 1 termina com a tela preta e é o DOM que desenha nela.

   ───────────────────────────────────────────────────────────────────────────
   POR QUE UM CONSOLE, E NÃO SÓ UM CHAT

   A versão anterior abria já com a conversa pronta na tela: três turnos
   aparecendo um atrás do outro. Ela contava que houve uma conversa; não mostrava
   ninguém conversando. E o argumento da seção inteira é justamente que operar a
   unidade é escrever o que se quer — quem nunca viu isso acontecer não acredita
   só porque a página afirma.

   Agora a cena mostra o ato: o campo vazio esperando, o ponteiro indo até ele, o
   clique, o texto sendo escrito letra por letra em zoom, e só então a máquina
   raciocinando em passos visíveis. O zoom existe para isso — é a única parte da
   cena em que a informação está em algo pequeno (o que foi digitado), e cena
   inteira parada com texto de 15px no meio não se lê a três metros de um totem
   nem numa tela de notebook rolando rápido.

   FIDELIDADE DE FORMA, NÃO DE MARCA. O desenho segue o formato que virou padrão
   nos consoles de IA — saudação centrada com o símbolo, campo arredondado com
   dica em cinza, barra de ações embaixo, atalhos em pílula logo abaixo. O que
   NÃO se copia é identidade alheia: o símbolo é o hexágono da GRAVA.AI, a
   etiqueta de modelo diz o nome desta rede, e nenhum nome ou marca de outra
   empresa aparece na tela. Interface de produto imitando a marca de terceiro
   num site comercial é outra coisa, e não é o que esta cena precisa.

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

   O HTML do servidor é uma composição legível: os pôsteres dos vídeos, o console
   com o pedido JÁ ESCRITO no campo, a resposta inteira e o catálogo, em fluxo
   normal. `est-vivo` só entra quando a animação vai mesmo rodar.

   Que o campo venha preenchido do servidor não é detalhe: é o JavaScript que o
   esvazia para depois digitá-lo. Ao contrário, sem script sobraria um campo em
   branco e uma resposta a um pedido que ninguém fez. */

import { useEffect, useRef } from "react";
import "./estudio.css";

/* A fala do cliente. Aberta de propósito: "me mostre o que você pode fazer" é o
   que justifica o catálogo INTEIRO chegando no fim. Um pedido específico ("arte
   de abelha num copo") entregaria um copo — e aí as outras cinco peças voando
   seriam enfeite sem resposta. A pergunta tem que ser do tamanho da resposta. */
const PEDIDO = "me mostre o que você pode fazer";

/* Os atalhos embaixo do campo. São os quatro materiais que a rede grava, em
   pílula — a mesma função que os atalhos de um console de IA têm: dizer, sem
   texto de ajuda, o que dá para pedir ali. */
const ATALHOS = ["Copo térmico", "Placa de metal", "Chaveiro", "Lona"];

/* O raciocínio visível. Quatro passos, e cada um é uma coisa que a máquina
   realmente faz entre o pedido e a peça — não é enfeite de "processando".

   O último não fecha: ele fica girando enquanto o feixe entra. É esse detalhe
   que faz a cena parecer ao vivo em vez de encenada. */
const PASSOS = [
  "Lendo o pedido",
  "Escolhendo o material",
  "Fechando o traço em vetor",
  "Ajustando à área da peça",
];

/* A resposta, depois do raciocínio. Duas falas curtas: o que ela grava, e de
   quem é o trabalho. A terceira é o estado — está gerando enquanto o laser
   entra. */
const RESPOSTA = [
  "Metal, cerâmica, lona, plástico — grava em tudo isso.",
  "Eu fecho o traço e ajusto na área de cada peça. Você não precisa saber nada disso.",
  "Gerando",
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

/* Os ícones da barra do campo. Traço de 1,6 como o resto dos ícones do site, e
   desenhados aqui em vez de virem de um pacote: são quatro caminhos. */
function IcoMais() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 5.5v13M5.5 12h13" strokeLinecap="round" />
    </svg>
  );
}

function IcoMic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" strokeLinecap="round" />
    </svg>
  );
}

/* A onda de voz. Cinco barras de alturas diferentes — a mesma figura que todo
   console usa para "falar em vez de escrever". */
function IcoOnda() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 10v4M8 6.5v11M12 3.5v17M16 6.5v11M20 10v4" strokeLinecap="round" />
    </svg>
  );
}

function IcoCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M5 12.5 10 17.5 19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* O ponteiro. Desenhado, e não o cursor do sistema: o cursor de verdade está na
   mão de quem rola a página, e o da cena precisa estar onde a cena mandar. */
function IcoPonteiro() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 2.5 18.5 11.2 12.4 12.2 15.6 19.4 13 20.6 9.8 13.4 5 17.6Z"
        fill="#f4fbff"
        stroke="rgba(6,12,18,0.55)"
        strokeWidth="1.1"
        strokeLinejoin="round"
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
          const consola = um(".est-console");
          const digitado = um(".est-digitado");

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

          /* Estado zero da cena. O campo é ESVAZIADO aqui: o servidor manda o
             pedido escrito nele para o estado sem script fazer sentido, e é este
             `textContent = ""` que devolve a folha em branco para a digitação
             acontecer. */
          gsap.set(ui, { autoAlpha: 0 });
          gsap.set(consola, { scale: 1, transformOrigin: "50% 62%" });
          gsap.set(q(".est-saudacao, .est-composer, .est-atalhos"), { autoAlpha: 0, y: 16 });
          gsap.set(q(".est-cursor, .est-clique"), { autoAlpha: 0 });
          gsap.set(q(".est-caret"), { autoAlpha: 0 });
          gsap.set(q(".est-thread"), { autoAlpha: 0 });
          gsap.set(q(".est-turno"), { autoAlpha: 0, y: 18 });
          /* Só as falas da IA nascem escondidas. A do cliente entra junto com o
             turno dela, no envio — ela É o envio. Esconder as duas e revelar
             `.est-fala` de uma vez mostraria a resposta antes do raciocínio. */
          gsap.set(q(".est-turno--ia .est-fala"), { autoAlpha: 0, y: 14 });
          gsap.set(q(".est-passo"), { autoAlpha: 0, y: 10 });
          gsap.set(q(".est-ok"), { autoAlpha: 0 });
          gsap.set(q(".est-feixe"), { autoAlpha: 0 });
          gsap.set(q(".est-flash"), { autoAlpha: 0 });
          gsap.set(vPecas, { autoAlpha: 0 });
          digitado.textContent = "";

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: no,
              pin: um(".est-palco"),
              start: "top top",
              /* SENSIBILIDADE. Era 3400 para seis batidas — pouco mais de meia
                 tela por batida. A cena passou a ter dez, e manter 3400 daria
                 um terço de tela para cada: o ponteiro atravessaria a tela e o
                 texto inteiro seria digitado num gesto só de trackpad, que é
                 exatamente o que apaga a leitura de "alguém está escrevendo".
                 5200 devolve a mesma proporção de antes por batida. */
              end: "+=5200",
              /* Suavização quase nula: valor alto faz o vídeo continuar buscando
                 depois que a pessoa parou de rolar, e buscar sem rolagem lê como
                 atraso, não como suavidade. Com todo quadro sendo keyframe a
                 busca é barata, então não é preciso amortecer para dar conta. */
              scrub: 0.18,
              /* `snap` desligado: com dez batidas e a cena presa, o encaixe
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

          /* 3 — o console abre na tela que o vídeo deixou preta. Saudação, campo
             e atalhos entram escalonados, de cima para baixo: é a ordem em que
             uma interface se monta, e entrar tudo junto lê como imagem colada. */
          batida("console", 2);
          tl.to(ui, { autoAlpha: 1, duration: 0.5 }, "console")
            .to(
              q(".est-saudacao, .est-composer, .est-atalhos"),
              { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.16 },
              "console+=0.15",
            );

          /* 4 — o ponteiro atravessa e clica no campo.

             Ele mora DENTRO do campo, deslocado por `x`/`y`, e volta para a
             origem. Posicioná-lo contra a cena exigiria saber onde o campo caiu
             em cada largura de tela; assim o destino é sempre exato, e o que
             muda com a tela é só o comprimento do trajeto.

             `power2.out` porque mão que aponta chega freando: acelera na saída e
             assenta no alvo. Linear leria como objeto sendo arrastado. */
          batida("cursor", 3);
          tl.fromTo(
            q(".est-cursor"),
            { x: 300, y: 230, autoAlpha: 0 },
            { x: 0, y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
            "cursor",
          )
            .fromTo(
              q(".est-clique"),
              { scale: 0.2, autoAlpha: 0.9 },
              { scale: 1, autoAlpha: 0, duration: 0.5, ease: "power2.out" },
              "cursor+=0.95",
            )
            .to(q(".est-caret"), { autoAlpha: 1, duration: 0.2 }, "cursor+=1")
            .to(q(".est-dica"), { autoAlpha: 0, duration: 0.2 }, "cursor+=1.05");

          /* 5 — o zoom e a digitação.

             O zoom é a única forma de o que foi digitado ser legível: é texto de
             15px no meio de uma cena de tela cheia. Origem em 62% da altura, que
             é onde o campo está — ampliar pelo centro tiraria o campo do quadro.

             A escrita é um NÚMERO animado, não uma sequência de `setTimeout`:
             assim ela obedece ao `scrub` como o resto da cena. Rolar para trás
             apaga o texto letra por letra, que é o que o resto da linha do tempo
             faz com todo o resto. */
          batida("digita", 4);
          const escrita = { n: 0 };
          tl.to(consola, { scale: 1.18, duration: 0.9, ease: "power2.out" }, "digita")
            .to(q(".est-cursor"), { autoAlpha: 0, duration: 0.3 }, "digita+=0.3")
            .to(
              escrita,
              {
                n: PEDIDO.length,
                duration: 1.6,
                ease: "none",
                onUpdate: () => {
                  digitado.textContent = PEDIDO.slice(0, Math.round(escrita.n));
                },
              },
              "digita+=0.35",
            );

          /* 6 — enviado. O texto sai do campo e sobe como fala do cliente, e o
             console volta ao tamanho natural: o assunto deixou de ser o que se
             escreve e passou a ser o que a máquina faz com isso. */
          batida("envia", 5);
          tl.to(consola, { scale: 1, duration: 0.7, ease: "power2.inOut" }, "envia")
            .to(q(".est-composer-txt"), { autoAlpha: 0, duration: 0.25 }, "envia")
            .to(q(".est-saudacao, .est-atalhos"), { autoAlpha: 0, duration: 0.3 }, "envia")
            .to(q(".est-thread"), { autoAlpha: 1, duration: 0.3 }, "envia+=0.15")
            .to(
              q(".est-turno--cliente"),
              { autoAlpha: 1, y: 0, duration: 0.4 },
              "envia+=0.2",
            );

          /* 7 — o raciocínio. Os passos entram um a um e vão fechando com o
             visto; o anel de cada um apaga quando o visto chega.

             O ÚLTIMO NÃO FECHA — daí o `slice(0, -1)` nas duas listas. Ele fica
             girando enquanto o feixe entra, porque é literalmente o que está
             acontecendo: a peça ainda não existe. Fechar os quatro deixaria a
             cena esperando o laser de braços cruzados. */
          batida("pensa", 6);
          const passos = q(".est-passo");
          tl.to(q(".est-turno--ia"), { autoAlpha: 1, y: 0, duration: 0.4 }, "pensa")
            .to(passos, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.3 }, "pensa+=0.15")
            .to(
              q(".est-ok").slice(0, -1),
              { autoAlpha: 1, duration: 0.25, stagger: 0.3 },
              "pensa+=0.5",
            )
            .to(
              q(".est-anel").slice(0, -1),
              { autoAlpha: 0, duration: 0.25, stagger: 0.3 },
              "pensa+=0.5",
            );

          /* 8 — a resposta em texto. */
          batida("resposta", 7);
          tl.to(
            q(".est-turno--ia .est-fala"),
            { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.25 },
            "resposta",
          );

          /* 9 — o feixe varre e estoura em branco. */
          batida("laser", 8);
          tl.to(q(".est-feixe"), { autoAlpha: 1, duration: 0.2 }, "laser")
            .fromTo(q(".est-feixe"), { xPercent: -65 }, { xPercent: 65, duration: 1.1, ease: "none" }, "laser")
            .to(ui, { autoAlpha: 0, duration: 0.5 }, "laser+=0.7")
            .to(q(".est-flash"), { autoAlpha: 1, duration: 0.4, ease: "power3.in" }, "laser+=0.9")
            .to(q(".est-feixe"), { autoAlpha: 0, duration: 0.2 }, "laser+=1.2");

          /* 10 — as peças chegam voando, saindo do branco. A troca de vídeo
             acontece escondida atrás do estouro: é para isso que ele existe. */
          const chPecas = cabeca(vPecas);
          batida("pecas", 9);
          tl.set(vTotem, { autoAlpha: 0 }, "pecas")
            .set(vPecas, { autoAlpha: 1 }, "pecas")
            .to(q(".est-flash"), { autoAlpha: 0, duration: 0.7 }, "pecas+=0.1")
            .to(chPecas.alvo, { ...chPecas.fim, duration: 3 }, "pecas");

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
            /* Devolve o pedido ao campo. Sem isto, sair do modo animado — troca
               para movimento reduzido, desmontagem — deixaria o campo vazio, que
               é justamente o estado que o HTML do servidor evita. */
            digitado.textContent = PEDIDO;
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

          <div className="est-ui">
            <div className="est-console">
              {/* A saudação. Símbolo e frase na mesma linha, centrados — é o
                  formato que um console de IA usa para dizer "estou pronto"
                  sem escrever nada além da pergunta. */}
              <p className="est-saudacao">
                <Marca className="est-saudacao-marca" />
                <span>O que você quer gravar hoje?</span>
              </p>

              {/* O TOPO TEM ALTURA FIXA e guarda duas coisas na mesma célula: a
                  saudação, que sai, e a conversa, que entra. Sem a altura
                  reservada, a conversa crescendo empurraria o campo para baixo
                  no meio da cena — e o campo é o elemento que o zoom acabou de
                  enquadrar. Ele não pode se mexer. */}
              <div className="est-topo">
                <div className="est-thread">
                  <div className="est-turno est-turno--cliente">
                    <div className="est-falas">
                      <p className="est-fala est-fala--dita">{PEDIDO}</p>
                    </div>
                  </div>

                  <div className="est-turno est-turno--ia">
                    <span className="est-marca" aria-hidden="true">
                      <Marca />
                    </span>
                    <div className="est-falas">
                      {/* O bloco de raciocínio. Ele vem ANTES da resposta porque
                          é o que acontece antes dela — e é a parte que prova que
                          existe trabalho sendo feito, não uma frase pronta. */}
                      <div className="est-pensando">
                        <span className="est-pensando-rot">Pensando</span>
                        <ul className="est-passos">
                          {PASSOS.map((p) => (
                            <li className="est-passo" key={p}>
                              <span className="est-passo-ico" aria-hidden="true">
                                <i className="est-anel" />
                                <span className="est-ok">
                                  <IcoCheck />
                                </span>
                              </span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {RESPOSTA.map((texto, i) => {
                        /* A última fala é a que está acontecendo: ela ganha os
                           pontos pulsando. */
                        const gerando = i === RESPOSTA.length - 1;
                        return (
                          <p key={texto} className="est-fala">
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
                </div>
              </div>

              {/* O CAMPO. Não é um `<input>`: nada aqui é para ser preenchido, e
                  um campo de verdade no meio de uma cena pediria foco, teclado
                  no celular e um `<label>` para leitor de tela — três promessas
                  que a cena não cumpre. É um desenho, e por isso é `<div>`. */}
              <div className="est-composer">
                <div className="est-composer-txt">
                  <span className="est-dica">Descreva a peça e a arte…</span>
                  <span className="est-digitado">{PEDIDO}</span>
                  <span className="est-caret" aria-hidden="true" />
                </div>

                <div className="est-composer-barra" aria-hidden="true">
                  <span className="est-acao est-acao--mais">
                    <IcoMais />
                  </span>
                  <span className="est-modelo">
                    GRAVA.AI <b>Estúdio</b>
                  </span>
                  <span className="est-acao">
                    <IcoMic />
                  </span>
                  <span className="est-acao">
                    <IcoOnda />
                  </span>
                </div>

                {/* O ponteiro e o anel do clique vivem dentro do campo: o
                    destino deles é o campo, e assim ele é exato em qualquer
                    largura de tela. */}
                <span className="est-clique" aria-hidden="true" />
                <span className="est-cursor" aria-hidden="true">
                  <IcoPonteiro />
                </span>
              </div>

              <div className="est-atalhos" aria-hidden="true">
                {ATALHOS.map((a) => (
                  <span className="est-atalho" key={a}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="est-feixe" aria-hidden="true" />
          <div className="est-flash" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
