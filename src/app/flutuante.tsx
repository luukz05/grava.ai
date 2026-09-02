/* Par flutuante do canto inferior esquerdo: pedir a apresentação, e voltar ao
   começo.

   O primeiro já foi "Falar com especialista", abrindo o WhatsApp com uma
   mensagem pronta. Virou âncora para o formulário do fechamento junto com os
   outros CTAs: o WhatsApp deixou de ser o primeiro contato e passou a ser o
   segundo, feito pela operação depois do e-mail.

   Duas decisões que o resto da página impõe:

   — no celular já existe a barra fixa com "Receber apresentação" ocupando a
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

import { IcoEnvelope, IcoTopo } from "./icons";
import { ANCORA_FORM, CTA_ROTULO } from "./lead";

export function Flutuante() {
  return (
    <div className="flut">
      <a className="cta flut-falar" href={ANCORA_FORM}>
        <IcoEnvelope />
        <span>{CTA_ROTULO}</span>
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
