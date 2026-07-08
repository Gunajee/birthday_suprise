import React from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function Section({ eyebrow, title, children, id }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section id={id} ref={ref} className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        {eyebrow && (
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#FF4D8D', letterSpacing: 4, marginBottom: 10 }}>
            {eyebrow}
          </p>
        )}
        <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(32px,5vw,52px)', color: '#f48fb1' }}>
          {title}
        </h2>
      </motion.div>
      {children}
    </section>
  )
}
