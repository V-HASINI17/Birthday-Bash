import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useStory } from '@/story/StoryContext';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import CuteCharacter from '@/components/CuteCharacter';
import Confetti from '@/components/Confetti';
import HeartAnimation from '@/components/HeartAnimation';
import BirthdayCake from '@/components/BirthdayCake';
import HugCharacters from '@/components/HugCharacters';
import GiftBox from '@/components/GiftBox';

export default function Chapter2() {
  const { state, nextScene, goTo } = useStory();

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {state.scene === 'reveal' && (
          <PageTransition key="reveal" sceneKey="reveal" variant="scrapbook" className="absolute inset-0">
            <RevealScene onDone={() => nextScene('hug')} />
          </PageTransition>
        )}

        {state.scene === 'hug' && (
          <PageTransition key="hug" sceneKey="hug" variant="fade" className="absolute inset-0">
            <HugScene onDone={() => nextScene('cake')} />
          </PageTransition>
        )}

        {state.scene === 'cake' && (
          <PageTransition key="cake" sceneKey="cake" variant="scrapbook" className="absolute inset-0">
            <CakeScene onDone={() => nextScene('gift')} />
          </PageTransition>
        )}

        {state.scene === 'gift' && (
          <PageTransition key="gift" sceneKey="gift" variant="scrapbook" className="absolute inset-0">
            <GiftScene onContinue={() => goTo('chapter3', 'enter')} />
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Scene 1: Birthday Reveal ───────────────────────────────────────

function RevealScene({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 4000);
    const t3 = setTimeout(onDone, 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center justify-center px-6 overflow-hidden">
      <Confetti count={25} duration={5} />
      <HeartAnimation count={10} duration={6} />

      {/* Floating doodles */}
      <Doodle variant="star" className="absolute top-8 left-6 animate-float-slow" />
      <Doodle variant="flower" className="absolute bottom-10 left-8 animate-float-medium" />
      <Doodle variant="heart" className="absolute top-12 right-6 animate-float-slow" />
      <Doodle variant="star" className="absolute bottom-16 right-10 animate-float-medium" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
          <CuteCharacter variant="cat" size={70} />
        </motion.div>

        <AnimatedText
          as="h1"
          variant="word"
          stagger={0.12}
          className="font-script text-5xl sm:text-7xl text-blush-600"
        >
          Yaaaaahhhhh🎉
        </AnimatedText>

        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedText
              as="p"
              variant="word"
              delay={0.2}
              stagger={0.08}
              className="font-hand text-2xl sm:text-3xl text-wine-500"
            >
              It's Your Bday meri rasmulaiii 😚
            </AnimatedText>
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 8 }}
            className="mt-2"
          >
            <CuteCharacter variant="bunny" size={50} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Scene 2: Love Hug ──────────────────────────────────────────────

function HugScene({ onDone }: { onDone: () => void }) {
  return (
    <div className="relative min-h-[100dvh] bg-gradient-to-b from-blush-50 to-cream-100 paper-grain flex flex-col items-center justify-center px-6 overflow-hidden">
      <HeartAnimation count={6} duration={5} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <AnimatedText
          as="h2"
          variant="word"
          stagger={0.08}
          className="font-hand text-3xl sm:text-4xl text-blush-500 text-center"
        >
          Come here, you... 🤗
        </AnimatedText>

        <HugCharacters onHugComplete={onDone} />
      </div>
    </div>
  );
}

// ─── Scene 3: The Cake ──────────────────────────────────────────────

function CakeScene({ onDone }: { onDone: () => void }) {
  const [blown, setBlown] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showGiftBag, setShowGiftBag] = useState(false);

  const handleBlowOut = () => {
    setBlown(true);
    setTimeout(() => setShowLine1(true), 2000);
    setTimeout(() => setShowLine2(true), 4500);
    setTimeout(() => setShowGiftBag(true), 6500);
  };

  return (
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center justify-center px-6 py-10 overflow-hidden">
      {/* Doodles */}
      <Doodle variant="star" className="absolute top-6 left-6 animate-float-slow" />
      <Doodle variant="flower" className="absolute top-8 right-8 animate-float-medium" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center w-full max-w-md">
        {!blown && (
          <>
            <AnimatedText
              as="h2"
              variant="word"
              stagger={0.08}
              className="font-hand text-3xl sm:text-4xl text-blush-600"
            >
              Make a wishhhhhh 🎂
            </AnimatedText>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 1] }}
              transition={{ delay: 1, duration: 1 }}
              className="font-kalam text-sm text-ink-600/60"
            >
              (tap the candle!)
            </motion.p>

            <BirthdayCake onBlowOut={handleBlowOut} />
          </>
        )}

        {blown && (
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Cake still visible but lower */}
            <BirthdayCake />

            <div className="min-h-[120px] flex flex-col items-center gap-4 justify-center">
              <AnimatePresence>
                {showLine1 && (
                  <motion.p
                    key="line1"
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-hand text-2xl sm:text-3xl text-wine-500 leading-snug"
                  >
                    I wanted to gift you something amazing
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showLine2 && (
                  <motion.p
                    key="line2"
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-hand text-2xl sm:text-3xl text-wine-600 leading-snug"
                  >
                    But I didn't fit in the gift bag 😔
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {showGiftBag && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                >
                  <GiftBagDoodle>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10"
                    >
                      <ContinueButton onClick={onDone} />
                    </motion.div>
                  </GiftBagDoodle>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Scene 4: Continue ──────────────────────────────────────────────

function GiftScene({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center justify-center px-6 overflow-hidden">
      <HeartAnimation count={8} duration={5} />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
          <GiftBox size="lg" />
        </motion.div>

        <AnimatedText
          as="p"
          variant="word"
          stagger={0.06}
          className="font-hand text-2xl text-blush-500"
        >
          There's more inside... 🎁
        </AnimatedText>

        <ContinueButton onClick={onContinue} label="Okay... continue 🎁" />
      </div>
    </div>
  );
}

// ─── Shared components ──────────────────────────────────────────────

function ContinueButton({ onClick, label = 'Okay... continue 🎁' }: { onClick: () => void; label?: string }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-6 py-3 bg-blush-500 text-white font-hand text-xl rounded-full scrap-shadow hand-drawn-border-2 animate-pulse-soft"
    >
      {label}
    </motion.button>
  );
}

function GiftBagDoodle({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: 100, height: 120 }}>
      <svg viewBox="0 0 120 140" width="100" height="120" fill="none" stroke="#2a1d15" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="absolute inset-0">
        {/* Bag body */}
        <path d="M25 50 L20 130 Q20 135 25 135 L95 135 Q100 135 100 130 L95 50 Z" fill="#f8b8cd" />
        {/* Bag opening */}
        <path d="M25 50 Q35 45 40 50 Q50 45 55 50 Q65 45 70 50 Q80 45 85 50 Q90 45 95 50" fill="none" strokeWidth={2} />
        {/* Handles */}
        <path d="M35 50 Q35 25 60 25 Q85 25 85 50" fill="none" strokeWidth={2} />
        {/* Gift tag */}
        <rect x="50" y="65" width="25" height="18" rx="2" fill="#fde8ee" />
        <line x1="50" y1="74" x2="75" y2="74" stroke="#e8617e" strokeWidth={1} />
        <line x1="55" y1="70" x2="70" y2="70" stroke="#e8617e" strokeWidth={1} />
        <line x1="55" y1="78" x2="70" y2="78" stroke="#e8617e" strokeWidth={1} />
        {/* Confetti dots on bag */}
        <circle cx="40" cy="90" r="3" fill="#ecd69b" stroke="none" />
        <circle cx="70" cy="100" r="3" fill="#5d3a7a" stroke="none" />
        <circle cx="55" cy="115" r="3" fill="#e8617e" stroke="none" />
      </svg>
      {children}
    </div>
  );
}

function Doodle({
  variant = 'star',
  className = '',
}: {
  variant?: 'star' | 'flower' | 'heart';
  className?: string;
}) {
  if (variant === 'flower') {
    return (
      <svg className={className} width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="#e8617e" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="20" cy="12" r="5" fill="#f8b8cd" fillOpacity="0.4" />
        <circle cx="12" cy="20" r="5" fill="#f8b8cd" fillOpacity="0.4" />
        <circle cx="28" cy="20" r="5" fill="#f8b8cd" fillOpacity="0.4" />
        <circle cx="20" cy="28" r="5" fill="#f8b8cd" fillOpacity="0.4" />
        <circle cx="20" cy="20" r="3" fill="#e8617e" />
      </svg>
    );
  }
  if (variant === 'heart') {
    return (
      <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="#f8b8cd" fillOpacity="0.5" stroke="#e8617e" strokeWidth="1">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 30 30" fill="none" stroke="#e8617e" strokeWidth="1.5" strokeLinecap="round">
      <path d="M15 5 L17 12 L24 12 L18 16 L20 23 L15 19 L10 23 L12 16 L6 12 L13 12 Z" fill="#f8b8cd" fillOpacity="0.3" />
    </svg>
  );
}
