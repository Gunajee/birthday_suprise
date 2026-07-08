import React from "react";
import { motion } from "framer-motion";
import { useKavithai } from "../../hooks/useContent";
import { useApp } from "../../context/AppContext";
import Section from "../ui/Section";

function KavCard({ kav, i }) {
  const { unlock, openOverlay } = useApp();

  const lines = Array.isArray(kav.lines)
    ? kav.lines
    : (kav.lines || "").split("\n").filter(Boolean);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      initial={{ rotate: i % 2 === 0 ? -1.5 : 1.5 }}
      onClick={() => {
        unlock(`💌 Kavithai ${i + 1} — ${kav.title}`);
        openOverlay("kavithai", i);
      }}
      className="kavithai-card rounded-lg p-6 cursor-pointer relative"
    >
      <div className="absolute top-2 right-3 text-lg opacity-40">🌸</div>

      {/* Title — bright pink, clearly visible on dark card */}
      <h3
        style={{
          fontFamily: "'Noto Sans Tamil',sans-serif",
          fontSize: 19,
          color: "#FF6B9E",
          marginBottom: 12,
          textShadow: "0 0 12px rgba(255,77,141,.3)",
        }}
      >
        {kav.title}
      </h3>

      {/* First two lines preview — white & soft pink, readable on dark */}
      <p
        style={{
          fontFamily: "'Noto Sans Tamil',sans-serif",
          fontSize: 14,
          lineHeight: 2.2,
          color: "#fff",
        }}
      >
        {lines[0]}
      </p>
      {lines[1] && (
        <p
          style={{
            fontFamily: "'Noto Sans Tamil',sans-serif",
            fontSize: 14,
            lineHeight: 2.2,
            color: "#f48fb1",
          }}
        >
          {lines[1]}
        </p>
      )}

      <p
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 8,
          color: "rgba(255,182,193,.5)",
          marginTop: 10,
        }}
      >
        click to read full →
      </p>
    </motion.div>
  );
}

export default function KavithaiSection() {
  const kavithai = useKavithai();
  return (
    <Section
      eyebrow="// தமிழ் கவிதைகள்"
      title="Tamil Kavithai 💜"
      id="kavithai"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kavithai.map((kav, i) => (
          <KavCard key={kav.id || i} kav={kav} i={i} />
        ))}
      </div>
    </Section>
  );
}
