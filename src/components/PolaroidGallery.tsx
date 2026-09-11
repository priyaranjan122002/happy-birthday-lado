import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, RotateCw, Eye, Sparkles, Heart } from 'lucide-react';
import { MemoryPhoto, PhotoCategory } from '../types';
import { PhotoModal } from './PhotoModal';
import { playClick, playThud } from '../lib/audio';

interface PolaroidGalleryProps {
  memories: MemoryPhoto[];
}

export const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({ memories }) => {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('all');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories: { label: string; value: PhotoCategory; emoji: string }[] = [
    { label: `All ${memories.length} Memories`, value: 'all', emoji: '📸' },
    { label: 'Special Dates', value: 'dates', emoji: '🥂' },
    { label: 'Our Goofiness', value: 'goofy', emoji: '🤪' },
    { label: 'My Favorites', value: 'favorites', emoji: '💖' },
    { label: 'Adventures & Trips', value: 'trips', emoji: '🚗' },
  ];

  const filteredMemories = activeCategory === 'all'
    ? memories
    : memories.filter((m) => m.category === activeCategory);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClick('press');
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenPhoto = (index: number) => {
    playThud(140, 0.4);
    setSelectedPhotoIndex(index);
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < filteredMemories.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  return (
    <section id="memories-wall" className="py-24 px-4 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#201832] border border-[#E8C374]/30 text-[#E8C374] text-xs uppercase tracking-widest font-semibold mb-3">
          <Camera size={14} className="text-[#F472B6]" />
          <span>The Memory Vault • {memories.length} Candid Moments</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-luxury text-white mb-4">
          Treasured Snapshots, <span className="gold-gradient-text italic font-serif">Infinite Love</span>
        </h2>
        <p className="text-[#A59CB8] text-sm sm:text-base font-light leading-relaxed">
          Every photo carries a piece of our laughter, silly arguments, and warm hugs.
          <br className="hidden sm:block" />
          <span className="text-[#E8C374]">Tip:</span> Click any photo to zoom, or tap the <span className="text-white font-medium">Flip button ↻</span> to read the secret note on the back!
        </p>

        {/* Filter Category Pills with Mobile Horizontal Scroll */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 px-1 max-w-full sm:flex-wrap sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                playClick('press');
                setActiveCategory(cat.value);
              }}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 shrink-0 tactile-press min-h-[44px] ${
                activeCategory === cat.value
                  ? 'bg-gradient-to-r from-[#E8C374] to-[#C99738] text-[#120D1F] font-semibold shadow-lg shadow-[#E8C374]/20 scale-105'
                  : 'bg-[#1C162D]/90 text-[#C4B7DA] hover:bg-[#281F3D] border border-white/10'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              <span className="text-[11px] opacity-70 ml-0.5 tnum">
                ({cat.value === 'all' ? memories.length : memories.filter(m => m.category === cat.value).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 sm:gap-8">
        {filteredMemories.map((photo, index) => {
          const isFlipped = !!flippedCards[photo.id];
          const rotationAngle = photo.rotation || ((index % 5) - 2) * 1.5;

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              style={{ rotate: `${rotationAngle}deg` }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 30 }}
              className="perspective-1000 relative group transition-all duration-300"
            >
              {/* Washi tape visual detail at the top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#E8C374]/50 rounded-xs shadow-sm transform -rotate-2 z-20 pointer-events-none backdrop-blur-xs border-dashed border-t border-b border-white/30" />

              {/* 3D Flippable Card Container */}
              <div
                className={`w-full transition-transform duration-700 transform-style-3d relative ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* ── FRONT OF POLAROID ── */}
                <div
                  onClick={() => handleOpenPhoto(index)}
                  className="bg-[#FFFDF9] rounded-xs p-3 pb-6 shadow-2xl shadow-black/70 border border-[#ECE5D8] cursor-pointer backface-hidden relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Image container */}
                  <div className="relative aspect-square w-full bg-[#181324] overflow-hidden rounded-xs">
                    <img
                      src={photo.src}
                      onError={(e) => {
                        if (photo.fallbackSrc) {
                          (e.target as HTMLImageElement).src = photo.fallbackSrc;
                        }
                      }}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Subtle photo gloss reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                    {/* Quick zoom icon indicator */}
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                      <Eye size={13} />
                    </div>
                  </div>

                  {/* Polaroid handwritten caption area */}
                  <div className="pt-3 px-1">
                    <p className="font-handwriting text-stone-900 text-lg leading-tight font-semibold truncate">
                      {photo.title}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1 font-mono">
                      <span>{photo.date}</span>
                      
                      {/* Flip to read note button */}
                      <button
                        onClick={(e) => toggleFlip(photo.id, e)}
                        className="flex items-center gap-1 text-[11px] text-[#A24D68] hover:text-[#781B38] font-sans font-semibold underline underline-offset-2"
                        title="Flip to read back"
                      >
                        <RotateCw size={11} />
                        <span>Read Note</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── BACK OF POLAROID (Postcard / Secret Note) ── */}
                <div
                  className="absolute inset-0 bg-[#FDFBF7] rounded-xs p-5 shadow-2xl shadow-black/70 border border-[#E6DEC8] backface-hidden rotate-y-180 flex flex-col justify-between text-stone-800"
                >
                  <div>
                    {/* Postcard Header */}
                    <div className="flex items-center justify-between border-b border-stone-300 pb-2 mb-3">
                      <span className="text-[10px] tracking-widest uppercase font-mono text-stone-500">
                        CONFIDENTIAL NOTE
                      </span>
                      {/* Cute stamp */}
                      <div className="w-7 h-9 border border-dashed border-[#B85D77] flex items-center justify-center bg-[#FFF1F4] rounded-xs">
                        <Heart size={13} className="text-[#B85D77] fill-[#B85D77]" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-stone-500 font-mono mb-2">
                      <span>Recorded on: {photo.date}</span>
                    </div>

                    {/* Handwritten heartfelt message */}
                    <p className="font-handwriting text-stone-800 text-lg sm:text-xl leading-relaxed mt-2">
                      "{photo.noteBack}"
                    </p>
                  </div>

                  {/* Flip Back Button */}
                  <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                    <span className="font-handwriting text-xs text-stone-500">Only for you ❤️</span>
                    <button
                      onClick={(e) => toggleFlip(photo.id, e)}
                      className="flex items-center gap-1 text-xs text-stone-700 hover:text-stone-950 font-medium py-1 px-2 rounded bg-stone-100 border border-stone-300"
                    >
                      <RotateCw size={11} />
                      <span>Back to Photo</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <PhotoModal
        photo={selectedPhotoIndex !== null ? filteredMemories[selectedPhotoIndex] : null}
        onClose={() => setSelectedPhotoIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasPrev={selectedPhotoIndex !== null && selectedPhotoIndex > 0}
        hasNext={selectedPhotoIndex !== null && selectedPhotoIndex < filteredMemories.length - 1}
        currentIndex={selectedPhotoIndex ?? 0}
        totalPhotos={filteredMemories.length}
      />
    </section>
  );
};
