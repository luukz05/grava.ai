# Guia de Marketing Digital & Tráfego Pago — do Zero

Se você chegou até aqui sabendo construir um site em Next.js, mas sem fazer a menor ideia do que é "campanha", "tráfego pago" ou "pixel", relaxa: este guia foi escrito exatamente para você. Nada aqui vai assumir que você já sabe alguma coisa de marketing.

A ideia é simples: você já tem o site da **GRAVA.AI** pronto (a página institucional e a landing page "Seja um Franqueado" com formulário e botão de WhatsApp). O que falta é fazer as **pessoas certas chegarem nesse site** e virarem contatos interessados em abrir uma franquia. É isso que o tráfego pago faz: você paga para o Google e para o Instagram/Facebook mostrarem seu anúncio para quem tem cara de futuro franqueado.

Ao final deste guia, você vai conseguir:

- Entender o que é marketing digital e como o dinheiro vira lead (contato interessado).
- Criar e rodar campanhas no **Meta Ads** (Instagram e Facebook) e no **Google Ads**.
- Ler suas métricas e saber se está ganhando ou perdendo dinheiro.
- **Integrar tudo no site que você mesmo fez** — instalar rastreamento, medir conversões e conectar os anúncios ao seu formulário. (Essa é a parte onde seu lado programador vai brilhar.)

Vamos do zero absoluto até você conseguir apertar o botão "Publicar campanha" com confiança.

> **Termo já explicado:** **Lead** = um contato interessado. No seu caso, uma pessoa que preencheu o formulário "Seja um Franqueado" ou chamou no WhatsApp. Não é ainda um cliente/franqueado — é alguém que levantou a mão dizendo "quero saber mais".

### Para quem é este guia

- Para o **desenvolvedor** que fez o site mas nunca rodou um anúncio na vida.
- Para quem quer **gerar leads de franqueados** para a GRAVA.AI e não sabe por onde começar.
- Para quem precisa entender **tanto a parte de campanhas quanto a parte técnica de integração** no próprio site.
- Não é para quem já roda campanhas há anos — se esse é o seu caso, você vai achar tudo básico demais (e tudo bem).

### Como usar este guia

1. **Leia na ordem.** Cada seção assume que você leu a anterior. Não pule para "Meta Ads" antes de entender "Como funciona o tráfego pago".
2. **Consulte o glossário** (no fim desta abertura) sempre que bater um termo estranho. Deixe-o aberto numa aba.
3. **Faça enquanto lê.** Nos passos práticos, abra as ferramentas e execute junto. Marketing se aprende fazendo, não decorando.
4. **Não tente fazer tudo de uma vez.** Cada seção tem um objetivo. Termine um, respire, siga para o próximo.
5. **Guarde a Seção 8 (30/60/90 dias) para o final** — ela junta tudo num plano de ação para você executar de verdade.

### A trilha de aprendizagem

Estas são as 8 seções do guia, na ordem em que você deve estudá-las:

1. **Fundamentos de marketing digital** — o vocabulário básico e como um estranho vira franqueado (o conceito de funil e público).
2. **Como funciona o tráfego pago** — o que significa "pagar por tráfego", como funciona o leilão de anúncios e onde seu dinheiro vai.
3. **Meta Ads (Facebook e Instagram) do zero** — criar conta, estruturar e publicar sua primeira campanha de geração de leads no Instagram/Facebook.
4. **Google Ads do zero** — aparecer no Google quando alguém pesquisa "como abrir uma franquia" e afins.
5. **Métricas, orçamento e otimização** — quanto investir, como ler os números e como melhorar campanhas sem queimar dinheiro.
6. **Rastreamento e integração no site (a parte técnica)** — instalar Pixel, GA4, GTM, UTMs e CAPI no seu Next.js para medir conversões de verdade.
7. **Landing page e copy que converte** — transformar sua página "Seja um Franqueado" numa máquina de captar leads.
8. **Roteiro prático 30/60/90 dias** — um plano dia a dia para sair do zero e ter campanhas rodando e gerando leads.

### Mentalidade certa para começar

Antes de mexer em qualquer ferramenta, grave estes princípios. Eles vão te poupar de erros caros:

1. **Comece pequeno.** Você não precisa de um orçamento gigante para aprender. Um valor baixo por dia já ensina como tudo funciona. Ninguém acerta a campanha perfeita de primeira — e não tem problema.
2. **Deixe os dados decidirem, não o seu gosto.** O anúncio que VOCÊ acha bonito pode vender menos que o "feio". Quem manda é o número de leads, não a sua opinião. Teste, meça, e siga o que os dados mostram.
3. **Meça antes de escalar.** Só aumente o investimento depois que o rastreamento estiver funcionando e você souber quanto custa cada lead. Escalar no escuro é jogar dinheiro fora.
4. **Paciência com o aprendizado da máquina.** As plataformas precisam de alguns dias e alguns leads para "entender" quem é seu público. Não fique desligando e ligando campanha a cada duas horas.
5. **Uma mudança por vez.** Se você mudar público, criativo e orçamento juntos e o resultado piorar, nunca vai saber qual foi o culpado. Mude uma coisa, observe, depois mude a próxima.

### Glossário — os ~20 termos essenciais

Consulte esta tabela sempre que precisar. Cada termo vai aparecer com mais profundidade nas seções, mas aqui está a tradução rápida:

| Termo | O que é |
|---|---|
| **Lead** | Contato interessado. No seu caso: quem preencheu o formulário "Seja um Franqueado" ou chamou no WhatsApp. |
| **Funil** | O caminho que uma pessoa percorre do "nunca ouvi falar da GRAVA.AI" até "quero abrir a franquia". Vai afunilando: muita gente entra, poucos viram franqueados. |
| **TOFU / MOFU / BOFU** | As três etapas do funil. **TOFU** (topo) = quem ainda nem sabe que existe; **MOFU** (meio) = quem já conhece e está pesquisando; **BOFU** (fundo) = quem está quase decidindo. |
| **CPC** | *Custo por Clique.* Quanto você paga cada vez que alguém clica no seu anúncio. |
| **CPM** | *Custo por Mil impressões.* Quanto você paga para o anúncio ser exibido mil vezes (ver, não clicar). |
| **CPL** | *Custo por Lead.* Quanto você gastou para conseguir um contato interessado. A métrica mais importante para você. |
| **CPA** | *Custo por Aquisição.* Quanto custa para conseguir uma ação específica (ex.: um lead qualificado ou até uma franquia vendida). |
| **CTR** | *Taxa de Cliques.* De cada 100 pessoas que viram o anúncio, quantas clicaram. CTR alto = anúncio chamativo. |
| **ROAS** | *Retorno sobre o Investimento em Anúncios.* Quanto de retorno cada real investido gerou. |
| **Conversão** | Quando a pessoa faz a ação que você queria (preencher o formulário, clicar no WhatsApp). "Converter" = virar lead. |
| **Pixel** | Um pedacinho de código que você instala no site para o Facebook/Instagram saber quem visitou e quem virou lead. |
| **Remarketing** | Mostrar anúncios de novo para quem já visitou seu site mas não preencheu o formulário. "Lembra da GRAVA.AI? Volta lá." |
| **Lookalike** | Público "parecido". A plataforma acha pessoas semelhantes aos seus melhores leads e mostra o anúncio para elas. |
| **Criativo** | O anúncio em si: a imagem, o vídeo e o texto que a pessoa vê. |
| **Conjunto de anúncios** | O nível onde você define o público, o orçamento e onde o anúncio aparece (no Meta Ads). |
| **Lance** | Quanto você está disposto a pagar num leilão para que seu anúncio seja mostrado. |
| **Landing page** | A página de destino do anúncio. No seu caso: a página "Seja um Franqueado" com o formulário. |
| **GA4** | *Google Analytics 4.* Ferramenta gratuita do Google que mostra quem visita seu site e o que faz nele. |
| **GTM** | *Google Tag Manager.* Um "painel" para instalar e gerenciar códigos de rastreamento (Pixel, GA4) sem editar o site toda hora. |
| **UTM** | Etiquetas coladas no fim do link (`?utm_source=...`) que dizem de qual anúncio a pessoa veio. |
| **CAPI** | *Conversions API.* Forma de enviar os dados de conversão direto do seu servidor para o Meta, mais confiável que só o Pixel. |

---

## 1. Fundamentos de marketing digital

Antes de gastar um real com anúncios, você precisa entender o "campo de jogo". Esta seção é a base de tudo: se você entender bem estes conceitos, todo o resto do guia vai fazer sentido. Vamos do zero absoluto, no seu caso real: **vender franquias da GRAVA.AI** (os quiosques de personalização de produtos com IA).

Leia com calma. Cada termo novo é explicado na primeira vez que aparece.

---

### O que é marketing digital (de verdade)

**Marketing digital** é o conjunto de estratégias para atrair, convencer e converter pessoas em clientes usando canais digitais — Google, Instagram, Facebook, WhatsApp, e-mail, seu próprio site etc.

Esqueça a ideia de "fazer um post bonito". Marketing digital de verdade é **fazer a pessoa certa dar o próximo passo**. No seu caso, o "próximo passo" final é: **alguém assinar um contrato de franquia da GRAVA.AI**.

Uma analogia simples: imagine uma **loja física numa rua movimentada**.
- A **vitrine** que chama atenção de quem passa = seus anúncios.
- A **porta da loja** = o clique no anúncio.
- O **balcão de atendimento** = sua landing page (a página "Seja um Franqueado").
- O **vendedor pegando o contato do cliente** = seu formulário de lead.
- A **negociação e o fechamento** = seu contato por WhatsApp/telefone até a venda.

Marketing digital é montar essa "loja" no ambiente online e fazer o fluxo de gente andar do começo ao fim.

> ⚠️ **Erro de iniciante:** achar que marketing digital é "postar bastante e esperar viralizar". Postar é uma parte pequena. O que gera franqueado é um **sistema** que leva um estranho até a assinatura do contrato — e é isso que você vai aprender a montar.

---

### A jornada do cliente: o funil (TOFU, MOFU, BOFU)

Ninguém vê um anúncio pela primeira vez e assina uma franquia no mesmo minuto. Uma franquia é uma decisão **cara, séria e demorada** — a pessoa vai investir dinheiro e mudar de vida. Então ela passa por uma **jornada**, que no marketing chamamos de **funil**.

**Por que "funil"?** Porque tem o formato de um funil de cozinha: **entra muita gente em cima e sai pouca gente embaixo**. Muitos veem o anúncio; poucos viram franqueados. Isso é normal e esperado — o trabalho é fazer o máximo de gente descer pelo funil.

O funil tem 3 partes. Os nomes em inglês são MUITO usados no mercado, então vale decorar:

| Etapa | Nome técnico | O que significa | Estado da pessoa |
|---|---|---|---|
| **Topo** | **TOFU** (Top of Funnel) | Descoberta | "Nunca ouvi falar disso" |
| **Meio** | **MOFU** (Middle of Funnel) | Consideração | "Interessante, será que serve pra mim?" |
| **Fundo** | **BOFU** (Bottom of Funnel) | Decisão | "Quero. Como faço pra fechar?" |

**A mesma pessoa, os 3 momentos — exemplo GRAVA.AI:**

1. **TOFU (topo):** Ana, 34 anos, está rolando o Instagram no sofá. Ela **nunca ouviu falar** da GRAVA.AI. De repente aparece um vídeo: uma máquina personalizando uma caneca com a foto do cachorro de alguém, na hora, num quiosque de shopping. Ela pensa: "Que legal isso". Ela **descobriu** que essa coisa existe. Ela ainda NÃO quer comprar franquia nenhuma.

2. **MOFU (meio):** Nos dias seguintes, Ana começa a ver mais conteúdo: "Como funciona um quiosque de personalização com IA", "Quanto fatura um negócio de presentes personalizados". Agora ela pensa: "Espera... isso pode ser um **negócio meu**? Será que eu daria conta?". Ela está **considerando**. Está comparando, tirando dúvidas, imaginando-se dona.

3. **BOFU (fundo):** Ana já está convencida de que quer empreender com isso. Agora ela quer detalhes práticos: quanto precisa investir, como é o suporte, como faz pra começar. Ela clica num anúncio que diz **"Seja um Franqueado GRAVA.AI"**, cai na sua landing page e **preenche o formulário**. Pronto: ela virou um **lead** de fundo de funil, quentíssimo, pronta pra conversar.

**A lição prática:** você não fala a mesma coisa com quem está no topo e com quem está no fundo. Mandar "assine sua franquia agora!" para quem nunca ouviu falar de você é como pedir alguém em casamento no primeiro "oi" — assusta e afasta. Cada etapa pede uma mensagem diferente. Você vai aprender isso ao longo do guia.

---

### O que é um LEAD (e por que ele vale ouro)

Este é O conceito mais importante para o seu negócio.

**Lead** (pronuncia-se "líd") é uma **pessoa interessada que te deixou uma forma de contato**. No seu site, é exatamente quem preenche o formulário da página "Seja um Franqueado" com nome, WhatsApp e e-mail.

Por que se chama lead? Porque em inglês significa "pista", "indício". Aquela pessoa te deu uma **pista de que pode virar cliente**. Ela levantou a mão e disse "eu tenho interesse".

**Diferença crucial:**
- **Visitante** = alguém que passou pelo seu site e foi embora. Você não sabe quem é, não tem como falar com ela de novo. É um fantasma.
- **Lead** = alguém que deixou o contato. Você **pode e deve** ligar, mandar WhatsApp, mandar e-mail. Você tem uma segunda, terceira e quarta chance de convencer.

**Por que o lead vale ouro num negócio de franquia?**

Porque a venda de uma franquia **não acontece no site**. Ela acontece na **conversa**. Ninguém assina um contrato de franquia só clicando num botão — é um investimento grande, cheio de dúvidas. O papel do site é uma coisa só: **transformar estranhos em leads** para que sua equipe (ou você) feche a venda no contato humano.

Pense na matemática do seu negócio:
- Vender uma caneca personalizada = ticket baixo, decisão rápida, dá pra vender direto.
- Vender uma **franquia** = investimento alto, decisão de meses, precisa de conversa, confiança e negociação.

Por isso, no seu caso, **o objetivo número 1 de todo o marketing digital é gerar leads qualificados** — não vender direto pelo site. Cada lead é uma oportunidade real de uma venda grande. Guarde isso: **no negócio de franquia, você não "vende pela internet", você capta leads pela internet e vende na conversa.**

> ⚠️ **Erro de iniciante:** medir sucesso por "curtidas" e "seguidores". Isso não paga sua conta. O que importa é **quantos leads bons entraram** e **quantos viraram franqueados**. Curtida não assina contrato.

---

### Alcance, engajamento e conversão (não confunda)

Esses três aparecem o tempo todo nas ferramentas de anúncio. Confundir os três é o erro mais comum de quem começa. Vamos separar:

| Termo | O que é | Exemplo GRAVA.AI | Vale quanto? |
|---|---|---|---|
| **Alcance** | Quantas **pessoas diferentes viram** seu anúncio/post | 50.000 pessoas viram o vídeo do quiosque | Pouco sozinho |
| **Engajamento** | Quantas **interagiram** (curtir, comentar, salvar, clicar) | 2.000 curtiram, 300 comentaram | Um pouco mais |
| **Conversão** | Quantas fizeram a **ação que você queria** | 40 preencheram o formulário de franqueado | **É o que importa** |

Analogia da vitrine:
- **Alcance** = quantas pessoas **passaram na frente** da sua vitrine.
- **Engajamento** = quantas **pararam pra olhar** a vitrine.
- **Conversão** = quantas **entraram na loja e deixaram o contato** (ou compraram).

Você pode ter alcance gigante e conversão zero — muita gente passou, ninguém entrou. Isso significa que a vitrine chama atenção mas não convence, OU você está atraindo o público errado. **Conversão é o número que decide se seu dinheiro está sendo bem gasto.**

Para você, a **conversão principal é: virar lead** (preencher o formulário). Fixe isso.

---

### Tráfego orgânico vs. tráfego pago

**Tráfego** = o fluxo de pessoas que chega até você (ao seu site, perfil, página). Existem duas formas de trazer tráfego:

**1. Tráfego orgânico (grátis, porém lento)**
É o público que chega **sem você pagar por clique**: um post que as pessoas compartilham, um vídeo que o Instagram entrega sozinho, alguém que te achou no Google numa busca.
- ✅ Vantagem: não paga por cada visitante; constrói autoridade e confiança ao longo do tempo.
- ❌ Desvantagem: é **lento** e **imprevisível**. Você posta e pode não vir ninguém. Não dá pra "abrir a torneira" quando quiser.

**2. Tráfego pago (você paga, porém rápido e controlável)**
É quando você **paga uma plataforma** (Meta Ads = anúncios do Instagram/Facebook; Google Ads = anúncios do Google) para mostrar seu anúncio a milhares de pessoas específicas.
- ✅ Vantagem: **rápido, previsível e escalável**. Colocou dinheiro, apareceu gente. Quer o dobro de leads? Aumenta o investimento. Dá pra escolher exatamente **quem** vê o anúncio.
- ❌ Desvantagem: **para de vir gente no minuto em que você para de pagar.** É uma torneira: fechou, secou.

**Qual usar para vender franquia GRAVA.AI?**

**Tráfego pago é o motor principal para captar leads de franqueados**, porque:
1. Você precisa de leads **agora**, de forma **previsível** (você tem metas de franqueados).
2. Você consegue mirar exatamente em quem tem perfil pra investir (mais sobre isso já já).
3. Você consegue medir cada real: "gastei R$ X, entraram Y leads".

O orgânico entra como **apoio**: dá credibilidade. Quando o lead pesquisar "GRAVA.AI" antes de fechar, é bom encontrar um perfil ativo e conteúdo bacana. Mas o volume de leads virá do **pago**. Por isso este guia foca em tráfego pago.

> ⚠️ **Erro de iniciante:** esperar o orgânico "bombar" antes de investir em anúncio. Você pode ficar meses postando sem nenhum lead. Para um negócio que precisa vender franquias, isso é tempo (e oportunidade) jogado fora.

---

### Oferta: o que você promete em troca do contato

**Oferta** é a proposta clara que você faz para a pessoa: *"faça X e receba Y"*. É o "isca" que faz o estranho virar lead.

No caso da franquia, a oferta **não é a franquia em si** (isso é caro demais pra pedir de cara). A oferta é algo pequeno e irresistível que faz a pessoa **deixar o contato**. Exemplos de boas ofertas para a GRAVA.AI:

- "Baixe o **guia gratuito**: Como funciona a franquia de personalização com IA da GRAVA.AI"
- "Receba a **apresentação completa** da franquia no seu WhatsApp"
- "Fale com um **especialista** e descubra se seu perfil combina com a franquia"
- "Agende uma **conversa sem compromisso** e tire todas as suas dúvidas"

Repare: em nenhuma delas você fala de preço ou pede pra comprar. A oferta troca uma **pequena promessa de valor** (informação, uma conversa) pelo **contato da pessoa**. O número (o valor do investimento) é entregue depois, no contato humano — ele é a "isca final", não algo que você joga no site.

> ⚠️ **Erro de iniciante:** oferta fraca do tipo "Entre em contato". Isso não é oferta, é obrigação chata. Ninguém deixa o WhatsApp por "entre em contato". Deixe claro **o que a pessoa ganha** ao preencher o formulário.

---

### Público-alvo e persona: quem é o franqueado ideal

De nada adianta anúncio bom mostrado pra pessoa errada. Você precisa saber **com quem está falando**.

- **Público-alvo** = o grupo amplo de pessoas que você quer atingir (ex.: "pessoas de 30 a 50 anos, com capital para investir, interessadas em empreender").
- **Persona** = um **personagem fictício** que representa seu cliente ideal, com nome, idade, dores e desejos. É como se você desse um rosto e uma história ao seu público. Serve pra você **imaginar uma pessoa real** ao escrever o anúncio.

**Exemplo de persona da franquia GRAVA.AI:**

> **"Ricardo, o Investidor Cansado do CLT"**
> - 42 anos, mora numa cidade média/grande, casado.
> - Tem entre R$ 80 mil e R$ 200 mil guardados (ou um FGTS/rescisão).
> - Está cansado do emprego, quer **um negócio próprio**, mas tem **medo de começar do zero sozinho**.
> - **Desejo:** ser dono do próprio negócio com uma marca que já funciona e dá suporte.
> - **Medo:** perder o dinheiro que juntou; não entender de tecnologia; ficar sem ajuda.
> - **O que o convence:** ver que a marca é sólida, que tem suporte, que o quiosque é fácil de operar e que outros franqueados estão dando certo.

Quando você escreve um anúncio **pensando no Ricardo**, ele fica muito melhor: você fala das dores dele ("sonha em ter o próprio negócio mas não quer arriscar do zero?"), e não do produto de forma genérica.

**Por que isso importa no tráfego pago?** Porque nas plataformas de anúncio você **escolhe pra quem mostrar** (por idade, região, interesses, comportamento). Se você sabe que seu franqueado é o "Ricardo", você configura o anúncio pra aparecer pra gente parecida com ele — e para de queimar dinheiro mostrando pra adolescente que só quer comprar uma caneca.

> ⚠️ **Erro de iniciante:** querer falar com "todo mundo". Anúncio pra todo mundo não convence ninguém. Quanto mais específica a persona, mais forte a mensagem.

---

### A visão macro: como tudo se conecta

Agora junte todas as peças. Este é o **caminho completo** que transforma um estranho em franqueado — decore este fluxo, pois é a espinha dorsal de todo o guia:

