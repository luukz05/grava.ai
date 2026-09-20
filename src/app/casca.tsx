/* A casca das três páginas.

   Antes cada rota montava a sua: instanciava as fontes por conta própria,
   escrevia o wrapper com — ou sem — `data-forma`, e decidia se tinha barra do
   topo nova, botão flutuante e barra fixa. O resultado é o que se espera
   disso: a landing arredondada e a institucional reta, uma com a
   display da marca carregada e a outra não, duas assinaturas de fundo
   diferentes na mesma marca.

   Aqui a casca é uma só. Cada página entrega o miolo; forma, tipografia,
   navegação e os fixos vêm daqui e mudam nas três de uma vez. */

import localFont from "next/font/local";
import { NavBar, type Pagina } from "./navbar";
import { destinoCta } from "./lead";
import { Flutuante } from "./flutuante";
import { FundoTopo } from "./fundos";

/* Uma face só, em todo o site.

   Aqui viviam três: Bricolage Grotesque no texto, Rajdhani na display da marca
   e Space Mono nos rótulos técnicos. Três famílias numa página de captação são
   três downloads, três conjuntos de métricas para o navegador reservar espaço
   e três vozes disputando a mesma tela — e a única que o cliente reconhecia
   como marca era a display, que aparecia em meia dúzia de manchetes.

   A Switzer cobre os três papéis: grotesca neutra de contraforma aberta, com o
   eixo de peso inteiro (100–900) num arquivo só. O que era diferença de
   família passa a ser diferença de peso, corpo e espacejamento — que é como
   uma tipografia de sistema se organiza.

   Arquivo variável servido do próprio domínio pelo `next/font/local`: sem
   requisição a terceiro, sem FOUT, e com o `size-adjust` que o Next calcula
   para a fonte de fallback, que é o que impede o salto de layout na troca.

   O que se perde, dito de frente: a Bricolage tinha eixo óptico (`opsz`
   12–96) e a Switzer não tem, então o `font-optical-sizing: auto` do `v5.css`
   virou no-op — o rótulo de 11px e a manchete de 90px passam a usar o mesmo
   desenho de letra. E os rótulos que eram monoespaçados perdem o alinhamento
   de coluna; onde há número, o `font-variant-numeric: tabular-nums` que ficou
   no lugar deles segura o que importa, que é o dígito não dançar durante a
   contagem. */
const switzer = localFont({
  src: "./fontes/Switzer-Variable.woff2",
  variable: "--f-txt",
  weight: "100 900",
  display: "swap",
});

/* O link direto do WhatsApp saiu daqui.

   Ele era o destino de todo CTA das quatro rotas e virou o SEGUNDO contato:
   quem chama no WhatsApp agora é a operação, depois que a apresentação já
   chegou no e-mail da pessoa. O que os botões apontam está em `./lead`, e o
   único link direto que sobrou no site é o do rodapé — lá ele é dado de
   contato da marca, não conversão. */

/* `leitura` marca as páginas que abrem sem painel ao lado — a home e
   /galeria. O herói delas é uma coluna de texto sozinha, e encostada à esquerda
   numa tela larga ela deixa metade do viewport vazio à direita sem nada
   ocupando esse vazio; centrada, não deixa.

   VALE SÓ PARA O HERÓI. O resto das duas páginas segue a receita da landing,
   encostada à esquerda: o eixo central é assinatura de abertura, e estendê-lo
   às seções de conteúdo transformaria duas páginas de leitura em duas páginas
   de convite. Ver `[data-leitura="centro"]` no `v5.css`. */
export function Casca({
  atual,
  leitura,
  children,
}: {
  atual: Pagina;
  leitura?: boolean;
  children: React.ReactNode;
}) {
  /* O DESTINO DOS FIXOS DEPENDE DA ROTA, e a casca é quem sabe qual é.

     Só em `/seja-franqueado` o CTA desce até o formulário do fechamento. Na
     home e na galeria não existe formulário — as duas encaminham para
     `/seja-franqueado` pelos portais —, e apontar os fixos para `#falar` ali
     levaria a pessoa até um fechamento sem nada para preencher. Ver
     `destinoCta` em `./lead`. */
  const cta = destinoCta(atual === "franqueado");

  return (
    <div
      className={`${switzer.variable} v5`}
      data-forma="oblongo"
      data-fundo="topo"
      data-leitura={leitura ? "centro" : undefined}
    >
      <main>
        {/* Aqui vinha a `TrilhaTopo`: curvas de nível rasas atrás da página
            inteira, com uma linha acesa que se riscava conforme a rolagem. Saiu
            a pedido. O que ela fazia — estender o material da marca para além da
            dobra — o herói passou a fazer sozinho: a carta viva se mexe, e uma
            textura estática atrás de nove telas de texto ao lado dela lia como
            segunda tentativa do mesmo assunto. O componente está no histórico. */}
        <NavBar atual={atual} cta={cta} />
        {children}
        <Flutuante cta={cta} />

        {/* A `.dock` SAIU — a barra fixa que colava o CTA de largura total no pé
            da tela abaixo de 780px.

            Ela custava uma faixa permanente de ~70px do viewport do celular, e
            era o terceiro lugar em que o mesmo botão aparecia: a barra do topo
            é `sticky` e já carrega o CTA na primeira linha de toda rota, no
            campo de visão o tempo inteiro. Duas barras coladas nas duas quinas
            da tela não dobram a conversão; elas espremem o conteúdo por onde a
            pessoa está lendo.

            O CTA do celular é o da barra do topo, e a navegação entre rotas —
            que abaixo de 820px não existia, porque as pílulas somem — passou a
            ser o menu ao lado dele. Ver `MenuMobile` em `menu-mobile.tsx`. */}
      </main>
    </div>
  );
}

/* A carta topográfica atrás do primeiro bloco. É a assinatura de material da
   marca e vale para as três rotas: uma segunda textura de fundo em outra
   página seria uma segunda marca. */
export function Heroi({ children }: { children: React.ReactNode }) {
  return (
    <div className="herowrap herowrap--plano">
      <FundoTopo />
      {children}
    </div>
  );
}
