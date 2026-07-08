import React from 'react'
import { motion } from 'framer-motion'
import { HIDDEN_LIST } from '../../data'

export default function HiddenCounter({ found, onClick }) {
  const pct = Math.round((found.size / HIDDEN_LIST.length) * 100)
  const bars = 15
  const filled = Math.round((pct / 100) * bars)
  const barText = '█'.repeat(filled) + '░'.repeat(bars - filled)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="fixed top-5 right-5 z-[800] cursor-pointer rounded-2xl p-3 glass-pink"
      style={{ minWidth: 180 }}
      animate={{
        boxShadow: [
          '0 0 16px rgba(255,77,141,.3)',
          '0 0 32px rgba(255,77,141,.6)',
          '0 0 16px rgba(255,77,141,.3)',
        ],
      }}
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🔐</span>
        <div>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#FF4D8D', letterSpacing: 2 }}>
            HIDDEN MEMORIES FOUND
          </p>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, color: '#fff', fontWeight: 700 }}>
            {found.size} <span style={{ color: '#A855F7' }}>/</span> {HIDDEN_LIST.length}
          </p>
        </div>
      </div>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#FFD700', letterSpacing: 0 }}>
        {barText}
      </p>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: 'rgba(255,255,255,.3)', textAlign: 'right', marginTop: 4 }}>
        tap to view map
      </p>
    </motion.div>
  )
}
