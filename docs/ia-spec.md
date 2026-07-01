# Arquitetura de Informação & Hierarquia — GRAVA.AI

> Objetivo único do site: **VENDER FRANQUIAS** via tráfego pago. Síntese a partir
> de 3 referências (Guaco, Havanna, Kopenhagen). `[REAL]` = conteúdo da marca ·
> `[PLACEHOLDER]` = lorem ipsum a substituir (`[substituir por: X]`).

## 1. Prioridade das páginas (funil de tráfego pago)

| Rank | Página | Papel no funil | Conversão |
|---|---|---|---|
| 1 | `/seja-um-franqueado` (LP) | Conversão BOFU/MOFU — destino dos anúncios | Lead no form + WhatsApp |
| 2 | `/` (Home) | Contextualização/MOFU — marca, orgânico, remarketing | Clique → LP |
| 3 | `/blog` | TOFU/SEO + nutrição | Clique → LP + e-mail |

A LP é **autossuficiente** (one-page AIDA). Anúncios apontam direto para ela, em
**modo campanha** (navbar sem links de fuga: só logo + CTA + WhatsApp).

## 2. LP "Seja um Franqueado" — ordem das seções

0. Navbar de campanha (sticky, só logo + CTA + WhatsApp)
1. **Hero** ⭐ — H1 âncora financeira (R$ 99.900 / payback 6–12m) + form curto above-the-fold + 3 bullets de prova + CTA WhatsApp
2. **Barra de números** — R$ 99.900 · 6–12 meses · R$ 60–100 · 2,5%/1% · [unidades]
3. **O mercado mudou + 3 pilares** (Inovação/Experiência/Rentabilidade)
4. **Como funciona o totem** — 3 passos + onde atua
5. **Investimento detalhado** — número display + grid de 6 cards
6. **Distribuição própria** — 4 features (quebra de objeção)
7. **Até onde a IA auxilia** — 4 itens (diferencial competitivo)
8. **Depoimentos** [PLACEHOLDER] — 2–3 cards
9. **Autoridade/mercado** [PLACEHOLDER] — dados de setor
10. **FAQ** (acordeão) — objeções
11. **Urgência** [PLACEHOLDER] — vagas por região
12. **Formulário final** ⭐ `#formulario` — form completo + WhatsApp/Instagram
13. **Rodapé** — contato + legais [PLACEHOLDER]

### Captura de lead (dupla)
- **Form curto** (hero): Nome · WhatsApp · Cidade/UF → "Quero ser franqueado"
- **Form completo** (#formulario): + E-mail · Capital disponível (faixas) · Quando
  começar · consentimento LGPD · campos UTM ocultos
- CTAs âncora repetidos → todos rolam para `#formulario`.

## 3. Home `/` — institucional → ponte para franquia

Hero (CTA "Seja um franqueado") → O que é → 3 pilares → Onde atuamos → **Como
funciona** (#como-funciona) → IA → **Faixa "Oportunidade de franquia"** (teaser
R$ 99.900 → LP, alimenta o funil) → Blog teaser → CTA final + rodapé.

## 4. Blog `/blog` — SEO/TOFU

Header → post destaque → grid com categorias → **CTA "Quer ser franqueado?" em
todo post** → newsletter (opcional) → rota `/blog/[slug]` futura (CMS/MDX).

## 5. Otimizações tráfego pago + SEO

- **Message match** H1 ↔ criativo do anúncio; form above-the-fold + UTM ocultos.
- **WhatsApp** `wa.me/5515996610916` com mensagem pré-preenchida (baixa fricção).
- CTA único repetido; qualificação financeira no form; urgência real.
- Modo campanha sem links de fuga; thank-you page `/obrigado` para remarketing.
- Tracking: Meta Pixel + GA4, evento `Lead`.
- SEO: metadata por página, OG/Twitter, JSON-LD (`Organization`, `FAQPage`,
  `Article`), sitemap/robots, URLs em pt.
- Perf (CWV): `next/image`, `next/font` display swap, SVG inline, LCP < 2,5s mobile.
- Mobile-first: hero empilha, WhatsApp sticky no rodapé mobile, toque ≥ 44px.

## 6. Navbar

- **Institucional** (Home/Blog): Início · Como funciona · Investimento · Blog +
  CTA sticky "Seja um franqueado" + WhatsApp.
- **Campanha** (LP): só logo + "Quero ser franqueado" + WhatsApp.

## Lacunas de conteúdo a coletar (hoje PLACEHOLDER)

1. Depoimentos reais (nome, cidade, foto, payback).
2. Nº de unidades/regiões + exclusividade territorial.
3. Dados de mercado (Sebrae/ABF).
4. Metragem/requisitos do ponto e do totem (FAQ).
5. Claim de escassez verdadeiro.
6. Conteúdo real dos posts.
7. Páginas legais (Privacidade/LGPD).
