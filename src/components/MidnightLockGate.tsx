import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Lock, Sparkles, Clock, Headphones, Heart, Eye, AlertCircle, ShieldAlert } from 'lucide-react';
import { playClick, playSuccessChime, playThud } from '../lib/audio';

interface MidnightLockGateProps {
  herName: string;
  targetTimestamp?: string; // e.g. "2026-09-15T00:00:00+05:30"
  onUnlock: () => void;
}

interface TimeRemaining {
  totalMs: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
}

const TEASER_QUOTES = [
  "Arey madam, no cheating! Sabr ka phal sabse meetha hota hai 😉💖",
  "Itna bhi kya jaldi hai? Pura saal intezaar kiya, bas thodi der aur! ✨",
  "Secret door strictly 12:00 AM pe hi khulega, promise! Tab tak smile karo 🥰",
  "Jitna zyada intezaar karogi, surprise utna hi zyada khoobsurat lagega! 🌹",
  "Behind this locked door: Tumhaari pyari yaadein, photos aur mera dil ❤️"
];

export const MidnightLockGate: React.FC<MidnightLockGateProps> = ({
  herName,
  targetTimestamp = '2026-09-15T00:00:00+05:30',
  onUnlock
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    totalMs: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: false
  });
  const [teaserIndex, setTeaserIndex] = useState<number>(-1);
  const [tapCount, setTapCount] = useState<number>(0);
  const [isOpening, setIsOpening] = useState<boolean>(false);

  // Target timestamp: 15 Sept 2026 00:00:00 IST
  const targetTime = new Date(targetTimestamp).getTime();

  useEffect(() => {
    // Check for secret test bypass via URL query (?preview=true or ?unlock=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('preview') === 'true' || urlParams.get('unlock') === 'true' || urlParams.get('test') === 'true') {
      console.log("Secret preview mode activated via URL parameter.");
      onUnlock();
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({
          totalMs: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isUnlocked: true
        });
        triggerCelebration();
      } else {
        const totalSeconds = Math.floor(diff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeLeft({
          totalMs: diff,
          hours,
          minutes,
          seconds,
          isUnlocked: false
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  const triggerCelebration = () => {
    if (isOpening) return;
    setIsOpening(true);

    playSuccessChime(880, 0.7);
    playThud(120, 0.5);

    // Full blast celebration fireworks
    const count = 250;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#E8C374', '#F472B6', '#E11D48', '#FFFFFF', '#FCD34D']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 35, startVelocity: 60 });
    fire(0.2, { spread: 70 });
    fire(0.35, { spread: 110, decay: 0.91, scalar: 0.85 });
    fire(0.1, { spread: 130, startVelocity: 30, decay: 0.92, scalar: 1.25 });
    fire(0.1, { spread: 130, startVelocity: 50 });

    setTimeout(() => {
      onUnlock();
    }, 1500);
  };

  // Playful Sneak Peek Button
  const handleSneakPeek = () => {
    playClick('press');
    setTeaserIndex((prev) => (prev + 1) % TEASER_QUOTES.length);

    // Gentle mini-confetti hearts
    confetti({
      particleCount: 15,
      spread: 45,
      origin: { y: 0.75 },
      colors: ['#F472B6', '#E8C374']
    });
  };

  // Secret bypass: 3 taps on padlock
  const handleSecretTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    playClick('press');

    if (nextCount >= 3) {
      alert("🔓 Secret Preview Activated! Opening full celebration...");
      triggerCelebration();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.9, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#07050C] overflow-hidden p-4 select-none"
      >
        {/* Ambient atmospheric glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(232,195,116,0.14)_0%,_rgba(11,9,16,0.96)_75%)] pointer-events-none" />
        <div className="absolute top-1/6 left-1/4 w-80 h-80 bg-[#F472B6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/6 right-1/4 w-80 h-80 bg-[#E8C374]/12 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center max-w-lg w-full text-center px-2">
          {/* Top Secret Badge with secret triple-tap for admin */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleSecretTap}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F1730]/90 border border-[#E8C374]/40 text-[#E8C374] text-xs mb-6 backdrop-blur-md shadow-xl cursor-pointer hover:border-[#E8C374]"
            title="Secret lock - 3 taps to preview"
          >
            <Lock size={13} className="text-[#E8C374] animate-pulse" />
            <span className="tracking-wider uppercase font-semibold text-[11px]">
              🔒 Strictly Locked Until 12:00 AM Midnight
            </span>
          </motion.div>

          {/* Luxury Vault Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-[#130E21]/90 backdrop-blur-xl border border-[#E8C374]/35 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/95 relative overflow-hidden"
          >
            {/* Corner aesthetic accents */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#E8C374]/60 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#E8C374]/60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#E8C374]/60 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#E8C374]/60 pointer-events-none" />

            <div className="flex justify-center mb-3">
              <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#A699BF] bg-[#2A203F]/80 px-4 py-1 rounded-full border border-white/10">
                15 September Special ✨
              </span>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal mb-1 leading-tight">
              A Birthday Surprise For
            </h1>
            <p className="font-handwriting text-3xl sm:text-4xl text-[#E8C374] mb-3 drop-shadow-md">
              Meri Lado ❤️
            </p>

            <p className="text-xs sm:text-sm text-[#C4B8D8] font-light mb-6 px-2">
              Dil tham ke baithiye... Pura surprise taiyyar hai! Theek 12:00 baje raat ko ye parda apne aap uth jayega!
            </p>

            {/* Glowing Countdown Timer Boxes */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 mb-6">
              {/* Hours Box */}
              <div className="bg-[#1C152E]/90 border border-[#E8C374]/30 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#FFF6E3] tracking-tight">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#B4A6CD] font-medium mt-1">
                  Hours
                </span>
              </div>

              {/* Minutes Box */}
              <div className="bg-[#1C152E]/90 border border-[#E8C374]/30 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#E8C374] tracking-tight">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#B4A6CD] font-medium mt-1">
                  Minutes
                </span>
              </div>

              {/* Seconds Box */}
              <div className="bg-[#1C152E]/90 border border-[#E8C374]/30 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#F472B6] tracking-tight">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#B4A6CD] font-medium mt-1">
                  Seconds
                </span>
              </div>
            </div>

            {/* Playful Teaser Bubble if tapped */}
            <AnimatePresence mode="wait">
              {teaserIndex >= 0 && (
                <motion.div
                  key={teaserIndex}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="bg-[#2A1D44]/90 border border-[#F472B6]/40 rounded-2xl p-3 mb-5 text-xs text-[#FDE2E4] shadow-xl"
                >
                  <p className="leading-relaxed font-medium">
                    {TEASER_QUOTES[teaserIndex]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Sneak Peek Button */}
            <button
              onClick={handleSneakPeek}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#E8C374]/20 via-[#F472B6]/25 to-[#E8C374]/20 hover:from-[#E8C374]/30 hover:to-[#F472B6]/35 border border-[#E8C374]/40 text-[#FFF7E8] font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-300 tactile-press group"
            >
              <Eye size={16} className="text-[#E8C374] group-hover:scale-110 transition-transform" />
              <span>Chori Chhupe Dekhna Hai? (Sneak Peek) 👀</span>
            </button>

            <p className="text-[10px] text-[#867A9E] mt-4 flex items-center justify-center gap-1">
              <Clock size={11} className="text-[#E8C374]" />
              Screen will automatically unlock at 00:00:00 without refreshing
            </p>
          </motion.div>

          {/* Headphones tip */}
          <div className="mt-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161124]/80 border border-white/10 text-xs text-[#9E92B5]">
            <Headphones size={13} className="text-[#E8C374]" />
            <span>Keep your sound & headphones ready for 12:00 AM 🎧</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
