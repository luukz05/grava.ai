"use client";

import { useEffect, useRef } from "react";

/* Lanterna do ponteiro sobre a carta topográfica.

   Publica quatro variáveis de CSS no `.fundo--topo` e não desenha nada: a
   posição do cursor dentro da caixa (`--tp-x/--tp-y`, em pixels) e o desvio dele
   em relação ao centro (`--tp-dx/--tp-dy`, de -0,5 a 0,5). Quem usa isso é o
   CSS — a caixa de luz se desloca e as duas cartas se inclinam em sentidos
   opostos, o que dá ao terreno a sensação de responder sem que nada nele seja
   recalculado.

   O que NÃO se faz aqui: deformar a geometria. Recalcular quinze caminhos por
   quadro repinta o SVG inteiro a 60Hz dentro do herói, que é exatamente onde o
   LCP é medido. O custo desta versão é uma variável de CSS por quadro, e o
   resto é composição.

   Só com ponteiro fino e sem movimento reduzido: em toque não existe posição de
   cursor, e a lanterna parada no último toque fica pior que lanterna nenhuma. */
export function SeguirPonteiro() {
  const marca = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const alvo = marca.current?.parentElement;
    if (!alvo) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let caixa = alvo.getBoundingClientRect();
    let remedir = false;
    let px = 0;
    let py = 0;
    let pedido = 0;

    const pintar = () => {
      pedido = 0;
      /* A leitura da caixa força layout, então acontece no máximo uma vez por
         quadro e só depois de rolagem ou redimensionamento. */
      if (remedir) {
        caixa = alvo.getBoundingClientRect();
        remedir = false;
      }
      const x = px - caixa.left;
      const y = py - caixa.top;
      const dentro = x >= 0 && y >= 0 && x <= caixa.width && y <= caixa.height;
      alvo.style.setProperty("--tp-on", dentro ? "1" : "0");
      if (!dentro) return;
      alvo.style.setProperty("--tp-x", `${x.toFixed(1)}px`);
      alvo.style.setProperty("--tp-y", `${y.toFixed(1)}px`);
      alvo.style.setProperty("--tp-dx", (x / caixa.width - 0.5).toFixed(3));
      alvo.style.setProperty("--tp-dy", (y / caixa.height - 0.5).toFixed(3));
    };

    const agendar = () => {
      if (!pedido) pedido = requestAnimationFrame(pintar);
    };

    const mover = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      agendar();
    };

    const mudou = () => {
      remedir = true;
      agendar();
    };

    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("scroll", mudou, { passive: true });
    window.addEventListener("resize", mudou, { passive: true });

    return () => {
      if (pedido) cancelAnimationFrame(pedido);
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("scroll", mudou);
      window.removeEventListener("resize", mudou);
    };
  }, []);

  /* Âncora para achar o `.fundo--topo` sem `querySelector` global: o dia em que
     existir um segundo herói na página, cada lanterna acha o seu. */
  return <span ref={marca} hidden />;
}
