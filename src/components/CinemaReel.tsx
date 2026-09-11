import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Play, Pause, Maximize, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { playClick } from '../lib/audio';

import { TributeVideo } from '../types';

interface CinemaReelProps {
  videoUrl: string;
  poster: string;
  caption: string;
  videos?: TributeVideo[];
}

export const CinemaReel: React.FC<CinemaReelProps> = ({ videoUrl, poster, caption, videos }) => {
  const videoList = videos && videos.length > 0 ? videos : [{
    id: 'v-default',
    title: 'Reel 1: 15 Sept Special',
    tag: 'Special Memory',
    url: videoUrl,
    poster,
    caption,
  }];

  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);
  const activeVideo = videoList[selectedVideoIndex] || videoList[0];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSelectVideo = (index: number) => {
    if (index === selectedVideoIndex) return;
    playClick('press');
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setHasError(false);
    setSelectedVideoIndex(index);
  };

  const togglePlay = () => {
    playClick('press');
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch((err) => {
        console.log("Video playback note:", err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="cinema-tribute" className="py-24 px-4 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#201832] border border-[#E8C374]/30 text-[#E8C374] text-xs uppercase tracking-widest font-semibold mb-3">
          <Film size={14} className="text-[#F472B6]" />
          <span>The Cinema Room • Our Tribute Reel</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-luxury text-white mb-4">
          Moments in <span className="gold-gradient-text italic font-serif">Motion</span>
        </h2>
        <p className="text-[#A59CB8] text-sm sm:text-base font-light leading-relaxed">
          Some memories are too alive for a still photograph. Hit play and relive our favorite moments.
        </p>
      </div>

      {/* Multiple Video Reels Switcher */}
      {videoList.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {videoList.map((vid, idx) => (
            <button
              key={vid.id || idx}
              onClick={() => handleSelectVideo(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-kinetic flex items-center gap-2 tactile-press min-h-[44px] ${
                selectedVideoIndex === idx
                  ? 'bg-gradient-to-r from-[#E8C374] to-[#C99738] text-[#120D1F] font-semibold shadow-lg shadow-[#E8C374]/30 scale-105'
                  : 'bg-[#1C162D] text-[#C4B7DA] hover:bg-[#281F3D] border border-white/10'
              }`}
            >
              <Film size={14} className={selectedVideoIndex === idx ? 'text-[#120D1F]' : 'text-[#E8C374]'} />
              <span>{vid.title}</span>
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                selectedVideoIndex === idx ? 'bg-black/20 text-[#120D1F]' : 'bg-black/40 text-[#E8C374]'
              }`}>
                {vid.tag}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Cinema Frame with Ambient Glow */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto"
      >
        {/* Ambient Backlight Glow behind screen */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#E8C374]/20 via-[#F472B6]/25 to-[#9333EA]/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0711] border border-[#E8C374]/30 shadow-2xl shadow-black/90 group">
          {/* Top Film Strip Perforation Border */}
          <div className="h-6 bg-[#130E1F] border-b border-white/10 flex items-center justify-between px-4">
            <div className="flex gap-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-xs bg-[#241A38] border border-white/5" />
              ))}
            </div>
            <span className="text-[10px] tracking-widest uppercase text-[#E8C374]/80 font-mono hidden sm:inline">
              {activeVideo.title.toUpperCase()}
            </span>
            <div className="flex gap-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-xs bg-[#241A38] border border-white/5" />
              ))}
            </div>
          </div>

          {/* Video Container Area */}
          <div
            onClick={togglePlay}
            className="relative aspect-video w-full bg-black cursor-pointer flex items-center justify-center overflow-hidden"
          >
            {hasError ? (
              // Beautiful romantic video fallback poster if video fails
              <div className="relative w-full h-full">
                <img
                  src={activeVideo.poster || poster}
                  alt={activeVideo.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-[#E8C374]/90 text-[#120D1F] flex items-center justify-center mb-3 shadow-xl">
                    <Play size={24} className="ml-1 fill-[#120D1F]" />
                  </div>
                  <p className="text-white font-serif-luxury text-xl mb-1">{activeVideo.title}</p>
                  <p className="text-xs text-[#E8C374] max-w-sm">
                    (Playing: <code className="bg-black/60 px-1 py-0.5 rounded text-white">{activeVideo.url}</code>)
                  </p>
                </div>
              </div>
            ) : (
              <video
                key={activeVideo.url}
                ref={videoRef}
                src={activeVideo.url}
                poster={activeVideo.poster || poster}
                onError={() => setHasError(true)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
                playsInline
              />
            )}

            {/* Play Button Overlay (shown when paused) */}
            {!isPlaying && !hasError && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-kinetic">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E8C374] to-[#C99738] p-1 shadow-2xl shadow-[#E8C374]/40 flex items-center justify-center tactile-press"
                >
                  <div className="w-full h-full rounded-full bg-[#1A1428]/90 flex items-center justify-center border border-[#E8C374]/50">
                    <Play size={28} className="text-[#E8C374] fill-[#E8C374] ml-1.5" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* Video Control Bar at Bottom */}
            {!hasError && (
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white min-w-[36px] min-h-[36px] flex items-center justify-center tactile-press"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    onClick={(e) => {
                      playClick('press');
                      toggleMute(e);
                    }}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white min-w-[36px] min-h-[36px] flex items-center justify-center tactile-press"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <span className="text-xs text-white/80 font-mono hidden sm:inline tnum">
                    {activeVideo.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      playClick('press');
                      toggleFullscreen(e);
                    }}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white min-w-[36px] min-h-[36px] flex items-center justify-center tactile-press"
                    title="Fullscreen"
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Film Strip Perforation */}
          <div className="h-6 bg-[#130E1F] border-t border-white/10 flex items-center justify-between px-4">
            <div className="flex gap-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-xs bg-[#241A38] border border-white/5" />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#A69ABF]">
              <Sparkles size={11} className="text-[#E8C374]" />
              <span>Made with Endless Love</span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-xs bg-[#241A38] border border-white/5" />
              ))}
            </div>
          </div>
        </div>

        {/* Video Caption Below Player */}
        <div className="text-center mt-6">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#F4C2C2] leading-relaxed">
            "{activeVideo.caption || caption}"
          </p>
        </div>
      </motion.div>
    </section>
  );
};
