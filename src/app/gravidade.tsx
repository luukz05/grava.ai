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
import Image from "next/image";
import { Marca } from "./icons";

type Peca = {
  src: string;
  largura: number;
  altura: number;
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
};

/* A ordem NÃO é a de chegada das fotos: ela alterna silhueta — bojuda, fina,
   larga, fina, bojuda. Duas peças finas seguidas trocam uma linha inclinada por
   outra linha inclinada, e a troca some; o que se lê como troca é a mudança de
   massa no quadro. */
const PECAS: Peca[] = [
  {
    src: "/produtos/copo.png",
    largura: 523,
    altura: 900,
    escala: 72,
    giro: 24,
    rotulo: "Copo térmico · 500 ml",
    leitura: "Inox escovado · hexágono gravado em 38 s",
  },
  {
    src: "/produtos/faca.png",
    largura: 425,
    altura: 900,
    escala: 78,
    giro: -30,
    rotulo: "Faca de chef · 20 cm",
    leitura: "Aço inox · texto gravado em 26 s",
  },
  {
    src: "/produtos/sacola.png",
    largura: 622,
    altura: 900,
    /* A mais baixa da fila, e por ser larga: na altura das outras a sacola
       ocupa quase o dobro de área, e o quadro passa a ser sobre ela. */
    escala: 66,
    giro: -12,
    rotulo: "Ecobag · lona de algodão",
    leitura: "Tecido natural · marca gravada em 30 s",
  },
  {
    src: "/produtos/caneta.png",
    largura: 446,
    altura: 900,
    escala: 76,
    /* Contrário à diagonal da foto, e quase todo: a caneta chega inclinada como
       a faca chega, e duas linhas finas no mesmo ângulo em cena viram a mesma
       peça. Aqui ela levanta e fica com só um resto de inclinação — é a peça
       mais vertical da fila, que é o contraste que faltava. */
    giro: 20,
    rotulo: "Caneta · corpo em inox",
    leitura: "Inox escovado · texto gravado em 12 s",
  },
  {
    src: "/produtos/garrafa.png",
    largura: 528,
    altura: 900,
    escala: 72,
    giro: -18,
    rotulo: "Garrafa térmica · 750 ml",
    leitura: "Inox escovado · hexágono gravado em 42 s",
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
            key={peca.src}
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
                width={peca.largura}
                height={peca.altura}
                /* A primeira peça é o que se vê no primeiro quadro acima da
                   dobra; a segunda pode esperar a rede. */
                priority={i === 0}
                sizes="(max-width: 900px) 60vw, 30vw"
              />
            </span>

            {/* A fala da IA sobre a peça, e a divisão que a traz.

                É a forma de conversa e não de etiqueta: o avatar redondo com a
                marca à esquerda, o bico, e a pílula com o que ela reconheceu.
                Quem monta a leitura como legenda flutuante está dizendo "eis os
                dados"; montada como fala, ela diz quem está falando — e o
                assunto desta página é justamente que existe alguém operando.

                A MEIOSE SEM METABALL. O caminho conhecido para duas formas se
                fundirem e se destacarem é o filtro `goo` — borrar o grupo e
                puxar o alfa no contraste. Ele foi descartado por dois motivos, e
                o segundo é o que decide: o filtro pega o texto junto e o entrega
                borrado, o que obrigaria a duplicar a geometria em duas camadas
                (formas filtradas embaixo, texto nítido em cima) e a mantê-las
                alinhadas na mão para sempre.

                O que está aqui não precisa de filtro nenhum: as duas formas têm
                as pontas totalmente arredondadas e o preenchimento OPACO, então
                enquanto se sobrepõem elas são uma massa só — e o pescoço que
                estrangula no meio da separação é a própria interseção de duas
                formas redondas se afastando. A geometria já faz o gesto; o
                filtro só cobraria por ele.

                O balão fica fora do wrapper da deriva de propósito: ele é
                leitura da máquina sobre a peça, não parte da peça. Objeto
                flutua; medição não. */}
            <div className="grav-hud">
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
