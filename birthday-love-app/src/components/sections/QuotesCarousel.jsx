import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuotes } from "../../hooks/useContent";
import Section from "../ui/Section";

export default function QuotesCarousel() {
  const quotes = useQuotes();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Reset index if quotes change (e.g. admin adds/removes one)
  useEffect(() => {
    setIdx(0);
  }, [quotes.length]);

  useEffect(() => {
    if (paused || quotes.length === 0) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 5000);
    return () => clearInterval(t);
  }, [paused, quotes.length]);

  if (quotes.length === 0) return null;

  const q = quotes[idx];
  return (
    <Section
      eyebrow="// QUOTES JUST FOR YOU"
      title="Words From the Heart 💭"
      id="quotes"
    >
      <div
        className="max-w-2xl mx-auto glass-purple rounded-3xl p-10 text-center relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontStyle: "italic",
                fontSize: 24,
                color: "#fff",
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              "{q.text}"
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 11,
                color: "#A855F7",
                letterSpacing: 2,
              }}
            >
              — {q.author}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() =>
              setIdx((i) => (i - 1 + quotes.length) % quotes.length)
            }
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
            style={{
              background: "rgba(168,85,247,.15)",
              border: "1px solid rgba(168,85,247,.3)",
              color: "#ce93d8",
            }}
          >
            ←
          </button>
          <div className="flex gap-2">
            {quotes.map((_, i) => (
              <div
                key={i}
                onClick={() => setIdx(i)}
                className="cursor-pointer rounded-full transition-all"
                style={{
                  width: 8,
                  height: 8,
                  background: i === idx ? "#A855F7" : "rgba(168,85,247,.25)",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => setIdx((i) => (i + 1) % quotes.length)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
            style={{
              background: "rgba(168,85,247,.15)",
              border: "1px solid rgba(168,85,247,.3)",
              color: "#ce93d8",
            }}
          >
            →
          </button>
        </div>
      </div>
    </Section>
  );
}
