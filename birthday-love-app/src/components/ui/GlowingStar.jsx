import React from 'react'
import { motion } from 'framer-motion'

export default function GlowingStar({ onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="fixed z-[850] cursor-pointer"
      style={{ bottom: '8%', left: '6%' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: [1, 1.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <div style={{
        fontSize: 32,
        filter: 'drop-shadow(0 0 12px #FFD700) drop-shadow(0 0 24px #FFD700)',
      }}>⭐</div>
    </motion.div>
  )
}
