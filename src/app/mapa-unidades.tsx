/* Onde a rede está — mapa de São Paulo com as unidades.

   Substitui a seção que era uma grade de três placeholders ("A unidade em
   operação", "Peça saindo do totem") com um cartão de texto no meio. Aquilo
   mostrava molduras vazias esperando foto; isto mostra um dado que o franqueado
   quer de fato: onde já tem unidade, e o que abre perto dele.

   ───────────────────────────────────────────────────────────────────────────
   SEM JAVASCRIPT

   O mapa é interativo e não tem uma linha de script. Cada marcador é um `<g>`
   focalizável, e `:hover`/`:focus-visible` no CSS revelam a etiqueta. Isso é
   melhor que um estado em React por três motivos: funciona com teclado sem eu
   escrever nada, funciona antes do JavaScript carregar, e o componente continua
   sendo de servidor.

   A LISTA ABAIXO DO MAPA NÃO É REDUNDÂNCIA. Ela é onde o dado de fato mora: quem
   usa leitor de tela, quem está no celular e não consegue mirar um alvo de 14px,
   e o buscador — que indexa "Campinas" e "Ribeirão Preto" como texto, não como
   coordenada dentro de um SVG. O mapa é a leitura rápida; a lista é o conteúdo.

   ───────────────────────────────────────────────────────────────────────────
   OS DADOS SÃO DE EXEMPLO E PRECISAM SER SUBSTITUÍDOS

   Está tudo em `UNIDADES`, logo abaixo, e em nenhum outro lugar.

   As coordenadas das cidades são reais. O QUE NÃO É REAL é quais delas têm
   unidade, quais estão previstas e em quantos dias — isso a franqueadora
   precisa informar.

   Isto não é preciosismo: numa página de captação, unidade inventada no mapa é
   um candidato acreditando que existe loja na cidade dele. É a mesma regra que
   já vale para os números da rede, e o motivo de a seção "Diferenciais" ter sido
   extinta em vez de reescrita. */

import { CONTORNO_SP, MAPA_LARG, MAPA_ALT, projetar } from "./sp-geo";

type Unidade = {
  cidade: string;
  /* Coordenadas reais das cidades — estas podem ficar. */
  lat: number;
  lon: number;
  /* Isto é o que precisa vir da franqueadora. */
  estado: "aberta" | "prevista";
  /* Só para previstas: quantos dias até a entrega. */
  dias?: number;
  /* Opcional: o ponto, quando existir. Aparece na etiqueta. */
  ponto?: string;
};

const UNIDADES: Unidade[] = [
  { cidade: "São Paulo", lat: -23.5505, lon: -46.6333, estado: "aberta" },
  { cidade: "Campinas", lat: -22.9099, lon: -47.0626, estado: "aberta" },
  { cidade: "Santos", lat: -23.9608, lon: -46.3336, estado: "aberta" },
  { cidade: "Ribeirão Preto", lat: -21.1775, lon: -47.8103, estado: "aberta" },
  { cidade: "São José dos Campos", lat: -23.1791, lon: -45.8872, estado: "aberta" },
  { cidade: "Sorocaba", lat: -23.5015, lon: -47.4526, estado: "prevista", dias: 30 },
  { cidade: "São José do Rio Preto", lat: -20.8113, lon: -49.3758, estado: "prevista", dias: 45 },
  { cidade: "Bauru", lat: -22.3145, lon: -49.0606, estado: "prevista", dias: 60 },
  { cidade: "Presidente Prudente", lat: -22.1256, lon: -51.3889, estado: "prevista", dias: 90 },
];

/* Ordem de leitura da lista: abertas primeiro, e as previstas pela proximidade
   da entrega. É a ordem em que a informação interessa a quem está decidindo — o
   que já existe prova a rede, o que abre logo é a janela que está fechando. */
function ordenar(a: Unidade, b: Unidade) {
  if (a.estado !== b.estado) return a.estado === "aberta" ? -1 : 1;
  if (a.estado === "prevista") return (a.dias ?? 0) - (b.dias ?? 0);
  return a.cidade.localeCompare(b.cidade, "pt-BR");
}

function prazo(dias: number) {
  if (dias <= 30) return "em até 30 dias";
  if (dias <= 60) return `em ~${dias} dias`;
  return `em ~${Math.round(dias / 30)} meses`;
}

export function MapaUnidades() {
  const lista = [...UNIDADES].sort(ordenar);
  const abertas = UNIDADES.filter((u) => u.estado === "aberta").length;
  const previstas = UNIDADES.length - abertas;

  return (
    <div className="mapa">
      <div className="mapa-palco">
        <svg
          className="mapa-svg"
          viewBox={`0 0 ${MAPA_LARG} ${MAPA_ALT}`}
          role="img"
          aria-label={`Mapa de São Paulo com ${abertas} unidades em operação e ${previstas} previstas. A mesma informação está na lista abaixo.`}
        >
          <path className="mapa-estado" d={CONTORNO_SP} />

          {UNIDADES.map((u) => {
            const { x, y } = projetar(u.lat, u.lon);
            /* Etiqueta para o lado de dentro quando a cidade está na borda:
               no extremo oeste ou leste ela sairia do quadro. */
            const paraEsquerda = x > MAPA_LARG * 0.72;
            return (
              <g
                key={u.cidade}
                className={`mapa-ponto mapa-ponto--${u.estado}`}
                transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                tabIndex={0}
                role="img"
                aria-label={
                  u.estado === "aberta"
                    ? `${u.cidade}, unidade em operação`
                    : `${u.cidade}, prevista ${prazo(u.dias ?? 0)}`
                }
              >
                {/* Alvo de toque generoso e invisível: o ponto desenhado tem 5px,
                    que ninguém acerta com o dedo. */}
                <circle className="mapa-alvo" r={22} />
                <circle className="mapa-halo" r={13} />
                <circle className="mapa-pino" r={5} />

                <g
                  className="mapa-etiqueta"
                  transform={`translate(${paraEsquerda ? -14 : 14} 0)`}
                >
                  <text className="mapa-cidade" textAnchor={paraEsquerda ? "end" : "start"}>
                    {u.cidade}
                  </text>
                  <text
                    className="mapa-prazo"
                    y={20}
                    textAnchor={paraEsquerda ? "end" : "start"}
                  >
                    {u.estado === "aberta" ? "em operação" : prazo(u.dias ?? 0)}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        <p className="mapa-dica" aria-hidden="true">
          Passe o cursor — ou use Tab — sobre um ponto.
        </p>
      </div>

      <div className="mapa-lado">
        <ul className="mapa-legenda">
          <li>
            <span className="mapa-chave mapa-chave--aberta" aria-hidden="true" />
            {abertas} em operação
          </li>
          <li>
            <span className="mapa-chave mapa-chave--prevista" aria-hidden="true" />
            {previstas} com praça definida
          </li>
        </ul>

        {/* Onde o dado realmente mora. Ver o comentário do topo do arquivo. */}
        <ol className="mapa-lista">
          {lista.map((u) => (
            <li key={u.cidade} className={`mapa-item mapa-item--${u.estado}`}>
              <span className="mapa-item-cidade">{u.cidade}</span>
              <span className="mapa-item-estado">
                {u.estado === "aberta" ? "Em operação" : prazo(u.dias ?? 0)}
              </span>
              {u.ponto ? <span className="mapa-item-ponto">{u.ponto}</span> : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