```
ANÚNCIO  →  CLIQUE  →  LANDING PAGE  →  FORMULÁRIO  →  LEAD  →  CONTATO  →  VENDA
(pago)     (interesse) (sua página)    (a oferta)    (contato) (WhatsApp) (contrato)
```

Vamos ler passo a passo, no caso GRAVA.AI:

1. **Anúncio** (Meta/Google Ads): mostrado pra "Ricardos" — pessoas com perfil de investidor. Ele desperta o interesse ("Quer ser dono de um negócio de tecnologia que já funciona?").
2. **Clique:** o Ricardo interessado clica no anúncio.
3. **Landing page:** ele cai na sua página "Seja um Franqueado" (que **você mesmo construiu** em Next.js). Aqui a página tem UM objetivo: convencer e levar ao formulário.
4. **Formulário (a oferta):** ele preenche nome, WhatsApp e e-mail em troca da oferta ("receba a apresentação da franquia").
5. **Lead:** o contato dele agora é seu. Ele deixou de ser fantasma. 
6. **Contato:** você (ou seu time) chama no WhatsApp, tira dúvidas, apresenta números, gera confiança.
7. **Venda:** o Ricardo assina o contrato de franquia. 

Cada etapa tem um "vazamento" (nem todo clique vira lead, nem todo lead vira venda) — é o funil de novo. O trabalho do marketing digital é **melhorar cada etapa** para o máximo de gente chegar até o fim.

E repare onde entra o que você já sabe fazer: **as etapas 3, 4 e 6 são código** — sua landing page, seu formulário e a integração do WhatsApp. As etapas 1 e 2 são o **tráfego pago** que você vai aprender a rodar. É a soma das duas coisas (o site que você fez + os anúncios que você vai aprender) que gera franqueado. Você já domina metade. Este guia te dá a outra metade.

---

### ✅ Checklist da Seção 1

Antes de seguir, confirme que você entendeu (não decore — **entenda**):

- [ ] Sei explicar, em uma frase, o que é marketing digital.
- [ ] Entendo o funil e sei dar um exemplo de TOFU, MOFU e BOFU da GRAVA.AI.
- [ ] Sei a diferença entre um **visitante** e um **lead** — e por que o lead vale ouro numa franquia.
- [ ] Não confundo mais **alcance**, **engajamento** e **conversão** (e sei qual importa mais).
- [ ] Entendo a diferença entre tráfego **orgânico** e **pago** e por que o pago é o motor de leads aqui.
- [ ] Consigo formular uma **oferta** boa (o que a pessoa ganha ao deixar o contato).
- [ ] Sei descrever meu **franqueado ideal** (persona) com nome, dores e desejos.
- [ ] Consigo desenhar de cabeça o fluxo: **anúncio → clique → landing page → formulário → lead → contato → venda**.

Com essa base firme, nas próximas seções vamos colocar a mão na massa: montar as campanhas de tráfego pago e integrar tudo ao site que você já construiu.

---

## 2. Como funciona o tráfego pago

Antes de mexer em qualquer botão de "criar anúncio", você precisa entender a lógica por trás do jogo. Se você não entende as regras, vai jogar dinheiro fora — e o pior: sem saber por quê. Esta seção é a base de tudo. Leia com calma, porque cada conceito aqui volta a aparecer nas próximas seções.

### O que é "tráfego pago" (em português de gente)

**Tráfego** é simplesmente o movimento de pessoas na internet — gente entrando e saindo de sites, rolando o feed do Instagram, pesquisando no Google. Pensa num shopping: o "tráfego" são as pessoas andando pelos corredores.

Existem dois jeitos de trazer essas pessoas para o seu site:

- **Tráfego orgânico (grátis):** você posta no Instagram, faz um vídeo, escreve um texto que aparece no Google sem pagar. É "de graça", mas é lento e imprevisível.
- **Tráfego pago:** você **paga** para uma plataforma (Meta, Google, etc.) colocar o seu anúncio na frente das pessoas certas, na hora que você quiser. É rápido, controlável e mensurável.

Traduzindo para o seu caso: você tem uma landing page "Seja um Franqueado da GRAVA.AI". Sem tráfego, essa página é uma loja linda numa rua deserta. **Tráfego pago é você pagar para colocar essa loja na avenida mais movimentada da cidade**, e ainda escolher que só passem na frente dela pessoas que têm dinheiro e vontade de abrir um negócio.

> 💡 **Analogia-mãe:** o site que você construiu é o *vendedor*. O tráfego pago é o que traz *gente na frente do vendedor*. Sem visitantes, o melhor vendedor do mundo não vende nada.

### A grande virada de chave: você NÃO paga preço de tabela — você entra num leilão

Esse é o conceito que separa quem entende de quem não entende. Anúncio na internet **não tem preço fixo de tabela**. Você não chega e paga "R$ 5 para aparecer". O que existe é um **leilão** (em inglês, *auction*) que acontece automaticamente, em milésimos de segundo, toda vez que uma pessoa vai carregar uma tela onde cabe um anúncio.

Funciona assim: imagine que existe **um único espaço de anúncio** disponível no topo do feed do "João", um empresário de 35 anos em São Paulo, exatamente agora. Vários anunciantes querem esse espaço:

- Você (GRAVA.AI), querendo mostrar sua franquia.
- Uma loja de tênis.
- Um curso de inglês.
- Um banco.

A plataforma (Meta, por exemplo) faz um **leilão instantâneo** para decidir quem ganha aquele espaço. Só que — e aqui está o pulo do gato — **não ganha necessariamente quem paga mais**.

#### Como a plataforma decide o vencedor do leilão

A Meta e o Google usam mais ou menos esta conta para escolher o vencedor:

> **Valor total = Quanto você topa pagar (lance) × Chance de a pessoa agir + Qualidade/Relevância do anúncio**

Ou seja, três coisas pesam:

1. **Seu lance (quanto você topa pagar):** o teto que você aceita gastar por aquele clique/resultado.
2. **A probabilidade de aquela pessoa fazer o que você quer** (clicar, preencher o formulário): a plataforma calcula isso sozinha, com base no histórico dela.
3. **A qualidade do seu anúncio:** se a imagem é boa, o texto é claro, as pessoas costumam reagir bem, o site carrega rápido.

**Por que isso é ótimo para você?** Porque um anúncio *bom e relevante* pode ganhar o leilão pagando MENOS que um anúncio ruim de um concorrente rico. A plataforma prefere mostrar anúncios que as pessoas gostam, porque assim elas continuam usando o Instagram/Google. Um anúncio chato e caro afasta o usuário — a plataforma não quer isso.

> **Na prática GRAVA.AI:** se o seu anúncio de franquia tem um vídeo mostrando o totem personalizando uma camiseta na hora, com um texto claro ("Fature com um quiosque de personalização por IA"), ele será *relevante* para quem sonha em ter um negócio. Isso baixa seu custo. Um anúncio genérico e feio custaria mais para o mesmo resultado.

⚠️ **Erros de iniciante (sobre o leilão):**
- Achar que "colocar mais dinheiro" resolve tudo. Anúncio ruim com muito dinheiro = dinheiro queimado rápido.
- Pensar que você compete pelo "preço do clique". Você compete por **espaços de atenção de pessoas específicas**, e o preço é consequência.
- Desligar um anúncio no primeiro dia porque "tá caro". O leilão e o algoritmo precisam de tempo para calibrar (veja "otimização" mais abaixo).

### As siglas de custo: CPC, CPM, CPA, CPL (com números de verdade)

Você vai ver essas siglas o tempo todo nos painéis. Elas são só formas diferentes de medir **quanto você pagou por cada coisa**. Todas começam com **CP = "Custo Por"**. Vamos com exemplos reais de uma campanha de franquia.

Imagine uma campanha onde você gastou **R$ 1.000** e teve estes resultados:
- Seu anúncio apareceu **50.000 vezes** nas telas das pessoas.
- **1.000 pessoas clicaram** no anúncio e foram para sua landing page.
- **50 pessoas preencheram o formulário** de "Quero ser franqueado" (viraram *leads*).
- Dessas, **2 pessoas** de fato assinaram contrato (viraram franqueados).

Agora as siglas:

| Sigla | O que significa | Como se calcula | Resultado no exemplo |
|-------|-----------------|-----------------|----------------------|
| **CPM** | *Custo por Mil* (impressões). Quanto custa aparecer 1.000 vezes na tela. Mede alcance/exposição. | Gasto ÷ (impressões ÷ 1.000) | R$ 1.000 ÷ (50.000÷1.000) = **R$ 20 por mil aparições** |
| **CPC** | *Custo por Clique*. Quanto você pagou, em média, por cada clique no anúncio. | Gasto ÷ cliques | R$ 1.000 ÷ 1.000 = **R$ 1,00 por clique** |
| **CPL** | *Custo por Lead*. Quanto custou cada pessoa que preencheu o formulário (o lead). **Essa é a sua métrica principal!** | Gasto ÷ leads | R$ 1.000 ÷ 50 = **R$ 20 por lead** |
| **CPA** | *Custo por Aquisição/Ação*. Quanto custou cada "cliente final" de verdade (aqui, cada franqueado fechado). | Gasto ÷ vendas/ações finais | R$ 1.000 ÷ 2 = **R$ 500 por franqueado** |

Alguns detalhes importantes:

- **"Impressão"** = uma vez que o anúncio apareceu numa tela. Se a mesma pessoa vê 3 vezes, contam 3 impressões.
- **"Lead"** = alguém que deixou o contato (nome, telefone, e-mail) demonstrando interesse. No seu site, é quem enviou o formulário ou chamou no WhatsApp. **É o resultado que a sua campanha de franquia mais persegue.**
- **CPA vs CPL:** o lead é o interessado; a "aquisição" é o negócio fechado. Nem todo lead vira franqueado — por isso o CPA é sempre bem mais alto que o CPL.

> **Por que o CPL é o número que você vai olhar todo dia:** para vender franquia, o objetivo não é "aparecer" nem só "receber cliques" — é **conseguir contatos de gente interessada em investir**. Se você paga R$ 20 por lead e sabe que a cada 25 leads fecha 1 franquia, você já consegue calcular quanto custa cada franqueado (R$ 500) e decidir se vale a pena.

⚠️ **Erros de iniciante (sobre as siglas):**
- Se apaixonar por CPC baixo. Clique barato não paga suas contas; **lead qualificado, sim**. Um anúncio pode ter cliques baratos e nenhum lead — clique curioso não é interessado.
- Ignorar o CPA achando que "é só olhar o lead". Se você paga R$ 20 no lead mas 100% deles são curiosos sem dinheiro, seu CPA explode. Qualidade do lead importa tanto quanto o preço.
- Comparar seu CPM/CPC com o "do fulano do YouTube". Cada nicho, público e região tem custos diferentes. Compare você com você mesmo, ao longo do tempo.

### O que é "lance" e "orçamento diário"

Dois controles que você vai definir em toda campanha:

**Orçamento diário (daily budget):** é o máximo que você autoriza a plataforma a gastar por dia. Você diz "pode gastar até **R$ 50 por dia**" e ela nunca passa disso (pode variar um pouquinho para cima em dias bons e compensar em dias fracos, mas na média respeita). É o seu freio de segurança — você **nunca** vai acordar com a fatura estourada se configurar isso direito.

> **Exemplo GRAVA.AI:** você começa com R$ 50/dia. No mês, são cerca de R$ 1.500. Se o CPL for R$ 20, isso dá uns 75 leads/mês. Números redondos para você já dimensionar.

**Lance (bid):** é quanto você topa pagar em cada leilão. Aqui vai a boa notícia para iniciante: **você quase nunca precisa definir o lance na mão**. As plataformas têm um modo automático (a Meta chama de "maior volume" / *highest volume*) em que **você só define o orçamento e o objetivo, e ela cuida do lance sozinha**, buscando o máximo de resultados pelo seu dinheiro. É assim que você deve começar. Lance manual é assunto de gente avançada.

✅ **Checklist do orçamento (iniciante):**
- [ ] Comecei com um orçamento diário que eu aguento perder por 15-30 dias sem chorar (ex.: R$ 30-50/dia).
- [ ] Deixei o **lance no automático** ("maior volume").
- [ ] Defini que o objetivo é **lead** (contato), não "curtidas" nem "alcance".
- [ ] Não vou desligar antes de a campanha rodar pelo menos alguns dias.

### A lógica de otimização: o algoritmo aprende quem converte

Aqui está a mágica que faz o tráfego pago funcionar tão bem — e o motivo de você **não** precisar adivinhar quem é seu cliente na unha.

Quando você cria uma campanha e diz "meu objetivo é conseguir **leads**", a plataforma passa por uma **fase de aprendizado** (*learning phase*). No começo, ela mostra seu anúncio para uma variedade de pessoas dentro do público que você indicou, meio no escuro. Aí ela observa: *quem clicou? quem preencheu o formulário? quem só passou reto?*

Conforme os primeiros leads chegam, o algoritmo começa a **traçar o perfil de quem converte** (quem vira lead) e passa a caçar mais gente parecida. Ele cruza centenas de sinais que você nem vê: idade, comportamento de compra, horário que a pessoa usa o app, tipo de conteúdo que consome, se ela já demonstrou interesse em "empreender", "abrir negócio", "franquia", etc.

> **Analogia:** é como um garçom experiente numa festa. No começo ele oferece o salgado para todo mundo. Depois de meia hora, ele já sabe *quais mesas* aceitam mais, e passa a focar nelas. O algoritmo faz isso, só que com milhões de pessoas e em tempo real.

**Por que isso muda tudo para você:** a plataforma **precisa de dados de conversão para ficar boa**. Ou seja, ela precisa que aconteçam leads para aprender a trazer mais leads. Isso tem duas consequências práticas:

1. **Os primeiros dias são os piores.** É normal o custo por lead começar alto e cair conforme a máquina aprende. Não entre em pânico e não desligue cedo.
2. **Você precisa "avisar" a plataforma toda vez que um lead acontece.** Isso é feito por um código de rastreamento no seu site (na Meta se chama **Pixel**; no Google, **tag** de conversão). Sem esse código instalado, o algoritmo fica cego — não sabe quem converteu e não consegue otimizar. **Instalar esse rastreamento no site que você fez é uma das partes mais importantes da integração**, e vamos detalhar em seção própria.

⚠️ **Erro de iniciante clássico:** rodar campanha **sem o Pixel/tag instalado** e sem marcar o objetivo como "conversão/lead". Aí a plataforma otimiza para "cliques" (gente curiosa) em vez de "leads" (gente interessada de verdade), e você recebe muito clique e quase nenhum contato bom.

### Meta Ads x Google Ads: gerar demanda x capturar demanda

As duas maiores plataformas de anúncio funcionam com lógicas **opostas**. Entender isso decide onde você coloca seu dinheiro.

**Meta Ads (Facebook + Instagram) — você INTERROMPE e GERA demanda.**
As pessoas não entram no Instagram procurando franquia. Elas entram para ver amigos, memes, receitas. Seu anúncio **interrompe** esse rolar de feed e planta uma ideia que a pessoa nem sabia que queria: *"Ei, você já pensou em ter seu próprio negócio de personalização com IA?"*. Você cria o desejo. Isso se chama **gerar demanda** (fazer a pessoa querer algo que ela não estava buscando).

- **Forte para:** produtos/oportunidades visuais e "de descoberta", como uma franquia inovadora com totem de IA (rende ótimos vídeos e fotos), públicos amplos, criar interesse do zero.
- **Fraqueza:** a pessoa não estava procurando — então parte dela é curiosa, e o lead pode ser mais "frio".

**Google Ads (Pesquisa) — você CAPTURA demanda que já existe.**
No Google, a pessoa **digita ativamente** o que quer: *"como abrir uma franquia"*, *"franquia barata para investir"*, *"franquia de personalização"*. Ela já está com a intenção quente. Seu anúncio aparece **no momento exato da busca**. Você não cria o desejo — você **captura** um desejo que já existia. Isso se chama **capturar demanda**.

- **Forte para:** pegar gente com intenção alta ("já quero investir, estou pesquisando"), leads mais quentes.
- **Fraqueza:** só funciona se já existir gente procurando. Se ninguém pesquisa pela sua marca ainda, você depende de termos genéricos ("franquia para investir"), que são disputados e mais caros. E não constrói desejo em quem nunca pensou no assunto.

| | **Meta Ads** | **Google Ads (Pesquisa)** |
|---|---|---|
| Lógica | Gera demanda (interrompe) | Captura demanda (intenção) |
| Estado da pessoa | Não estava procurando | Está procurando agora |
| Formato-chave | Vídeo/foto no feed e stories | Texto que aparece na busca |
| Tipo de lead | Mais volume, mais "frio" | Menos volume, mais "quente" |
| Bom para franquia quando... | Quer apresentar a oportunidade e criar interesse do zero (caso da GRAVA.AI, marca nova e visual) | Já existe gente pesquisando "franquia" e você quer pegar essa intenção |

> **No caso GRAVA.AI:** a marca é nova, inovadora e MUITO visual (um totem que personaliza produtos com IA na hora). A maioria das pessoas **nem sabe que essa franquia existe** — logo, ninguém está pesquisando por ela no Google ainda. Isso aponta fortemente para começar **gerando demanda no Meta Ads**, mostrando o totem em ação e plantando o desejo. O Google entra depois, para capturar quem já ouviu falar e foi pesquisar.

### Por onde um iniciante deve começar — e por quê

Se você nunca rodou um anúncio na vida, **comece pelo Meta Ads (Instagram/Facebook)**. Motivos, em ordem de importância:

1. **Combina com o seu produto.** A GRAVA.AI é uma oportunidade visual e desconhecida. Ninguém procura no Google o que não sabe que existe. O Meta é feito para *apresentar algo novo* e criar desejo — exatamente o que uma franquia nova precisa.
2. **É mais barato para errar aprendendo.** No Meta você consegue começar com R$ 20-50/dia e testar imagens, textos e públicos rapidinho. É a melhor "escola" para iniciante.
3. **A configuração é mais visual e perdoa mais.** O Google Ads de Pesquisa envolve escolher palavras-chave, entender tipos de correspondência e concorrência por termos caros — mais técnico e mais fácil de queimar dinheiro sem perceber.
4. **Volume de leads para o algoritmo aprender.** Como o Meta gera mais volume, o algoritmo entra mais rápido na fase de aprendizado e começa a te trazer leads parecidos com os bons.

**O caminho recomendado (visão geral, detalharemos nas próximas seções):**

1. Comece **só no Meta Ads**, com **um** objetivo: gerar **leads** de franqueado.
2. **Antes de subir a campanha**, instale o rastreamento (Pixel) no site que você fez e configure o evento de "lead" (formulário enviado / clique no WhatsApp). Sem isso, você roda cego.
3. Rode com orçamento pequeno e lance automático por 2-3 semanas. Observe o **CPL** e a **qualidade** dos leads (eles têm perfil e dinheiro para investir?).
4. **Só depois** que o Meta estiver rodando bem e você entender os números, adicione o **Google Ads de Pesquisa** para capturar quem já começou a pesquisar "franquia GRAVA.AI" ou termos parecidos.

⚠️ **Erros de iniciante (por onde começar):**
- Abrir Meta E Google ao mesmo tempo, sem experiência. Você não vai conseguir cuidar bem dos dois e não vai saber o que funcionou.
- Começar pelo Google achando que "é mais sério". Para uma marca nova e visual, sem gente pesquisando, você paga caro por termos genéricos e colhe pouco.
- Subir campanha sem o Pixel/tag instalado no site. É o erro mais comum e o mais caro.

✅ **Checklist "estou pronto para entender o resto do guia":**
- [ ] Entendi que anúncio é **leilão**, não preço de tabela — e que anúncio bom paga menos.
- [ ] Sei o que são **CPM, CPC, CPL e CPA** e que meu número-chave é o **CPL**.
- [ ] Entendi **orçamento diário** (freio) e que o **lance começa automático**.
- [ ] Entendi que o algoritmo **aprende com as conversões** e por isso preciso instalar o **rastreamento** no meu site.
- [ ] Sei a diferença entre **gerar demanda (Meta)** e **capturar demanda (Google)** — e que, para a GRAVA.AI, começo pelo **Meta**.

---

## 3. Meta Ads (Facebook e Instagram) do zero

Aqui você vai aprender, do absoluto zero, a rodar anúncios pagos no Facebook e no Instagram para captar pessoas interessadas em abrir uma franquia GRAVA.AI. No fim desta seção você terá montado, sozinho, sua primeira campanha apontando para a landing page "Seja um Franqueado" que você mesmo construiu.

**Primeiro, entenda o nome das coisas:**

- **Meta** é a empresa dona do Facebook, do Instagram e do WhatsApp. Quando você anuncia em qualquer um deles, está usando a mesma ferramenta.
- **Meta Ads** ("Ads" = anúncios, em inglês) é o sistema de anúncios pagos da Meta. É onde você paga para o Facebook mostrar seu anúncio para milhares de pessoas.
- **Tráfego pago** é justamente isso: pagar para trazer visitantes ("tráfego") até o seu site. O oposto é o "tráfego orgânico", que é quando as pessoas chegam de graça (por uma busca no Google, por um post que viralizou etc.).

> Analogia: pense no Instagram como uma avenida movimentadíssima. O tráfego orgânico é você colar um cartaz no seu próprio muro e torcer para alguém passar e ver. O tráfego pago é alugar um outdoor gigante na avenida e escolher exatamente quem vai enxergá-lo: "quero mostrar para homens de 30 a 50 anos, que moram em capitais e já demonstraram interesse em empreender". É esse poder de escolher o público que faz o tráfego pago valer a pena.

---

### 3.1. O Gerenciador de Negócios (Meta Business Manager)

