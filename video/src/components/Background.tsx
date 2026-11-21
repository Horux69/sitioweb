import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {C} from '../theme';

const Orb: React.FC<{x: number; y: number; size: number; color: string; phase: number}> = ({
  x, y, size, color, phase,
}) => {
  const f = useCurrentFrame();
  const dx = Math.sin(f / 70 + phase) * 60;
  const dy = Math.cos(f / 90 + phase) * 50;
  return (
    <div
      style={{
        position: 'absolute', left: x + dx, top: y + dy, width: size, height: size,
        borderRadius: '50%', filter: 'blur(120px)', opacity: 0.35,
        background: color,
      }}
    />
  );
};

export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const shift = interpolate(f, [0, 900], [0, 80], {extrapolateRight: 'extend'});
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 30%, ${C.bg2}, ${C.bg})`}}>
      <Orb x={-200} y={-150} size={700} color={C.blue} phase={0} />
      <Orb x={1250} y={500} size={750} color={C.violet} phase={2} />
      <Orb x={700} y={750} size={500} color={C.cyan} phase={4} />
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          backgroundPosition: `${shift}px ${shift}px`,
          maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 75%)',
        }}
      />
    </AbsoluteFill>
  );
};
