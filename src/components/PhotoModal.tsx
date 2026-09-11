import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Heart } from 'lucide-react';
import { MemoryPhoto } from '../types';

interface PhotoModalProps {
  photo: MemoryPhoto | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalPhotos: number;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
  currentIndex,
  totalPhotos,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, hasNext, hasPrev, onNext, onPrev, onClose]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 select-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20 tactile-press"
          title="Close (Esc)"
          aria-label="Close photo modal"
        >
          <X size={22} />
        </button>

        {/* Previous Button */}
        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/10 tactile-press"
            title="Previous Photo"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/10 tactile-press"
            title="Next Photo"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Modal Content Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full max-h-[92vh] bg-[#161224] rounded-2xl overflow-hidden border border-[#E8C374]/30 shadow-2xl flex flex-col md:flex-row"
        >
          {/* Photo display area */}
          <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative min-h-[220px] max-h-[42vh] md:max-h-[80vh]">
            <img
              src={photo.src}
              onError={(e) => {
                if (photo.fallbackSrc) {
                  (e.target as HTMLImageElement).src = photo.fallbackSrc;
                }
              }}
              alt={photo.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Details Sidebar */}
          <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#181326] border-t md:border-t-0 md:border-l border-white/10">
            <div>
              <div className="flex items-center justify-between text-xs text-[#E8C374] mb-3">
                <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                  <Calendar size={13} />
                  {photo.date}
                </span>
                <span className="text-[#A59CB8] font-mono text-[11px]">
                  {currentIndex + 1} / {totalPhotos}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif-luxury text-white mb-3">
                {photo.title}
              </h3>

              <p className="text-sm text-[#C8BFD8] font-light leading-relaxed mb-6">
                {photo.caption}
              </p>

              {/* Secret handwritten card section */}
              <div className="p-4 rounded-xl bg-[#211A33] border border-[#E8C374]/20 relative">
                <div className="flex items-center gap-1.5 text-xs text-[#E8C374] font-medium mb-1.5">
                  <Heart size={12} className="text-[#F472B6] fill-[#F472B6]" />
                  <span>Handwritten Secret Note:</span>
                </div>
                <p className="font-handwriting text-lg sm:text-xl text-[#F4C2C2] leading-snug">
                  "{photo.noteBack}"
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#8A7E9E]">
              <span>Use arrow keys to navigate</span>
              <span className="text-[#E8C374]">❤️ Forever Memory</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