Antes de criar um único anúncio, você precisa de uma "central de comando". Essa central se chama **Gerenciador de Negócios** (em inglês, *Meta Business Manager*, ou apenas *Business Manager* / *BM*).

**O que é:** é um painel profissional, separado do seu perfil pessoal do Facebook, onde ficam guardados de forma organizada: sua conta de anúncios, sua página do Facebook, seu Instagram, seus meios de pagamento e o Pixel (uma peça que veremos na seção de rastreamento). Tudo num lugar só.

**Por que não anunciar direto pelo botão "Impulsionar" do post?** Porque o botão "Impulsionar publicação" (aquele azul que aparece embaixo dos seus posts) é a versão "de brinquedo": simples, mas sem controle de público, sem objetivo de Cadastros e sem relatórios decentes. Todo profissional usa o Gerenciador de Negócios. É mais passos no começo, mas é o certo.

**Passo a passo para criar o seu:**

1. Acesse **business.facebook.com** e clique em **Criar conta**.
2. Faça login com seu perfil pessoal do Facebook (não se preocupe: ninguém vê seu perfil pessoal nos anúncios; ele é só a "chave" que te identifica como dono).
3. Informe o **nome do negócio** (ex.: `GRAVA.AI Franquias`), seu nome e um e-mail de trabalho.
4. Confirme o e-mail que a Meta enviar.
5. Pronto: você caiu no painel do Gerenciador de Negócios.

> ⚠️ **Erros de iniciante**
> - **Criar tudo no perfil pessoal.** Se você impulsionar direto pelo perfil, um dia que precisar dar acesso a uma agência ou a um sócio vai ser uma dor de cabeça. Comece já no Gerenciador de Negócios.
> - **Usar o Facebook de um funcionário.** Crie o Gerenciador com um login que seja SEU (dono). Se a pessoa sair da empresa, ela leva os anúncios junto.

---

### 3.2. As duas peças obrigatórias: Página e Conta de Anúncios

Dentro do Gerenciador, você precisa de duas coisas para poder anunciar:

**a) A Página do Facebook**
Todo anúncio "sai" em nome de uma Página (não do seu perfil). É o rosto público da marca. Se a GRAVA.AI ainda não tem uma Página, crie uma:
- No Gerenciador, vá em **Configurações do negócio → Contas → Páginas → Adicionar → Criar nova página**.
- Nome: `GRAVA.AI`. Categoria: algo como "Serviço empresarial" ou "Franquia".
- Conecte também o **Instagram** da marca (em Configurações do negócio → Contas do Instagram). Assim o mesmo anúncio roda nas duas redes.

**b) A Conta de Anúncios**
É a "carteira" de onde sai o dinheiro e onde ficam suas campanhas.
- Vá em **Configurações do negócio → Contas → Contas de anúncios → Adicionar → Criar nova conta de anúncios**.
- Dê um nome (ex.: `GRAVA.AI - Franquias`), escolha o **fuso horário** (Brasília) e a **moeda** (Real / BRL).
- ⚠️ Atenção: **fuso e moeda não podem ser mudados depois**. Escolha certo.
- Adicione um **cartão de crédito** em **Pagamentos**. É assim que a Meta cobra pelos anúncios.

> ✅ **Checklist de estrutura (faça uma vez só)**
> - [ ] Gerenciador de Negócios criado com o SEU login de dono
> - [ ] Página do Facebook da GRAVA.AI criada
> - [ ] Instagram da marca conectado
> - [ ] Conta de anúncios criada (fuso Brasília, moeda BRL)
> - [ ] Cartão de crédito cadastrado

---

### 3.3. A estrutura de todo anúncio: Campanha › Conjunto › Anúncio

Esta é a parte mais importante de entender, porque **tudo** no Meta Ads é organizado em três níveis, um dentro do outro, como bonecas russas. Se você entender isso, entendeu 80% da ferramenta.

```
CAMPANHA  ......... "O QUÊ eu quero?" (o objetivo)
   └── CONJUNTO DE ANÚNCIOS ... "PARA QUEM, ONDE e QUANTO?" (público, orçamento)
          └── ANÚNCIO ......... "COM O QUÊ eu falo com a pessoa?" (imagem/vídeo + texto)
```

| Nível | O que você decide aqui | Exemplo GRAVA.AI |
|---|---|---|
| **Campanha** | O **objetivo** — qual resultado você quer que a Meta persiga | "Quero **Cadastros** (leads) de gente interessada em franquia" |
| **Conjunto de anúncios** | O **público**, o **orçamento**, a **programação** e onde o anúncio aparece | "Homens e mulheres, 28-55 anos, capitais, com interesse em 'empreendedorismo'; R$ 30/dia" |
| **Anúncio** | O **criativo**: a imagem ou vídeo, o texto e o botão que a pessoa vê | Vídeo do totem personalizando uma caneca + texto "Fature com a tecnologia que personaliza na hora" |

Uma analogia que fixa isso: imagine que você vai distribuir panfletos da franquia.
- A **Campanha** é a sua meta: "conseguir contatos de possíveis franqueados".
- O **Conjunto** é o plano de distribuição: "vou entregar panfleto na saída do centro empresarial, das 8h às 10h, gastando R$ 30 por dia".
- O **Anúncio** é o panfleto em si: a arte, a foto, a frase de chamada.

Você pode ter **vários conjuntos dentro de uma campanha** (ex.: um mirando "empreendedores" e outro mirando "investidores") e **vários anúncios dentro de um conjunto** (ex.: uma versão com foto e outra com vídeo, para ver qual funciona melhor).

---

### 3.4. Escolhendo o OBJETIVO certo (o mais decisivo)

Quando você clica em "Criar campanha", a Meta pergunta qual é o seu objetivo. **Essa escolha muda completamente para quem a Meta vai mostrar seu anúncio.** Errar aqui é o erro nº 1 de quem começa.

Por quê? Porque a Meta é uma máquina que "entrega o que você pede". Se você pedir **cliques**, ela vai caçar gente que adora clicar em tudo (mas não preenche nada). Se você pedir **Cadastros**, ela vai atrás de gente com perfil de quem realmente preenche formulários. É como pedir a um garçom "traga qualquer prato" versus "traga o prato X": você recebe coisas bem diferentes.

Os objetivos disponíveis (nomes atuais da Meta):

| Objetivo | Para que serve | Serve pra você? |
|---|---|---|
| Reconhecimento | Só aparecer para o máximo de gente (marca) | Não, agora não |
| Tráfego | Levar cliques ao site (gente que só passa) | Não é o ideal |
| Engajamento | Curtidas, comentários, mensagens | Não |
| **Cadastros (Leads)** | **Conseguir contatos: nome, telefone, e-mail** | **✅ SIM — é este** |
| Promoção do app | Instalar aplicativos | Não |
| Vendas | Vendas diretas em e-commerce | Não |

**Você vai escolher "Cadastros"** (em inglês pode aparecer como *Leads*). É o objetivo desenhado para captar contatos — exatamente o que uma franquia precisa: o nome e o telefone de quem quer saber mais.

Dentro de "Cadastros", a Meta ainda pergunta ONDE a pessoa vai deixar o contato. Você tem duas opções:

- **Site (a sua landing page):** o anúncio leva a pessoa para a página "Seja um Franqueado" que você construiu, e ela preenche o SEU formulário. **É esta que vamos usar**, porque o lead cai direto no seu sistema e você controla tudo.
- **Formulário instantâneo (Lead Form):** a pessoa preenche um formulário que abre dentro do próprio Instagram/Facebook, sem sair do app. É mais fácil para o usuário, mas o contato fica "preso" na Meta até você exportar. Guarde essa opção para testar mais adiante.

> Como desenvolvedor, você tem uma vantagem: sua landing page pode receber o lead, mandar para um banco de dados, disparar um e-mail e ainda abrir o WhatsApp. Aproveite isso e mande o tráfego para o **Site**.

---

### 3.5. Definindo o PÚBLICO (para quem o anúncio aparece)

Isso é feito no nível **Conjunto de anúncios**. Aqui você "desenha" a pessoa ideal. Vamos por partes.

**a) Localização**
Onde moram as pessoas que você quer atingir. Para franquia, pense onde faz sentido ter um quiosque GRAVA.AI: shoppings e centros urbanos.
- Comece por **capitais e regiões metropolitanas** (ex.: São Paulo, Rio, Belo Horizonte, Curitiba).
- Você pode escolher o Brasil inteiro, um estado, uma cidade, ou até um **raio** (ex.: "40 km ao redor de São Paulo").

**b) Idade e gênero**
Quem tem perfil de investir numa franquia. Um ponto de partida seguro: **28 a 55 anos**, todos os gêneros. Deixe amplo no início — a própria Meta vai aprender onde estão os melhores.

**c) Interesses e comportamentos (segmentação detalhada)**
Aqui você diz do que a pessoa gosta. A Meta sabe os interesses de cada usuário pelo que ele curte e segue. Para franqueado, bons interesses para testar:
- "Empreendedorismo"
- "Pequenas e médias empresas"
- "Investimento"
- "Franquia" / "Franchising"
- "Renda extra" / "Negócio próprio"

> ⚠️ **Erro de iniciante:** empilhar 20 interesses de uma vez achando que "quanto mais, melhor". Vira uma sopa. Comece com 3 a 5 interesses relacionados. Se juntar coisas muito diferentes, você não saberá o que funcionou.

**d) Públicos especiais (os mais poderosos — vale entender os nomes)**

Estes três você provavelmente ainda não terá dados suficientes para usar no primeiro dia, mas precisa saber o que são, porque são o "próximo nível":

- **Público personalizado (Custom Audience):** um público montado a partir de pessoas que **já tiveram contato com você**. Exemplos: quem visitou sua landing page, sua lista de e-mails/telefones de contatos antigos, quem interagiu com seu Instagram.

- **Remarketing (ou retargeting):** é usar um público personalizado para **falar de novo com quem já te conhece**. Exemplo concreto GRAVA.AI: a pessoa entrou na página "Seja um Franqueado", leu, mas não preencheu. Com remarketing, você mostra um novo anúncio só para ela dias depois ("Ainda pensando em empreender com a GRAVA.AI? Fale com a gente"). É o público que MAIS converte, porque é gente "morna", que já demonstrou interesse. (Para isso funcionar, você precisa instalar o Pixel no site — assunto da próxima seção.)

- **Público semelhante (Lookalike):** você entrega à Meta uma lista de "gente boa" (ex.: seus melhores leads ou franqueados atuais) e pede: "ache mais pessoas PARECIDAS com estas". A Meta varre a base dela e encontra gente com comportamento similar. É como dizer ao algoritmo: "gostei destes clientes, me traga mais iguais". Poderosíssimo, mas exige ter uma lista-base primeiro.

> A ordem natural na sua jornada será: **começar por interesses** (frio) → **instalar o Pixel** e criar **remarketing** (morno) → quando tiver volume de leads, criar **lookalike** (escala). Não pule etapas.

---

### 3.6. Orçamento e programação (quanto e quando)

Também no nível do **Conjunto de anúncios**.

**Orçamento — duas formas:**
- **Diário:** você define quanto quer gastar por dia (ex.: R$ 30/dia). A Meta gasta em média isso todo dia. **Recomendado para começar** — é previsível.
- **Total (vitalício):** você define um valor para o período inteiro (ex.: R$ 900 no mês) e a Meta distribui.

**Quanto colocar no começo?** Um valor com que você aprende sem se machucar. Faixa comum para iniciante: **R$ 20 a R$ 50 por dia**. Com isso você já coleta dados suficientes em uma ou duas semanas para saber se o público e o criativo funcionam.

> Pense no orçamento inicial como "dinheiro de aprendizado", não de venda. Os primeiros dias servem para descobrir qual público e qual anúncio trazem lead mais barato. Depois você coloca mais dinheiro no que já se provou.

**Programação:** você pode deixar rodando continuamente (mais simples) ou definir data de início e fim. Para captação de franquia, deixar rodando o dia todo costuma ser o melhor começo — deixe a Meta descobrir os melhores horários.

> ⚠️ **Erros de iniciante**
> - **Achar que gastou "R$ 30" e não veio nada = não funciona.** Com R$ 30 num único dia a Meta mal saiu da fase de aprendizado. Dê pelo menos 5 a 7 dias antes de julgar.
> - **Mexer na campanha toda hora.** Cada edição reinicia o "aprendizado" do algoritmo. Configure com calma e deixe respirar por alguns dias.
> - **Colocar R$ 500/dia de cara.** Você queima dinheiro antes de saber o que funciona. Comece pequeno, escale o que der certo.

---

### 3.7. O CRIATIVO (o anúncio que a pessoa vê)

"Criativo" é o nome que o mercado dá para a peça do anúncio: a **imagem ou vídeo** + o **texto** + o **botão de chamada**. É o que aparece na tela do usuário. Configurado no nível **Anúncio**.

Partes de um criativo:

1. **A mídia (imagem ou vídeo):** é o que para o dedo da pessoa que está rolando o feed.
   - **Vídeo costuma render mais** para franquia, porque mostra o "show": o totem personalizando uma caneca, uma camiseta, um chinelo na hora, com a IA gerando a arte. Isso desperta o "quero ter isso no meu negócio".
   - Se for imagem, use uma foto real, chamativa, do quiosque ou do produto personalizado. Evite banco de imagens genérico.
   - Formato: prefira **quadrado (1:1)** ou **vertical (4:5 / 9:16)**, que ocupam mais tela no celular.

2. **O texto principal (copy):** as linhas acima da imagem. Fale a linguagem de quem quer um negócio:
   - Comece com um gancho: *"Quer um negócio lucrativo que cabe num quiosque?"*
   - Mostre o diferencial: *"A GRAVA.AI usa inteligência artificial para personalizar produtos na hora — o cliente vê a arte pronta em segundos."*
   - Feche com um convite (chamada para ação): *"Preencha seus dados e receba as informações para ser um franqueado."*

3. **O título e a descrição:** frases curtas de reforço (ex.: título *"Seja um Franqueado GRAVA.AI"*).

4. **O botão de chamada (CTA — Call To Action):** o botãozinho do anúncio. Para captação, use **"Saiba mais"** ou **"Cadastre-se"**. Ele leva para a sua landing page.

> ⚠️ **Regra importante da Meta e da MEMÓRIA da marca:** siga a diretriz do projeto de **não expor valores nem percentuais** no anúncio. Nada de "invista R$ X" ou "lucre Y%". O número é a "isca" que você entrega no contato, depois que a pessoa vira lead. No anúncio, venda a oportunidade e a tecnologia, não o preço.

> ⚠️ **Outros erros de iniciante no criativo**
> - **Texto gigante na imagem.** A Meta entrega menos anúncios muito "poluídos" de texto. Deixe o texto pesado na copy, não na foto.
> - **Um criativo só.** Sempre suba 2 ou 3 variações (ex.: um vídeo, uma foto) no mesmo conjunto e deixe a Meta descobrir o vencedor.
> - **Prometer o que a página não entrega.** Se o anúncio diz "receba as informações", a landing page tem que ter o formulário claro e visível. Coerência entre anúncio e página = mais conversão e menos custo.

---

### 3.8. PASSO A PASSO: sua primeira campanha de captação de franqueado

Agora juntamos tudo. Objetivo: rodar um anúncio no Instagram/Facebook que leva a pessoa para a sua landing page "Seja um Franqueado".

1. **Entre no Gerenciador de Anúncios.** Acesse **adsmanager.facebook.com** (é a tela onde você cria campanhas, diferente do Business Manager que é a central geral). Confirme, no topo, que está com a conta de anúncios certa selecionada.

2. **Clique em "+ Criar".**

3. **Escolha o objetivo "Cadastros" (Leads).** Clique em Continuar. Dê um nome à campanha, ex.: `Captação Franqueados - Junho`.

4. **(Nível Campanha) Deixe o resto no padrão** por enquanto. Se aparecer a opção "Orçamento da campanha (Advantage/CBO)", pode deixar desligada no começo — assim você controla o orçamento no conjunto.

5. **(Nível Conjunto de anúncios) Escolha onde captar o lead.** Em "Local de conversão", selecione **Site**. Isso confirma que o lead vai para a sua landing page.

6. **Defina o público:**
   - Localização: comece por 2 ou 3 capitais.
   - Idade: 28–55. Gênero: todos.
   - Segmentação detalhada: adicione 3 a 5 interesses (Empreendedorismo, Franquia, Investimento, Renda extra).

7. **Defina o orçamento:** Diário, R$ 30 (ajuste ao seu bolso). Deixe a programação "rodar continuamente".

8. **(Nível Anúncio) Escolha a Página** do Facebook da GRAVA.AI (e o Instagram conectado) como identidade do anúncio.

9. **Monte o criativo:**
   - Suba o **vídeo ou a imagem**.
   - Escreva o **texto principal** (a copy da seção 3.7).
   - Preencha **título** e **descrição**.
   - Em **botão**, escolha "Saiba mais".

10. **Coloque o link da landing page** no campo de destino (URL do site), ex.: `https://grava.ai/seja-um-franqueado`. Confira que o link abre certinho.

11. **Revise a prévia** à direita: veja como fica no feed do Instagram e do Facebook, no celular. Leia como se fosse um cliente.

12. **Clique em "Publicar".** Pronto — seu anúncio entra em **análise da Meta** (leva de minutos a algumas horas). Depois de aprovado, ele começa a rodar.

> Nos primeiros dias o anúncio entra em **"fase de aprendizado"** (a Meta escreve isso no painel). É normal os resultados oscilarem. **Não mexa.** Deixe rodar de 5 a 7 dias, depois avalie.

---

### 3.9. ✅ Checklist final antes de publicar

- [ ] Objetivo da campanha é **Cadastros / Leads** (não "Tráfego" nem "Engajamento")
- [ ] Local de conversão configurado como **Site** (apontando para a landing page)
- [ ] Público definido: localização, idade 28–55, 3 a 5 interesses relacionados a negócio
- [ ] Orçamento diário compatível com o bolso (R$ 20–50 para começar)
- [ ] Página do Facebook + Instagram selecionados como identidade do anúncio
- [ ] Pelo menos **2 criativos** (ex.: 1 vídeo + 1 imagem) no conjunto
- [ ] Texto do anúncio **vende a oportunidade, sem citar valores ou percentuais**
- [ ] Botão "Saiba mais" com o **link correto** da landing page (testado e funcionando)
- [ ] Prévia revisada no celular, feed do Instagram e do Facebook
- [ ] Combinado comigo mesmo: **não mexer na campanha pelos primeiros 5–7 dias**

> **Próximo passo natural:** para o remarketing e o lookalike (seção 3.5) funcionarem, e para você medir de verdade quantos leads vieram dos anúncios, é preciso instalar o **Pixel da Meta** na sua landing page. Como você é o desenvolvedor do site, isso ficará fácil — e é exatamente o que veremos na próxima seção.

---

## 4. Google Ads do zero

Se você chegou até aqui sabendo programar mas sem saber NADA de tráfego pago, relaxa: esta seção é o seu "curso acelerado" de Google Ads pensado para o seu caso real — vender franquias da **GRAVA.AI** (os quiosques que personalizam produtos com IA). No fim, você vai conseguir criar sua primeira campanha sozinho.

Vamos do conceito mais básico ao passo a passo prático.

---

### 4.1 O que é o Google Ads (em uma frase)

**Google Ads** é o sistema de anúncios pagos do Google. Você paga para aparecer na frente de pessoas — seja quando elas *pesquisam algo no Google*, seja quando estão *assistindo YouTube*, *lendo um blog* ou *usando um app*.

Pensa assim: o Google é a maior "lista telefônica do mundo", só que em vez de você esperar a pessoa te achar, você **compra o lugar da frente da fila**.

> **Termo novo — Tráfego pago:** "tráfego" são as visitas/pessoas que chegam até você. "Tráfego pago" é quando você **paga** para trazer essas pessoas (via anúncios), em oposição ao "tráfego orgânico", que é quando elas chegam de graça (por busca natural, indicação, etc.).

> **Termo novo — Lead:** é um contato interessado. No seu caso, um lead é alguém que preencheu o formulário "Seja um Franqueado" ou clicou no seu botão de WhatsApp. Ele ainda não é franqueado — é um *candidato* que demonstrou interesse. Seu objetivo com Google Ads é **gerar leads baratos e de qualidade**.

---

### 4.2 Os 4 tipos de campanha (explicados como se você tivesse 5 anos)

O Google Ads tem vários "formatos" de anúncio. Você escolhe o formato de acordo com o objetivo. Os 4 principais:

| Tipo de campanha | O que é, na prática | Analogia | Serve pra você AGORA? |
|---|---|---|---|
| **Pesquisa (Search)** | Seus anúncios aparecem em **texto** no topo do Google quando alguém pesquisa uma palavra. | O cara já entrou na loja procurando o produto e você é o vendedor na porta. | ✅ **SIM. Comece por aqui.** |
| **Performance Max (PMax)** | Uma campanha "automática" que o Google espalha em TODqualos lugares (busca, YouTube, Gmail, Display, Maps) e a IA dele decide tudo. | Contratar um piloto automático que voa para todo lado. | ⚠️ Depois, quando tiver dados. Não como primeira. |
| **Display** | Banners com **imagem** que aparecem em sites, blogs e apps parceiros do Google. | Outdoor digital espalhado pela internet. | ⚠️ Bom para *remarketing* (ver adiante), não para começar. |
| **YouTube (Vídeo)** | Anúncios em **vídeo** antes/durante os vídeos do YouTube. | Comercial de TV, só que no YouTube. | ⚠️ Ótimo quando você tiver um bom vídeo. Fase 2. |

