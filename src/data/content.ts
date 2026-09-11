import { SiteContent } from '../types';

export const siteContent: SiteContent = {
  // ── Basic Info (Easily editable by user) ─────────────────────────
  herName: "Meri Jaan", // Change to her actual name, e.g. "Ananya", "Simran", "Khushi"
  herNickname: "My Forever Person ✨",
  birthdayDate: "15 September 2026",
  birthdayYear: 2026,
  birthdayTargetTimestamp: "2026-09-15T00:00:00",
  relationshipStartDate: "2023-10-18", // YYYY-MM-DD: Change to your actual meeting/anniversary date
  heroSubtitle: "To the girl who made my world brighter, softer, and infinitely more magical. Today is all about celebrating you.",
  
  // ── Audio & Video Configuration ────────────────────────────────
  // You can put your mp3 file in public/music/song.mp3 or use an online URL
  bgMusicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
  
  // Video file: Drop your video into public/video/tribute.mp4 or use YouTube/Drive
  videoUrl: "./video/tribute.mp4",
  videoPoster: "./photos/photo-1.jpg",
  videoCaption: "Every frame with you feels like a favorite movie scene I want to replay forever.",
  videos: [
    {
      id: "v-1",
      title: "Reel 1: 15 Sept Special",
      tag: "Birthday Video",
      url: "./video/tribute.mp4",
      poster: "./photos/photo-1.jpg",
      caption: "Every frame with you feels like a favorite movie scene I want to replay forever."
    },
    {
      id: "v-2",
      title: "Reel 2: Romantic Memories",
      tag: "Forever Us",
      url: "./video/tribute-2.mp4",
      poster: "./photos/photo-2.jpg",
      caption: "Our goofy laughter, your radiant smile, and the best moments together."
    }
  ],

  // ── Act 3: "Our Story" Milestones ──────────────────────────────
  milestones: [
    {
      id: "m-1",
      phase: "Chapter 1",
      title: "Where It All Began",
      date: "The Very First Meeting",
      description: "I still remember the exact outfit you were wearing and how my heart skipped a beat when you first smiled at me. I didn't know then that you'd become my whole world.",
      iconName: "Sparkles",
      image: "./photos/photo-1.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
      tag: "First Glance"
    },
    {
      id: "m-2",
      phase: "Chapter 2",
      title: "Our First Real Date",
      date: "Coffee & Endless Talks",
      description: "Two coffees turned into 3 hours of nonstop conversation. Time literally vanished, and I remember walking back thinking, 'I never want this feeling to end.'",
      iconName: "Coffee",
      image: "./photos/photo-5.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      tag: "Butterfly Moments"
    },
    {
      id: "m-3",
      phase: "Chapter 3",
      title: "The Late Night Drives & Heart-to-Hearts",
      date: "Midnight Conversations",
      description: "Those 2 AM talks when the whole world was asleep, sharing childhood stories, silly fears, and future dreams. That was the moment I realized you're my safest place.",
      iconName: "Moon",
      image: "./photos/photo-9.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      tag: "Pure Magic"
    },
    {
      id: "m-4",
      phase: "Chapter 4",
      title: "Our First Roadtrip & Unplanned Adventures",
      date: "Getting Lost Together",
      description: "Bad playlists, wrong turns, roadside dhabas, and your laughter echoing through the car windows. The destination never mattered — only the person beside me.",
      iconName: "Compass",
      image: "./photos/photo-14.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
      tag: "Crazy Roadtrips"
    },
    {
      id: "m-5",
      phase: "Chapter 5",
      title: "Every Little Everyday Moment",
      date: "The Goofy & Soft Days",
      description: "From cooking disasters to laughing till our stomachs hurt over the dumbest memes. Loving you isn't just about big events — it's about all these golden little everyday moments.",
      iconName: "HeartHandshake",
      image: "./photos/photo-20.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
      tag: "Home In You"
    },
    {
      id: "m-6",
      phase: "Chapter 6",
      title: "15 September — Celebrating You",
      date: "Your Special Birthday",
      description: "Today the world was blessed with the kindest, prettiest, and most radiant soul. May this year bring you all the warmth, joy, and dreams you truly deserve.",
      iconName: "Cake",
      image: "./photos/photo-28.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop",
      tag: "Happy Birthday"
    }
  ],

  // ── Act 4: 30 Photos Memory Vault ─────────────────────────────
  // User can drop photo-1.jpg to photo-30.jpg into public/photos/
  memories: [
    {
      id: "p-1",
      src: "./photos/photo-1.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=700&auto=format&fit=crop",
      title: "The day we couldn't stop laughing",
      date: "Day 1 Vibes",
      caption: "You told that silly joke and I couldn't stop grinning the whole afternoon.",
      noteBack: "P.S. I fell a little more in love with your laugh right here. Never lose that smile.",
      category: "goofy",
      rotation: -2
    },
    {
      id: "p-2",
      src: "./photos/photo-2.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=700&auto=format&fit=crop",
      title: "Golden Hour with my Golden Girl",
      date: "Sunset Date",
      caption: "The sun was setting, but honestly, I was only looking at you.",
      noteBack: "You looked effortlessly stunning. My phone wallpaper for a solid 6 months!",
      category: "favorites",
      rotation: 3
    },
    {
      id: "p-3",
      src: "./photos/photo-3.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=700&auto=format&fit=crop",
      title: "The candid I took when you weren't looking",
      date: "Café Afternoon",
      caption: "Messy hair, deep in thought, and pure perfection.",
      noteBack: "You yelled at me for taking candid shots, but admit it: this is art.",
      category: "favorites",
      rotation: -1.5
    },
    {
      id: "p-4",
      src: "./photos/photo-4.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=700&auto=format&fit=crop",
      title: "Our first crazy selfie",
      date: "Silly Faces",
      caption: "Zero filters, 100% goofiness. Proof that we are weird together.",
      noteBack: "Nobody gets our humor like we do. Best duo in the universe.",
      category: "goofy",
      rotation: 2.5
    },
    {
      id: "p-5",
      src: "./photos/photo-5.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=700&auto=format&fit=crop",
      title: "Road trip high in the hills",
      date: "Weekend Escape",
      caption: "Chilly winds, warm hands, and chai at the edge of the world.",
      noteBack: "Remember how freezing it was? Best cuddle weather ever.",
      category: "trips",
      rotation: -3
    },
    {
      id: "p-6",
      src: "./photos/photo-6.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=700&auto=format&fit=crop",
      title: "That fancy dinner night",
      date: "Anniversary Celebration",
      caption: "Dressed to the nines. I was the luckiest guy in that entire restaurant.",
      noteBack: "Still can't believe you agreed to go out with me. Best decision of my life.",
      category: "dates",
      rotation: 1
    },
    {
      id: "p-7",
      src: "./photos/photo-7.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=700&auto=format&fit=crop",
      title: "Your cute pout",
      date: "Random Tuesday",
      caption: "When you didn't get your ice cream on time.",
      noteBack: "Even when you're dramatically annoyed, you are the cutest human ever.",
      category: "goofy",
      rotation: -2
    },
    {
      id: "p-8",
      src: "./photos/photo-8.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=700&auto=format&fit=crop",
      title: "Strolling under fairy lights",
      date: "Winter Evening",
      caption: "Holding hands in the cold, humming random songs.",
      noteBack: "My hand fits so perfectly in yours. Let's do this forever.",
      category: "dates",
      rotation: 2
    },
    {
      id: "p-9",
      src: "./photos/photo-9.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=700&auto=format&fit=crop",
      title: "By the water side",
      date: "Lake View",
      caption: "Peaceful quiet moments where silence said everything.",
      noteBack: "With you, even quiet moments feel like a symphony.",
      category: "trips",
      rotation: -1
    },
    {
      id: "p-10",
      src: "./photos/photo-10.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=700&auto=format&fit=crop",
      title: "Traditional look on festival day",
      date: "Diwali Vibes",
      caption: "Total main character energy. Saree looks divine on you.",
      noteBack: "Literally took my breath away. Heart rate went 150 bpm.",
      category: "favorites",
      rotation: 3
    },
    {
      id: "p-11",
      src: "./photos/photo-11.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=700&auto=format&fit=crop",
      title: "Rainy day chai and pakodas",
      date: "Monsoon Date",
      caption: "Drenched shoes, fogged glasses, happy hearts.",
      noteBack: "Rain hits differently when you have your favorite person next to you.",
      category: "dates",
      rotation: -2.5
    },
    {
      id: "p-12",
      src: "./photos/photo-12.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?q=80&w=700&auto=format&fit=crop",
      title: "Shopping spree exhaustion",
      date: "Mall Marathon",
      caption: "Carrying 6 bags while you find 'just one more pair'.",
      noteBack: "I'd carry a thousand bags for you any day.",
      category: "goofy",
      rotation: 1.5
    },
    {
      id: "p-13",
      src: "./photos/photo-13.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=700&auto=format&fit=crop",
      title: "Beach breeze and messy hair",
      date: "Seashore Trip",
      caption: "Watching waves crash, leaving footprints on wet sand.",
      noteBack: "I wrote our initials in the sand right after this photo.",
      category: "trips",
      rotation: -3
    },
    {
      id: "p-14",
      src: "./photos/photo-14.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=700&auto=format&fit=crop",
      title: "Movie marathon pillow fort",
      date: "Lazy Sunday",
      caption: "Popcorn everywhere and fell asleep halfway through the film.",
      noteBack: "Watching you sleep peacefully is the most calming thing ever.",
      category: "favorites",
      rotation: 2
    },
    {
      id: "p-15",
      src: "./photos/photo-15.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=700&auto=format&fit=crop",
      title: "Late night ice cream craving",
      date: "1 AM Adventure",
      caption: "Fighting over who gets the last bite of Belgian chocolate.",
      noteBack: "You know I always let you win the last bite 😉",
      category: "dates",
      rotation: -1
    },
    {
      id: "p-16",
      src: "./photos/photo-16.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=700&auto=format&fit=crop",
      title: "That silly Snapchat filter",
      date: "Face Swap Disaster",
      caption: "We laughed until tears came out of our eyes.",
      noteBack: "Still haven't deleted this cursed masterpiece from my gallery.",
      category: "goofy",
      rotation: 2.5
    },
    {
      id: "p-17",
      src: "./photos/photo-17.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=700&auto=format&fit=crop",
      title: "Rooftop acoustic vibes",
      date: "Stargazing Night",
      caption: "Playing guitar badly while you softly sang along.",
      noteBack: "Your voice is my absolute favorite sound in existence.",
      category: "favorites",
      rotation: -2
    },
    {
      id: "p-18",
      src: "./photos/photo-18.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=700&auto=format&fit=crop",
      title: "Picnic under the giant banyan tree",
      date: "Spring Morning",
      caption: "Sandwiches, breeze, and our favorite book.",
      noteBack: "Simple days like this are worth more than gold to me.",
      category: "trips",
      rotation: 1
    },
    {
      id: "p-19",
      src: "./photos/photo-19.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=700&auto=format&fit=crop",
      title: "Cheering you up when stressed",
      date: "Support Squad",
      caption: "Brought your favorite pastries and gave you the tightest hug.",
      noteBack: "I'll always be your biggest cheerleader through everything.",
      category: "favorites",
      rotation: -1.5
    },
    {
      id: "p-20",
      src: "./photos/photo-20.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=700&auto=format&fit=crop",
      title: "The spontaneous carnival ride",
      date: "Ferris Wheel Peak",
      caption: "You held my arm so tight at the top of the wheel!",
      noteBack: "I loved that you trusted me to hold on to you.",
      category: "dates",
      rotation: 3
    },
    {
      id: "p-21",
      src: "./photos/photo-21.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=700&auto=format&fit=crop",
      title: "Post-workout sweaty glow",
      date: "Healthy Era",
      caption: "We lasted 2 days of gym and then ate pizza.",
      noteBack: "At least our couple goals include pizza eating championships.",
      category: "goofy",
      rotation: -2.5
    },
    {
      id: "p-22",
      src: "./photos/photo-22.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=700&auto=format&fit=crop",
      title: "First time trying sushi together",
      date: "Foodie Experiment",
      caption: "The face you made with wasabi was historic.",
      noteBack: "I still have the video clip saved in my favorites folder!",
      category: "goofy",
      rotation: 2
    },
    {
      id: "p-23",
      src: "./photos/photo-23.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=700&auto=format&fit=crop",
      title: "Wandering old town alleys",
      date: "Heritage Walk",
      caption: "Discovering hidden bookstores and quiet alleyways.",
      noteBack: "Every city is ten times more magical when explored with you.",
      category: "trips",
      rotation: -1
    },
    {
      id: "p-24",
      src: "./photos/photo-24.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=700&auto=format&fit=crop",
      title: "Warm cozy sweater season",
      date: "December Magic",
      caption: "Over-sized hoodies borrowed from my closet (that I never got back).",
      noteBack: "You look way cuter in my clothes anyway. Keep them all.",
      category: "favorites",
      rotation: 1.5
    },
    {
      id: "p-25",
      src: "./photos/photo-25.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=700&auto=format&fit=crop",
      title: "Cooking disaster turned master meal",
      date: "Kitchen Chronicles",
      caption: "Burnt garlic bread but the pasta somehow saved the day.",
      noteBack: "As long as we eat together, everything tastes delicious.",
      category: "dates",
      rotation: -2
    },
    {
      id: "p-26",
      src: "./photos/photo-26.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=700&auto=format&fit=crop",
      title: "Museum date holding hands",
      date: "Art Gallery Afternoon",
      caption: "Looking at paintings, but the biggest masterpiece was holding my hand.",
      noteBack: "Cheesy line, but 100% genuine. You are pure art.",
      category: "dates",
      rotation: 2
    },
    {
      id: "p-27",
      src: "./photos/photo-27.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=700&auto=format&fit=crop",
      title: "Morning chai on the balcony",
      date: "Quiet Mornings",
      caption: "Birds chirping, steam rising from ceramic mugs, zero rush.",
      noteBack: "This is what peace looks like to me.",
      category: "favorites",
      rotation: -1.5
    },
    {
      id: "p-28",
      src: "./photos/photo-28.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=700&auto=format&fit=crop",
      title: "Birthday countdown snapshot",
      date: "Eve of 15th Sept",
      caption: "That excited sparkle in your eyes waiting for midnight.",
      noteBack: "Celebrating you is my absolute favorite festival of the year.",
      category: "favorites",
      rotation: 2.5
    },
    {
      id: "p-29",
      src: "./photos/photo-29.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=700&auto=format&fit=crop",
      title: "The endless road ahead",
      date: "Looking Forward",
      caption: "So many new cities, adventures, and milestones left to conquer together.",
      noteBack: "No matter where life takes us, I want you by my side.",
      category: "trips",
      rotation: -2
    },
    {
      id: "p-30",
      src: "./photos/photo-30.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=700&auto=format&fit=crop",
      title: "Forever and always, you and me",
      date: "To Infinity & Beyond",
      caption: "Through every high, every low, and every goofy meme.",
      noteBack: "Happy Birthday my love. Thank you for being you. ❤️",
      category: "favorites",
      rotation: 1
    },
    {
      id: "p-31",
      src: "./photos/photo-31.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=700&auto=format&fit=crop",
      title: "Radiant vibes and your sweetest grin",
      date: "Unforgettable Moments",
      caption: "Whenever you look at me like that, everything else fades away.",
      noteBack: "You make every normal day feel like a celebration.",
      category: "favorites",
      rotation: -2
    },
    {
      id: "p-32",
      src: "./photos/photo-32.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=700&auto=format&fit=crop",
      title: "Our unfiltered silliness",
      date: "Pure Comedy",
      caption: "No one else gets our random jokes quite like you do.",
      noteBack: "We might be weird, but we are weird together.",
      category: "goofy",
      rotation: 2.5
    },
    {
      id: "p-33",
      src: "./photos/photo-33.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=700&auto=format&fit=crop",
      title: "Cherished evening walks",
      date: "City Lights",
      caption: "Walking beside you with no destination in mind — just you and me.",
      noteBack: "My favorite place in the entire world is right next to you.",
      category: "dates",
      rotation: -1.5
    },
    {
      id: "p-34",
      src: "./photos/photo-34.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=700&auto=format&fit=crop",
      title: "My queen, today and forever",
      date: "Happy Birthday",
      caption: "The prettiest smile in the galaxy on the most special day.",
      noteBack: "I love you endlessly, meri jaan. Here's to forever with you!",
      category: "favorites",
      rotation: 1
    }
  ],

  // ── Act 6: 30 Sweet Reasons Why I Love You ─────────────────────
  reasons: [
    { id: 1, text: "The way your eyes light up whenever you see cute dogs on the street.", category: "Sweet" },
    { id: 2, text: "How you always know exactly when I need a hug, without me uttering a single word.", category: "Emotional" },
    { id: 3, text: "Your adorable nose scrunch whenever you burst out laughing.", category: "Cute" },
    { id: 4, text: "The fact that you steal my hoodies and somehow look 1000x better in them.", category: "Goofy" },
    { id: 5, text: "How safe and peaceful your presence feels after a tiring, chaotic day.", category: "Emotional" },
    { id: 6, text: "The passionate way you talk about the little things you love.", category: "Deep" },
    { id: 7, text: "How you hold my hand in crowded places like we're the only two people there.", category: "Romantic" },
    { id: 8, text: "Your signature pout when you are playfully sulking.", category: "Cute" },
    { id: 9, text: "How you remember the smallest, most random details I mentioned weeks ago.", category: "Heartfelt" },
    { id: 10, text: "The cute voice you make when you're sleepy or just woke up.", category: "Adorable" },
    { id: 11, text: "Your kindness towards strangers and animals — your heart is genuinely pure gold.", category: "Soul" },
    { id: 12, text: "How you celebrate my tiny wins like I just won the Olympic gold medal.", category: "Emotional" },
    { id: 13, text: "The way your hair smells like sweet vanilla and rain.", category: "Sensory" },
    { id: 14, text: "Our completely unhinged 2 AM humor that no one else would ever understand.", category: "Goofy" },
    { id: 15, text: "The way you unconsciously reach out to touch my fingers when walking together.", category: "Romantic" },
    { id: 16, text: "How effortlessly gorgeous you look early in the morning with messy hair.", category: "Pure" },
    { id: 17, text: "Your patience with me even when I'm being stubborn or silly.", category: "Gratitude" },
    { id: 18, text: "The way you get excited about food like a 5-year-old on vacation.", category: "Cute" },
    { id: 19, text: "How you make any ordinary car drive feel like a scenic movie sequence.", category: "Magic" },
    { id: 20, text: "Your gentle reassurance whenever self-doubt creeps into my mind.", category: "Anchor" },
    { id: 21, text: "The way you look at me across a crowded room and give that secret wink.", category: "Butterflies" },
    { id: 22, text: "How you make even staying home on a rainy Sunday feel like the best date ever.", category: "Home" },
    { id: 23, text: "Your dramatic reactions when listening to gossip or juicy stories.", category: "Funny" },
    { id: 24, text: "How you believe in my dreams even more fiercely than I do sometimes.", category: "Deep" },
    { id: 25, text: "The sweet notes and texts you send just to check if I had lunch.", category: "Care" },
    { id: 26, text: "How you dance randomly in the kitchen when your favorite tune plays.", category: "Joy" },
    { id: 27, text: "The warmth of your forehead resting against my chest.", category: "Peace" },
    { id: 28, text: "How proud I feel whenever I introduce you as the love of my life.", category: "Pride" },
    { id: 29, text: "Because loving you is the easiest, most natural thing I have ever done.", category: "Soulmate" },
    { id: 30, text: "Because you are you — perfectly, beautifully, unapologetically my favorite person.", category: "Forever" }
  ],

  // ── Act 7: The Master Love Letter ──────────────────────────────
  letter: {
    title: "A Letter From My Heart to Yours",
    greeting: "To My Dearest & Most Special Girl,",
    paragraphs: [
      "I was sitting down thinking about what to give you on your birthday, and I realized that no store-bought gift could ever capture what you mean to me. So I wanted to freeze our memories in time, right here, just for you.",
      "From the first day we met, my world started shifting in the most beautiful ways. Before you, days just passed by. But with you, every sunrise, every stupid argument, every roadside chai, and every quiet car ride has turned into a memory I cherish with all my heart.",
      "You have this rare, glowing light inside you. You make people feel seen, you make dull rooms lively, and you make me feel like the luckiest human alive just by holding my hand. Thank you for your patience, your silly laughs, your unconditional warmth, and for choosing to be my partner in this crazy journey.",
      "On this September 15th, I want you to know: no matter how older we grow, no matter where life leads us, I will always be right beside you — cheering your loudest, wiping your tears, matching your goofy energy, and loving you more with every single heartbeat.",
      "Make the biggest wish today when you blow out the candles, because you deserve every bit of happiness the universe has to offer."
    ],
    signOff: "Forever & Always Yours,",
    sender: "Your Person ❤️"
  }
};
