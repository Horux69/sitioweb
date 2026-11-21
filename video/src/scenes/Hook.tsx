import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, gradientText} from '../theme';
import {useEnter} from '../components/ui';

const Word: React.FC<{text: string; delay: number; grad?: boolean}> = ({text, delay, grad}) => {
  const p = useEnter(delay, 14);
  return (
    <span
      style={{
        display: 'inline-block', marginRight: 28, opacity: p,
        transform: `translateY(${(1 - p) * 60}px) scale(${0.9 + p * 0.1})`,
        filter: `blur(${(1 - p) * 14}px)`,
        ...(grad ? gradientText : {color: C.text}),
      }}
    >
      {text}
    </span>
  );
};

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const line = interpolate(f, [55, 90], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const l1 = ['¿Y', 'si', 'pudieras', 'ver'];
  const l3 = ['de', 'tu', 'negocio?'];
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontFamily: FONT}}>
      <div style={{fontSize: 118, fontWeight: 800, letterSpacing: -4, textAlign: 'center', lineHeight: 1.12}}>
        <div>{l1.map((w, i) => <Word key={w + i} text={w} delay={8 + i * 5} />)}</div>
        <div><Word text="el futuro" delay={30} grad /></div>
        <div>{l3.map((w, i) => <Word key={w + i} text={w} delay={38 + i * 5} />)}</div>
      </div>
      <div
        style={{
          marginTop: 50, height: 6, width: 560 * line, borderRadius: 3,
          background: `linear-gradient(90deg, ${C.cyan}, ${C.violet})`, boxShadow: `0 0 40px ${C.cyan}`,
        }}
      />
    </AbsoluteFill>
  );
};
