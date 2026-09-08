import { motion } from 'framer-motion';

interface CuteCharacterProps {
  variant?: 'cat' | 'bear' | 'bunny' | 'heart';
  className?: string;
  size?: number;
}

export default function CuteCharacter({
  variant = 'cat',
  className = '',
  size = 80,
}: CuteCharacterProps) {
  const float = {
    animate: { y: [0, -6, 0] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
  };

  return (
    <motion.div
      animate={float.animate}
      transition={float.transition}
      className={className}
      style={{ width: size, height: size }}
    >
      {variant === 'cat' && <CatFace size={size} />}
      {variant === 'bear' && <BearFace size={size} />}
      {variant === 'bunny' && <BunnyFace size={size} />}
      {variant === 'heart' && <HeartFace size={size} />}
    </motion.div>
  );
}

function CatFace({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="#2a1d15" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M25 30 L20 15 L35 25" fill="#f8b8cd" />
      <path d="M75 30 L80 15 L65 25" fill="#f8b8cd" />
      <circle cx="50" cy="55" r="30" fill="#fde8ee" />
      <circle cx="40" cy="50" r="3" fill="#2a1d15" />
      <circle cx="60" cy="50" r="3" fill="#2a1d15" />
      <path d="M47 60 Q50 63 53 60" />
      <path d="M50 63 L50 66" />
      <path d="M35 58 L28 56" />
      <path d="M35 61 L28 62" />
      <path d="M65 58 L72 56" />
      <path d="M65 61 L72 62" />
      <circle cx="38" cy="56" r="2" fill="#f8b8cd" opacity="0.6" />
      <circle cx="62" cy="56" r="2" fill="#f8b8cd" opacity="0.6" />
    </svg>
  );
}

function BearFace({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="#2a1d15" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="25" r="10" fill="#ecd69b" />
      <circle cx="72" cy="25" r="10" fill="#ecd69b" />
      <circle cx="50" cy="55" r="32" fill="#f3e3bb" />
      <circle cx="40" cy="50" r="3" fill="#2a1d15" />
      <circle cx="60" cy="50" r="3" fill="#2a1d15" />
      <ellipse cx="50" cy="62" rx="5" ry="4" fill="#2a1d15" />
      <path d="M50 66 Q50 70 47 70" />
      <path d="M50 66 Q50 70 53 70" />
      <circle cx="35" cy="58" r="2.5" fill="#f8b8cd" opacity="0.5" />
      <circle cx="65" cy="58" r="2.5" fill="#f8b8cd" opacity="0.5" />
    </svg>
  );
}

function BunnyFace({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="#2a1d15" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="38" cy="20" rx="7" ry="18" fill="#fde8ee" />
      <ellipse cx="62" cy="20" rx="7" ry="18" fill="#fde8ee" />
      <ellipse cx="38" cy="20" rx="3" ry="12" fill="#f8b8cd" />
      <ellipse cx="62" cy="20" rx="3" ry="12" fill="#f8b8cd" />
      <circle cx="50" cy="58" r="28" fill="#fef5f7" />
      <circle cx="42" cy="53" r="3" fill="#2a1d15" />
      <circle cx="58" cy="53" r="3" fill="#2a1d15" />
      <path d="M47 63 Q50 66 53 63" />
      <path d="M50 63 L50 66" />
      <circle cx="37" cy="60" r="2.5" fill="#f8b8cd" opacity="0.5" />
      <circle cx="63" cy="60" r="2.5" fill="#f8b8cd" opacity="0.5" />
    </svg>
  );
}

function HeartFace({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke="#2a1d15" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 80 C 20 55, 15 30, 35 25 C 45 22, 50 32, 50 35 C 50 32, 55 22, 65 25 C 85 30, 80 55, 50 80" fill="#f8b8cd" />
      <circle cx="40" cy="42" r="2.5" fill="#2a1d15" />
      <circle cx="60" cy="42" r="2.5" fill="#2a1d15" />
      <path d="M44 50 Q50 55 56 50" />
    </svg>
  );
}
