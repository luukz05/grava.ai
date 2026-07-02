# Proposta Comercial — Sistema GRAVA.AI

> Documento de referência para estruturar a venda e a evolução do site/sistema de
> captação de franqueados da GRAVA.AI. Valores em R$ (mercado BR, 2026) — são
> **faixas de referência**; escolha o valor final conforme o porte do cliente,
> concorrência e seu posicionamento.
>
> Legenda: **Setup** = pagamento único de implantação · **Mensal** = recorrência.

---

## 1. Visão geral do que já existe

Site institucional + landing page de franquia (Next.js), com:

- **Página institucional** (a empresa, o produto, a IA, onde atua)
- **LP "Seja um Franqueado"** — funil de conversão (hero → modelos de loja →
  investimento → prova social → FAQ → formulário)
- Estrutura de CRO pensada para **tráfego pago**
- Assets reais da marca, balão de WhatsApp, footer com redes, deploy na Vercel

**Estado atual:** protótipo funcional de média fidelidade. O formulário ainda não
envia para lugar nenhum e há conteúdos placeholder — pontos endereçados nos
módulos abaixo.

---

## 2. Planos principais

### 🅰️ Plano A — Presença Digital

> *"Seu site sempre no ar, atualizado e ajustável — sem dor de cabeça técnica."*

| Item | Valor |
|---|---|
| **Setup (entrega)** | **R$ 4.500** |
| **Mensalidade** | **R$ 800/mês** |

**Setup inclui:**
- Finalização do site e do formulário (envio para WhatsApp/e-mail)
- Substituição dos placeholders por conteúdo real
- Domínio próprio + deploy + SSL

**Mensalidade inclui:**
- Hospedagem, SSL e monitoramento de uptime geridos + **configuração e gestão do
  domínio** (o domínio é do cliente — registro e pagamento por conta dele, ver §6)
- Monitoramento de uptime e **proteção contra vulnerabilidades de dependências**
- **Atualização contínua de dependências** e correções de segurança
- **Alterações de conteúdo** (textos/imagens) sob demanda — resposta em até
  24h úteis (sem limite de quantidade; execução conforme fila)
- Até **5 alterações estruturais** OU **1 página nova** por mês (conteúdo
  fornecido pelo cliente)
- **Suporte prioritário:** 24h para indisponibilidade (site fora do ar),
  48h úteis para demais solicitações
- Backup e migrações de infraestrutura quando necessário

> **Definições (evitam ruído):** *alteração estrutural* = reestruturar uma seção
> existente (layout, novos blocos). *Página nova* = uma rota adicional com
> conteúdo fornecido pelo cliente. Migração de hospedagem por escolha do cliente
> (não por necessidade técnica) é **projeto à parte**, não entra na mensalidade.

**Não inclui:** marketing, integrações complexas, produção de conteúdo,
migrações de host por capricho (fora as por necessidade técnica).
**Contrato sugerido:** 12 meses.

---

### 🅱️ Plano B — Aquisição de Franqueados

> *"Eu não vendo site, vendo franqueados. O site é a máquina; eu gero e otimizo
> os leads."*

| Item | Valor |
|---|---|
| **Setup (entrega)** | **R$ 5.500** |
| **Mensalidade (gestão)** | **R$ 1.500/mês** |
| **Verba de anúncio** | **À parte** (paga pelo cliente às plataformas) — sugestão inicial R$ 1.500 – R$ 5.000/mês |

> Clientes maiores / verba alta podem ir a R$ 2.000–2.500/mês. R$ 1.500 é o
> ponto de entrada com **4 criativos de anúncio/mês** inclusos.

**Setup inclui** (tudo do Plano A **+**):
- **Rastreamento server-side**: Meta Pixel + **Conversions API (CAPI)** + GA4 +
  evento de lead — disparado via **Server Actions do próprio Next** (garante o
  dado mesmo com bloqueio de cookie/iOS; sem servidor separado)
- **Integração dos leads**: CRM / planilha / WhatsApp automático
- Configuração de campanhas + otimização de conversão da LP

**Mensalidade inclui:**
- Manutenção do site (tudo do Plano A)
- **Gestão de tráfego pago** (Meta/Google Ads) + **produção de até 4 criativos de
  anúncio estáticos/mês** (imagem, sobre template da marca) + otimização
- **Relatório mensal** de leads e custo por lead (CPL)

