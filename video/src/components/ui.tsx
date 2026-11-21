import React from 'react';
import {spring, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {C, FONT} from '../theme';

/** Entrada con resorte: devuelve 0→1. */
export const useEnter = (delay = 0, damping = 16) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping, stiffness: 110, mass: 0.8}});
};

export const FadeUp: React.FC<{delay?: number; children: React.ReactNode; style?: React.CSSProperties; dy?: number}> = ({
  delay = 0, children, style, dy = 40,
}) => {
  const p = useEnter(delay);
  return (
    <div style={{opacity: p, transform: `translateY(${(1 - p) * dy}px)`, ...style}}>{children}</div>
  );
};

export const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 32,
      backdropFilter: 'blur(14px)', boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
      fontFamily: FONT, ...style,
    }}
  >
    {children}
  </div>
);

export const Kicker: React.FC<{children: React.ReactNode; color?: string; delay?: number}> = ({
  children, color = C.cyan, delay = 0,
}) => (
  <FadeUp delay={delay}>
    <div style={{fontFamily: FONT, fontSize: 28, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase', color}}>
      {children}
    </div>
  </FadeUp>
);

export const Title: React.FC<{children: React.ReactNode; delay?: number}> = ({children, delay = 6}) => (
  <FadeUp delay={delay}>
    <div style={{fontFamily: FONT, fontSize: 84, fontWeight: 800, lineHeight: 1.05, color: C.text, letterSpacing: -2}}>
      {children}
    </div>
  </FadeUp>
);

export const CountUp: React.FC<{
  to: number; from?: number; start?: number; dur?: number; decimals?: number; prefix?: string; suffix?: string;
}> = ({to, from = 0, start = 0, dur = 45, decimals = 0, prefix = '', suffix = ''}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const eased = 1 - Math.pow(1 - t, 3);
  const v = from + (to - from) * eased;
  return <>{prefix}{v.toFixed(decimals).replace('.', ',')}{suffix}</>;
};

/** Icono de marca: barras ascendentes + línea de pronóstico. */
export const LogoMark: React.FC<{size?: number; progress?: number}> = ({size = 220, progress = 1}) => {
  const bars = [0.35, 0.55, 0.75, 1];
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.cyan} />
          <stop offset="1" stopColor={C.violet} />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="112" height="112" rx="30" fill="rgba(255,255,255,0.06)" stroke="url(#lg)" strokeWidth="3" />
      {bars.map((h, i) => {
        const p = Math.min(1, Math.max(0, progress * 1.6 - i * 0.2));
        const bh = 62 * h * p;
        return <rect key={i} x={24 + i * 20} y={90 - bh} width="13" height={bh} rx="4" fill="url(#lg)" />;
      })}
      <path d="M22 62 L48 48 L68 56 L98 24" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round"
        strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress} />
      <circle cx="98" cy="24" r="6" fill="#fff" opacity={progress > 0.95 ? 1 : 0} />
    </svg>
  );
};
