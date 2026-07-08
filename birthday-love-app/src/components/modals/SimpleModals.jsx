import React from "react";
import { motion } from "framer-motion";

export function MusicRevealModal() {
  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">🎵</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 38,
          color: "#FFD700",
          marginBottom: 16,
        }}
      >
        Favourite Song Unlocked!
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2,
          color: "#e8d5e0",
        }}
      >
        You found the cake secret! 🎂
        <br />
        <br />
        Scroll down to the Songs section and discover the melody that reminds me
        most of you.
      </p>
    </div>
  );
}

export function LongPressQuoteModal() {
  return (
    <div className="glass-purple rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 36,
          color: "#ce93d8",
          marginBottom: 16,
        }}
      >
        Special Quote Found
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: "italic",
          fontSize: 19,
          lineHeight: 2,
          color: "#e8d5e0",
        }}
      >
        "In a world full of temporary things, you are a permanent feeling."
      </p>
    </div>
  );
}

export function IdleModal() {
  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">⏳</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 36,
          color: "#FF4D8D",
          marginBottom: 16,
        }}
      >
        Still There? 👀
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2,
          color: "#e8d5e0",
        }}
      >
        Even when you're quiet and still, I notice you.
        <br />
        Just like now — patiently waiting, and I found you. 💖
      </p>
    </div>
  );
}

export function ShakeRevealModal() {
  return (
    <div className="glass-purple rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">📳</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 36,
          color: "#FFD700",
          marginBottom: 16,
        }}
      >
        You Shook The World!
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2,
          color: "#e8d5e0",
        }}
      >
        Just like you shake up my world every single day —<br />
        in the best, most wonderful way. 🌟
      </p>
    </div>
  );
}

export function SecretGreetModal() {
  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">🌟</div>
      <p
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 10,
          color: "#FF4D8D",
          letterSpacing: 4,
          marginBottom: 14,
        }}
      >
        // SECRET UNLOCKED
      </p>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 42,
          color: "#FFD700",
          marginBottom: 20,
        }}
      >
        You Found It!
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 17,
          lineHeight: 2.1,
          color: "#e8d5e0",
        }}
      >
        Not everyone finds this hidden message.
        <br />
        But you did — because{" "}
        <strong style={{ color: "#FF4D8D" }}>curiosity and wonder</strong> are
        the most beautiful things about you.
        <br />
        <br />
        You are rare. You are magical. You are irreplaceable. 💖
      </p>
    </div>
  );
}

export function KonamiModal() {
  return (
    <div className="glass-purple rounded-3xl p-10 text-center">
      <p
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 10,
          color: "#A855F7",
          letterSpacing: 4,
          marginBottom: 14,
        }}
      >
        // CHEAT CODE ACTIVATED
      </p>
      <div className="text-5xl mb-4">🎮💖</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 38,
          color: "#FF4D8D",
          marginBottom: 18,
        }}
      >
        She Found the Code!
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2.1,
          color: "#e8d5e0",
        }}
      >
        5 quick taps in the corner — the secret cheat code.
        <br />
        But the rarest cheat code in the universe isn't a tap pattern.
        <br />
        <br />
        <strong style={{ color: "#FF4D8D" }}>
          It's having someone like you in my life.
        </strong>
      </p>
    </div>
  );
}

export function LoveLetterModal() {
  return (
    <div className="glass-pink rounded-3xl p-9">
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 40,
          color: "#FF4D8D",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        A Letter For You 💌
      </h2>
      <div
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2.3,
          color: "#e8d5e0",
          borderLeft: "2px solid rgba(255,77,141,.3)",
          paddingLeft: 20,
        }}
      >
        <strong style={{ color: "#FFD700" }}>To Miss Rubiga,</strong>
        <br />
        <br />
        Some people become memories. Some become inspiration. And a very few
        become a reason to smile without even trying.
        <br />
        <br />
        This little corner was created with countless moments, smiles, and
        memories, hoping that when you found it, it would remind you of how much
        happiness you've brought into the lives of the people around you.
        <br />
        <br />
        Every photo, every colour, every tiny detail here carries a silent wish—
        that your life continues to be filled with laughter, good health,
        beautiful adventures, and dreams that come true.
        <br />
        <br />
        <strong style={{ color: "#FF4D8D" }}>
          Happy Birthday to an incredible person. Keep smiling, keep shining,
          and never stop being the wonderful soul that you are. The world is
          brighter because you're in it.
        </strong>
        <br />
        <br />
        <span
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 28,
            color: "#FF4D8D",
            display: "block",
            textAlign: "right",
          }}
        >
          — With Warm Wishes ❤️
        </span>
      </div>
    </div>
  );
}

