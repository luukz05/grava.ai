"use client";

/* O painel do herói — peças gravadas flutuando em gravidade zero.

   Aqui havia um `<Ph>`: um retângulo tracejado de 860×536 esperando a malha
   ASCII com a marca. Ele cumpriu o papel dele — segurar a proporção enquanto
   o layout era lido — e sai agora que existe arte de verdade para pôr no
   lugar.

   O QUE ENTRA NO LUGAR. Duas camadas, e a ordem entre elas é o efeito:

   — atrás, três massas líquidas. São formas de raio variável, borradas e
     translúcidas, que se deformam e derivam em tempos primos entre si. Nunca
     repetem a mesma composição, e é isso que separa "fundo animado" de "fundo
     em ciclo": com 19s, 23s e 29s, o padrão só se fecha depois de horas.
     Elas não são decoração solta — são o halo que destaca a peça do fundo
     escuro, que de outro modo comeria o metal escovado;

   — na frente, as peças. Uma de cada vez, trocando sozinha. A que entra vem de
     baixo, um pouco menor e desfocada, como quem se aproxima da lente; a que
     sai continua subindo e se apaga. Enquanto está em cena, ela deriva — meio
     por cento de translação, dois graus de giro — porque objeto parado no ar
     lê como objeto colado, e o que se quer aqui é peso zero.

   POR QUE NÃO É SÓ UM CARROSSEL. A troca não tem controle, não tem ponto e
   não tem seta: não é navegação, é vitrine. Dar controle a ela seria prometer
   um catálogo que o herói não vai entregar — o catálogo tem página própria, no
   menu. Aqui a peça só precisa dizer "isto é o que sai da máquina".

   ACESSIBILIDADE. O conjunto é uma imagem só para quem lê por leitor de tela:
   o rótulo está no contêiner, as peças vão com `alt` vazio. Descrever uma a uma
   fotos que se alternam sozinhas viraria cinco leituras para a mesma ideia.

   O `role="img"` no contêiner também torna o conteúdo dele presentacional, e
   isso vale para o texto do balão de leitura: ele não é anunciado, e é assim
   que deve ser. Aquele texto é legenda de ilustração — quem depende do leitor
   de tela recebe a mesma informação em prosa nas seções abaixo, e ouvir "copo
   térmico 500 ml, inox escovado, 38 s" a cada 4,6s seria ruído, não conteúdo. */

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Marca } from "./icons";

/* As fotos são IMPORTADAS, e não caminhos para `public/`. A diferença é a URL
   que sai no HTML: importada, o arquivo vai para `_next/static/media` com o
   HASH DO CONTEÚDO no nome, e trocar a foto troca a URL.

   Isso não é preferência de organização — é o conserto de um bug. Servido de
   `public/`, o endereço é `/produtos/sacola.png` para sempre, e o otimizador
   guarda o resultado sob `url + largura + qualidade`. Trocamos a foto da sacola
   e o desktop continuou mostrando a antiga por horas enquanto o celular já via a
   nova: são larguras diferentes pedidas pelo `sizes`, então uma tinha entrada no
   cache e a outra não. Com o hash, a entrada velha simplesmente não é mais
   pedida por ninguém.

   O preço é sair de `public/`: o mesmo arquivo lá seria servido nos DOIS
   endereços e iria no pacote duas vezes. */
import copo from "./produtos/copo.png";
import faca from "./produtos/faca.png";
import sacola from "./produtos/sacola.png";
import caneta from "./produtos/caneta.png";
import garrafa from "./produtos/garrafa.png";