> **Termo novo — Display:** é a "rede de sites parceiros" do Google. Milhões de sites cedem um espacinho para o Google colocar anúncios em imagem. Quando você vê um banner num blog de notícias, geralmente é Display.

> **Termo novo — Remarketing (ou Retargeting):** mostrar anúncios para quem **já visitou seu site** e não converteu. É aquela sensação de "esse anúncio está me perseguindo". É barato e eficiente, mas só funciona *depois* que você já tem visitantes — por isso não é o primeiro passo.

**Regra de ouro para iniciante:** comece **100% com Pesquisa (Search)**. É o formato mais fácil de entender, o mais previsível e o que pega a pessoa no momento em que ela **está procurando** exatamente o que você vende. Os outros formatos você adiciona depois.

---

### 4.3 O conceito mais importante: INTENÇÃO de busca

Essa é a "sacada" que faz o Google ser tão poderoso — e diferente do Instagram/Facebook (Meta).

Quando alguém digita no Google **"franquia barata para investir"**, essa pessoa está **ativamente procurando** investir numa franquia AGORA. Ela levantou a mão. Isso se chama **intenção de compra**.

Compare:
- **No Meta (Instagram/Facebook):** a pessoa está vendo foto do cachorro do amigo e seu anúncio *interrompe* ela. Você tem que despertar o desejo do zero. É "demanda fria".
- **No Google Pesquisa:** a pessoa **já tem o desejo** e está caçando a solução. Você só precisa aparecer. É "demanda quente".

Por isso, para vender franquia, o Google Pesquisa costuma trazer leads **mais qualificados** (gente que já quer investir), enquanto o Meta traz **mais volume** de gente descobrindo a marca. Falo mais disso no item 4.9.

> ⚠️ **Erros de iniciante:**
> - Achar que "quanto mais gente vê, melhor". Não. **Melhor 10 pessoas que QUEREM franquia do que 10.000 curiosos.** Intenção > volume.
> - Confundir intenção. Quem pesquisa "como personalizar caneca" quer *comprar uma caneca*, não *virar franqueado*. São mundos diferentes.

---

### 4.4 Palavras-chave: o coração da campanha de Pesquisa

> **Termo novo — Palavra-chave (keyword):** é o termo (uma ou mais palavras) que a pessoa digita no Google e que você "compra" para seu anúncio aparecer. Você basicamente diz ao Google: "quando alguém pesquisar ISSO, mostre meu anúncio".

No seu caso, boas palavras-chave giram em torno de quem quer **investir/empreender**:

**Palavras-chave boas (alta intenção de franqueado):**
- `franquia para investir`
- `melhores franquias 2026`
- `quero abrir uma franquia`
- `franquia de tecnologia`
- `franquia com inteligência artificial`
- `investir em franquia quiosque`
- `franquia de personalização de produtos`
- `franquia lucrativa`

**Palavras-chave RUINS (intenção errada — evite):**
- `personalizar caneca` (quer comprar caneca, não franquia)
- `como usar IA de graça` (curioso de tecnologia)
- `emprego GRAVA.AI` (quer *trabalhar*, não *investir*)

> **Termo novo — Palavra-chave negativa:** é uma palavra que você **bloqueia** para NÃO aparecer. Se você adicionar `emprego`, `vaga`, `grátis`, `download` e `curso` como negativas, o Google não mostra seu anúncio para quem digitar isso. **Isso economiza MUITO dinheiro.** Voltamos nisso no passo a passo.

---

### 4.5 Tipos de correspondência (o "aperto" da palavra-chave)

Aqui muita gente perde dinheiro por não entender. Quando você cadastra uma palavra-chave, precisa dizer ao Google **o quão parecida** a busca da pessoa tem que ser para acionar seu anúncio. Isso se chama **tipo de correspondência (match type)**.

São 3 tipos. Pense num controle de "quão aberto vs. quão travado":

| Tipo | Como se escreve | O que faz | Exemplo com `franquia para investir` |
|---|---|---|---|
| **Ampla** (broad) | `franquia para investir` (sem símbolo) | O Google mostra para buscas que ele *acha* relacionadas — inclusive coisas distantes. Muito alcance, muito desperdício. | Pode acionar em "investir na bolsa", "franquia de comida barata"... |
| **Frase** (phrase) | `"franquia para investir"` (entre aspas) | Mostra para buscas que contenham aquela ideia **na ordem**, podendo ter palavras antes/depois. Equilíbrio bom. | Aciona em "melhor franquia para investir 2026", "franquia para investir pouco" |
| **Exata** (exact) | `[franquia para investir]` (entre colchetes) | Mostra só para buscas com **o mesmo significado** bem próximo. Menos alcance, muito mais preciso. | Aciona em "franquia pra investir", "franquias para investir" — e pouco mais |

**Recomendação para iniciante:** comece com **Correspondência de Frase** (`"assim"`) e **Correspondência Exata** (`[assim]`). Elas te dão controle. **Fuja da Ampla no começo** — ela gasta seu orçamento com buscas irrelevantes enquanto você ainda não sabe filtrar.

> ⚠️ **Erro de iniciante clássico:** cadastrar tudo em correspondência ampla porque "aparece mais". Você vai aparecer para "franquia de açaí", "investir em cripto" e queimar o orçamento do dia antes do almoço.

---

### 4.6 A estrutura da conta (pense em pastas dentro de pastas)

Toda conta do Google Ads é organizada em 3 níveis. Como você é dev, vou usar uma analogia de código/pastas:

```
CONTA (sua empresa: GRAVA.AI)
│
├── CAMPANHA  → aqui mora o ORÇAMENTO e a localização/idioma
│   │           (ex: "Franqueados - Brasil")
│   │
│   ├── GRUPO DE ANÚNCIOS  → agrupa um TEMA de palavras + os anúncios dele
│   │   │                    (ex: "Franquia de Tecnologia/IA")
│   │   ├── Palavras-chave:  "franquia de tecnologia", [franquia com IA]...
│   │   └── Anúncios:        seus textos de anúncio
│   │
│   └── GRUPO DE ANÚNCIOS
│       │                    (ex: "Franquia Lucrativa/Investir")
│       ├── Palavras-chave:  "franquia para investir", [franquia lucrativa]...
│       └── Anúncios:        outros textos, focados em "investir"
```

Traduzindo cada nível:

1. **Campanha** — é onde você define o **orçamento diário** (quanto gasta por dia), o **local** (ex: Brasil todo, ou só sua cidade) e o objetivo. Pense na campanha como "a conta bancária + as regras gerais".
2. **Grupo de anúncios** — é uma "gaveta temática". Cada gaveta junta palavras-chave que falam da **mesma ideia** e os anúncios feitos sob medida para ela. Regra: **1 tema = 1 grupo**.
3. **Anúncios + Palavras-chave** — dentro da gaveta ficam as palavras que a pessoa digita e os textos que ela vê.

> ⚠️ **Erro de iniciante:** jogar 50 palavras-chave de temas diferentes num único grupo de anúncios. Aí seu anúncio "franquia de tecnologia" aparece para quem buscou "franquia barata" e a mensagem não bate. **Separe por tema.** Palavras que "falam a mesma língua" ficam juntas.

**Por que separar em grupos importa?** Porque o anúncio precisa "espelhar" a busca. Se a pessoa pesquisou *"franquia de tecnologia"*, o anúncio que fala **"Franquia de Tecnologia com IA"** converte muito mais do que um genérico. Grupos separados = anúncios sob medida.

---

### 4.7 Anúncios de texto responsivos (o formato do Search)

No Google Pesquisa, hoje o formato padrão é o **Anúncio de Pesquisa Responsivo** (RSA — *Responsive Search Ad*).

> **Termo novo — Anúncio responsivo:** em vez de você escrever UM anúncio fixo, você fornece **vários títulos e várias descrições** avulsos, e o Google **testa combinações automaticamente**, mostrando para cada pessoa a mistura que tende a converter melhor. É como dar ao Google um "kit de peças de Lego" e ele monta o melhor anúncio para cada busca.

O que você precisa fornecer:
- **Até 15 títulos** (headlines) — cada um com **até 30 caracteres**.
- **Até 4 descrições** — cada uma com **até 90 caracteres**.
- Forneça no mínimo uns **8 a 10 títulos** e **3 a 4 descrições** para o Google ter material para testar.

**Exemplo pronto para a GRAVA.AI:**

*Títulos (30 caracteres cada):*
1. Franquia GRAVA.AI Oficial
2. Franquia de Tecnologia e IA
3. Seja Dono da Sua Franquia
4. Personalização com IA
5. Baixo Investimento Inicial *(veja o alerta abaixo)*
6. Modelo de Negócio Validado
7. Quiosque que Dá Retorno
8. Fale com um Consultor Hoje
9. Franquia Inovadora 2026
10. Empreenda com a GRAVA.AI

*Descrições (90 caracteres cada):*
1. Tenha uma franquia de personalização com IA. Modelo compacto e moderno. Fale conosco!
2. Quiosque de tecnologia que personaliza produtos na hora. Solicite a apresentação completa.
3. Poucas vagas por cidade. Garanta sua região antes da concorrência. Clique e saiba mais.

> ⚠️ **Atenção à regra do seu projeto (memória):** **não exponha valores nem percentuais** ("R$ X" ou "lucre 40%") nos anúncios. O número é a *isca entregue no contato*. Prefira "baixo investimento", "modelo acessível", "solicite os valores". Isso também evita reprovação do anúncio por promessa de ganhos.

**Dicas de ouro para os títulos:**
- Coloque a **palavra-chave** do grupo em pelo menos 3 títulos (ex: no grupo "tecnologia", use "Franquia de Tecnologia"). Anúncio que "casa" com a busca ganha relevância e fica **mais barato**.
- Tenha sempre um título com **chamada para ação** (CTA): "Fale com um Consultor", "Solicite a Apresentação".
- Um título com **escassez/urgência**: "Poucas Vagas por Cidade".

> **Termo novo — CTA (Call to Action / Chamada para ação):** a frase que diz à pessoa o que fazer agora ("Fale conosco", "Cadastre-se", "Peça a apresentação"). Sem CTA, a pessoa lê e não age.

---

### 4.8 Como o Google decide quem aparece e quanto custa (rapidinho)

Você não paga um "preço de tabela". Funciona como um **leilão instantâneo** que acontece toda vez que alguém pesquisa. Dois fatores decidem sua posição:

1. **Seu lance (bid):** quanto você topa pagar por clique.
2. **Índice de Qualidade (Quality Score):** nota de 1 a 10 que o Google dá medindo o quão **relevante** seu anúncio + palavra-chave + página de destino são para a busca.

**A parte boa:** um anúncio muito relevante (nota alta) **paga MENOS e aparece MAIS**. Ou seja: caprichar na estrutura (grupos por tema, anúncio que casa com a palavra, página coerente) literalmente **te faz gastar menos**.

> **Termo novo — CPC (Custo por Clique):** quanto você paga cada vez que alguém **clica** no seu anúncio. No Search você paga por clique, não por "aparecer".

> **Termo novo — Página de destino (landing page):** a página para onde o clique leva. **No seu caso, é a sua landing page "Seja um Franqueado".** Mande o tráfego para ELA, nunca para a home institucional — a landing tem o formulário e foca em converter. (A integração de rastreamento dessa página com o Google é assunto de outra seção deste guia.)

---

### 4.9 Quando Google faz mais sentido que Meta (para franquia)

Você vai ouvir muito "faça Meta Ads". As duas plataformas servem, mas para momentos diferentes:

| Situação | Melhor escolha | Por quê |
|---|---|---|
| Você quer **leads quentes**, gente que JÁ procura franquia | **Google Pesquisa** | Pega a intenção ativa ("quero abrir franquia") |
| Orçamento pequeno e você quer **previsibilidade** | **Google Pesquisa** | Você controla exatamente por qual palavra paga |
| A marca é **desconhecida** e você quer gerar desejo do zero | **Meta (Instagram/FB)** | Bom para "descoberta" e criativos visuais chamativos |
| Você tem **vídeo/imagem incríveis** dos quiosques em ação | **Meta / YouTube** | Formatos visuais brilham mostrando o produto |
| Nicho de **investidor/empreendedor** buscando oportunidade | **Google Pesquisa** | Essas pessoas literalmente pesquisam "franquias" |

**Resumo honesto:** para **captar franqueado**, o **Google Pesquisa quase sempre é o melhor PRIMEIRO canal**, porque existe gente digitando "franquia para investir" todos os dias. Depois que ele estiver rodando e trazendo leads, você adiciona Meta para volume e remarketing. Comece pelo Google.

---

### 4.10 Passo a passo: sua PRIMEIRA campanha de Pesquisa

Reserve 40 minutos e siga na ordem. (Os nomes de botões podem mudar um pouco, mas a lógica é essa.)

