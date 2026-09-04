import Link from "next/link";
import Image from "next/image";
import { IcoEnvelope } from "./icons";
import { MenuMobile } from "./menu-mobile";
import { ROTAS, type Pagina } from "./rotas";
import "./navbar.css";

/* Barra de navegação do site.
   Três peças, como na referência: marca à esquerda, grupo de links numa
   cápsula ao centro-esquerda com a página atual preenchida, e o controle à
   direita. A cápsula é o que dá a leitura de "você está aqui" sem precisar de
   sublinhado nem de cor diferente no texto.

   O item atual não é link: `aria-current` marca para leitor de tela e o
   elemento vira `span`, porque link que aponta para a própria página é ruído
   de navegação.

   ───────────────────────────────────────────────────────────────────────────
   ELA SE CONDENSA NA ROLAGEM, E SEM UMA LINHA DE JAVASCRIPT

   Fora do topo, as três peças soltas se recolhem para dentro de um oblongo só,
   e o botão do WhatsApp vira uma bolinha com o ícone. No topo, volta ao que é
   agora.

   Quem faz isso é `animation-timeline: scroll()` no CSS — o mesmo mecanismo que
   apaga a carta do herói quando ela sai. Não há ouvinte de rolagem, não há
   estado em React, e o componente continua sendo de servidor.

   O rótulo do botão não é apagado quando ele encolhe: vira `.nav-cta-rotulo`
   com largura zero e `visibility` preservada para o leitor de tela, e o ícone
   aparece no lugar. Trocar texto por ícone escondendo o texto de todo mundo
   deixaria o botão sem nome acessível — a bolinha viraria um alvo anônimo. */

/* A LISTA DE ROTAS E O TIPO `Pagina` MUDARAM PARA `./rotas`.

   O menu do celular precisa dos mesmos quatro itens e é componente de cliente;
   importá-los daqui fecharia um ciclo entre os dois arquivos, porque este
   importa aquele. O reexport mantém `import { type Pagina } from "./navbar"`
   funcionando em quem já escrevia assim. */
export type { Pagina } from "./rotas";

/* `cta` vem da casca: na home ele atravessa para `/seja-franqueado` e nas
   outras desce até o formulário do fechamento. Ver `destinoCta` em `./lead`. */
export function NavBar({
  atual,
  cta,
}: {
  atual: Pagina;
  cta: { href: string; rotulo: string };
}) {
  /* No topo não existe barra em volta: a marca, a cápsula das pílulas e as ações
     ficam soltas sobre a página, e a única superfície desenhada é a cápsula dos
     links. É só ao rolar que uma superfície aparece em volta das três.

     Dois elementos, e não um. `.navbar-faixa` é a COLUNA — largura máxima e
     respiro lateral da página, herdados do `.hold` — e é ela que gruda no topo.
     `.navbar` dentro dela é só a linha de conteúdo, e é ela que vira o oblongo.

     Antes eram a mesma coisa, e isso quebrava o estado do topo: para o oblongo
     abraçar o conteúdo eu precisava de `min-width` variável, e `min-width`
     VENCE `max-width` — a barra passava a ser mais larga que a coluna em vez de
     acompanhá-la. Separando, o mínimo passa a ser medido contra a coluna, que é
     o que se queria desde o começo. */
  return (
    <div className="hold navbar-faixa">
      <div className="navbar">
        <Link
          className="brand"
          href="/"
          aria-label="GRAVA.AI, ir para o início"
        >
          <Image
            src="/brand/grava-mark.png"
            alt="GRAVA.AI"
            width={108}
            height={128}
            priority
            className="brand-simbolo"
          />
        </Link>

        <nav className="nav-pilulas" aria-label="Páginas">
          {ROTAS.map((i) =>
            i.id === atual ? (
              <span key={i.id} className="pilula" aria-current="page">
                {i.rotulo}
              </span>
            ) : (
              <Link key={i.id} className="pilula" href={i.href}>
                {i.rotulo}
              </Link>
            ),
          )}
        </nav>

        <div className="nav-acoes">
          {/* O ícone é envelope, e não mais o do WhatsApp: o botão leva ao
              formulário, e o que ele pede chega por e-mail. Ele só aparece
              quando a barra condensa e o rótulo sai — a esfera não pode ficar
              vazia, que é um alvo sem nome nenhum. Ver `navbar.css`. */}
          <a className="cta nav-cta" href={cta.href}>
            <IcoEnvelope className="nav-cta-ico" />
            <span className="nav-cta-rotulo">{cta.rotulo}</span>
          </a>

          {/* O menu só existe abaixo de 820px, onde a cápsula de pílulas some.
              Ele fica DEPOIS do CTA na ordem do DOM de propósito: a ordem visual
              é a mesma, e o botão de conversão precisa vir antes na tabulação —
              é a ação da página, não a navegação entre elas. */}
          <MenuMobile atual={atual} />
        </div>
      </div>
    </div>
  );
}
