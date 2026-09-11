import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useStory } from '@/story/StoryContext';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import CuteCharacter from '@/components/CuteCharacter';
import HeartAnimation from '@/components/HeartAnimation';
import Polaroid from '@/components/Polaroid';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { ImagePlus } from 'lucide-react';

export default function Chapter4() {
  const { state, nextScene, goTo } = useStory();

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {state.scene === 'gift1' && (
          <PageTransition key="gift1" sceneKey="gift1" variant="scrapbook" className="absolute inset-0">
            <ChildhoodPhotoScene onNext={() => nextScene('turn20')} />
          </PageTransition>
        )}

        {state.scene === 'turn20' && (
          <PageTransition key="turn20" sceneKey="turn20" variant="scrapbook" className="absolute inset-0">
            <Turn20Scene onNext={() => nextScene('memories')} />
          </PageTransition>
        )}

        {state.scene === 'memories' && (
          <PageTransition key="memories" sceneKey="memories" variant="scrapbook" className="absolute inset-0">
            <MemoryWallScene onNext={() => goTo('chapter3', 'list')} />
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Scene 1: Childhood Photo ───────────────────────────────────────

function ChildhoodPhotoScene({ onNext }: { onNext: () => void }) {
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPhoto(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center justify-center px-6 py-10 overflow-hidden">
      <HeartAnimation count={5} duration={6} />

      <Doodle variant="star" className="absolute top-6 left-6 animate-float-slow" />
      <Doodle variant="flower" className="absolute bottom-10 right-8 animate-float-medium" />
      <Doodle variant="heart" className="absolute top-1/3 right-6 animate-float-slow" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center w-full max-w-sm">
        <AnimatedText
          as="h2"
          variant="word"
          stagger={0.06}
          className="font-hand text-2xl sm:text-3xl text-wine-500 leading-snug"
        >
          Oh my pretty little one....look how cute you are ...!!! 🥰
        </AnimatedText>

        <AnimatePresence>
          {showPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 40, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 80, damping: 10 }}
            >
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [-3, -2, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Polaroid
                  caption="You, as a little one 🌸"
                  rotation={-3}
                  tape="pink"
                  tapePosition="top-center"
                  className="w-64"
                >
                  <PhotoPlaceholder label="Your childhood photo" aspect="portrait" />
                </Polaroid>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-4"
          >
            <NextButton onClick={onNext} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Scene 2: Turn 20 ───────────────────────────────────────────────

function Turn20Scene({ onNext }: { onNext: () => void }) {
  const [showText, setShowText] = useState(false);
  const [showChars, setShowChars] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 500);
    const t2 = setTimeout(() => setShowChars(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-gradient-to-b from-blush-50 to-cream-100 paper-grain flex flex-col items-center justify-center px-6 py-10 overflow-hidden">
      <HeartAnimation count={10} duration={5} />

      <Doodle variant="star" className="absolute top-8 left-8 animate-float-slow" />
      <Doodle variant="heart" className="absolute top-12 right-8 animate-float-medium" />
      <Doodle variant="flower" className="absolute bottom-12 left-10 animate-float-slow" />
      <Doodle variant="star" className="absolute bottom-20 right-12 animate-float-medium" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center w-full max-w-md">
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatedText
                as="h1"
                variant="word"
                stagger={0.1}
                className="font-script text-5xl sm:text-6xl text-blush-600"
              >
                He turn 20 !
              </AnimatedText>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-hand text-3xl sm:text-4xl text-wine-500 mt-2"
              >
                Now 😚🫂
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showChars && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 8 }}
              className="flex items-end gap-4"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <CuteCharacter variant="bunny" size={70} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              >
                <CuteCharacter variant="cat" size={80} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <CuteCharacter variant="bear" size={65} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showChars && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <NextButton onClick={onNext} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Scene 3: Memory Wall ───────────────────────────────────────────

const MEMORY_CAPTIONS = [
  'Tiny you 🍼',
  'First steps 👣',
  'Little mischief 😏',
  'Sweet smile 🌸',
  'Growing up 🌱',
  'School days 📚',
  'Best friends 💛',
  'Festive joy ✨',
  'Silly face 🤪',
  'Golden days 🌅',
  'Big dreams 🌙',
  'Almost 20 🎂',
];

const TAPE_COLORS = ['pink', 'purple', 'yellow'] as const;
const TAPE_POSITIONS = ['top-left', 'top-right', 'top-center'] as const;

function MemoryWallScene({ onNext }: { onNext: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < MEMORY_CAPTIONS.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 400 + i * 350));
    }
    timers.push(setTimeout(() => setAllDone(true), 400 + MEMORY_CAPTIONS.length * 350 + 800));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      <HeartAnimation count={4} duration={6} />

      <Doodle variant="flower" className="absolute top-6 left-6 animate-float-slow" />
      <Doodle variant="star" className="absolute top-8 right-8 animate-float-medium" />
      <Doodle variant="heart" className="absolute bottom-8 right-10 animate-float-slow" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
        <AnimatedText
          as="h2"
          variant="word"
          stagger={0.08}
          className="font-hand text-3xl sm:text-4xl text-blush-500 text-center"
        >
          A lifetime of memories 💛
        </AnimatedText>

        {/* Memory wall grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
          {MEMORY_CAPTIONS.map((caption, i) => {
            const isVisible = visibleCount > i;
            const rotation = (i % 2 === 0 ? -1 : 1) * (2 + (i % 3));
            const tapeColor = TAPE_COLORS[i % TAPE_COLORS.length];
            const tapePos = TAPE_POSITIONS[i % TAPE_POSITIONS.length];

            return (
              <AnimatePresence key={i}>
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, y: -20, rotate: rotation - 8 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: rotation }}
                    transition={{ type: 'spring', stiffness: 80, damping: 10 }}
                  >
                    <motion.div
                      animate={{ rotate: [rotation, rotation - 1, rotation, rotation + 1, rotation] }}
                      transition={{
                        duration: 3 + (i % 3),
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.1,
                      }}
                    >
                      <Polaroid
                        caption={caption}
                        rotation={rotation}
                        tape={tapeColor}
                        tapePosition={tapePos}
                        className="w-full"
                      >
                        <PhotoPlaceholder
                          label={`Photo ${i + 1}`}
                          aspect={i % 3 === 0 ? 'portrait' : 'square'}
                        />
                      </Polaroid>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          >
            <NextButton onClick={onNext} label="Back to gifts 🎁" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Shared Components ──────────────────────────────────────────────

function NextButton({ onClick, label = 'Next ❤️' }: { onClick: () => void; label?: string }) {
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

function Doodle({
  variant = 'star',
  className = '',
}: {
  variant?: 'star' | 'flower' | 'heart';
  className?: string;
}) {
  if (variant === 'flower') {
    return (
      <svg className={className} width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="#e8617e" strokeWidth={1.5} strokeLinecap="round">
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
      <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="#f8b8cd" fillOpacity="0.5" stroke="#e8617e" strokeWidth={1}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 30 30" fill="none" stroke="#e8617e" strokeWidth={1.5} strokeLinecap="round">
      <path d="M15 5 L17 12 L24 12 L18 16 L20 23 L15 19 L10 23 L12 16 L6 12 L13 12 Z" fill="#f8b8cd" fillOpacity="0.3" />
    </svg>
  );
}
