"use client";

/* A cena do totem — o maior diferencial da rede, mostrado funcionando.

   Substitui a seção que tinha um hexágono com quatro nós e uma lista ao lado. O
   diagrama dizia que a IA opera em quatro lugares; esta cena mostra ela operando
   em um, do começo ao fim, e isso convence mais do que quatro nomes num desenho.

   COMO A TELA CRESCE. O ponto delicado da cena é o momento em que a tela do
   totem vira a tela inteira. O caminho óbvio é dar `scale` no elemento — e é o
   caminho errado: texto ampliado por `scale` é texto rasterizado e depois
   esticado, e a interface chega borrada justamente no quadro em que ela precisa
   parecer um produto de verdade.

   Aqui a interface já nasce do tamanho do palco inteiro e fica recortada por
   `clip-path: inset(...)` na moldura do totem. Crescer é abrir o recorte até
   zero. O texto é renderizado no tamanho final desde o primeiro quadro e nunca
   passa por reamostragem: nítido no começo, nítido no fim.

   O recorte inicial e a moldura do totem saem da mesma variável de CSS
   (`--est-tela`), então não existe o bug de a interface aparecer dois pixels
   fora do vidro do totem.

   POR QUE GSAP, E NÃO O RESTO DA PÁGINA. Todo o movimento deste site é linha do
   tempo de rolagem nativa do CSS, sem biblioteca. Aqui não dava: a cena precisa
   ficar PRESA na tela enquanto a rolagem avança, e prender é a única coisa que
   `animation-timeline` não faz — `position: sticky` gruda o elemento mas não
   devolve o espaço no fim, e a emenda com a seção seguinte fica errada. O `pin`
   do ScrollTrigger cuida disso. É a primeira dependência de runtime do projeto
   e por isso ela é carregada sob demanda, já perto da seção.

   ANTES DO JAVASCRIPT. O HTML que o servidor manda é uma composição estática
   legível: totem, arte, arquivo e produtos, todos visíveis. Se o GSAP não
   carregar, se o aparelho pedir movimento reduzido ou se o script falhar, é
   isso que fica na tela — uma seção correta, sem gesto. O JavaScript não é o que
   faz a seção existir; é o que faz ela contar a história em ordem. */

import { useEffect, useRef } from "react";
import { Ph } from "./ph";
import "./estudio.css";

/* O que a cliente digita. Em português corrido, com a imprecisão de quem fala
   com uma pessoa — é esse o argumento: ninguém precisa aprender a pedir. */
const PEDIDO = "arte de abelha pra copo térmico";

/* A leitura do pedido, em três colunas. Não é log de sistema: é a IA explicando
   o que entendeu, na língua de quem está na frente do totem. A terceira linha é
   a que vende — ela mostra que a máquina sabe restrições de produção que a
   cliente não tem obrigação de saber. */
const LEITURA: { de: string; para: string }[] = [
  { de: "abelha", para: "a figura" },
  { de: "copo térmico", para: "superfície curva · área de 8 × 6 cm" },
  { de: "para gravar", para: "traço fechado, sem preenchimento" },
];

/* Uma legenda por batida. Elas são o que um visitante que não olha a tela ainda
   assim entende — e são o que sobra em movimento reduzido, todas visíveis. */
const BATIDAS: { chave: string; texto: string }[] = [
  { chave: "repouso", texto: "O totem, num corredor de alto fluxo." },
  { chave: "digita", texto: "A cliente escreve o que quer. Em português, do jeito dela." },
  { chave: "abre", texto: "Daqui em diante, quem trabalha é a IA." },
  { chave: "entende", texto: "Ela lê o pedido e separa o que importa." },
  { chave: "desenha", texto: "E desenha, já no tamanho da área de gravação." },
  { chave: "arquivo", texto: "Sai um arquivo pronto para a máquina. Sem designer, sem espera." },
  { chave: "clica", texto: "A cliente aprova." },
  { chave: "produtos", texto: "A peça sai — e a mesma arte já está no catálogo online da unidade." },
];