> **Criativo de anúncio ≠ postagem orgânica.** Os 4 criativos são artes
> **estáticas** que rodam *dentro das campanhas*, feitas a partir de fotos/base
> fornecidas pelo cliente. Postagens no perfil (feed/stories) são **social media
> orgânico** — módulo à parte (ver §3). **Vídeo/Reel não está incluído** por
> ora; se o cliente pedir, vira escopo separado. Se ele fornecer os próprios
> criativos, a mensalidade cai (ver playbook).

**Regra de ouro:** a verba de mídia **nunca** sai da sua mensalidade — é um custo
do cliente, pago direto às plataformas.
**Contrato sugerido:** 6–12 meses (tráfego precisa de tempo para maturar).

#### Condição de lançamento — Mês 1 (implantação e calibragem)

Os primeiros 30 dias são de **implantação e calibragem**: instalação do
rastreamento, subida das primeiras campanhas e testes para encontrar o que
converte. Oferecido como **condição de lançamento**, com a **gestão sem custo**
nos primeiros 30 dias (a partir do dia 31, mensalidade cheia).

> **Como comunicar:** "Mês 1 é de implantação e calibragem — ofereço a gestão
> como cortesia de lançamento." **Nunca** "é grátis porque estou aprendendo".
> A percepção de valor é o que sustenta o preço dos meses seguintes.

**Regras da cortesia (proteja seu valor):**
- **A verba de anúncio continua sendo paga pelo cliente** — a cortesia é só a
  *gestão*, não a mídia.
- **O setup é cobrado normalmente** — é entrega real, não entra na cortesia.
- **Time-boxed e no contrato:** "cortesia de 30 dias; a partir do dia 31,
  R$ X/mês."
- **Condicione ao compromisso:** a cortesia vale mediante contrato de 6+ meses.
- **Mês 1 é teste, não pico:** verba de mídia menor e expectativa de calibragem
  (não prometa resultado máximo logo de cara).
- **Alternativa mais segura que 100% grátis:** mês 1 com **50% de desconto** — reduz
  o risco do cliente sem zerar seu valor.

> **O verdadeiro pagamento do Mês 1 é o case.** Este é seu primeiro cliente — os
> leads gerados viram **portfólio/prova social** para vender o próximo por preço
> cheio. Isso vale mais que a primeira mensalidade.

#### E se o Mês 1 não performar?

Alinhe isto **por escrito, antes de começar** — evita mal-entendido e protege a
relação.

**A meta do Mês 1 é lead, não venda.** Ninguém decide investir ~R$ 100 mil em 30
dias — o ciclo de decisão de uma franquia é longo (semanas a meses). Portanto o
sucesso do Mês 1 se mede por **leads qualificados a um custo viável (CPL)**, não
por franquia vendida. Combine a meta assim: *"Mês 1 = gerar X leads a um CPL de
até R$ Y."*

**Mesmo sem venda, isto FICA (nada é perdido):**

| Ativo | Por que vale |
|---|---|
| Rastreamento instalado (Pixel, GA4) | Mês 2 já começa medindo, sem recomeçar |
| Públicos aquecidos (remarketing/lookalike) | Quem visitou e não converteu pode ser reimpactado |
| Criativos e ofertas testados | Você já sabe o que chama atenção e o que não |
| Dados de CPL e público | Sabe quanto custa um lead e onde ele está |
| Leads no funil | Podem virar franquia nos meses seguintes |
| Setup já pago + seu aprendizado | Você não trabalhou de graça; saiu do zero |

**Como blindar o resultado:**
- **Verba de mídia pequena no teste** — limita o risco financeiro do cliente.
- **Marcos semanais** — corrija oferta/público/criativo/LP *durante* o mês, não
  descubra o problema só no dia 30.
- **Critério objetivo de continuidade:** CPL dentro da meta → segue para a
  mensalidade cheia; fora da meta → apresenta os dados e propõe ajuste.
- **Transparência > sumiço:** mostrar "o que testamos, o que aprendemos e o
  próximo passo" constrói confiança — o cliente costuma topar seguir.

> O único jeito de realmente "não conseguir nada" é gastar sem rastreamento (no
> escuro) ou desistir no dia 30 sem ler os dados. Com o setup certo, todo Mês 1
> vira **dado + ativo + aprendizado** — o combustível que faz o Mês 2 dar lucro.

