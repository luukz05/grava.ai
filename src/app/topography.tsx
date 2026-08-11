"use client";

/* Curvas de nível em WebGL. Componente do React Bits (reactbits.dev), vendorizado
   aqui e portado para TypeScript — daí o nome em inglês no meio de um diretório
   em português: é código de terceiro, e mudar o nome esconderia isso.

   O que ele faz que a carta em SVG não fazia: o terreno MORFA. As curvas não
   são um desenho fixo com parallax por cima — o campo de elevação é recalculado
   a cada quadro no shader, então as curvas nascem, se fundem e somem como
   isolinhas de verdade. É a diferença entre uma carta impressa e um terreno
   vivo.

   Três mudanças em relação ao original:

   AMOSTRAGEM. O `aoQuadro` entrega, a cada quadro, uma função que lê a elevação
   do campo num ponto qualquer da tela — a mesma conta do shader, refeita em
   JavaScript sobre os mesmos pontos de controle. É o que permite pousar coisa
   em cima de uma curva que está se mexendo; sem isso, qualquer marco desenhado
   por fora seria um adesivo flutuando perto da linha. Ler o pixel de volta da
   GPU custaria uma sincronização por quadro; refazer quatro senos custa nada.

   MOVIMENTO REDUZIDO. O original roda o `requestAnimationFrame` incondicional.
   Aqui a preferência do sistema é consultada e, quando o movimento está
   desligado, desenha-se um quadro só e para — um terreno parado é um estado
   correto da carta, não um defeito. A mesma regra do resto do fundo.

   TIPOS. Os uniformes do `Program` são `Record<string, any>` na tipagem do ogl;
   o `Uniformes` abaixo é só para o código deste arquivo não escrever `any` a
   cada acesso.

   O que NÃO mudou: o par de observadores (interseção e visibilidade da aba) que
   congela o laço quando o herói sai da tela ou a aba vai para trás. É o que
   impede uma GPU acordada atrás de uma aba escondida. */

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "./topography.css";

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

export type ModoCor = "elevation" | "uniform" | "alternating";

/* Lê a elevação do campo em `(u, v)`, com `u` da esquerda para a direita e `v`
   DE BAIXO PARA CIMA — é o sistema do `gl_FragCoord`, e mudar isso aqui só
   moveria a conversão para o outro lado.

   O valor devolvido já vem multiplicado por `bands`: as curvas de nível estão
   exatamente nos inteiros dele. Quem quer pousar sobre uma curva procura onde
   isto vale um inteiro. */
export type Amostrador = (u: number, v: number) => number;

