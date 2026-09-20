"use client";

import { useEffect, useRef } from "react";
import "./brilho.css";

/* O brilho que segue o ponteiro dentro de uma caixa.

   Nasceu nos portais do fechamento (`portais.tsx`) e passou para o cartão do
   formulário da landing: é o mesmo efeito, e dois arquivos com o mesmo laço de
   `requestAnimationFrame` seriam dois lugares para corrigir o mesmo bug.

   Mesma receita da lanterna do herói (`ponteiro.tsx`): publica a posição do
   cursor como duas variáveis de CSS no elemento PAI (`--gx/--gy`, em pixels) e
   uma chave (`--g-on`), e não desenha nada — quem desenha é o `::before` da
   classe `.brilho`, em `brilho.css`, um degradê radial centrado nelas. O custo
   é uma variável por quadro; o resto é composição.

   Uso: `<div className="qualquer brilho"><Brilho />…</div>`. A classe no pai
   dá a camada e o contexto de empilhamento; o componente dá as variáveis.

   Escuta no PRÓPRIO pai, e não na janela: são caixas paradas na página, e
   `pointerenter`/`pointerleave` já dizem quando o cursor está dentro sem medir
   a caixa a cada movimento. A caixa só é lida na entrada — se a página rolar
   com o cursor parado em cima, o próximo `pointermove` corrige.

   Só com ponteiro fino e sem movimento reduzido: em toque não existe posição de
   cursor, e um brilho parado no último toque fica pior que brilho nenhum. */
export function Brilho() {
  const marca = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const alvo = marca.current?.parentElement;
    if (!alvo) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let caixa = alvo.getBoundingClientRect();
    let px = 0;
    let py = 0;
    let pedido = 0;

    const pintar = () => {
      pedido = 0;
      alvo.style.setProperty("--gx", `${(px - caixa.left).toFixed(1)}px`);
      alvo.style.setProperty("--gy", `${(py - caixa.top).toFixed(1)}px`);
    };

    const mover = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!pedido) pedido = requestAnimationFrame(pintar);
    };

    const entrar = (e: PointerEvent) => {
      caixa = alvo.getBoundingClientRect();
      alvo.style.setProperty("--g-on", "1");
      mover(e);
    };

    const sair = () => {
      alvo.style.setProperty("--g-on", "0");
    };

    alvo.addEventListener("pointerenter", entrar);
    alvo.addEventListener("pointermove", mover, { passive: true });
    alvo.addEventListener("pointerleave", sair);

    return () => {
      if (pedido) cancelAnimationFrame(pedido);
      alvo.removeEventListener("pointerenter", entrar);
      alvo.removeEventListener("pointermove", mover);
      alvo.removeEventListener("pointerleave", sair);
    };
  }, []);

  /* Âncora para achar o pai sem `querySelector`: cada brilho acha o seu. */
  return <span ref={marca} hidden />;
}
