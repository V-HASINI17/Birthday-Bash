import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Chapter } from '@/story/StoryContext';

interface ChapterNavigationProps {
  current: number;
  total: number;
  chapterNames?: string[];
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
}

export default function ChapterNavigation({
  current,
  total,
  chapterNames = [],
  onPrev,
  onNext,
  className = '',
}: ChapterNavigationProps) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={current <= 0}
        onClick={onPrev}
        className="w-10 h-10 rounded-full bg-white/80 hand-drawn-border-2 flex items-center justify-center disabled:opacity-30"
      >
        <ChevronLeft className="w-5 h-5 text-ink-700" />
      </motion.button>

      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? 'bg-blush-500 scale-125' : 'bg-blush-200'
            }`}
          />
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={current >= total - 1}
        onClick={onNext}
        className="w-10 h-10 rounded-full bg-white/80 hand-drawn-border-2 flex items-center justify-center disabled:opacity-30"
      >
        <ChevronRight className="w-5 h-5 text-ink-700" />
      </motion.button>
    </div>
  );
}

export type { Chapter };
