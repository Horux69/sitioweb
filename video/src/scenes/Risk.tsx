import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Card, CountUp, FadeUp, Kicker, Title, useEnter} from '../components/ui';

const rows = [
  {name: 'Distribuidora Andina', note: 'Sin compras hace 52 días', score: 92},
  {name: 'Ferretería El Maestro', note: 'Frecuencia cayó 61%', score: 84},
  {name: 'Comercial Pacífico', note: 'Pedidos 40% menores', score: 73},
  {name: 'Supermercado La 14', note: 'Sin compras hace 31 días', score: 58},
  {name: 'Droguería Central', note: 'Ticket promedio en baja', score: 41},
];
const colorFor = (s: number) => (s >= 70 ? C.red : s >= 50 ? C.amber : C.green);

const Row: React.FC<{r: (typeof rows)[number]; i: number}> = ({r, i}) => {
  const f = useCurrentFrame();
  const d = 22 + i * 12;
  const p = useEnter(d, 15);
  const fill = interpolate(f, [d + 8, d + 50], [0, r.score], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const col = colorFor(fill);
  const alert = r.score >= 70 && f > d + 55;
  const glow = alert ? 0.5 + 0.5 * Math.sin(f / 4) : 0;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 28, padding: '22px 30px', borderRadius: 24,
      background: 'rgba(255,255,255,0.045)', opacity: p, transform: `translateX(${(1 - p) * 120}px)`,
      border: `1px solid ${alert ? C.red + '99' : C.border}`, boxShadow: alert ? `0 0 ${30 * glow}px ${C.red}66` : 'none',
    }}>
      <div style={{width: 64, height: 64, borderRadius: 18, background: col + '33', color: col, display: 'grid',
        placeItems: 'center', fontSize: 30, fontWeight: 800}}>{r.name[0]}</div>
      <div style={{width: 430}}>
        <div style={{fontSize: 32, fontWeight: 700, color: C.text}}>{r.name}</div>
        <div style={{fontSize: 23, color: C.muted, marginTop: 4}}>{r.note}</div>
      </div>
      <div style={{flex: 1, height: 16, borderRadius: 8, background: 'rgba(255,255,255,0.1)'}}>
        <div style={{width: `${fill}%`, height: '100%', borderRadius: 8, background: col}} />
      </div>
      <div style={{width: 90, textAlign: 'right', fontSize: 40, fontWeight: 800, color: col}}>{Math.round(fill)}</div>
    </div>
  );
};

export const Risk: React.FC = () => (
  <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 110px', gap: 70, fontFamily: FONT}}>
    <div style={{width: 600}}>
      <Kicker color={C.red}>Clientes en riesgo</Kicker>
      <div style={{height: 20}} />
      <Title>Detecta la fuga <span style={{color: C.red}}>antes</span> de que ocurra</Title>
      <FadeUp delay={30} style={{marginTop: 50}}>
        <Card style={{padding: '30px 44px', display: 'inline-block'}}>
          <div style={{fontSize: 24, color: C.muted, fontWeight: 600}}>Clientes con riesgo alto</div>
          <div style={{fontSize: 110, fontWeight: 800, color: C.red, letterSpacing: -3}}>
            <CountUp to={37} start={32} dur={50} />
          </div>
          <div style={{fontSize: 24, color: C.text, fontWeight: 600}}>$ 214 M en ventas recurrentes</div>
        </Card>
      </FadeUp>
    </div>
    <Card style={{flex: 1, padding: 34, display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={{display: 'flex', justifyContent: 'space-between', color: C.muted, fontSize: 24, fontWeight: 600, padding: '0 8px 6px'}}>
        <span>Cliente</span><span>Índice de riesgo</span>
      </div>
      {rows.map((r, i) => <Row key={r.name} r={r} i={i} />)}
    </Card>
  </AbsoluteFill>
);
