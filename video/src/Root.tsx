import React from 'react';
import {Composition} from 'remotion';
import {SicoePromo} from './SicoePromo';
import {FPS, HEIGHT, TOTAL_FRAMES, WIDTH} from './theme';

export const Root: React.FC = () => (
  <Composition
    id="SicoePromo"
    component={SicoePromo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