**Antes de começar (pré-requisitos):**
- Conta no Google Ads criada em [ads.google.com](https://ads.google.com) (use o e-mail da empresa).
- Um cartão de crédito cadastrado.
- Sua landing page "Seja um Franqueado" no ar e com o link em mãos.

**Passo 1 — Fuja do "Modo inteligente".** Ao criar a conta, o Google empurra o **Modo Inteligente (Smart Mode)**, que esconde os controles. Procure a opção **"Alternar para o Modo Especialista"** (*Expert Mode*). **Sempre use o Modo Especialista** — é onde você aprende de verdade e tem controle.

**Passo 2 — Crie a campanha e escolha o objetivo.** Clique em **+ Nova Campanha**. Se aparecer "escolha um objetivo", pode escolher **"Leads"** ou clicar em **"Criar campanha sem meta específica"**. Depois selecione o tipo **Pesquisa (Search)**.

**Passo 3 — Configure o básico da campanha:**
- **Nome:** algo claro tipo `Franqueados - Search - Brasil`.
- **Redes:** **DESMARQUE** "Rede de Display" e "parceiros de pesquisa". Você quer **só a Rede de Pesquisa do Google**. (O Google deixa marcado por padrão para gastar mais — desmarque.)
- **Localização:** onde você quer franqueados. Ex: Brasil inteiro, ou só os estados/cidades que te interessam. **Importante:** clique em opções de localização e escolha **"Presença: pessoas que estão no local que você segmenta"** (evita mostrar para quem está fora só porque *pesquisou* sobre o local).
- **Idioma:** Português.

**Passo 4 — Defina o orçamento diário.** Comece pequeno e realista, por exemplo **R$ 30 a R$ 50 por dia**. O Google mostra "média diária" — em alguns dias gasta um pouco mais, em outros menos, mas no mês respeita o total (~orçamento diário × 30,4).

**Passo 5 — Estratégia de lances.** Aqui você diz como o Google deve gastar. Para iniciante, duas opções sensatas:
- **"Maximizar cliques" com um limite de CPC máximo** (ex: teto de R$ 3 por clique) — bom para *começar e coletar dados* sem estourar o custo por clique.
- Depois de ter uns 15–30 leads, migre para **"Maximizar conversões"** (a IA otimiza para gerar formulários preenchidos, não só cliques).
> Comece em **Maximizar cliques com limite**; troque para conversões só quando tiver dados.

**Passo 6 — Crie o primeiro grupo de anúncios.** Nomeie por tema, ex: `Tecnologia-IA`. Adicione as palavras nesse tema, em **Frase e Exata**:
```
"franquia de tecnologia"
"franquia com inteligência artificial"
[franquia de tecnologia]
[franquia com ia]
```

**Passo 7 — Adicione palavras-chave negativas.** Procure **"Palavras-chave negativas"** na campanha e cole:
```
grátis
gratis
emprego
vaga
vagas
curso
download
reclame aqui
como fazer
o que é
```
Isso impede que curiosos e caçadores de emprego cliquem e queimem seu dinheiro.

**Passo 8 — Escreva o anúncio responsivo.** Use os títulos e descrições do item 4.7. Preencha:
- **URL final:** o link da sua **landing page de franqueado**.
- **Caminho de exibição** (aqueles 2 campos depois do domínio): ex `Franquia` / `Investir` → vira `grava.ai/Franquia/Investir` na aparência. É só cosmético, mas ajuda.
- Preencha o máximo de títulos/descrições possível.

**Passo 9 — (Recomendado) Adicione um segundo grupo de anúncios.** Repita o Passo 6–8 com outro tema, ex `Investir-Lucrativa`, com palavras como `"franquia para investir"`, `[franquia lucrativa]`, e anúncios com títulos focados em "investir". Ter 2 grupos temáticos já te deixa à frente de 90% dos iniciantes.

**Passo 10 — Recursos (extensões).** Antes de publicar, adicione **Recursos** (antigas "extensões"), que aumentam o tamanho e a taxa de clique do anúncio, de graça:
- **Sitelinks:** links extras ("Como Funciona", "O Modelo", "Fale Conosco").
- **Frases de destaque:** "Modelo Validado", "Suporte Completo", "Baixo Investimento".
- **Chamada (telefone):** seu número de contato.
- (Se tiver formulário) **Recurso de formulário de lead** pode capturar direto no anúncio.

**Passo 11 — Revise e publique.** Confira orçamento, localização e o link da landing. Publique. O anúncio entra em **"Em análise"** e costuma ser aprovado em algumas horas até 1 dia.

**Passo 12 — Espere e NÃO mexa.** Deixe rodar **pelo menos 7 dias** antes de julgar. O algoritmo precisa de dados. Mexer todo dia atrapalha o aprendizado.

> **IMPORTANTE — sem rastreamento você está cego.** Para saber quais palavras/anúncios geram leads de verdade, você precisa configurar o **acompanhamento de conversões** (avisar ao Google quando alguém preenche o formulário ou clica no WhatsApp). Isso envolve tocar no código do seu site (Google Tag / evento de conversão). É um assunto próprio — trate como o passo seguinte OBRIGATÓRIO depois de publicar. Sem isso, você gasta às cegas.

> **Termo novo — Conversão:** a ação valiosa que você quer que aconteça. No seu caso: **formulário de franqueado enviado** ou **clique no botão de WhatsApp**. "Taxa de conversão" é quantos % dos cliques viraram lead.

---

### 4.11 O que olhar depois (métricas sem susto)

Nos primeiros dias, olhe estas colunas no painel:

| Métrica | O que significa | O que fazer |
|---|---|---|
| **Impressões** | Quantas vezes seu anúncio apareceu | Se for 0, seu lance/orçamento está baixo demais ou a palavra tem pouca busca |
| **Cliques** | Quantos clicaram | Ok se estiver saindo |
| **CTR** (taxa de cliques) | Cliques ÷ impressões | Bom acima de ~5% no Search de nicho. Baixo? Melhore os títulos |
| **CPC médio** | Custo por clique | Se muito alto, refine palavras/negativas |
| **Termos de pesquisa** | As buscas REAIS que acionaram seu anúncio | **Olhe isso toda semana.** Achou busca ruim? Vire palavra-chave negativa |
| **Conversões** | Leads gerados | O número que REALMENTE importa |

> **Termo novo — Termos de pesquisa (Search Terms):** diferente das suas palavras-chave (o que você *comprou*), aqui aparece o que as pessoas **realmente digitaram**. É a mina de ouro do iniciante: você descobre buscas boas para adicionar e buscas ruins para bloquear como negativas.

---

### 4.12 Erros de iniciante (a lista que te salva dinheiro)

> ⚠️ **Erros de iniciante — leia duas vezes:**
> - **Deixar tudo em correspondência ampla.** Queima orçamento com buscas irrelevantes. Use Frase e Exata.
> - **Não cadastrar palavras negativas.** Você paga por "emprego", "grátis", "curso"...
> - **Mandar o clique para a home institucional** em vez da landing de franqueado. A home não converte — leve para a página com formulário.
> - **Deixar a "Rede de Display" marcada** numa campanha de Pesquisa. Espalha seu dinheiro em banners aleatórios. Desmarque.
> - **Misturar temas no mesmo grupo de anúncios.** Anúncio genérico converte pouco. Separe por tema.
> - **Mexer na campanha todo dia.** Dê pelo menos 7 dias de aprendizado.
> - **Não instalar acompanhamento de conversão.** Sem isso você não sabe o que funciona — está apostando no escuro.
> - **Começar com Performance Max.** Ela "come" o orçamento e você não aprende nada. Domine o Search primeiro.
> - **Prometer valores/ganhos no anúncio.** Além de ir contra a estratégia do projeto (o número é isca no contato), pode reprovar o anúncio.
> - **Orçamento alto no dia 1.** Comece com R$ 30–50/dia, aprenda, depois escale.

---

### 4.13 ✅ Checklist da primeira campanha

Antes de clicar em "Publicar", confira:

- [ ] Estou no **Modo Especialista** (não no Smart/Inteligente)
- [ ] Tipo de campanha = **Pesquisa (Search)**
- [ ] **Rede de Display e parceiros DESMARCADOS**
- [ ] **Localização** correta + opção "Presença: pessoas no local"
- [ ] **Orçamento diário** definido (R$ 30–50 para começar)
- [ ] Estratégia = **Maximizar cliques com limite de CPC**
- [ ] Palavras-chave em **Frase `" "`** e **Exata `[ ]`** (nada de ampla pura)
- [ ] Grupos de anúncios **separados por tema**
- [ ] **Palavras-chave negativas** adicionadas (emprego, grátis, curso, etc.)
- [ ] Anúncio responsivo com **8+ títulos e 3+ descrições**
- [ ] Palavra-chave do grupo aparece **nos títulos**
- [ ] Há **CTA** ("Fale com um Consultor") e **escassez** ("Poucas Vagas")
- [ ] **Sem valores/percentuais** no texto (regra do projeto)
- [ ] **URL final = landing page de franqueado** (não a home)
- [ ] **Recursos/extensões** adicionados (sitelinks, frases de destaque, telefone)
- [ ] **Acompanhamento de conversão** planejado para configurar logo em seguida

Se todos os itens estão marcados, publique com confiança. Depois é acompanhar os **termos de pesquisa** toda semana, cortar o que é ruim, reforçar o que traz lead — e ir aprendendo com os dados reais.

---

**Resumo da seção:** Google Pesquisa pega gente que **já quer** investir em franquia. Você organiza a conta em **campanha → grupos por tema → anúncios + palavras**, usa correspondência **Frase e Exata**, bloqueia lixo com **palavras negativas**, escreve **anúncios responsivos** que casam com a busca, manda o clique para sua **landing de franqueado** e mede tudo por **conversões**. Domine isso primeiro; Meta, PMax, Display e YouTube vêm depois.

---

## 5. Métricas, orçamento e otimização

Até aqui você aprendeu a criar campanhas. Agora vem a parte que separa quem **queima dinheiro** de quem **gera franqueados**: saber **ler os números** e tomar decisão com base neles (e não no "achismo").

Pensa assim: rodar tráfego pago sem olhar métrica é como dirigir de olhos fechados. O painel do carro (velocidade, combustível, temperatura) existe pra você **decidir**: acelera, freia, abastece. Aqui é igual. As métricas são o seu painel. Esta seção te ensina a lê-lo.

> Neste guia, "métrica" = **um número que mede alguma coisa da campanha**. Só isso. Não se assuste com os nomes em inglês — vou traduzir cada um.

---

### 5.1 As métricas que importam (com fórmula e exemplo)

Vou explicar cada métrica com: o que é, a fórmula, um exemplo no caso GRAVA.AI, e onde ela "aparece na esteira". Porque as métricas contam uma **história em sequência**: a pessoa vê o anúncio → clica → chega no site → vira lead → vira franqueado.

Guarde esta esteira na cabeça, ela organiza tudo:

```
VÊ o anúncio → CLICA → CHEGA no site → vira LEAD → vira FRANQUEADO
(impressão)   (clique)  (visita)      (formulário) (venda)
```

Cada métrica mede um "pedaço" dessa esteira.

#### Impressões

**O que é:** quantas vezes seu anúncio **apareceu na tela** de alguém. Apareceu = 1 impressão. Se a mesma pessoa vê 3 vezes, são 3 impressões.

Não é "gente diferente", é "vezes que apareceu". A métrica de gente diferente chama **Alcance** (reach). Não confunda:
- **Impressões** = quantas vezes apareceu (pode repetir a mesma pessoa).
- **Alcance** = quantas pessoas diferentes viram.

**Exemplo:** seu anúncio de franquia teve 10.000 impressões e alcance de 4.000. Ou seja, 4.000 pessoas viram, em média ~2,5 vezes cada.

Sozinha, impressão diz pouco. Ela é a **base de cálculo** das outras.

#### CPM (custo por mil impressões)

> CPM vem de "Custo Por Mil" (o "M" é mil em algarismo romano). É **quanto você paga pra aparecer 1.000 vezes**.

**Fórmula:**
```
CPM = (valor gasto ÷ impressões) × 1.000
```

**Exemplo:** gastou R$ 50 e teve 10.000 impressões → (50 ÷ 10.000) × 1.000 = **R$ 5 de CPM**. Ou seja, cada 1.000 aparições te custou R$ 5.

**Pra que serve:** o CPM mede o **preço do "espaço publicitário"**. Ele sobe quando você disputa um público muito concorrido (ex.: "empreendedores com dinheiro pra investir" é caro porque muita empresa quer falar com eles). Se o CPM disparar, ou o público está saturado, ou seu criativo é ruim (o algoritmo penaliza anúncio chato cobrando mais caro).

#### CTR (taxa de cliques)

> CTR = "Click Through Rate", taxa de cliques. De cada 100 pessoas que **viram**, quantas **clicaram**.

**Fórmula:**
```
CTR = (cliques ÷ impressões) × 100
```

**Exemplo:** 10.000 impressões e 150 cliques → (150 ÷ 10.000) × 100 = **1,5% de CTR**.

**Pra que serve:** o CTR mede se o seu **criativo + a promessa** são atraentes. É o termômetro do "a arte e o texto do anúncio pararam o dedo da pessoa?". CTR baixo = o anúncio não chamou atenção (troca a imagem, o vídeo ou a frase). CTR alto = o gancho funcionou.

#### CPC (custo por clique)

> CPC = "Cost Per Click", quanto você paga **por cada clique** no anúncio.

**Fórmula:**
```
CPC = valor gasto ÷ cliques
```

**Exemplo:** gastou R$ 50 e teve 150 cliques → 50 ÷ 150 = **R$ 0,33 por clique**.

**Pra que serve:** é quanto custa **trazer uma pessoa até seu site**. CPC caro geralmente é consequência de CTR baixo ou público concorrido. Se o CPC está alto, quase sempre o problema está **antes**: no criativo (CTR fraco).

#### Taxa de conversão da landing page

**O que é:** de cada 100 pessoas que **clicaram e chegaram no seu site**, quantas **preencheram o formulário** de franqueado.

**Fórmula:**
```
Taxa de conversão = (leads ÷ visitas ao site) × 100
```

**Exemplo:** 150 pessoas clicaram (visitaram a landing "Seja um Franqueado") e 15 preencheram o formulário → (15 ÷ 150) × 100 = **10% de conversão**.

**Pra que serve:** mede se a sua **página convence**. Atenção: essa métrica NÃO é culpa do anúncio, é culpa (ou mérito) do **seu site** — o texto, a oferta, a velocidade, o formulário. Como você é o dev, essa aqui é sua praia: se muita gente clica mas ninguém preenche, o problema é a página, não a campanha.

#### CPL (custo por lead) — a métrica-rainha pra você

> CPL = "Custo Por Lead". **Lead** = um contato interessado (alguém que preencheu o formulário ou chamou no WhatsApp). O CPL é **quanto você paga por cada franqueado-interessado** que entra na sua lista.

**Fórmula:**
```
CPL = valor gasto ÷ número de leads
```

**Exemplo:** gastou R$ 300 na semana e gerou 15 leads → 300 ÷ 15 = **R$ 20 por lead**.

**Pra que serve:** essa é a métrica **mais importante pro seu objetivo**. Você não vende sapato de R$ 90; você capta interessados numa franquia. Seu "produto" imediato é o **lead**. Então o número que você mais vai olhar é: *quanto me custa cada interessado?*

#### ROAS (retorno sobre o investimento em anúncio)

> ROAS = "Return On Ad Spend", retorno sobre o gasto com anúncio. Pra cada R$ 1 investido, **quantos reais voltaram**.

**Fórmula:**
```
ROAS = faturamento gerado ÷ valor gasto em anúncio
```

**Exemplo:** você gastou R$ 3.000 em anúncios num mês, gerou 150 leads, e desses fechou **1 franquia**. Se essa franquia te rende (na taxa de entrada + royalties do 1º ano) digamos R$ 30.000, então ROAS = 30.000 ÷ 3.000 = **10** (dez reais de volta pra cada R$ 1 gasto).

**Pra que serve:** o ROAS é a métrica **do dono do negócio**, a foto final. Só que ela tem uma pegadinha no seu caso: **a venda de franquia demora**. Um sapato vende no mesmo dia; uma franquia leva semanas de conversa, reunião, análise. Então o ROAS você só enxerga **lá na frente**. No dia a dia, você otimiza pelo **CPL** (que responde rápido) e usa o ROAS pra validar o negócio no fim do mês.

#### Tabela-resumo (imprima e cole na parede)

| Métrica | O que mede | Fórmula | Culpa de quem, se estiver ruim |
|---|---|---|---|
| Impressões | Vezes que apareceu | — | Orçamento/entrega |
| CPM | Preço de aparecer 1.000x | (gasto ÷ impressões) × 1.000 | Público concorrido / criativo |
| CTR | % que clicou | (cliques ÷ impressões) × 100 | **Criativo** (arte + frase) |
| CPC | Preço por clique | gasto ÷ cliques | Consequência do CTR |
| Conversão | % que virou lead no site | (leads ÷ visitas) × 100 | **Sua landing page** |
| CPL | Preço por lead | gasto ÷ leads | Soma de tudo acima |
| ROAS | Retorno em R$ | faturamento ÷ gasto | O negócio como um todo |

---

### 5.2 Como saber se o resultado é BOM ou RUIM

A pergunta que todo iniciante faz: *"R$ 20 por lead é bom?"*. Depende — mas você precisa de **faixas de referência** pra não ficar perdido. Abaixo, valores típicos para **captação de lead de franquia no Brasil** (Meta Ads/Instagram e Facebook). São **estimativas de ponto de partida**, não leis da física: variam por região, oferta e época.

| Métrica | Ruim (acender alerta) | Ok (mediano) | Bom (comemore) |
|---|---|---|---|
| CTR | abaixo de 0,8% | 0,8% a 1,5% | acima de 1,5% |
| CPC | acima de R$ 2,00 | R$ 0,50 a R$ 2,00 | abaixo de R$ 0,50 |
| Conversão da landing | abaixo de 3% | 3% a 8% | acima de 8% |
| CPL (franquia) | acima de R$ 60 | R$ 20 a R$ 60 | abaixo de R$ 20 |

> ⚠️ Lead de franquia é **mais caro** que lead de produto comum. É normal. Você está pescando um público raro (gente com capital e vontade de empreender), não vendendo um brinde. Um CPL de R$ 40 pra franquia pode ser ótimo, enquanto R$ 40 pra vender uma caneca seria um desastre.

**Como raciocinar com essa tabela — o diagnóstico em cadeia:**

Não olhe as métricas soltas. Leia na ordem da esteira e **ache onde o funil vaza**:

1. **CTR baixo?** → o problema é o **criativo**. Ninguém se interessou pelo anúncio. Troque imagem/vídeo/frase antes de mais nada.
2. **CTR bom, mas conversão baixa?** → o anúncio atrai, mas a **landing não convence**. Aqui é com você, dev: revise oferta, prova social, velocidade, e simplifique o formulário.
3. **CTR e conversão bons, mas CPL ainda alto?** → provavelmente o **público está caro/concorrido** (CPM alto). Teste outro público ou outra segmentação.
4. **Tudo bom mas leads não viram franquia?** → o problema saiu do marketing e virou **qualidade do lead / atendimento comercial**. Talvez o anúncio esteja atraindo curioso, não comprador.

Esse encadeamento é 80% do trabalho de otimização. Decore-o.

---

### 5.3 Quanto investir pra começar (orçamento de teste)

A dúvida nº 1 de quem começa: *"quanto boto de dinheiro?"*. A resposta certa não é um valor mágico — é uma **lógica**.

**A regra de ouro do orçamento de teste:** você precisa gastar o suficiente pra gerar **dados confiáveis**. Gastar R$ 5 e concluir "não funciona" é como jogar uma moeda uma vez e decidir se ela é viciada. Você precisa de repetição.

**Referência prática de partida (Meta Ads):**

- **Mínimo pra não andar às cegas:** R$ 30 a R$ 50 **por dia**, por conjunto de anúncios, durante **pelo menos 7 dias**. Isso dá um orçamento de teste de ~R$ 210 a R$ 350 na primeira semana.
- **Por que 7 dias?** Porque existe uma fase chamada **aprendizagem** (o algoritmo do Meta leva alguns dias "estudando" quem converte antes de otimizar de verdade). Mexer antes disso zera o aprendizado. Segure a ansiedade.
- **Quanto de dado é "suficiente"?** Uma boa régua: só tire conclusões depois de **~50 cliques** ou **pelo menos uns 3-5 leads** por variação testada. Abaixo disso, é sorte, não estatística.

**Como pensar o valor:** trabalhe de trás pra frente a partir da sua meta.

> Exemplo: quero **10 leads de franqueado no mês**. Chuto um CPL de R$ 40 (faixa realista pra franquia). Então: 10 leads × R$ 40 = **R$ 400/mês** de orçamento mínimo, ~R$ 13/dia. Como quero também **testar** variações, arredondo pra R$ 30/dia. Comecei com um número **baseado na meta**, não em achismo.

> ⚠️ **Erros de iniciante (orçamento):**
> - **Verba baixa demais:** R$ 5/dia não gera dado nenhum; você "testa" mas nunca aprende.
> - **Colocar tudo de uma vez:** despejar R$ 2.000 no dia 1, num público não testado. Comece pequeno, valide, **depois** escale.
> - **Aumentar orçamento no susto:** dobrar a verba porque "veio 1 lead" (ou cortar porque "não veio nada em 2 horas"). Dado de poucas horas não decide nada.

---

### 5.4 Como escalar o que funciona (e como parar o que não funciona)

Quando um anúncio **acha o bolso** (CPL dentro ou abaixo da meta, de forma consistente por vários dias), você vai querer colocar mais gasolina. Isso se chama **escalar**. Mas tem jeito certo.

**Escala vertical (aumentar a verba do que já funciona):**
- Aumente o orçamento em **~20% a cada 3-4 dias**. Não dobre de uma vez.
- **Por que devagar?** Todo aumento grande **reinicia a fase de aprendizagem** e costuma piorar o CPL temporariamente. Subida em degraus suaves mantém a máquina estável.

**Escala horizontal (duplicar o que funciona pra novos públicos):**
- Pegue o anúncio campeão e crie **cópias** mirando **públicos parecidos** ou novas segmentações. Assim você cresce sem "estressar" um único público até saturá-lo (quando o CPM sobe porque você já mostrou pra todo mundo daquele grupo).

**Quando PAUSAR ou AJUSTAR um anúncio:**
- **Pause** se, **depois de dado suficiente** (ver 5.3), o CPL estiver muito acima da meta e o CTR baixo. Não tem conserto por ali — corta e realoca a verba.
- **Ajuste** (em vez de pausar) se **uma peça** está boa e outra ruim: CTR ótimo mas conversão péssima? Não mexa no anúncio, mexa na **landing**. Isole a variável.
- **Frequência alta** (a mesma pessoa viu 5+ vezes) e CTR caindo? Sinal de **saturação**: o público "cansou" do anúncio. Troque o criativo ou amplie o público.

> Frequência = quantas vezes, em média, **a mesma pessoa** viu seu anúncio (impressões ÷ alcance). Acima de ~3-4 pra público frio, comece a se preocupar.

---

### 5.5 A lógica do teste A/B (a alma da otimização)

> **Teste A/B** = mostrar **duas versões** (A e B) e deixar os números dizerem qual ganha. Como um "cabo de guerra": você bota duas ideias pra competir e escala a vencedora.

A regra sagrada: **mude UMA coisa por vez**. Se você trocar a imagem **e** o texto **e** o público ao mesmo tempo e o resultado melhorar, você **não sabe qual** dos três causou. Ficou sem aprendizado.

**O que vale a pena testar, em ordem de impacto:**

1. **Criativo (o que mais move o ponteiro):** imagem estática vs. vídeo do totem GRAVA.AI personalizando um produto ao vivo. Costuma ser o teste de **maior** impacto no CTR.
2. **Gancho / primeira frase:** *"Monte sua franquia de personalização com IA"* vs. *"Um quiosque que trabalha por você"*. Muda muito o CTR.
3. **Público:** interesses (empreendedorismo, franquias, investimentos) vs. público parecido (lookalike) vs. quem já visitou o site (remarketing).
4. **A oferta / CTA da landing:** *"Receba o guia da franquia"* vs. *"Fale com um consultor"*. Isso mexe na **conversão** — e é você quem controla no código.

**Passo a passo de um teste A/B simples:**
1. Escolha **1 variável** (ex.: criativo).
2. Crie 2 anúncios idênticos em tudo, **exceto** a imagem.
3. Dê **verba igual** aos dois e **tempo/dado suficiente** (7 dias, ~50 cliques cada).
4. Compare pela métrica certa: testou criativo? Olhe **CTR e CPL**. Testou landing? Olhe **conversão**.
5. **Desligue o perdedor**, mantenha o campeão, e comece o **próximo** teste (agora mude outra variável). Isso é um ciclo que **nunca acaba** — é assim que o CPL cai mês após mês.

> ⚠️ **Erros de iniciante (teste):**
> - **Mudar tudo de uma vez** → não aprende nada.
> - **Concluir cedo demais** → "a versão A ganhou!" com 8 cliques. Não ganhou, foi sorte.
> - **Testar coisa que quase não muda nada** (a cor de um botãozinho) enquanto o criativo está fraco. Priorize o que tem impacto grande primeiro.

---

### 5.6 Os erros clássicos de quem está começando

Um resumão dos tropeços que **queimam dinheiro** — releia esta lista antes de cada campanha:

1. **Mexer cedo demais.** Você bota o anúncio no ar e fica atualizando a tela de hora em hora, editando a cada "nada aconteceu ainda". Cada edição **reinicia o aprendizado** do algoritmo. Suba, **deixe rodar** os dias de aprendizagem, e só então decida.
2. **Público estreito demais.** "Vou mirar só donos de loja, entre 35-40 anos, num raio de 3km, que curtem 5 páginas específicas." Público minúsculo = o algoritmo não tem espaço pra otimizar, CPM explode. Comece **mais amplo** e deixe a máquina achar quem converte.
3. **Verba baixa demais.** Já falamos: R$ 5/dia não gera dado. Sem dado, toda decisão é chute.
4. **Julgar sem dados.** "Não funciona" depois de R$ 15 gastos e 3 horas no ar. Ou "tá ótimo!" por causa de 1 lead. **Volume mínimo antes de opinar.**
5. **Confundir métrica de vaidade com métrica de negócio.** Curtida, comentário e alcance são bonitos, mas **não pagam a conta**. Olhe **CPL e conversão**. 10.000 curtidas e zero lead = campanha fracassada.
6. **Não instalar o rastreamento (Pixel).** Se você não mede quem virou lead no site, está voando cego — e o algoritmo também. (Como dev, essa é sua responsabilidade: garanta que o evento de "lead" dispara quando o formulário é enviado.)
7. **Culpar sempre o anúncio.** Metade dos problemas de franquia está na **landing** ou no **atendimento comercial**, não na campanha. Diagnostique a esteira inteira (5.2).

---

### 5.7 Seu "painel mental" da semana

Você não precisa olhar 40 números todo dia. Precisa de uma **rotina semanal curta**. Toda segunda-feira, abra o gerenciador e responda, **nesta ordem**, estas 5 perguntas:

| # | Pergunta da semana | Métrica pra olhar | Se estiver ruim, aja assim |
|---|---|---|---|
| 1 | Meu anúncio chama atenção? | **CTR** | CTR baixo → troque o criativo |
| 2 | Estou trazendo gente barato? | **CPC / CPM** | Caro → público concorrido, teste outro |
| 3 | Meu site converte visita em lead? | **Conversão da landing** | Baixa → mexa na página (é com você) |
| 4 | Quanto pago por interessado? | **CPL** | Acima da meta → diagnostique a cadeia (5.2) |
| 5 | Estou no ritmo da meta de leads/mês? | **Nº de leads x meta** | Atrás da meta → escale o campeão (5.4) |

Regra de frequência: **decisão de otimização = 1x por semana** (com dado acumulado). Olhar os números você pode todo dia, por curiosidade — mas **agir** (editar, pausar, escalar) só no ritmo semanal, senão você sabota o aprendizado do algoritmo.

> ✅ **Checklist antes de dar qualquer campanha por "julgada":**
> - [ ] Passou **pelo menos 7 dias** no ar?
> - [ ] Acumulou **dado suficiente** (~50 cliques / 3-5 leads por variação)?
> - [ ] O **Pixel** está medindo o lead corretamente no site?
> - [ ] Comparei pela **métrica certa** (criativo → CTR/CPL; landing → conversão)?
> - [ ] Mudei **só uma variável** por teste?
> - [ ] Estou decidindo por **CPL/conversão**, não por curtidas?
> - [ ] Antes de aumentar verba, o CPL está bom **de forma consistente** (não só num dia de sorte)?

Se marcou tudo, agora sim você pode decidir: **escalar, ajustar ou pausar** — com dado, não com achismo. É esse ciclo, repetido semana após semana, que transforma R$ 30/dia numa máquina previsível de leads de franquia GRAVA.AI.

---

## 6. Rastreamento e integração no site (a parte técnica)

Essa é a seção mais importante pra você. Você já sabe programar — o que falta é entender **como o anúncio "conversa" com o seu site**. Depois que esse encaixe fizer sentido na sua cabeça, o resto é só código, e código você já domina.

Vou construir do zero: primeiro o **porquê**, depois cada peça (Pixel, CAPI, GA4, GTM, dataLayer, evento, UTM) e, por fim, o **passo a passo prático** no seu Next.js (App Router).

---

### 6.1 Por que rastrear? (sem dados, o algoritmo é cego)

Quando você sobe um anúncio no Meta (Facebook/Instagram) ou no Google, você **não** escolhe manualmente quem vê. Quem escolhe é o **algoritmo** da plataforma. E o algoritmo aprende olhando o que acontece **depois** do clique.

Pensa numa analogia. Imagine que você contrata um vendedor de rua pra distribuir panfletos da franquia GRAVA.AI. Se você **nunca** contar pra ele quais panfletos viraram cliente de verdade, ele vai distribuir no chute pra sempre. Agora, se toda vez que alguém preenche o formulário você liga pro vendedor e fala "ó, esse aqui que você abordou na esquina X virou lead!", em uma semana ele já sabe em qual esquina, em qual horário e pra qual tipo de pessoa vale a pena entregar panfleto.

**O rastreamento é essa ligação de volta pro algoritmo.** Cada vez que um visitante faz algo valioso no seu site (preenche o formulário de franqueado, clica no WhatsApp), você **avisa** a plataforma de anúncios: "esse deu certo". A plataforma cruza isso com o perfil da pessoa e passa a mostrar seus anúncios pra gente parecida.

> **Sem rastreamento você paga a mesma verba e recebe leads muito piores.** Não é opcional. É o que separa "torrar dinheiro" de "gerar franqueado".

O que a gente quer rastrear no caso GRAVA.AI:

| Ação no site | Por que importa |
|---|---|
| Visitou a landing "Seja um Franqueado" | Mede alcance real (topo do funil) |
| Preencheu e enviou o formulário de lead | **Conversão principal** — é isso que vale dinheiro |
| Clicou no botão de WhatsApp | **Conversão secundária** — outro caminho de contato |

---

### 6.2 O que é um Pixel / uma Tag de conversão

**Pixel** (ou **tag de conversão**) é um pedacinho de **JavaScript** que a plataforma de anúncios te dá pra colar no seu site. Ele roda no navegador do visitante e **manda informações de volta** pra plataforma: "abriu tal página", "clicou em tal coisa", "converteu".

O nome "pixel" é histórico: antigamente era literalmente uma imagem invisível de 1x1 pixel que, ao carregar, avisava o servidor. Hoje é um script, mas o nome pegou.

Você vai usar dois "pixels" principais:

- **Meta Pixel** → o pixel do Facebook/Instagram Ads.
- **Google (GA4 + Google Ads tag)** → o equivalente do mundo Google.

Toda plataforma de anúncio tem o seu. A lógica é sempre a mesma: **carrega um script + dispara eventos**.

---

### 6.3 Meta Pixel + Conversions API (CAPI)

#### O Meta Pixel (lado do navegador)

O Meta Pixel é o script que roda **no navegador do visitante** (client-side). Ele:

1. Carrega uma vez em toda página (registra o `PageView` — "alguém visitou").
2. Dispara **eventos** quando você mandar. O evento de conversão de lead se chama, por convenção, `Lead`.

Cada conta de anúncios do Meta tem um **Pixel ID** (um número tipo `1234567890`). É a "matrícula" do seu pixel.

#### O problema do lado do navegador

O pixel client-side falha em muita gente hoje: **bloqueadores de anúncio**, o iPhone com a proteção de rastreamento (o famoso *ATT* da Apple), gente que recusa cookies... Resultado: você **perde eventos**. O algoritmo recebe informação incompleta e otimiza pior.

#### A solução: Conversions API (CAPI) — lado do servidor

A **Conversions API** (CAPI, "API de Conversões") é o mesmo evento `Lead`, só que enviado **do seu servidor direto pros servidores do Meta**, sem depender do navegador do visitante.

Analogia: o Pixel é você gritando a notícia da janela (o vento pode levar, o vizinho pode não ouvir). A CAPI é você mandando a mesma notícia por **carta registrada** (chega quase sempre).

O ideal é usar **os dois ao mesmo tempo**:

- **Pixel** manda pelo navegador.
- **CAPI** manda pelo servidor.
- O Meta faz a **deduplicação** (junta os dois se forem o mesmo evento, usando um `event_id` igual nos dois lados, pra não contar em dobro).

Você é dev — a CAPI é literalmente um `POST` HTTP pro endpoint do Meta com um payload JSON e um token de acesso. No Next.js App Router isso vira um **route handler** (server-side), que a gente monta lá no 6.8.

---

### 6.4 GA4 e GTM: o que é cada um e como se relacionam

Aqui muita gente iniciante trava porque confunde os nomes. Vou separar bem.

#### GA4 — Google Analytics 4

É a ferramenta de **análise/relatório** do Google. Ela **coleta e mostra** dados: quantas pessoas entraram, de onde vieram, quais páginas viram, quantas converteram. É o seu **painel de métricas**. GA4 tem um **Measurement ID** no formato `G-XXXXXXX`.

Pense no GA4 como o **livro-caixa** do site: ele registra e organiza o que aconteceu pra você analisar depois.

#### GTM — Google Tag Manager

É um **gerenciador de tags**. Não é análise. É uma "central de controle" onde você instala **um único script** no site e, de dentro do painel do GTM (sem mexer no código de novo), você **liga e desliga** todos os outros scripts: Meta Pixel, GA4, tag do Google Ads, etc.

Analogia: o GTM é um **quadro de tomadas** (uma régua com várias entradas). Você prega a régua na parede uma vez (instala o GTM no site). Depois, cada aparelho novo (Pixel, GA4...) você só pluga na régua pelo painel, sem precisar furar a parede de novo.

#### Como se relacionam

- **GTM** = onde você gerencia as tags (a régua).
- **GA4 e Meta Pixel** = tags que você pode plugar dentro do GTM.
- **GA4** = onde você lê os relatórios.

> **Você precisa de GTM?** Não obrigatoriamente. Como você é dev, dá pra instalar o GA4 e o Pixel **direto no código** (é o que vou mostrar no passo a passo, mais simples de entender). O GTM brilha quando um time de marketing **não-técnico** precisa adicionar tags sem chamar o dev. Recomendação: **comece direto no código**; migre pro GTM depois se o marketing crescer.

---

### 6.5 dataLayer, evento de conversão e UTM

Três conceitos que aparecem o tempo todo. Rápido e concreto:

#### dataLayer

É um **array de JavaScript** global (`window.dataLayer`) que funciona como um "mural de recados" entre o seu site e o GTM. Quando algo acontece (ex: enviou o formulário), você dá um `dataLayer.push({...})` com os dados do evento, e o GTM "escuta" esse mural e dispara as tags certas.

Você só precisa mexer em `dataLayer` **se usar GTM**. Sem GTM, você chama os eventos direto (ex: `fbq('track', 'Lead')` e `gtag('event', 'generate_lead')`).

#### Evento de conversão

**Evento** = qualquer ação que você registra (viu página, clicou, rolou a tela). **Conversão** = o evento que você marcou como "isso é valioso pro negócio". No seu caso, o envio do formulário de franqueado. No Meta o nome padrão é `Lead`; no GA4 o padrão é `generate_lead`.

#### UTM — parâmetros de rastreamento na URL

**UTM** são pedacinhos que você **adiciona no final do link do anúncio** pra saber **de onde** o visitante veio. Exemplo do link que você colocaria no anúncio do Instagram:

```
https://gravaai.com.br/franqueado?utm_source=instagram&utm_medium=paid&utm_campaign=franquia-jun26&utm_content=video-totem
```

O que cada um diz:

| Parâmetro | Significa | Exemplo |
|---|---|---|
| `utm_source` | De qual site/plataforma veio | `instagram`, `google` |
| `utm_medium` | Tipo de tráfego | `paid` (pago), `cpc` |
| `utm_campaign` | Qual campanha | `franquia-jun26` |
| `utm_content` | Qual criativo/variação | `video-totem`, `foto-caneca` |

O GA4 lê esses UTMs **sozinho** e te mostra qual anúncio trouxe cada lead. Assim você descobre, por exemplo, que o vídeo do totem no Instagram gera 3x mais franqueados que a foto no Google — e coloca mais verba onde funciona.

> **⚠️ Erros de iniciante com UTM**
> - Escrever `Instagram` numa campanha e `instagram` em outra — pro GA4 são **duas fontes diferentes** (é *case-sensitive*). Padronize tudo minúsculo.
> - Colocar espaço no `utm_campaign` (`franquia junho`). Use hífen: `franquia-jun26`.
> - Esquecer o UTM e depois não saber de onde veio nada.

---

### 6.6 Passo a passo: instalar GA4 e Meta Pixel no Next.js (App Router)

Agora o encaixe técnico. **Importante:** os códigos abaixo são **ilustrativos** — servem pra você entender o encaixe, não pra copiar-colar cego. Adapte IDs, nomes e o seu backend de formulário.

> **Este NÃO é o Next.js que você já conhece.** Antes de escrever, leia o guia oficial da sua versão em `node_modules/next/dist/docs/` — APIs e convenções podem ter mudado (inclusive `next/script`). Confirme lá antes de codar.

#### Passo 1 — Guardar os IDs em variáveis de ambiente

Nunca chumbe IDs no meio do JSX. Coloque no `.env.local`:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890
META_CAPI_TOKEN=seu-token-secreto-da-capi   # SEM NEXT_PUBLIC: só no servidor!
```

Regra de ouro: o prefixo `NEXT_PUBLIC_` **expõe a variável ao navegador**. O Pixel ID e o GA ID **podem** ser públicos (aparecem no HTML de qualquer jeito). Já o **token da CAPI é segredo** → **nunca** ponha `NEXT_PUBLIC_` nele, senão vaza pro mundo.

#### Passo 2 — Carregar os scripts com `next/script`

No Next.js você **não** cola `<script>` solto: usa o componente `next/script`, que controla **quando** o script carrega (a `strategy`). Isso é ilustrativo — coloque num componente client (`"use client"`) montado no `layout.tsx`:

```tsx
// components/Analytics.tsx  (ILUSTRATIVO)
"use client";
import Script from "next/script";

export function Analytics() {
  const GA = process.env.NEXT_PUBLIC_GA_ID;
  const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {/* --- Google Analytics 4 --- */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA}`}
        strategy="afterInteractive"   // carrega depois da página ficar utilizável
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA}');
        `}
      </Script>

      {/* --- Meta Pixel --- */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){/* snippet oficial do Meta aqui */}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL}');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}
