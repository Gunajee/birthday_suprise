import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { GAME_COLORS, FAVORITE_COLOR } from '../../data'
import { spawnParticles } from '../../utils/effects'

export default function GuessColorGame() {
  const { unlock, openOverlay } = useApp()
  const [result, setResult] = useState(null)

  function guess(color, e) {
    if (color === FAVORITE_COLOR) {
      spawnParticles(e.clientX, e.clientY, 14)
      setResult('correct')
      unlock('🌟 Secret name greeting', { confetti: true })
      setTimeout(() => openOverlay('colorwin'), 800)
    } else {
      setResult('wrong')
      setTimeout(() => setResult(null), 1000)
    }
  }

  return (
    <div className="text-center">
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: '#e8d5e0', marginBottom: 20 }}>
        Can you guess my favourite colour? 🎨
      </p>
      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-4">
        {GAME_COLORS.map((c, i) => (
          <motion.div key={i} onClick={e => guess(c, e)}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full cursor-pointer mx-auto"
            style={{ background: c, boxShadow: `0 4px 20px ${c}66` }} />
        ))}
      </div>
      {result === 'wrong' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#FB923C', fontFamily: "'Cormorant Garamond',serif" }}>
          Not quite — try again! 💭
        </motion.p>
      )}
    </div>
  )
}