const colorModeToFloat = (mode: ModoCor) => {
  if (mode === "uniform") return 1.0;
  if (mode === "alternating") return 2.0;
  return 0.0;
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uMorphAmount;
uniform float uBands;
uniform float uThickness;
uniform float uScale;
uniform float uPixelSize;
uniform float uGlow;
uniform float uColorMode;
uniform float uContrast;
uniform float uBrightness;
uniform float uFillBands;
uniform float uOpacity;
uniform vec3 uLow;
uniform vec3 uMid;
uniform vec3 uHigh;
uniform vec2 uMouse;
uniform float uMouseEnabled;
uniform float uMouseRadius;
uniform float uMouseStrength;
uniform float uMouseActive;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec4 uCtrlA;
uniform vec4 uCtrlB;
uniform vec4 uCtrlC;
uniform vec4 uCtrlD;
out vec4 fragColor;

float bez(float t, vec4 c) {
  float w = 6.2831853 * t;
  return 0.5 * (c.x * sin(w) + c.y * cos(w) + c.z * sin(2.0 * w) + c.w * cos(2.0 * w));
}

float field(vec2 uv) {
  vec2 a = vec2(bez(uv.x, uCtrlA), bez(uv.x, uCtrlB));
  vec2 b = vec2(bez(uv.y, uCtrlC), bez(uv.y, uCtrlD));
  return distance(a, b);
}

vec3 elevationColor(float e) {
  vec3 c = mix(uLow, uMid, smoothstep(0.0, 0.5, e));
  c = mix(c, uHigh, smoothstep(0.5, 1.0, e));
  return c;
}

void main() {
  vec2 res = iResolution.xy;
  vec2 uv = gl_FragCoord.xy / res;

  vec2 suv = (uv - 0.5) / max(uScale, 0.001) + 0.5;

  vec2 sampleUv = suv;
  if (uPixelSize > 1.0) {
    vec2 px = res / uPixelSize;
    sampleUv = (floor(suv * px) + 0.5) / px;
  }

  float fv = field(sampleUv);

  if (uMouseEnabled > 0.5) {
    vec2 d = uv - uMouse;
    d.x *= res.x / max(res.y, 1.0);
    float r = max(uMouseRadius, 0.001);
    float bump = exp(-dot(d, d) / (r * r)) * uMouseStrength * uMouseActive;
    fv += bump;
  }

  float f = fv * uBands;
  float frac = fract(f);
  float lineDist = min(frac, 1.0 - frac);

  float aa = fwidth(f) + 0.0001;
  float mask = 1.0 - smoothstep(uThickness - aa, uThickness + aa, lineDist);

  float glowR = uThickness + uGlow * 0.5 + aa;
  float glow = (1.0 - smoothstep(uThickness, glowR, lineDist)) * step(0.0001, uGlow);

  float elev = clamp(fv / (uMorphAmount * 2.5 + 0.001), 0.0, 1.0);

  vec3 lineCol;
  if (uColorMode < 0.5) {
    lineCol = elevationColor(elev);
  } else if (uColorMode < 1.5) {
    lineCol = uMid;
  } else {
    float parity = mod(floor(f), 2.0);
    lineCol = mix(uMid, uHigh, parity);
  }

  float coverage = clamp(mask + glow * 0.55, 0.0, 1.0);
  coverage = pow(coverage, max(uContrast, 0.001));

  vec3 outColor = lineCol;
  float outAlpha = coverage;

  if (uFillBands > 0.5) {
    vec3 fillCol = elevationColor(elev);
    float fillA = 0.1 * elev;
    outColor = mix(fillCol, lineCol, coverage);
    outAlpha = clamp(coverage + fillA, 0.0, 1.0);
  }

  if (uGrain > 0.5) {
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453);
    outAlpha += (g - 0.5) * uGrainIntensity;
  }

  outColor *= uBrightness;
  outColor = clamp(outColor, 0.0, 1.0);

  float a = clamp(outAlpha, 0.0, 1.0) * uOpacity;
  fragColor = vec4(outColor * a, a);
}
`;

type Uniforme<T> = { value: T };

type Uniformes = {
  iTime: Uniforme<number>;
  iResolution: Uniforme<Float32Array>;
  uSpeed: Uniforme<number>;
  uMorphAmount: Uniforme<number>;
  uMorphSpeed: Uniforme<number>;
  uBands: Uniforme<number>;
  uThickness: Uniforme<number>;
  uScale: Uniforme<number>;
  uPixelSize: Uniforme<number>;
  uGlow: Uniforme<number>;
  uColorMode: Uniforme<number>;
  uContrast: Uniforme<number>;
  uBrightness: Uniforme<number>;
  uFillBands: Uniforme<number>;
  uOpacity: Uniforme<number>;
  uGrain: Uniforme<number>;
  uGrainIntensity: Uniforme<number>;
  uLow: Uniforme<Float32Array>;
  uMid: Uniforme<Float32Array>;
  uHigh: Uniforme<Float32Array>;
  uMouse: Uniforme<Float32Array>;
  uMouseEnabled: Uniforme<number>;
  uMouseRadius: Uniforme<number>;
  uMouseStrength: Uniforme<number>;
  uMouseActive: Uniforme<number>;
  uCtrlA: Uniforme<Float32Array>;
  uCtrlB: Uniforme<Float32Array>;
  uCtrlC: Uniforme<Float32Array>;
  uCtrlD: Uniforme<Float32Array>;
};

/* Gêmeo em JavaScript do `bez()` do fragmento. Se um dos dois mudar, o outro
   muda junto — é o par que garante que o marco pouse na curva que o olho vê. */
const bez = (t: number, c: Float32Array) => {
  const w = 6.2831853 * t;
  return 0.5 * (c[0] * Math.sin(w) + c[1] * Math.cos(w) + c[2] * Math.sin(2 * w) + c[3] * Math.cos(2 * w));
};

const ctxMap = new WeakMap<HTMLElement, { renderer: Renderer; program: Program; mesh: Mesh }>();

/* Os quatro grupos de controle da curva de Bézier que gera o campo. Índices
   escolhidos à mão: são eles que dão a cada grupo um período próprio, e é a
   diferença entre os períodos que faz o terreno nunca repetir o mesmo desenho. */
const CTRL_INDICES = [
  [1, -2, 3, -4],
  [9, -8, 7, -6],
  [5, 2, 5, -5],
  [-1, -3, 8, 9],
];

export type TopographyProps = {
  lowColor?: string;
  midColor?: string;
  highColor?: string;
  speed?: number;
  morphAmount?: number;
  morphSpeed?: number;
  bands?: number;
  thickness?: number;
  scale?: number;
  pixelSize?: number;
  glow?: number;
  colorMode?: ModoCor;
  contrast?: number;
  brightness?: number;
  fillBands?: boolean;
  opacity?: number;
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseRadius?: number;
  mouseStrength?: number;
  className?: string;
  /* Chamado uma vez por quadro desenhado, com o campo daquele instante. */
  aoQuadro?: (amostrar: Amostrador) => void;
};

export default function Topography({
  lowColor = "#5227FF",
  midColor = "#FF9FFC",
  highColor = "#FFFFFF",
  speed = 0.35,
  morphAmount = 3.0,
  morphSpeed = 0.05,
  bands = 2.0,
  thickness = 0.01,
  scale = 1.0,
  pixelSize = 1.0,
  glow = 0.5,
  colorMode = "elevation",
  contrast = 3.0,
  brightness = 1.0,
  fillBands = false,
  opacity = 1.0,
  grain = true,
  grainIntensity = 0.05,
  mouseInteraction = true,
  mouseRadius = 0.3,
  mouseStrength = 0.4,
  className = "",
  aoQuadro,
}: TopographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* O ouvinte vai por ref, e não na lista de dependências do efeito: uma função
     nova a cada render do pai derrubaria e recriaria o contexto WebGL. */
  const aoQuadroRef = useRef(aoQuadro);
  useEffect(() => {
    aoQuadroRef.current = aoQuadro;
  }, [aoQuadro]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: 0.35 },
        uMorphAmount: { value: 3.0 },
        uMorphSpeed: { value: 0.05 },
        uBands: { value: 2.0 },
        uThickness: { value: 0.01 },
        uScale: { value: 1.0 },
        uPixelSize: { value: 1.0 },
        uGlow: { value: 0.5 },
        uColorMode: { value: 0.0 },
        uContrast: { value: 3.0 },
        uBrightness: { value: 1.0 },
        uFillBands: { value: 0.0 },
        uOpacity: { value: 1.0 },
        uGrain: { value: 1.0 },
        uGrainIntensity: { value: 0.05 },
        uLow: { value: new Float32Array([1, 1, 1]) },
        uMid: { value: new Float32Array([1, 1, 1]) },
        uHigh: { value: new Float32Array([1, 1, 1]) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseEnabled: { value: 1.0 },
        uMouseRadius: { value: 0.3 },
        uMouseStrength: { value: 0.4 },
        uMouseActive: { value: 0.0 },
        uCtrlA: { value: new Float32Array([0, 0, 0, 0]) },
        uCtrlB: { value: new Float32Array([0, 0, 0, 0]) },
        uCtrlC: { value: new Float32Array([0, 0, 0, 0]) },
        uCtrlD: { value: new Float32Array([0, 0, 0, 0]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctxMap.set(container, { renderer, program, mesh });

    const u = program.uniforms as Uniformes;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      const res = u.iResolution.value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    const currentMouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];
    let mouseActive = 0;
    let mouseActiveTarget = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse[0] = (e.clientX - rect.left) / rect.width;
      targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseActiveTarget = 1;
    };
    const onMouseLeave = () => {
      mouseActiveTarget = 0;
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const ctrlArrays = [u.uCtrlA.value, u.uCtrlB.value, u.uCtrlC.value, u.uCtrlD.value];

    /* Posiciona o campo no instante `time` e desenha. Separado do laço porque
       com movimento reduzido ele é chamado uma vez e só: o terreno congela num
       quadro do meio da animação, não no quadro zero — em `time = 0` todos os
       controles valem o mesmo e o campo sai simétrico demais para parecer
       terreno. */
    const desenhar = (time: number) => {
      u.iTime.value = time;

      const ma = u.uMorphAmount.value;
      const sp = u.uSpeed.value;
      const msp = u.uMorphSpeed.value;
      for (let g = 0; g < 4; g++) {
        const arr = ctrlArrays[g];
        const idx = CTRL_INDICES[g];
        for (let j = 0; j < 4; j++) {
          const i = idx[j];
          arr[j] = ma * Math.sin(time * sp * Math.sin(i * msp) + i);
        }
      }

      currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
      u.uMouse.value[0] = currentMouse[0];
      u.uMouse.value[1] = currentMouse[1];

      mouseActive += 0.05 * (mouseActiveTarget - mouseActive);
      u.uMouseActive.value = mouseActive;

      renderer.render({ scene: mesh });

      /* O mesmo `field()` do fragmento, em JavaScript, sobre os pontos de
         controle que acabaram de ser escritos. Fica aqui dentro de propósito:
         ler a elevação de um quadro que ainda não foi montado devolveria o
         terreno do quadro anterior, e o marco andaria um quadro atrasado em
         relação à curva em que pousa.

         O `uPixelSize` não entra na conta: ele arredonda a amostragem para dar
         o efeito retrô e está em 1 aqui. Se algum dia sair de 1, isto passa a
         ler entre os degraus. */
      const ouvinte = aoQuadroRef.current;
      if (ouvinte) {
        const escala = Math.max(u.uScale.value, 0.001);
        const faixas = u.uBands.value;
        const [A, B, C, D] = ctrlArrays;
        ouvinte((ux, vy) => {
          const su = (ux - 0.5) / escala + 0.5;
          const sv = (vy - 0.5) / escala + 0.5;
          const ax = bez(su, A);
          const ay = bez(su, B);
          const bx = bez(sv, C);
          const by = bez(sv, D);
          return Math.hypot(ax - bx, ay - by) * faixas;
        });
      }
    };

    /* Movimento reduzido: um quadro e o laço nunca começa. Não é só cortesia de
       acessibilidade — é também o que impede um shader rodando a 60fps em
       máquina que pediu para o sistema parar de animar. */
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (semMovimento.matches) {
      /* Um quadro, no quadro seguinte. O adiamento existe porque este efeito
         roda antes dos efeitos dos irmãos: desenhar aqui e agora entregaria o
         campo a quem ainda não se mediu, e os marcos ficariam sem pouso. */
      const unico = requestAnimationFrame(() => desenhar(18));
      return () => {
        cancelAnimationFrame(unico);
        ro.disconnect();
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
        ctxMap.delete(container);
        try {
          container.removeChild(canvas);
        } catch {}
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (t: number) => {
      desenhar((t - t0) * 0.001);
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    /* Herói fora da tela: laço parado. O fundo não é assunto de quem já rolou
       para as seções de baixo, e GPU acesa atrás de nove telas de texto é conta
       de bateria sem contrapartida. */
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) tryStart();
        else tryStop();
      },
      { threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) tryStart();
      else tryStop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      ctxMap.delete(container);
      try {
        container.removeChild(canvas);
      } catch {}
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  /* Segundo efeito, e não uniformes no primeiro: trocar uma cor ou a densidade
     de curvas não pode custar um contexto WebGL novo. Aqui só se escrevem
     valores nos uniformes já existentes. */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = ctxMap.get(container);
    if (!ctx) return;
    const u = ctx.program.uniforms as Uniformes;

    u.uSpeed.value = speed;
    u.uMorphAmount.value = morphAmount;
    u.uMorphSpeed.value = morphSpeed;
    u.uBands.value = bands;
    u.uThickness.value = thickness;
    u.uScale.value = scale;
    u.uPixelSize.value = pixelSize;
    u.uGlow.value = glow;
    u.uColorMode.value = colorModeToFloat(colorMode);
    u.uContrast.value = contrast;
    u.uBrightness.value = brightness;
    u.uFillBands.value = fillBands ? 1.0 : 0.0;
    u.uOpacity.value = opacity;
    u.uGrain.value = grain ? 1.0 : 0.0;
    u.uGrainIntensity.value = grainIntensity;
    u.uLow.value = new Float32Array(hexToRgb(lowColor));
    u.uMid.value = new Float32Array(hexToRgb(midColor));
    u.uHigh.value = new Float32Array(hexToRgb(highColor));
    u.uMouseEnabled.value = mouseInteraction ? 1.0 : 0.0;
    u.uMouseRadius.value = mouseRadius;
    u.uMouseStrength.value = mouseStrength;
  }, [
    lowColor,
    midColor,
    highColor,
    speed,
    morphAmount,
    morphSpeed,
    bands,
    thickness,
    scale,
    pixelSize,
    glow,
    colorMode,
    contrast,
    brightness,
    fillBands,
    opacity,
    grain,
    grainIntensity,
    mouseInteraction,
    mouseRadius,
    mouseStrength,
  ]);

  return <div ref={containerRef} className={`topography-container ${className}`.trim()} />;
}