```

O que é `strategy="afterInteractive"`: manda o script carregar **depois** que a página já está interativa, pra não travar o carregamento visual. Existem outras (`beforeInteractive`, `lazyOnload`) — leia no doc local qual usar em cada caso.

Depois, monte `<Analytics />` **uma vez** no `app/layout.tsx`, pra valer em todo o site.

#### Passo 3 — Disparar o evento de conversão no envio do formulário

Quando o franqueado enviar o formulário, dispare o `Lead` (Meta) e o `generate_lead` (GA4). Ilustrativo, no seu componente de formulário (client):

```tsx
async function onSubmit(dados) {
  // 1) salva o lead no seu backend (como você já faz)
  await fetch("/api/lead", { method: "POST", body: JSON.stringify(dados) });

  // 2) gera um id único pra deduplicar com a CAPI (server) depois
  const eventId = crypto.randomUUID();

  // 3) avisa o Meta Pixel (navegador)
  window.fbq?.("track", "Lead", { content_name: "franquia" }, { eventID: eventId });

  // 4) avisa o GA4 (navegador)
  window.gtag?.("event", "generate_lead", { method: "formulario" });

  // 5) manda o MESMO evento pela CAPI (servidor) — ver 6.8
  await fetch("/api/meta-capi", {
    method: "POST",
    body: JSON.stringify({ eventId, event: "Lead", email: dados.email }),
  });
}
```

Repare no `eventId`: o **mesmo** id vai no Pixel e na CAPI. É assim que o Meta entende "é o mesmo lead, não conte duas vezes" (deduplicação).

#### Passo 4 — Disparar no clique do WhatsApp

O botão de WhatsApp é uma conversão também. No `onClick`:

```tsx
function abrirWhatsApp() {
  window.fbq?.("track", "Contact");          // Meta: evento de contato
  window.gtag?.("event", "whatsapp_click");  // GA4
  window.open("https://wa.me/55SEUNUMERO", "_blank");
}
```

Dica: dispare o evento **antes** de abrir o link, senão em alguns navegadores a nova aba interrompe o disparo.

---

### 6.7 A ideia da Conversions API via route handler (server-side)

No App Router, um endpoint de servidor é um **route handler**: um arquivo `route.ts` dentro de `app/api/.../`. É ali que você fala com o Meta **pelo servidor** (mais confiável que só o navegador). Conceitual:

```ts
// app/api/meta-capi/route.ts  (ILUSTRATIVO)
export async function POST(req: Request) {
  const { eventId, event, email } = await req.json();

  await fetch(
    `https://graph.facebook.com/v21.0/${process.env.NEXT_PUBLIC_META_PIXEL_ID}/events` +
      `?access_token=${process.env.META_CAPI_TOKEN}`,   // token SÓ no servidor
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: event,                    // "Lead"
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,                    // MESMO id do Pixel → dedup
          action_source: "website",
          user_data: {
            // dados sensíveis vão HASHEADOS (SHA-256), exigência do Meta
            em: await sha256(email.trim().toLowerCase()),
          },
        }],
      }),
    }
  );

  return Response.json({ ok: true });
}
```

Três pontos que você **precisa** guardar:

1. O **token da CAPI mora no servidor** — o route handler roda no servidor, então `process.env.META_CAPI_TOKEN` (sem `NEXT_PUBLIC_`) fica seguro. Isso é o grande motivo de usar route handler.
2. Dados pessoais (e-mail, telefone) vão **hasheados em SHA-256**. O Meta usa o hash só pra cruzar com quem já tem cadastro; você não entrega o dado cru.
3. `event_id` **igual** ao do Pixel = deduplicação. Sem isso, você conta cada lead duas vezes e o relatório mente.

> Verifique a **versão da Graph API** (`v21.0` acima é exemplo) e o formato do payload na doc atual do Meta antes de subir pra produção.

---

### 6.8 Consentimento e LGPD (banner de cookies)

Rastrear é ótimo, mas no Brasil tem a **LGPD** (Lei Geral de Proteção de Dados). Pixels usam cookies e dados pessoais → você precisa de **base legal**, e a mais usada aqui é o **consentimento**: um **banner de cookies** onde o visitante aceita ou recusa.

Como isso encaixa no código, na prática:

1. O site abre com o rastreamento **desligado** por padrão.
2. Aparece o **banner**: "Usamos cookies pra melhorar sua experiência e medir campanhas. Aceitar / Recusar".
3. Só **depois do aceite** você carrega/ativa o Pixel e o GA4 (ou, no Meta, usa o **Consent Mode**, que ajusta o comportamento conforme o consentimento).
4. Você guarda a escolha (num cookie/localStorage) pra não perguntar toda vez.

> **⚠️ Erros de iniciante com LGPD**
> - Carregar o Pixel **antes** do aceite. Tecnicamente funciona, mas te expõe legalmente.
> - Não ter **política de privacidade** linkada no formulário e no banner. Tenha uma página `/privacidade` explicando o que você coleta e por quê.
> - Não oferecer o botão **Recusar** (banner só com "Aceitar" não é consentimento válido).
>
> Isso não é conselho jurídico — pra franquia, vale validar o texto com alguém de direito.

---

### 6.9 Conectar o pixel à sua conta de anúncios

Ter o pixel no site não basta: ele precisa estar **amarrado à conta de anúncios** certa, senão os eventos chegam mas você não consegue usá-los pra otimizar.

**No Meta (passo a passo):**

1. Acesse o **Gerenciador de Eventos** (Events Manager) da sua conta comercial.
2. Crie (ou selecione) o **Pixel/Conjunto de dados** → é dele que sai o **Pixel ID** que você colou no site.
3. Confirme que esse pixel está **vinculado à conta de anúncios** que vai rodar a campanha (em Configurações da conta → Fontes de dados).
4. Gere o **token de acesso da CAPI** (dentro do próprio Pixel → aba "Conversions API" → gerar token) → é o `META_CAPI_TOKEN`.
5. Ao criar a campanha, escolha o objetivo **Leads/Conversões** e selecione o evento **`Lead`** como o que deve ser otimizado.

**No Google (resumo):**

1. Crie a **propriedade GA4** → pega o `G-XXXXXXX`.
2. No GA4, marque `generate_lead` como **evento-chave/conversão**.
3. **Vincule GA4 ao Google Ads** (Admin → Vínculos de produtos → Google Ads) pra importar a conversão e otimizar as campanhas por ela.

---

### 6.10 ✅ Checklist: "está rastreando de verdade?"

Instalar não é o suficiente — você tem que **ver o evento chegando**. Ferramentas gratuitas dos próprios fabricantes:

**Meta Pixel Helper** (extensão do Chrome):

- [ ] Instalou a extensão **Meta Pixel Helper** no Chrome.
- [ ] Abriu a landing de franqueado → o ícone mostra o Pixel **ativo** e um `PageView`.
- [ ] Preencheu e enviou o formulário de teste → apareceu o evento **`Lead`**.
- [ ] Clicou no WhatsApp → apareceu o evento **`Contact`**.
- [ ] **Sem alertas** de erro (ex: "pixel não inicializado", "evento duplicado sem event_id").

**Meta Events Manager → Testar Eventos (Test Events):**

- [ ] Na aba "Testar eventos", o `Lead` chega **duas vezes**: uma via **Browser** (Pixel) e uma via **Server** (CAPI)...
- [ ] ...e o Meta marca como **"Deduplicado"** (prova que o `event_id` casou). Se aparecer dobrado sem dedup, o id não está batendo.

**Google GA4 → DebugView:**

- [ ] Ativou o modo debug (extensão **Google Analytics Debugger** ou parâmetro de debug).
- [ ] No **DebugView** do GA4 (Admin → DebugView), vê o `page_view` chegando em tempo real.
- [ ] Fez o teste de formulário → o evento **`generate_lead`** aparece na timeline.
- [ ] Confirmou que `generate_lead` está marcado como **conversão/evento-chave**.

**UTM:**

- [ ] Abriu o site com uma URL de teste com UTMs → no GA4 (Relatórios → Aquisição) a fonte aparece certinha (`instagram / paid`), não como `(direct)`.

> **Regra final:** só considere o rastreamento "pronto" quando você **viu com os próprios olhos** o evento `Lead`/`generate_lead` chegar nas ferramentas acima após um envio de teste. Confiar que "instalei, deve estar funcionando" é o erro nº 1 — e você só descobre que estava quebrado depois de queimar a verba.

---

## 7. Landing page e copy que converte

Nas seções anteriores você aprendeu a trazer gente para o seu site. Mas trazer visitante é só **metade da batalha**. O anúncio é o que faz a pessoa *clicar*. A **landing page** é o que faz a pessoa *virar lead*. Se a segunda metade falhar, todo o dinheiro que você gastou na primeira metade vira fumaça.

Pensa assim: você pagou o táxi para levar o cliente até a porta da sua loja (isso é o anúncio). Se a loja estiver bagunçada, sem vendedor e sem preço na vitrine, o cliente entra, olha e vai embora — e você pagou o táxi à toa. Esta seção é sobre **arrumar a loja** para que ninguém entre e saia sem deixar o contato.

A boa notícia: o site que **você mesmo construiu** já tem quase toda a estrutura certa. Vou te mostrar *por que* cada pedaço dele existe e como deixar cada um mais afiado.

### Primeiro, o que é uma "landing page" (e por que ela é diferente de um site normal)

**Landing page** (em português, "página de aterrissagem") é a página onde a pessoa **"aterrissa"** depois de clicar no seu anúncio. O nome vem daí: é onde o visitante pousa.

A diferença de uma landing page para o "site institucional" normal é o **foco**:

- Um **site institucional** tem menu, várias páginas, "Sobre nós", "Contato", blog... Ele serve para a pessoa *explorar*. Tem muitas saídas.
- Uma **landing page de conversão** tem **um único objetivo**: fazer a pessoa realizar **uma** ação. No seu caso, essa ação é **preencher o formulário "Quero ser franqueado"** ou **chamar no WhatsApp**. Só isso. Tudo na página empurra para lá.

> 💡 **Regra de ouro da landing page:** uma página, um objetivo, uma ação. Se um elemento da página não ajuda a pessoa a virar lead, ele está atrapalhando.

É por isso que a sua página `/seja-um-franqueado` está certíssima em ser **separada** do site institucional. Ela é uma máquina de captar franqueado, não um cardápio de opções.

⚠️ **Erro de iniciante nº 1:** mandar o tráfego pago para a **home** do site (a página institucional cheia de menu e links). A pessoa se perde, clica em "Sobre", vai embora e não vira lead. **Anúncio de franquia SEMPRE aponta para a landing page de franquia**, nunca para a home.

### "Message match": o anúncio e a página têm que falar a MESMA coisa

Esse é o conceito mais importante da seção, então leia com calma. **Message match** (em português, "correspondência de mensagem") significa que **a promessa do anúncio precisa bater com o que a pessoa vê ao chegar na página**.

A pessoa clica num anúncio por causa de uma promessa específica. Quando ela chega na página, o cérebro dela faz, em meio segundo, uma pergunta inconsciente: *"É isto que eu vim buscar?"*. Se a resposta for "não" ou "não sei", ela vai embora. Isso se chama **quebra de continuidade** — e é um dos maiores destruidores de dinheiro em tráfego pago.

Exemplo do que **NÃO** fazer:

| Onde | O que aparece | Problema |
|------|---------------|----------|
| Anúncio | "Franquia de personalização com IA a partir de pouco investimento" | Promete um assunto |
| Landing page (título) | "Bem-vindo à GRAVA.AI, a marca que revoluciona o varejo" | Fala de **outra coisa** — a pessoa se perde |

Exemplo do que **fazer** (message match perfeito):

| Onde | O que aparece |
|------|---------------|
| Anúncio | "Tenha um negócio inovador de personalização com IA. Fale com um consultor." |
| Landing page (título — o `<h1>` que você já tem) | "Tenha um negócio inovador de **personalização com IA**." |

Percebe? O título da sua página (`h1`) e o texto do anúncio praticamente se repetem. Isso dá à pessoa a sensação de *"cheguei no lugar certo"* — e ela continua descendo a página em vez de fugir.

> **Na prática GRAVA.AI:** antes de subir qualquer anúncio, coloque lado a lado o **texto do anúncio** e a **primeira dobra da sua landing page**. As palavras-chave têm que se repetir. Se o anúncio fala "personalização com IA" e "franquia", a primeira coisa que a pessoa lê na página também tem que ser "personalização com IA" e "franquia".

⚠️ **Erro de iniciante:** criar um anúncio muito diferente do título da página porque "ficou mais bonito". Bonito e desconexo perde para feio e conectado. Message match sempre.

### A anatomia de uma landing page que converte (e onde seu site já acerta)

Uma boa landing page de captação de lead segue uma **ordem lógica**: ela responde, na sequência certa, às perguntas que passam pela cabeça do visitante. Veja a estrutura ideal — e note como o seu site **já tem cada bloco**:

| Ordem | Bloco | Pergunta que responde na cabeça do visitante | No SEU site |
|-------|-------|----------------------------------------------|-------------|
| 1 | **Hero** (título + subtítulo + form) | "O que é isso e serve pra mim?" | Seção HERO com `h1` + form curto |
| 2 | **Prova rápida / destaques** | "Isso é sério?" | Faixa de DESTAQUES |
| 3 | **Por que investir (benefícios)** | "O que eu ganho com isso?" | "Por que ser um franqueado" + PILARES |
| 4 | **Como funciona / o que recebo** | "Como funciona na prática?" | Modelos de loja, "Como se tornar", "O que você recebe" |
| 5 | **Investimento** | "Quanto custa?" | Seção "Investimento inicial" |
| 6 | **Prova social** | "Outras pessoas confiaram?" | Depoimentos |
| 7 | **Quebra de objeção** | "E se... (medos)?" | FAQ |
| 8 | **Urgência** | "Por que agir agora?" | Faixa "Vagas limitadas por região" |
| 9 | **CTA final (formulário)** | "Ok, o que eu faço agora?" | Formulário final completo |

Ou seja: **você não precisa reinventar nada**. A estrutura está lá. O trabalho agora é deixar a **copy** (o texto) de cada bloco mais persuasiva. Vamos por partes.

### O topo (hero): você tem de 3 a 5 segundos para não perder a pessoa

A **hero** é a primeira tela que a pessoa vê, antes de rolar. Em inglês, chamam de **"above the fold"** ("acima da dobra" — vem dos jornais, a parte que aparece sem desdobrar). É a parte mais importante da página inteira, porque **a maioria das pessoas decide se fica ou vai embora aqui**, em poucos segundos.

Uma hero campeã tem **quatro coisas** (e a sua já tem as quatro):

1. **Headline (título / o `h1`):** a promessa principal, grande e clara.
2. **Subheadline (subtítulo):** uma frase que explica *como* você cumpre a promessa.
3. **Bullets de benefício:** 3 marcadores rápidos com o que a pessoa ganha.
4. **CTA + formulário visível:** o "próximo passo", à mão, sem precisar rolar.

#### Como escrever uma headline que funciona

A **headline** é a frase mais lida da sua página. 8 em cada 10 pessoas leem só ela. Uma boa headline de franquia junta três ingredientes:

> **[O que é] + [para quem / que resultado] + [diferencial]**

Veja variações aplicadas à GRAVA.AI (a atual e alternativas para você testar):

- **Atual:** "Tenha um negócio inovador de personalização com IA." — boa, clara, com diferencial ("IA").
- **Foco no sonho de empreender:** "Seja dono de um negócio inovador que personaliza produtos com IA na hora."
- **Foco em operação simples:** "Uma franquia enxuta, movida por IA, pronta para a sua cidade."
- **Foco em mercado:** "Fature no varejo mais quente do momento: personalização por Inteligência Artificial."

Note que **nenhuma cita preço ou percentual** — e isso é proposital: no seu modelo, o número é a isca entregue no contato, não algo exposto na página (voltaremos a isso na urgência e no CTA).

**O que faz uma headline ser ruim:**
- Genérica demais: "Bem-vindo à GRAVA.AI" (não diz nada).
- Falando de você, não do cliente: "Somos líderes em tecnologia" (a pessoa quer saber o que **ela** ganha).
- Vaga: "Transforme o seu futuro" (transformar como? com o quê?).

> **Dica prática:** a headline tem que passar no **"teste dos 5 segundos"**. Mostre a primeira tela do site para alguém que nunca viu (um parente, um amigo). Depois de 5 segundos, tampe a tela e pergunte: *"O que a GRAVA.AI vende e para quem?"*. Se a pessoa souber responder, sua headline está boa. Se hesitar, reescreva.

#### O formulário curto na hero é uma jogada certeira

Reparei que na sua hero você usa o **formulário curto** (`variant="short"`: só nome, WhatsApp, UF e cidade) e deixa o **formulário completo** lá no final da página. **Isso é profissional e está certo.** Aqui está o porquê:

- Na hora que a pessoa acabou de chegar, ela ainda está "fria". Pedir muita coisa (e-mail, capital disponível, prazo) assusta e afasta. **Quanto mais campos, menos gente preenche.** Cada campo a mais derruba a conversão.
- Um formulário de **2 a 4 campos** na hora certa captura quem já está com vontade *agora*, antes de a pessoa "esfriar" rolando a página.
- O formulário **completo** no fim faz sentido porque quem chegou até lá já está bem mais quente e disposto a responder mais — e aí os campos extras (capital, prazo) servem para **qualificar** o lead (saber se tem dinheiro para investir).

> **Regra prática de formulário:** peça o **mínimo necessário** para conseguir dar o próximo passo. Para conversar por WhatsApp, você precisa basicamente de **nome + telefone**. O resto é bônus. Se puder, deixe assim: nome, WhatsApp e cidade. Curto converte mais.

⚠️ **Erros de iniciante no formulário:**
- Pedir CPF, RG, endereço completo ou "conte-nos sobre você" logo de cara. Isso derruba a conversão lá embaixo.
- Campos obrigatórios demais. Deixe obrigatório só o essencial (nome e WhatsApp).
- Não deixar claro **o que acontece depois** de enviar. Coloque um subtítulo tipo *"Preencha e um especialista fala com você no WhatsApp em até 1 dia útil"* — isso reduz a insegurança de "vou ser incomodado?".

### O CTA: o botão que a pessoa clica (e como deixá-lo irresistível)

**CTA** quer dizer **Call To Action** — em português, "chamada para ação". É o botão ou link que diz para a pessoa **o que fazer agora**. No seu site, é o botão "Quero ser franqueado" e os links "Falar no WhatsApp".

Três regras de um bom CTA:

1. **Fale na primeira pessoa e no desejo, não na tarefa.** Compare: "Enviar" (tarefa chata) vs. **"Quero ser franqueado"** (desejo). Você já usa a versão boa — mantenha. Outras que funcionam: "Quero minha unidade", "Quero saber como começar".
2. **Repita o CTA várias vezes ao longo da página.** A pessoa pode decidir agir no bloco 3 ou no bloco 8. Tem que ter um botão à mão sempre. Seu site já faz isso (vários botões apontando para `#formulario`) — ótimo.
3. **Um CTA principal só.** Não misture "Quero ser franqueado" com "Baixe o e-book", "Assine a newsletter", "Siga no Instagram" com o mesmo destaque. Isso se chama **paradoxo da escolha**: quando você oferece muitas opções, a pessoa fica na dúvida e não escolhe nenhuma. Um objetivo, um caminho.