/* A arte que a cena gera.

   PLACEHOLDER. Isto é uma abelha de traço único, determinística, desenhada aqui
   porque a cena precisa de um clímax visual para ser avaliada. A peça definitiva
   vem do Higgsfield e entra no lugar deste `<svg>` — o slot é este componente e
   nada em volta muda.

   O desenho é de propósito só contorno, sem preenchimento: é o que a terceira
   linha da leitura promete, e arte que contradiz a própria explicação da IA
   destrói o argumento inteiro da seção. */
function ArteAbelha() {
  return (
    <svg className="est-arte-svg" viewBox="0 0 200 160" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* asas */}
        <path className="est-traco" pathLength={1} strokeWidth={2}
          d="M96 62C82 34 54 26 44 40c-9 13 8 33 34 34" />
        <path className="est-traco" pathLength={1} strokeWidth={2}
          d="M104 62c14-28 42-36 52-22 9 13-8 33-34 34" />
        {/* corpo */}
        <path className="est-traco" pathLength={1} strokeWidth={2.6}
          d="M100 58c19 0 32 14 32 33s-13 40-32 40-32-21-32-40 13-33 32-33Z" />
        {/* listras */}
        <path className="est-traco" pathLength={1} strokeWidth={2}
          d="M71 82h58" />
        <path className="est-traco" pathLength={1} strokeWidth={2}
          d="M69 100h62" />
        <path className="est-traco" pathLength={1} strokeWidth={2}
          d="M75 118h50" />
        {/* antenas */}
        <path className="est-traco" pathLength={1} strokeWidth={2}
          d="M90 56c-4-12-12-16-20-14" />
        <path className="est-traco" pathLength={1} strokeWidth={2}
          d="M110 56c4-12 12-16 20-14" />
        {/* ferrão */}
        <path className="est-traco" pathLength={1} strokeWidth={2}
          d="M100 131v13" />
      </g>
    </svg>
  );
}

