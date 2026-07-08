import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { SONGS, FAVORITE_SONG } from '../../data'
import { spawnParticles } from '../../utils/effects'

export default function GuessSongGame() {
  const { unlock, openOverlay } = useApp()
  const [wrong, setWrong] = useState(null)

  function guess(title, e) {
    if (title === FAVORITE_SONG) {
      spawnParticles(e.clientX, e.clientY, 14)
      unlock('🍰 Cake 5-tap secret', { confetti: true })
      setTimeout(() => openOverlay('songwin'), 700)
    } else {
      setWrong(title)
      setTimeout(() => setWrong(null), 900)
    }
  }

  return (
    <div className="text-center">
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: '#e8d5e0', marginBottom: 20 }}>
        Which song do you think is my favourite? 🎵
      </p>
      <div className="flex flex-col gap-2 max-w-sm mx-auto">
        {SONGS.map((s, i) => (
          <motion.button key={i} onClick={e => guess(s.title, e)}
            whileHover={{ x: 4 }} whileTap={{ scale: 0.97 }}
            className="px-4 py-3 rounded-xl text-left flex items-center gap-3"
            style={{
              background: wrong === s.title ? 'rgba(251,146,60,.15)' : 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,77,141,.15)', color: '#e8d5e0',
            }}>
            <span>{s.e}</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15 }}>{s.title}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
