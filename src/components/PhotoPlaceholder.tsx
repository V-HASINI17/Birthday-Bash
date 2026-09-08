import { motion } from 'framer-motion';
import { ImagePlus } from 'lucide-react';

interface PhotoPlaceholderProps {
  label?: string;
  caption?: string;
  className?: string;
  aspect?: 'square' | 'portrait' | 'landscape';
  rotation?: number;
}

const aspectClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
};

export default function PhotoPlaceholder({
  label = 'Photo',
  caption,
  className = '',
  aspect = 'square',
  rotation = 0,
}: PhotoPlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: rotation - 3 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${aspectClasses[aspect]} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative h-full w-full overflow-hidden hand-drawn-border-2 bg-gradient-to-br from-cream-200 to-blush-100 flex flex-col items-center justify-center gap-2">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(232,97,126,0.1) 10px, rgba(232,97,126,0.1) 20px)',
          }}
        />
        <ImagePlus className="w-8 h-8 text-blush-400" strokeWidth={1.5} />
        <span className="font-hand text-blush-400 text-sm">{label}</span>
      </div>
      {caption && (
        <p className="mt-2 text-center font-hand text-ink-600 text-lg">{caption}</p>
      )}
    </motion.div>
  );
}
