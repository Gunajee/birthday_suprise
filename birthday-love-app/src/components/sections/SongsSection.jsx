import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { SONGS } from "../../data";
import { spawnParticles } from "../../utils/effects";
import Section from "../ui/Section";

export default function SongsSection() {
  const { unlock } = useApp();
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(0);
  const aRef = useRef();

  function toggle() {
    const a = aRef.current;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
      unlock("🎵 Song played");
      unlock("🎵 Music Player unlocked");
    }
  }

  function pick(i, e) {
    if (e) spawnParticles(e.clientX, e.clientY, 6);
    setCur(i);
    setPlaying(false);
    setProg(0);
    setTimeout(() => {
      aRef.current.load();
      aRef.current.play().catch(() => {});
      setPlaying(true);
      unlock("🎵 Song played");
    }, 80);
  }

  const s = SONGS[cur];
  return (
    <Section
      eyebrow="// SONGS FOR HER SOUL"
      title="Favourite Songs 🎵"
      id="songs"
    >
      <audio
        ref={aRef}
        src={s.url}
        onTimeUpdate={(e) =>
          setProg((e.target.currentTime / e.target.duration) * 100 || 0)
        }
        onEnded={() => pick((cur + 1) % SONGS.length, null)}
      />
      <div className="max-w-xl mx-auto">
        <motion.div
          className="glass-pink rounded-3xl p-8 mb-6 text-center"
          animate={{
            boxShadow: playing
              ? [
                  "0 0 20px rgba(255,77,141,.3)",
                  "0 0 50px rgba(255,77,141,.6)",
                  "0 0 20px rgba(255,77,141,.3)",
                ]
              : "0 0 20px rgba(255,77,141,.2)",
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={playing ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            {s.e}
          </motion.div>
          <h3
            style={{
              fontFamily: "'Great Vibes',cursive",
              fontSize: 30,
              color: "#f48fb1",
              marginBottom: 4,
            }}
          >
            {s.title}
          </h3>
          <p
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 10,
              color: "#7a5060",
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            {s.film} · {s.artist}
          </p>
          <div
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              aRef.current.currentTime =
                (aRef.current.duration * (e.clientX - r.left)) / r.width;
            }}
            className="h-2 rounded-full cursor-pointer mb-6"
            style={{ background: "rgba(255,255,255,.08)" }}
          >
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${prog}%` }}
              transition={{ duration: 0.3 }}
              style={{ background: "linear-gradient(90deg,#FF4D8D,#A855F7)" }}
            />
          </div>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => pick((cur - 1 + SONGS.length) % SONGS.length, e)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm"
              style={{
                background: "rgba(255,77,141,.15)",
                border: "1px solid rgba(255,77,141,.3)",
                color: "#f48fb1",
              }}
            >
              ⏮
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggle}
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl text-white"
              style={{
                background: "linear-gradient(135deg,#FF4D8D,#A855F7)",
                boxShadow: "0 4px 20px rgba(255,77,141,.4)",
              }}
            >
              {playing ? "⏸" : "▶"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => pick((cur + 1) % SONGS.length, e)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm"
              style={{
                background: "rgba(255,77,141,.15)",
                border: "1px solid rgba(255,77,141,.3)",
                color: "#f48fb1",
              }}
            >
              ⏭
            </motion.button>
          </div>
        </motion.div>

        <div className="flex flex-col gap-2">
          {SONGS.map((sg, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              onClick={(e) => pick(i, e)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
              style={{
                background:
                  i === cur ? "rgba(255,77,141,.18)" : "rgba(255,255,255,.03)",
                border: `1px solid ${i === cur ? "rgba(255,77,141,.35)" : "transparent"}`,
              }}
            >
              <span className="text-xl">{sg.e}</span>
              <div className="flex-1">
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 15,
                    color: i === cur ? "#f48fb1" : "#e8d5e0",
                  }}
                >
                  {sg.title}
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 9,
                    color: "#7a5060",
                  }}
                >
                  {sg.artist}
                </p>
              </div>
              {i === cur && playing && (
                <span
                  style={{
                    color: "#FF4D8D",
                    animation: "float 1s ease-in-out infinite",
                  }}
                >
                  ♫
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <p
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 8,
            color: "rgba(255,255,255,.08)",
            textAlign: "center",
            marginTop: 12,
          }}
        >
          // replace URLs with her actual songs in /src/assets/songs/
        </p>
      </div>
    </Section>
  );
}