#### Upsell: modelo por performance
Reduza a mensalidade fixa e cobre **por resultado**:
- **Por lead qualificado:** R$ 20 – R$ 50 por lead
- **Por franquia vendida:** % sobre a taxa de franquia (a combinar)

Franqueadora adora — paga por resultado, e seu teto de ganho sobe muito.

---

### Comparação

| | Plano A | Plano B |
|---|---|---|
| Foco | Presença / manutenção | **Resultado (leads)** |
| Setup | R$ 4.500 | R$ 5.500 |
| Mensal | R$ 800 | R$ 1.500 + verba |
| Recorrência | Baixa | **Alta** |
| Onde está o lucro | Cobre custos | **O negócio de verdade** |

---

## 3. Módulos adicionais (à la carte)

Vendidos avulsos para ir **aprimorando o sistema** ao longo do tempo. Ótimos como
upsell recorrente e para aumentar o ticket sem recomeçar do zero.

### Conversão & Marketing
| Módulo | O que entrega | Setup | Mensal |
|---|---|---|---|
| **Captura de lead avançada** | Form → CRM/WhatsApp automático, qualificação, UTM | R$ 500 – 1.500 | — |
| **Rastreamento & Analytics** | Pixel, GA4, GTM, painel de conversões | R$ 500 – 1.200 | — |
| **CRO contínuo / A-B testing** | Testes de headline, layout e CTA para subir conversão | — | R$ 500 – 1.500 |
| **Landing pages por campanha/região** | LP dedicada por anúncio/cidade (message match) | R$ 600 – 1.500 cada | — |
| **Automação de WhatsApp / chatbot** | Atendimento e qualificação 24/7 do lead | R$ 1.500 – 4.000 | R$ 200 – 600 |
| **E-mail / nutrição de leads** | Sequência automática para leads frios | R$ 800 – 2.000 | R$ 300 – 800 |
| **Social media orgânico** | Postagens no perfil (feed/stories): calendário, design, copy e agendamento | R$ 500 – 1.500 | R$ 800 – 2.500 |

> **Social media orgânico é serviço distinto do tráfego pago** — skills, entrega
> e ritmo diferentes. Nunca vai "de brinde" junto do Plano B: é trabalho
> recorrente pesado e o oposto do plano de desmame (§6). Vendido só como módulo.

### Conteúdo & SEO
| Módulo | O que entrega | Setup | Mensal |
|---|---|---|---|
| **Blog + SEO** | CMS (MDX/Sanity), estrutura de SEO, rota /blog/[post] | R$ 1.500 – 3.500 | — |
| **Produção de conteúdo** | Artigos otimizados para busca orgânica | — | R$ 400 – 1.200 (4 posts) |
| **Páginas legais (LGPD)** | Política de Privacidade, Termos, cookies | R$ 300 – 800 | — |
| **Multilíngue (i18n)** | Site em 2+ idiomas | R$ 1.000 – 2.500 | — |

### Sistema & Escala
| Módulo | O que entrega | Setup | Mensal |
|---|---|---|---|
| **Dashboard de leads** | Painel próprio para a franqueadora acompanhar leads | R$ 3.000 – 8.000 | R$ 300 – 800 |
| **Portal do franqueado** | Área logada: materiais, pedidos, indicadores | R$ 4.000 – 12.000 | R$ 400 – 1.200 |
| **Integração CRM** | RD Station / HubSpot / Pipedrive | R$ 800 – 2.500 | — |
| **Painel de indicadores** | Métricas de franquia, ranking de unidades | R$ 2.000 – 6.000 | R$ 300 – 800 |

### Marca & Design
| Módulo | O que entrega | Setup |
|---|---|---|
| **Subir fidelidade visual** | Fontes da marca, animações, acabamento premium | R$ 1.000 – 3.000 |
| **Identidade / rebranding** | Logo, paleta, manual de marca | R$ 1.500 – 5.000 |
| **Banco de imagens/vídeos** | Produção/edição de fotos e vídeos do quiosque | A combinar |

---

## 4. Roadmap de evolução sugerido

Uma trilha para vender de forma incremental (cada fase é uma nova venda):

1. **Fase 1 — Lançar** (Plano A + captura de lead + páginas legais)
   → site profissional no ar, capturando contatos.
2. **Fase 2 — Gerar demanda** (Plano B: rastreamento + tráfego pago)
   → leads entrando de forma previsível.
3. **Fase 3 — Automatizar** (WhatsApp/chatbot + nutrição + CRM)
   → menos trabalho manual, mais conversão.
