import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Fireflies from '../ui/Fireflies'
import { useApp } from '../../context/AppContext'
import { spawnParticles } from '../../utils/effects'

export default function ThankYouSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const { unlock, openOverlay } = useApp()
  const [taps, setTaps] = useState(0)

  function handleHeartTap(e) {
    spawnParticles(e.clientX, e.clientY, 8, ['💖'])
    const n = taps + 1
    setTaps(n)
    if (n >= 3) {
      setTaps(0)
      unlock('♾️ Forever note found', { confetti: true })
      openOverlay('forevernote')
    }
  }

  return (
    <section ref={ref} className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 z-10 overflow-hidden">
      <Fireflies count={18} />
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8 }}>
        <motion.div
          onClick={handleHeartTap}
          whileTap={{ scale: 1.3 }}
          className="text-5xl mb-6 cursor-pointer inline-block"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >💖</motion.div>
        <h2 className="text-shimmer" style={{ fontFamily: "'Great Vibes',cursive", fontSize: 'clamp(40px,7vw,70px)', marginBottom: 16 }}>
          Thank You ❤️
        </h2>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 22, color: '#e8d5e0', lineHeight: 2, maxWidth: 480, margin: '0 auto' }}>
          You made my life beautiful.<br />
          <strong style={{ color: '#FFD700' }}>Forever and Always.</strong>
        </p>
      </motion.div>
    </section>
  )
}