type Peca = {
  /* A imagem importada, não o caminho: ela carrega as medidas junto, e o
     `<Image>` tira `width` e `height` dela. Antes esses dois números eram
     copiados na mão aqui embaixo, e recortar a foto de novo com outra largura
     deixava a proporção mentindo até alguém reparar. */
  src: StaticImageData;
  /* Altura da peça dentro do palco, em porcentagem. A faca é mais comprida que
     o copo e, na mesma altura, dominaria o quadro — o que iguala as duas aos
     olhos é a área ocupada, não a medida.

     Os valores contam com o giro: peça girada ocupa uma caixa maior que ela
     mesma (`h·cos + l·sen`), então quem gira mais entra menor. */
  escala: number;
  /* Giro de base, somado à deriva. As fotos vieram todas do mesmo ensaio e com a
     mesma diagonal — todas caindo para o mesmo lado —, e peças inclinadas do
     mesmo jeito em sequência leem como uma peça só que troca de forma. Aqui o
     giro alterna de sinal entre vizinhas da fila: a troca passa a ser uma
     mudança de eixo, e não só de silhueta.

     ESPELHAR seria o caminho curto, e não serve: todas as peças têm a marca
     gravada — o hexágono com o G no copo, na garrafa e na sacola, "GRAVA.AI" na
     lâmina e na caneta —, e horizontal invertida a marca vira marca errada.
     Chegamos no mesmo lugar pelo giro, que não mexe na leitura de nada. */
  giro: number;
  /* O que a IA diz sobre a peça. Duas linhas, dois papéis: `rotulo` identifica
     — é a peça que a máquina reconheceu —, `leitura` é o que ela extraiu daí.

     Não cabe uma terceira. O balão é uma pílula, e pílula com três linhas de
     larguras diferentes deixa de ser pílula.

     OS VALORES SÃO DE EXEMPLO. Tempo de gravação e medida de peça saem do
     catálogo da franqueadora, e o catálogo ainda não veio. Estão plausíveis e
     conservadores; confirmar com o cliente antes de publicar. */
  rotulo: string;
  leitura: string;
  /* Onde a fala da IA pousa em cima do palco, e para que lado ela se abre.

     Existe porque o balão parado no mesmo canto nas cinco peças lê como legenda
     fixa do quadro — o olho aprende o lugar dela em duas trocas e para de
     associar o texto à peça. Movendo, cada aparição volta a ser um evento sobre
     AQUELA peça.

     Não é aleatório e não pode ser: o lugar é escolhido peça a peça, no vão que
     aquela silhueta deixa. Sorteio a cada troca acabaria pondo a fala em cima da
     lâmina ou fora do quadro, e ainda tiraria a única coisa que o movimento
     precisa ter — ser sempre igual para a mesma peça. */
  hud: {
    /* De que borda o avatar se prende. Ancorado à direita, a pílula cresce para
       a esquerda; é o que mantém o texto dentro da cena dos dois lados. */
    lado: "esq" | "dir";
    /* Distância da borda ancorada e do rodapé do palco, em porcentagem. */
    x: number;
    y: number;
  };
};

/* A ordem NÃO é a de chegada das fotos: ela alterna silhueta — bojuda, fina,
   larga, fina, bojuda. Duas peças finas seguidas trocam uma linha inclinada por
   outra linha inclinada, e a troca some; o que se lê como troca é a mudança de
   massa no quadro. */
