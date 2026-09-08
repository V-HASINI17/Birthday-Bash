import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface HeartAnimationProps {
  count?: number;
  className?: string;
  duration?: number;
}

export default function HeartAnimation({
  count = 15,
  className = '',
  duration = 4,
}: HeartAnimationProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        size: 16 + Math.random() * 24,
        drift: (Math.random() - 0.5) * 60,
        duration: duration + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.4,
      })),
    [count, duration]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ x: `${h.x}%`, y: '100%', opacity: 0 }}
          animate={{ y: '-20%', opacity: [0, h.opacity, 0], x: `calc(${h.x}% + ${h.drift}px)` }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'easeOut' }}
          style={{ position: 'absolute' }}
        >
          <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill="#e8617e">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
