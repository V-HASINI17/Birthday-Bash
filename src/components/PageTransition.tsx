import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStory } from '@/story/StoryContext';

interface PageTransitionProps {
  children: ReactNode;
  sceneKey: string;
  variant?: 'fade' | 'slide' | 'cinematic' | 'scrapbook';
  className?: string;
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  },
  cinematic: {
    initial: { opacity: 0, scale: 1.08 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  scrapbook: {
    initial: { opacity: 0, rotate: -3, y: 30 },
    animate: { opacity: 1, rotate: 0, y: 0 },
    exit: { opacity: 0, rotate: 3, y: -30 },
  },
};

export default function PageTransition({
  children,
  sceneKey,
  variant = 'fade',
  className = '',
}: PageTransitionProps) {
  const v = variants[variant];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        initial={v.initial}
        animate={v.animate}
        exit={v.exit}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function useNextScene() {
  const { nextScene } = useStory();
  return nextScene;
}
