export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const C = {
  bg: '#070B1C',
  bg2: '#0E1533',
  card: 'rgba(255,255,255,0.055)',
  border: 'rgba(255,255,255,0.12)',
  text: '#F4F7FF',
  muted: '#8E9AC0',
  cyan: '#22D3EE',
  blue: '#3B82F6',
  violet: '#8B5CF6',
  green: '#34D399',
  amber: '#FBBF24',
  red: '#F43F5E',
};

export const FONT = "Inter, 'Helvetica Neue', Arial, sans-serif";

export const gradientText = {
  background: `linear-gradient(90deg, ${C.cyan}, ${C.violet})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
} as const;

/** Duración de cada escena (frames) y de la transición entre ellas. */
export const TRANSITION = 15;
export const SCENES = {
  hook: 105,
  logo: 105,
  forecast: 180,
  risk: 180,
  frequency: 150,
  ai: 180,
  cta: 120,
} as const;

const order = Object.values(SCENES);
export const TOTAL_FRAMES =
  order.reduce((a, b) => a + b, 0) - TRANSITION * (order.length - 1);

/** Frame absoluto en el que empieza cada escena (para alinear audio). */
export const SCENE_START = (() => {
  const out: Record<keyof typeof SCENES, number> = {} as never;
  let t = 0;
  (Object.keys(SCENES) as (keyof typeof SCENES)[]).forEach((k) => {
    out[k] = t;
    t += SCENES[k] - TRANSITION;
  });
  return out;
})();