4. **Fase 4 — Escalar** (dashboard/portal do franqueado + LPs por região + blog/SEO)
   → sistema que sustenta a expansão da rede.

---

## 5. Condições comerciais (sugestão)

- **Setup:** 50% na assinatura + 50% na entrega.
- **Mensalidade:** cobrança antecipada; reajuste anual (ex: IPCA).
- **Condição de lançamento (Plano B):** Mês 1 de gestão como cortesia (ou 50%
  off), a partir do dia 31 mensalidade cheia — mediante contrato de 6+ meses. A
  verba de mídia e o setup **não** entram na cortesia.
- **Contrato:** mínimo de 6–12 meses no Plano B (tráfego exige maturação).
- **Suporte:** canal e prazo de resposta (SLA) definidos por plano.
- **Verba de mídia:** sempre paga pelo cliente direto às plataformas.
- **Cancelamento:** aviso prévio de 30 dias.
- **Propriedade:** código entregue ao cliente ao fim do contrato (se acordado).

---

## 6. Escopo, limites e plano de desmame

Define **o que você faz, o que não faz e como sai** — protege contra *scope
creep* e organiza a conversa com o cliente.

### Quem faz o quê

| Função | Responsável |
|---|---|
| Tráfego pago (campanhas, verba, otimização) | **Você** |
| Site e manutenção | **Você** |
| Rastreamento e relatórios de leads | **Você** |
| Social media orgânico (posts, reels, stories, DM/comentários) | **Cliente** / freelancer de conteúdo |
| Atendimento e **venda** dos leads | **Comercial do cliente** (franqueadora) |
| Verba de anúncio | **Cliente** (paga às plataformas) |

> **Tráfego pago ≠ social media.** São skills diferentes. Você não assume o
> orgânico "de brinde" — se o cliente quiser, é um **módulo à parte** (e mais
> trabalho recorrente seu, o oposto do desmame).

### Fora do escopo (salvo módulo contratado)

- Produção de conteúdo orgânico e gestão de redes sociais.
- Atendimento comercial / fechamento de franquia.
- Produção de fotos e vídeos.
- **Horas acima do teto incluído** no plano — excedente cobrado à parte.

### ⚠️ Propriedade das contas (regra inegociável)

Desde o **dia 1**, tudo no nome/posse do **cliente**, com você como
**admin/parceiro**:

- Business Manager, conta de anúncios, **Pixel**, GA4 e domínio → ativos do
  cliente.
- Protege os dois: o cliente nunca perde histórico nem público aquecido; você
  não fica preso nem responsável pela conta.
- Feito certo, o desmame é só **remover seu acesso**. Feito errado, você fica
  algemado ao cliente.

**Domínio (pago pelo cliente, fora da sua mensalidade):** registrado no
**nome/CNPJ do cliente** e pago **direto por ele** (cartão/Pix). Você entra só
como **admin/DNS** — configura e gerencia, sem desembolsar nem colocar no seu
nome. Assim ninguém fica refém e o custo não vira seu prejuízo.

> **Passo zero — confirme antes de comprar:** a marca GRAVA.AI **provavelmente já
> tem** `gravaai.com` e `gravaai.com.br` registrados (checagem de jul/2026:
> ambos ativos, com cara de serem do próprio cliente). Pergunte *"vocês já têm
> domínio? qual usam?"* — se sim, **não registre nada**, só peça acesso e aponte
> o DNS. Custo zero.

Se precisar registrar, preços reais (verificados em jul/2026):

| Domínio | Custo real (jul/2026) | Onde registrar | Observação |
|---|---|---|---|
| `.com.br` (Registro.br) | **R$ 40/ano fixo** | Registro.br direto | Pix, BRL, sem IOF; principal recomendado |
| `.com` | **~R$ 54/ano** | Cloudflare (a custo) / Porkbun | Evite GoDaddy (renova ~R$ 830) |
| **`.ai`** (ex: `grava.ai`) | **~R$ 358/ano** (US$ 68,98) | **Spaceship** | ⚠️ **Mínimo 2 anos** (~R$ 716 na entrada); casa com a marca |

