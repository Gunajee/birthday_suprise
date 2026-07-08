import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TIMELINE } from "../../data";
import Section from "../ui/Section";

function YearCard({ t, i }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const isLeft = i % 2 === 0;
  return (
    <div ref={ref} className="relative flex items-center mb-12 md:mb-16">
      <div
        className="hidden md:block w-1/2"
        style={{ textAlign: isLeft ? "right" : "left", order: isLeft ? 0 : 2 }}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-pink rounded-2xl p-5 inline-block max-w-sm"
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 24,
              color: "#FFD700",
              fontWeight: 700,
            }}
          >
            {t.year}
          </p>
          <h4
            style={{
              fontFamily: "'Great Vibes',cursive",
              fontSize: 24,
              color: "#f48fb1",
              margin: "4px 0",
            }}
          >
            {t.title}
          </h4>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 14,
              color: "#e8d5e0",
            }}
          >
            {t.memory}
          </p>
        </motion.div>
      </div>
      <div className="md:w-0 flex justify-center relative" style={{ order: 1 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl z-10"
          style={{
            background: "linear-gradient(135deg,#FF4D8D,#A855F7)",
            boxShadow: "0 0 24px rgba(255,77,141,.5)",
          }}
        >
          {t.icon}
        </motion.div>
      </div>
      <div
        className="hidden md:block w-1/2"
        style={{ order: isLeft ? 2 : 0 }}
      />
      {/* Mobile version */}
      <div className="md:hidden flex-1 ml-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-pink rounded-2xl p-4"
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 18,
              color: "#FFD700",
              fontWeight: 700,
            }}
          >
            {t.year}
          </p>
          <h4
            style={{
              fontFamily: "'Great Vibes',cursive",
              fontSize: 20,
              color: "#f48fb1",
            }}
          >
            {t.title}
          </h4>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 13,
              color: "#e8d5e0",
            }}
          >
            {t.memory}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function TimelineSection() {
  return (
    <Section
      eyebrow="// OUR JOURNEY THROUGH TIME"
      title="2023 — 2026 🗓️"
      id="timeline"
    >
      <div className="relative">
        <div
          className="timeline-line hidden md:block absolute left-1/2 top-0 bottom-0"
          style={{ width: 2, transform: "translateX(-50%)" }}
        />
        {TIMELINE.map((t, i) => (
          <YearCard key={i} t={t} i={i} />
        ))}
      </div>
    </Section>
  );
}
