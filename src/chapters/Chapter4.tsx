import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useStory } from '@/story/StoryContext';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import CuteCharacter from '@/components/CuteCharacter';
import HeartAnimation from '@/components/HeartAnimation';
import Polaroid from '@/components/Polaroid';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';

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
          <PageTransition key="memories" sceneKey="memories" variant="scrapbook" className="absolute inset-0 overflow-y-auto">
            <MemoryWallScene onNext={() => goTo('chapter3', 'list')} />
          </PageTransition>
        )}

        {state.scene === 'gift2' && (
          <PageTransition key="gift2" sceneKey="gift2" variant="scrapbook" className="absolute inset-0">
            <TravelIntroScene onNext={() => nextScene('gift2-puri')} />
          </PageTransition>
        )}

        {state.scene === 'gift2-puri' && (
          <PageTransition key="gift2-puri" sceneKey="gift2-puri" variant="scrapbook" className="absolute inset-0 overflow-y-auto">
            <TravelScrapbookScene
              section="puri"
              onNext={() => nextScene('gift2-pondicherry')}
            />
          </PageTransition>
        )}

        {state.scene === 'gift2-pondicherry' && (
          <PageTransition key="gift2-pondicherry" sceneKey="gift2-pondicherry" variant="scrapbook" className="absolute inset-0 overflow-y-auto">
            <TravelScrapbookScene
              section="pondicherry"
              onNext={() => goTo('chapter3', 'list')}
            />
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

      </div>

      {showPhoto && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20"
        >
          <NextButton onClick={onNext} />
        </motion.div>
      )}
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
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center px-4 py-10">
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

// ─── Gift 2 Scene 1: Travel Intro ───────────────────────────────────

function TravelIntroScene({ onNext }: { onNext: () => void }) {
  const [showText, setShowText] = useState(false);
  const [showSuitcase, setShowSuitcase] = useState(false);
  const [openSuitcase, setOpenSuitcase] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 300);
    const t2 = setTimeout(() => setShowSuitcase(true), 1400);
    const t3 = setTimeout(() => setOpenSuitcase(true), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center justify-center px-6 py-10 overflow-hidden">
      <HeartAnimation count={6} duration={5} />

      <Doodle variant="star" className="absolute top-8 left-8 animate-float-slow" />
      <Doodle variant="heart" className="absolute top-12 right-8 animate-float-medium" />
      <Doodle variant="flower" className="absolute bottom-12 left-10 animate-float-slow" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center w-full max-w-md">
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <p className="font-hand text-2xl sm:text-3xl text-wine-500 leading-snug">
                So , You would love 🧳 travelling...
              </p>
              <p className="font-hand text-xl sm:text-2xl text-ink-600 leading-snug">
                Make a bump of photo yuh travelled Without me 😒 and still enjoyed 😒😮‍💨
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSuitcase && (
            <motion.div
              initial={{ opacity: 0, x: -120, rotate: -15 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 10 }}
              className="relative"
            >
              <Suitcase open={openSuitcase} />
            </motion.div>
          )}
        </AnimatePresence>

        {openSuitcase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <NextButton onClick={onNext} label="Open album 📖" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Gift 2 Scene 2: Travel Scrapbook ──────────────────────────────

interface TravelPhoto {
  label: string;
  caption: string;
  aspect: 'square' | 'portrait' | 'landscape';
}

interface TravelSection {
  id: 'puri' | 'pondicherry';
  title: string;
  emoji: string;
  stamp: string;
  photos: TravelPhoto[];
}

const TRAVEL_SECTIONS: Record<'puri' | 'pondicherry', TravelSection> = {
  puri: {
    id: 'puri',
    title: 'Puri',
    emoji: '📍',
    stamp: 'PURI ✦ Sea & Sand',
    photos: [
      { label: 'Puri photo 1', caption: 'Beach day 🌊', aspect: 'landscape' },
      { label: 'Puri photo 2', caption: 'Sunset 🌅', aspect: 'portrait' },
      { label: 'Puri photo 3', caption: 'Temple visit 🛕', aspect: 'square' },
      { label: 'Puri photo 4', caption: 'Sea waves 🐚', aspect: 'landscape' },
      { label: 'Puri photo 5', caption: 'Together 🤍', aspect: 'portrait' },
      { label: 'Puri photo 6', caption: 'Street food 🍢', aspect: 'square' },
      { label: 'Puri photo 7', caption: 'Golden hour ✨', aspect: 'landscape' },
    ],
  },
  pondicherry: {
    id: 'pondicherry',
    title: 'Pondicherry',
    emoji: '📍',
    stamp: 'PONDICHERRY ✦ French Town',
    photos: [
      { label: 'Pondy photo 1', caption: 'French quarter 🏠', aspect: 'landscape' },
      { label: 'Pondy photo 2', caption: 'Café hop ☕', aspect: 'square' },
      { label: 'Pondy photo 3', caption: 'Beach walk 🌊', aspect: 'portrait' },
      { label: 'Pondy photo 4', caption: 'Auroville 🌿', aspect: 'landscape' },
      { label: 'Pondy photo 5', caption: 'Sunrise 🌄', aspect: 'portrait' },
      { label: 'Pondy photo 6', caption: 'Cycle ride 🚲', aspect: 'square' },
      { label: 'Pondy photo 7', caption: 'Old streets 🏛️', aspect: 'landscape' },
      { label: 'Pondy photo 8', caption: 'Best trip 💛', aspect: 'portrait' },
    ],
  },
};

const TRAVEL_TAPE_COLORS = ['pink', 'yellow', 'purple'] as const;
const TRAVEL_TAPE_POSITIONS = ['top-left', 'top-right', 'top-center'] as const;

function TravelScrapbookScene({
  section,
  onNext,
}: {
  section: 'puri' | 'pondicherry';
  onNext: () => void;
}) {
  const data = TRAVEL_SECTIONS[section];
  const [visibleCount, setVisibleCount] = useState(0);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < data.photos.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 400 + i * 300));
    }
    timers.push(setTimeout(() => setAllDone(true), 400 + data.photos.length * 300 + 600));
    return () => timers.forEach(clearTimeout);
  }, [data.photos.length]);

  return (
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center px-4 py-10">
      <HeartAnimation count={4} duration={6} />

      <Doodle variant="star" className="absolute top-6 left-6 animate-float-slow" />
      <Doodle variant="heart" className="absolute top-8 right-8 animate-float-medium" />
      <Doodle variant="flower" className="absolute bottom-8 right-10 animate-float-slow" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
        {/* Section header with stamp */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 10 }}
          className="flex flex-col items-center gap-3"
        >
          <h2 className="font-script text-4xl sm:text-5xl text-blush-600">
            {data.emoji} {data.title}
          </h2>
          <TravelStamp text={data.stamp} />
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
          {data.photos.map((photo, i) => {
            const isVisible = visibleCount > i;
            const rotation = (i % 2 === 0 ? -1 : 1) * (2 + (i % 3));
            const tapeColor = TRAVEL_TAPE_COLORS[i % TRAVEL_TAPE_COLORS.length];
            const tapePos = TRAVEL_TAPE_POSITIONS[i % TRAVEL_TAPE_POSITIONS.length];

            return (
              <AnimatePresence key={i}>
                {isVisible && (
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, y: -15, rotate: rotation - 8 }}
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
                        caption={photo.caption}
                        rotation={rotation}
                        tape={tapeColor}
                        tapePosition={tapePos}
                        className="w-full"
                      >
                        <PhotoPlaceholder
                          label={photo.label}
                          aspect={photo.aspect}
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
            className="flex justify-center mt-2"
          >
            {section === 'puri' ? (
              <NextButton onClick={onNext} label="Next: Pondicherry →" />
            ) : (
              <NextButton onClick={onNext} label="Back to gifts 🎁" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Travel SVG Components ─────────────────────────────────────────

function Suitcase({ open }: { open: boolean }) {
  return (
    <div className="relative" style={{ width: 140, height: 130 }}>
      <svg viewBox="0 0 140 130" width="140" height="130" fill="none">
        {/* Handle */}
        <path d="M52 22 Q52 10 70 10 Q88 10 88 22" stroke="#2a1d15" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Suitcase body */}
        <rect x="22" y="22" width="96" height="95" rx="8" fill="#d6a04f" stroke="#2a1d15" strokeWidth="2.5" />
        {/* Lid line */}
        <line x1="22" y1="48" x2="118" y2="48" stroke="#2a1d15" strokeWidth="2" strokeDasharray="4 3" />
        {/* Stickers */}
        <circle cx="40" cy="38" r="6" fill="#f8b8cd" stroke="#2a1d15" strokeWidth="1.5" opacity="0.8" />
        <circle cx="100" cy="38" r="6" fill="#5d3a7a" stroke="#2a1d15" strokeWidth="1.5" opacity="0.7" />
        {/* Latches */}
        <rect x="30" y="44" width="8" height="8" rx="2" fill="#2a1d15" opacity="0.6" />
        <rect x="102" y="44" width="8" height="8" rx="2" fill="#2a1d15" opacity="0.6" />
      </svg>

      {/* Open lid with contents */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -30 }}
            transition={{ type: 'spring', stiffness: 100, damping: 8 }}
            className="absolute left-1/2 -translate-x-1/2 -top-2"
            style={{ width: 120, height: 80 }}
          >
            {/* Airplane */}
            <motion.div
              animate={{ x: [-10, 30, -10], y: [0, -8, 0], rotate: [-5, 10, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-2 top-0"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M2 16 L28 8 L24 16 L28 24 Z" fill="#5d3a7a" stroke="#2a1d15" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 16 L18 12 L18 20 Z" fill="#f8b8cd" stroke="#2a1d15" strokeWidth="1" />
              </svg>
            </motion.div>
            {/* Hearts */}
            <motion.div
              animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-4 top-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#e8617e">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
            {/* Star doodle */}
            <motion.div
              animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 -translate-x-1/2 bottom-0"
            >
              <svg width="24" height="24" viewBox="0 0 30 30" fill="none" stroke="#e8617e" strokeWidth="1.5">
                <path d="M15 5 L17 12 L24 12 L18 16 L20 23 L15 19 L10 23 L12 16 L6 12 L13 12 Z" fill="#f8b8cd" fillOpacity="0.4" />
              </svg>
            </motion.div>
            {/* Compass */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute right-0 bottom-1"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2a1d15" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" fill="#fdf8ee" />
                <path d="M12 6 L14 12 L12 18 L10 12 Z" fill="#e8617e" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TravelStamp({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
      animate={{ opacity: 1, scale: 1, rotate: -6 }}
      transition={{ type: 'spring', stiffness: 120, damping: 8, delay: 0.3 }}
      className="relative inline-block"
    >
      <div className="px-4 py-2 border-2 border-blush-500 border-dashed rounded-sm bg-cream-100/60">
        <p className="font-hand text-sm text-blush-600 tracking-wider uppercase">{text}</p>
      </div>
    </motion.div>
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