> **Na prática GRAVA.AI:** seu CTA principal é virar lead (formulário ou WhatsApp). O link "Voltar ao site institucional" no rodapé é uma **fuga** — está discreto lá embaixo, o que é correto. Só cuide para não colocar links de saída chamativos no meio da página.

### O WhatsApp: o canal de menor fricção que existe (e você já tem)

**Fricção**, em marketing, é **tudo que dá trabalho ou gera insegurança** e faz a pessoa desistir. Formulário longo é fricção. Ligar por telefone é fricção (dá preguiça e medo). Mandar e-mail é fricção (formal, demorado).

O **WhatsApp** é o oposto: é o app que o brasileiro já usa o dia todo, é informal, é rápido e a pessoa **não precisa esperar**. Por isso ele é o canal de **menor fricção** para captar franqueado no Brasil — e você já tem **três pontos de contato** de WhatsApp no site: o botão na hero, o link no bloco final e o **botão flutuante** que segue a rolagem.

Por que o WhatsApp converte tanto para franquia:

- **Resposta imediata dá "calor".** Quem está com vontade *agora* quer falar *agora*. Cada hora que passa, o lead esfria. O WhatsApp permite responder em minutos.
- **Baixo compromisso.** Mandar "oi, quero saber sobre a franquia" é bem mais fácil (mentalmente) do que preencher um formulário formal.
- **Vira conversa, e conversa vende.** Uma franquia é uma decisão grande. É no papo do WhatsApp que você tira dúvidas, passa confiança e entrega o número (o valor do investimento) na hora certa — como isca, não exposto na página.

> **Dica de ouro — a mensagem pré-preenchida:** configure o link do WhatsApp para já abrir com um texto pronto, tipo *"Olá! Vim pelo site e quero saber como ser um franqueado GRAVA.AI."*. Isso quebra o gelo (a pessoa não precisa pensar no que escrever) e ainda te diz **de onde o lead veio**. (Tecnicamente é o parâmetro `?text=` no link `wa.me` — na seção de integração a gente amarra isso.)

⚠️ **Erro de iniciante:** ter o botão de WhatsApp mas **demorar horas ou dias para responder**. Lead de tráfego pago é perecível como fruta. Responda em minutos, ou no máximo em 1 hora, no horário comercial. Se você não consegue, avise no site o horário de atendimento.

### Prova social: por que "os outros confiaram" vende mais que qualquer promessa sua

**Prova social** é a tendência humana de fazer o que os outros já fizeram. Se um restaurante está cheio, a gente acha que é bom. Se está vazio, desconfia. Na sua página, prova social são os **depoimentos**, casos de franqueados, número de unidades, logos, fotos de lojas funcionando.

Por que isso é tão poderoso para franquia: a pessoa vai colocar **muito dinheiro** nisso. O medo é enorme. Ver **outra pessoa comum que deu certo** derruba esse medo mais do que qualquer coisa que **você** diga sobre si mesmo (afinal, você é parte interessada).

O que torna um depoimento forte (do mais fraco para o mais forte):

1. Texto genérico sem nome: "Ótima franquia!" → fraco, parece inventado.
2. Texto + nome + cidade: "Faturei melhor do que esperava. — João, Campinas" → melhor.
3. Texto + nome + **foto real** + **resultado concreto** e humano: "Larguei o CLT e hoje tenho meu quiosque no shopping. — Maria, Curitiba" + foto → **forte**.
4. **Vídeo curto** do franqueado falando → o mais forte de todos.

> **Na prática GRAVA.AI:** seu site já tem a seção de depoimentos, mas hoje ela está marcada como *ilustrativa* (placeholder). **Prioridade número 1 assim que tiver franqueados reais:** trocar por depoimentos verdadeiros, com nome, cidade e foto. Enquanto não tiver franqueado, use provas alternativas: fotos e vídeos reais do **totem funcionando**, do quiosque montado, gente usando, bastidores da operação. Prova de que o produto é real também é prova social.

⚠️ **Erro de iniciante:** inventar depoimento falso. Além de ser antiético e ilegal, a pessoa "sente" que é fake e você perde a confiança — que é justamente o que você tentava ganhar. Se não tem depoimento ainda, use prova real do produto, não invente cliente.

### Quebra de objeção: seu FAQ é uma máquina de destravar decisão

**Objeção** é o "sim, mas..." que passa na cabeça do interessado e o impede de agir: *"Sim, parece bom, MAS será que dá lucro? MAS eu não entendo de tecnologia. MAS e se não vender na minha cidade?"*. Cada objeção não respondida é um lead perdido.

O lugar clássico para **quebrar objeções** é o **FAQ** (do inglês *Frequently Asked Questions*, "perguntas frequentes") — que você já tem. Mas o segredo é: o FAQ não serve para tirar dúvidas burocráticas, e sim para **desarmar os medos que travam a compra**.

Liste as principais objeções de quem vai abrir uma franquia GRAVA.AI e responda cada uma:

| Objeção (medo real) | Pergunta no FAQ | Como responder (direção) |
|---------------------|-----------------|--------------------------|
| "Não entendo de tecnologia/IA" | "Preciso saber mexer com IA ou tecnologia?" | Não — a IA e o totem fazem o trabalho; você recebe treinamento completo. |
| "E se eu não conseguir vender?" | "Vou ficar sozinho depois que abrir?" | Não — suporte da matriz, distribuição própria, estoque e operação assistidos. |
| "Será que dá retorno?" | "Em quanto tempo recupero o investimento?" | Fale do modelo enxuto e do mercado em alta; o número exato vem na conversa. |
| "É complicado montar?" | "Como funciona para começar?" | Passo a passo simples; matriz cuida de estoque e treinamento. |
| "Meu ponto/cidade serve?" | "Onde posso montar a unidade?" | Shoppings, ruas de movimento, etc.; exclusividade por região. |

> **Dica prática:** as melhores perguntas do FAQ **você descobre conversando no WhatsApp**. Toda dúvida que aparecer repetidas vezes nos contatos, transforme em uma pergunta do FAQ. Assim a página vai ficando cada vez melhor em vender sozinha.

### Urgência e escassez: por que agir AGORA e não "depois" (que nunca vem)

**Urgência** é dar um motivo para agir **agora**. **Escassez** é mostrar que a oportunidade é **limitada**. Os dois combatem o maior inimigo da conversão: o **"depois eu vejo"** — que, na prática, é um "nunca".

Para franquia, a escassez mais honesta e poderosa é a **exclusividade territorial**: cada região só pode ter um franqueado. Você já tem essa faixa no site ("Vagas limitadas por região. Garanta a exclusividade da sua cidade."). Isso é ótimo **desde que seja verdade**.

Tipos de urgência/escassez que funcionam para franquia:

- **Escassez territorial (a melhor):** "Apenas uma unidade por cidade. A sua região pode ser reservada por outro a qualquer momento."
- **Escassez de lote/condição:** "Condições especiais para as próximas X unidades deste semestre." (Sem citar valor na página — a condição é detalhada no contato.)
- **Urgência de agenda:** "Estamos agendando conversas com novos interessados esta semana."

⚠️ **Erro de iniciante — urgência falsa:** contador regressivo que reinicia sozinho, "só hoje" que dura o ano todo, "últimas 2 vagas" há seis meses. A pessoa não é boba: escassez mentirosa **destrói** a confiança e derruba a conversão. Use só o que for **verdade**. A exclusividade por região já é uma escassez real e forte — explore ela.

### Fórmulas de copy para iniciante: AIDA e PAS

**Copy** (de *copywriting*) é a arte de **escrever textos que vendem**. Você não precisa ser gênio da escrita: existem **fórmulas** — estruturas prontas de "que ordem colocar as ideias". Duas bastam para você começar.

#### Fórmula 1 — AIDA (a estrutura da sua página inteira)

**AIDA** são as quatro etapas mentais pelas quais a pessoa passa antes de agir. É a espinha dorsal de qualquer landing page:

| Letra | Significa | O que faz | Onde no seu site |
|-------|-----------|-----------|------------------|
| **A** | **Atenção** | Fisga com uma promessa forte | Headline da hero |
| **I** | **Interesse** | Mostra que resolve algo que a pessoa quer | Benefícios, "por que ser franqueado", mercado |
| **D** | **Desejo** | Faz a pessoa *querer*: prova, modelos, o que recebe | Modelos de loja, depoimentos, o que está incluso |
| **A** | **Ação** | Diz o que fazer agora | CTA "Quero ser franqueado" / WhatsApp |

Repare: a sua landing page **já é um funil AIDA de cima a baixo** (até está comentado assim no código). A pessoa desce pela página passando por Atenção → Interesse → Desejo → Ação. Sua tarefa é garantir que cada bloco cumpra bem o seu papel na fórmula.

#### Fórmula 2 — PAS (ótima para anúncios e para o topo da página)

**PAS** = **Problema → Agitação → Solução**. Ela funciona muito bem em anúncios e na abertura de página porque **mexe com a dor** antes de oferecer a saída:

1. **Problema:** aponte a dor. *"Cansado de trabalhar duro e ver o dinheiro do seu salário nunca sobrar?"*
2. **Agitação:** mexa na ferida (cutuque o incômodo). *"Enquanto isso, o mercado de personalização cresce todo ano e alguém na sua cidade vai faturar com isso — pode ser o seu vizinho, ou pode ser você."*
3. **Solução:** apresente a saída. *"Com a franquia GRAVA.AI, você tem um negócio próprio, enxuto e movido por IA, com suporte total da matriz."*

> **Na prática GRAVA.AI:** use **PAS nos textos de anúncio** (para fisgar no feed) e **AIDA na estrutura da página** (para conduzir até o formulário). As duas se completam: o anúncio PAS traz a pessoa; a página AIDA converte.

#### Dicas rápidas de copy que valem por muitas páginas de teoria

- **Fale "você", não "nós".** Ninguém liga para a sua empresa; a pessoa liga para o que **ela** ganha. Troque "A GRAVA.AI oferece..." por "Você tem...".
- **Benefício antes de característica.** *Característica* é o que a coisa é ("totem com IA"). *Benefício* é o que a pessoa ganha ("produtos exclusivos prontos na hora, sem você precisar entender de design"). Sempre traduza característica em benefício.
- **Frases curtas.** Iniciante escreve parágrafos gigantes. Na internet, frase curta é lida; parágrafo longo é pulado.
- **Números e concretude vencem adjetivos.** "Operação enxuta" é vago; "você opera sozinho, com estoque e treinamento inclusos" é concreto.
- **Escaneabilidade.** As pessoas não leem, **escaneiam**. Use títulos, bullets, negrito nas palavras-chave. Seu site já faz isso bem (bullets com ✓).

### ⚠️ Erros de iniciante em landing page (resumão)

- **Mandar o anúncio para a home** em vez da landing page de franquia.
- **Quebrar o message match:** anúncio promete uma coisa, página fala outra.
- **Headline genérica** ("Bem-vindo") que não diz o que é nem para quem.
- **Formulário longo** logo na hora — cada campo extra derruba a conversão.
- **CTA fraco ou múltiplo:** "Enviar" em vez de "Quero ser franqueado"; ou vários objetivos competindo.
- **Demorar a responder o WhatsApp.** Lead esfria em horas.
- **Depoimento falso** ou nenhuma prova social.
- **FAQ burocrático** que não quebra os medos reais de quem vai investir.
- **Urgência mentirosa** (contador que reinicia, "últimas vagas" eternas).
- **Página lenta.** Se demora para carregar, a pessoa vai embora antes de ver a headline. (Falaremos de velocidade e mobile na parte técnica — mas guarde: **teste sempre no celular**, é de onde vem quase todo o tráfego.)
- **Não medir.** Página sem rastreamento é página no escuro. (O Pixel/tag e o UTM entram na seção de integração — seu formulário já tem os campos UTM ocultos prontos para isso.)

### ✅ Checklist de conversão da landing page

Antes de mandar tráfego pago para a sua página, confira:

- [ ] O **título (h1)** repete as palavras-chave do **anúncio** (message match).
- [ ] A hero passa no **teste dos 5 segundos** (dá para entender o que é e para quem).
- [ ] Há um **formulário curto** ou **CTA de WhatsApp** visível **sem rolar** (above the fold).
- [ ] O formulário do topo pede o **mínimo** (nome + WhatsApp + cidade).
- [ ] O CTA usa **desejo** ("Quero ser franqueado"), não tarefa ("Enviar").
- [ ] Existe **CTA repetido** ao longo da página, sempre à mão.
- [ ] O **WhatsApp** abre com **mensagem pré-preenchida** e alguém responde **rápido**.
- [ ] Há **prova social real** (depoimento com nome/cidade/foto, ou vídeo/foto do totem funcionando).
- [ ] O **FAQ** responde às **objeções e medos** reais de quem vai investir.
- [ ] A **urgência/escassez** é **verdadeira** (ex.: exclusividade por região).
- [ ] A página **não tem fugas** chamativas (links que tiram a pessoa do objetivo).
- [ ] A página **carrega rápido** e está **perfeita no celular**.
- [ ] Os campos **UTM ocultos** estão no formulário (para saber de qual anúncio veio o lead).
- [ ] Só existe **um objetivo**: virar lead. Tudo na página empurra para lá.

Com o anúncio afiado (seções anteriores) **e** a landing page convertendo (esta seção), você tem as duas metades da máquina funcionando. Na próxima parte, vamos **conectar tudo**: instalar o rastreamento no site que você fez, capturar os UTMs e medir de verdade quanto cada real investido virou lead de franqueado.

---

## 8. Roteiro prático 30/60/90 dias

Até aqui você aprendeu a teoria. Agora vem a parte que separa quem *lê* sobre tráfego de quem *faz*: um plano de ação, dia a dia, para você sair literalmente do zero e ter a sua primeira campanha real rodando e gerando leads de franqueados para a GRAVA.AI.

A ideia deste roteiro é simples: **você não precisa aprender tudo antes de começar.** Você aprende fazendo, em pequenas doses, com dinheiro pouco, corrigindo o rumo a cada semana. Pensa como quem está aprendendo a dirigir: ninguém começa pegando estrada à noite na chuva. Começa no estacionamento vazio, em primeira marcha. Este é o seu estacionamento vazio.

> 💡 **Antes de tudo — o que é um "lead":** *lead* é o contato de uma pessoa interessada. No seu caso, é o sujeito que preencheu o formulário "Seja um Franqueado" com nome, telefone e e-mail, ou que clicou no seu botão de WhatsApp. Cada lead é uma porta que se abriu. Seu trabalho com tráfego pago é fazer essas portas se abrirem de forma previsível e controlada.

