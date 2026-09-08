import { motion, AnimatePresence } from 'framer-motion';
import { useState, type ReactNode } from 'react';

interface EnvelopeProps {
  onOpen?: () => void;
  children?: ReactNode;
  label?: string;
  className?: string;
  autoOpen?: boolean;
}

export default function Envelope({
  onOpen,
  children,
  label = 'Open me',
  className = '',
  autoOpen = false,
}: EnvelopeProps) {
  const [opened, setOpened] = useState(autoOpen);

  const handleOpen = () => {
    setOpened(true);
    onOpen?.();
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={handleOpen}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full max-w-sm mx-auto"
      >
        {/* Envelope body */}
        <div className="relative bg-cream-200 hand-drawn-border-2 scrap-shadow p-6 min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="closed"
                exit={{ opacity: 0, y: -30 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-0 h-0 border-l-[80px] border-r-[80px] border-b-[50px] border-l-transparent border-r-transparent border-b-blush-300" />
                <p className="font-hand text-ink-600 text-xl">{label}</p>
              </motion.div>
            ) : (
              <motion.div
                key="opened"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
}
