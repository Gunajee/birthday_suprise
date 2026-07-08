import React from 'react'
import { motion } from 'framer-motion'
import Fireflies from '../ui/Fireflies'

export function ProposalYesModal() {
  return (
    <div className="relative rounded-3xl overflow-hidden p-12 text-center"
      style={{ background: 'linear-gradient(135deg,rgba(20,5,40,.99),rgba(40,5,20,.99))', border: '2px solid rgba(255,77,141,.5)' }}>
      <Fireflies count={15} />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-6xl mb-5 z-10">💍💖💍</motion.div>
      <h2 className="text-shimmer z-10" style={{ fontFamily: "'Great Vibes',cursive", fontSize: 60, marginBottom: 14 }}>She Said Yes!</h2>
      <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 26, color: '#f48fb1', marginBottom: 22, zIndex: 2 }}>
        This is the beginning of forever… 🌸
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, lineHeight: 2.1, color: '#e8d5e0', zIndex: 2 }}>
        Every star in the sky tonight is celebrating you.<br />
        Every heartbeat from now on belongs to this moment.<br /><br />
        <strong style={{ color: '#FFD700' }}>Our story begins today. 💖</strong>
      </p>
    </div>
  )
}

export function ProposalWaitModal() {
  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <div className="text-5xl mb-4">😊</div>
      <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 36, color: '#ce93d8', marginBottom: 16 }}>Take Your Time</h2>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, lineHeight: 2, color: '#e8d5e0' }}>
        There's no rush. Whatever you decide, what we've shared has already made my life beautiful.<br /><br />
        I'll be here, however long it takes. 💕
      </p>
    </div>
  )
}
