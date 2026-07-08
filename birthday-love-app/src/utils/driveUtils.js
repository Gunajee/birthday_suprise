/**
 * driveUtils.js
 * ─────────────
 * Converts a Google Drive share link into the correct
 * preview URL and download URL automatically.
 *
 * You always paste the normal share link from Google Drive:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *
 * This utility extracts the FILE_ID and builds:
 *   Preview URL:  https://drive.google.com/file/d/FILE_ID/preview
 *   Download URL: https://drive.google.com/uc?export=download&id=FILE_ID
 *
 * Supported input formats (all produce the same output):
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   https://drive.google.com/file/d/FILE_ID/view
 *   https://drive.google.com/file/d/FILE_ID/preview
 *   https://drive.google.com/open?id=FILE_ID
 *   https://docs.google.com/document/d/FILE_ID/edit
 */

/**
 * Extracts the Google Drive file ID from any Drive URL format.
 * Returns null if the URL is not a recognisable Drive URL.
 */
export function extractDriveFileId(url) {
  if (!url) return null;

  // Format: /file/d/FILE_ID/
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];

  // Format: ?id=FILE_ID or &id=FILE_ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];

  // Format: /d/FILE_ID/ (Google Docs/Sheets/Slides)
  const docMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (docMatch) return docMatch[1];

  return null;
}

/**
 * Returns the embed/preview URL for Google Drive iframe.
 * This URL renders the PDF inside an iframe with no download bar.
 */
export function getDrivePreviewUrl(url) {
  const id = extractDriveFileId(url);
  if (!id) return null;
  return `https://drive.google.com/file/d/${id}/preview`;
}

/**
 * Returns the direct download URL for Google Drive.
 * Works for files shared as "Anyone with the link".
 */
export function getDriveDownloadUrl(url) {
  const id = extractDriveFileId(url);
  if (!id) return null;
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

/**
 * Returns true if the given URL is a Google Drive URL.
 */
export function isDriveUrl(url) {
  return (
    url && (url.includes("drive.google.com") || url.includes("docs.google.com"))
  );
}

/**
 * Returns Google Drive direct video URL for ReactPlayer.
 *
 * Input:
 * https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *
 * Output:
 * https://drive.google.com/uc?export=download&id=FILE_ID
 *
 * Works with:
 * - ReactPlayer
 * - HTML5 video
 */
export function getDriveVideoUrl(url) {
  const id = extractDriveFileId(url);

  if (!id) return null;

  return `https://drive.google.com/uc?export=download&id=${id}`;
}
