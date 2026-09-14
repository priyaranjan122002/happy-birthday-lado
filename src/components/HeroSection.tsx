import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar, Clock, ChevronDown, Camera, BookOpen } from 'lucide-react';
import { playClick, playThud } from '../lib/audio';

interface HeroSectionProps {
  herName: string;
  herNickname: string;
  birthdayDate: string;
  startDate: string;
  subtitle: string;
  onScrollToMemories: () => void;
  onScrollToTimeline: () => void;
  onScrollToLetter: () => void;
}

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  herName,
  herNickname,
  birthdayDate,
  startDate,
  subtitle,
  onScrollToMemories,
  onScrollToTimeline,
  onScrollToLetter,
}) => {
  const [elapsed, setElapsed] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdown, setCountdown] = useState<TimeElapsed & { isBirthday: boolean }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false,
  });
  const [activeTimerTab, setActiveTimerTab] = useState<'countdown' | 'elapsed'>('countdown');

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();

      // Time spent loving her
      const start = new Date(startDate).getTime();
      const differenceElapsed = Math.max(0, now - start);
      setElapsed({
        days: Math.floor(differenceElapsed / (1000 * 60 * 60 * 24)),
        hours: Math.floor((differenceElapsed / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((differenceElapsed / (1000 * 60)) % 60),
        seconds: Math.floor((differenceElapsed / 1000) % 60),
      });

      // Countdown to 15 September 2026 00:00:00 IST
      const bdayTarget = new Date('2026-09-15T00:00:00+05:30').getTime();
      const diffCountdown = bdayTarget - now;

      if (diffCountdown <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
      } else {
        setCountdown({
          days: Math.floor(diffCountdown / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diffCountdown / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diffCountdown / (1000 * 60)) % 60),
          seconds: Math.floor((diffCountdown / 1000) % 60),
          isBirthday: false,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#E8C374]/10 via-[#F472B6]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Floating interactive candid polaroids on the periphery */}
      <motion.div
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        className="hidden lg:block absolute left-8 top-32 cursor-grab active:cursor-grabbing z-20"
        initial={{ opacity: 0, x: -60, rotate: -8 }}
        animate={{ opacity: 1, x: 0, rotate: -6 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="bg-white p-3 pb-8 rounded-sm shadow-2xl shadow-black/60 border border-stone-200 transform rotate-[-6deg] w-48">
          <div className="h-44 bg-stone-900 overflow-hidden relative">
            <img
              src="./photos/photo-1.jpg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=400&auto=format&fit=crop";
              }}
              alt="Memory 1"
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
          <p className="font-handwriting text-stone-800 text-base text-center mt-3 font-semibold">
            First moment with you ✨
          </p>
        </div>
      </motion.div>

      <motion.div
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        whileHover={{ scale: 1.05, rotate: 0 }}
        className="hidden lg:block absolute right-8 top-36 cursor-grab active:cursor-grabbing z-20"
        initial={{ opacity: 0, x: 60, rotate: 8 }}
        animate={{ opacity: 1, x: 0, rotate: 7 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="bg-white p-3 pb-8 rounded-sm shadow-2xl shadow-black/60 border border-stone-200 transform rotate-[7deg] w-48">
          <div className="h-44 bg-stone-900 overflow-hidden relative">
            <img
              src="./photos/photo-2.jpg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop";
              }}
              alt="Memory 2"
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
          <p className="font-handwriting text-stone-800 text-base text-center mt-3 font-semibold">
            My favorite smile ❤️
          </p>
        </div>
      </motion.div>

      {/* Date badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#201832] via-[#2D1B36] to-[#201832] border border-[#E8C374]/40 text-[#E8C374] text-xs sm:text-sm mb-6 backdrop-blur-md shadow-xl"
      >
        <Calendar size={15} className="text-[#E8C374]" />
        <span className="font-semibold tracking-wide uppercase">
          15 September 2026 • The Queen's Birthday Celebration
        </span>
        <Sparkles size={15} className="text-[#F472B6] animate-pulse" />
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-medium tracking-tight text-white leading-[1.1] mb-3">
          Happy Birthday, <br className="sm:hidden" />
          <span className="gold-gradient-text font-serif italic">{herName}</span>
        </h1>
        <p className="font-handwriting text-2xl sm:text-3xl text-[#F4C2C2] mb-6">
          {herNickname}
        </p>
        <p className="text-base sm:text-lg text-[#C8BFD8] max-w-2xl mx-auto font-light leading-relaxed mb-8">
          {subtitle}
        </p>
      </motion.div>

      {/* Timer Mode Toggle Pills */}
      <div className="flex items-center gap-2 mb-4 bg-[#181226]/80 p-1 rounded-full border border-white/10 z-20">
        <button
          onClick={() => {
            playClick('press');
            setActiveTimerTab('countdown');
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all tactile-press ${
            activeTimerTab === 'countdown'
              ? 'bg-[#E8C374] text-[#120D1F] shadow-md'
              : 'text-[#C4B7DA] hover:text-white'
          }`}
        >
          {countdown.isBirthday ? "🎂 Birthday Today!" : "⏳ 15 Sept Countdown"}
        </button>
        <button
          onClick={() => {
            playClick('press');
            setActiveTimerTab('elapsed');
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all tactile-press ${
            activeTimerTab === 'elapsed'
              ? 'bg-[#E8C374] text-[#120D1F] shadow-md'
              : 'text-[#C4B7DA] hover:text-white'
          }`}
        >
          ❤️ Loving You Since Day 1
        </button>
      </div>

      {/* Live Counter Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="concentric-card-24 max-w-2xl w-full mb-12 shadow-2xl relative"
      >
        <div className="concentric-inner p-6 sm:p-8">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#E8C374] font-semibold mb-5">
            <Clock size={15} />
            <span>
              {activeTimerTab === 'countdown'
                ? (countdown.isBirthday ? "Today is 15 September 2026 — Happy Birthday!" : "Counting down to 15 September 2026")
                : "Every Single Second Spent Loving You"}
            </span>
          </div>

          {activeTimerTab === 'countdown' && !countdown.isBirthday ? (
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              <div className="bg-[#120D1F]/90 p-3 sm:p-4 rounded-xl border border-white/5 flex flex-col items-center">
                <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tnum">
                  {countdown.days}
                </span>
                <span className="text-[10px] sm:text-xs text-[#A195B8] uppercase tracking-wider mt-1">Days Left</span>
              </div>
              <div className="bg-[#120D1F]/90 p-3 sm:p-4 rounded-xl border border-white/5 flex flex-col items-center">
                <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tnum">
                  {countdown.hours}
                </span>
                <span className="text-[10px] sm:text-xs text-[#A195B8] uppercase tracking-wider mt-1">Hours</span>
              </div>
              <div className="bg-[#120D1F]/90 p-3 sm:p-4 rounded-xl border border-white/5 flex flex-col items-center">
                <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tnum">
                  {countdown.minutes}
                </span>
                <span className="text-[10px] sm:text-xs text-[#A195B8] uppercase tracking-wider mt-1">Mins</span>
              </div>
              <div className="bg-[#120D1F]/90 p-3 sm:p-4 rounded-xl border border-white/5 flex flex-col items-center">
                <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#E8C374] tnum">
                  {countdown.seconds}
                </span>
                <span className="text-[10px] sm:text-xs text-[#E8C374]/80 uppercase tracking-wider mt-1">Secs</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              <div className="bg-[#120D1F]/90 p-3 sm:p-4 rounded-xl border border-white/5 flex flex-col items-center">
                <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tnum">
                  {elapsed.days}
                </span>
                <span className="text-[10px] sm:text-xs text-[#A195B8] uppercase tracking-wider mt-1">Days</span>
              </div>
              <div className="bg-[#120D1F]/90 p-3 sm:p-4 rounded-xl border border-white/5 flex flex-col items-center">
                <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tnum">
                  {elapsed.hours}
                </span>
                <span className="text-[10px] sm:text-xs text-[#A195B8] uppercase tracking-wider mt-1">Hours</span>
              </div>
              <div className="bg-[#120D1F]/90 p-3 sm:p-4 rounded-xl border border-white/5 flex flex-col items-center">
                <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white tnum">
                  {elapsed.minutes}
                </span>
                <span className="text-[10px] sm:text-xs text-[#A195B8] uppercase tracking-wider mt-1">Minutes</span>
              </div>
              <div className="bg-[#120D1F]/90 p-3 sm:p-4 rounded-xl border border-white/5 flex flex-col items-center">
                <span className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#E8C374] tnum">
                  {elapsed.seconds}
                </span>
                <span className="text-[10px] sm:text-xs text-[#E8C374]/80 uppercase tracking-wider mt-1">Seconds</span>
              </div>
            </div>
          )}

          <p className="text-xs text-[#9E92B5] mt-4 font-light flex items-center justify-center gap-1.5">
            <Heart size={12} className="text-[#F472B6] fill-[#F472B6]" />
            {activeTimerTab === 'countdown' ? 'Waiting for 15 September 2026 ✨' : '...and counting for infinity.'}
          </p>
        </div>
      </motion.div>

      {/* Quick Navigation Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-3.5 z-20"
      >
        <button
          onClick={() => {
            playClick('press');
            onScrollToTimeline();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E8C374] to-[#C99738] text-[#120D1F] font-semibold text-sm shadow-lg shadow-[#E8C374]/25 hover:scale-105 active:scale-95 transition-kinetic tactile-press"
        >
          <span>Our Story Timeline</span>
          <ChevronDown size={16} />
        </button>

        <button
          onClick={() => {
            playClick('press');
            onScrollToMemories();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C162D]/90 hover:bg-[#251D3A] border border-[#E8C374]/30 text-white font-medium text-sm hover:scale-105 active:scale-95 transition-kinetic tactile-press"
        >
          <Camera size={16} className="text-[#F472B6]" />
          <span>30+ Memories Wall</span>
        </button>

        <button
          onClick={() => {
            playClick('press');
            onScrollToLetter();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C162D]/90 hover:bg-[#251D3A] border border-white/10 text-white font-medium text-sm hover:scale-105 active:scale-95 transition-kinetic tactile-press"
        >
          <BookOpen size={16} className="text-[#E8C374]" />
          <span>Birthday Letter</span>
        </button>
      </motion.div>
    </section>
  );
};
