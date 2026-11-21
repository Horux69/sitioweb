import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, gradientText} from '../theme';
import {FadeUp, LogoMark, useEnter} from '../components/ui';

const Burst: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame() - at;
  if (f < 0) return null;
  const n = 18;
  return (
    <>
      {Array.from({length: n}).map((_, i) => {
        const a = (i / n) * Math.PI * 2;
        const d = interpolate(f, [0, 40], [30, 330 + (i % 3) * 60], {extrapolateRight: 'clamp'});
        const o = interpolate(f, [0, 8, 40], [0, 1, 0], {extrapolateRight: 'clamp'});
        return (
          <div key={i} style={{
            position: 'absolute', left: '50%', top: '50%', width: 12, height: 12, borderRadius: '50%',
            background: i % 2 ? C.cyan : C.violet, opacity: o,
            transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px) translate(-50%,-50%)`,
            boxShadow: `0 0 20px ${i % 2 ? C.cyan : C.violet}`,
          }} />
        );
      })}
    </>
  );
};

export const LogoReveal: React.FC = () => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [6, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pop = useEnter(4, 12);
  const spacing = interpolate(f, [30, 75], [40, 14], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const letters = 'SICOE'.split('');
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontFamily: FONT}}>
      <Burst at={36} />
      <div style={{display: 'flex', alignItems: 'center', gap: 56}}>
        <div style={{transform: `scale(${0.6 + pop * 0.4})`, filter: `drop-shadow(0 0 40px ${C.violet}88)`}}>
          <LogoMark size={300} progress={draw} />
        </div>
        <div>
          <div style={{display: 'flex', fontSize: 190, fontWeight: 900, letterSpacing: -6, lineHeight: 1}}>
            {letters.map((l, i) => {
              const p = useEnter(26 + i * 4, 13);
              return (
                <span key={i} style={{
                  display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 70}px)`, color: C.text,
                }}>{l}</span>
              );
            })}
          </div>
          <FadeUp delay={44} dy={20}>
            <div style={{fontSize: 70, fontWeight: 700, letterSpacing: spacing, marginTop: 8, ...gradientText}}>
              INTELLIGENCE
            </div>
          </FadeUp>
        </div>
      </div>
      <FadeUp delay={62} style={{position: 'absolute', bottom: 190}}>
        <div style={{fontSize: 38, color: C.muted, letterSpacing: 3}}>
          Pronostica&nbsp;&nbsp;·&nbsp;&nbsp;Anticipa&nbsp;&nbsp;·&nbsp;&nbsp;Decide
        </div>
      </FadeUp>
    </AbsoluteFill>
  );
};
