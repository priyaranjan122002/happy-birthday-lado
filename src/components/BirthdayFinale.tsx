import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake, Sparkles, Heart, Flame, Wind, BookOpen, Send } from 'lucide-react';
import { LetterContent } from '../types';
import { playClick, playSuccessChime, playThud, playHeartPop } from '../lib/audio';

interface BirthdayFinaleProps {
  herName: string;
  birthdayDate: string;
  letter: LetterContent;
}

interface FloatingHeart {
  id: number;
  x: number;
  emoji: string;
}

export const BirthdayFinale: React.FC<BirthdayFinaleProps> = ({ herName, birthdayDate, letter }) => {
  const [candlesBlown, setCandlesBlown] = useState<boolean>(false);
  const [wishMade, setWishMade] = useState<boolean>(false);
  const [loveCount, setLoveCount] = useState<number>(108);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const handleBlowCandles = () => {
    playClick('press');
    playSuccessChime(1046.5, 0.6);
    playThud(90, 0.4);

    setCandlesBlown(true);
    setWishMade(true);

    // Multi-stage fireworks explosion
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#E8C374', '#F472B6', '#FFD700', '#FF69B4', '#FFF'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleSendLove = (e: React.MouseEvent) => {
    playHeartPop(0.35);
    setLoveCount((prev) => prev + 1);

    const emojis = ['💖', '❤️', '✨', '💋', '🥰', '💐'];
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX ? (e.clientX / window.innerWidth) * 100 : 50,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };

    setFloatingHearts((prev) => [...prev.slice(-20), newHeart]);

    // Remove heart after 2.5s
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2500);
  };

  return (
    <section id="birthday-letter" className="py-24 px-4 max-w-4xl mx-auto relative">
      {/* Floating Hearts from Tap */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: '80vh', scale: 0.6 }}
            animate={{ opacity: 0, y: '20vh', scale: 1.4 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            style={{ left: `${heart.x}%` }}
            className="absolute text-3xl select-none"
          >
            {heart.emoji}
          </motion.div>
        ))}
      </div>

      {/* ── PART 1: THE INTERACTIVE BIRTHDAY CAKE ── */}
      <div className="text-center mb-28">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#201832] border border-[#E8C374]/30 text-[#E8C374] text-xs uppercase tracking-widest font-semibold mb-3">
          <Cake size={14} className="text-[#F472B6]" />
          <span>The Birthday Tradition • 15 September</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-luxury text-white mb-3">
          Make A Wish, <span className="gold-gradient-text italic font-serif">{herName}</span>
        </h2>
        <p className="text-[#A59CB8] text-sm sm:text-base font-light mb-10">
          Close your eyes, think of your sweetest dream for this year, and blow out the candles!
        </p>

        {/* The Digital Cake Graphic */}
        <div className="relative max-w-sm mx-auto flex flex-col items-center">
          {/* Candles Container */}
          <div className="flex items-center justify-center gap-6 mb-2">
            {[1, 2, 3].map((candle) => (
              <div key={candle} className="flex flex-col items-center">
                {/* Flame */}
                {!candlesBlown ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 0.95, 1.1],
                      opacity: [0.9, 1, 0.85, 1],
                      y: [0, -1, 1, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="w-5 h-7 rounded-full bg-gradient-to-t from-[#D97706] via-[#FBBF24] to-[#FEF08A] shadow-[0_0_16px_rgba(251,191,36,0.9)] flex items-center justify-center relative"
                  >
                    <div className="w-1.5 h-3 rounded-full bg-white opacity-80" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -20, scale: 1.5 }}
                    transition={{ duration: 1.5 }}
                    className="w-3 h-5 text-[#9CA3AF]"
                  >
                    <Wind size={16} />
                  </motion.div>
                )}

                {/* Candle Stick */}
                <div className="w-3 h-12 bg-gradient-to-b from-[#F472B6] via-[#EC4899] to-[#BE185D] rounded-t-sm shadow-md border-x border-white/20 mt-1" />
              </div>
            ))}
          </div>

          {/* Layer 1 (Top Frosting) */}
          <div className="w-44 sm:w-48 h-12 rounded-t-2xl bg-gradient-to-r from-[#FFF1F2] via-[#FCE7F3] to-[#FFF1F2] shadow-lg border-b-4 border-[#F43F5E] flex items-center justify-center relative">
            <span className="text-xs tracking-wider uppercase font-bold text-[#E11D48]">
              {birthdayDate}
            </span>
          </div>

          {/* Layer 2 (Middle Cake) */}
          <div className="w-56 sm:w-64 h-16 bg-gradient-to-r from-[#FBCFE8] via-[#F472B6] to-[#FBCFE8] shadow-xl border-b-4 border-[#DB2777] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-2 bg-white/40" />
            <span className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#831843] tracking-wide text-center px-2">
              Happy Birthday Meri Jaan
            </span>
          </div>

          {/* Layer 3 (Base Stand) */}
          <div className="w-64 sm:w-72 h-4 rounded-full bg-gradient-to-r from-[#E8C374] via-[#FDE68A] to-[#E8C374] shadow-2xl border-t border-white/30" />

          {/* Blow Candle Action Button */}
          <div className="mt-8 w-full flex justify-center">
            {!candlesBlown ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBlowCandles}
                className="flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#F472B6] via-[#E11D48] to-[#BE185D] text-white font-bold text-sm shadow-xl shadow-[#E11D48]/30 hover:shadow-[#E11D48]/50 transition-all cursor-pointer min-h-[48px] tactile-press w-full sm:w-auto"
              >
                <Flame size={18} className="animate-pulse shrink-0" />
                <span>Blow The Candles & Make A Wish</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-[#231A36] border border-[#E8C374]/40 max-w-sm mx-auto text-center w-full"
              >
                <p className="font-serif-luxury text-lg text-[#E8C374] font-medium mb-1">
                  ✨ Your Wish Is Sealed With The Stars! ✨
                </p>
                <p className="text-xs text-[#C5B8D8]">
                  May every single prayer and dream of yours come true this year.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ── PART 2: THE MASTER UNFOLDING LOVE LETTER ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Parchment Paper Background with Concentric Padding */}
        <div className="bg-[#FAF7F2] text-[#2C2420] rounded-2xl sm:rounded-3xl p-5 sm:p-14 shadow-2xl shadow-black/80 border border-[#E8DCC8] relative overflow-hidden">
          {/* Subtle paper texture overlay */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#E8D7C3_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top Vintage Wax Seal Stamp Emblem */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#A8324A] to-[#691929] flex items-center justify-center shadow-lg border-2 border-[#DDA3B2] mb-3">
              <Heart size={24} className="text-[#FFF2F4] fill-[#FFF2F4]" />
            </div>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8C6D60]">
              Personal & Confidential
            </span>
            <div className="w-28 sm:w-32 h-[1px] bg-[#CBB5A1] mt-2" />
          </div>

          {/* Letter Heading */}
          <div className="relative z-10 mb-6 sm:mb-8 text-center sm:text-left">
            <h3 className="font-serif-luxury text-xl sm:text-3xl font-bold text-[#3B2820] mb-2">
              {letter.title}
            </h3>
            <p className="font-handwriting text-xl sm:text-2xl text-[#87344D]">
              {letter.greeting}
            </p>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="relative z-10 space-y-4 sm:space-y-5 text-[#3F332D] text-base sm:text-lg leading-relaxed font-light">
            {letter.paragraphs.map((para, i) => (
              <p key={i} className="first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-serif first-letter:text-[#87344D]">
                {para}
              </p>
            ))}
          </div>

          {/* Letter Sign-off */}
          <div className="relative z-10 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#DECDBB] flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="text-xs text-[#8C766C] font-mono">
              Written with all my heart • {birthdayDate}
            </div>
            <div className="text-right mt-4 sm:mt-0">
              <p className="font-handwriting text-lg sm:text-xl text-[#8C766C]">
                {letter.signOff}
              </p>
              <p className="font-handwriting text-2xl sm:text-3xl font-bold text-[#87344D] mt-1">
                {letter.sender}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── PART 3: "SEND HER LOVE" INTERACTIVE FLOATING BUTTON ── */}
      <div className="mt-16 sm:mt-20 flex flex-col items-center justify-center text-center px-2">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleSendLove}
          className="flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#F472B6] via-[#EC4899] to-[#E8C374] text-[#160E26] font-bold text-sm sm:text-base shadow-2xl shadow-[#F472B6]/30 transition-all cursor-pointer min-h-[48px] tactile-press w-full max-w-sm sm:w-auto group"
        >
          <Heart size={18} className="fill-[#160E26] group-hover:animate-bounce shrink-0" />
          <span>Send Her Infinite Love & Kisses</span>
          <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs font-mono font-bold tnum">
            {loveCount}
          </span>
        </motion.button>
        <p className="text-[11px] sm:text-xs text-[#7F7296] mt-3 font-light">
          Tap repeatedly to shower the screen with love!
        </p>
      </div>

      {/* Footer copyright message */}
      <footer className="mt-28 text-center text-xs text-[#6B5F80] border-t border-white/5 pt-8">
        <p>Made especially for {herName} • Happy Birthday on {birthdayDate} 🎂</p>
        <p className="mt-1 text-[#8F81A6] font-handwriting text-lg">Forever begins with you ✨</p>
      </footer>
    </section>
  );
};
