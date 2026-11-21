import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, gradientText} from '../theme';
import {FadeUp, LogoMark, useEnter} from '../components/ui';

export const Cta: React.FC = () => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [4, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const btn = useEnter(56, 11);
  const glow = 0.6 + 0.4 * Math.sin(f / 6);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontFamily: FONT, gap: 20}}>
      <LogoMark size={170} progress={draw} />
      <FadeUp delay={14}>
        <div style={{fontSize: 140, fontWeight: 900, letterSpacing: -5, color: C.text, textAlign: 'center', lineHeight: 1.05}}>
          Decide con <span style={gradientText}>datos</span>
        </div>
      </FadeUp>
      <FadeUp delay={30} dy={20}>
        <div style={{fontSize: 44, color: C.muted, letterSpacing: 2}}>SICOE INTELLIGENCE</div>
      </FadeUp>
      <div style={{
        marginTop: 36, padding: '26px 70px', borderRadius: 999, fontSize: 44, fontWeight: 800, color: '#fff',
        background: `linear-gradient(90deg, ${C.cyan}, ${C.violet})`, transform: `scale(${0.7 + btn * 0.3})`, opacity: btn,
        boxShadow: `0 0 ${70 * glow}px ${C.violet}99`,
      }}>
        Solicita tu demo
      </div>
    </AbsoluteFill>
  );
};
