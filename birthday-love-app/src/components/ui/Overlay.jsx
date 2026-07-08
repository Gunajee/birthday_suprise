import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Overlay({ show, onClose, children, maxW = '700px' }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-[900] flex items-center justify-center p-5 overflow-y-auto"
          style={{ background: 'rgba(5,0,14,.97)', backdropFilter: 'blur(18px)' }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            style={{ maxWidth: maxW, width: '100%', position: 'relative', margin: 'auto' }}
          >
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110"
              style={{ background: 'rgba(255,77,141,.2)', border: '1px solid rgba(255,77,141,.4)', color: '#FF4D8D' }}
            >✕</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
