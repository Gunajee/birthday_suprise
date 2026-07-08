import React from 'react'
import { motion } from 'framer-motion'
import { MEMORY_GALLERY } from '../../data'

/**
 * Shown when the double-tap secret on the hero photo fires. With 50+
 * photos now living in the full Memory Gallery section (with year filters
 * and pagination), this no longer tries to cram a mini-grid into a popup —
 * it announces the unlock and invites her to scroll down, with a quick
 * "Take me there" button for convenience.
 */
export default function GalleryModal({ onClose }) {
  function scrollToGallery() {
    onClose?.()
    setTimeout(() => {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 200)
  }

  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="text-5xl mb-4">📸</motion.div>
      <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 36, color: '#FF4D8D', marginBottom: 10 }}>
        Memory Gallery Unlocked
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: '#e8d5e0', lineHeight: 1.9, marginBottom: 8 }}>
        {MEMORY_GALLERY.length} memories are waiting for you in the gallery below —
        every year, every smile, every moment worth keeping.
      </p>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7a5060', marginBottom: 24 }}>
        // double-tap secret triggered ✨
      </p>
      <motion.button
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        onClick={scrollToGallery}
        className="px-6 py-3 rounded-full text-sm"
        style={{ background: 'linear-gradient(135deg,#FF4D8D,#A855F7)', color: '#fff', fontFamily: "'Cormorant Garamond',serif" }}
      >
        Take me there ↓
      </motion.button>
    </div>
  )
}