> **Atenção ao `.ai`:** como a marca é GRAVA.AI, o cliente vai querer o `grava.ai`
> — que **não é R$ 40, e sim ~R$ 358/ano com 2 anos mínimos** (~R$ 716 na
> entrada). Duas ressalvas **para o cliente**: **(1) cashflow** — ele paga os 2
> anos à vista; **(2) posse** — o `.ai` é registrado por conta de registrador (não
> por CNPJ como o Registro.br), então quem cria a conta a segura. **O cliente cria
> a conta (na Spaceship) e paga; você entra como colaborador/DNS.** Combo comum:
> `.com.br` barato como principal + `.ai` só se ele fizer questão.

*A hospedagem (Vercel) fica no plano gratuito neste volume — sua mensalidade de
R$ 800 cobre **gestão, não infraestrutura**. O domínio é pago à parte pelo
cliente, então sua margem fica cheia, sem custo de domínio saindo do seu bolso.*

### Plano de desmame (handoff) — entrega paga

Quando o cliente for assumir a operação (interno, novo contratado ou agência):

1. **Manual da operação** — campanhas, públicos, o que funciona, logins, processo.
2. **Treinamento** — sessões com quem vai tocar.
3. **Período de transição (sombra)** — eles operam, você supervisiona, depois solta.
4. **Consultoria pontual pós-desmame** — check-ins **pagos**, não full-time.

| Item | Valor de referência |
|---|---|
| Pacote de handoff (manual + treinamento + transição) | R$ 1.500 – R$ 4.000 |
| Consultoria pontual pós-desmame | R$ X/hora ou avença mensal reduzida |

### Suas 3 saídas (você decide o "até quando")

- **Escopo fechado:** entrega + handoff treinado → você sai em X meses.
- **Retainer:** você gerencia enquanto for pago (precifique bem, limite as horas).
- **Escala e delega:** automatiza (chatbot/CRM) e terceiriza a execução; você
  vira o *dono da conta*, não o executor.

---

## 7. Simulação de faturamento

> Valores médios das faixas, para ilustrar o potencial. **Ajuste ao seu preço
> real.** A **verba de anúncio do cliente (~R$ 2.000/mês) é passthrough — NÃO
> entra na sua receita** (é paga direto às plataformas).
>
> Premissas: Plano A → setup R$ 4.500 + R$ 800/mês · Plano B → setup R$ 5.500 +
> R$ 1.500/mês (gestão), com Mês 1 como cortesia de lançamento.

### Plano A vs Plano B (sua receita)

| Período | Plano A | Plano B (Mês 1 cortesia) |
|---|---|---|
| **6 meses** | R$ 9.300 | **R$ 13.000** |
| **12 meses** | R$ 14.100 | **R$ 22.000** |
| Recorrente/ano (sem setup) | R$ 9.600 | **R$ 18.000** |

O Plano B ainda rende **~1,6x** o Plano A no primeiro ano — a diferença está na
recorrência da gestão de tráfego (e o Plano B carrega verba de mídia à parte,
paga pelo cliente). Com o Plano A mais robusto, o salto encolheu: o argumento
do B é **resultado (leads)**, não preço.

### Fluxo mês a mês — Plano B (Mês 1 cortesia)

| Momento | Entra | Acumulado |
|---|---|---|
| Assinatura (setup) | +R$ 5.500 | R$ 5.500 |
| Mês 1 (cortesia) | +R$ 0 | R$ 5.500 |
| Mês 2 | +R$ 1.500 | R$ 7.000 |
| Mês 3 | +R$ 1.500 | R$ 8.500 |
| Mês 6 | +R$ 1.500 | R$ 13.000 |
| Mês 12 | +R$ 1.500 | **R$ 22.000** |

Média de **~R$ 1.830/mês** no primeiro ano (setup amortizado). Note o "degrau"
do Mês 1: a cortesia custa **1 mensalidade** (R$ 1.500) — o preço do seu case.
Com a **alternativa de 50%** no Mês 1, o total de 12 meses sobe para R$ 22.750.

### Cenário otimista (Plano B + módulos + performance, 12 meses)

| Item | Receita |
|---|---|
| Base Plano B (12m) | R$ 22.000 |
| + Chatbot WhatsApp (setup + 10 meses) | R$ 6.500 |
| + Landing por região (1x) | R$ 1.000 |
| + Performance (~R$ 500/mês × 10) | R$ 5.000 |
| **Total** | **R$ 34.500** |

### Escala (o pulo do gato)

Com **3 clientes no Plano B**, a recorrência sozinha (sem contar setups) já é
**R$ 54.000/ano**. O modelo se paga quando você repete: cada novo cliente entra
mais rápido e mais caro, porque você já tem case, processo e templates.

