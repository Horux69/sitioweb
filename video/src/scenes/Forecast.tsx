import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, gradientText} from '../theme';
import {Card, CountUp, FadeUp, Kicker, Title, useEnter} from '../components/ui';

const hist = [38, 42, 40, 47, 52, 50, 58, 63, 61, 69, 74, 72];
const fc = [72, 80, 86, 93, 99, 106];
const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

const W = 1000, H = 520, PAD = 20, MAXV = 120;
const x = (i: number) => PAD + (i * (W - PAD * 2)) / 17;
const y = (v: number) => H - PAD - (v / MAXV) * (H - PAD * 2);
const line = (arr: number[], off: number) => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i + off)} ${y(v)}`).join(' ');

export const Forecast: React.FC = () => {
  const f = useCurrentFrame();
  const cardIn = useEnter(10);
  const drawHist = interpolate(f, [24, 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const drawFc = interpolate(f, [84, 130], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const band = interpolate(f, [100, 135], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const tip = useEnter(128, 12);
  const pulse = 1 + 0.25 * Math.sin(f / 5);

  const upper = fc.map((v, i) => `${i ? 'L' : 'M'}${x(i + 11)} ${y(v + (i * 2.2 + 1))}`).join(' ');
  const bandPath = `${upper} ${fc.map((_, i) => i).reverse().map((i) => `L${x(i + 11)} ${y(fc[i] - (i * 2.2 + 1))}`).join(' ')} Z`;

  return (
    <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 110px', gap: 70, fontFamily: FONT}}>
      <div style={{width: 640}}>
        <Kicker>Pronóstico de ventas</Kicker>
        <div style={{height: 20}} />
        <Title>Mira los próximos <span style={gradientText}>meses</span> hoy</Title>
        <FadeUp delay={30} style={{marginTop: 50}}>
          <Card style={{padding: '34px 44px', display: 'inline-block'}}>
            <div style={{fontSize: 24, color: C.muted, fontWeight: 600}}>Crecimiento proyectado · 6 meses</div>
            <div style={{fontSize: 110, fontWeight: 800, color: C.green, letterSpacing: -3}}>
              +<CountUp to={47.2} start={34} dur={60} decimals={1} suffix="%" />
            </div>
            <div style={{fontSize: 24, color: C.text, fontWeight: 600, marginTop: 4}}>Precisión del modelo: 94%</div>
          </Card>
        </FadeUp>
      </div>

      <Card style={{padding: 36, opacity: cardIn, transform: `translateY(${(1 - cardIn) * 50}px)`, flex: 1}}>
        <div style={{display: 'flex', justifyContent: 'space-between', color: C.muted, fontSize: 24, fontWeight: 600, marginBottom: 14}}>
          <span>Ventas mensuales (millones COP)</span>
          <span style={{display: 'flex', gap: 24}}>
            <span><span style={{color: C.cyan}}>●</span> Real</span>
            <span><span style={{color: C.violet}}>●</span> Pronóstico IA</span>
          </span>
        </div>
        <div style={{position: 'relative'}}>
          <svg viewBox={`0 0 ${W} ${H + 40}`} width="100%">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={C.cyan} stopOpacity="0.35" />
                <stop offset="1" stopColor={C.cyan} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 30, 60, 90, 120].map((g) => (
              <line key={g} x1={PAD} x2={W - PAD} y1={y(g)} y2={y(g)} stroke="rgba(255,255,255,0.08)" />
            ))}
            {months.map((m, i) => (i % 2 === 0 ? (
              <text key={i} x={x(i)} y={H + 28} fill={i > 11 ? C.violet : C.muted} fontSize="20" textAnchor="middle">{m}</text>
            ) : null))}
            <path d={`${line(hist, 0)} L${x(11)} ${y(0)} L${x(0)} ${y(0)} Z`} fill="url(#area)" opacity={drawHist} />
            <path d={line(hist, 0)} fill="none" stroke={C.cyan} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
              pathLength={1} strokeDasharray={1} strokeDashoffset={1 - drawHist} />
            <path d={bandPath} fill={C.violet} opacity={0.22 * band} />
            <path d={line(fc, 11)} fill="none" stroke={C.violet} strokeWidth="6" strokeLinecap="round" strokeDasharray="1 14"
              style={{strokeDasharray: `${drawFc * 2000} 2000`}} pathLength={2000} />
            <circle cx={x(17)} cy={y(106)} r={14 * pulse} fill={C.violet} opacity={drawFc > 0.98 ? 0.35 : 0} />
            <circle cx={x(17)} cy={y(106)} r="9" fill="#fff" opacity={drawFc > 0.98 ? 1 : 0} />
          </svg>
          <div style={{
            position: 'absolute', right: 30, top: 6, opacity: tip, transform: `scale(${0.8 + tip * 0.2})`,
            background: 'rgba(139,92,246,0.9)', borderRadius: 18, padding: '14px 24px', fontSize: 26, fontWeight: 700,
            boxShadow: '0 10px 40px rgba(139,92,246,0.5)',
          }}>
            Jun: $106 M
          </div>
        </div>
      </Card>
    </AbsoluteFill>
  );
};
