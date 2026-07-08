import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useGreetings } from "../../hooks/useContent";
import { spawnParticles } from "../../utils/effects";
import Section from "../ui/Section";

function GreetCard({ g, i }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: i * 0.04 }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={(e) => spawnParticles(e.clientX, e.clientY, 8)}
      className="glass-pink rounded-2xl p-5 cursor-pointer transition-all"
      style={{ boxShadow: "0 4px 24px rgba(255,77,141,.08)" }}
    >
      <div className="text-3xl mb-3">{g.emoji || g.e}</div>
      <h3
        style={{
          fontFamily: "'Great Vibes',cursive",
          fontSize: 20,
          color: "#FF4D8D",
          marginBottom: 6,
        }}
      >
        {g.title}
      </h3>
      <p
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 14,
          lineHeight: 1.8,
          color: "#e8d5e0",
        }}
      >
        {g.message || g.msg}
      </p>
    </motion.div>
  );
}

export default function GreetingsSection() {
  const greetings = useGreetings();
  return (
    <Section
      eyebrow="// BIRTHDAY GREETINGS FOR YOU"
      title="Wishes For You 💌"
      id="greetings"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {greetings.map((g, i) => (
          <GreetCard key={g.id || i} g={g} i={i} />
        ))}
      </div>
    </Section>
  );
}
