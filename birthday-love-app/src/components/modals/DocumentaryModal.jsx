import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getDrivePreviewUrl,
  getDriveDownloadUrl,
  extractDriveFileId,
} from "../../utils/driveUtils";

/**
 * DocumentaryModal
 * ────────────────
 * Previews and downloads a PDF via Google Drive.
 *
 * You just paste the Google Drive share URL into documentary.js —
 * this component handles everything else automatically:
 *   • Extracts the file ID from the URL
 *   • Builds the correct /preview URL for the iframe
 *   • Builds the correct download URL for the button
 *   • When you update the URL in documentary.js, the modal
 *     automatically shows the new document — no code changes needed
 *
 * Close the dialog:
 *   • Click the ✕ button in the toolbar
 *   • Click the dark backdrop outside the dialog
 */
export default function DocumentaryModal({
  doc,
  version,
  onClose,
  onSwitchVersion,
}) {
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  // Which PDF URL is currently active
  const versions = [];
  if (doc.tamilPdf) versions.push({ key: "tamil", label: "தமிழ்", flag: "🇮🇳" });
  if (doc.hasEnglish && doc.englishPdf)
    versions.push({ key: "english", label: "English", flag: "🇬🇧" });
  const showVersionSwitcher = versions.length > 1;

  const rawUrl = version === "tamil" ? doc.tamilPdf : doc.englishPdf;
  const versionLabel = versions.find((v) => v.key === version)?.label || "";

  // Build the correct Google Drive URLs
  const previewUrl = getDrivePreviewUrl(rawUrl);
  const downloadUrl = getDriveDownloadUrl(rawUrl);
  const fileId = extractDriveFileId(rawUrl);
  const isValidUrl = Boolean(fileId);

  function handleVersionSwitch(key) {
    setLoading(true);
    setIframeKey((k) => k + 1); // force iframe to remount with new URL
    onSwitchVersion(key);
  }

  function handleDownload() {
    if (!downloadUrl) return;
    // Open download URL in new tab — browser handles the download
    window.open(downloadUrl, "_blank", "noreferrer");
  }

  // Clicks on the backdrop close the modal
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "rgba(4,2,14,.97)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Toolbar ─────────────────────────────────────────── */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.06 }}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-3 flex-shrink-0 px-4 py-3"
          style={{
            background: "rgba(14,8,24,.98)",
            borderBottom: "1px solid rgba(255,77,141,.2)",
          }}
        >
          {/* ✕ Close */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(255,77,141,.15)",
              border: "1px solid rgba(255,77,141,.4)",
              color: "#FF4D8D",
              fontSize: 16,
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ✕
          </button>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h3
              style={{
                fontFamily: "'Great Vibes',cursive",
                fontSize: 22,
                color: "#f48fb1",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {doc.title}
            </h3>
            {versionLabel && (
              <p
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 9,
                  color: "#7a5060",
                  letterSpacing: 1,
                }}
              >
                {versionLabel} version · PDF
              </p>
            )}
          </div>

          {/* Version switcher — only when multiple versions exist */}
          {showVersionSwitcher && (
            <div className="flex gap-1.5 flex-shrink-0">
              {versions.map((v) => (
                <button
                  key={v.key}
                  onClick={() => handleVersionSwitch(v.key)}
                  className="px-3 py-1.5 rounded-full flex items-center gap-1"
                  style={{
                    background:
                      version === v.key
                        ? "linear-gradient(135deg,#FF4D8D,#A855F7)"
                        : "rgba(255,255,255,.06)",
                    color: version === v.key ? "#fff" : "#a09098",
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 11,
                    border: `1px solid ${version === v.key ? "transparent" : "rgba(255,255,255,.12)"}`,
                  }}
                >
                  <span>{v.flag}</span>
                  <span className="hidden sm:inline ml-1">{v.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* ⬇ Download */}
          <motion.button
            whileHover={{ scale: isValidUrl ? 1.06 : 1 }}
            whileTap={{ scale: isValidUrl ? 0.95 : 1 }}
            onClick={handleDownload}
            disabled={!isValidUrl}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full flex-shrink-0"
            style={{
              background: isValidUrl
                ? "linear-gradient(135deg,rgba(255,215,0,.2),rgba(255,165,0,.12))"
                : "rgba(255,255,255,.04)",
              border: `1px solid ${isValidUrl ? "rgba(255,215,0,.4)" : "rgba(255,255,255,.08)"}`,
              color: isValidUrl ? "#FFD700" : "#7a5060",
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 11,
              cursor: isValidUrl ? "pointer" : "not-allowed",
            }}
          >
            <span>⬇</span>
            <span className="hidden sm:inline">Download</span>
          </motion.button>
        </motion.div>

        {/* ── PDF Viewer ──────────────────────────────────────── */}
        <div
          className="flex-1 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {isValidUrl ? (
            <div className="relative w-full h-full">
              {/* Loading spinner — shown until iframe fires onLoad */}
              {loading && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4"
                  style={{ background: "rgba(4,2,14,.95)" }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: "3px solid rgba(255,77,141,.15)",
                      borderTopColor: "#FF4D8D",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 11,
                      color: "#7a5060",
                      letterSpacing: 1,
                    }}
                  >
                    Loading documentary...
                  </p>
                </div>
              )}

              {/* Google Drive preview iframe
                  /preview endpoint renders the PDF inline,
                  supports all browsers including mobile Safari.
                  key={iframeKey} forces remount on version switch. */}
              <iframe
                key={iframeKey}
                src={previewUrl}
                title={doc.title}
                allow="autoplay"
                onLoad={() => setLoading(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  opacity: loading ? 0 : 1,
                  transition: "opacity 0.4s ease",
                }}
              />
            </div>
          ) : (
            /* No valid URL set in documentary.js yet */
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-6">
              <span style={{ fontSize: 52, opacity: 0.35 }}>📄</span>
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontStyle: "italic",
                    fontSize: 18,
                    color: "#7a5060",
                    marginBottom: 12,
                  }}
                >
                  {rawUrl
                    ? "This URL does not look like a Google Drive link."
                    : "No document URL added yet."}
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 9,
                    color: "rgba(255,255,255,.2)",
                    lineHeight: 1.8,
                  }}
                >
                  // paste a Google Drive share URL into
                  <br />
                  // src/data/documentary.js → tamilPdf
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
