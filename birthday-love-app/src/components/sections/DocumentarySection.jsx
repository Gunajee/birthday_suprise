import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DOCUMENTARY } from "../../data/documentary";
import { useApp } from "../../context/AppContext";
import Section from "../ui/Section";
import { getDriveDownloadUrl } from "../../utils/driveUtils";

/**
 * Documentary Section
 * ───────────────────
 * Renders the documentary card(s). The modal preview is opened via
 * AppContext's openOverlay() so it renders at the top-level DOM
 * (in CelebrationPage) — not inside this section's DOM tree.
 * This fixes both the z-index layering issue and the close button.
 */
export default function DocumentarySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { openOverlay } = useApp();

  if (!DOCUMENTARY || DOCUMENTARY.length === 0) return null;

  return (
    <Section
      eyebrow="// HER LIFE STORY — DOCUMENTARY"
      title="Her Documentary 📽️"
      id="documentary"
    >
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            fontSize: 18,
            color: "#a09098",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          A documentary crafted with love — her story, her journey, her light.
        </motion.p>

        <div className="flex flex-col gap-6">
          {DOCUMENTARY.map((doc, i) => (
            <DocumentaryCard
              key={doc.id}
              doc={doc}
              index={i}
              inView={inView}
              onPreview={(version) =>
                openOverlay("documentary", { doc, version })
              }
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function DocumentaryCard({ doc, index, inView, onPreview }) {
  const versions = [];
  if (doc.tamilPdf) versions.push({ key: "tamil", label: "தமிழ்", flag: "🇮🇳" });
  if (doc.hasEnglish && doc.englishPdf)
    versions.push({ key: "english", label: "English", flag: "🇬🇧" });

  const showVersionSelector = versions.length > 1;
  const [activeVersion, setActiveVersion] = useState(
    versions[0]?.key || "tamil",
  );

  const activePdf = activeVersion === "tamil" ? doc.tamilPdf : doc.englishPdf;
  const downloadUrl = getDriveDownloadUrl(activePdf);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,.04)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,77,141,.18)",
        boxShadow: "0 8px 40px rgba(255,77,141,.08)",
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center gap-5 p-6"
        style={{
          background:
            "linear-gradient(135deg,rgba(255,77,141,.12),rgba(168,85,247,.08))",
          borderBottom: "1px solid rgba(255,77,141,.12)",
        }}
      >
        <div
          className="flex-shrink-0 rounded-2xl flex items-center justify-center"
          style={{
            width: 80,
            height: 100,
            background: "linear-gradient(160deg,#1a0530,#300510)",
            border: "2px solid rgba(255,77,141,.3)",
            boxShadow: "0 4px 20px rgba(255,77,141,.2)",
          }}
        >
          {doc.coverImage ? (
            <img
              src={doc.coverImage}
              alt={doc.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 14,
              }}
            />
          ) : (
            <span style={{ fontSize: 36 }}>📖</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 9,
              color: "#FF4D8D",
              letterSpacing: 3,
              marginBottom: 6,
            }}
          >
            DOCUMENTARY · PDF
          </p>
          <h3
            style={{
              fontFamily: "'Great Vibes',cursive",
              fontSize: 28,
              color: "#f48fb1",
              marginBottom: 4,
            }}
          >
            {doc.title}
          </h3>
          {doc.subtitle && (
            <p
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontStyle: "italic",
                fontSize: 14,
                color: "#7a5060",
              }}
            >
              {doc.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        {doc.description && (
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 16,
              lineHeight: 1.9,
              color: "#e8d5e0",
              marginBottom: 24,
            }}
          >
            {doc.description}
          </p>
        )}

        {/* Version selector — only shown when both versions exist */}
        {showVersionSelector && (
          <div className="flex items-center gap-2 mb-5">
            <span
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9,
                color: "#7a5060",
                letterSpacing: 1,
                marginRight: 6,
              }}
            >
              VERSION:
            </span>
            {versions.map((v) => (
              <button
                key={v.key}
                onClick={() => setActiveVersion(v.key)}
                className="px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all"
                style={{
                  background:
                    activeVersion === v.key
                      ? "linear-gradient(135deg,#FF4D8D,#A855F7)"
                      : "rgba(255,255,255,.06)",
                  color: activeVersion === v.key ? "#fff" : "#a09098",
                  border: `1px solid ${activeVersion === v.key ? "transparent" : "rgba(255,255,255,.1)"}`,
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                <span>{v.flag}</span>
                <span>{v.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onPreview(activeVersion)}
            disabled={!activePdf}
            className="flex items-center gap-2 px-6 py-3 rounded-full"
            style={{
              background: activePdf
                ? "linear-gradient(135deg,#FF4D8D,#A855F7)"
                : "rgba(255,255,255,.06)",
              color: activePdf ? "#fff" : "#7a5060",
              boxShadow: activePdf ? "0 6px 24px rgba(255,77,141,.35)" : "none",
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 16,
              cursor: activePdf ? "pointer" : "not-allowed",
            }}
          >
            <span>👁️</span>
            <span>Preview</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() =>
              downloadUrl && window.open(downloadUrl, "_blank", "noreferrer")
            }
            disabled={!downloadUrl}
            className="flex items-center gap-2 px-6 py-3 rounded-full"
            style={{
              background: downloadUrl
                ? "rgba(255,215,0,.12)"
                : "rgba(255,255,255,.04)",
              color: downloadUrl ? "#FFD700" : "#7a5060",
              border: `1px solid ${downloadUrl ? "rgba(255,215,0,.3)" : "rgba(255,255,255,.08)"}`,
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 16,
              cursor: downloadUrl ? "pointer" : "not-allowed",
            }}
          >
            <span>⬇️</span>
            <span>Download</span>
          </motion.button>

          {!activePdf && (
            <span
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 9,
                color: "rgba(255,255,255,.2)",
                display: "flex",
                alignItems: "center",
              }}
            >
              // add Google Drive URL in documentary.js
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
