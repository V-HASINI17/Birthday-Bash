import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface MemoryWallProps {
  items: ReactNode[];
  className?: string;
}

export default function MemoryWall({ items, className = '' }: MemoryWallProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -3 : 3 }}
          animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
