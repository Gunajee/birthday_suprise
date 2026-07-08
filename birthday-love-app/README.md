# 💖 Birthday Suprise Website

A premium, interactive birthday celebration website with 30 hidden secrets,
a memory scrapbook, mini-games, Tamil kavithaigal, 3D visuals, and a
cinematic love proposal — fully mobile-friendly.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

Connect to the backend (optional, for Mailjet notifications):
```bash
cp .env.example .env
# edit VITE_API_BASE_URL to point at your running Spring Boot backend
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/          → Overlay, Toast, HiddenCounter, ParticlesBg, Fireflies, GlowingStar, EffectsLayer
│   ├── 3d/           → Starfield3D, PhotoFrame3D, FloatingHeart3D (Three.js / React Three Fiber)
│   ├── sections/     → Hero, Greetings, Quotes, Gallery, Story, Timeline, Songs, Videos, Kavithai,
│   │                   Games, SecretWhisper, TreasureMap, ThankYou
│   ├── games/        → PuzzleGame, MemoryMatchGame, GuessColorGame, GuessSongGame
│   ├── hidden/        → SecretHeartHunt, SwipeUpSecret (passive, no-UI mobile-friendly triggers)
│   └── modals/       → All overlay content (Wishes, Story, Kavithai, Proposal, etc.)
├── context/
│   └── AppContext.jsx → global state: found secrets, overlays, fireworks/confetti triggers
├── hooks/
│   └── useHiddenSecrets.js → console secret, idle timer, tap-code, drag-rotate, proposal trigger
├── utils/
│   ├── effects.js   → particle bursts, fireworks, falling stars
│   └── api.js       → calls the Spring Boot backend (Mailjet notifications)
├── data/
│   └── index.js     → ALL editable content (greetings, quotes, story, songs, videos, kavithai, hidden list)
├── App.jsx
└── main.jsx
```

## 📱 Mobile-Friendly By Design

Every hidden secret now works identically on phones and desktop. The previous
version relied on desktop-only browser events that silently fail on touch
devices — all of those were replaced:

| Old (desktop-only) | New (works everywhere) |
|---|---|
| Konami arrow-key code | 5 quick taps in the top-left corner |
| Keyboard "type love/star/angel" via `keypress` listener | **Visible Secret Whisper text box** — a real `<input>` that opens the native keyboard on mobile too |
| Mouse-drag a ❤ shape for the proposal | **Tap 5 drifting hearts** that float across the screen — discrete taps work identically on touch and mouse |
| `devicemotion` "shake phone" (needs iOS permission, often blocked) | **Swipe up** from the bottom 20% of the screen |
| `deviceorientation` "rotate device" | **Drag your finger in a circle** around the hero photo |
| `onDoubleClick` (no native double-tap event on mobile) | Custom-timed double-tap detection (works for both mouse and touch) |
| `onContextMenu` long-press (right-click only, no mobile equivalent) | Unified pointer-down timer that works for touch and mouse, with proper drag-cancellation so it never fires alongside a tap |

## 🎨 Personalizing Content

Everything text-based lives in **`src/data/index.js`**. Edit:
- `HERO.name` — her name
- `GREETINGS` — the 20 birthday greeting cards
- `QUOTES` — quotes carousel
- `STORY_CHAPTERS` — her story timeline
- `KAVITHAI` — your Tamil poems
- `SONGS` / `VIDEOS` — media playlists
- `MEMORY_GALLERY` — the polaroid scrapbook years

## 🖼️ Adding Real Photos / Audio / Video

Put your files in:
```
src/assets/images/
src/assets/songs/
src/assets/videos/
```

Then replace the placeholder `<div>` blocks (marked with `✅ REPLACE WITH:` comments)
with real `<img>`, `<audio>`, or `<video>` tags in:
- `src/components/sections/HeroSection.jsx` (her main photo)
- `src/components/modals/StoryModal.jsx` (chapter photos)
- `src/components/sections/MemoryGallery.jsx` (polaroid photos)
- `src/components/sections/SongsSection.jsx` (song URLs — wired to `src/data/index.js`)
- `src/components/modals/VideoModal.jsx` (video files)

## 🌌 3D & Visual Polish

Built with **Three.js** via `@react-three/fiber`, kept lightweight for mobile
(capped pixel ratio, low particle counts, no postprocessing):

- **`Starfield3D`** — ambient rotating starfield + gold dust, page-wide background
- **`PhotoFrame3D`** — two independently-rotating 3D gold/purple rings around the hero photo
- **`FloatingHeart3D`** — an extruded, pulsing 3D heart that rises during the proposal's typewriter sequence
- **3D drag-tilt on Memory Gallery polaroids** — tilts in 3D space following your finger/mouse via Framer Motion's `onPan`

## 🦋 Animated Color-Shifting Butterflies

Six hand-built SVG butterflies drift across the celebration page — not
images, but layered vector wings (forewing + hindwing per side, body,
antennae) so they stay crisp at any size and recolor smoothly.

- **Flight** — each butterfly wanders a unique, randomly-generated path
  (Framer Motion keyframes on `x`/`y`/`rotate`) plus a gentle independent
  bob, so the swarm never feels like one element looping mechanically
