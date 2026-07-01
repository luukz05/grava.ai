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

// Faixa de destaques (sem valores/percentuais — geram desejo, não tabela preço)
export const DESTAQUES = [
  { t: "Personalização com IA", d: "Um produto único, criado e gravado na hora." },
  { t: "Operação enxuta", d: "Automatizada e movida por Inteligência Artificial." },
  { t: "Alta demanda", d: "Um mercado que valoriza o exclusivo e a experiência." },
  { t: "Suporte total", d: "Da matriz — do estoque à operação do dia a dia." },
];

export const PILARES = [
  { t: "Inovação", d: "Uma ideia nova de personalizados, criada para facilitar." },
  { t: "Experiência", d: "Traz o cliente para participar da criação do produto." },
  { t: "Rentabilidade", d: "Um modelo pensado para gerar lucro com retorno rápido." },
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
  },
  {
    t: "Grave na hora",
    d: "O produto é personalizado na hora, com qualidade padronizada.",
  },
  {
    t: "Leve uma história",
    d: "O cliente sai com um produto exclusivo que carrega um significado.",
  },
];

// [HOME] A IA como DNA do produto/empresa (voltada ao cliente)
export const IA_PRODUTO = [
  {
    t: "IA que cria",
    d: "O cliente gera a arte ideal em segundos, com Inteligência Artificial.",
  },
  {
    t: "Personalização na hora",
    d: "Do conceito ao produto gravado, em poucos minutos.",
  },
  {
    t: "Experiência guiada",
    d: "A IA conduz o cliente do primeiro toque até a retirada.",
  },
];

// [FRANQUIA] Passo a passo para se tornar franqueado
export const COMO_SER_FRANQUEADO = [
  { t: "Preencha o formulário", d: "Deixe seus dados e o capital disponível para investir." },
  { t: "Converse com um especialista", d: "Nosso time apresenta o modelo e tira suas dúvidas." },
  { t: "Análise de viabilidade", d: "Avaliamos juntos a região e o ponto ideal." },
  { t: "Assinatura do contrato", d: "Formalização e definição do plano de implantação." },
  { t: "Implantação e treinamento", d: "Montagem da unidade e capacitação completa." },
  { t: "Inauguração", d: "Sua unidade GRAVA.AI pronta para operar e vender." },
];

// O que o franqueado recebe (sem valores — os números vêm na apresentação/contato)
export const INCLUSO = [
  { t: "Totem com IA", d: "O equipamento completo para operar a sua unidade." },
  { t: "Estoque inicial", d: "Você já começa pronto para vender no primeiro dia." },
  { t: "Treinamento completo", d: "Capacitação total, mesmo sem nenhuma experiência." },
  { t: "Marketing e tecnologia", d: "Plataforma, CRM e apoio de divulgação da matriz." },
  { t: "Distribuição garantida", d: "Produtos e matéria-prima direto da matriz." },
  { t: "Suporte contínuo", d: "Acompanhamento em tempo real, sempre ao seu lado." },
];

export const DISTRIBUICAO = [
  { t: "Distribuição centralizada", d: "Produtos e matéria-prima pela matriz." },
  { t: "Estoque inteligente", d: "Plataforma monitora consumo e alerta reposição." },
  { t: "Controle de qualidade", d: "Padronização em todas as unidades." },
  { t: "Gestão integrada", d: "Unidade sempre abastecida e eficiente." },
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
    a: "O investimento varia conforme o modelo e a região. Preencha o formulário e um consultor apresenta a proposta completa, com todos os valores, para o seu caso.",
  },
  {
    q: "A GRAVA.AI dá retorno rápido?",
    a: "Sim — o modelo foi desenhado para uma operação enxuta e lucrativa. Fale com um consultor para conhecer a projeção completa de retorno.",
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
