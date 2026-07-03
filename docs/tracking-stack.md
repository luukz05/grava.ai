# Stack de Tracking — Meta Ads + Google Ads (Next.js)

> Apêndice técnico do setup do **Plano B**. Checklist de implementação do
> rastreamento de leads server-side para os dois canais. Projeto: Next.js
> (App Router). Referência do escopo: `proposta-comercial.md` §2 (Plano B).

---

## Escopo dos canais

- **Meta Ads** engloba **Facebook, Instagram, Messenger e Audience Network** —
  todos cobertos por **um único** Pixel + CAPI (não há tracking separado por rede).
- **Google Ads** — cobertura via Google tag + Enhanced Conversions + GA4.

> **Regra de ouro (propriedade):** todas as contas abaixo ficam **no nome/CNPJ do
> cliente** desde o dia 1. Você entra como **admin/parceiro**, nunca como dono.

---

## 1. Contas e pré-requisitos (config, não código)

**Meta:**
- Meta **Business Manager** (Business Suite)
- **Conta de Anúncios** + **Dataset/Pixel** → guardar o **Pixel ID**
- **Token de acesso da CAPI** (System User token gerado no Business Manager)

**Google:**
- Conta **Google Ads** → criar **ações de conversão** (guardar Conversion ID/Label)
- Propriedade **Google Analytics 4** → **Measurement ID** + **API Secret**
- Acesso à **Google Ads API** (Developer Token + OAuth) — para Enhanced
  Conversions server-side
- **Link GA4 ↔ Google Ads** ativado

---

## 2. Meta Ads — stack

| Camada | Tecnologia |
|---|---|
| Client-side | **Meta Pixel** (`fbq`) |
| Server-side | **Conversions API (CAPI)** — Graph API `POST /{pixel-id}/events` |
| SDK | **`facebook-nodejs-business-sdk`** (ou `fetch` direto ao Graph API) |
| Deduplicação | **`event_id`** compartilhado entre Pixel e CAPI |
| Attribution IDs | cookies **`_fbp`** (browser) e **`_fbc`** (derivado do `fbclid` da URL) |
| Dados do usuário | e-mail/telefone com **hash SHA-256** (`em`, `ph`) |
| QA | **Events Manager → Test Events** + extensão **Meta Pixel Helper** |

---

## 3. Google Ads — stack

| Camada | Tecnologia |
|---|---|
| Client-side | **Google tag (`gtag.js`)** — conversão do Google Ads |
| Server-side | **Enhanced Conversions for Leads** (first-party com hash) — via **Google Ads API** ou gtag com user-provided data |
| Analytics + ponte | **GA4** + **link GA4 ↔ Google Ads** (importa conversões) |
| GA4 server-side | **GA4 Measurement Protocol** (eventos server → GA4) |
| Attribution IDs | **`gclid`**, **`gbraid`**, **`wbraid`** (capturados da URL) |
| Dados do usuário | e-mail/telefone com **hash SHA-256** |
| QA | **Google Tag Assistant** + **GA4 DebugView** + diagnóstico de conversão do Ads |

---

## 4. Camada comum / infra (Next.js)

| Função | Tecnologia |
|---|---|
| Disparo server-side (CAPI, Enhanced Conv., GA4 MP) | **Server Actions / Route Handlers** do Next |
| Carregar tags client-side | **`@next/third-parties`** (`GoogleTagManager`, `GoogleAnalytics`) ou script manual |
| Hash de PII (e-mail/telefone) | **`crypto`** nativo do Node — **SHA-256** |
| Segredos | **Env vars** (ver §6) |
| Captura de UTMs + click IDs | ler `searchParams` → cookie/hidden field no form |
| Consentimento / LGPD | **CMP (cookie banner)** + **Google Consent Mode v2** + data processing options do Meta |
| (Opcional) Gerenciador de tags | **Google Tag Manager** (web) — só se quiser gerir tags sem deploy |

