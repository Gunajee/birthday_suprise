import React from "react";
import { useStoryChapters } from "../../hooks/useContent";

export default function StoryModal({ idx, setIdx }) {
  const chapters = useStoryChapters();
  const ch = chapters[idx] || chapters[0];
  if (!ch) return null;

  // Backend stores description in `description`, static data uses `desc`
  const desc = ch.description || ch.desc || "";
  const sub = ch.subtitle || ch.sub || "";

  return (
    <div className="glass-pink rounded-3xl overflow-hidden">
      <div
        className="h-52 flex items-center justify-center relative"
        style={{ background: "linear-gradient(160deg,#1a0530,#300510)" }}
      >
        {ch.photoUrl ? (
          <img
            src={ch.photoUrl}
            alt={ch.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              inset: 0,
            }}
          />
        ) : (
          <div className="text-6xl mb-2 z-10">{ch.icon}</div>
        )}
        <div
          className="absolute top-3 left-4"
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 9,
            color: "rgba(255,77,141,.6)",
            letterSpacing: 2,
            zIndex: 2,
          }}
        >
          CHAPTER {idx + 1} / {chapters.length}
        </div>
      </div>
      <div className="p-8">
        <h2
          style={{
            fontFamily: "'Great Vibes',cursive",
            fontSize: 38,
            color: "#FF4D8D",
            marginBottom: 4,
          }}
        >
          {ch.title}
        </h2>
        <p
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 10,
            color: "#7a5060",
            letterSpacing: 2,
            marginBottom: 18,
          }}
        >
          {sub}
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 17,
            lineHeight: 2,
            color: "#e8d5e0",
            marginBottom: 24,
          }}
        >
          {desc}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() =>
              setIdx((idx - 1 + chapters.length) % chapters.length)
            }
            className="px-5 py-2 rounded-lg text-xs"
            style={{
              background: "rgba(255,77,141,.12)",
              color: "#f48fb1",
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            ← Prev
          </button>
          <button
            onClick={() => setIdx((idx + 1) % chapters.length)}
            className="px-5 py-2 rounded-lg text-xs"
            style={{
              background: "rgba(255,77,141,.22)",
              color: "#f48fb1",
              fontFamily: "'JetBrains Mono',monospace",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
