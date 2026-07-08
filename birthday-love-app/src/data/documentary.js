// ═══════════════════════════════════════════════════════════
// DOCUMENTARY DATA — Single source of truth
// ═══════════════════════════════════════════════════════════
//
// ── How to update the document ──────────────────────────────
// When you upload a new version of the PDF to Google Drive:
//   1. Right-click the file in Google Drive → "Share"
//   2. Set access to "Anyone with the link" → "Viewer"
//   3. Copy the share link. It looks like:
//      https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   4. Paste it into tamilPdf below — that's it.
//      The preview and download will automatically show the new version.
//
// ── The URL is automatically converted ──────────────────────
// You paste the normal "share" link — the code converts it to:
//   Preview:  https://drive.google.com/file/d/FILE_ID/preview
//   Download: https://drive.google.com/uc?export=download&id=FILE_ID
// You never need to manually construct these URLs.
//
// ── English version ─────────────────────────────────────────
// When ready: set hasEnglish: true and add the Google Drive
// share URL in englishPdf. The version selector (தமிழ் | English)
// appears automatically — no other code changes needed.
// ═══════════════════════════════════════════════════════════

export const DOCUMENTARY = [
  {
    id: 1,
    title: "அவளின் கதை",
    subtitle: "A life beautifully lived",
    description:
      "A heartfelt documentary capturing her journey — her laughter, her strength, " +
      "her dreams, and every beautiful moment that has made her who she is today. " +
      "Crafted with love, for her, on this most special day.",
    pages: null,
    coverImage: "",

    // ✅ Paste your Google Drive share URL here
    // Example: "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/view?usp=sharing"
    tamilPdf:
      "https://docs.google.com/document/d/1BSKr2RfGR1J2Uh8c9FwhWHNnVnajKVayotGufxO4Re4/edit?usp=sharing",

    // English version — set hasEnglish: true and add URL when ready
    hasEnglish: true,
    englishPdf:
      "https://docs.google.com/document/d/1kJzWVwXsYTMIme5l8P55aik-YAHxHh6fDFnaTASjISQ/edit?usp=sharing",
  },
];
