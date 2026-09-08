import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HugCharactersProps {
  className?: string;
  onHugComplete?: () => void;
}

export default function HugCharacters({ className = '', onHugComplete }: HugCharactersProps) {
  const [hugged, setHugged] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHugged(true), 600);
    const t2 = setTimeout(() => onHugComplete?.(), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onHugComplete]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Hearts floating around the hug */}
      {hugged && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 0.8, 0.4],
                x: (i - 3.5) * 28,
                y: -30 - Math.random() * 45,
              }}
              transition={{ duration: 2.5, delay: 0.5 + i * 0.2, ease: 'easeOut' }}
              className="absolute"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8617e">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          ))}
        </>
      )}

      {/* Spring entrance for the whole hug */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12 }}
      >
        {/* Gentle squeeze/bounce while hugging */}
        <motion.div
          animate={hugged ? { scaleX: [1, 0.96, 1.01, 0.99, 1], scaleY: [1, 1.02, 0.99, 1.01, 1] } : {}}
          transition={{ duration: 2.5, repeat: 1, ease: 'easeInOut', delay: 0.4 }}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          <TightHugSVG />
        </motion.div>
      </motion.div>
    </div>
  );
}

function TightHugSVG() {
  return (
    <svg
      viewBox="0 0 200 170"
      width="220"
      height="187"
      fill="none"
      stroke="#2a1d15"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ── Layer 1: Wrapping arms (behind both bodies) ── */}

      {/* Left char's right arm — wraps around right char's back */}
      <path
        d="M88 50 Q120 40 148 52 Q158 58 155 70 Q152 77 145 75 Q125 67 105 67 Q92 63 88 56 Z"
        fill="#fde8ee"
      />

      {/* Right char's left arm — wraps around left char's back */}
      <path
        d="M112 50 Q80 40 52 52 Q42 58 45 70 Q48 77 55 75 Q75 67 95 67 Q108 63 112 56 Z"
        fill="#fde8ee"
      />

      {/* ── Layer 2: Bodies (overlapping in center) ── */}

      {/* Left body */}
      <path
        d="M50 48 Q43 58 43 78 L43 115 Q43 122 50 122 L96 122 Q103 122 103 115 L103 78 Q103 58 96 48 Z"
        fill="#f8b8cd"
      />

      {/* Right body — drawn on top, overlapping left body */}
      <path
        d="M97 48 Q90 58 90 78 L90 115 Q90 122 97 122 L143 122 Q150 122 150 115 L150 78 Q150 58 143 48 Z"
        fill="#fbd5e0"
      />

      {/* ── Layer 3: Legs ── */}
      <path d="M58 122 L58 137 L53 137" fill="none" />
      <path d="M88 122 L88 137 L93 137" fill="none" />
      <path d="M105 122 L105 137 L100 137" fill="none" />
      <path d="M135 122 L135 137 L140 137" fill="none" />

      {/* ── Layer 4: Heads (tilted toward each other, touching at center) ── */}

      {/* Left head — tilted right, resting against right head */}
      <g transform="rotate(12 82 30)">
        <circle cx="82" cy="30" r="18" fill="#fde8ee" />
        {/* Hair */}
        <path d="M66 18 Q71 8 78 12 Q82 6 88 16" fill="#2a1d15" stroke="none" />
        {/* Closed happy eyes */}
        <path d="M74 28 Q76 25 78 28" fill="none" strokeWidth={2} />
        <path d="M86 28 Q88 25 90 28" fill="none" strokeWidth={2} />
        {/* Blush */}
        <circle cx="72" cy="36" r="3" fill="#f8b8cd" stroke="none" opacity="0.6" />
        <circle cx="92" cy="36" r="3" fill="#f8b8cd" stroke="none" opacity="0.6" />
        {/* Smile */}
        <path d="M77 40 Q82 44 87 40" fill="none" strokeWidth={2} />
      </g>

      {/* Right head — tilted left, resting against left head */}
      <g transform="rotate(-12 118 30)">
        <circle cx="118" cy="30" r="18" fill="#fde8ee" />
        {/* Hair */}
        <path d="M112 12 Q118 6 124 14 Q130 8 134 18" fill="#2a1d15" stroke="none" />
        {/* Closed happy eyes */}
        <path d="M110 28 Q112 25 114 28" fill="none" strokeWidth={2} />
        <path d="M122 28 Q124 25 126 28" fill="none" strokeWidth={2} />
        {/* Blush */}
        <circle cx="108" cy="36" r="3" fill="#f8b8cd" stroke="none" opacity="0.6" />
        <circle cx="128" cy="36" r="3" fill="#f8b8cd" stroke="none" opacity="0.6" />
        {/* Smile */}
        <path d="M113 40 Q118 44 123 40" fill="none" strokeWidth={2} />
      </g>

      {/* ── Layer 5: Hands on backs (visible on top of bodies) ── */}

      {/* Left char's hand gripping right char's back */}
      <ellipse cx="150" cy="72" rx="7" ry="8" fill="#fde8ee" />

      {/* Right char's hand gripping left char's back */}
      <ellipse cx="50" cy="72" rx="7" ry="8" fill="#fde8ee" />
    </svg>
  );
}