const PECAS: Peca[] = [
  {
    src: copo,
    escala: 72,
    giro: 24,
    rotulo: "Copo térmico · 500 ml",
    leitura: "Inox escovado · hexágono gravado em 38 s",
    /* Alto e à direita: o copo é largo no meio e estreito no topo, então em cima
       sobra quadro do lado para onde ele NÃO cai. */
    hud: { lado: "esq", x: 0, y: 5 },
  },
  {
    src: faca,
    escala: 78,
    giro: -30,
    rotulo: "Faca de chef · 20 cm",
    leitura: "Aço inox · texto gravado em 26 s",
    /* A faca atravessa o quadro na diagonal e encosta a ponta embaixo à direita.
       O canto que sobra é o de baixo à esquerda, e bem embaixo. */
    hud: { lado: "dir", x: 1, y: 7 },
  },
  {
    src: sacola,
    /* A mais baixa da fila, e por ser larga: na altura das outras a sacola
       ocupa quase o dobro de área, e o quadro passa a ser sobre ela. */
    escala: 66,
    giro: -12,
    rotulo: "Ecobag · lona de algodão",
    leitura: "Tecido natural · marca gravada em 30 s",
    /* A sacola é a peça mais larga e ocupa o meio do quadro inteiro. Nenhuma
       altura à esquerda fica limpa; o que sobra é o rodapé à direita, passada a
       barra da lona. */
    hud: { lado: "esq", x: 1, y: 4 },
  },
  {
    src: caneta,
    escala: 76,
    /* Contrário à diagonal da foto, e quase todo: a caneta chega inclinada como
       a faca chega, e duas linhas finas no mesmo ângulo em cena viram a mesma
       peça. Aqui ela levanta e fica com só um resto de inclinação — é a peça
       mais vertical da fila, que é o contraste que faltava. */
    giro: 20,
    rotulo: "Caneta · corpo em inox",
    leitura: "Inox escovado · texto gravado em 12 s",
    /* A caneta é a peça mais estreita e fica quase em pé no meio: sobra quadro
       dos dois lados, e é a única em que o alto à esquerda fica limpo. */
    hud: { lado: "dir", x: 1, y: 66 },
  },
  {
    src: garrafa,
    escala: 72,
    giro: -18,
    rotulo: "Garrafa térmica · 750 ml",
    leitura: "Inox escovado · hexágono gravado em 42 s",
    /* A garrafa termina alto — o fundo dela não chega ao rodapé —, e é isso que
       libera a faixa de baixo inteira. À esquerda, que é para onde ela se
       inclina e portanto onde a base está mais recuada. */
    hud: { lado: "esq", x: 0, y: 86 },
  },
];

/* Cada peça fica em cena esse tempo. Longo de propósito: a troca é um evento de
   canto de olho, e quem está lendo a manchete não deve ser puxado para cá. */
const PERMANENCIA = 4600;

