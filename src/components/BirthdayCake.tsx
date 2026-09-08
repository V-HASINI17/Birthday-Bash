import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface BirthdayCakeProps {
  onBlowOut?: () => void;
  className?: string;
}

export default function BirthdayCake({ onBlowOut, className = '' }: BirthdayCakeProps) {
  const [flameState, setFlameState] = useState<'lit' | 'flicker' | 'out'>('lit');
  const [smoke, setSmoke] = useState(false);
  const [cakeDown, setCakeDown] = useState(false);

  const handleBlowOut = () => {
    if (flameState !== 'lit') return;

    setFlameState('flicker');
    setTimeout(() => setFlameState('flicker'), 200);
    setTimeout(() => setFlameState('lit'), 400);
    setTimeout(() => setFlameState('flicker'), 600);
    setTimeout(() => {
      setFlameState('out');
      setSmoke(true);
      setTimeout(() => {
        setCakeDown(true);
        onBlowOut?.();
      }, 800);
    }, 1000);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        animate={cakeDown ? { y: 20, opacity: [1, 1, 0.85] } : {}}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="relative"
      >
        <svg viewBox="0 0 200 220" className="w-56 sm:w-64" fill="none" stroke="#2a1d15" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          {/* Plate */}
          <ellipse cx="100" cy="200" rx="80" ry="12" fill="#fde8ee" />
          <ellipse cx="100" cy="198" rx="80" ry="10" />

          {/* Bottom tier */}
          <path d="M35 195 L35 150 Q35 145 40 145 L160 145 Q165 145 165 150 L165 195 Z" fill="#f8b8cd" />
          <path d="M35 150 Q50 155 65 150 Q80 145 95 150 Q110 155 125 150 Q140 145 155 150 L165 150" fill="none" strokeWidth={2} />

          {/* Middle tier */}
          <path d="M50 145 L50 105 Q50 100 55 100 L145 100 Q150 100 150 105 L150 145 Z" fill="#fbd5e0" />
          <path d="M50 105 Q65 110 80 105 Q95 100 110 105 Q125 110 140 105 L150 105" fill="none" strokeWidth={2} />

          {/* Top tier */}
          <path d="M65 100 L65 65 Q65 60 70 60 L130 60 Q135 60 135 65 L135 100 Z" fill="#fde8ee" />
          <path d="M65 65 Q80 70 95 65 Q110 60 125 65 L135 65" fill="none" strokeWidth={2} />

          {/* Decorative dots */}
          <circle cx="55" cy="125" r="3" fill="#e8617e" stroke="none" />
          <circle cx="75" cy="125" r="3" fill="#ecd69b" stroke="none" />
          <circle cx="95" cy="125" r="3" fill="#e8617e" stroke="none" />
          <circle cx="115" cy="125" r="3" fill="#ecd69b" stroke="none" />
          <circle cx="135" cy="125" r="3" fill="#e8617e" stroke="none" />

          <circle cx="80" cy="82" r="2.5" fill="#e8617e" stroke="none" />
          <circle cx="100" cy="82" r="2.5" fill="#ecd69b" stroke="none" />
          <circle cx="120" cy="82" r="2.5" fill="#e8617e" stroke="none" />

          {/* Candle */}
          <rect x="96" y="35" width="8" height="25" fill="#e8617e" rx="1" />
          <line x1="96" y1="42" x2="104" y2="42" stroke="#d63e63" strokeWidth="1.5" />
          <line x1="96" y1="50" x2="104" y2="50" stroke="#d63e63" strokeWidth="1.5" />

          {/* Wick */}
          <line x1="100" y1="35" x2="100" y2="30" strokeWidth={2} />

          {/* Flame */}
          <AnimatePresence>
            {flameState !== 'out' && (
              <motion.g
                key="flame"
                exit={{ opacity: 0, scale: 0 }}
                animate={
                  flameState === 'flicker'
                    ? { scaleX: [1, 0.7, 1.2, 0.8, 1], scaleY: [1, 1.2, 0.8, 1.1, 1] }
                    : { scaleX: [1, 0.95, 1.05, 1], scaleY: [1, 1.05, 0.95, 1] }
                }
                transition={{
                  duration: flameState === 'flicker' ? 0.15 : 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: '100px 30px' }}
              >
                <path
                  d="M100 30 Q92 22 95 14 Q100 6 100 4 Q100 6 105 14 Q108 22 100 30 Z"
                  fill="#ffd97a"
                  stroke="#e8617e"
                  strokeWidth={1.5}
                />
                <path
                  d="M100 27 Q97 22 98 17 Q100 12 100 10 Q100 12 102 17 Q103 22 100 27 Z"
                  fill="#ff6b35"
                  stroke="none"
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Smoke */}
          {smoke && (
            <motion.g
              initial={{ opacity: 0.6, y: 0 }}
              animate={{ opacity: [0.6, 0.3, 0], y: -40 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <circle cx="100" cy="28" r="5" fill="#ccc" opacity="0.5" stroke="none" />
              <motion.circle
                cx="98"
                cy="20"
                r="4"
                fill="#ccc"
                opacity="0.4"
                stroke="none"
                animate={{ x: -3 }}
                transition={{ duration: 1.5 }}
              />
              <motion.circle
                cx="102"
                cy="14"
                r="3"
                fill="#ccc"
                opacity="0.3"
                stroke="none"
                animate={{ x: 3 }}
                transition={{ duration: 1.5 }}
              />
            </motion.g>
          )}
        </svg>

        {/* Invisible tap target over candle area */}
        {flameState === 'lit' && (
          <motion.button
            onClick={handleBlowOut}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute"
            style={{ top: '0%', left: '38%', width: '24%', height: '28%' }}
            aria-label="Blow out the candle"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full rounded-full"
            />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
