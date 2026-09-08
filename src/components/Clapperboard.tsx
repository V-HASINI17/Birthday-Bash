import { motion } from 'framer-motion';

export default function Clapperboard({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" stroke="#fde8ee" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {/* Bottom board */}
        <rect x="20" y="60" width="160" height="90" fill="#1a0a26" rx="4" />
        <rect x="20" y="60" width="160" height="90" rx="4" />
        <text x="100" y="105" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="16" fill="#f8b8cd" stroke="none">
          SCENE 1
        </text>
        <text x="100" y="130" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="14" fill="#f8b8cd" stroke="none">
          TAKE 20
        </text>

        {/* Top hinged bar */}
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 0, -25, 0, 0] }}
          transition={{ duration: 1.5, delay: 1, times: [0, 0.3, 0.5, 0.7, 1] }}
          style={{ transformOrigin: '30px 55px' }}
        >
          <rect x="20" y="40" width="160" height="22" fill="#1a0a26" rx="3" />
          {/* Diagonal stripes on top bar */}
          <line x1="30" y1="40" x2="45" y2="62" stroke="#f8b8cd" strokeWidth="4" />
          <line x1="55" y1="40" x2="70" y2="62" stroke="#f8b8cd" strokeWidth="4" />
          <line x1="80" y1="40" x2="95" y2="62" stroke="#f8b8cd" strokeWidth="4" />
          <line x1="105" y1="40" x2="120" y2="62" stroke="#f8b8cd" strokeWidth="4" />
          <line x1="130" y1="40" x2="145" y2="62" stroke="#f8b8cd" strokeWidth="4" />
          <line x1="155" y1="40" x2="170" y2="62" stroke="#f8b8cd" strokeWidth="4" />
        </motion.g>

        {/* Hinge circle */}
        <circle cx="30" cy="55" r="4" fill="#f8b8cd" />
        <circle cx="170" cy="55" r="4" fill="#f8b8cd" />
      </svg>
    </motion.div>
  );
}