---

## 8. Playbook de negociação (uso interno)

Onde ceder, o que proteger e como estruturar pagamento/descontos. **Regra-mãe:
todo desconto tem contrapartida** — você nunca abaixa preço "de graça", troca por
algo (prazo, antecipação, indicação, case).

### Princípios

- **Ancore alto:** apresente o preço cheio primeiro; o desconto vira "presente".
- **Proteja a recorrência:** prefira ceder no **setup** (pontual) do que na
  **mensalidade** (é onde está o dinheiro do ano).
- **Ceda escopo, não só preço:** se pedirem mais barato, **tire item** em vez de
  simplesmente descontar — mantém a percepção de valor.
- **Conheça seu piso:** abaixo do walk-around, não vale — melhor não fechar.

### Modelos de cobrança da gestão (fee vs % vs performance)

Três formas de cobrar a gestão de tráfego — e quando usar cada uma:

| Modelo | Como funciona | Melhor quando |
|---|---|---|
| **Fee fixo** | Mensalidade fixa (ex: R$ 1.500) | Verba pequena — **padrão para franquia no início** |
| **% da verba** | 10–20% do que o cliente investe em anúncio | Verba **alta** (só compensa acima do ponto de virada) |
| **Performance** | R$ por lead ou % por franquia vendida | Há histórico/confiança e volume |

**Ponto de virada (fee fixo × % da verba):** `ponto = fee ÷ %`. Com fee de
R$ 1.500 e 15%, o % só supera o fixo **acima de ~R$ 10.000/mês de verba**:

| Verba/mês | 15% da verba | Fee R$ 1.500 | Vence |
|---|---|---|---|
| R$ 2.000 | R$ 300 | R$ 1.500 | **Fixo** |
| R$ 5.000 | R$ 750 | R$ 1.500 | **Fixo** |
| R$ 10.000 | R$ 1.500 | R$ 1.500 | Empata |
| R$ 20.000 | R$ 3.000 | R$ 1.500 | **%** |

**Recomendação — "o maior entre":**

> Cobre **o maior entre o fee fixo e X% da verba**. Piso garantido com verba
> baixa; upside automático quando o cliente escalar, sem renegociar nada.

**⚠️ Cuidado com o % puro da verba:** tem incentivo perverso (parece que você
quer inflar o gasto do cliente). Use % da verba só como **teto de upside**, nunca
como base. Para escalar ganho de forma **alinhada**, prefira **% por franquia
vendida** (performance) — a franqueadora paga por resultado, não por gasto.

### O que dá para ceder (por plano)

| Alavanca | Plano A | Plano B |
|---|---|---|
| Desconto no **setup** | até ~30% (R$ 4.500 → ~3.150) | até ~25% (R$ 5.500 → ~4.100) |
| **Parcelar** o setup | 3x em vez de 2x | 3x–6x |
| **Diluir** setup na mensalidade | setup menor + mensal um pouco maior | idem |
| Reduzir **escopo** (baixa o preço) | menos horas/mês; alterações só sob demanda | **1 plataforma só** (Meta *ou* Google); menos criativos; relatório trimestral; cliente fornece criativo; verba menor |
| **Mês 1 cortesia / 50%** | — | já é a condição de lançamento |

> No Plano B, **reduzir para uma única plataforma** é a forma mais limpa de baixar
> a mensalidade sem se queimar — menos trabalho seu, menos custo pra ele.

### Linha vermelha (NÃO ceda)

- **Rastreamento/medição** — sem isso o tráfego não funciona. Inegociável.
- **Propriedade das contas e domínio** — sempre do cliente.
- **Verba de mídia** — sempre paga pelo cliente, nunca sai da sua mensalidade.
- **Atendimento/venda dos leads** — é do comercial deles, não seu.
- **Escopo aberto/ilimitado por preço fixo** — sempre com teto de horas.
- **Trabalhar 100% grátis sem contrapartida** (além do Mês 1 já previsto).

### Moedas de troca (peça isto em troca do desconto)

- **Contrato mais longo** (12 meses em vez de 6).
- **Pagamento antecipado** (à vista ou trimestral/anual).
- **Depoimento + autorização de case/portfólio** (vale ouro no 1º cliente).
- **Indicação** de outros franqueadores/empresas.
- **Compromisso de verba mínima** de mídia (garante resultado e sua operação).

