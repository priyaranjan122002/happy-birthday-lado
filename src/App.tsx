import React, { useState } from 'react';
import { siteContent } from './data/content';
import { SurpriseGate } from './components/SurpriseGate';
import { FloatingPetals } from './components/FloatingPetals';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { MilestoneTimeline } from './components/MilestoneTimeline';
import { PolaroidGallery } from './components/PolaroidGallery';
import { CinemaReel } from './components/CinemaReel';
import { ReasonsDeck } from './components/ReasonsDeck';
import { BirthdayFinale } from './components/BirthdayFinale';

export const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0910] text-[#F3EEFA] relative selection:bg-[#E8C374]/30 selection:text-[#FFF7E8]">
      {/* Act 1: Initial Sealed Surprise Gate */}
      {!isUnlocked && (
        <SurpriseGate
          herName={siteContent.herName}
          birthdayDate={siteContent.birthdayDate}
          onUnlock={() => setIsUnlocked(true)}
        />
      )}

      {/* Persistent Floating Romantic Ambient Petals */}
      <FloatingPetals />

      {/* Floating Vinyl Music Player */}
      <MusicPlayer audioSrc={siteContent.bgMusicUrl} autoStart={isUnlocked} />

      {/* Main Experience Flow */}
      <main className={`relative z-20 transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
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
    </div>
  );
};

export default App;
