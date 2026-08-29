/* Par flutuante do canto inferior esquerdo: falar com quem opera a rede, e
   voltar ao começo.

   Duas decisões que o resto da página impõe:

   — no celular já existe a barra fixa com "Falar no WhatsApp" ocupando a
     largura toda, no alcance do polegar. Repetir o mesmo destino num flutuante
     em cima dela seria o terceiro botão idêntico na mesma tela, então abaixo
     de 780px só o de voltar ao topo aparece;
   — os dois usam as classes de botão da página (`.cta` e `.cta--out`) em vez
     de cor e tipografia próprias: assim seguem a paleta da página, o hover,
     o estado ativo e a fonte pelo mesmo caminho que todos os outros botões. O
     `.flut-*` só cuida da forma e da posição.

   O botão de topo não existe no primeiro viewport: aparecer antes de haver o
   que desfazer é ruído. Quem revela é o CSS, por posição de rolagem — sem
   JavaScript, sem ouvinte de scroll, sem estado. */

import { IcoWhatsApp, IcoTopo } from "./icons";

const WHATSAPP =
  "https://wa.me/5515996610916?text=" +
  encodeURIComponent(
    "Olá! Vim pelo site e quero falar com um especialista sobre a franquia GRAVA.AI.",
  );

export function Flutuante() {
  return (
    <div className="flut">
      <a className="cta flut-falar" href={WHATSAPP}>
        <IcoWhatsApp />
        <span>Falar com especialista</span>
      </a>

      {/* O tamanho da seta vem do wrapper, e não de uma regra em `svg`: dentro
          de um botão em grid o ícone não tem tamanho intrínseco para o CSS
          esticar, e sem uma caixa própria ele encolhia para o mínimo. */}
      <a
        className="cta cta--out flut-topo"
        href="#topo"
        aria-label="Voltar ao início da página"
      >
        <span className="flut-seta">
          <IcoTopo />
        </span>
      </a>
    </div>
  );
}
