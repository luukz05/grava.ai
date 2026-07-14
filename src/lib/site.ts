/**
 * Constantes e conteúdo compartilhado do site GRAVA.AI.
 * [REAL] = dado de marca · [PLACEHOLDER] = substituir.
 */

export const WHATSAPP_NUMBER = "(15) 99661-0916"; // [REAL]
export const WHATSAPP_LINK =
  "https://wa.me/5515996610916?text=" +
  encodeURIComponent(
    "Olá! Tenho interesse em ser franqueado da GRAVA.AI.",
  );
export const INSTAGRAM_HANDLE = "@gravaaioficial"; // [REAL]
export const INSTAGRAM_LINK = "https://instagram.com/gravaaioficial";

// Redes sociais (icon = chave mapeada em icons). [PLACEHOLDER] onde href = "#".
export const SOCIALS = [
  { name: "Instagram", href: INSTAGRAM_LINK, icon: "instagram" },
  { name: "WhatsApp", href: WHATSAPP_LINK, icon: "whatsapp" },
  { name: "Facebook", href: "#", icon: "facebook" }, // [substituir por: URL real]
  { name: "TikTok", href: "#", icon: "tiktok" }, // [substituir por: URL real]
] as const;

// Faixa de destaques (sem valores/percentuais — geram desejo, não tabela preço)
export const DESTAQUES = [
  { t: "Personalização com IA", d: "Um produto único, criado e gravado na hora." },
  { t: "Operação enxuta", d: "Automatizada e movida por Inteligência Artificial." },
  { t: "Alta demanda", d: "Um mercado que valoriza o exclusivo e a experiência." },
  { t: "Suporte total", d: "Da matriz — do estoque à operação do dia a dia." },
];

export const PILARES = [
  { t: "Inovação", d: "Uma ideia nova de personalizados, criada para facilitar.", icon: "lightbulb" },
  { t: "Experiência", d: "Traz o cliente para participar da criação do produto.", icon: "handSparkles" },
  { t: "Rentabilidade", d: "Um modelo pensado para gerar lucro com retorno rápido.", icon: "trendUp" },
];

export const LOCAIS = [
  "Shopping centers",
  "Supermercados e hipermercados de grande porte",
  "Aeroportos",
];

// [HOME] Como funciona o produto (experiência do cliente no totem)
export const PASSOS = [
  {
    t: "Escolha e crie com IA",
    d: "No totem, o cliente escolhe ou gera a arte com Inteligência Artificial.",
    icon: "sparkles",
  },
  {
    t: "Grave na hora",
    d: "O produto é personalizado na hora, com qualidade padronizada.",
    icon: "bolt",
  },
  {
    t: "Leve uma história",
    d: "O cliente sai com um produto exclusivo que carrega um significado.",
    icon: "gift",
  },
];

// [HOME] A IA como DNA do produto/empresa (voltada ao cliente)
export const IA_PRODUTO = [
  {
    t: "IA que cria",
    d: "O cliente gera a arte ideal em segundos, com Inteligência Artificial.",
    icon: "sparkles",
  },
  {
    t: "Personalização na hora",
    d: "Do conceito ao produto gravado, em poucos minutos.",
    icon: "bolt",
  },
  {
    t: "Experiência guiada",
    d: "A IA conduz o cliente do primeiro toque até a retirada.",
    icon: "route",
  },
];

// [HOME] Forças de mercado que, somadas, originam a GRAVA.AI (seção "Quem somos")
export const FORCAS = [
  {
    t: "O cliente quer o exclusivo",
    d: "Cada pessoa busca um produto só dela — não mais de prateleira.",
    icon: "handSparkles",
  },
  {
    t: "IA na palma da mão",
    d: "A arte ideal nasce em segundos, sem designer nem espera.",
    icon: "sparkles",
  },
  {
    t: "Varejo de alto fluxo",
    d: "Shoppings, mercados e aeroportos cheios de gente em movimento.",
    icon: "bag",
  },
];

