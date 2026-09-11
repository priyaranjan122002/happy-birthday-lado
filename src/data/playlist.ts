export interface BollywoodTrack {
  id: string;
  title: string;
  movie: string;
  artist: string;
  type: 'youtube' | 'local';
  youtubeId?: string;
  localSrc?: string;
  mood: string;
}

export const BOLLYWOOD_PLAYLIST: BollywoodTrack[] = [
  {
    id: 'tum-se-hi',
    title: 'Tum Se Hi',
    movie: 'Jab We Met',
    artist: 'Mohit Chauhan',
    type: 'youtube',
    youtubeId: 'Cb6wuzOurPc',
    mood: 'Soulful • Aadha sa vaada...'
  },
  {
    id: 'kesariya',
    title: 'Kesariya',
    movie: 'Brahmāstra',
    artist: 'Arijit Singh',
    type: 'youtube',
    youtubeId: 'BddP6PYo2gs',
    mood: 'Romantic • Ishq Hai Piya...'
  },
  {
    id: 'apna-bana-le',
    title: 'Apna Bana Le',
    movie: 'Bhediya',
    artist: 'Arijit Singh',
    type: 'youtube',
    youtubeId: 'u2NAuswnTKs',
    mood: 'Emotional • Tu Mera Koi Na...'
  },
  {
    id: 'raataan-lambiyan',
    title: 'Raataan Lambiyan',
    movie: 'Shershaah',
    artist: 'Jubin Nautiyal & Asees Kaur',
    type: 'youtube',
    youtubeId: 'gvyUuxdRdR4',
    mood: 'Sweet • Kaate Kate Na...'
  },
  {
    id: 'pehla-nasha',
    title: 'Pehla Nasha',
    movie: 'Jo Jeeta Wohi Sikandar',
    artist: 'Udit Narayan',
    type: 'youtube',
    youtubeId: '3fw5LXftoZI',
    mood: 'Classic • Pehla Khumaar...'
  },
  {
    id: 'local-song',
    title: 'Your Local MP3',
    movie: 'Custom Audio',
    artist: 'public/music/song.mp3',
    type: 'local',
    localSrc: '/music/song.mp3',
    mood: 'Personal Custom File'
  }
];
