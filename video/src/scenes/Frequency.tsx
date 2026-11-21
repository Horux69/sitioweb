import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT, gradientText} from '../theme';
import {Card, FadeUp, Kicker, Title, useEnter} from '../components/ui';

const customers = [
  {name: 'Cliente A', every: 7, label: 'cada 7 días', color: C.cyan},
  {name: 'Cliente B', every: 12, label: 'cada 12 días', color: C.blue},
  {name: 'Cliente C', every: 18, label: 'cada 18 días', color: C.violet},
  {name: 'Cliente D', every: 25, label: 'cada 25 días', color: C.amber},
];
const DAYS = 100;
const TW = 1000;

const Row: React.FC<{c: (typeof customers)[number]; i: number}> = ({c, i}) => {
  const f = useCurrentFrame();
  const p = useEnter(14 + i * 8);
  const dots: number[] = [];
  for (let d = c.every; d < DAYS * 0.78; d += c.every) dots.push(d);
  const nextDay = dots[dots.length - 1] + c.every;
  const pulse = 1 + 0.2 * Math.sin(f / 5);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 24, opacity: p, transform: `translateY(${(1 - p) * 40}px)`}}>
      <div style={{width: 150, fontSize: 28, fontWeight: 700, color: C.text}}>{c.name}</div>
      <div style={{position: 'relative', width: TW, height: 70}}>
        <div style={{position: 'absolute', top: 34, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)'}} />
        {dots.map((d, k) => {
          const t = 30 + i * 6 + k * 4;
          const s = Math.min(1, Math.max(0, (f - t) / 8));
          return (
            <div key={d} style={{
              position: 'absolute', left: (d / DAYS) * TW - 14, top: 21, width: 28, height: 28, borderRadius: '50%',
              background: c.color, transform: `scale(${s})`, boxShadow: `0 0 18px ${c.color}`,
            }} />
          );
        })}
        {f > 78 + i * 4 && (
          <div style={{
            position: 'absolute', left: (nextDay / DAYS) * TW - 18, top: 17, width: 36, height: 36, borderRadius: '50%',
            border: `4px dashed ${C.green}`, transform: `scale(${pulse})`, opacity: Math.min(1, (f - 78 - i * 4) / 8),
          }} />
        )}
      </div>
      <div style={{width: 170, fontSize: 26, fontWeight: 700, color: c.color}}>{c.label}</div>
    </div>
  );
};

export const Frequency: React.FC = () => (
  <AbsoluteFill style={{justifyContent: 'center', padding: '0 110px', gap: 44, fontFamily: FONT}}>
    <div>
      <Kicker color={C.amber}>Frecuencia de compra</Kicker>
      <div style={{height: 18}} />
      <Title>Conoce el <span style={gradientText}>ritmo</span> de cada cliente</Title>
    </div>
    <Card style={{padding: '40px 50px', display: 'flex', flexDirection: 'column', gap: 26, alignSelf: 'flex-start'}}>
      {customers.map((c, i) => <Row key={c.name} c={c} i={i} />)}
      <FadeUp delay={92} style={{color: C.muted, fontSize: 24, display: 'flex', gap: 14, alignItems: 'center'}}>
        <span style={{display: 'inline-block', width: 22, height: 22, borderRadius: '50%', border: `3px dashed ${C.green}`}} />
        Próxima compra esperada, calculada por IA
      </FadeUp>
    </Card>
  </AbsoluteFill>
);
