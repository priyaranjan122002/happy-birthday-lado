export type PhotoCategory = 'all' | 'dates' | 'goofy' | 'favorites' | 'trips';

export interface MemoryPhoto {
  id: string;
  src: string;
  fallbackSrc: string;
  title: string;
  date: string;
  caption: string;
  noteBack: string;
  category: PhotoCategory;
  rotation?: number;
}

export interface Milestone {
  id: string;
  phase: string;
  title: string;
  date: string;
  description: string;
  iconName: string;
  image?: string;
  fallbackImage?: string;
  tag: string;
}

export interface ReasonItem {
  id: number;
  text: string;
  category?: string;
}

export interface LetterContent {
  title: string;
  greeting: string;
  paragraphs: string[];
  signOff: string;
  sender: string;
}

export interface TributeVideo {
  id: string;
  title: string;
  tag: string;
  url: string;
  poster?: string;
  caption?: string;
}

export interface SiteContent {
  herName: string;
  herNickname: string;
  birthdayDate: string; // e.g. "15 September 2026"
  birthdayYear: number;
  birthdayTargetTimestamp: string; // ISO timestamp "2026-09-15T00:00:00"
  relationshipStartDate: string; // "YYYY-MM-DD"
  heroSubtitle: string;
  bgMusicUrl: string;
  videoUrl: string;
  videoPoster: string;
  videoCaption: string;
  videos?: TributeVideo[];
  letter: LetterContent;
  milestones: Milestone[];
  memories: MemoryPhoto[];
  reasons: ReasonItem[];
}