### Formas de pagamento

- **Setup:** padrão 50% assinatura + 50% entrega. Pode ir a **3x–6x** para
  reduzir a barreira de entrada.
- **Setup diluído:** setup R$ 0 + mensalidade maior por X meses (entra fácil,
  você recupera na recorrência).
- **Mensalidade:** antecipada. **Trimestral/semestral antecipado** com desconto.
- **Anual à vista:** 12 meses pagos de uma vez = **1 a 2 meses de cortesia**.
- Meios: Pix, boleto, cartão (repasse a taxa do cartão se parcelar).

### Estrutura de descontos (com contrapartida)

| Desconto | Você concede | Em troca de |
|---|---|---|
| **10% no total** | mensalidade | contrato de **12 meses** |
| **5–8% no setup** | setup | **pagamento à vista** |
| **1–2 meses grátis** | mensalidade | **pagamento anual antecipado** |
| **Mês 1 cortesia** (ou 50%) | gestão do Plano B | contrato de 6+ meses |
| **Desconto por indicação** | mensalidade | cada novo cliente fechado |

### Piso (walk-away) — não desça daqui

| | Plano A | Plano B |
|---|---|---|
| Setup mínimo | ~R$ 3.000 | ~R$ 3.500 |
| Mensal mínimo | ~R$ 500 | ~R$ 1.200 |

Abaixo disso o trabalho não paga o seu tempo — prefira **reduzir escopo** a furar
o piso.

### Táticas rápidas

- **Ofereça 3 opções** (ex: A / B / B+módulo). A do meio vira a escolha natural.
- **"Desconto de lançamento" com prazo** (validade de 15 dias) cria urgência.
- Se insistirem em baixar, responda com **"consigo esse valor tirando X do
  escopo"** — devolve a decisão pro cliente.
- **Bundle** (A+B ou B+módulo) com pequena vantagem fecha mais fácil que descontos
  soltos.

---

## 9. Resumo para apresentar ao cliente

> Versão limpa, voltada ao cliente (sem detalhes internos de negociação). Base
> para o documento que vai à GRAVA.AI.

A GRAVA.AI ganha um **sistema completo de captação de franqueados**: um site
profissional no ar e uma máquina previsível de geração de leads. Dois caminhos,
conforme o momento da rede — comece pelo A e evolua para o B, ou entre direto no B.

### 🅰️ Plano A — Presença Digital

**R$ 4.500 (implantação) + R$ 800/mês**

> *Seu site sempre no ar, seguro e atualizado — sem dor de cabeça técnica.*

- Site e formulário finalizados, com **leads chegando no WhatsApp/e-mail**
- Domínio, hospedagem, SSL e **monitoramento de uptime** — tudo gerido
- **Atualização contínua** e proteção de segurança
- **Alterações de conteúdo sob demanda** (resposta em até 24h úteis)
- Até **5 alterações estruturais** ou **1 página nova** por mês
- **Suporte prioritário** (24h para site fora do ar)

### 🅱️ Plano B — Aquisição de Franqueados

**R$ 5.500 (implantação) + R$ 1.500/mês + verba de anúncio (à parte)**

> *Não é só um site — é uma máquina de gerar franqueados. O site capta; nós
> geramos e otimizamos os leads.*

Tudo do Plano A, **mais**:

- **Rastreamento completo** dos leads (Pixel + Conversions API + GA4) — dado
  confiável para as campanhas performarem
- **Gestão de tráfego pago** (Meta/Google Ads) + **4 criativos de anúncio/mês** +
  otimização contínua
- **Relatório mensal** de leads e custo por lead (CPL)
- Verba de anúncio paga **direto às plataformas** pela GRAVA.AI (transparência total)
- **Condição de lançamento:** 1º mês de gestão como **cortesia** (mediante
  contrato de 6+ meses)

### Como o sistema evolui

1. **Lançar** — site profissional no ar, capturando contatos.
2. **Gerar demanda** — tráfego pago trazendo leads de forma previsível.
3. **Automatizar** — atendimento por WhatsApp/chatbot e nutrição dos leads.
4. **Escalar** — dashboard de leads, portal do franqueado, páginas por região.

Cada etapa entra quando fizer sentido — o sistema cresce junto com a rede.

### Próximo passo

Escolher o plano de entrada e agendar a implantação. **O maior valor não é o
site em si — é o funil que transforma investimento em anúncio em franqueados.**
