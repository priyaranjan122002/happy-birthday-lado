import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Headphones, KeyRound } from 'lucide-react';
import { playClick, playSuccessChime, playThud } from '../lib/audio';

interface SurpriseGateProps {
  herName: string;
  birthdayDate: string;
  onUnlock: () => void;
}

export const SurpriseGate: React.FC<SurpriseGateProps> = ({ herName, birthdayDate, onUnlock }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenSurprise = () => {
    // Procedural sensory feedback from akash-design-engineering
    playClick('press');
    playSuccessChime(880, 0.5);
    playThud(110, 0.4);

    setIsOpening(true);

    // Trigger grand confetti blast
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#E8C374', '#F4C2C2', '#F472B6', '#FFFFFF', '#D97706'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Delay slightly to let envelope open animation finish
    setTimeout(() => {
      onUnlock();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#07050B] overflow-hidden p-4 select-none"
      >
        {/* Ambient background glow and stars */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(232,195,116,0.12)_0%,_rgba(11,9,16,0.95)_70%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F472B6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E8C374]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center max-w-lg w-full text-center">
          {/* Headphones recommendation tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C152B]/80 border border-[#E8C374]/20 text-[#E8C374] text-xs mb-8 backdrop-blur-md shadow-lg"
          >
            <Headphones size={14} className="animate-pulse" />
            <span>Best experienced with headphones & sound on</span>
          </motion.div>

          {/* Sealed Interactive Envelope Card (Concentric Doppelrand Geometry) */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="doppelrand-card relative w-full max-w-sm sm:max-w-md shadow-2xl shadow-black/90 group"
          >
            <div className="doppelrand-core p-6 sm:p-8">
              {/* Top decorative gold corner accents */}
              <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-[#E8C374]/50 pointer-events-none" />
              <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-[#E8C374]/50 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-[#E8C374]/50 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-[#E8C374]/50 pointer-events-none" />

              {/* Envelope flap visual details */}
              <div className="flex justify-center mb-6">
                <span className="text-[11px] tracking-[0.22em] uppercase font-semibold text-[#A699BF] bg-[#2A203F]/70 px-3.5 py-1 rounded-full border border-white/10 tnum">
                  Special Delivery: {birthdayDate}
                </span>
              </div>

              <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal mb-2 leading-tight">
                A Birthday Surprise For
              </h1>
              <p className="font-handwriting text-3xl sm:text-4xl text-[#E8C374] mb-8 drop-shadow-md">
                {herName}
              </p>

              {/* The Interactive Golden Wax Seal (No scale(0) slop) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isOpening ? { scale: [1, 1.12, 0.92], opacity: [1, 1, 0], rotate: [0, 8, -8, 0] } : {}}
                onClick={handleOpenSurprise}
                className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-[#E8C374] via-[#C99738] to-[#91621E] p-1 shadow-xl shadow-[#E8C374]/30 cursor-pointer flex items-center justify-center relative group tactile-press"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#996A22] to-[#D4A346] flex flex-col items-center justify-center border-2 border-[#FFF0D0]/50 relative overflow-hidden">
                  <div className="absolute inset-1 rounded-full border border-dashed border-[#FFF3DC]/40 pointer-events-none" />
                  <Heart size={30} className="text-[#FFF5DC] fill-[#FFF5DC] drop-shadow-md group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-[9px] uppercase tracking-widest text-[#FFF7E8] font-bold mt-1">OPEN</span>
                </div>

              {/* Pulsing ring animation */}
              <span className="absolute inset-0 rounded-full border-2 border-[#E8C374]/60 animate-ping pointer-events-none" />
            </motion.div>

            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="mt-6 text-sm text-[#C9BFDB] flex items-center justify-center gap-1.5 font-light"
            >
              <KeyRound size={14} className="text-[#E8C374]" />
              Touch the seal to unlock your surprise
            </motion.p>
            </div>
          </motion.div>

          <div className="mt-8 flex items-center gap-2 text-xs text-[#7F7499]">
            <Sparkles size={13} className="text-[#E8C374]" />
            <span>Made with all my heart, just for you</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
