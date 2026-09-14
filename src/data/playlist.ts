export interface SongTrack {
  id: string;
  title: string;
  movie: string;
  artist: string;
  src: string;
  mood: string;
}

export const ROMANTIC_PLAYLIST: SongTrack[] = [
  {
    id: 'romantic-love-theme',
    title: 'Pyaar Ka Ehsaas (Love Theme)',
    movie: 'For Meri Jaan',
    artist: 'Acoustic Piano & Strings',
    src: './music/romantic.mp3',
    mood: 'Soulful & Heartfelt • Dil Ki Baat'
  },
  {
    id: 'heartwarming-melody',
    title: 'Heartwarming Romance',
    movie: 'Our Story',
    artist: 'Soft Piano Melody',
    src: './music/heartwarming.mp3',
    mood: 'Emotional & Warm • Every beat for you'
  },
  {
    id: 'air-prelude',
    title: 'Sukoon (Sweet Whisper)',
    movie: 'Special Moments',
    artist: 'Violin & Acoustic',
    src: './music/air-prelude.mp3',
    mood: 'Sweet & Peaceful • Forever Love'
  },
  {
    id: 'custom-song',
    title: 'Humaara Khas Gaana',
    movie: 'Custom Audio',
    artist: 'Special Dedication',
    src: './music/song.mp3',
    mood: 'Dedicated to Lado ❤️'
  }
];

// Alias for backward compatibility if imported elsewhere
export const BOLLYWOOD_PLAYLIST = ROMANTIC_PLAYLIST;
