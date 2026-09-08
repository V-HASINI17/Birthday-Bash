import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';

interface GiftBoxProps {
  onOpen?: () => void;
  children?: ReactNode;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-20 h-20',
  md: 'w-32 h-32',
  lg: 'w-44 h-44',
};

export default function GiftBox({
  onOpen,
  children,
  label = 'Tap to open',
  className = '',
  size = 'md',
}: GiftBoxProps) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    onOpen?.();
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <motion.button
        onClick={handleOpen}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <motion.div
          className={`${sizeClasses[size]} relative`}
          animate={opened ? {} : { y: [0, -4, 0] }}
          transition={opened ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Box body */}
          <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-blush-500 hand-drawn-border-2 flex items-center justify-center">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-full bg-blush-600" />
          </div>
          {/* Lid */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/3 bg-blush-400 hand-drawn-border-2 z-10"
            animate={opened ? { y: -60, rotate: -15, opacity: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-full bg-blush-500" />
          </motion.div>
          {/* Ribbon knot */}
          {!opened && (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-blush-600 shadow-md" />
          )}
        </motion.div>
      </motion.button>
      {!opened && label && (
        <p className="font-hand text-ink-600 text-lg animate-pulse-soft">{label}</p>
      )}
      {opened && children}
    </div>
  );
}
