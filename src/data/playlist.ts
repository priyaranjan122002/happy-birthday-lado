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
    id: 'tum-se-hi',
    title: 'Tum Se Hi',
    movie: 'Jab We Met',
    artist: 'Mohit Chauhan',
    src: './music/tum-se-hi.mp3',
    mood: 'Aadha Sa Vaada • Our Forever Song'
  },
  {
    id: 'o-meri-jaan',
    title: 'O Meri Jaan',
    movie: 'Life In A... Metro',
    artist: 'K.K.',
    src: './music/o-meri-jaan.mp3',
    mood: 'Dil Se Dil Tak • For Meri Jaan'
  },
  {
    id: 'sawan-aaya-hai',
    title: 'Sawan Aaya Hai',
    movie: 'Creature 3D',
    artist: 'Arijit Singh',
    src: './music/sawan-aaya-hai.mp3',
    mood: 'Mohabbat Barsa Dena Tu • Soulful'
  },
  {
    id: 'custom-song',
    title: 'Humaara Khas Gaana',
    movie: 'Custom Audio',
    artist: 'Special Dedication',
    src: './music/song.mp3',
    mood: 'Dedicated to Lado ❤️'
  },
  {
    id: 'heartwarming-melody',
    title: 'Heartwarming Romance',
    movie: 'Love Theme',
    artist: 'Soft Piano Melody',
    src: './music/heartwarming.mp3',
    mood: 'Emotional & Warm • Every beat for you'
  }
];

// Backward-compatibility alias
export const BOLLYWOOD_PLAYLIST = ROMANTIC_PLAYLIST;
