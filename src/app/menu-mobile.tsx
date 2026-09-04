"use client";

/* O menu de navegação do celular.

   ───────────────────────────────────────────────────────────────────────────
   POR QUE ELE EXISTE

   Abaixo de 820px a cápsula de pílulas da barra do topo é `display: none` — ela
   não cabe ao lado da marca e do botão de conversão. O que sobrava era uma
   barra com dois elementos, nenhum deles navegação: a marca leva à home e o
   CTA leva ao formulário. As outras três rotas do site só existiam nos links do
   rodapé, nove telas abaixo. Num site de quatro páginas, isso é o roteamento
   inteiro inacessível no dispositivo em que a maior parte do tráfego pago
   chega.

   ───────────────────────────────────────────────────────────────────────────
   POR QUE ESTE É O ÚNICO COMPONENTE DE CLIENTE DA CASCA

   O resto da barra não usa uma linha de JavaScript: ela condensa na rolagem com
   `animation-timeline: scroll()`, e o botão flutuante aparece pelo mesmo
   mecanismo. Aqui não dá, e vale dizer por quê em vez de fingir que dá.

   As saídas sem script são duas, e as duas custam mais do que entregam:

   — `<details>/<summary>` abre e fecha sozinho, mas não fecha ao tocar fora
     nem ao trocar de rota, e o estado `open` fica preso no DOM que o Next
     reaproveita na navegação suave. O menu ficaria aberto por cima da página
     seguinte;
   — o `<input type="checkbox">` escondido não tem semântica de botão, não
     anuncia `aria-expanded` e depende de um `<label>` para virar alvo — um
     controle que mente sobre o que é para o leitor de tela.

   O que este arquivo pede em troca é pequeno: um `useState`, três ouvintes que
   só existem enquanto o menu está aberto, e nenhum deles é de rolagem. Fora
   isso o componente não renderiza nada dinâmico, e o painel é HTML estático.

   ───────────────────────────────────────────────────────────────────────────
   O QUE FECHA O MENU

   Toque fora, `Escape` (com o foco voltando ao botão, senão ele fica no vazio),
   clique num item, e a janela passando dos 820px — que é o ponto em que as
   pílulas voltam e o botão do menu deixa de existir. Sem esse último, quem gira
   o aparelho com o menu aberto fica com um painel órfão sobre a página, sem
   botão nenhum para fechá-lo. */

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IcoFechar, IcoMenu } from "./icons";
import { ROTAS, type Pagina } from "./rotas";

/* O mesmo 820px do `@media` que esconde as pílulas em `v5.css`. Repetido aqui
   porque é a mesma decisão vista dos dois lados da fronteira, e um dos dois
   lados é JavaScript — não existe token que os dois leiam. Mudou lá, muda
   aqui. */
const LARGA = "(min-width: 821px)";

export function MenuMobile({ atual }: { atual: Pagina }) {
  const [aberto, setAberto] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);
  const botao = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!aberto) return;

    const fecharEVoltar = () => {
      setAberto(false);
      botao.current?.focus();
    };

    const naTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fecharEVoltar();
    };

    /* `pointerdown` e não `click`: o clique só chega depois de soltar o dedo, e
       nesse intervalo a pessoa já vê o painel aberto sobre o que ela acabou de
       tocar. Aqui ele fecha no instante em que o toque começa. O foco NÃO volta
       ao botão neste caso — quem tocou fora está indo para outro lugar da
       página, e roubar o foco de volta seria desfazer o gesto. */
    const foraDaCaixa = (e: PointerEvent) => {
      if (!caixa.current?.contains(e.target as Node)) setAberto(false);
    };

    const larga = window.matchMedia(LARGA);
    const naLargura = () => {
      if (larga.matches) setAberto(false);
    };

    document.addEventListener("keydown", naTecla);
    document.addEventListener("pointerdown", foraDaCaixa);
    larga.addEventListener("change", naLargura);

    return () => {
      document.removeEventListener("keydown", naTecla);
      document.removeEventListener("pointerdown", foraDaCaixa);
      larga.removeEventListener("change", naLargura);
    };
  }, [aberto]);

  return (
    <div className="nav-menu-caixa" ref={caixa}>
      <button
        ref={botao}
        type="button"
        className="nav-menu-botao"
        aria-expanded={aberto}
        aria-controls={id}
        /* O nome do botão muda com o estado, e o `aria-expanded` acima já diz
           "expandido/recolhido" — daí o rótulo ser só "Menu" e "Fechar menu", e
           não "Abrir menu de navegação". Repetir o estado no nome faz o leitor
           de tela anunciar a mesma informação duas vezes. */
        aria-label={aberto ? "Fechar menu" : "Menu"}
        onClick={() => setAberto((v) => !v)}
      >
        {aberto ? (
          <IcoFechar className="nav-menu-ico" />
        ) : (
          <IcoMenu className="nav-menu-ico" />
        )}
      </button>

      {/* O painel fica no DOM fechado, e é o CSS que o esconde: é o que permite
          a transição de entrada e de saída, que uma montagem condicional não
          teria na saída.

          `inert` é o que impede o preço disso — sem ele os quatro links
          continuariam na ordem de tabulação e o leitor de tela leria um menu
          invisível no meio da barra. Ele desliga foco, clique e leitura de uma
          vez, que é exatamente o que "este bloco não existe agora" quer dizer. */}
      <nav
        id={id}
        className="nav-menu"
        data-aberto={aberto ? "sim" : undefined}
        inert={!aberto}
        aria-label="Páginas"
      >
        {ROTAS.map((r) =>
          r.id === atual ? (
            /* O item atual não é link, pela mesma regra das pílulas: link que
               aponta para a própria página é ruído de navegação. */
            <span key={r.id} className="nav-menu-item" aria-current="page">
              {r.rotulo}
            </span>
          ) : (
            <Link
              key={r.id}
              className="nav-menu-item"
              href={r.href}
              onClick={() => setAberto(false)}
            >
              {r.rotulo}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
