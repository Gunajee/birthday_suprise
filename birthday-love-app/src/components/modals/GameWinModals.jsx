import React from "react";
import { motion } from "framer-motion";

export function PuzzleWinModal() {
  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-5xl mb-4"
      >
        🧩
      </motion.div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 38,
          color: "#FFD700",
          marginBottom: 16,
        }}
      >
        Memory Unlocked!
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2,
          color: "#e8d5e0",
        }}
      >
        You solved it! Just like you've solved every puzzle in my life.
        <br />
        You found this little secret... Now keep this memory too: Your smile has
        always been one of life's most beautiful moments. 💖
      </p>
    </div>
  );
}

export function ColorWinModal() {
  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">🎨</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 38,
          color: "#FF4D8D",
          marginBottom: 16,
        }}
      >
        You Got It!
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2,
          color: "#e8d5e0",
        }}
      >
        You guessed right! 🎉
        <br />
        Like the endless sky, may your dreams have no limits and your smile
        never fade. 💙🌈
      </p>
    </div>
  );
}

export function SongWinModal() {
  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">🎵</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 38,
          color: "#FF4D8D",
          marginBottom: 16,
        }}
      >
        Perfect Guess!
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2,
          color: "#e8d5e0",
        }}
      >
        You know me so well. 🎶
        <br />
        Some songs are just melodies... but this one will always remind me of
        the way you inspire, encourage, and brighten every journey. 💙
      </p>
    </div>
  );
}