// [FRANQUIA] Passo a passo para se tornar franqueado
export const COMO_SER_FRANQUEADO = [
  { t: "Preencha o formulário", d: "Deixe seus dados e o capital disponível para investir.", icon: "penToSquare" },
  { t: "Converse com um especialista", d: "Nosso time apresenta o modelo e tira suas dúvidas.", icon: "comments" },
  { t: "Análise de viabilidade", d: "Avaliamos juntos a região e o ponto ideal.", icon: "chart" },
  { t: "Assinatura do contrato", d: "Formalização e definição do plano de implantação.", icon: "contract" },
  { t: "Implantação e treinamento", d: "Montagem da unidade e capacitação completa.", icon: "graduation" },
  { t: "Inauguração", d: "Sua unidade GRAVA.AI pronta para operar e vender.", icon: "store" },
];

// O que o franqueado recebe (qualitativo — fica no topo/meio da página)
export const INCLUSO = [
  { t: "Totem com IA", d: "O equipamento completo para operar a sua unidade.", icon: "robot" },
  { t: "Estoque inicial", d: "Você já começa pronto para vender no primeiro dia.", icon: "boxes" },
  { t: "Treinamento completo", d: "Capacitação total, mesmo sem nenhuma experiência.", icon: "graduation" },
  { t: "Marketing e tecnologia", d: "Plataforma, CRM e apoio de divulgação da matriz.", icon: "bullhorn" },
  { t: "Distribuição garantida", d: "Produtos e matéria-prima direto da matriz.", icon: "truck" },
  { t: "Suporte contínuo", d: "Acompanhamento em tempo real, sempre ao seu lado.", icon: "headset" },
];

// Detalhamento financeiro (valores da apresentação em PDF) — vai MAIS ABAIXO,
// numa seção de detalhamento da franquia (nunca no hero/header).
export const INVESTIMENTO_VALOR = "R$ 99.900,00"; // investimento inicial
export const INVESTIMENTO = [
  { t: "Taxa do franqueado", d: "R$ 35.000,00 já inclusa no valor." },
  { t: "Taxa de royalties", d: "2,5% sobre o faturamento bruto." },
  { t: "Taxa de marketing", d: "1% sobre o faturamento bruto." },
  { t: "Payback estimado", d: "De 6 a 12 meses para retorno." },
  { t: "Ticket médio", d: "Aproximadamente R$ 60,00 a R$ 100,00." },
  { t: "Estoque e equipamentos", d: "Em média R$ 15.000,00 (estoque inicial incluso)." },
];

// [FRANQUIA] Modelos de loja esperados (fictícios — inspirados na Kopenhagen)
export const MODELOS = [
  {
    nome: "GRAVA.AI Quiosque",
    tag: "O mais procurado",
    desc: "O formato compacto e versátil para corredores de shoppings e supermercados de grande porte. Baixo custo de operação e presença em alto fluxo.",
    destaques: [
      "Ideal para shoppings e supermercados",
      "Operação enxuta e rápida de montar",
      "Menor investimento de entrada",
    ],
    img: "/kiosk.png",
    fit: "contain",
    placeholder: "",
  },
  {
    nome: "GRAVA.AI Store",
    tag: "Experiência completa",
    desc: "A loja completa, com mais espaço para produtos, personalização e uma experiência de marca imersiva — um verdadeiro ponto de destino.",
    destaques: [
      "Maior mix de produtos",
      "Vitrine e experiência de marca",
      "Ponto de destino dentro do shopping",
    ],
    img: "/shopping.jpg",
    fit: "cover",
    placeholder: "",
  },
  {
    nome: "GRAVA.AI Express",
    tag: "Alto fluxo",
    desc: "O formato enxuto e ágil para aeroportos, eventos e locais de altíssimo fluxo, com foco na compra rápida e no impulso.",
    destaques: [
      "Perfeito para aeroportos e eventos",
      "Ocupa o mínimo de espaço",
      "Venda rápida, por impulso",
    ],
    img: "",
    fit: "cover",
    placeholder: "Modelo GRAVA.AI Express",
  },
];

