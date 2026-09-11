import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const dropDir = path.join(rootDir, 'DROP_YOUR_PHOTOS_AND_VIDEO_HERE');
const photosTargetDir = path.join(rootDir, 'public', 'photos');
const videoTargetDir = path.join(rootDir, 'public', 'video');
const musicTargetDir = path.join(rootDir, 'public', 'music');

// Ensure target directories exist
[photosTargetDir, videoTargetDir, musicTargetDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.jfif', '.heic', '.gif', '.bmp', '.JPG', '.JPEG', '.PNG']);
const videoExtensions = new Set(['.mp4', '.mov', '.mkv', '.webm', '.avi', '.MP4', '.MOV']);
const audioExtensions = new Set(['.mp3', '.m4a', '.wav', '.aac', '.MP3']);

// Recursively find all files in dropDir
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    try {
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    } catch (err) {
      // Skip inaccessible
    }
  });

  return arrayOfFiles;
}

console.log('\n🔍 Scanning DROP_YOUR_PHOTOS_AND_VIDEO_HERE folder...');
const allFiles = getAllFiles(dropDir);

const imageFiles = [];
const videoFiles = [];
const audioFiles = [];

allFiles.forEach((filePath) => {
  const ext = path.extname(filePath);
  if (imageExtensions.has(ext)) {
    imageFiles.push(filePath);
  } else if (videoExtensions.has(ext)) {
    videoFiles.push(filePath);
  } else if (audioExtensions.has(ext)) {
    audioFiles.push(filePath);
  }
});

// Sort natural alphanumerically
imageFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

console.log(`📸 Found ${imageFiles.length} photo(s)`);
console.log(`🎥 Found ${videoFiles.length} video(s)`);
console.log(`🎵 Found ${audioFiles.length} song(s)\n`);

if (imageFiles.length === 0 && videoFiles.length === 0 && audioFiles.length === 0) {
  console.log('ℹ️ No files found in DROP_YOUR_PHOTOS_AND_VIDEO_HERE folder yet.');
  console.log('👉 Paste your 30 photos and 1 video there, then run this script again!\n');
} else {
  // 1. Copy photos
  imageFiles.forEach((file, index) => {
    const targetName = `photo-${index + 1}.jpg`;
    const targetPath = path.join(photosTargetDir, targetName);
    fs.copyFileSync(file, targetPath);
    console.log(`  ✓ Photo ${index + 1}: ${path.basename(file)} -> public/photos/${targetName}`);
  });

  // 2. Copy videos
  const videoUrls = [];
  if (videoFiles.length > 0) {
    videoFiles.forEach((file, index) => {
      const targetName = index === 0 ? 'tribute.mp4' : `tribute-${index + 1}.mp4`;
      const targetPath = path.join(videoTargetDir, targetName);
      fs.copyFileSync(file, targetPath);
      videoUrls.push(`/video/${targetName}`);
      console.log(`  ✓ Video ${index + 1}: ${path.basename(file)} -> public/video/${targetName}`);
    });
  }

  // 3. Copy music
  if (audioFiles.length > 0) {
    const targetAudio = path.join(musicTargetDir, 'song.mp3');
    fs.copyFileSync(audioFiles[0], targetAudio);
    console.log(`  ✓ Music: ${path.basename(audioFiles[0])} -> public/music/song.mp3`);
  }

  // Write a manifest file so the app knows how many user photos exist
  const manifest = {
    updatedAt: new Date().toISOString(),
    photosCount: imageFiles.length,
    hasVideo: videoFiles.length > 0,
    videosCount: videoFiles.length,
    videoUrls,
    hasAudio: audioFiles.length > 0,
  };

  fs.writeFileSync(
    path.join(rootDir, 'src', 'data', 'mediaManifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`\n🎉 SYNC COMPLETE! All ${imageFiles.length} photos and video are now in the website!`);
}