- **Colour-shifting wings** — each butterfly's wing gradient continuously
  cycles through a curated palette (rose → gold → violet → sky → mint →
  back to rose), animated directly on the SVG gradient stops
- **Wing flutter** — wings flap via a fast `scaleX` oscillation on each
  side independently, reading as a believable flutter
- **Hidden secret** — one randomly-chosen butterfly per page load is
  secretly catchable. Tap it and you've found `🦋 Caught the
  colour-shifting butterfly` — it isn't visually marked, so finding the
  right one is genuinely a matter of curiosity
- Fully decorative and `pointer-events: none` except for that one catchable
  butterfly, so they never block taps on real content underneath

Components: `src/components/ui/Butterfly.jsx` (single butterfly) and
`src/components/ui/ButterflyField.jsx` (scatters several). Tune the swarm
size via `<ButterflyField count={6} />` in `CelebrationPage.jsx`.

## 🎂 Birthday-Aware Title & Hint Button

The hero title and the "Birthday Wishes" message automatically adapt to
today's date (`src/utils/birthdayDate.js`):

- **On July 13th** — shows "🎂 Happy Birthday My Dear ❤️" and the full
  birthday message
- **Any other day** — shows "🎂 Advance Happy Birthday ❤️" with a live
  day-countdown ("X days until your special day ✨"), and a softer
  "your special day is only X days away" message

**After July 13th has passed** (from the 14th onward, every year), a
floating **"💡 Need a hint?"** button appears in the bottom-left corner.
Tapping it opens a checklist of every hidden secret, showing hints only
for the ones not yet found — with one deliberate exception: **the
proposal is never listed**, in `HINTS` (`src/data/index.js`) or anywhere
in the hint UI, so it stays a genuine surprise no matter how many other
secrets she's already found.

## 📸 Photo Gallery — Built for 50+ Photos

The Memory Gallery was redesigned to scale gracefully well past a
handful of photos:

- **Year filter tabs** — narrow down by year instead of scrolling through
  everything at once
- **Pagination** — only 12 photos render at a time, with a "Load more"
  button; the DOM and animation cost never scale linearly with your full
  photo count, so it stays smooth on mobile even with 50-100+ photos
- **Lightweight cards** — no per-card 3D-tilt or individual scroll
  observers (those don't scale to that many simultaneous instances); a
  shared hover/tap transition handles the feel instead
- **Real lightbox navigation** — tap any photo to open a full-screen
  viewer with **prev/next arrows, swipe gestures, and ← → keyboard
  navigation**, browsing the complete gallery regardless of which filter
  tab you opened from
- **Lazy-loaded images** via native `loading="lazy"` on every `<img>`

To add your 50+ photos: each entry in `MEMORY_GALLERY`
(`src/data/index.js`) is one photo — add as many objects as you like,
following the existing shape (`id`, `year`, `label`, `note`, `photoUrl`,
`grad`). Leave `photoUrl` blank for a placeholder gradient, or point it
at a real file once you've added it to `src/assets/images/`.

## 🔐 The 33 Hidden Secrets (+ 2 unlisted bonus secrets)

The counter badge automatically reflects however many entries are in
`HIDDEN_LIST` (`src/data/index.js`) — add or remove freely, the UI adjusts.

| # | Trigger | Secret |
|---|---|---|
| 1 | Single-tap hero photo × 7 | Birthday wishes |
| 2 | Double-tap hero photo | Memory Gallery unlocked |
| 3 | Long-press (hold ~0.65s) hero photo | Special Quote found |
| 4 | Drag-rotate the hero photo a full circle | Star map |
| 5 | Tap cake icon × 5 | Favourite Song unlocked |
| 6 | Tap name text × 5 | Secret name greeting |
| 7 | Tap a balloon | Confetti burst |
| 8–12 | Click each Story chapter | 5 chapters unlocked |
| 13–18 | Click each Kavithai card | 6 poems unlocked |
| 19 | Play a song | Music player unlocked |
| 20 | Open a video | Video gallery unlocked |
| 21 | Type "love" in the **Secret Whisper** box | Love letter |
| 22 | Type "star" in the **Secret Whisper** box | Star map (alt. path) |
| 23 | Swipe up from the bottom of the screen | Swipe-up surprise |
| 24 | Tap all 4 corners of the screen within 6 seconds | Four corners secret |
| 25 | Pinch-zoom (two fingers, spread apart) anywhere on the page | Pinch-zoom secret |
| 26 | 5 quick taps in the top-left corner | Secret tap-code |
| 27 | Open browser console (desktop bonus) | Console secret |
| 28 | Type "angel" in the **Secret Whisper** box | Night angel message |
| 29 | Idle for 30 seconds | Surprise message |
| 30 | Tap the gallery photos / Tap on Memory Gallery card | Photo double-tap gallery |
| 31 | Cake tap secret | Cake 5-tap secret |
| 32 | Complete any mini-game | Puzzle completed |
| 33 | **Tap the one secretly-catchable butterfly** among the drifting swarm | Butterfly caught |
| 💍 | **Tap 5 of the tiny drifting hearts that float across the screen** | **THE PROPOSAL** |

**Bonus secrets** (delightful, but don't count toward the tracker):
- Type **"forever"** in the Secret Whisper box, or tap the footer 💖 three times → a sweet "forever" note
- Type **"smile"** in the Secret Whisper box → a sweet "your smile" note

Progress is tracked live via the `🔐 Hidden Memories` badge (top-right) and
persists in `localStorage`, so it survives page refreshes.

**Important:** the proposal is intentionally excluded from the hint button,
the progress checklist's hint text, and every piece of bonus-secret framing
— there is no path, anywhere in the UI, that points toward its existence.

## 💍 The Proposal (Ultimate Secret)

Every ~45 seconds, a small, translucent heart (💗) drifts gently across a
random part of the screen for about 14 seconds before fading. She must
notice and tap **5 of them** (in any order, across any span of time) to
unlock the proposal.

This replaces the old "draw a heart with your mouse" gesture, which relied
on `mousedown`/`mousemove`/`mouseup` — events that conflict with normal page
scrolling on touch devices and were unreliable on phones. Discrete taps on
a real, visible (if subtle) element work identically and reliably on every
device.

When found:
1. Fireworks burst across the screen
2. A cinematic typewriter-animated proposal page opens — moon, fireflies,
   falling stars, and a pulsing 3D heart
3. A `POST /api/proposal-found` request fires immediately to the Spring
   Boot backend, which sends **you an instant Mailjet email**
4. "Yes ❤️" → celebration screen + another email. "Need Some Time 😊" →
   gentle response screen + a different email.

## 🔧 Backend — Spring Boot + Mailjet (included separately)

See the companion `birthday-backend/` project. It exposes:

```
POST /api/proposal-found     → saves the event, sends you a Mailjet email instantly
POST /api/proposal-answer    → saves her Yes/Wait answer, sends a follow-up email
POST /api/secret-found       → optional: logs each of the 30 secrets as she finds them
GET  /api/secrets            → view her progress
```

Stack: Spring Boot 3 + Spring Data JPA + MySQL + Lombok + Mailjet Java SDK.
Full setup instructions are in `birthday-backend/README.md`.

## 🛠️ Tech Stack

- React 18 + Vite
- Tailwind CSS (custom theme: pink/purple/gold/dark)
- Framer Motion (animations, transitions, 3D drag-tilt via motion values)
- Three.js + @react-three/fiber + @react-three/drei (3D starfield, heart, photo frame)
- React Router DOM (ready for multi-page expansion)
- React Confetti
- React Player (video embeds)
- React Intersection Observer (scroll-triggered animations)

## 📝 License

Made with infinite love. Personalize freely. 💖

## 🛠️ Admin Content Management Panel

A full 3D/glassmorphic admin dashboard lives at **`/admin`** — manage every
piece of content without touching code.

### Access

1. Set the admin password in the backend's `application.properties`:
   ```properties
   admin.password=your-secret-password
   ```
2. Visit `http://localhost:3000/admin`
3. Enter the password (session-only — closing the tab logs you out)

