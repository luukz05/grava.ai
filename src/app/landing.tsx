/* GRAVA.AI — landing. Estética Data-As-Texture, vencedora da bancada.
   O material da página é o glifo monoespaçado: o header é uma malha hexagonal
   de caracteres em onda com a marca emergindo dela, e os canais da IA viram
   medidores de glifos. Sem radar, sem sci-fi. */

import Link from "next/link";
import Image from "next/image";
import "./v5.css";
import "./variacoes.css";
import "./temas.css";
/* A arte ASCII segue inteira em `assets.tsx`. Ela saiu da página a pedido, para
   a leitura de layout acontecer sem o ruído dos mocks — voltar é reimportar
   AsciiWaveHeader / AsciiMeter / AsciiTotem / AsciiCircuito e desfazer os
   `<Ph>` abaixo. */
import { Casca, Heroi, WHATSAPP } from "./casca";
import { Indice, type Secao } from "./indice";
import { Ph } from "./ph";
import { LojasComparativo } from "./lojas-comparativo";
import { Numeros } from "./numeros";
import { HeadToHead } from "./head-to-head";
import { Orbita } from "./orbita";
import { FormFranqueado } from "./form-franqueado";
import { Rodape } from "./rodape";

/* A ordem aqui é a ordem da página. O índice não infere nada: se uma seção
   nascer ou mudar de lugar, ela entra nesta lista junto. */
const SECOES: Secao[] = [
  { id: "esperar", rotulo: "Sobre" },
  { id: "diferenciais", rotulo: "Diferenciais" },
  { id: "ia", rotulo: "A IA" },
  { id: "pontos", rotulo: "Tipos de loja" },
  { id: "numeros", rotulo: "Números" },
];

export type Tema = "dark" | "light";

