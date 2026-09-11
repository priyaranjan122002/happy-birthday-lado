# 💖 Birthday Surprise Website for Her (15 September Special)

An ultra-aesthetic, emotional, interactive birthday web experience crafted with deep love, luxury typography, smooth micro-animations, audio player, 3D flip polaroid memory wall, candle-blowing virtual cake, and an unfolding master love letter.

---

## 🚀 How to Run the Website Locally

1. Open your terminal in this folder:
   ```bash
   npm run dev
   ```
2. Click or open the local link shown (e.g. `http://localhost:5173`).
3. Wear headphones 🎧 and click the **Golden Wax Seal** to experience the full reveal!

---

## 📸 How to Add Your 30 Photos & Video (Super Easy!)

### 1. Adding Your 30 Photos:
- Open the folder: `public/photos/`
- Rename your photos as:
  - `photo-1.jpg`
  - `photo-2.jpg`
  - `photo-3.jpg`
  - ... up to `photo-30.jpg`
  *(PNG or JPEG formats both work. If a photo is missing, the site automatically uses an aesthetic romantic fallback so nothing breaks!)*

### 2. Adding Your Video Tribute:
- Open folder: `public/video/`
- Put your video file named: `tribute.mp4`
*(If no video is put, an elegant retro movie poster preview is shown).*

### 3. Adding Your Song / Background Music:
- You can put your favorite romantic MP3 in `public/music/song.mp3` and update `bgMusicUrl` in `src/data/content.ts`, or keep the default romantic piano stream which already plays automatically upon opening the surprise!

---

## ✏️ How to Customize Names, Captions & Dates

Open **`src/data/content.ts`** in your editor. You can easily change:
1. **Her Name & Nickname**:
   ```ts
   herName: "Ananya", // Your GF's actual name
   herNickname: "My Forever Person ✨",
   ```
2. **Start / Meeting Date**:
   ```ts
   relationshipStartDate: "2023-10-18", // YYYY-MM-DD for the live counter
   ```
3. **Photo Captions & Secret Notes**:
   Each photo in the `memories` list has:
   - `title`: Short title on the front
   - `date`: Date/moment tag
   - `caption`: Story behind the photo
   - `noteBack`: The secret handwritten note that appears when she flips the polaroid!
4. **The Master Letter**:
   Edit paragraphs in the `letter` object to pour your heart out.

---

## 🌟 The 7 Acts of the Experience:
1. **Act 1: The Sealed Mystery Gate**: Wax-sealed envelope with headphones reminder; clicking breaks seal with confetti and starts the music.
2. **Act 2: The Grand Birthday Hero**: Luxury gold typography with live "Loving You For X Days, Y Hours, M Minutes, S Seconds" counter and draggable polaroids.
3. **Act 3: The Story Timeline**: "Where It All Began" milestone cards from first glance to today.
4. **Act 4: 30 Photos Memory Vault**: Tactile polaroid grid with washi tape, 3D flip card notes, category filters, and HD lightbox with keyboard navigation.
5. **Act 5: The Cinema Room**: Retro film projector styled video tribute player.
6. **Act 6: 30 Reasons Why I Love You**: Interactive card throwing deck with shuffle & full-grid modes.
7. **Act 7: Grand Finale**: Interactive candle-blowing cake with smoke particles, fireworks shower, parchment paper letter, and infinite hearts tap button!
