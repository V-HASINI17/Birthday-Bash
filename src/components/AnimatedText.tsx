import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  variant?: 'word' | 'letter' | 'line';
  delay?: number;
  stagger?: number;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.1 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AnimatedText({
  children,
  variant = 'word',
  delay = 0,
  stagger = 0.08,
  className = '',
  as: Tag = 'p',
}: AnimatedTextProps) {
  const text = typeof children === 'string' ? children : '';

  if (variant === 'line' || typeof children !== 'string') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        <Tag>{children}</Tag>
      </motion.div>
    );
  }

  const parts = variant === 'letter' ? text.split('') : text.split(' ');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={stagger}
      transition={{ delay }}
      className={className}
    >
      <Tag className="inline">
        {parts.map((part, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            className="inline-block"
            style={{ marginRight: variant === 'word' ? '0.25em' : undefined }}
          >
            {part === ' ' ? '\u00A0' : part}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
