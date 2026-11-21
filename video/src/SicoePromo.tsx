import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {Background} from './components/Background';
import {SCENES, SCENE_START, TOTAL_FRAMES, TRANSITION} from './theme';
import {Hook} from './scenes/Hook';
import {LogoReveal} from './scenes/LogoReveal';
import {Forecast} from './scenes/Forecast';
import {Risk} from './scenes/Risk';
import {Frequency} from './scenes/Frequency';
import {AiInsights} from './scenes/AiInsights';
import {Cta} from './scenes/Cta';

const t = linearTiming({durationInFrames: TRANSITION});
const a = (name: string) => staticFile(`audio/${name}`);

/** Voz en off: una línea por escena, con un pequeño retraso de entrada. */
const VO: {file: string; at: number}[] = [
  {file: 'vo-1.mp3', at: SCENE_START.hook + 6},
  {file: 'vo-2.mp3', at: SCENE_START.logo + 40},
  {file: 'vo-3.mp3', at: SCENE_START.forecast + 14},
  {file: 'vo-4.mp3', at: SCENE_START.risk + 14},
  {file: 'vo-5.mp3', at: SCENE_START.frequency + 14},
  {file: 'vo-6.mp3', at: SCENE_START.ai + 14},
  {file: 'vo-7.mp3', at: SCENE_START.cta + 14},
];

/** Efectos de sonido sincronizados con los momentos clave de la animación. */
const SFX: {file: string; at: number; volume: number}[] = [
  // "whoosh" en cada transición entre escenas
  ...(['logo', 'forecast', 'risk', 'frequency', 'ai', 'cta'] as const).map((k) => ({
    file: 'sfx-whoosh.mp3', at: SCENE_START[k] - 2, volume: 0.5,
  })),
  {file: 'sfx-riser.mp3', at: SCENE_START.logo + 4, volume: 0.45},
  {file: 'sfx-hit.mp3', at: SCENE_START.logo + 36, volume: 0.8},
  {file: 'sfx-ping.mp3', at: SCENE_START.forecast + 128, volume: 0.5},
  {file: 'sfx-ping.mp3', at: SCENE_START.risk + 78, volume: 0.5},
  {file: 'sfx-type.mp3', at: SCENE_START.ai + 22, volume: 0.35},
  {file: 'sfx-ping.mp3', at: SCENE_START.cta + 56, volume: 0.6},
];

export const SicoePromo: React.FC = () => (
  <AbsoluteFill style={{background: '#070B1C'}}>
    <Background />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENES.hook}><Hook /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={SCENES.logo}><LogoReveal /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={t} />
      <TransitionSeries.Sequence durationInFrames={SCENES.forecast}><Forecast /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={t} />
      <TransitionSeries.Sequence durationInFrames={SCENES.risk}><Risk /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={t} />
      <TransitionSeries.Sequence durationInFrames={SCENES.frequency}><Frequency /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={t} />
      <TransitionSeries.Sequence durationInFrames={SCENES.ai}><AiInsights /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={SCENES.cta}><Cta /></TransitionSeries.Sequence>
    </TransitionSeries>

    {/* Música de fondo con fade in/out */}
    <Audio
      src={a('music.mp3')}
      volume={(f) => interpolate(f, [0, 30, TOTAL_FRAMES - 45, TOTAL_FRAMES], [0, 0.22, 0.22, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      })}
    />
    {VO.map((v) => (
      <Sequence key={v.file} from={v.at}><Audio src={a(v.file)} volume={1} /></Sequence>
    ))}
    {SFX.map((s, i) => (
      <Sequence key={`${s.file}-${i}`} from={Math.max(0, s.at)}><Audio src={a(s.file)} volume={s.volume} /></Sequence>
    ))}
  </AbsoluteFill>
);
