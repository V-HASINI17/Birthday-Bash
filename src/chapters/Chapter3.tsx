import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { useStory } from '@/story/StoryContext';
import PageTransition from '@/components/PageTransition';
import AnimatedText from '@/components/AnimatedText';
import CuteCharacter from '@/components/CuteCharacter';
import HeartAnimation from '@/components/HeartAnimation';

interface GiftPack {
  id: number;
  title: string;
  color: string;
  ribbon: string;
  unlocked: boolean;
}

const GIFTS: GiftPack[] = [
  { id: 1, title: 'Childhood → 20', color: '#f8b8cd', ribbon: '#e8617e', unlocked: true },
  { id: 2, title: 'Travel', color: '#ecd69b', ribbon: '#d6a04f', unlocked: true },
  { id: 3, title: 'Spider-Man T-Shirt', color: '#5d3a7a', ribbon: '#a83b58', unlocked: false },
  { id: 4, title: 'Us ❤️', color: '#fbd5e0', ribbon: '#e8617e', unlocked: false },
  { id: 5, title: 'A Letter 💌', color: '#fde8ee', ribbon: '#5d3a7a', unlocked: false },
];

export default function Chapter3() {
  const { state, nextScene, goTo } = useStory();

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {state.scene === 'enter' && (
          <PageTransition key="enter" sceneKey="enter" variant="scrapbook" className="absolute inset-0">
            <GiftsEnterScene onDone={() => nextScene('click')} />
          </PageTransition>
        )}

        {state.scene === 'click' && (
          <PageTransition key="click" sceneKey="click" variant="scrapbook" className="absolute inset-0">
            <ClickGiftsScene onDone={() => nextScene('list')} />
          </PageTransition>
        )}

        {state.scene === 'list' && (
          <PageTransition key="list" sceneKey="list" variant="scrapbook" className="absolute inset-0 overflow-y-auto">
            <GiftListScene onOpenGift={(id) => goTo('chapter4', `gift${id}`)} />
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Scene 1: Gifts Enter ────────────────────────────────────────────

function GiftsEnterScene({ onDone }: { onDone: () => void }) {
  const [visibleGifts, setVisibleGifts] = useState(0);
  const [showText, setShowText] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    [400, 700, 1000, 1300, 1600].forEach((delay, i) => {
      timers.push(setTimeout(() => setVisibleGifts(i + 1), delay));
    });
    timers.push(setTimeout(() => setShowText(1), 2600));
    timers.push(setTimeout(() => setShowText(2), 4800));
    timers.push(setTimeout(() => setShowText(3), 7000));
    timers.push(setTimeout(onDone, 9500));
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center justify-center px-6 py-10 overflow-hidden">
      <HeartAnimation count={6} duration={6} />

      <Doodle variant="star" className="absolute top-6 left-6 animate-float-slow" />
      <Doodle variant="flower" className="absolute bottom-10 right-8 animate-float-medium" />
      <Doodle variant="heart" className="absolute top-1/4 right-6 animate-float-slow" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center w-full max-w-md">
        {/* Gift boxes entering */}
        <div className="flex flex-wrap items-end justify-center gap-3 min-h-[120px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <AnimatePresence key={i}>
              {visibleGifts > i && (
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, y: 20, rotate: i % 2 === 0 ? -15 : 15 }}
                  animate={{ opacity: 1, x: 0, y: 0, rotate: i % 2 === 0 ? -3 : 3 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                  >
                    <MiniGiftBox color={GIFTS[i].color} ribbon={GIFTS[i].ribbon} size={56} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Text reveal */}
        <div className="flex flex-col items-center gap-4 min-h-[180px] justify-center">
          <AnimatePresence>
            {showText >= 1 && (
              <motion.p
                key="t1"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                className="font-hand text-2xl sm:text-3xl text-wine-500 leading-snug"
              >
                Imagine how boring your life would be...
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showText >= 2 && (
              <motion.p
                key="t2"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7 }}
                className="font-hand text-2xl sm:text-3xl text-wine-600 leading-snug"
              >
                Without me 😏
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showText >= 2 && (
              <motion.p
                key="t2b"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="font-hand text-xl sm:text-2xl text-ink-600 leading-snug"
              >
                Anyway... I knew that you are always greatfull for me.. 🥴
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showText >= 3 && (
              <motion.p
                key="t3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 8 }}
                className="font-script text-4xl sm:text-5xl text-blush-600"
              >
                My Dooorlingggggg 🫂
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Scene 2: Click The Gifts ────────────────────────────────────────

function ClickGiftsScene({ onDone }: { onDone: () => void }) {
  const [clicked, setClicked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);

    // Spawn heart particles
    const newHearts = [...Array(8)].map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 120,
      y: -30 - Math.random() * 60,
    }));
    setHearts(newHearts);

    setTimeout(() => setShowMessage(true), 1200);
    setTimeout(onDone, 5500);
  };

  return (
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center justify-center px-6 py-10 overflow-hidden">
      <Doodle variant="star" className="absolute top-8 left-8 animate-float-slow" />
      <Doodle variant="heart" className="absolute bottom-12 right-8 animate-float-medium" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center w-full max-w-sm">
        {!clicked && (
          <>
            <AnimatedText
              as="h2"
              variant="word"
              stagger={0.08}
              className="font-hand text-3xl sm:text-4xl text-blush-500"
            >
              Go on... tap the gifts! 🎁
            </AnimatedText>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.button
                onClick={handleClick}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="flex items-end gap-2">
                  <MiniGiftBox color="#f8b8cd" ribbon="#e8617e" size={64} rotate={-4} />
                  <MiniGiftBox color="#ecd69b" ribbon="#d6a04f" size={72} rotate={2} />
                  <MiniGiftBox color="#5d3a7a" ribbon="#a83b58" size={64} rotate={-3} />
                </div>
              </motion.button>
            </motion.div>

            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-kalam text-sm text-ink-600/60"
            >
              (tap them!)
            </motion.p>
          </>
        )}

        {clicked && (
          <div className="flex flex-col items-center gap-6">
            {/* Heart particles */}
            <div className="relative">
              {hearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 1.2, x: h.x, y: h.y }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute top-1/2 left-1/2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8617e">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              ))}

              {/* Character reaction */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 8 }}
              >
                <CuteCharacter variant="cat" size={80} />
              </motion.div>
            </div>

            <AnimatePresence>
              {showMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="font-script text-3xl sm:text-4xl text-wine-500 leading-snug max-w-md"
                >
                  I think me being your daughter is enough of a gift for you
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Scene 3: The Gift List ──────────────────────────────────────────

function GiftListScene({ onOpenGift }: { onOpenGift: (id: number) => void }) {
  const [showIntro, setShowIntro] = useState(false);
  const [showGifts, setShowGifts] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowIntro(true), 200);
    const t2 = setTimeout(() => setShowGifts(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] paper-texture paper-grain flex flex-col items-center px-4 py-10">
      <HeartAnimation count={4} duration={6} />

      <Doodle variant="flower" className="absolute top-6 left-6 animate-float-slow" />
      <Doodle variant="star" className="absolute top-8 right-8 animate-float-medium" />
      <Doodle variant="heart" className="absolute bottom-8 left-10 animate-float-slow" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
        {/* Intro text */}
        <AnimatePresence>
          {showIntro && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="font-hand text-2xl sm:text-3xl text-wine-500 leading-snug">
                Oh fine 😒...
              </p>
              <p className="font-hand text-xl sm:text-2xl text-ink-600 leading-snug mt-2">
                You just need gifts apart from me!
              </p>
              <p className="font-script text-2xl sm:text-3xl text-blush-600 mt-3">
                here comes the list of gift packs 🎁
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gift packs grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mt-2">
          {GIFTS.map((gift, i) => (
            <AnimatePresence key={gift.id}>
              {showGifts && (
                <motion.button
                  initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -8 : 8 }}
                  animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 10, delay: i * 0.12 }}
                  onClick={() => gift.unlocked && onOpenGift(gift.id)}
                  disabled={!gift.unlocked}
                  className={`relative bg-white hand-drawn-border-2 scrap-shadow p-3 sm:p-4 flex flex-col items-center gap-2 ${
                    !gift.unlocked ? 'opacity-60' : ''
                  }`}
                >
                  {/* Washi tape */}
                  <div
                    className={`absolute -top-2 ${
                      i % 2 === 0 ? 'left-3 -rotate-3' : 'right-3 rotate-3'
                    } w-12 h-5 ${i % 3 === 0 ? 'washi-tape' : i % 3 === 1 ? 'washi-tape-purple' : 'washi-tape-yellow'}`}
                  />

                  {/* Gift box illustration */}
                  <motion.div
                    animate={gift.unlocked ? { y: [0, -3, 0] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                  >
                    <MiniGiftBox
                      color={gift.color}
                      ribbon={gift.ribbon}
                      size={48}
                      number={gift.id}
                      locked={!gift.unlocked}
                    />
                  </motion.div>

                  {/* Label */}
                  <p className="font-hand text-base sm:text-lg text-ink-700 text-center leading-tight">
                    Gift {gift.id}
                  </p>
                  <p className="font-kalam text-xs sm:text-sm text-blush-500 text-center leading-tight">
                    {gift.title}
                  </p>

                  {!gift.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-cream-100/40 rounded-lg">
                      <Lock className="w-5 h-5 text-ink-600/50" />
                    </div>
                  )}

                  {gift.unlocked && (
                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="font-kalam text-[10px] text-blush-500"
                    >
                      tap to open →
                    </motion.p>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Last gift spans full width */}
        {showGifts && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.6 }}
            className="w-full"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full bg-white hand-drawn-border-2 scrap-shadow p-3 flex items-center gap-3 opacity-60"
              disabled
            >
              <div className="washi-tape-yellow absolute -top-2 right-8 w-12 h-5 rotate-3" />
              <MiniGiftBox color="#fde8ee" ribbon="#5d3a7a" size={40} number={5} locked />
              <div className="text-left">
                <p className="font-hand text-base text-ink-700">Gift 5</p>
                <p className="font-kalam text-xs text-blush-500">A Letter 💌</p>
              </div>
              <Lock className="w-4 h-4 text-ink-600/50 ml-auto" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Mini Gift Box SVG ───────────────────────────────────────────────

function MiniGiftBox({
  color,
  ribbon,
  size = 48,
  number,
  rotate = 0,
  locked = false,
}: {
  color: string;
  ribbon: string;
  size?: number;
  number?: number;
  rotate?: number;
  locked?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      fill="none"
      stroke="#2a1d15"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Box body */}
      <rect x="14" y="30" width="52" height="42" rx="3" fill={color} />
      {/* Vertical ribbon */}
      <rect x="36" y="30" width="8" height="42" fill={ribbon} stroke="none" />
      {/* Lid */}
      <rect x="10" y="24" width="60" height="10" rx="2" fill={color} />
      <rect x="36" y="24" width="8" height="10" fill={ribbon} stroke="none" />
      {/* Ribbon bow */}
      <ellipse cx="30" cy="20" rx="8" ry="5" fill={ribbon} stroke="none" />
      <ellipse cx="50" cy="20" rx="8" ry="5" fill={ribbon} stroke="none" />
      <circle cx="40" cy="20" r="3" fill={ribbon} stroke="none" />
      {/* Shadow under box */}
      <ellipse cx="40" cy="74" rx="24" ry="3" fill="#2a1d15" opacity="0.08" stroke="none" />

      {/* Number badge */}
      {number !== undefined && !locked && (
        <>
          <circle cx="64" cy="14" r="10" fill="#fff" stroke="#2a1d15" strokeWidth={1.5} />
          <text
            x="64"
            y="18"
            textAnchor="middle"
            fontFamily="Caveat, cursive"
            fontSize="13"
            fill="#2a1d15"
            stroke="none"
            fontWeight="bold"
          >
            {number}
          </text>
        </>
      )}
    </svg>
  );
}

// ─── Doodle ──────────────────────────────────────────────────────────

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
