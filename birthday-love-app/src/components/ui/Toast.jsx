import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Toast({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 60, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 60, x: '-50%' }}
          className="fixed bottom-28 left-1/2 z-[1100] px-6 py-3 rounded-full text-sm font-medium text-white"
          style={{
            background: 'linear-gradient(135deg,#FF4D8D,#A855F7)',
            boxShadow: '0 8px 32px rgba(255,77,141,.4)',
            fontFamily: "'JetBrains Mono',monospace",
            letterSpacing: '0.5px',
          }}
        >{msg}</motion.div>
      )}
    </AnimatePresence>
  )
}
