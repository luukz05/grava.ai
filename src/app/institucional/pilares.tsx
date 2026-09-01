"use client";

/* OS TRÊS PILARES, no hexágono da marca.

   ───────────────────────────────────────────────────────────────────────────
   DE ONDE ISTO VEIO

   Este desenho é o antigo diagrama da seção `#marca`: hexágono, raios do
   centro e nós nos vértices. Lá ele carregava DUAS coisas ao mesmo tempo — os
   três passos do processo num anel interno e os três pilares nos vértices —, e
   duas leituras no mesmo desenho é o que fazia a peça ficar embolada: um anel
   azul brilhante contando o processo e, atrás dele, três ícones apagados
   contando outra coisa.

   O processo saiu daqui e ganhou cena própria (ver `centro.tsx`). O que fica é
   só o que a seção diz: três pilares, e o hexágono que os segura juntos.

   ───────────────────────────────────────────────────────────────────────────
   A FORMA É O ARGUMENTO

   Três pilares em três CARTÕES lado a lado dizem "são três itens de uma
   lista". Nos vértices alternados de um hexágono eles dizem outra coisa: que
   sustentam a mesma peça, e que tirar um derruba o polígono. É a frase da
   seção — "não são valores de parede: é o que precisa funcionar junto" —
   desenhada em vez de afirmada.

   Os cartões continuam logo abaixo na página: o desenho NOMEIA, os cartões
   DETALHAM. Nenhum dos dois repete o outro.

   ───────────────────────────────────────────────────────────────────────────
   A ENTRADA É DE UMA VEZ SÓ, e não raspada pela rolagem

   `centro.tsx` é raspado (`scrub`) porque lá cada batida do desenho tem um
   bloco de texto correspondente e as duas colunas andam juntas. Aqui não há
   percurso: é um estado, e um estado se monta quando entra na tela. Raspar
   também isto colocaria dois relógios de rolagem na mesma página com gramática
   diferente — e o segundo, sem texto para acompanhar, seria movimento por
   movimento.

   `once: true`: montou, ficou montado. Remontar a cada passada transforma a
   seção num loop de vitrine. */

import { useEffect, useRef } from "react";
import {
  Marca,
  IcoInovacao,
  IcoExperiencia,
  IcoRentabilidade,
} from "../icons";
import { E_UI, E_LUZ, E_MOLA, E_MOLA_SOLTA } from "./curvas";

/* ───────────────────────────────────────────────────────────────────────────
   A GEOMETRIA

   Coordenadas de 0 a 100 numa caixa quadrada: o mesmo número serve para o
   `viewBox` do traçado e para o `left/top` em porcentagem dos nós, que são
   HTML e não SVG — nome de pilar precisa herdar a tipografia da página, e
   `<text>` em SVG não quebra linha. */
const R_HEX = 42;

const rad = (a: number) => (a * Math.PI) / 180;
const px = (a: number, r: number) => 50 + r * Math.cos(rad(a));
const py = (a: number, r: number) => 50 + r * Math.sin(rad(a));
/* Três casas: o valor entra numa string de `d` e numa de `style`, e o React
   compara a marcação do servidor com a do cliente caractere a caractere. */
const n3 = (v: number) => v.toFixed(3);

/* Os seis vértices do hexágono, a partir do topo. */
const VERTICES = [-90, -30, 30, 90, 150, 210];

const D_HEX =
  VERTICES.map(
    (a, i) => `${i === 0 ? "M" : "L"}${n3(px(a, R_HEX))} ${n3(py(a, R_HEX))}`
  ).join(" ") + " Z";

/* De que lado do vértice o nome se pendura: sempre PARA FORA. Para dentro ele
   cairia em cima do raio que sai do centro. O eixo Y do SVG cresce para baixo,
   então seno negativo é metade de cima. */
const lado = (ang: number) => (Math.sin(rad(ang)) < 0 ? "cima" : "baixo");

/* TRÊS VÉRTICES ALTERNADOS, e não três seguidos. Alternados, os pilares formam
   um triângulo equilátero dentro do hexágono e a carga fica distribuída — que
   é o desenho de algo sustentado. Em três vértices vizinhos eles ficariam
   todos de um lado, e o polígono passaria a parecer prestes a tombar.

   Mesmos nomes e mesmos ícones dos cartões da seção: se um mudar lá, muda aqui
   junto. */
