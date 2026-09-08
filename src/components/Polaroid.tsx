import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface PolaroidProps {
  children?: ReactNode;
  caption?: string;
  rotation?: number;
  className?: string;
  tape?: 'pink' | 'purple' | 'yellow' | 'none';
  tapePosition?: 'top-left' | 'top-right' | 'top-center';
}

const tapeClasses = {
  pink: 'washi-tape',
  purple: 'washi-tape-purple',
  yellow: 'washi-tape-yellow',
  none: '',
};

const tapePositionClasses = {
  'top-left': 'top-[-8px] left-[15%] -rotate-[12deg]',
  'top-right': 'top-[-8px] right-[15%] rotate-[12deg]',
  'top-center': 'top-[-10px] left-1/2 -translate-x-1/2 -rotate-[2deg]',
};

export default function Polaroid({
  children,
  caption,
  rotation = -2,
  className = '',
  tape = 'pink',
  tapePosition = 'top-left',
}: PolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotation - 5 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{ rotate: 0, scale: 1.04, y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative bg-white p-3 pb-10 scrap-shadow ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {tape !== 'none' && (
        <div
          className={`absolute h-6 w-16 ${tapeClasses[tape]} ${tapePositionClasses[tapePosition]}`}
        />
      )}
      <div className="overflow-hidden bg-cream-100">{children}</div>
      {caption && (
        <p className="mt-3 text-center font-hand text-ink-700 text-xl leading-tight">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
