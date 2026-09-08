import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useStory } from '@/story/StoryContext';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import Clapperboard from '@/components/Clapperboard';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import CuteCharacter from '@/components/CuteCharacter';
import Confetti from '@/components/Confetti';
import HeartAnimation from '@/components/HeartAnimation';

const PASSWORD = '2006';

export default function IntroChapter() {
  const { state, nextScene, unlock, goTo } = useStory();

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {state.scene === 'clapperboard' && (
          <PageTransition key="clapperboard" sceneKey="clapperboard" variant="cinematic" className="absolute inset-0">
            <ClapperboardScene onDone={() => nextScene('surprise')} />
          </PageTransition>
        )}

        {state.scene === 'surprise' && (
          <PageTransition key="surprise" sceneKey="surprise" variant="cinematic" className="absolute inset-0">
            <SurpriseScene onDone={() => nextScene('password')} />
          </PageTransition>
        )}

        {state.scene === 'password' && (
          <PageTransition key="password" sceneKey="password" variant="scrapbook" className="absolute inset-0">
            <PasswordScene
              onCorrect={() => {
                unlock('chapter2');
                nextScene('success');
              }}
            />
          </PageTransition>
        )}

        {state.scene === 'success' && (
          <PageTransition key="success" sceneKey="success" variant="cinematic" className="absolute inset-0">
            <SuccessScene onDone={() => goTo('chapter2', 'reveal')} />
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Scene 1: Clapperboard ─────────────────────────────────────────

function ClapperboardScene({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="relative min-h-[100dvh] bg-plum-900 cinematic-vignette flex flex-col items-center justify-center px-6">
      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Slow zoom container */}
      <motion.div
        initial={{ scale: 0.6 }}
        animate={{ scale: [0.6, 1, 1.05] }}
        transition={{ duration: 3.5, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <Clapperboard className="w-48 sm:w-64" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1] }}
          transition={{ duration: 2, delay: 1.5 }}
          className="mt-6 font-cinematic italic text-blush-200 text-lg tracking-widest"
        >
          A film by someone who loves you
        </motion.p>
      </motion.div>
    </div>
  );
}

// ─── Scene 2: Surprise ─────────────────────────────────────────────

function SurpriseScene({ onDone }: { onDone: () => void }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-plum-800 cinematic-vignette flex flex-col items-center justify-center px-6">
      <HeartAnimation count={8} duration={6} />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        <AnimatedText
          as="h1"
          variant="word"
          stagger={0.15}
          className="font-script text-5xl sm:text-7xl text-blush-100"
        >
          Surpriseeeee...
        </AnimatedText>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <AnimatedText
            as="p"
            variant="word"
            delay={1.8}
            stagger={0.1}
            className="font-hand text-2xl sm:text-3xl text-blush-200"
          >
            I made something for you...
          </AnimatedText>
        </motion.div>

        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={onDone}
            className="relative mt-4 px-8 py-4 bg-blush-500 text-white font-hand text-2xl rounded-full scrap-shadow-lg hand-drawn-border-2 animate-pulse-soft"
          >
            OPEN YOUR SURPRISE ❤️
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ─── Scene 3: Password ─────────────────────────────────────────────

function PasswordScene({ onCorrect }: { onCorrect: () => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === PASSWORD) {
      onCorrect();
    } else {
      const messages = [
        "Nope! That's not it... try again! 🙈",
        "Hmm, not quite... think small! 🤔",
        "Almost! ...but not really 😜",
        "Wrong again! You've got this! 💪",
      ];
      setError(messages[attempts % messages.length]);
      setAttempts((a) => a + 1);
      setInput('');
    }
  };

  return (
    <div className="relative min-h-[100dvh] paper-texture flex items-center justify-center px-4 py-8">
      {/* Decorative doodles */}
      <Doodle className="absolute top-4 left-4" />
      <Doodle variant="flower" className="absolute bottom-8 right-6" />
      <Doodle variant="heart" className="absolute top-1/3 right-4" />

      <div className="relative w-full max-w-2xl">
        {/* Mobile: stacked. Desktop: side-by-side */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* LEFT: Photo placeholder */}
          <div className="md:w-1/2 relative">
            <div className="washi-tape absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 -rotate-3 z-10" />
            <PhotoPlaceholder
              label="A tiny you 👶"
              caption="Once upon a time..."
              aspect="portrait"
              rotation={-3}
              className="w-full"
            />
          </div>

          {/* RIGHT: Scrapbook panel */}
          <div className="md:w-1/2 relative bg-white/80 hand-drawn-border-2 scrap-shadow p-6 flex flex-col justify-center">
            <div className="washi-tape-purple absolute -top-2 right-8 w-16 h-5 rotate-6" />

            <div className="text-center mb-4">
              <CuteCharacter variant="bunny" size={60} className="mx-auto mb-2" />
              <AnimatedText
                as="h2"
                variant="word"
                stagger={0.06}
                className="font-hand text-2xl text-blush-600"
              >
                One tiny secret before you enter... 👀
              </AnimatedText>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                inputMode="numeric"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError('');
                }}
                placeholder="Type the secret..."
                autoFocus
                className="w-full px-4 py-3 text-center font-kalam text-xl text-ink-800 bg-cream-50 hand-drawn-border-2 outline-none focus:ring-2 focus:ring-blush-300 transition-all"
              />

              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className="w-full py-3 bg-blush-500 text-white font-hand text-xl rounded-full scrap-shadow hand-drawn-border-2"
              >
                Unlock ✨
              </motion.button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 text-center font-hand text-lg text-wine-500"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="mt-4 text-center font-kalam text-sm text-ink-600/60">
              Hint: the year it all began 🎂
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scene 4: Success ──────────────────────────────────────────────

function SuccessScene({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="relative min-h-[100dvh] bg-gradient-to-b from-plum-700 to-plum-900 cinematic-vignette flex flex-col items-center justify-center px-6 overflow-hidden">
      <Confetti count={50} duration={4} />
      <HeartAnimation count={20} duration={5} />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], type: 'spring' }}
        >
          <CuteCharacter variant="heart" size={100} />
        </motion.div>

        <AnimatedText
          as="h1"
          variant="word"
          stagger={0.12}
          className="font-script text-4xl sm:text-6xl text-blush-100"
        >
          You're in! 💖
        </AnimatedText>

        <AnimatedText
          as="p"
          variant="word"
          delay={1}
          stagger={0.08}
          className="font-hand text-xl sm:text-2xl text-blush-200"
        >
          Get ready for your story...
        </AnimatedText>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 120 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="h-1 bg-blush-300 rounded-full mt-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="font-cinematic italic text-blush-300/70 text-sm tracking-widest mt-2"
        >
          Chapter 2 loading...
        </motion.p>
      </div>
    </div>
  );
}

// ─── Decorative doodles ─────────────────────────────────────────────

function Doodle({
  variant = 'star',
  className = '',
}: {
  variant?: 'star' | 'flower' | 'heart';
  className?: string;
}) {
  if (variant === 'flower') {
    return (
      <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#e8617e" strokeWidth="1.5" strokeLinecap="round">
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
      <svg className={className} width="30" height="30" viewBox="0 0 24 24" fill="#f8b8cd" fillOpacity="0.5" stroke="#e8617e" strokeWidth="1">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#e8617e" strokeWidth="1.5" strokeLinecap="round">
      <path d="M15 5 L17 12 L24 12 L18 16 L20 23 L15 19 L10 23 L12 16 L6 12 L13 12 Z" fill="#f8b8cd" fillOpacity="0.3" />
    </svg>
  );
}
