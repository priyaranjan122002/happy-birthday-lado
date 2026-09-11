import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Shuffle, Grid, Layers, ArrowRight } from 'lucide-react';
import { ReasonItem } from '../types';
import { playClick } from '../lib/audio';

interface ReasonsDeckProps {
  reasons: ReasonItem[];
}

export const ReasonsDeck: React.FC<ReasonsDeckProps> = ({ reasons }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'card' | 'grid'>('card');

  const handleNextReason = () => {
    playClick('press');
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
  };

  const handleRandomReason = () => {
    playClick('press');
    let nextIdx = Math.floor(Math.random() * reasons.length);
    if (nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1) % reasons.length;
    }
    setCurrentIndex(nextIdx);
  };

  const currentReason = reasons[currentIndex];

  return (
    <section id="reasons-deck" className="py-24 px-4 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#201832] border border-[#E8C374]/30 text-[#E8C374] text-xs uppercase tracking-widest font-semibold mb-3">
          <Heart size={14} className="text-[#F472B6] fill-[#F472B6]" />
          <span>The Little Things That Mean The World</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-luxury text-white mb-4">
          30 Reasons Why <span className="gold-gradient-text italic font-serif">I Love You</span>
        </h2>
        <p className="text-[#A59CB8] text-sm sm:text-base font-light leading-relaxed">
          I could list ten thousand reasons, but let’s start with these 30 favorites. Tap to draw the next one!
        </p>

        {/* View Mode Switcher */}
        <div className="inline-flex items-center p-1 rounded-full bg-[#181226] border border-white/10 mt-6">
          <button
            onClick={() => {
              playClick('press');
              setViewMode('card');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-snap tactile-press ${
              viewMode === 'card'
                ? 'bg-[#E8C374] text-[#120D1F] font-semibold shadow-md'
                : 'text-[#A89CBF] hover:text-white'
            }`}
          >
            <Layers size={13} />
            <span>Interactive Deck</span>
          </button>
          <button
            onClick={() => {
              playClick('press');
              setViewMode('grid');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-snap tactile-press ${
              viewMode === 'grid'
                ? 'bg-[#E8C374] text-[#120D1F] font-semibold shadow-md'
                : 'text-[#A89CBF] hover:text-white'
            }`}
          >
            <Grid size={13} />
            <span>View All 30</span>
          </button>
        </div>
      </div>

      {viewMode === 'card' ? (
        /* ── SINGLE CARD INTERACTIVE DECK ── */
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center perspective-1000">
            {/* Background card stacks for physical depth */}
            <div className="absolute inset-x-8 -bottom-3 h-full bg-[#191329] rounded-3xl border border-white/5 shadow-xl opacity-60 transform rotate-[-2deg] pointer-events-none" />
            <div className="absolute inset-x-4 -bottom-1.5 h-full bg-[#201833] rounded-3xl border border-[#E8C374]/10 shadow-xl opacity-80 transform rotate-[1.5deg] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentReason.id}
                initial={{ opacity: 0, scale: 0.85, y: 20, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20, rotate: 3 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 glass-card p-8 sm:p-10 rounded-3xl border-2 border-[#E8C374]/30 shadow-2xl flex flex-col justify-between bg-gradient-to-br from-[#1F1832] to-[#120D1F]"
              >
                {/* Card Top Details */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-mono text-[#E8C374] font-semibold bg-[#2A203F] px-3 py-1 rounded-full border border-[#E8C374]/20">
                    Reason #{currentReason.id} of {reasons.length}
                  </span>
                  {currentReason.category && (
                    <span className="text-xs text-[#F4C2C2] bg-[#F472B6]/10 px-2.5 py-0.5 rounded-full border border-[#F472B6]/20 font-medium">
                      #{currentReason.category}
                    </span>
                  )}
                </div>

                {/* Main Reason Text */}
                <div className="my-auto py-4">
                  <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-white font-normal leading-relaxed text-center">
                    "{currentReason.text}"
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-[#8F82A6]">
                  <span className="flex items-center gap-1">
                    <Sparkles size={13} className="text-[#E8C374]" />
                    <span>Straight from the heart</span>
                  </span>
                  <span className="font-handwriting text-base text-[#F4C2C2]">Forever yours ❤️</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-10">
            <button
              onClick={handleRandomReason}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#201834] hover:bg-[#2B2144] border border-[#E8C374]/30 text-[#E8C374] text-xs font-semibold shadow-lg hover:scale-105 active:scale-95 transition-snap tactile-press min-h-[44px]"
            >
              <Shuffle size={14} />
              <span>Surprise Me</span>
            </button>

            <button
              onClick={handleNextReason}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E8C374] to-[#C99738] text-[#120D1F] text-xs font-bold shadow-lg shadow-[#E8C374]/20 hover:scale-105 active:scale-95 transition-snap tactile-press min-h-[44px]"
            >
              <span>Next Reason</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* ── ALL 30 REASONS GRID ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#E8C374]/40 transition-kinetic flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-semibold text-[#E8C374] tnum">
                  #{reason.id}
                </span>
                {reason.category && (
                  <span className="text-[10px] text-[#F4C2C2] bg-white/5 px-2 py-0.5 rounded-full">
                    {reason.category}
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-200 font-light leading-relaxed my-2">
                "{reason.text}"
              </p>
              <div className="pt-2 text-right">
                <Heart size={12} className="inline text-[#F472B6] fill-[#F472B6]" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