export function Gravidade() {
  const [atual, setAtual] = useState(0);
  const palco = useRef<HTMLDivElement>(null);

  /* O ciclo só corre com o herói na tela. Fora dela ele não é visto, e um
     `setInterval` disparando troca de estado a cada 4,6s no rodapé da página é
     re-render sem nenhum espectador. O observador também cobre a aba em
     segundo plano na maioria dos navegadores, que já engavetam o timer. */
  useEffect(() => {
    const alvo = palco.current;
    if (!alvo || PECAS.length < 2) return;

    let timer: ReturnType<typeof setInterval> | undefined;

    const parar = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };

    const correr = () => {
      if (timer) return;
      timer = setInterval(
        () => setAtual((i) => (i + 1) % PECAS.length),
        PERMANENCIA,
      );
    };

    const olho = new IntersectionObserver(
      ([entrada]) => (entrada.isIntersecting ? correr() : parar()),
      { threshold: 0.15 },
    );
    olho.observe(alvo);

    return () => {
      olho.disconnect();
      parar();
    };
  }, []);

  return (
    <div
      className="grav"
      role="img"
      aria-label="Peças gravadas pela rede: copo térmico, faca de chef, ecobag de lona, caneta e garrafa térmica, todas com a marca gravada a laser."
    >
      {/* Os ecos de silhueta. Três e não dois: com dois o olho lê um par que se
          cruza, e o cruzamento tem período visível.

          Dois elementos por eco, e a divisão de trabalho entre eles é o que faz
          o hexágono continuar hexágono: `clip-path` é aplicado DEPOIS de
          `filter` no mesmo elemento, então recorte e borrão juntos numa caixa só
          dariam um hexágono de aresta dura com o miolo borrado. Com o recorte no
          filho e o borrão no pai, o pai borra um hexágono já recortado — que é a
          ordem que se quer. */}
      <div className="grav-liquido" aria-hidden="true">
        <span className="grav-massa grav-massa--a">
          <span className="grav-hex" />
        </span>
        <span className="grav-massa grav-massa--b">
          <span className="grav-hex" />
        </span>
        <span className="grav-massa grav-massa--c">
          <span className="grav-hex" />
        </span>
      </div>

      <div className="grav-palco" ref={palco}>
        {PECAS.map((peca, i) => (
          <div
            key={peca.src.src}
            className="grav-peca"
            data-ativo={i === atual ? "" : undefined}
            style={
              {
                "--escala": `${peca.escala}%`,
                "--giro": `${peca.giro}deg`,
              } as React.CSSProperties
            }
          >
            {/* A deriva mora no wrapper, e a entrada e a saída moram na peça:
                são duas transformações com tempos e razões diferentes, e
                empilhá-las na mesma caixa faria uma cancelar a outra. */}
            <span className="grav-deriva" style={{ animationDelay: `${i * -7}s` }}>
              <Image
                src={peca.src}
                alt=""
                /* TODAS carregam de saída, e nenhuma é `lazy`. Duas razões:

                   1. o adiamento nem chega a acontecer aqui. As peças inativas
                      estão em `opacity: 0` desde o primeiro quadro, e o Chrome
                      não dispara o carregamento adiado de imagem dentro de
                      subárvore transparente — nem estando em pleno viewport.
                      Resultado: a peça só ia buscar a foto no instante em que
                      entrava em cena, e entrava BRANCA;
                   2. mesmo que disparasse, adiar não pagaria. As cinco aparecem
                      dentro de 23 s sem que ninguém precise rolar nada — é um
                      ciclo, não um catálogo. Adiar aqui é trocar tráfego que
                      viria de qualquer jeito por buraco no meio da vitrine.

                   O que separa a primeira das outras é a PRIORIDADE, não o
                   momento: ela é a candidata a LCP e vai na frente, as outras
                   entram na fila atrás de todo o resto da página.

                   Sem `priority`: no Next 16 ele saiu em favor de `preload`, e
                   a própria doc diz para preferir `loading`/`fetchPriority` a
                   `preload` — que é o que está aqui. */
                loading="eager"
                fetchPriority={i === 0 ? "high" : "low"}
                sizes="(max-width: 900px) 60vw, 30vw"
              />
            </span>

            {/* A fala da IA sobre a peça, e a ordem em que ela se monta.

                É a forma de conversa e não de etiqueta: o avatar redondo com a
                marca, o bico, e a pílula com o que ela reconheceu. Quem monta a
                leitura como legenda flutuante está dizendo "eis os dados";
                montada como fala, ela diz quem está falando — e o assunto desta
                página é justamente que existe alguém operando.

                A ORDEM DOS TRÊS é o que carrega esse sentido, e ela está no CSS
                junto das animações: primeiro o avatar, depois a pílula abrindo a
                partir dele, e só então o bico e o texto. Chegar tudo junto seria
                uma placa aparecendo; chegar ao contrário — texto primeiro, marca
                depois — diria que a legenda já estava pronta e a máquina veio
                assinar embaixo.

                O PREENCHIMENTO É OPACO nos três, e isso não é escolha de estilo.
                O bico entra meia diagonal por baixo da pílula: com superfície
                translúcida, a área comum dobra o alfa e desenha a costura entre
                as duas peças exatamente onde elas deviam ler como uma só. Opaco,
                a junção some sem precisar de filtro nenhum — nada de `goo`, que
                ainda borraria o texto junto e obrigaria a duplicar a geometria em
                duas camadas para manter a leitura nítida.

                O balão fica fora do wrapper da deriva de propósito: ele é
                leitura da máquina sobre a peça, não parte da peça. Objeto
                flutua; medição não. */}
            <div
              className="grav-hud"
              data-lado={peca.hud.lado}
              style={
                {
                  "--hud-x": `${peca.hud.x}%`,
                  "--hud-y": `${peca.hud.y}%`,
                } as React.CSSProperties
              }
            >
              <div className="grav-hud-ia">
                <Marca />
              </div>
              {/* O bico. Losango girado, tirado do fluxo por margem negativa
                  para meia diagonal entrar por baixo da pílula — o que sobra
                  fora é o triângulo apontando para quem está falando. Fica FORA
                  do balão porque o balão é recortado por `clip-path` na entrada,
                  e recorte que termina na borda da caixa cortaria o bico fora
                  no último quadro. */}
              <span className="grav-hud-bico" />
              <div className="grav-hud-fala">
                <span className="grav-hud-rotulo">{peca.rotulo}</span>
                <span className="grav-hud-leitura">{peca.leitura}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