export const DISTRIBUICAO = [
  { t: "Distribuição centralizada", d: "Produtos e matéria-prima pela matriz." },
  { t: "Estoque inteligente", d: "Plataforma monitora consumo e alerta reposição." },
  { t: "Controle de qualidade", d: "Padronização em todas as unidades." },
  { t: "Gestão integrada", d: "Unidade sempre abastecida e eficiente." },
];

// [FRANQUIA] O que os pilares de IA da operação significam para o cliente
// final da unidade (espelha, na mesma ordem, os 6 badges do diagrama radial).
export const IA_CLIENTE = [
  {
    t: "Produto único em segundos",
    d: "A arte nasce na hora, no totem — sem fila e sem designer.",
  },
  {
    t: "Compra de onde estiver",
    d: "Personaliza online e retira na unidade.",
  },
  {
    t: "Experiência que só melhora",
    d: "Cada venda alimenta os relatórios que refinam a operação.",
  },
  {
    t: "Atendimento que reconhece",
    d: "Histórico e pedidos acompanhados de perto pelo CRM.",
  },
  {
    t: "Problema resolvido rápido",
    d: "Suporte automatizado da matriz, sem burocracia.",
  },
  {
    t: "Nunca encontra prateleira vazia",
    d: "A reposição é alertada antes de o produto faltar.",
  },
];

export const IA_OPERACAO = [
  "No totem: primeiro atendimento e criação da arte para gravação.",
  "No sistema de Vendas Online.",
  "CRM inteligente: acompanhamento em tempo real da matriz.",
  "Estoque: aponta o que mais vende e o que precisa de reposição.",
];

// [PLACEHOLDER] Depoimentos — substituir por reais (nome, cidade, foto)
export const DEPOIMENTOS = [
  {
    nome: "Lorem Ipsum",
    cidade: "Sorocaba/SP",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Um negócio que roda sozinho e me surpreendeu desde o primeiro mês.",
  },
  {
    nome: "Dolor Sit",
    cidade: "Campinas/SP",
    texto:
      "Sed do eiusmod tempor incididunt ut labore. O suporte da matriz e a IA fazem toda a diferença no dia a dia.",
  },
  {
    nome: "Amet Consectetur",
    cidade: "Curitiba/PR",
    texto:
      "Ut enim ad minim veniam, quis nostrud exercitation. Um negócio simples de operar e cheio de oportunidade.",
  },
];

// Ganchos de oportunidade de mercado (sem números — geram desejo)
export const MERCADO = [
  { t: "Tendência global", d: "A personalização cresce e veio para ficar no varejo." },
  { t: "Consumidor exigente", d: "As pessoas querem produtos únicos e experiências." },
  { t: "IA em ascensão", d: "A tecnologia que está transformando o consumo." },
];

export const FAQ = [
  {
    q: "Quanto preciso investir?",
    a: "O investimento inicial é de R$ 99.900,00, já com a taxa de franqueado (R$ 35.000) e o estoque inicial inclusos. Veja o detalhamento completo na seção de investimento.",
  },
  {
    q: "Em quanto tempo recupero o investimento?",
    a: "O payback estimado é de 6 a 12 meses, dependendo do ponto e da operação.",
  },
  {
    q: "Preciso entender de tecnologia?",
    a: "Não. A Inteligência Artificial e o suporte da matriz cuidam da operação — do atendimento ao estoque.",
  },
  {
    q: "Onde posso montar a unidade?",
    a: "Em shoppings, supermercados e hipermercados de grande porte e aeroportos — locais de alto fluxo.",
  },
  {
    q: "Existe exclusividade de região?",
    a: "Trabalhamos com regiões estratégicas. Fale com um consultor para saber a disponibilidade da sua cidade.",
  },
  {
    q: "O que está incluso na franquia?",
    a: "Totem com IA, estoque inicial, treinamento, marketing, tecnologia e suporte contínuo. Os detalhes completos vão na apresentação.",
  },
];