export function Estudio() {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const no = raiz.current;
    if (!no) return;

    /* `cancelado` cobre a corrida entre o import assíncrono e o desmonte do
       componente: sem ele, sair da página antes do GSAP chegar deixaria um
       ScrollTrigger preso a um nó que já saiu do documento. */
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
        const q = <T extends Element = HTMLElement>(sel: string) =>
          gsap.utils.toArray<T>(no.querySelectorAll(sel));

        /* `matchMedia` do próprio GSAP: ele reverte o que criou dentro do bloco
           quando uma consulta deixa de valer, então ligar movimento reduzido no
           sistema com a página aberta desmonta a cena sozinho.

           As duas larguras estão aqui, e não só no CSS, por um motivo preciso: o
           recorte inicial da interface é lido do `--est-tela`, e esse valor muda
           na mesma quebra de 900px. Declarando a quebra também para o GSAP, ele
           refaz o bloco ao cruzá-la e a leitura acontece de novo — o valor
           continua morando só no CSS e mesmo assim nunca fica velho. */
        const mm = gsap.matchMedia();

        mm.add(
          {
            anima: "(prefers-reduced-motion: no-preference)",
            largo: "(min-width: 901px)",
          },
          (contexto) => {
            if (!contexto.conditions?.anima) return;

            const [cena] = q(".est-cena");
            const [ui] = q(".est-ui");
            const [digitado] = q(".est-digitado");
            const leg = q(".est-legenda");

            /* O layout de palco só entra agora. Até aqui o HTML do servidor está
               em fluxo normal, que é o estado correto para quem não roda script. */
            no.classList.add("est-live");

            /* Lido do CSS, nunca duplicado aqui. Vira uma string concreta porque
               o GSAP interpola `clip-path` contando números — `inset(var(...))`
               não tem número nenhum para ele contar e a transição não sairia. */
            const recorte = () => {
              const tela = getComputedStyle(cena).getPropertyValue("--est-tela").trim();
              return `inset(${tela} round 14px)`;
            };

            /* A composição que o servidor manda é o estado FINAL da cena. Quem
               anima precisa primeiro voltar tudo para o começo — e isso só pode
               acontecer aqui, porque este é o único ponto em que já se sabe que a
               animação vai de fato rodar. Esconder no CSS deixaria a seção vazia
               para quem não roda script. */
            gsap.set(ui, { clipPath: recorte() });
            gsap.set(q(".est-passo"), { autoAlpha: 0, y: 14 });
            gsap.set(q(".est-traco"), { strokeDashoffset: 1, strokeDasharray: 1 });
            gsap.set(q(".est-arquivo"), { autoAlpha: 0, y: 24 });
            gsap.set(q(".est-produto"), { autoAlpha: 0, y: 40 });
            gsap.set(q(".est-moldura, .est-totem-base"), { autoAlpha: 1 });
            gsap.set(q(".est-mouse"), { autoAlpha: 0, x: 120, y: 90 });
            gsap.set(leg, { autoAlpha: 0 });
            digitado.textContent = "";

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: no,
                pin: q(".est-palco")[0],
                start: "top top",
                /* A distância é o roteiro: cada batida ganha pouco mais de uma
                   tela de rolagem. Menos e a cena vira borrão; mais e arrasta. */
                end: "+=5200",
                scrub: 0.8,
                /* `snap` fica desligado de propósito. Com oito batidas e a cena
                   presa, o encaixe briga com trackpad — a página puxa de volta
                   enquanto a pessoa ainda está rolando. Para ligar:
                   snap: { snapTo: "labels", duration: 0.3, delay: 0.08 } */
                invalidateOnRefresh: true,
              },
            });

            /* Cada batida acende a sua legenda e apaga a anterior. Escrito como
               tween normal, e não em callback: callback dentro de `scrub` dispara
               a cada quadro e não sabe voltar quando a pessoa rola para cima. */
            const batida = (nome: string, i: number, folga = 0.35) => {
              tl.addLabel(nome, i === 0 ? 0 : `>+${folga}`);
              if (i > 0) tl.to(leg[i - 1], { autoAlpha: 0, duration: 0.25 }, nome);
              tl.to(leg[i], { autoAlpha: 1, duration: 0.3 }, `${nome}+=${i > 0 ? 0.18 : 0}`);
            };

            /* 1 — repouso */
            batida("repouso", 0);
            tl.from(q(".est-totem"), { autoAlpha: 0, y: 30, duration: 0.6 }, "repouso");

            /* 2 — a cliente digita. O texto é escrito por um contador, e não por
               um plugin de máquina de escrever: contador anda para trás junto com
               a rolagem, que é o que `scrub` exige. Efeito que só sabe ir para a
               frente quebra no instante em que alguém rola para cima. */
            const conta = { n: 0 };
            batida("digita", 1);
            tl.to(
              conta,
              {
                n: PEDIDO.length,
                duration: 1.4,
                ease: "none",
                onUpdate: () => {
                  digitado.textContent = PEDIDO.slice(0, Math.round(conta.n));
                },
              },
              "digita",
            );

            /* 3 — a tela do totem vira a tela inteira. */
            batida("abre", 2);
            tl.to(
              ui,
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                duration: 1.2,
                ease: "power2.inOut",
              },
              "abre",
            )
              .to(q(".est-moldura"), { autoAlpha: 0, duration: 0.8 }, "abre")
              .to(q(".est-totem-base"), { autoAlpha: 0, duration: 0.6 }, "abre");

            /* 4 — a leitura do pedido, uma linha por vez. */
            batida("entende", 3);
            tl.to(
              q(".est-passo"),
              { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.35 },
              "entende",
            );

            /* 5 — o desenho. Mesma gramática da carta do herói: `pathLength=1` e
               `stroke-dashoffset` de 1 a 0, então cada traço se risca do começo ao
               fim independentemente do tamanho real dele. */
            batida("desenha", 4);
            tl.to(
              q(".est-traco"),
              { strokeDashoffset: 0, duration: 0.9, ease: "power1.inOut", stagger: 0.18 },
              "desenha",
            );

            /* 6 — o arquivo. */
            batida("arquivo", 5);
            tl.to(q(".est-arquivo"), { autoAlpha: 1, y: 0, duration: 0.7 }, "arquivo");

            /* 7 — o ponteiro chega e clica. O clique é o botão afundando COM o
               ponteiro em cima: pressão sem alvo lê como enfeite, pressão sobre um
               botão lê como decisão. */
            batida("clica", 6);
            tl.to(q(".est-mouse"), { autoAlpha: 1, duration: 0.3 }, "clica")
              .to(q(".est-mouse"), { x: 0, y: 0, duration: 1, ease: "power3.out" }, "clica")
              .to(q(".est-aprovar"), { scale: 0.94, duration: 0.16, ease: "power2.in" }, ">-=0.1")
              .to(q(".est-aprovar"), { scale: 1, duration: 0.3, ease: "back.out(3)" }, ">");

            /* 8 — os produtos. */
            batida("produtos", 7);
            tl.to(q(".est-ui-trabalho"), { autoAlpha: 0, y: -30, duration: 0.6 }, "produtos")
              .to(q(".est-mouse"), { autoAlpha: 0, duration: 0.3 }, "produtos")
              .to(
                q(".est-produto"),
                { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" },
                "produtos+=0.2",
              );

            /* Desfeito o bloco, o HTML volta ao estado do servidor: sem a classe
               de palco e com o pedido escrito por inteiro. */
            return () => {
              no.classList.remove("est-live");
              digitado.textContent = PEDIDO;
            };
          },
        );

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
          {/* O totem. A moldura e o pedestal somem quando a tela cresce; o vidro
              é o mesmo retângulo que recorta a interface. */}
          <div className="est-totem">
            <div className="est-moldura" aria-hidden="true" />
            <div className="est-totem-base" aria-hidden="true" />
          </div>

          {/* A interface, do tamanho do palco desde sempre e recortada na
              moldura. Nada aqui é reamostrado quando a cena abre. */}
          <div className="est-ui">
            <div className="est-ui-trabalho">
              <div className="est-prompt">
                <span className="est-prompt-rot mono">Pedido</span>
                <span className="est-digitado">{PEDIDO}</span>
                <i className="est-cursor" aria-hidden="true" />
              </div>

              <div className="est-passos">
                {LEITURA.map((l) => (
                  <div className="est-passo" key={l.de}>
                    <span className="est-passo-de mono">{l.de}</span>
                    <span className="est-passo-seta" aria-hidden="true" />
                    <span className="est-passo-para">{l.para}</span>
                  </div>
                ))}
              </div>

              <div className="est-arte">
                <ArteAbelha />
              </div>

              <div className="est-arquivo">
                <div className="est-arquivo-info">
                  <strong className="mono">abelha-copo.svg</strong>
                  <span>Traço fechado · 8 × 6 cm · pronto para gravação</span>
                </div>
                <span className="est-aprovar">Aprovar e gravar</span>
              </div>
            </div>

            {/* Os produtos finalizados. Placeholders no formato certo — a peça
                real do Higgsfield entra aqui. */}
            <div className="est-produtos">
              {["Copo térmico", "Caneca", "Necessaire"].map((nome) => (
                <figure className="est-produto" key={nome}>
                  <Ph ratio="1 / 1" label={nome} />
                  <figcaption>{nome}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* O ponteiro. Fora da interface porque ele é a cliente, não a tela. */}
          <div className="est-mouse" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path
                d="M5 3l14 8-6 1.4L10.6 19 5 3z"
                fill="currentColor"
                stroke="var(--bg, #05090d)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
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