export function Landing({ tema }: { tema?: Tema }) {
  return (
    <Casca atual="franqueado" tema={tema}>
      {/* Herói: carta topográfica atrás do conteúdo. As curvas se riscam na
          entrada e a máscara apaga da esquerda para a direita conforme o bloco
          sai — os dois gestos no mesmo sentido. */}
      <Heroi>
        <header className="hold hero" id="topo">
          <div>
            <h1>
              Uma franquia que a <mark>IA opera</mark> junto com você.
            </h1>
            {/* O parágrafo longo do brief virou resumo: no herói ele
                      competia com a manchete e adiantava três seções que a página
                      já explica melhor logo abaixo. */}
            <p>
              Totens de personalização em pontos de alto fluxo. A IA atende o
              cliente, controla o estoque e reporta à matriz.
            </p>
            <div className="row">
              <a className="cta cta--lg" href={WHATSAPP}>
                Falar no WhatsApp
              </a>
              <a className="cta cta--lg cta--out" href="#numeros">
                Ver os números
              </a>
            </div>
          </div>
          <figure className="scope" style={{ margin: 0 }}>
            <Ph ratio="860 / 536" label="Header — malha ASCII com a marca" />
          </figure>
        </header>
      </Heroi>

      {/* A partir daqui o índice acompanha. O wrapper existe só para dar
            a ele um contêiner que começa nesta seção: sticky precisa de um
            pai, e o teto do índice é o topo deste bloco. */}
      <div className="corpo">
        <div className="indice-rail">
          <Indice secoes={SECOES} />
        </div>

        {/* Sobre a GRAVA.AI. A estrutura vem do bloco about-3 do shadcnblocks:
            título e descrição em duas colunas, uma peça grande, um cartão
            destacado ao lado e o painel de números embaixo.

            O que mudou na adaptação, e por quê:
            — sem Tailwind e sem shadcn, porque o projeto não usa nenhum dos
              dois e instalá-los reescreveria o sistema visual inteiro;
            — sem imagem de banco, porque o guardrail proíbe stock e ainda não
              existe fotografia da rede;
            — sem a faixa de logos de cliente e sem "300+ empresas atendidas",
              porque a franqueadora não forneceu nenhum desses dados. Inventar
              número de vitrine aqui é exatamente o que esta página se recusa a
              fazer, e o slot está montado esperando o dado real. */}
        <section className="hold sec sobre" id="esperar">
          {/* O apoio tinha quatro linhas e dizia três coisas — o que a marca é,
              o que o cliente faz e o que o franqueado compra. As duas primeiras
              a página conta nas seções seguintes, com mais espaço e melhor. O
              que resta aqui é a única que a manchete não diz sozinha. */}
          <div className="sec-cab">
            <h2>O que a rede vende não é a máquina.</h2>
            <p>É a operação inteira: quiosque, IA e abastecimento, já montados.</p>
          </div>

          <div className="sobre-grid">
            <figure className="sobre-peca">
              <Ph ratio="16 / 11" label="A unidade em operação" />
            </figure>

            <div className="sobre-lado">
              <article className="sobre-card">
                <Image
                  src="/brand/grava-mark.png"
                  alt=""
                  width={108}
                  height={128}
                  className="sobre-marca"
                />
                <div>
                  <h3>Transformando ideias em produtos personalizados</h3>
                  <p>
                    A tagline não é slogan: é a descrição do que acontece no
                    totem. A pessoa descreve, a IA desenha, a máquina grava.
                  </p>
                </div>
                <div className="sobre-acoes">
                  <Link className="link-saida" href="/institucional">
                    Conhecer a história
                  </Link>
                  <Link className="link-saida" href="/galeria">
                    Ver a galeria
                  </Link>
                </div>
              </article>

              <figure className="sobre-peca">
                <Ph ratio="4 / 3" label="Peça saindo do totem" />
              </figure>
            </div>
          </div>
        </section>

        <section className="hold sec" id="diferenciais">
          <div className="sec-cab">
            <h2>De quem é cada tarefa da operação.</h2>
            <p>Numa loja comum, tudo isto é problema do dono. Aqui, quase nada é.</p>
          </div>
          {/* A galeria de seis cartões saiu: dizia, em uma linha cada, o mesmo
              que a coluna da direita do comparativo diz — e o comparativo diz
              contra o quê. */}
          <HeadToHead />
        </section>

        {/* A IA e o totem numa seção só. Eram duas paradas do índice dizendo o
            mesmo assunto de ângulos diferentes: onde a IA trabalha, e o que
            acontece na máquina onde ela trabalha.

            A órbita substitui as quatro células e o circuito que existiam
            aqui. Base visual do bloco integrations-5, portada para o CSS do
            projeto — o original depende de Tailwind e shadcn, que não existem
            neste código. */}
        <section className="hold sec" id="ia">
          {/* "Todos com nome" saiu da manchete e virou o trabalho do apoio: na
              manchete era promessa, no apoio é a informação que a órbita logo
              abaixo comprova nome por nome. */}
          <div className="sec-cab">
            <h2>A IA trabalha em quatro lugares.</h2>
            <p>Quatro funções operando a unidade todo dia, cada uma com nome.</p>
          </div>

          <Orbita />
        </section>

        {/* O sistema fechando o circuito. Reativo à rolagem: a arte fica presa
            enquanto as seis estações passam ao lado dela. */}

        {/* Tipos de loja. Cada ponto tem uma lógica diferente de fluxo, e a
            unidade se comporta diferente em cada um. Os atributos são
            qualitativos de propósito: o cliente não forneceu número por tipo de
            ponto, e o slot de dado fica preparado para receber o real depois. */}
        <section className="hold sec" id="pontos">
          {/* A manchete é a frase da própria franqueadora — fica. O que encurtou
              foi a repetição do "gente", e o apoio ficou só com a informação que
              a tabela abaixo desenvolve: o que muda de um ponto para o outro. */}
          <div className="sec-cab">
            <h2>Gente em movimento, em busca de algo especial.</h2>
            <p>O que muda de um ponto para o outro é o tempo que a pessoa tem.</p>
          </div>

          <LojasComparativo />
        </section>

        <Numeros />

        {/* Fim do trilho do índice. O CTA fica fora do bloco de propósito:
            ele é o chão onde o índice chega, não mais uma parada numerada. */}
      </div>

      <footer className="hold close" id="falar">
        {/* A marca empilhada, que é a versão do documento do cliente para
              assinatura. No topo ela é símbolo mais wordmark em linha; aqui,
              onde a página assina, ela aparece inteira. */}
        <Image
          src="/brand/grava-stacked.png"
          alt="GRAVA.AI"
          width={293}
          height={183}
          className="close-logo"
        />
        <div className="close-duo">
          <div>
            <div className="sec-cab">
              <h2>Leve a unidade para a sua região.</h2>
              {/* A frase antiga dizia "não com um formulário". Com o formulário
                    ao lado, ela passou a contradizer a própria página: o que se
                    promete agora é que do outro lado tem gente, não que não
                    existe campo para preencher. A instrução de como usar o
                    formulário saiu daqui — ela já está escrita dentro dele. */}
              <p>Quem responde é quem opera a rede, não um atendente.</p>
            </div>
            <div className="row" style={{ marginTop: 0 }}>
              <a className="cta cta--lg" href={WHATSAPP}>
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <FormFranqueado />
        </div>
        <Rodape
          links={[
            { href: "/institucional", rotulo: "A marca" },
            { href: "#ia", rotulo: "A IA" },
            { href: "#pontos", rotulo: "Tipos de loja" },
            { href: "#numeros", rotulo: "Números" },
            { href: "/galeria", rotulo: "Galeria" },
          ]}
        />
      </footer>
    </Casca>
  );
}
