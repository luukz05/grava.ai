"use client";

/* Índice da página, na margem esquerda.
   Mostra onde você está e quanto ainda falta. É o único componente de cliente
   da landing: o resto é estático.

   Por que IntersectionObserver e não CSS: a página já usa `animation-timeline:
   view()` para o que reage à própria posição. Aqui o elemento que muda (o item
   do índice) é diferente do elemento observado (a seção), e o único caminho
   sem JS para isso é `timeline-scope`, que hoje só existe em Chromium. Um
   índice que não marca a seção certa em Safari não é um índice.

   Sem listener de scroll: o observer dispara nas transições e nada mais. */

import { useEffect, useState } from "react";

export type Secao = { id: string; rotulo: string };

export function Indice({ secoes }: { secoes: Secao[] }) {
  const [ativa, setAtiva] = useState(secoes[0]?.id ?? "");

  useEffect(() => {
    const alvos = secoes
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!alvos.length) return;

    /* Uma faixa estreita na altura do olho, não a viewport inteira: com a
       janela toda, duas seções ficam visíveis ao mesmo tempo e o índice pisca
       entre elas. A faixa decide sozinha quem está sendo lida. */
    const obs = new IntersectionObserver(
      (entradas) => {
        const dentro = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (dentro[0]) setAtiva(dentro[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [secoes]);

  const i = Math.max(0, secoes.findIndex((s) => s.id === ativa));

  return (
    <nav className="indice" aria-label="Índice da página">
      <ol>
        {secoes.map((s, n) => {
          const estado = n === i ? "atual" : n < i ? "passou" : "adiante";
          return (
            <li key={s.id} data-estado={estado}>
              <a href={`#${s.id}`} aria-current={n === i ? "true" : undefined}>
                <span className="indice-n">{String(n + 1).padStart(2, "0")}</span>
                <span className="indice-traco" aria-hidden="true" />
                <span className="indice-rot">{s.rotulo}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
