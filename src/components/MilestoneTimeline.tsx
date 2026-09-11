import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Coffee, Moon, Compass, HeartHandshake, Cake, Calendar, Heart } from 'lucide-react';
import { Milestone } from '../types';

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({ milestones }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles size={18} className="text-[#E8C374]" />;
      case 'Coffee':
        return <Coffee size={18} className="text-[#E8C374]" />;
      case 'Moon':
        return <Moon size={18} className="text-[#E8C374]" />;
      case 'Compass':
        return <Compass size={18} className="text-[#E8C374]" />;
      case 'Cake':
        return <Cake size={18} className="text-[#F472B6]" />;
      default:
        return <HeartHandshake size={18} className="text-[#E8C374]" />;
    }
  };

  return (
    <section id="our-story" className="py-24 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#201832] border border-[#E8C374]/30 text-[#E8C374] text-xs uppercase tracking-widest font-semibold mb-3">
          <Heart size={12} className="text-[#F472B6] fill-[#F472B6]" />
          <span>The Chapters of Us</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-luxury text-white mb-4">
          Where It All <span className="gold-gradient-text italic font-serif">Began</span>
        </h2>
        <p className="text-[#A59CB8] text-sm sm:text-base font-light leading-relaxed">
          From that very first glance, every single milestone with you has been my favorite memory.
          Here is how our story unfolded...
        </p>
      </div>

      {/* Central Timeline Line */}
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#E8C374]/40 to-transparent" />
        <div className="md:hidden absolute left-4 sm:left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[#E8C374]/40 to-transparent" />

        <div className="space-y-12 sm:space-y-24">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1A1428] border-2 border-[#E8C374] flex items-center justify-center shadow-lg shadow-[#E8C374]/20 z-10">
                  {getIcon(item.iconName)}
                </div>

                {/* Content Card (Left or Right) */}
                <div className="w-full md:w-1/2 pl-10 sm:pl-16 md:pl-0">
                  <div
                    className={`concentric-card-16 p-4 sm:p-8 relative group hover:border-[#E8C374]/40 transition-kinetic shadow-xl ${
                      isEven ? 'md:mr-10' : 'md:ml-10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs uppercase tracking-widest text-[#E8C374] font-semibold">
                        {item.phase}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#C4B8D8] bg-[#2A203F]/60 px-2.5 py-0.5 rounded-full border border-white/5 tnum">
                        <Calendar size={11} />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-serif-luxury text-white mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#C8BFD8] font-light leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="inline-block px-2.5 py-1 rounded-md bg-[#211933] text-[11px] font-medium text-[#F4C2C2] border border-[#F4C2C2]/20">
                      #{item.tag}
                    </div>
                  </div>
                </div>

                {/* Photo Card on opposite side */}
                <div className="w-full md:w-1/2 pl-10 sm:pl-16 md:pl-0">
                  <div
                    className={`relative rounded-2xl overflow-hidden glass-card p-2 group transition-kinetic shadow-xl ${
                      isEven ? 'md:ml-10' : 'md:mr-10'
                    }`}
                  >
                    <div className="relative h-48 sm:h-72 w-full rounded-xl overflow-hidden bg-[#161124]">
                      <img
                        src={item.image || item.fallbackImage}
                        onError={(e) => {
                          if (item.fallbackImage) {
                            (e.target as HTMLImageElement).src = item.fallbackImage;
                          }
                        }}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A16] via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="font-handwriting text-lg text-white drop-shadow-md">
                          {item.date}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/50 text-[#E8C374] backdrop-blur-sm border border-white/10">
                          Memorable
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