const PILARES = [
  { id: "inovacao", nome: "Inovação no processo", ang: 210, Ico: IcoInovacao },
  {
    id: "experiencia",
    nome: "Experiência imersiva",
    ang: -30,
    Ico: IcoExperiencia,
  },
  {
    id: "rentabilidade",
    nome: "Rentabilidade real",
    ang: 90,
    Ico: IcoRentabilidade,
  },
];

export function Pilares() {
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
        const q = (s: string) =>
          gsap.utils.toArray<HTMLElement>(no.querySelectorAll(s));
        const um = <T extends Element>(s: string) => no.querySelector<T>(s)!;
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          /* `pil-vivo` liga o estado inicial ausente. Sem script, ou com
             movimento reduzido, o desenho aparece montado — a mesma informação
             sem a encenação. Esconder pelo CSS apagaria justamente esse
             estado. */
          no.classList.add("pil-vivo");

          const hex = um<SVGPathElement>(".pil-hex");
          const aura = um<HTMLElement>(".pil-aura");
          const nucleo = um<HTMLElement>(".pil-nucleo");
          const raios = q(".pil-raio");
          const pecas = q(".pil-peca");

          gsap.set(hex, { strokeDashoffset: 6, opacity: 0.5 });
          gsap.set(raios, { strokeDashoffset: 1 });
          gsap.set(aura, { opacity: 0, scale: 0.85 });
          gsap.set(nucleo, { autoAlpha: 0, scale: 0.6 });
          gsap.set(pecas, { autoAlpha: 0, scale: 0.78 });

          /* A ORDEM CONTA A FRASE: primeiro o polígono (o lugar), depois o que
             está no meio, depois os fios, e só então os pilares chegam. Se os
             pilares chegassem antes dos raios, eles seriam três ícones soltos
             que ganharam linha depois — e o que a seção diz é que a ligação
             entre eles é o que os torna pilares. */
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: no,
              start: "top 74%",
              /* Montou, ficou montado: o gatilho dispara uma vez e se
                 desfaz. */
              once: true,
            },
          });

          tl.to(hex, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.1,
            ease: E_UI,
          })
            .to(
              aura,
              { opacity: 0.6, scale: 1, duration: 0.9, ease: E_LUZ },
              "<0.2"
            )
            .to(
              nucleo,
              { autoAlpha: 1, scale: 1, duration: 0.7, ease: E_MOLA },
              "<0.15"
            )
            .to(
              raios,
              {
                strokeDashoffset: 0,
                duration: 0.7,
                ease: E_UI,
                stagger: 0.12,
              },
              "<0.25"
            )
            .to(
              pecas,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.8,
                ease: E_MOLA_SOLTA,
                stagger: 0.14,
              },
              "<0.28"
            );

          return () => {
            no.classList.remove("pil-vivo");
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
    <div className="pil" ref={raiz} aria-hidden="true">
      <div className="pil-cena">
        {/* A aura não desenha nada: diz onde é o centro, e é o que separa o
            traço do fundo preto sem precisar de chapa. */}
        <div className="pil-aura" />

        <svg className="pil-tracado" viewBox="0 0 100 100">
          {/* `pathLength={1}` nos raios e `{6}` no hexágono (um por lado): com
              isso o `stroke-dashoffset` conta LADOS, e não unidades de
              comprimento que mudariam junto com o raio. */}
          {PILARES.map((p) => (
            <line
              className="pil-raio"
              key={p.id}
              x1="50"
              y1="50"
              x2={n3(px(p.ang, R_HEX))}
              y2={n3(py(p.ang, R_HEX))}
              pathLength={1}
            />
          ))}
          <path className="pil-hex" d={D_HEX} pathLength={6} />
        </svg>

        {/* No meio, a marca: é a empresa que os três sustentam. Quem centra é
            o `.pil-marco`, e quem anima é o filho — o GSAP zera a propriedade
            `translate` ao assumir um alvo, então centrar com ela dentro do
            próprio elemento animado joga a peça para a quina no primeiro
            quadro. */}
        <div className="pil-marco" style={{ left: "50%", top: "50%" }}>
          <span className="pil-nucleo">
            <Marca />
          </span>
        </div>

        {PILARES.map(({ id, nome, ang, Ico }) => (
          <div
            className="pil-marco"
            key={id}
            style={{
              left: `${n3(px(ang, R_HEX))}%`,
              top: `${n3(py(ang, R_HEX))}%`,
            }}
          >
            <div className="pil-peca" data-lado={lado(ang)}>
              <span className="pil-ico">
                <Ico />
              </span>
              <span className="pil-nome">{nome}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
