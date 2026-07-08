/**
 * cloudinaryUtils.js
 * ------------------
 * Fixes common issues with Cloudinary URLs pasted directly from the dashboard.
 *
 * Problems this solves:
 *   1. Videos uploaded as 'raw' type → URL has /raw/upload/ → browsers can't stream it
 *   2. Missing streaming optimisations → large file, slow start
 *   3. Wrong file extension in the URL (e.g. .mov instead of .mp4)
 *   4. Missing CORS-friendly format flag
 */

/**
 * Normalises any Cloudinary video URL so it streams correctly.
 *
 * Takes any of these formats and fixes them:
 *   https://res.cloudinary.com/cloud/video/upload/v123/file.mp4   ✅ already correct
 *   https://res.cloudinary.com/cloud/raw/upload/v123/file.mp4     ❌ fixes to video
 *   https://res.cloudinary.com/cloud/video/upload/v123/file.mov   fixes to mp4
 *
 * Adds transformations: f_auto (best format for browser), q_auto (auto quality)
 */
export function normaliseCloudinaryVideoUrl(url) {
  if (!url || !url.includes("cloudinary.com")) return url;

  let fixed = url;

  // Fix 1: If uploaded as 'raw' but is actually a video → change to video type
  // This is the most common mistake — Cloudinary sometimes auto-classifies
  // mp4/mov as 'raw' when uploaded via the Media Library UI.
  fixed = fixed.replace(
    /\/raw\/upload\/(.*\.(mp4|mov|webm|avi|mkv|m4v))/i,
    "/video/upload/$1",
  );

  // Fix 2: Add streaming transformations if not already present
  // f_auto → serves WebM to Chrome, MP4 to Safari automatically
  // q_auto → Cloudinary picks best quality/size balance
  // vc_auto → auto video codec selection
  if (fixed.includes("/upload/") && !fixed.includes("f_auto")) {
    fixed = fixed.replace("/upload/", "/upload/f_auto,q_auto,vc_auto/");
  }

  // Fix 3: Force .mp4 extension for maximum browser compatibility
  // .mov files are often not playable on non-Apple browsers natively,
  // but Cloudinary will transcode and serve as mp4 if we request it.
  fixed = fixed.replace(/\.(mov|avi|mkv|m4v)(\?.*)?$/, ".mp4$2");

  return fixed;
}

/**
 * Normalises a Cloudinary image URL.
 * Adds f_auto (WebP for Chrome, JPEG for Safari) and q_auto (smart compression).
 * Optionally resizes to a max width.
 */
export function normaliseCloudinaryImageUrl(url, maxWidth = null) {
  if (!url || !url.includes("cloudinary.com")) return url;
  if (url.includes("f_auto")) return url; // already optimised

  let transforms = "f_auto,q_auto";
  if (maxWidth) transforms += `,w_${maxWidth},c_limit`;

  return url.replace("/upload/", `/upload/${transforms}/`);
}

/**
 * Normalises a Cloudinary audio (raw) URL.
 * Audio files should use /raw/upload/ — this fixes them if accidentally
 * set as /video/upload/.
 */
export function normaliseCloudinaryAudioUrl(url) {
  if (!url || !url.includes("cloudinary.com")) return url;

  // Audio files (mp3, wav, ogg, aac, flac) should be raw type
  return url.replace(
    /\/(video|image)\/upload\/(.*\.(mp3|wav|ogg|aac|flac|m4a))/i,
    "/raw/upload/$2",
  );
}

/**
 * Detects whether a URL is a Cloudinary URL.
 */
export function isCloudinaryUrl(url) {
  return url && url.includes("res.cloudinary.com");
}
