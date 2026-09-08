import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface ScrapbookPageProps {
  children: ReactNode;
  className?: string;
  rotation?: number;
  bg?: 'cream' | 'pink' | 'white';
  vignette?: boolean;
}

const bgClasses = {
  cream: 'bg-cream-100',
  pink: 'bg-blush-50',
  white: 'bg-white',
};

export default function ScrapbookPage({
  children,
  className = '',
  rotation = 0,
  bg = 'cream',
  vignette = false,
}: ScrapbookPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: rotation - 5, y: 40 }}
      animate={{ opacity: 1, rotate: rotation, y: 0 }}
      exit={{ opacity: 0, rotate: rotation + 5, y: -40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${bgClasses[bg]} paper-grain hand-drawn-border scrap-shadow-lg min-h-[100dvh] w-full overflow-hidden ${className}`}
    >
      {vignette && <div className="cinematic-vignette absolute inset-0" />}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
