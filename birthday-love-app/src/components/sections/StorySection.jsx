import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useStoryChapters } from "../../hooks/useContent";
import { useApp } from "../../context/AppContext";
import Section from "../ui/Section";

function StoryCard({ ch, i }) {
  const { unlock, openOverlay } = useApp();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const isLeft = i % 2 === 0;
  return (
    <div
      ref={ref}
      className="flex items-center gap-6 mb-10"
      style={{ flexDirection: isLeft ? "row" : "row-reverse" }}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        onClick={() => {
          unlock(`📖 Story Ch.${i + 1} — ${ch.title}`);
          openOverlay("story", i);
        }}
        whileHover={{ scale: 1.03, y: -4 }}
        className="flex-1 glass-pink rounded-2xl p-6 cursor-pointer"
        style={{ boxShadow: "0 8px 32px rgba(255,77,141,.1)" }}
      >
        {/* Show photo if set (from admin panel), otherwise show icon */}
        {ch.photoUrl ? (
          <img
            src={ch.photoUrl}
            alt={ch.title}
            className="w-full rounded-xl mb-4"
            style={{ height: 140, objectFit: "cover" }}
          />
        ) : (
          <div className="text-4xl mb-3">{ch.icon}</div>
        )}
        <p
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 9,
            color: "#FF4D8D",
            letterSpacing: 2,
            marginBottom: 6,
          }}
        >
          CHAPTER {i + 1}
        </p>
        <h3
          style={{
            fontFamily: "'Great Vibes',cursive",
            fontSize: 28,
            color: "#f48fb1",
            marginBottom: 4,
          }}
        >
          {ch.title}
        </h3>
        <p
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 10,
            color: "#7a5060",
            marginBottom: 12,
          }}
        >
          {ch.subtitle || ch.sub}
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 15,
            lineHeight: 1.8,
            color: "#e8d5e0",
          }}
        >
          {(ch.description || ch.desc || "").slice(0, 90)}…
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 9,
            color: "rgba(255,77,141,.4)",
            marginTop: 10,
          }}
        >
          tap to read ✨
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-0 flex-shrink-0 hidden md:flex">
        <div className="timeline-line" style={{ width: 2, height: 40 }} />
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.3, type: "spring" }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
          style={{
            background: "linear-gradient(135deg,#FF4D8D,#A855F7)",
            boxShadow: "0 0 20px rgba(255,77,141,.5)",
          }}
        >
          {ch.icon}
        </motion.div>
        <div className="timeline-line" style={{ width: 2, height: 40 }} />
      </div>
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export default function StorySection() {
  const chapters = useStoryChapters();
  return (
    <Section
      eyebrow="// HER STORY — 5 CHAPTERS"
      title="An Angel's Journey 📖"
      id="story"
    >
      {chapters.map((ch, i) => (
        <StoryCard key={ch.id || i} ch={ch} i={i} />
      ))}
    </Section>
  );
}
