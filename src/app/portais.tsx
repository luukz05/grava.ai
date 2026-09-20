/* Os portais do fechamento: dois cartões, cada um levando a outra página do
   site.

   Existem para as duas rotas que NÃO captam — a home e /galeria. O fechamento
   delas era um botão só (na home) ou o formulário inteiro (na galeria), e os
   dois erravam pelo mesmo motivo em direções opostas: o botão sozinho era um
   fechamento apagado, uma linha de texto e uma pílula no fim de uma página que
   tinha acabado de mostrar uma cena inteira; o formulário cobrava nome, e-mail
   e WhatsApp de quem chegou para ver peça, antes de ter lido o que a franquia
   é. Quem quer a apresentação vai encontrá-la em `/seja-franqueado`, que é a
   página que existe para isso — e é para lá que um dos dois cartões aponta.

   A receita do cartão: o ícone da página de destino numa pastilha no alto, o
   título embaixo, o apoio em cinza — e o MESMO ícone repetido em marca d'água
   no lado direito, grande e quase apagado, sangrando para fora da caixa. A
   pastilha diz o assunto; a marca d'água dá profundidade sem virar ilustração.
   Mesmo material dos outros cartões da página (`.loja`, `.cellart`).

   É `<Link>` inteiro, e não cartão com botão dentro: o alvo é o cartão. */

import Link from "next/link";
import type { ComponentType } from "react";
import "./portais.css";
import { IcoArte, IcoTotem, Marca } from "./icons";
import { Brilho } from "./brilho";

export type Portal = {
  href: string;
  titulo: string;
  texto: string;
  Icone: ComponentType<{ className?: string }>;
};

/* Os três destinos possíveis, prontos. Cada página monta o par com os dois que
   não são ela mesma, e o texto de cada um vive num lugar só — mudar o que se
   diz da galeria muda na home e na landing de uma vez. */
export const PORTAL_FRANQUEADO: Portal = {
  href: "/seja-franqueado",
  titulo: "Seja um franqueado",
  texto: "Modelos, investimento, o que a rede entrega e como pedir a apresentação.",
  Icone: IcoTotem,
};

export const PORTAL_GALERIA: Portal = {
  href: "/galeria",
  titulo: "O que sai do totem",
  texto: "As peças gravadas na hora, com a arte que a IA cria na conversa com o cliente.",
  Icone: IcoArte,
};

export const PORTAL_MARCA: Portal = {
  href: "/",
  titulo: "Quem é a GRAVA.AI",
  texto: "A ideia, a personalização e o produto — e por que a IA muda o que é possível.",
  Icone: Marca,
};

export function Portais({ itens }: { itens: Portal[] }) {
  return (
    <nav className="portais" aria-label="Outras páginas">
      {itens.map(({ href, titulo, texto, Icone }) => {
        /* A marca é a única sólida entre os três e pesa diferente na mesma
           opacidade — ver `.portal--solida`. */
        const solida = Icone === Marca ? " portal--solida" : "";
        return (
          <Link className={`portal brilho${solida}`} href={href} key={href}>
            {/* O brilho que segue o ponteiro — só publica variáveis; quem
                desenha é o `.brilho::before`. Ver `brilho.tsx`. */}
            <Brilho />
            <span className="portal-ico" aria-hidden="true">
              <Icone />
            </span>
            <h3 className="portal-t">{titulo}</h3>
            <span className="portal-p">{texto}</span>
            {/* A marca d'água: puramente decorativa, o `aria-hidden` já vem de
                `icons.tsx`. */}
            <Icone className="portal-marca" />
          </Link>
        );
      })}
    </nav>
  );
}
