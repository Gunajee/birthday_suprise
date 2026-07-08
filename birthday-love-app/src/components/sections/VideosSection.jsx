import React from "react";
import { motion } from "framer-motion";
import { useVideos } from "../../hooks/useContent";
import { useApp } from "../../context/AppContext";
import Section from "../ui/Section";

function VideoCard({ v, i }) {
  const { unlock, openOverlay } = useApp();
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        unlock("🎬 Video Gallery unlocked");
        openOverlay("video", i);
      }}
      className="glass-pink rounded-2xl overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 8px 32px rgba(255,77,141,.1)" }}
    >
      <div
        className="h-40 flex items-center justify-center relative"
        style={{ background: "linear-gradient(135deg,#1a0530,#300510)" }}
      >
        {v.thumbnailUrl ? (
          <img
            src={v.thumbnailUrl}
            alt={v.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}
        <div className="text-center z-10">
          <div className="text-4xl mb-2">{v.emoji || v.e || "🎬"}</div>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-lg text-white"
            style={{
              background: "rgba(255,77,141,.25)",
              border: "2px solid rgba(255,77,141,.6)",
            }}
          >
            ▶
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3
          style={{
            fontFamily: "'Great Vibes',cursive",
            fontSize: 22,
            color: "#FF4D8D",
          }}
        >
          {v.title}
        </h3>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 13,
            color: "#7a5060",
            marginTop: 4,
          }}
        >
          {v.description || v.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function VideosSection() {
  const videos = useVideos();
  if (videos.length === 0) return null;
  return (
    <Section eyebrow="// VIDEO GALLERY" title="Her Best Edits 🎬" id="videos">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((v, i) => (
          <VideoCard key={v.id || i} v={v} i={i} />
        ))}
      </div>
    </Section>
  );
}
