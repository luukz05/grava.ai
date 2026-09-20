/* Ícones da página. A base é o pacote `@deemlol/next-icons` (nexticons.com):
   caixa de 24, traço 1,5, terminais arredondados, `currentColor` — o MESMO
   sistema em que os autorais daqui já eram desenhados, então os dois convivem
   sem virar dois vocabulários na mesma tela.

   Só ficam autorais os que o pacote não tem: a marca e o totem, que é o
   produto e não existe em biblioteca nenhuma. Todo o resto sai do pacote,
   re-exportado aqui com o nome que a página já usava — quem importa não
   precisa saber de onde o desenho vem, e trocar um ícone é trocar uma linha.

   Tamanho vem do CSS, nunca de `size`: cada ponto de uso já dimensiona o
   `svg` (`.fre-ico svg`, `.orb-no svg`, `.nav-cta-ico`…), e o `width`/`height`
   de 24 que o pacote põe no atributo é só o fallback. */

import type { ComponentProps, ComponentType } from "react";
import * as N from "@deemlol/next-icons";

type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/* A marca. Não segue o `base` acima e não deveria: os ícones são traço de 1,5
   numa caixa de 24, a marca é sólido de contorno medido numa caixa de 522×628.
   O que ela tem em comum com eles é o `currentColor` — o tom vem do CSS, porque
   a mesma marca precisa sair clara sobre aço e escura sobre cerâmica.

   Mora aqui porque já era o segundo lugar a desenhar o mesmo caminho: a cena do
   totem tinha uma cópia privada, e o balão de leitura do herói ia ser a
   terceira. Caminho de marca duplicado é marca que muda em um lugar só no dia
   em que o vetor original aparecer.

   A geometria e o porquê de cada número estão em `public/brand/grava-mark.svg`,
   que é a mesma reconstrução — e segue sendo o arquivo a substituir quando o
   original vier. */
export function Marca({ className }: P) {
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

/* O totem é o produto. Tela sobre pés, na mesma caixa e no mesmo traço do
   pacote — só não vem dele porque nenhuma biblioteca desenha quiosque. */
export function IcoTotem({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="3" width="12" height="13" rx="0.5" />
      <path d="M9 7h6M9 10h4" />
      <path d="M8 16v4M16 16v4M5 20h14" />
    </svg>
  );
}

/* ---------- do pacote ----------

   `aria-hidden` por padrão: nenhum ícone da página carrega significado
   sozinho — sempre há rótulo ao lado ou `aria-label` no botão —, e o pacote
   não marca isso por conta própria. */

type IcoProps = ComponentProps<typeof N.Globe>;

function pack(Ico: ComponentType<IcoProps>) {
  const Wrapped = (props: IcoProps) => <Ico aria-hidden {...props} />;
  Wrapped.displayName = Ico.displayName ?? "Ico";
  return Wrapped;
}

/* Frentes (`frentes.tsx`, `orbita.tsx`). */
export const IcoOnline = pack(N.Globe);
export const IcoCrm = pack(N.Database);
export const IcoEstoque = pack(N.Package);

/* Modelos de loja (`lojas-comparativo.tsx`): quadro aberto para o quiosque
   sem paredes, caixa fechada para a cabine com estoque próprio, casa com
   porta para a loja compacta. */
export const IcoQuiosqueAberto = pack(N.AppWindow);
export const IcoQuiosqueFechado = pack(N.Box);
export const IcoLojaCompacta = pack(N.House);

/* O ícone do CTA. Entra onde o do WhatsApp estava — na esfera em que a barra
   do topo condensa o botão, e no flutuante — porque o destino do botão mudou:
   ele não abre conversa nenhuma, ele pede a apresentação que chega por e-mail.
   Marca de aplicativo em botão que não abre aquele aplicativo é promessa
   quebrada no primeiro clique. */
export const IcoEnvelope = pack(N.Mail);

/* O par do menu do celular: os dois ocupam a mesma caixa e o mesmo eixo, o
   botão troca um pelo outro no lugar sem salto de altura. */
export const IcoMenu = pack(N.Menu);
export const IcoFechar = pack(N.X);

/* Canais do rodapé — versões de traço, não os logos sólidos.

   O WhatsApp é autoral: o do pacote é o logo sólido convertido em traço — o
   contorno externo E o interno do balão, mais o fone com a mesma dupla linha.
   Em 20px vira um borrão de linhas paralelas. Aqui é balão de uma linha só,
   com a cauda, e o fone em um caminho, como o Instagram ao lado. */
export function IcoWhatsApp({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21Z" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}
export const IcoInstagram = pack(N.Instagram);
export const IcoTopo = pack(N.ArrowUp);

/* Marca e traço da tabela comparativa. O traço é o "não se aplica" — nunca um
   X, que leria como defeito do ponto e não como característica dele. */
export const IcoSim = pack(N.Check);
export const IcoNao = pack(N.Minus);

/* ---------- institucional ----------

   Os seis dos vértices do hexágono da cena (`_marca/centro.tsx`), a uns 22px
   de lado. A regra: forma CANÔNICA, a que qualquer pessoa já viu mil vezes, e
   no máximo duas partes por ícone — ícone pequeno precisa ser reconhecido
   antes de ser lido, e o que faz isso é a silhueta. */
export const IcoInovacao = pack(N.Cpu); /* hardware é o diferencial da operação */
export const IcoExperiencia = pack(N.Eye); /* a experiência acontece na frente do totem */
export const IcoRentabilidade = pack(N.TrendingUp);
export const IcoArte = pack(N.Sparkles); /* o símbolo que virou "gerado por IA" */
export const IcoTempo = pack(N.Zap); /* do conceito ao produto gravado em minutos */
export const IcoJornada = pack(N.Headphones); /* atendimento; o balão já é o da ideia na cena */
