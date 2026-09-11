import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc, SkipForward, SkipBack, ListMusic, ChevronUp, ChevronDown, Heart } from 'lucide-react';
import { BOLLYWOOD_PLAYLIST } from '../data/playlist';
import { playClick } from '../lib/audio';

interface MusicPlayerProps {
  audioSrc?: string;
  autoStart?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStart = false }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = BOLLYWOOD_PLAYLIST[currentTrackIndex];

  // PostMessage command to YouTube iframe
  const sendYouTubeCommand = (func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  // Start music on unlock
  useEffect(() => {
    if (autoStart) {
      setIsPlaying(true);
      if (currentTrack.type === 'youtube') {
        setTimeout(() => {
          sendYouTubeCommand('playVideo');
        }, 500);
      } else if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [autoStart, currentTrackIndex]);

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      if (currentTrack.type === 'youtube') {
        sendYouTubeCommand('pauseVideo');
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (currentTrack.type === 'youtube') {
        sendYouTubeCommand('playVideo');
      } else if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % BOLLYWOOD_PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + BOLLYWOOD_PLAYLIST.length) % BOLLYWOOD_PLAYLIST.length;
    setCurrentTrackIndex(prevIdx);
    setIsPlaying(true);
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      sendYouTubeCommand('unMute');
      if (audioRef.current) audioRef.current.muted = false;
    } else {
      setIsMuted(true);
      sendYouTubeCommand('mute');
      if (audioRef.current) audioRef.current.muted = true;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    sendYouTubeCommand('setVolume', [newVol * 100]);
    if (audioRef.current) audioRef.current.volume = newVol;
    if (newVol === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 flex flex-col items-end gap-2 select-none">
      {/* Hidden background YouTube audio player */}
      {currentTrack.type === 'youtube' && currentTrack.youtubeId && (
        <iframe
          key={currentTrack.id}
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?enablejsapi=1&autoplay=1&loop=1&playlist=${currentTrack.youtubeId}&origin=${encodeURIComponent(window.location.origin)}`}
          title="Bollywood Romantic Song"
          className="w-0 h-0 opacity-0 pointer-events-none absolute"
          allow="autoplay; encrypted-media"
        />
      )}

      {/* HTML5 audio for local file fallback */}
      {currentTrack.type === 'local' && (
        <audio
          ref={audioRef}
          src={currentTrack.localSrc}
          loop
          autoPlay={isPlaying}
        />
      )}

      {/* Main Floating Vinyl Music Capsule */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Expandable Volume Slider */}
        <div
          className={`flex items-center bg-[#151122]/95 backdrop-blur-md border border-[#E8C374]/30 rounded-full py-1.5 px-3 transition-all duration-300 shadow-xl ${
            showVolumeSlider ? 'opacity-100 w-24 sm:w-28' : 'opacity-0 w-0 pointer-events-none'
          } overflow-hidden`}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-18 sm:w-20 h-1.5 bg-[#2E2445] rounded-lg appearance-none cursor-pointer accent-[#E8C374]"
            aria-label="Volume"
          />
        </div>

        {/* The Capsule Button */}
        <div className="flex items-center bg-[#161126]/95 hover:bg-[#1E1733] border border-[#E8C374]/35 rounded-full p-1 sm:p-1.5 pl-2.5 sm:pl-3 shadow-2xl backdrop-blur-lg transition-all duration-300 max-w-[calc(100vw-1.5rem)]">
          {/* Spinning Vinyl Record Icon */}
          <button
            onClick={togglePlay}
            className="relative flex items-center justify-center mr-2 cursor-pointer group min-w-[34px] min-h-[34px] tactile-press"
            title={isPlaying ? "Pause Bollywood Song" : "Play Bollywood Song"}
            aria-label="Toggle playback"
          >
            <div className="relative">
              <Disc
                size={26}
                className={`text-[#E8C374] ${
                  isPlaying ? 'animate-[spin_3.5s_linear_infinite]' : 'opacity-80'
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
              </div>
            </div>
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#F472B6] animate-ping" />
            )}
          </button>

          {/* Song Info & Playlist Trigger */}
          <div
            onClick={() => {
              playClick('press');
              setShowPlaylist(!showPlaylist);
            }}
            className="flex flex-col text-left cursor-pointer pr-1 sm:pr-2 max-w-[105px] sm:max-w-[170px]"
          >
            <div className="flex items-center gap-1">
              <span className="text-[11px] sm:text-xs font-serif-luxury text-white font-semibold truncate leading-tight">
                {currentTrack.title}
              </span>
              <Heart size={9} className="text-[#F472B6] fill-[#F472B6] shrink-0" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#A59CB8] truncate leading-tight mt-0.5">
              {currentTrack.movie}
            </span>
          </div>

          {/* Quick Track Controls */}
          <div className="flex items-center gap-0.5 border-l border-white/10 pl-1.5">
            <button
              onClick={() => {
                playClick('press');
                handlePrevTrack();
              }}
              className="p-1.5 text-[#C4B7DA] hover:text-[#E8C374] transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center tactile-press"
              title="Previous Song"
              aria-label="Previous Song"
            >
              <SkipBack size={13} />
            </button>
            <button
              onClick={() => {
                playClick('press');
                handleNextTrack();
              }}
              className="p-1.5 text-[#C4B7DA] hover:text-[#E8C374] transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center tactile-press"
              title="Next Bollywood Song"
              aria-label="Next Song"
            >
              <SkipForward size={13} />
            </button>
            <button
              onClick={() => {
                playClick('press');
                toggleMute();
              }}
              onMouseEnter={() => setShowVolumeSlider(true)}
              className="p-1.5 text-[#C4B7DA] hover:text-[#E8C374] transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center tactile-press"
              title={isMuted ? "Unmute" : "Mute"}
              aria-label="Toggle mute"
            >
              {isMuted || volume === 0 ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
            <button
              onClick={() => {
                playClick('press');
                setShowPlaylist(!showPlaylist);
              }}
              className={`p-1.5 transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center tactile-press ${
                showPlaylist ? 'text-[#E8C374]' : 'text-[#C4B7DA] hover:text-[#E8C374]'
              }`}
              title="Open Bollywood Playlist"
              aria-label="Toggle Playlist"
            >
              <ListMusic size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Bollywood Playlist Dropdown for Mobile & Desktop */}
      {showPlaylist && (
        <div className="w-[calc(100vw-1.5rem)] max-w-xs sm:w-72 bg-[#171228]/95 backdrop-blur-xl border border-[#E8C374]/35 rounded-2xl p-3 shadow-2xl shadow-black/90 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#E8C374] flex items-center gap-1.5">
              <Music size={12} />
              <span>Bollywood Romance</span>
            </span>
            <span className="text-[10px] text-[#A59CB8]">
              {BOLLYWOOD_PLAYLIST.length} Songs
            </span>
          </div>

          <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
            {BOLLYWOOD_PLAYLIST.map((track, idx) => {
              const isSelected = idx === currentTrackIndex;

              return (
                <button
                  key={track.id}
                  onClick={() => {
                    playClick('press');
                    handleSelectTrack(idx);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all tactile-press ${
                    isSelected
                      ? 'bg-[#E8C374]/15 border border-[#E8C374]/40 text-[#FFF4DA]'
                      : 'hover:bg-white/5 text-[#C8BFD8]'
                  }`}
                >
                  <div className="flex flex-col truncate pr-2">
                    <span className="font-medium truncate text-xs">
                      {idx + 1}. {track.title}
                    </span>
                    <span className="text-[10px] text-[#8E82A6] truncate">
                      {track.movie} • {track.mood}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-1 text-[#E8C374] shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8C374] animate-ping" />
                      <span className="text-[9px] font-bold uppercase">PLAYING</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-center text-[#827699] mt-2 pt-2 border-t border-white/5 font-light">
            💡 Tap any song to play instantly
          </p>
        </div>
      )}
    </div>
  );
};
