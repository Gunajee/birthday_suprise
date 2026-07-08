import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fireflies from "../ui/Fireflies";
import FloatingHeart3D from "../3d/FloatingHeart3D";
import { spawnFireworksBurst, spawnFallingStars } from "../../utils/effects";

const LINES = [
  "From the day I met you, many moments became memories that I will always cherish. Your smile, your strength, and the way you carry yourself have always been special to me.I know that maybe your feelings are not the same as mine, and I understand that. Your eyes have always told me the truth, and I respect that truth.",
  "I’m sorry if anything I did ever made you feel uncomfortable or pressured. I never wanted to disturb your peace or take away your freedom. I only wanted to express what I felt in my heart.",
  "You are someone I truly admire — not because of what you can give me, but because of who you are. The way you stand strong, live independently, and follow your own path is something I respect deeply.",
  "I have only one small request... please never give me fake attention or fake love just to make me happy. I would rather accept a painful truth than live with a beautiful lie.Thank you for being a wonderful part of my life and for giving me memories I will always value. Keep smiling, keep shining, and keep being the strong, independent person you are. ❤️",
  "❤️",
  "I LIKE YOU SO MUCH, RUBI! ❤️",
  "I know the answer may not be what my heart wishes for, and maybe I already know what your eyes are telling me. But I still wanted to express this feeling because it was true and genuine from my side. I don't want you to feel pressured, and I don't expect anything from you. I just wanted you to know that someone truly admires you, respects you, and wishes the best for you.",
  "Will you be my crush for the rest of my life?",
];

function Typewriter({ text, onDone, speed = 45 }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const t = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(t);
        onDone && onDone();
      }
    }, speed);
    return () => clearInterval(t);
  }, [text]);
  return (
    <span>
      {shown}
      <span
        style={{
          borderRight: "2px solid #FFD700",
          animation: "blink 0.75s step-end infinite",
        }}
      />
    </span>
  );
}

export default function ProposalModal({ onYes, onWait }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    spawnFallingStars(15);
  }, []);

  function nextLine() {
    if (lineIdx < LINES.length - 1) {
      setTimeout(() => setLineIdx((i) => i + 1), 700);
    } else {
      setTimeout(() => setShowButtons(true), 800);
    }
  }

  return (
    <div
      className="relative rounded-3xl overflow-hidden p-10 text-center min-h-[480px] flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,.15), #0a0414 70%)",
        border: "1px solid rgba(255,215,0,.2)",
      }}
    >
      {/* Moon */}
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 36,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #FFF9E0, #FFD700)",
          boxShadow: "0 0 40px rgba(255,215,0,.5)",
        }}
      />
      <Fireflies count={20} />

      <p
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 10,
          color: "#FFD700",
          letterSpacing: 5,
          marginBottom: 24,
          zIndex: 2,
        }}
      >
        // THE DEEPEST SECRET · UNLOCKED BY HEART ❤
      </p>

      <div className="z-10 max-w-md mx-auto" style={{ minHeight: 160 }}>
        <AnimatePresence>
          {lineIdx >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FloatingHeart3D height={150} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontFamily:
                lineIdx >= 5
                  ? "'Great Vibes',cursive"
                  : "'Cormorant Garamond',serif",
              fontSize: lineIdx === 4 ? 50 : lineIdx === 5 ? 56 : 20,
              color: lineIdx === 5 ? "#FF4D8D" : "#fff",
              lineHeight: 1.8,
              fontStyle: lineIdx < 4 ? "italic" : "normal",
            }}
          >
            <Typewriter
              text={LINES[lineIdx]}
              onDone={nextLine}
              speed={lineIdx === 4 ? 200 : 40}
            />
          </motion.p>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 mt-10 flex gap-5 flex-wrap justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                spawnFireworksBurst();
                onYes();
              }}
              className="px-10 py-4 rounded-full text-white font-bold text-lg"
              style={{
                background: "linear-gradient(135deg,#FF4D8D,#A855F7)",
                boxShadow: "0 8px 32px rgba(255,77,141,.5)",
                fontFamily: "'Great Vibes',cursive",
                fontSize: 26,
              }}
            >
              Yes ❤️
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onWait}
              className="px-8 py-4 rounded-full text-sm"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.2)",
                color: "#e8d5e0",
              }}
            >
              Need Some Time 😊
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
