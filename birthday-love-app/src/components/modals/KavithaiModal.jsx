import React from "react";
import { useKavithai } from "../../hooks/useContent";

export default function KavithaiModal({ idx, setIdx }) {
  const kavithai = useKavithai();
  const kav = kavithai[idx] || kavithai[0];
  if (!kav) return null;

  // Backend stores lines as newline-separated string; static data is an array
  const lines = Array.isArray(kav.lines)
    ? kav.lines
    : (kav.lines || "").split("\n").filter(Boolean);

  return (
    <div className="kavithai-card rounded-2xl p-10 text-center">
      {/* Counter */}
      <p
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 9,
          color: "rgba(255,182,193,.6)",
          letterSpacing: 3,
          marginBottom: 14,
        }}
      >
        கவிதை {idx + 1} / {kavithai.length}
      </p>

      {/* Title */}
      <h2
        style={{
          fontFamily: "'Noto Sans Tamil',sans-serif",
          fontSize: 26,
          color: "#FF6B9E",
          marginBottom: 28,
          textShadow: "0 0 20px rgba(255,77,141,.3)",
        }}
      >
        {kav.title}
      </h2>

      {/* Poem lines */}
      <div
        style={{
          borderLeft: "2px solid rgba(255,77,141,.5)",
          paddingLeft: 22,
          marginBottom: 24,
          textAlign: "left",
        }}
      >
        {lines.map((l, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'Noto Sans Tamil',sans-serif",
              fontSize: 17,
              lineHeight: 2.6,
              // Alternate between bright white and soft pink — clearly readable on dark bg
              color: i % 2 === 0 ? "#fff" : "#f48fb1",
            }}
          >
            {l}
          </p>
        ))}
      </div>

      {/* English translation */}
      {kav.translation && (
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 15,
            fontStyle: "italic",
            color: "#e8d5e0", // light pinkish-white — readable on dark
            lineHeight: 1.9,
            marginBottom: 26,
            padding: "14px 18px",
            background: "rgba(255,77,141,.08)",
            border: "1px solid rgba(255,77,141,.15)",
            borderRadius: 10,
          }}
        >
          "{kav.translation}"
        </p>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setIdx((idx - 1 + kavithai.length) % kavithai.length)}
          className="px-5 py-2 rounded-lg text-xs"
          style={{
            background: "rgba(255,77,141,.12)",
            border: "1px solid rgba(255,77,141,.3)",
            color: "#f48fb1",
            fontFamily: "'JetBrains Mono',monospace",
          }}
        >
          ← முந்தைய
        </button>
        <button
          onClick={() => setIdx((idx + 1) % kavithai.length)}
          className="px-5 py-2 rounded-lg text-xs"
          style={{
            background: "rgba(255,77,141,.2)",
            border: "1px solid rgba(255,77,141,.4)",
            color: "#fff",
            fontFamily: "'JetBrains Mono',monospace",
          }}
        >
          அடுத்த →
        </button>
      </div>
    </div>
  );
}