export function NightAngelModal() {
  return (
    <div
      className="rounded-3xl p-10 text-center"
      style={{
        background: "rgba(2,3,12,.97)",
        border: "1px solid rgba(0,255,212,.18)",
      }}
    >
      <div className="text-5xl mb-4">🌙</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 40,
          color: "#80cbc4",
          marginBottom: 20,
        }}
      >
        Night Angel
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2.1,
          color: "#b2dfdb",
        }}
      >
        Even in the darkest night, you are the brightest light.
        <br />
        The moon itself borrows your glow.
        <br />
        <br />
        <strong style={{ color: "#80cbc4" }}>
          Happy Birthday, my night angel. ✨
        </strong>
      </p>
    </div>
  );
}

export function StarMapModal() {
  const stars = [
    [50, 18],
    [28, 48],
    [72, 42],
    [18, 74],
    [82, 68],
    [50, 84],
    [38, 33],
    [66, 22],
    [12, 38],
    [88, 28],
  ];
  const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [0, 6],
    [6, 7],
    [7, 8],
  ];
  return (
    <div
      className="rounded-3xl p-10 text-center"
      style={{
        background: "rgba(4,2,14,.97)",
        border: "1px solid rgba(168,85,247,.2)",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="220"
        height="220"
        style={{ margin: "0 auto", display: "block" }}
      >
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="rgba(4,2,14,.9)"
          stroke="rgba(168,85,247,.15)"
          strokeWidth="0.5"
        />
        {lines.map(([a, b], i) => (
          <line
            key={i}
            x1={stars[a][0]}
            y1={stars[a][1]}
            x2={stars[b][0]}
            y2={stars[b][1]}
            stroke="rgba(168,85,247,.3)"
            strokeWidth="0.4"
          />
        ))}
        {stars.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i < 6 ? 1.5 : 0.8}
            fill={i < 5 ? "#FF4D8D" : "#A855F7"}
          />
        ))}
      </svg>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 36,
          color: "#ce93d8",
          margin: "18px 0 10px",
        }}
      >
        Your Star Map 🌌
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2,
          color: "#c4b5d4",
        }}
      >
        On the night you were born, the stars aligned in a pattern the universe
        had never made before.
        <br />
        <br />
        <strong style={{ color: "#ce93d8" }}>
          A constellation that exists only once — named after you.
        </strong>
      </p>
    </div>
  );
}

export function ForeverNoteModal() {
  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">♾️</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 38,
          color: "#FFD700",
          marginBottom: 18,
        }}
      >
        Forever
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 17,
          lineHeight: 2.1,
          color: "#e8d5e0",
        }}
      >
        Forever is a long word.
        <br />
        But with you, it doesn't feel long enough.
        <br />
        <br />
        <strong style={{ color: "#FF4D8D" }}>
          I'd choose you in every lifetime. 💖
        </strong>
      </p>
    </div>
  );
}

export function SmileNoteModal() {
  return (
    <div className="glass-purple rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">😊</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 38,
          color: "#ce93d8",
          marginBottom: 18,
        }}
      >
        Your Smile
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 17,
          lineHeight: 2.1,
          color: "#e8d5e0",
        }}
      >
        Your smile is my favourite notification.
        <br />
        No sound, no buzz — just instant happiness. 🌸
      </p>
    </div>
  );
}

export function FourCornersModal() {
  return (
    <div className="glass-purple rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">🌗</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 38,
          color: "#ce93d8",
          marginBottom: 18,
        }}
      >
        Four Corners of My Heart
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2.1,
          color: "#e8d5e0",
        }}
      >
        You touched all four corners of the screen —<br />
        just like you touch every corner of my world.
        <br />
        <br />
        <strong style={{ color: "#A855F7" }}>
          No matter the direction, you find me there. 🌸
        </strong>
      </p>
    </div>
  );
}

export function PinchRevealModal() {
  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">🔭</div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 38,
          color: "#FFD700",
          marginBottom: 18,
        }}
      >
        Zoom In On Love
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2.1,
          color: "#e8d5e0",
        }}
      >
        The more you zoom in,
        <br />
        the more you'll see how much thought went into every detail of this page
        —<br />
        because that's exactly how much thought I put into you. 💖
      </p>
    </div>
  );
}

export function ButterflyCaughtModal() {
  return (
    <div className="glass-purple rounded-3xl p-10 text-center">
      <div
        className="text-5xl mb-4"
        style={{ animation: "float 2s ease-in-out infinite" }}
      >
        🦋
      </div>
      <h2
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 38,
          color: "#A855F7",
          marginBottom: 18,
        }}
      >
        You Caught Her!
      </h2>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          lineHeight: 2.1,
          color: "#e8d5e0",
        }}
      >
        Out of every butterfly drifting across this page, you found the one that
        mattered.
        <br />
        <br />
        <strong style={{ color: "#FF4D8D" }}>
          That's exactly how it feels to find you in a world full of people. 🌸
        </strong>
      </p>
    </div>
  );
}