> **Não use server-side GTM (container próprio)** para uma landing page — é
> overkill e custo de infra extra. Dispare CAPI / Enhanced Conversions / GA4 MP
> **direto das Server Actions do Next**.

---

## 5. Arquitetura recomendada

```
form submit → Server Action (Next)
   ├─ hash SHA-256 do e-mail/telefone
   ├─ Meta CAPI                    → evento "Lead"  (event_id + _fbp/_fbc)
   ├─ Google Enhanced Conversions  → conversão (dados com hash + gclid)
   ├─ GA4 Measurement Protocol     → evento "generate_lead"
   └─ salva o lead + notifica WhatsApp/CRM
   + client-side:
        Pixel dispara "Lead" (MESMO event_id → dedup)
        gtag dispara a conversão do Google Ads
```

**Deduplicação** — o mesmo `event_id` no Pixel e na CAPI faz o Meta contar o lead
**uma vez**. Sem isso, conta dobrado e estraga a otimização.

**Captura de attribution na entrada** — na primeira visita, ler da URL e guardar
em cookie: `fbclid` (→ `_fbc`), `gclid`/`gbraid`/`wbraid`, e todos os `utm_*`.
Enviar junto no submit.

---

## 6. Variáveis de ambiente (checklist)

```bash
# Meta
NEXT_PUBLIC_META_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=          # System User token (secreto, server-only)
META_TEST_EVENT_CODE=            # opcional, só p/ validar no Test Events

# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_ID=       # AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=
GOOGLE_ADS_DEVELOPER_TOKEN=      # p/ Enhanced Conversions via API
GOOGLE_ADS_CUSTOMER_ID=
GOOGLE_ADS_OAUTH_CLIENT_ID=
GOOGLE_ADS_OAUTH_CLIENT_SECRET=
GOOGLE_ADS_REFRESH_TOKEN=

# GA4
NEXT_PUBLIC_GA4_MEASUREMENT_ID=  # G-XXXXXXXXX
GA4_API_SECRET=                  # Measurement Protocol (secreto, server-only)
```

> `NEXT_PUBLIC_*` vão para o client (IDs públicos, ok). Tokens/secrets **sem**
> `NEXT_PUBLIC_` — só server-side, nunca expostos no bundle.

---

## 7. Pacotes npm

```bash
npm i facebook-nodejs-business-sdk   # Meta CAPI
npm i google-ads-api                 # Enhanced Conversions (ou REST direto)
npm i @next/third-parties            # carregar Pixel/gtag/GA4 no client
# crypto: nativo do Node (hash SHA-256) — sem instalar
```

---

## 8. O que é setup (Plano B) × o que é upsell

**Incluído no setup do Plano B:**
- Pixel + CAPI (Meta) · Google tag + Enhanced Conversions + GA4 (Google)
- Evento de lead com dedup · captura de click IDs e UTMs
- Envio do lead pro destino (planilha/CRM/WhatsApp)
- CMP + Consent Mode v2 (LGPD)

**Vira módulo à parte (upsell):**
- **Dashboard de leads** próprio (o Plano B entrega relatório mensal, não painel ao vivo)
- **Captura de lead avançada** (scoring, roteamento por perfil/capital)
- **Integração CRM dedicada** (RD Station/HubSpot/Pipedrive a fundo)
- **Banco de dados próprio** de leads (pré-requisito do dashboard)

---

## 9. Ordem de implementação sugerida

1. Contas e permissões (Business Manager, GA4, Google Ads) — no nome do cliente
2. Pixel + gtag client-side + Consent Mode v2 + CMP
3. Server Action de captura → salvar lead + notificar
4. CAPI (Meta) com `event_id` e dedup — validar no Test Events
5. Enhanced Conversions (Google) + GA4 Measurement Protocol
6. Captura de `fbclid`/`gclid`/`utm_*` na entrada
7. QA ponta a ponta (Pixel Helper, Test Events, GA4 DebugView, Tag Assistant)
8. Marcar conversões no Meta e no Google Ads como as de otimização das campanhas
