import React from 'react'
import { motion } from 'framer-motion'

export default function FinalSecretModal() {
  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="text-6xl mb-5">✨</motion.div>
      <h2 className="text-shimmer" style={{ fontFamily: "'Great Vibes',cursive", fontSize: 44, marginBottom: 14 }}>
        Congratulations ❤️
      </h2>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, lineHeight: 2, color: '#e8d5e0' }}>
        You discovered all hidden memories.<br /><br />
        Every secret, every surprise, every hidden corner of this page — you found it all.<br />
        Just like you've found every hidden corner of my heart. 💖
      </p>
    </div>
  )
}
