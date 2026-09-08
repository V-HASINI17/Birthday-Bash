import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface ConfettiProps {
  count?: number;
  className?: string;
  colors?: string[];
  duration?: number;
}

const defaultColors = ['#f8b8cd', '#e8617e', '#ecd69b', '#5d3a7a', '#fde8ee', '#f28bab'];

export default function Confetti({
  count = 40,
  className = '',
  colors = defaultColors,
  duration = 3,
}: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
        size: 6 + Math.random() * 8,
        color: colors[i % colors.length],
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        drift: (Math.random() - 0.5) * 100,
      })),
    [count, colors]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}%`, y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: '110vh',
            x: `calc(${p.x}% + ${p.drift}px)`,
            rotate: p.rotation,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: duration + Math.random(), delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.shape === 'rect' ? p.size * 0.6 : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}