O plano tem 4 blocos. Não pule blocos. Cada um só faz sentido depois do anterior estar pronto.

| Fase | Período | Objetivo em uma frase |
|------|---------|------------------------|
| Fase 1 | Semana 1-2 | Montar a "fundação": criar contas e instalar o rastreamento no site |
| Fase 2 | Semana 3-4 | Subir a primeira campanha pequena de teste (fase de aprendizado) |
| Fase 3 | Dias 30-60 | Ler os dados, otimizar, testar criativos e públicos |
| Fase 4 | Dias 60-90 | Escalar o que funciona e abrir a segunda plataforma |

---

### Fase 1 — Semana 1 e 2: a fundação (contas + rastreamento)

Ninguém constrói uma casa começando pelo telhado. Antes de qualquer anúncio, você precisa das **contas certas** e do **rastreamento instalado**. Rastreamento é o que permite você saber *de onde vieram* os leads e *quanto custou* cada um. Sem isso, você está dirigindo de olhos vendados — gasta dinheiro e não sabe o que deu certo.

#### Passo a passo da Semana 1

1. **Crie uma conta de e-mail só para o negócio.** Ex.: `marketing@grava.ai` ou, se não tiver domínio ainda, `gravaai.franquias@gmail.com`. Nunca misture com seu e-mail pessoal — você vai criar várias contas amarradas nesse e-mail e precisa manter organizado.

2. **Crie o Meta Business Manager (Gerenciador de Negócios da Meta).** É o "painel de controle central" de tudo que envolve Facebook e Instagram para empresas. É de graça. Acesse o site de negócios da Meta e siga o cadastro. Dentro dele você vai ter:
   - Uma **conta de anúncios** (onde o dinheiro é gasto e as campanhas vivem).
   - A **página** do Instagram/Facebook da GRAVA.AI conectada.
   - O **Pixel** (explicado no passo 4).

3. **Crie a conta no Google Ads.** É a plataforma de anúncios do Google (aparecer na busca, no YouTube, em sites parceiros). Também de graça para criar; você só paga quando os anúncios rodam. Guarde o login no mesmo e-mail do negócio.

4. **Entenda e crie o rastreamento — os "olhos" da sua campanha.** Aqui estão os dois pedaços que você, como desenvolvedor, vai instalar no site que você mesmo fez:

   - **Meta Pixel:** um pedacinho de código (JavaScript) que a Meta te dá. Você cola ele no seu site. A partir daí, a Meta "enxerga" quem visitou sua landing page e quem preencheu o formulário. É assim que ela aprende quem são seus melhores públicos.
   - **Google Analytics 4 (GA4):** ferramenta gratuita do Google que mostra quantas pessoas entraram no site, de onde vieram, quanto tempo ficaram e quantas viraram lead. É o seu "painel de instrumentos".

> 🛠️ **Dica de desenvolvedor (isto é para você):** seu site é Next.js. A forma limpa de instalar esses scripts é usando o componente oficial de scripts do Next (`next/script`) com a estratégia de carregamento adequada, ou uma biblioteca de terceiros já pronta para GA4/Pixel. Como o AGENTS.md deste projeto avisa que esta versão do Next tem mudanças de convenção, **leia o guia de scripts na pasta `node_modules/next/dist/docs/` antes de escrever o código de injeção do Pixel/GA4.** Melhor ainda: centralize os dois numa ferramenta de tags (ver abaixo) para não precisar mexer no código toda vez.

5. **(Opção que poupa dor de cabeça) Instale o Google Tag Manager (GTM).** GTM é uma "caixa" que você instala **uma única vez** no site. Depois, todo novo rastreamento (Pixel, GA4, tags futuras) você adiciona pelo painel do GTM, **sem mexer no código do site de novo**. Para um desenvolvedor, isso significa um único deploy agora e liberdade total depois. É gratuito.

#### Passo a passo da Semana 2

6. **Configure os "eventos de conversão".** *Conversão* é a ação que vale ouro para você. No seu caso, a conversão principal é: **"lead preencheu o formulário Seja um Franqueado"**. Você precisa configurar tanto no Pixel quanto no GA4 para que eles registrem esse momento exato (normalmente disparando o evento quando o formulário é enviado com sucesso, ou quando a pessoa chega numa página de "Obrigado").

7. **Crie uma página de "Obrigado" (Thank You page).** Depois que a pessoa envia o formulário, redirecione ela para uma página tipo `/obrigado`. Isso te dá um jeito simples e à prova de falhas de contar conversões: "chegou em `/obrigado` = 1 lead". Muito mais confiável do que tentar capturar o clique no botão.

8. **Teste o rastreamento com o Meta Pixel Helper.** É uma extensão gratuita do navegador Chrome. Você instala, entra no seu site, preenche o próprio formulário como se fosse um cliente, e a extensão mostra em tempo real se o Pixel disparou e se o evento de lead foi registrado. **Não avance para anúncios enquanto o Pixel Helper não mostrar o evento de lead funcionando.**

9. **Verifique o mesmo no GA4.** No relatório em tempo real do GA4, faça o teste de preencher o formulário e veja se aparece o evento. Se aparecer nos dois, sua fundação está pronta.

> ⚠️ **Erros de iniciante nesta fase:**
> - Sair criando anúncio antes de instalar o Pixel. Resultado: você gasta a Semana 3 inteira "às cegas" e joga fora os dados de aprendizado mais valiosos (os primeiros).
> - Achar que instalou o Pixel só porque colou o código. **Sempre teste com o Pixel Helper.** Metade das instalações de iniciante estão erradas e a pessoa só descobre semanas depois.
> - Usar a conta pessoal do Facebook em vez do Business Manager. Um bloqueio na conta pessoal derruba tudo. Sempre trabalhe pelo Business Manager.

✅ **Checklist Fase 1 (não avance sem isto tudo marcado):**
- [ ] E-mail exclusivo do negócio criado
- [ ] Meta Business Manager criado, com conta de anúncios e página conectadas
- [ ] Conta Google Ads criada
- [ ] GA4 instalado e coletando dados
- [ ] Meta Pixel instalado (idealmente via GTM)
- [ ] Página `/obrigado` criada
- [ ] Evento de conversão "Lead" configurado no Pixel e no GA4
- [ ] Testado e confirmado com Meta Pixel Helper + relatório em tempo real do GA4

---

### Fase 2 — Semana 3 e 4: a primeira campanha de teste

Chegou a hora de gastar os primeiros reais — mas **pouco e de propósito**. O objetivo desta fase **não é lucrar**. É comprar informação. Cada real gasto aqui é uma "aula paga" que ensina a Meta quem é seu público e ensina você a operar a plataforma.

#### Por que começar pequeno (e por qual plataforma)

Comece **só pela Meta (Facebook + Instagram)**. Motivo: para vender uma oportunidade de franquia, você está *interrompendo* alguém no feed com uma oferta ("Quer ter seu próprio negócio?"). Isso funciona muito bem no Instagram/Facebook, onde você mira em *perfis* de pessoas (interesses, comportamento de empreendedor). O Google Ads de busca serve melhor para quem *já procura* "franquia para investir" — é ótimo, mas fica para a Fase 4. Uma coisa de cada vez.

#### Passo a passo

1. **Escolha o objetivo certo da campanha: "Leads".** A Meta te pergunta o que você quer. Escolha o objetivo de **geração de leads / conversões de lead**. Isso diz para a plataforma: "não me traga curtidas, me traga gente que preenche formulário". A plataforma vai usar o Pixel que você instalou para caçar pessoas parecidas com quem converte.

2. **Defina o público inicial — simples de propósito.** No começo, não invente moda. Um bom público de teste para franquia GRAVA.AI:
   - **Localização:** as regiões/cidades onde você aceita franqueados.
   - **Idade:** 28 a 55 anos (perfil de quem tem capital e vontade de empreender).
   - **Interesses:** empreendedorismo, investimentos, franquias, pequenos negócios.
   Deixe a Meta ter espaço para otimizar. Público grande demais é ruim, mas público minúsculo também sufoca o aprendizado.

3. **Crie 2 ou 3 criativos diferentes.** *Criativo* é a peça que a pessoa vê: a imagem/vídeo + o texto. Use o **Canva** (ferramenta gratuita de design) para montar. Faça variações honestas, tipo:
   - Criativo A: foto do totem/quiosque em funcionamento + texto "Tenha seu próprio negócio de personalização com IA".
   - Criativo B: vídeo curto mostrando um produto sendo personalizado + texto focado em "renda e negócio escalável".
   - Criativo C: foco na dor/desejo ("Cansado de trabalhar para os outros?").
   Não precisa ser perfeito. Precisa existir para você descobrir qual estilo o público responde.

4. **Escreva um anúncio claro com chamada para ação.** Lembre da regra do projeto: **não coloque preços nem percentuais.** O número é a isca que você entrega no contato. O anúncio promete o próximo passo ("Preencha e receba as informações da franquia"), não o valor.

5. **Defina o orçamento de aprendizado.** Comece com algo entre **R$ 30 e R$ 50 por dia**, rodando por 7 a 14 dias. Isso dá um teste real (R$ 210 a R$ 700 no total) sem quebrar ninguém. Deixe rodar; **não fique mexendo todo dia** (erro clássico, ver abaixo).

6. **Aponte o anúncio para a sua landing page** (ou use o formulário nativo da Meta, o *Lead Form*, que abre dentro do próprio Instagram). Para começar, mandar para a sua landing page com a página `/obrigado` funciona bem e você controla tudo.

7. **Monte sua planilha de leads.** Uma planilha simples (Google Sheets, gratuita) com colunas: *Data | Nome | Telefone | Origem (campanha) | Status do contato (novo/respondeu/reunião/fechou)*. Todo lead que cair, você registra. Essa planilha é o que vai te dizer, lá na frente, quanto realmente vale um lead — porque leads que ninguém liga de volta não viram franquia.

> ⚠️ **Erros de iniciante nesta fase:**
> - **Mexer na campanha todo dia.** A Meta tem uma "fase de aprendizado" (uns 3-7 dias) em que ela está calibrando. Se você edita, reseta o aprendizado. Deixe respirar.
> - Julgar o resultado com R$ 40 gastos. Dado nenhum se forma com pouquíssimo dinheiro. Espere acumular resultado.
> - Gastar tudo num único criativo. Sem variação, você não aprende *o que* funciona.
> - Esquecer de responder o lead rápido. Lead de franquia esfria em horas. Combine com você mesmo: responder no WhatsApp em até 1 hora.

✅ **Checklist Fase 2:**
- [ ] Campanha com objetivo "Leads/Conversões" criada
- [ ] Público inicial definido (local + idade + interesses)
- [ ] 2-3 criativos feitos no Canva
- [ ] Anúncio sem preço, com chamada clara para ação
- [ ] Orçamento de R$ 30-50/dia definido por 7-14 dias
- [ ] Destino apontando para landing page + `/obrigado`
- [ ] Planilha de leads criada e pronta para receber contatos

---

### Fase 3 — Dias 30 a 60: ler os dados e otimizar

Agora você já tem gente clicando, alguns leads na planilha e — o mais importante — **números**. Esta fase é sobre parar de "chutar" e começar a **decidir com base em dados**. É aqui que o dinheiro começa a render mais.

#### As métricas que importam (e o que cada uma significa)

| Métrica | O que é | Por que importa |
|---------|---------|-----------------|
| **CPL (Custo por Lead)** | Quanto você pagou, em média, por cada formulário preenchido. Total gasto ÷ nº de leads. | É o seu número-rei. Quer ele o mais baixo possível *mantendo qualidade*. |
| **CTR (taxa de cliques)** | % de gente que viu o anúncio e clicou. | CTR baixo = criativo fraco ou público errado. |
| **Taxa de conversão da página** | % de quem entrou no site e virou lead. | Baixa = sua landing page ou formulário não convencem. |
| **Frequência** | Quantas vezes, em média, a mesma pessoa viu seu anúncio. | Acima de ~3-4, o público está "cansando"; hora de trocar criativo. |
| **Qualidade do lead** | Dos leads, quantos respondem e evoluem no funil (da sua planilha). | Lead barato que não fecha é caro. Cruze CPL com qualidade real. |

#### O que fazer com esses números

1. **Mate o que não performa, alimente o que performa.** Olhe os 2-3 criativos: um quase sempre puxa a maioria dos leads a um custo menor. Desligue os fracos e coloque a verba no vencedor.

2. **Teste uma variável por vez (Teste A/B).** *Teste A/B* é comparar duas versões mudando **só uma coisa** para saber o que causou a diferença. Ex.: mesmo público, mesmo texto, só troca a imagem. Se você mudar tudo de uma vez, nunca saberá o que funcionou. Teste, nesta ordem de impacto: **criativo → oferta/texto → público**.

3. **Crie um público parecido (Lookalike).** Depois de acumular leads suficientes, a Meta consegue montar um *Lookalike* (público semelhante): "encontre mais pessoas parecidas com quem já virou lead". Costuma ser um dos públicos mais eficientes para escalar depois.

4. **Ligue o Remarketing.** *Remarketing* é impactar de novo quem já interagiu (visitou a landing, começou o formulário e não terminou). É barato e converte bem — é aquele lembrete "ei, você quase se tornou franqueado, bora terminar?".

5. **Refine a landing page com os dados do GA4.** Se muita gente entra e pouca vira lead, o gargalo é a página. Como desenvolvedor, isso está no seu campo: teste um formulário mais curto, um título mais forte, o botão de WhatsApp mais visível.

> ⚠️ **Erros de iniciante nesta fase:**
> - Olhar só o CPL e ignorar a qualidade. 50 leads baratos que ninguém quer valem menos que 10 leads caros que viram franquia.
> - Testar 5 coisas ao mesmo tempo. Vira bagunça, você não aprende nada.
> - Desistir de um criativo bom só porque *você* enjoou dele. Quem decide é o dado, não o seu gosto.

✅ **Checklist Fase 3:**
- [ ] CPL, CTR, taxa de conversão e frequência sendo acompanhados semanalmente
- [ ] Criativos fracos desligados; verba no vencedor
- [ ] Pelo menos 1 Teste A/B rodado (uma variável por vez)
- [ ] Público Lookalike criado
- [ ] Campanha de Remarketing ativa
- [ ] Landing page ajustada com base no GA4

---

### Fase 4 — Dias 60 a 90: escalar e abrir a segunda plataforma

Você já sabe o que funciona: qual criativo, qual público, qual CPL é o seu normal. Agora o jogo muda de "descobrir" para **"fazer mais do que já dá certo"** — com cuidado para não estragar.

1. **Escale devagar, não de tacada.** Se você achar um conjunto vencedor e triplicar o orçamento de uma vez, a Meta volta para a fase de aprendizado e o custo dispara. Regra prática: **aumente ~20% a cada 3-4 dias**, observando se o CPL se mantém. Escalar é subir escada, não pular do telhado.

2. **Escale em duas direções:**
   - **Vertical:** mais orçamento no que já funciona.
   - **Horizontal:** novos públicos (novos interesses, novos Lookalikes, novas cidades) e novos criativos no mesmo estilo do vencedor.

3. **Abra a segunda plataforma: Google Ads.** Agora sim. Comece pela **Rede de Pesquisa**, mirando quem *já procura ativamente*: palavras como "franquia para investir", "abrir franquia", "melhor franquia 2026". Essas pessoas têm intenção altíssima. A lógica de contas, conversão e orçamento de teste é a mesma que você já dominou na Meta — só muda a plataforma. Comece pequeno de novo (orçamento de aprendizado) e suba conforme provar o CPL.

4. **Considere o YouTube (dentro do Google Ads)** se você tiver bons vídeos: ótimo para mostrar o totem em ação e gerar desejo.

5. **Continue a rotina de otimização.** Escalar não é "deixar rodando e esquecer". Você repete o ciclo da Fase 3 num orçamento maior: ler, cortar, testar, refinar.

> ⚠️ **Erros de iniciante nesta fase:**
> - Escalar orçamento de forma brusca e quebrar uma campanha que estava indo bem.
> - Abrir o Google Ads sem ter estabilizado a Meta. Duas plataformas mal cuidadas rendem menos que uma bem cuidada.
> - Parar de alimentar criativos novos. Todo criativo "cansa" com o tempo (a frequência sobe). Escalar exige um fluxo constante de peças novas no Canva.

✅ **Checklist Fase 4:**
- [ ] Conjunto vencedor identificado e escalado ~20% a cada poucos dias
- [ ] Escala horizontal (novos públicos e criativos) em teste
- [ ] Google Ads (Rede de Pesquisa) no ar com palavras de intenção de compra
- [ ] Rotina semanal de otimização mantida no orçamento maior

---

### Caixa de ferramentas (gratuitas e baratas)

Tudo o que um iniciante precisa para começar cabe nesta lista. Quase tudo é de graça.

| Ferramenta | Para que serve | Custo |
|------------|----------------|-------|
| **Meta Business Manager** | Painel central de anúncios do Instagram/Facebook | Grátis |
| **Google Ads** | Anúncios na busca do Google e YouTube | Grátis criar; paga o anúncio |
| **Google Analytics 4 (GA4)** | Ver de onde vem o tráfego e o que vira lead | Grátis |
| **Google Tag Manager (GTM)** | Instalar rastreamentos sem mexer no código toda vez | Grátis |
| **Meta Pixel Helper** | Testar se o Pixel está funcionando de verdade | Grátis (extensão Chrome) |
| **Canva** | Criar imagens e vídeos dos anúncios | Grátis (versão Pro é barata) |
| **Google Sheets** | Planilha de leads e controle do funil | Grátis |
| **CapCut** | Editar vídeos curtos para os criativos | Grátis |

### Onde estudar (tipos de fonte confiáveis)

Não confie em qualquer "guru" do Instagram prometendo enriquecer. Procure **estas fontes**, que são atualizadas e não vendem fórmula mágica:

- **Centrais de ajuda oficiais:** a Central de Ajuda da Meta (Meta Business Help Center) e a Ajuda do Google Ads / Google Skillshop. São a fonte da verdade sobre *como a ferramenta funciona* — e mudam sempre, então a doc oficial é o que vale.
- **Cursos gratuitos oficiais:** o **Meta Blueprint** e o **Google Skillshop** têm trilhas gratuitas e certificações. Comece por aí.
- **Documentação técnica de instalação** (para você, dev): a doc oficial do Pixel/Conversions API da Meta e das tags do Google. E, para o site, a doc do Next.js na pasta `node_modules/next/dist/docs/`.
- **Canais de profissionais reconhecidos** que mostram print de conta real e falam de dados — não de "mindset". Prefira quem ensina a *ler métrica* a quem só promete resultado.
- **Comunidades** de tráfego pago (fóruns, grupos) para tirar dúvidas específicas de operação.

> ⚠️ **Erro de iniciante:** consumir conteúdo o dia inteiro e nunca subir uma campanha. Estudo sem prática não gera lead. Regra: **para cada hora estudando, uma hora mexendo na conta de verdade.**

### Orçamento realista de aprendizado (os 90 dias)

Isto é dinheiro de *aprender*, não de *lucrar*. Encare como uma matrícula em curso — só que o "professor" é o mercado real.

| Fase | Gasto em anúncio | O que você compra com isso |
|------|------------------|-----------------------------|
| Semana 1-2 | R$ 0 | Só montando contas e rastreamento |
| Semana 3-4 | R$ 30-50/dia (~R$ 400-700) | Primeiros dados e primeiros leads |
| Dias 30-60 | R$ 50-80/dia (~R$ 1.500-2.400) | Otimização e testes A/B |
| Dias 60-90 | R$ 80-150/dia (~R$ 2.400-4.500) | Escala + entrada no Google Ads |

**Total dos 90 dias:** algo entre **R$ 4.000 e R$ 8.000**, ajustável para mais ou menos conforme seu caixa. Dá para começar com menos (R$ 20/dia) — só vai levar mais tempo para acumular dados confiáveis. **A regra de ouro: nunca gaste em tráfego dinheiro que você precisa para pagar conta.** Comece com o que você pode perder sem chorar.

---

### ✅ Checklist final: pronto para vender o "Plano B de tráfego" para o cliente

Depois desses 90 dias, você não é mais um iniciante — você tem uma máquina de gerar leads de franqueado *funcionando e mensurável*. Isso vale ouro, porque agora você pode oferecer esse serviço ao dono da GRAVA.AI (ou a outros clientes) com **prova real**, não com promessa. Antes de vender, confirme que você consegue dizer "sim" a tudo isto:

- [ ] Eu sei instalar Pixel e GA4 num site (inclusive Next.js) e **testar** se estão funcionando
- [ ] Tenho contas de Business Manager e Google Ads organizadas num e-mail de negócio
- [ ] Já subi campanhas reais e sei configurar objetivo, público, orçamento e criativos
- [ ] Sei ler CPL, CTR, taxa de conversão e frequência — e **decidir** com base neles
- [ ] Já rodei testes A/B mudando uma variável por vez
- [ ] Sei criar Lookalike e Remarketing
- [ ] Sei escalar sem estourar o custo (aumento gradual)
- [ ] Já operei duas plataformas (Meta e Google)
- [ ] Tenho uma planilha que liga *lead → contato → franquia fechada* (provo o retorno real)
- [ ] Consigo mostrar ao cliente **quanto custa um lead** e **quanto custa um franqueado** — sem expor os números no site, entregando-os só na conversa

Se você marcou tudo, parabéns: você saiu do zero absoluto e virou alguém que **entrega leads previsíveis**. Esse é exatamente o "Plano B" que transforma um desenvolvedor de site num parceiro estratégico do negócio.