### What you can manage

| Page | Path | Manages |
|---|---|---|
| Dashboard | `/admin` | Overview + item counts for every section |
| Hero & Photo | `/admin/hero` | Her name, tagline, and main hero photo |
| Quotes | `/admin/quotes` | The rotating quotes carousel |
| Greetings | `/admin/greetings` | The 20 birthday greeting cards |
| Story Chapters | `/admin/story` | Her story timeline + chapter photos |
| Tamil Kavithai | `/admin/kavithai` | Poems, lines, and translations |
| Songs | `/admin/songs` | Playlist with audio file uploads |
| Videos | `/admin/videos` | Video gallery with file uploads |
| Memory Gallery | `/admin/gallery` | The polaroid scrapbook + photos |

### Features

- **Drag-to-reorder** any list (powered by `@dnd-kit`) — order is saved instantly
- **Direct file upload** for photos/audio/video — files are stored by the
  backend and a public URL is generated automatically (no manual hosting needed)
- **Live upload progress bars** for larger files (e.g. video)
- **3D glassmorphic design** — distinct violet/gold "control room" aesthetic
  (animated wireframe shards via Three.js) so it never feels like the same
  romantic public site
- All changes save directly to MySQL via the Spring Boot backend

### Connecting Admin Data to the Public Site

Currently the public celebration page reads from the static
`src/data/index.js` file. To make admin edits appear live on the public
site, swap each section's data source from the static import to
`publicContentApi` (already provided in `src/utils/contentApi.js`), e.g.:

```jsx
// Before:
import { QUOTES } from '../../data'

// After:
import { useEffect, useState } from 'react'
import { publicContentApi } from '../../utils/contentApi'

const [quotes, setQuotes] = useState(QUOTES) // fallback to static data
useEffect(() => {
  publicContentApi.quotes().then(setQuotes).catch(() => {}) // keep fallback on failure
}, [])
```

This keeps the static file as a safety-net fallback if the backend is ever
unreachable, while letting the admin panel control real content once connected.
