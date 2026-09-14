import React, { useState, useEffect } from 'react';
import { siteContent } from './data/content';
import { MidnightLockGate } from './components/MidnightLockGate';
import { FloatingPetals } from './components/FloatingPetals';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { MilestoneTimeline } from './components/MilestoneTimeline';
import { PolaroidGallery } from './components/PolaroidGallery';
import { CinemaReel } from './components/CinemaReel';
import { ReasonsDeck } from './components/ReasonsDeck';
import { BirthdayFinale } from './components/BirthdayFinale';

export const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('preview') === 'true' || params.get('unlock') === 'true' || params.get('test') === 'true') {
        return true;
      }
      const targetTime = new Date('2026-09-15T00:00:00+05:30').getTime();
      return Date.now() >= targetTime;
    }
    return false;
  });

  // Freeze scrolling while locked before midnight
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [isUnlocked]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0910] text-[#F3EEFA] relative selection:bg-[#E8C374]/30 selection:text-[#FFF7E8]">
      {/* Before Midnight: Screen Freeze Lock Gate with Live Countdown & Suspense */}
      {!isUnlocked && (
        <MidnightLockGate
          herName={siteContent.herName}
          targetTimestamp="2026-09-15T00:00:00+05:30"
          onUnlock={() => setIsUnlocked(true)}
        />
      )}

      {/* Persistent Floating Romantic Ambient Petals */}
      <FloatingPetals />

      {/* Floating Vinyl Music Player (100% ad-free pure HTML5 audio) */}
      <MusicPlayer audioSrc={siteContent.bgMusicUrl} autoStart={isUnlocked} />

      {/* Main Experience Flow: completely sealed & hidden until midnight 12:00 AM */}
      {isUnlocked && (
        <main className="relative z-20 animate-in fade-in duration-1000">
          {/* Act 2: Hero with Live Love Counter */}
          <HeroSection
            herName={siteContent.herName}
            herNickname={siteContent.herNickname}
            birthdayDate={siteContent.birthdayDate}
            startDate={siteContent.relationshipStartDate}
            subtitle={siteContent.heroSubtitle}
            onScrollToMemories={() => scrollToSection('memories-wall')}
            onScrollToTimeline={() => scrollToSection('our-story')}
            onScrollToLetter={() => scrollToSection('birthday-letter')}
          />

          {/* Act 3: The Story Timeline (From first meeting to today) */}
          <MilestoneTimeline milestones={siteContent.milestones} />

          {/* Act 4: The 30+ Photos Polaroid Memory Vault with 3D Flip */}
          <PolaroidGallery memories={siteContent.memories} />

          {/* Act 5: Cinema Room Tribute Video */}
          <CinemaReel
            videoUrl={siteContent.videoUrl}
            poster={siteContent.videoPoster}
            caption={siteContent.videoCaption}
            videos={siteContent.videos}
          />

          {/* Act 6: 30 Reasons Why I Love You Interactive Deck */}
          <ReasonsDeck reasons={siteContent.reasons} />

          {/* Act 7: Grand Finale Cake Blowout, Love Letter & Send Hearts */}
          <BirthdayFinale
            herName={siteContent.herName}
            birthdayDate={siteContent.birthdayDate}
            letter={siteContent.letter}
          />
        </main>
      )}
    </div>
  );
};

export default App;
