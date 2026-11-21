import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Card, FadeUp, Kicker, Title, useEnter} from '../components/ui';

const question = '¿Qué debo hacer este mes para crecer?';
const answers = [
  'Contacta a los 12 clientes de alto valor con riesgo de fuga.',
  'Refuerza el inventario de la línea A: la demanda subirá 22%.',
  'Ofrece una promoción a clientes con frecuencia en descenso.',
];

const typed = (text: string, f: number, start: number, cps = 1.6) =>
  text.slice(0, Math.max(0, Math.floor((f - start) * cps)));

export const AiInsights: React.FC = () => {
  const f = useCurrentFrame();
  const panel = useEnter(8);
  const spark = 1 + 0.12 * Math.sin(f / 6);
  const starts = [64, 96, 128];
  return (
    <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 110px', gap: 70, fontFamily: FONT}}>
      <div style={{width: 600}}>
        <Kicker color={C.violet}>Análisis con IA</Kicker>
        <div style={{height: 20}} />
        <Title>Decisiones claras, <span style={{color: C.violet}}>al instante</span></Title>
        <FadeUp delay={34} style={{marginTop: 40, display: 'flex', gap: 18}}>
          {['Ventas', 'Clientes', 'Inventario'].map((t) => (
            <div key={t} style={{padding: '12px 26px', borderRadius: 999, border: `1px solid ${C.border}`, color: C.muted, fontSize: 26, fontWeight: 600}}>{t}</div>
          ))}
        </FadeUp>
      </div>
      <Card style={{flex: 1, padding: 44, opacity: panel, transform: `translateY(${(1 - panel) * 50}px)`, minHeight: 640}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 30}}>
          <div style={{width: 64, height: 64, borderRadius: 20, display: 'grid', placeItems: 'center', fontSize: 34,
            background: `linear-gradient(135deg, ${C.cyan}, ${C.violet})`, transform: `scale(${spark})`,
            boxShadow: `0 0 ${30 * spark}px ${C.violet}`}}>✦</div>
          <div style={{fontSize: 32, fontWeight: 700, color: C.text}}>Asistente SICOE IA</div>
        </div>
        <div style={{alignSelf: 'flex-end', marginLeft: 120, background: 'rgba(59,130,246,0.25)', border: `1px solid ${C.blue}66`,
          borderRadius: 24, padding: '20px 28px', fontSize: 31, color: C.text, minHeight: 40,
          opacity: interpolate(f, [18, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          {typed(question, f, 22, 1.4)}
        </div>
        <div style={{marginTop: 28, display: 'flex', flexDirection: 'column', gap: 20}}>
          {answers.map((a, i) => {
            const shown = f > starts[i] - 6;
            const done = typed(a, f, starts[i]).length === a.length;
            return (
              <div key={i} style={{display: 'flex', gap: 20, alignItems: 'flex-start', opacity: shown ? 1 : 0}}>
                <div style={{flex: '0 0 44px', height: 44, borderRadius: 14, display: 'grid', placeItems: 'center',
                  background: done ? C.green : 'rgba(255,255,255,0.12)', color: '#06210F', fontSize: 28, fontWeight: 900}}>
                  {done ? '✓' : ''}
                </div>
                <div style={{fontSize: 31, lineHeight: 1.35, color: C.text, minHeight: 84}}>
                  {typed(a, f, starts[i], 2.2)}
                  {!done && shown && <span style={{color: C.cyan}}>▍</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </AbsoluteFill>
  );
};
