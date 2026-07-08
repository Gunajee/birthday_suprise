// ═══════════════════════════════════════════════════
// ALL APP DATA — Edit here to personalise everything
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// CLOUDINARY HELPER
// ═══════════════════════════════════════════════════════════
// Replace YOUR_CLOUD_NAME with your actual Cloudinary cloud name.
// Find it at: https://cloudinary.com/console → top-left of the dashboard
//
// Usage:
//   cloud('image', 'folder/photo.jpg')
//   cloud('video', 'folder/video.mp4')
//   cloud('raw',   'folder/song.mp3')    ← audio files use 'raw'
//
// This saves you typing the full URL for every single asset.
// ═══════════════════════════════════════════════════════════
const CLOUD_NAME = "sgex9jy2"; // ← replace this once

export function cloud(type, publicId) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/${type}/upload/${publicId}`;
}

// Shorthand helpers (optional — just makes the data below cleaner)
const img = (id) => cloud("image", id);
const audio = (id) => cloud("raw", id);
const video = (id) => cloud("video", id);
export const HERO = {
  name: "Princess Rubiga ",
  //photo: "/images/her.jpg", // put her photo here
  // ✅ Cloudinary: use img('birthday/photos/her.jpg') after setting CLOUD_NAME below
  // Or paste the full URL: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v.../her.jpg'
  //photo: "", // e.g. img('birthday/photos/her.jpg')
  photo: img("her.jpg"),
  photoUrl: "https://res.cloudinary.com/sgex9jy2/image/upload/her.jpg", // put her photo here
  tagline: "Every moment with you becomes a beautiful memory.",
};

export const GREETINGS = [
  {
    e: "🌸",
    title: "Forever Wonderful",
    msg: "May today be as beautiful as your smile. Happy Birthday, Pricess Rubi!",
  },
  {
    e: "✨",
    title: "Growing More Beautiful",
    msg: "Every year you grow more wonderful. Wishing you a birthday overflowing with magic.",
  },
  {
    e: "🌺",
    title: "Extraordinary You",
    msg: "You are the reason ordinary days feel extraordinary. Happy Birthday!",
  },
  {
    e: "💫",
    title: "World Became Better",
    msg: "The world became a better place the very day you were born. Celebrate yourself!",
  },
  {
    e: "🎂",
    title: "Favourite Person",
    msg: "Another year older, infinitely more beautiful. Happy Birthday, my favourite person!",
  },
  {
    e: "🌙",
    title: "Brighter Than Stars",
    msg: "You shine brighter than every star in the sky. Happy Birthday, lovely Miss Rubiga san!",
  },
  {
    e: "🌹",
    title: "Colour & Fragrance",
    msg: "Like a rose, you bring colour and fragrance into everyone's life. Happy Birthday!",
  },
  {
    e: "🦋",
    title: "Free & Joyful",
    msg: "May your birthday be as free and joyful as a butterfly in the spring breeze.",
  },
  {
    e: "💎",
    title: "Rare Gem",
    msg: "You are a rare gem — precious, irreplaceable, and breathtakingly beautiful.",
  },
  {
    e: "🌊",
    title: "Endless Dreams",
    msg: "May your dreams flow endlessly like the ocean on this most special day!",
  },
  {
    e: "🕊️",
    title: "Peace & Love",
    msg: "Wishing you peace, love, and every happiness your beautiful heart can hold.",
  },
  {
    e: "🌟",
    title: "Brightest Star",
    msg: "Stars are beautiful, but none shine as bright as you. Happy Birthday!",
  },
  {
    e: "🎵",
    title: "Beautiful Melody",
    msg: "Life with you in it is a melody I never want to stop listening to.",
  },
  {
    e: "🌈",
    title: "After Every Storm",
    msg: "After every storm you stand like a rainbow — colourful, resilient, stunning.",
  },
  {
    e: "🍀",
    title: "Four-Leaf Clover",
    msg: "You are my four-leaf clover — rare, lucky, and the most wonderful find of my life.",
  },
  {
    e: "🌙",
    title: "Moon Admires You",
    msg: "Even the moon admires you every night. Happy Birthday, beautiful soul!",
  },
  {
    e: "💐",
    title: "Bouquet of Wishes",
    msg: "A whole bouquet of birthday wishes for the most beautiful person I know.",
  },
  {
    e: "🎯",
    title: "Bullseye of Grace",
    msg: "You hit the bullseye of kindness, beauty and grace every single day.",
  },
  {
    e: "🕯️",
    title: "Every Wish True",
    msg: "May every candle on your cake be a wish that comes beautifully true this year.",
  },
  {
    e: "🫶",
    title: "Endless Love",
    msg: "You are loved more than words can ever express. Happiest Birthday to you!",
  },
];

export const QUOTES = [
  {
    text: "You are the reason behind many of my smiles.",
    author: "For her, always",
  },
  {
    text: "Some people make life beautiful simply by being in it.",
    author: "Unknown",
  },
  {
    text: "Every smile of yours is a gift to the world.",
    author: "Written for her",
  },
  {
    text: "She has a galaxy inside her that she has yet to fully explore.",
    author: "Atticus",
  },
  { text: "She blooms in the places no one thought to water.", author: "E.H." },
  {
    text: "She remembered who she was and the game changed.",
    author: "Lalah Delia",
  },
  {
    text: "The most beautiful thing a woman can wear is confidence.",
    author: "Blake Lively",
  },
  {
    text: "She is clothed in strength and dignity, and she laughs without fear.",
    author: "Proverbs 31:25",
  },
];

export const TIMELINE = [
  {
    year: "2023",
    icon: "🌱",
    title: "First Hello",
    memory: "The beginning of something beautiful.",
  },
  {
    year: "2024",
    icon: "🌸",
    title: "Growing Closer",
    memory: "Every conversation made life a little brighter.",
  },
  {
    year: "2024",
    icon: "💫",
    title: "Golden Moments",
    memory: "Memories that will last a lifetime.",
  },
  {
    year: "2024",
    icon: "🌟",
    title: "Happy Days",
    memory: "Laughter, joy, and beautiful moments together.",
  },
  {
    year: "2025",
    icon: "🌺",
    title: "Favourite Memories",
    memory: "Times I would re-live a thousand times over.",
  },
  {
    year: "2025",
    icon: "💖",
    title: "Even Closer",
    memory: "Every day with you is a blessing.",
  },
  {
    year: "2026",
    icon: "🎂",
    title: "Today & Always",
    memory: "Happy Birthday. Here's to forever.",
  },
];

export const STORY_CHAPTERS = [
  {
    icon: "🌱",
    title: "First Meeting",
    sub: "The day everything changed",
    desc: "From the very first moment, you had a spark that lit up every room. The universe was quietly designing someone extraordinary — and that someone was you.",
  },
  {
    icon: "🌸",
    title: "Special Moments",
    sub: "Memories I treasure forever",
    desc: "Every laugh, every conversation, every comfortable silence — saved like precious photographs in my heart. You make ordinary Tuesdays feel like celebrations.",
  },
  {
    icon: "💫",
    title: "Fun Memories",
    sub: "The times we laughed the most",
    desc: "Your laughter is the most beautiful sound. In those joyful moments I saw the truest, most beautiful version of you — free, happy, and glowing.",
  },
  {
    icon: "🌟",
    title: "Happy Days",
    sub: "Days I never want to forget",
    desc: "There are days that stay with you forever. The ones you keep returning to in your mind, smiling each time. Those days always involve you.",
  },
  {
    icon: "🌺",
    title: "Favourite Memories",
    sub: "The ones I replay in my mind",
    desc: "If I could bottle a memory, I would choose the ones with you. Quiet, warm, golden. The kind that make life feel worth every moment.",
  },
];

// ── How to get the publicId from Cloudinary ──────────────────
// 1. Go to https://cloudinary.com/console → Media Library
// 2. Click any asset → copy the "Public ID" shown in the panel
// Example public IDs:
//   birthday/photos/2023_beach.jpg   → img('birthday/photos/2023_beach.jpg')
//   birthday/songs/uyire.mp3         → audio('birthday/songs/uyire.mp3')
//   birthday/videos/moments.mp4      → video('birthday/videos/moments.mp4')
// ═══════════════════════════════════════════════════════════

export const SONGS = [
  // ✅ Replace each audio() call with your Cloudinary public ID for that song
  // Example: audio('birthday/songs/uyire_uyire.mp3')
  {
    title: "Brave Women Princess Rubiga",
    film: "Princess Rubiga",
    artist: "Jii",
    e: "🎵",
    url: "https://res.cloudinary.com/sgex9jy2/video/upload/v1783089006/Princess_Rubiga.mp3",
  },
  {
    title: "பறக்கப் பிறந்தவள்",
    film: "இளவரசி ரூபிகா",
    artist: "ஜீ",
    e: "🌙",
    url: "https://res.cloudinary.com/sgex9jy2/video/upload/Brave_Women_Rubi_tamil.mp3",
  },
  {
    title: "Queen of the Night",
    film: "Lokah",
    artist: "Zeba Tommy",
    e: "🌸",
    url: "https://res.cloudinary.com/sgex9jy2/video/upload/Queen_of_the_Night.mp3",
  },
  {
    title: "Oru Naalil",
    film: "Pudhupettai",
    artist: "Yuvan Shankar Raja",
    e: "💫",
    url: "https://res.cloudinary.com/sgex9jy2/video/upload/Oru_Naalil.mp3",
  },
  {
    title: "Believer",
    film: "Imagine Dragons",
    artist: "Imagine Dragons",
    e: "💕",
    url: "https://res.cloudinary.com/sgex9jy2/video/upload/Imagine_Dragons_Believer.mp3",
  },
];

export const VIDEOS = [
  // ✅ Replace each video() call with your Cloudinary public ID for that video
  // Example: video('birthday/videos/our_moments.mp4')
  {
    title: "Birthday Special",
    desc: "A tribute made just for you",
    e: "🎬",
    url: "https://res.cloudinary.com/sgex9jy2/video/upload/v1783442331/Rubiga_Childhood.mp4", //"https://player.cloudinary.com/embed/?cloud_name=sgex9jy2&public_id=Rubiga_Collage",
  },
  {
    title: "Collage Best Moments",
    desc: "A beautiful edit of memories",
    e: "🎥",
    url: "https://res.cloudinary.com/sgex9jy2/video/upload/f_auto,q_auto/Rubiga_Collage.mp4",
  },
  {
    title: "Candid Reel",
    desc: "You when you didn't know anyone was watching",
    e: "📽️",
    url: "https://res.cloudinary.com/sgex9jy2/video/upload/v1783480884/Rubi_Office_h9hl8o.mp4",
  },
];

export const KAVITHAI = [
  {
    title: "உன் புன்னகை",
    lines: [
      "மழலை சிரிப்பில் மாயம் இருந்தது,",
      "மனதில் மட்டும் காயம் இல்லை.,",
      "காலம் கற்ற பாடம் வந்தது,",
      "கண்களில் மட்டும் தூக்கம் இல்லை.",
      "உதட்டில் சிரிப்பு வரைந்தாலும்,",
      "உள்ளம் மட்டும் சிரிக்கவில்லை.",
      "பழைய புகைப்படம் கேட்டது...",
      "நீ தொலைத்தது வயதையா... இல்லை உன்னையா?",
      "இன்று அவள் தலை நிமிர்ந்து நடக்கிறாள்",
      "தன் நிழலுக்கே துணையாக இருக்கிறாள்.",
      "இந்தியா சுதந்திரம் பெற்றுவிட்டது...",
      "ஆனால் பெண்ணின் சுதந்திரம், இன்னும் அனுமதி கேட்டே வர வேண்டுமா? 🌸",
    ],
    translation:
      "Your smile once bloomed with innocent joy, but life's wounds slowly turned it into a silent mask. A nation may have won its freedom, yet why must a woman still seek permission to live as her true self?",
  },
  {
    title: "கண்கள்",
    lines: [
      "மான் விழியில் மாயம் இருந்தது,",
      "மழலை பார்வையில் கவிதை பிறந்தது.",
      "பெரிய விழிகள் பேசவில்லை,",
      "பேசாத கதைகள் மட்டும் மறையவில்லை.",
      "நேற்றைய கண்ணீரின் தடங்கள்,",
      "இன்றும் விழிகளில் நிழலாய் நிற்கின்றன.",
      "உறக்கமில்லா இரவுகள் பல,",
      "ஒவ்வோர் கருவளையமும் ஒரு வரலாறு சொல்கின்றன.",
      "வலியை மறைத்துப் பார்த்தாலும்,",
      "விழிகள் மட்டும் உண்மையை மறைக்கவில்லை.",
      "ஒரு காலத்தில் கடந்த காலத்தைப் பேசிய கண்கள்,",
      "இன்று எதிர்காலத்தை நோக்கி ஒளிர்கின்றன.",
      "அந்தப் பார்வையில் பயம் இல்லை,",
      "தன்னம்பிக்கையின் வெளிச்சம் மட்டும் குறையவில்லை.",
      "இன்று அவள் கண்கள் அழகாக இல்லை...",
      "அவள் கடந்து வந்த வாழ்க்கையே, அவற்றை அழகாக்கியது. 💫",
    ],
    translation:
      "Her beautiful eyes carry the untold stories of sleepless nights, silent tears, and the strength born from every wound she endured.They no longer look back at the pain of yesterday—they shine with courage, hope, and the promise of a brighter tomorrow.",
  },
  {
    title: "பிறந்தநாள்",
    lines: [
      "இன்று ஒரு தேதி அல்ல...",
      "ஒரு தேவதை பூமியில் பூத்த நாள்.",
      "இன்று ஒரு வயது கூடவில்லை...",
      "பல இதயங்களில் நீங்காத நினைவுகள் கூடின.",
      "உன் புன்னகை குறையாதிருக்க,",
      "உன் கனவுகள் தூரம் போகாதிருக்க.",
      "உன் கண்களில் கண்ணீர் வந்தாலும்,",
      "அது ஆனந்தத்தின் துளியாக மட்டுமே இருக்க.",
      "உன் பாதை எத்தனை நீண்டாலும்,",
      "நம்பிக்கை உன் நிழலாக நடக்கட்டும்.",
      "உன் மனம் எத்தனை முறை உடைந்தாலும்,",
      "ஒவ்வொரு முறையும் முன்பைவிட வலிமையாக மலரட்டும்.",
      "உலகம் உன்னை மாற்ற முயன்றாலும்,",
      "உன் அழகான மனதை மட்டும் மாற்ற முடியாதிருக்கட்டும்.",
      "பிறந்த நாளை கொண்டாடுவது வயதை அல்ல...",
      "உன்னைப் போன்ற ஒரு மனிதரை பெற்ற இந்த உலகத்தின் அதிர்ஷ்டத்தை.",
      "இனிய பிறந்த நாள் வாழ்த்துகள்!",
      "உன் வாழ்க்கையின் ஒவ்வொரு நாளும்,",
      "இன்றைய புன்னகையை விட இன்னும் அழகாக மலரட்டும்...!  🌺",
    ],
    translation:
      "Today is not just your birthday—it is the day the world was blessed with a beautiful soul whose smile, kindness, and strength continue to inspire every heart. May your dreams always bloom, your smile never fade, and every new year of your life be brighter, happier, and more beautiful than the last. 🌸",
  },
  {
    title: "நட்பு",
    lines: [
      "உறவுகள் பல வந்தாலும்,",
      "உண்மையான நட்பு ஒன்று போதும்.",
      "சிரிக்கும் நேரத்தில் கைதட்டுவது பலர்,",
      "அழும் நேரத்தில் கைப்பிடிப்பது நண்பன்.",
      "தூரம் பிரித்தாலும் மனம் பிரியாது,",
      "காலம் மாறினாலும் பாசம் குறையாது.",
      "நினைவுகள் மங்கினாலும்,",
      "நட்பின் தடங்கள் அழியாது.",
      "வாழ்க்கை ஒரு பயணம் என்றால்,",
      "அதில் கிடைத்த அழகான பரிசு — நட்பு. 🫶",
    ],
    translation:
      "True friendship isn't measured by the smiles we share, but by the hands that never let go when life becomes difficult. Time may change everything, but a genuine friend remains life's most precious and unforgettable gift.",
  },
  {
    title: "துணிச்சலான பெண்",
    lines: [
      "புயல் வந்தால் பணியவில்லை,",
      "புன்னகையோடு போராடினாள்",
      "கண்ணீர் வந்தால் கலங்கவில்லை,",
      "கனவுகளோடு நடந்துவந்தாள்.",
      "உலகம் அவளை உடைக்க நினைத்தது,",
      "உறுதியால் தன்னை வடித்துக்கொண்டாள்.",
      "தோல்வி கதவைத் தட்டினாலும்,",
      "தன்னம்பிக்கை கதவைத் திறந்தாள்.",
      "விழுந்த ஒவ்வொரு முறையும்,",
      "முன்பைவிட உயரமாக எழுந்தாள்.",
      "அவள் பலம் குரலில் இல்லை,",
      "அமைதிக்குள் மறைந்த தைரியத்தில்.",
      "அவள் அழகு முகத்தில் இல்லை,",
      "வலியை வென்ற மனதில் இருந்தது.",
      "அவள் ஒரு சாதாரண பெண் அல்ல...",
      "வாழ்க்கையையே வெல்லப் பிறந்த துணிச்சலான பெண். ✨",
    ],
    translation:
      "She is not defined by the storms she faced, but by the courage with which she rose stronger every single time.✨",
  },
  {
    title: "இதயம்",
    lines: [
      "முகம் மறைக்கும் பல உண்மைகளை,",
      "இதயம் மட்டும் மறைக்கத் தெரியாது.",
      "சிரித்துக் கொண்டே இருந்தாலும்,",
      "சில வலிகள் அதற்குள் அழுதுகொண்டே இருக்கும்.",
      "கண்ணால் சொல்ல முடியாததை,",
      "இதயம் அமைதியில் சொல்லிவிடும்.",
      "உடைந்த பிறகும் வெறுக்காமல்,",
      "மீண்டும் நேசிக்கத் துணியும்.",
      "காயங்கள் ஆயிரம் இருந்தாலும்,",
      "கருணை மட்டும் குறைவதில்லை.",
      "உலகம் பலமுறை மாறினாலும்,",
      "இதயத்தின் அன்பு மாறுவதில்லை.",
      "அதனால் தான்...",
      "அழகான முகங்கள் பல இருக்கலாம்,",
      "ஆனால் அழகான இதயம் அரிதாகவே பிறக்கிறது. 💖",
    ],
    translation:
      "The heart is not just an organ—it is the silent home where love, pain, hope, and strength come alive. ❤️",
  },
];

// ═══════════════════════════════════════════════════════════
// MEMORY_GALLERY — 50+ photos, each entry = one photo.
//
// `year` drives the filter tabs. Add as many entries as you like —
// the gallery paginates (12 at a time) so performance stays smooth.
//
// ── Using Cloudinary ────────────────────────────────────────
// Set photoUrl using the img() helper defined above:
//   photoUrl: img('birthday/photos/2023_beach.jpg')
//
// Or paste the full Cloudinary URL directly:
//   photoUrl: 'https://res.cloudinary.com/YOUR_CLOUD/image/upload/v.../photo.jpg'
//
// Leaving photoUrl blank shows a gradient placeholder — fine until
// you've uploaded the real photos.
//
// ── Cloudinary image optimisation tips ──────────────────────
// Add transformation parameters to the URL for faster loading:
//   Auto quality + auto format (WebP/AVIF when supported):
//   img('birthday/photos/photo.jpg').replace('/upload/', '/upload/q_auto,f_auto/')
//
//   Resize to a max width of 800px (good for gallery thumbnails):
//   img('birthday/photos/photo.jpg').replace('/upload/', '/upload/w_800,c_limit,q_auto,f_auto/')
// ═══════════════════════════════════════════════════════════
export const MEMORY_GALLERY = [
  {
    id: 1,
    year: "👶 Little Steps",
    label: "First Smile 🌸",
    note: "The smile that started everything.",
    photoUrl: img("v1783088911/Child_rubi.jpg"), //"/images/IMG_20260630_081051.jpg.jpeg",https://res.cloudinary.com/sgex9jy2/image/upload/v1783088932/IMG_20260630_081051.jpg.jpg
    grad: "linear-gradient(135deg,#1a0530,#30050f)",
  },
  {
    id: 2,
    year: "👶 Little Steps",
    label: "Early Days 🍃",
    note: "Before everything began, quietly.",
    photoUrl: img("20191125_194537.jpg"),
    grad: "linear-gradient(135deg,#0a2030,#1a0530)",
  },
  {
    id: 3,
    year: "🌱 New Beginnings",
    label: "Together 💕",
    note: "Two hearts, one beautiful moment.",
    photoUrl: img("IMG_20260630_064119.jpg.jpg"), //"/images/IMG_20260630_064119.jpg.jpeg",
    grad: "linear-gradient(135deg,#300510,#1a0530)",
  },
  {
    id: 4,
    year: "👶 Little Steps",
    label: "Laughing 😄",
    note: "The kind of laugh that's impossible to fake.",
    photoUrl: img("20180825_125521.jpg"), //img("IMG-20241109-WA0016.jpg"), //"/images/IMG-20241109-WA0016.jpg",
    grad: "linear-gradient(135deg,#1a3010,#0a2030)",
  },
  {
    id: 5,
    year: "💫 Dream Chaser",
    label: "Golden Days ✨",
    note: "Days golden enough to frame forever.",
    photoUrl: img("v1783088908/Snapchat-2024068338.jpg"), //"/images/Snapchat-2024068338.jpg",
    //https://res.cloudinary.com/sgex9jy2/image/upload/v1783088908/Snapchat-2024068338.jpg
    grad: "linear-gradient(135deg,#051030,#1a0530)",
  },
  {
    id: 6,
    year: "💫 Dream Chaser",
    label: "Adventure 🗺️",
    note: "Getting a little lost, on purpose.",
    photoUrl: img("Snapchat-1773010792.jpg"), //"/images/Snapchat-1773010792.jpg",
    grad: "linear-gradient(135deg,#302010,#1a0530)",
  },
  {
    id: 7,
    year: "🌱 New Beginnings",
    label: "Joy 🌟",
    note: "Pure, unfiltered, radiant joy.",
    photoUrl: img("IMG-20260628-WA0050.jpg.jpg"), //"/images/IMG-20260628-WA0050.jpg.jpeg",
    grad: "linear-gradient(135deg,#051520,#1a0530)",
  },
  {
    id: 8,
    year: "🎉 Crazy Memories",
    label: "Quiet Moments 🌙",
    note: "The in-between moments I treasure most.",
    photoUrl: img("IMG-20260207-WA0051.jpg.jpg"), //"/images/IMG-20260207-WA0051.jpg.jpeg",
    grad: "linear-gradient(135deg,#0a1030,#1a0530)",
  },
  {
    id: 9,
    year: "🌱 New Beginnings",
    label: "Memories 🌺",
    note: "Moments I replay a thousand times.",
    photoUrl: img("IMG-20260628-WA0001.jpg"), //"/images/IMG-20260628-WA0001.jpg",
    grad: "linear-gradient(135deg,#30100a,#30050f)",
  },
  {
    id: 10,
    year: "🎉 Crazy Memories",
    label: "Celebration 🎉",
    note: "Every reason to celebrate, taken.",
    photoUrl: img("IMG-20260628-WA0056.jpg.jpeg"),
    grad: "linear-gradient(135deg,#301a10,#30050a)",
  },
  {
    id: 11,
    year: "✨ Living the Dream",
    label: "Beautiful 💖",
    note: "Life is beautiful because of you.",
    photoUrl: img("IMG20250423142012.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 12,
    year: "✨ Living the Dream",
    label: "Warm Light ☀️",
    note: "Golden hour, every time.",
    photoUrl: img("IMG-20260628-WA0025.jpg"),
    grad: "linear-gradient(135deg,#302010,#301005)",
  },
  {
    id: 13,
    year: "💫 Dream Chaser",
    label: "Birthday 🎂",
    note: "Happiest Birthday, my dearest angel.",
    photoUrl: img("IMG-20260510-WA0005.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 14,
    year: "🎉 Crazy Memories",
    label: "Radiant Smile 😊",
    note: "A smile that brightens every heart.",
    photoUrl: img("IMG_20251127_094033026.jpg"), //"/images/IMG_20251127_094033026.jpg",https://res.cloudinary.com/sgex9jy2/image/upload/v1783088920/IMG_20251127_094033026.jpg
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 15,
    year: "💫 Dream Chaser",
    label: "Sweet Innocence 🌷",
    note: "The beauty of being effortlessly yourself.",
    photoUrl: img("IMG-20241102-WA0034.jpg"),
    grad: "linear-gradient(135deg,#0a2030,#1a0530)",
  },
  {
    id: 16,
    year: "🌱 New Beginnings",
    label: "Dreamy Eyes ✨",
    note: "Eyes that quietly tell a thousand stories.",
    photoUrl: img("IMG_20260630_063903.jpg.jpg"), //"/images/IMG_20260630_063903.jpg.jpeg",https://res.cloudinary.com/sgex9jy2/image/upload/v1783088925/IMG_20260630_063903.jpg.jpg
    grad: "linear-gradient(135deg,#300510,#1a0530)",
  },
  {
    id: 17,
    year: "🎉 Crazy Memories",
    label: "Happy Moments 💕",
    note: "Joy captured forever in a single frame.",
    photoUrl: img("IMG_20260630_080804.jpg.jpg"), //"/images/IMG_20260630_080804.jpg.jpeg",
    grad: "linear-gradient(135deg,#1a3010,#0a2030)",
  },
  {
    id: 18,
    year: "🎉 Crazy Memories",
    label: "Golden Memories 🌅",
    note: "Some sunsets never truly end.",
    photoUrl: img("IMG_20260630_081536.jpg.jpeg"),
    grad: "linear-gradient(135deg,#051030,#1a0530)",
  },
  {
    id: 19,
    year: "🎉 Crazy Memories",
    label: "Beautiful Soul 💖",
    note: "Kindness shines brighter than beauty.",
    photoUrl: img("IMG_20260630_081429.jpg.jpeg"),
    grad: "linear-gradient(135deg,#302010,#1a0530)",
  },
  {
    id: 20,
    year: "🌱 New Beginnings",
    label: "Elegant Grace 👑",
    note: "Grace is your natural language.",
    photoUrl: img("IMG-20250503-WA0005.jpg"),
    grad: "linear-gradient(135deg,#051520,#1a0530)",
  },
  {
    id: 21,
    year: "💫 Dream Chaser",
    label: "Morning Glow ☀️",
    note: "Every sunrise reminds me of your smile.",
    photoUrl: img("IMG-20240908-WA0001.jpg"),
    grad: "linear-gradient(135deg,#0a1030,#1a0530)",
  },
  {
    id: 22,
    year: "✨ Living the Dream",
    label: " Dreams Achieved 🚀",
    note: "Today’s ordinary moments are tomorrow’s treasures.",
    photoUrl: img("IMG_20260613_220240.jpg"), //"/images/IMG_20260613_220240.jpg.jpeg",
    grad: "linear-gradient(135deg,#30100a,#30050f)",
  },
  {
    id: 23,
    year: "👶 Little Steps",
    label: "Pure Happiness 🌈",
    note: "Happiness looks beautiful on you.",
    photoUrl: img("20180713_123356.jpg"), //https://res.cloudinary.com/sgex9jy2/image/upload/20180713_123356.jpg
    grad: "linear-gradient(135deg,#301a10,#30050a)",
  },
  {
    id: 24,
    year: "🎉 Crazy Memories",
    label: "Precious Smile 💫",
    note: "A smile worth preserving forever.",
    photoUrl: img("IMG-20251031-WA0013.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 25,
    year: "✨ Living the Dream",
    label: "Blooming Beauty 🌺",
    note: "Like a flower, you blossom in every season.",
    photoUrl: img("Sari_Rubi.jpg"),
    grad: "linear-gradient(135deg,#302010,#301005)",
  },
  {
    id: 26,
    year: "✨ Living the Dream",
    label: "Peaceful Heart 🤍",
    note: "Calmness follows wherever you go.",
    photoUrl: img("Snapchat-1600616079.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 27,
    year: "🎉 Crazy Memories",
    label: "Sunshine Girl 🌞",
    note: "You carry your own sunshine everywhere.",
    photoUrl: img("IMG20221020090707.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 28,
    year: "🎉 Crazy Memories",
    label: "Colorful Days 🎨",
    note: "Life became brighter with every memory.",
    photoUrl: img("IMG-20260222-WA0002.jpg"),
    grad: "linear-gradient(135deg,#051030,#1a0530)",
  },
  {
    id: 29,
    year: "💫 Dream Chaser",
    label: "Natural Beauty 🍃",
    note: "Nothing compares to genuine beauty.",
    photoUrl: img("IMG-20260223-WA0021.jpg"),
    grad: "linear-gradient(135deg,#300510,#1a0530)",
  },
  {
    id: 30,
    year: "🌱 New Beginnings",
    label: "Magic Moment ✨",
    note: "One photo, countless emotions.",
    photoUrl: img("IMG-20260227-WA0015.jpg.jpeg"),
    grad: "linear-gradient(135deg,#302010,#1a0530)",
  },
  {
    id: 31,
    year: "✨ Living the Dream",
    label: "Weekend Vibes 🌻",
    note: "The happiest days deserve to be remembered.",
    photoUrl: img("IMG-20260305-WA0015.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 32,
    year: "✨ Living the Dream",
    label: "Lovely Smile 🌹",
    note: "Some smiles stay in the heart forever.",
    photoUrl: img("IMG-20231210-WA0095.jpg"),
    grad: "linear-gradient(135deg,#30100a,#30050f)",
  },
  {
    id: 33,
    year: "✨ Living the Dream",
    label: "Special Day 🎁",
    note: "Every day with you feels special.",
    photoUrl: img("IMG-20260329-WA0028.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 34,
    year: "💫 Dream Chaser",
    label: "Bright Future 🌠",
    note: "The future shines beautifully ahead.",
    photoUrl: img("IMG-20260510-WA0004.jpg"),
    grad: "linear-gradient(135deg,#051520,#1a0530)",
  },
  {
    id: 35,
    year: "✨ Living the Dream",
    label: "Everlasting Memory 📸",
    note: "Photos fade, memories never do.",
    photoUrl: img("IMG-20260628-WA0002.jpg"),
    grad: "linear-gradient(135deg,#302010,#301005)",
  },
  {
    id: 36,
    year: "🌱 New Beginnings",
    label: "Happy Journey 🚶‍♀️",
    note: "Every step creates another story.",
    photoUrl: img("IMG-20260628-WA0004.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 37,
    year: "✨ Living the Dream",
    label: "Princess Moments 👸",
    note: "Every queen begins as someone's princess.",
    photoUrl: img("IMG-20260628-WA0008.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 38,
    year: "✨ Living the Dream",
    label: "Little Surprises 🎈",
    note: "Life's sweetest gifts are unexpected.",
    photoUrl: img("IMG-20260628-WA0011.jpg"),
    grad: "linear-gradient(135deg,#302010,#1a0530)",
  },
  {
    id: 39,
    year: "✨ Living the Dream",
    label: "Golden Heart 💛",
    note: "Your kindness is your greatest beauty.",
    photoUrl: img("IMG-20231210-WA0023.jpg"),
    grad: "linear-gradient(135deg,#301a10,#30050a)",
  },
  {
    id: 40,
    year: "🎉 Crazy Memories",
    label: "Silent Happiness 🌙",
    note: "Some happiness speaks without words.",
    photoUrl: img("IMG-20230112-WA0042.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 41,
    year: "✨ My Family",
    label: "Beautiful Evening 🌇",
    note: "Evenings become magical with beautiful memories.",
    photoUrl: img("IMG-20220617-WA0062.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 42,
    year: "✨ Living the Dream",
    label: "Lovely Laugh 😂",
    note: "Laughter is your most beautiful accessory.",
    photoUrl: img("IMG-20260628-WA0020.jpg"),
    grad: "linear-gradient(135deg,#302010,#301005)",
  },
  {
    id: 43,
    year: "✨ Living the Dream",
    label: "Memorable Day 🌼",
    note: "A day worth reliving again and again.",
    photoUrl: img("IMG-20260628-WA0023.jpg"),
    grad: "linear-gradient(135deg,#051030,#1a0530)",
  },
  {
    id: 44,
    year: "🎉 Crazy Memories",
    label: "Heartwarming Smile ❤️",
    note: "A smile capable of melting worries away.",
    photoUrl: img("IMG-20260628-WA0026.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 45,
    year: "🌱 New Beginnings",
    label: "Graceful Moments 🌹",
    note: "Beauty lives in every graceful move.",
    photoUrl: img("IMG-20260628-WA0028.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 46,
    year: "🎉 Crazy Memories",
    label: "New Adventures 🌍",
    note: "Every journey begins with a smile.",
    photoUrl: img("IMG-20260628-WA0037.jpg.jpg"),
    grad: "linear-gradient(135deg,#302010,#1a0530)",
  },
  {
    id: 47,
    year: "💫 Dream Chaser",
    label: "Sparkling Eyes ✨",
    note: "Your eyes hold the brightest dreams.",
    photoUrl: img("IMG-20260628-WA0046.jpg"),
    grad: "linear-gradient(135deg,#30100a,#30050f)",
  },
  {
    id: 48,
    year: "🌱 New Beginnings",
    label: "Calm Moments 🍂",
    note: "Peace has a beautiful face.",
    photoUrl:
      "https://res.cloudinary.com/sgex9jy2/image/upload/v1783088873/IMG-20260628-WA0047.jpg",
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 49,
    year: "✨ Living the Dream",
    label: "Simple Happiness 🌼",
    note: "The smallest moments often mean the most.",
    photoUrl: img("IMG20250423142004.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 50,
    year: "🎉 Crazy Memories",
    label: "Forever Favorite 💝",
    note: "Some memories never lose their shine.",
    photoUrl: img("Rubi1.jpg.jpeg"),
    grad: "linear-gradient(135deg,#302010,#301005)",
  },
  {
    id: 51,
    year: "👶 Little Steps",
    label: "Cute Moments 🐻",
    note: "Every picture tells a gentle story.",
    photoUrl: img("Snapchat-109587913.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 52,
    year: "🎉 Crazy Memories",
    label: "Lovely Pose 📷",
    note: "Captured with effortless elegance.",
    photoUrl: img("rubi2.jpg.jpeg"),
    grad: "linear-gradient(135deg,#302010,#1a0530)",
  },
  {
    id: 53,
    year: "💫 Dream Chaser",
    label: "Happy Vibes 🌸",
    note: "Your joy is wonderfully contagious.",
    photoUrl: img("Snapchat-99291028.jpg"),
    grad: "linear-gradient(135deg,#30100a,#30050f)",
  },
  {
    id: 54,
    year: "👶 Little Steps",
    label: "Sweet Memory 🍭",
    note: "A memory wrapped in happiness.",
    photoUrl: img("IMG-20220501-WA0041.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 55,
    year: "👶 Little Steps",
    label: "Dream Big 🌠",
    note: "Every dream begins with hope.",
    photoUrl: img("IMG-20220309-WA0024.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 56,
    year: "🎉 Crazy Memories",
    label: "Color Splash 🌈",
    note: "Life is brighter with your colors.",
    photoUrl: img("IMG_20260704_224207.jpg"),
    grad: "linear-gradient(135deg,#051030,#1a0530)",
  },
  {
    id: 57,
    year: "👶 Little Steps",
    label: "Angel Face 😇",
    note: "Kindness reflected in every smile.",
    photoUrl: img("IMG-20210713-WA0039.jpg"),
    grad: "linear-gradient(135deg,#302010,#301005)",
  },
  {
    id: 58,
    year: "🎉 Crazy Memories",
    label: "Bright Smile 🌞",
    note: "A smile that lights every room.",
    photoUrl: img("IMG_20260704_223159.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 59,
    year: "✨ Living the Dream",
    label: "Special Chapter 📖",
    note: "Every chapter becomes unforgettable.",
    photoUrl: img("Snapchat-1512187000.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 60,
    year: "💫 Dream Chaser",
    label: "Heart of Gold 💛",
    note: "Your heart makes every moment beautiful.",
    photoUrl: img("IMG-20211221-WA0001.jpg"),
    grad: "linear-gradient(135deg,#302010,#1a0530)",
  },
  {
    id: 61,
    year: "💫 Dream Chaser",
    label: "Unforgettable 🌹",
    note: "Some moments are simply timeless.",
    photoUrl: img("IMG-20211128-WA0028.jpg"),
    grad: "linear-gradient(135deg,#30100a,#30050f)",
  },
  {
    id: 62,
    year: "✨ Living the Dream",
    label: "Endless Joy 🎊",
    note: "Joy that never fades away.",
    photoUrl: img("Snapchat-1719689459.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 63,
    year: "✨ Living the Dream",
    label: "Gentle Soul 🍃",
    note: "Softness is your greatest strength.",
    photoUrl: img("Snapchat-1902787221.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 64,
    year: "🌱 New Beginnings",
    label: "Perfect Frame 🖼️",
    note: "A picture worth remembering forever.",
    photoUrl: img("v1783088932/IMG_20260630_081051.jpg.jpg"), //"/images/IMG_20260630_081051.jpg.jpeg",https://res.cloudinary.com/sgex9jy2/image/upload/v1783088932/IMG_20260630_081051.jpg.jpg
    grad: "linear-gradient(135deg,#302010,#301005)",
  },
  {
    id: 65,
    year: "🌱 New Beginnings",
    label: "Grace & Charm 👑",
    note: "Elegance in every little detail.",
    photoUrl: img("IMG_20260630_081837.jpg.jpeg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 66,
    year: "🌱 New Beginnings",
    label: "Golden Smile ✨",
    note: "A smile brighter than sunshine.",
    photoUrl: img("IMG_20260630_082400.jpg.jpeg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 67,
    year: "🌱 New Beginnings",
    label: "Treasured Memory 💕",
    note: "Forever safe in the heart.",
    photoUrl: img("IMG_20260630_082524.jpg.jpeg"),
    grad: "linear-gradient(135deg,#051030,#1a0530)",
  },
  {
    id: 68,
    year: "🌱 New Beginnings",
    label: "Pure Beauty 🌺",
    note: "Beautiful inside and out.",
    photoUrl: img("IMG_20260630_082939.jpg.jpeg"),
    grad: "linear-gradient(135deg,#302010,#301005)",
  },
  {
    id: 69,
    year: "👶 Little Steps",
    label: "Bright Horizons 🌅",
    note: "New beginnings bring new dreams.",
    photoUrl: img("IMG-20191003-WA0028.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 70,
    year: "🌱 New Beginnings",
    label: "Cherished Forever ❤️",
    note: "A memory to hold forever.",
    photoUrl: img("IMG_20230825_083141.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 71,
    year: "✨ Living the Dream",
    label: "Inspiring Soul 🌟",
    note: "Your spirit inspires everyone around you.",
    photoUrl: img("IMG-20251129-WA0035.jpg"),
    grad: "linear-gradient(135deg,#30100a,#30050f)",
  },
  {
    id: 72,
    year: "🎉 Crazy Memories",
    label: "Bloom Again 🌷",
    note: "Every season brings a new bloom.",
    photoUrl: img("20191206_112737.jpg"), //"/images/Snapchat-1950766168.jpg",
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 73,
    year: "💫 Dream Chaser",
    label: "Timeless Beauty ⏳",
    note: "Beauty beyond time.",
    photoUrl: img("Snapchat-1983521353.jpg"), //images/Snapchat-1983521353.jpg",
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 74,
    year: "✨ Living the Dream",
    label: "Sweet Journey 🚶‍♀️",
    note: "Every step tells a beautiful story.",
    photoUrl: img("IMG-20260305-WA0014.jpg"), //"/images/IMG-20260305-WA0014.jpg",
    grad: "linear-gradient(135deg,#302010,#301005)",
  },
  {
    id: 75,
    year: "✨ Living the Dream",
    label: "Shining Star ⭐",
    note: "You naturally brighten every place.",
    photoUrl: img("MVIMG_20260113_181839_2.jpg"),
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 76,
    year: "🌱 New Beginnings",
    label: "Love & Laughter 😂",
    note: "The best memories begin with laughter.",
    photoUrl: img("IMG-20250110-WA0001.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 77,
    year: "🎉 Crazy Memories",
    label: "Magical Frame ✨",
    note: "A frame full of priceless memories.",
    photoUrl: "src/assets/images/IMG_20250809_161358634.jpg",
    grad: "linear-gradient(135deg,#051030,#1a0530)",
  },
  {
    id: 78,
    year: "🌱 New Beginnings",
    label: "Golden Chapter 📚",
    note: "Another unforgettable page of life.",
    photoUrl: img("IMG_20220425_115756.jpg"),
    grad: "linear-gradient(135deg,#302010,#301005)",
  },
  {
    id: 79,
    year: "🎉 Crazy Memories",
    label: "Precious Treasure 💎",
    note: "One of life's most precious gifts.",
    photoUrl: "src/assets/images/IMG_20250809_161646003.jpg",
    grad: "linear-gradient(135deg,#300510,#30100a)",
  },
  {
    id: 80,
    year: "🌱 New Beginnings",
    label: "Forever Princess 👸",
    note: "The story continues with endless smiles.",
    photoUrl: img("IMG_20220425_115635.jpg"),
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 81,
    year: "✨ My Family",
    label: "A Father's Blessing 🕊️",
    note: "A father's love never fades. It lives forever in memories, strength, and the courage to move forward.",
    photoUrl: img("29166.jpg"), //"src/assets/images/29166.jpg",
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 82,
    year: "✨ My Family",
    label: "Precious Memories 🌿",
    note: "Some moments become memories, and some memories become the strength that lasts a lifetime.",
    photoUrl: img("30856.jpg"), //"src/assets/images/30856.jpg",
    grad: "linear-gradient(135deg,#1a0530,#300510)",
  },
  {
    id: 83,
    year: "👶 Little Steps",
    label: "Cherished Moments 🌸",
    note: "Simple moments become unforgettable memories.",
    photoUrl: img("IMG-20241030-WA0014.jpg"),
    grad: "linear-gradient(135deg,#30100a,#30050f)",
  },
  {
    id: 84,
    year: "✨ Living the Dream",
    label: "👑 Queen in the Making",
    note: "Small joys create a beautiful life.",
    photoUrl: img("IMG_20251127_094116738_HDR.jpg"),
    grad: "linear-gradient(135deg,#30100a,#30050f)",
  },
  // ✅ Add all your remaining photos here. Copy any line above and change
  // the id, year, label, note, and public ID inside img('...').
  // Example for a 14th photo:
  // { id: 14, year: "2025", label: "Special Day 🌟", note: "A day to remember.", photoUrl: img('birthday/photos/2025_02.jpg'), grad: "linear-gradient(135deg,#1a0530,#30050f)" },
];

// 33 hidden features — tracked in the progress map (all mobile-tap-friendly)
export const HIDDEN_LIST = [
  "🎂 Birthday Wishes opened",
  "📖 Story Ch.1 — First Meeting",
  "📖 Story Ch.2 — Special Moments",
  "📖 Story Ch.3 — Fun Memories",
  "📖 Story Ch.4 — Happy Days",
  "📖 Story Ch.5 — Favourite Memories",
  "💌 Kavithai 1 — உன் புன்னகை",
  "💌 Kavithai 2 — கண்கள்",
  "💌 Kavithai 3 — பிறந்தநாள்",
  "💌 Kavithai 4 — நட்பு",
  "💌 Kavithai 5 — துணிச்சலான பெண்",
  "💌 Kavithai 6 — இதயம்",
  "🎵 Music Player unlocked",
  "🎵 Song played",
  "🎬 Video Gallery unlocked",
  "🌟 Secret name greeting",
  "🌌 Star map unlocked",
  "💌 Love letter found",
  "📳 Swipe-up surprise",
  "🌗 Four corners secret",
  "🔭 Pinch-zoom secret",
  "🦋 Caught the colour-shifting butterfly",
  "🎮 Secret tap-code activated",
  "🖥️ Console secret found",
  "🌙 Night angel unlocked",
  "🌸 Halo 7-tap secret",
  "📸 Photo double-tap gallery",
  "🍰 Cake 5-tap secret",
  "🔍 Image long-press quote",
  "⏳ Idle 5m surprise",
  "🎈 Balloon pop confetti",
  "🧩 Puzzle game completed",
  "💍 PROPOSAL — The Deepest Secret",
];

// ═══════════════════════════════════════════════════════════
// Hints for the "Need a hint?" button (only shown after her birthday
// has passed — see utils/birthdayDate.js).
//
// IMPORTANT: The proposal entry is intentionally NOT included here.
// It must never appear in the hint list under any circumstance, so its
// existence stays a complete surprise regardless of what else she's found.
// ═══════════════════════════════════════════════════════════
export const HINTS = {
  "🎂 Birthday Wishes opened":
    "Tap the photo in the gold ring 7 times in a row.",
  "📖 Story Ch.1 — First Meeting":
    "Open the Story section and tap on any chapter card.",
  "📖 Story Ch.2 — Special Moments":
    "Keep reading through the Story chapters — tap to open each one.",
  "📖 Story Ch.3 — Fun Memories":
    "Every Story chapter card is tappable — work through all 5.",
  "📖 Story Ch.4 — Happy Days":
    "There are 5 Story chapters total — have you opened them all?",
  "📖 Story Ch.5 — Favourite Memories":
    "The last Story chapter is waiting at the end of the timeline.",
  "💌 Kavithai 1 — உன் புன்னகை":
    "Tap any Tamil Kavithai card to read the full poem.",
  "💌 Kavithai 2 — கண்கள்":
    "Six kavithai cards in total — tap through each one.",
  "💌 Kavithai 3 — பிறந்தநாள்": "Keep exploring the Kavithai section.",
  "💌 Kavithai 4 — நட்பு":
    "Tap every kavithai card — each holds a different poem.",
  "💌 Kavithai 5 — துணிச்சலான பெண்":
    "Almost through the kavithai collection — keep tapping.",
  "💌 Kavithai 6 — இதயம்": "The final kavithai card completes the set.",
  "🎵 Music Player unlocked": "Scroll to the Songs section and press play.",
  "🎵 Song played": "Let any song actually play for a moment.",
  "🎬 Video Gallery unlocked": "Open any video in the Videos section.",
  "🌟 Secret name greeting":
    "Tap her name text on the hero section 5 times quickly.",
  "🌌 Star map unlocked":
    'Drag your finger in a full circle around the hero photo — or try the Secret Whisper box with the word "star".',
  "💌 Love letter found": 'Type the word "love" into the Secret Whisper box.',
  "📳 Swipe-up surprise":
    "Swipe up starting from near the very bottom of the screen.",
  "🌗 Four corners secret":
    "Tap all four corners of the screen within 6 seconds.",
  "🔭 Pinch-zoom secret":
    "Pinch outward with two fingers anywhere on the page.",
  "🦋 Caught the colour-shifting butterfly":
    "One of the drifting, colour-shifting butterflies is tappable — try catching one.",
  "🎮 Secret tap-code activated":
    "Tap rapidly 5 times in the very top-left corner of the screen.",
  "🖥️ Console secret found": "Open your browser's developer console.",
  "🌙 Night angel unlocked":
    'Type the word "angel" into the Secret Whisper box.',
  "🌸 Halo 7-tap secret":
    "The same 7-tap on the hero photo unlocks this too — keep tapping it.",
  "📸 Photo double-tap gallery": "Double-tap the hero photo quickly.",
  "🍰 Cake 5-tap secret":
    "Find the tiny cake icon near the hero photo and tap it 5 times.",
  "🔍 Image long-press quote":
    "Press and hold on the hero photo for about a second.",
  "⏳ Idle 5m surprise": "Stop tapping and just wait quietly for 5 minutes.",
  "🎈 Balloon pop confetti":
    "Tap one of the floating balloons near the top of the page.",
  "🧩 Puzzle game completed":
    "Scroll to the Games section and finish any mini-game.",
};

export const GAME_COLORS = [
  "#FF4D8D",
  "#A855F7",
  "#FFD700",
  "#60A5FA",
  "#34D399",
  "#FB923C",
];
export const FAVORITE_COLOR = "#60A5FA"; // used by "Guess Favorite Color" game
export const FAVORITE_SONG = "Oru Naalil"; // used by "Guess Favorite Song" game
