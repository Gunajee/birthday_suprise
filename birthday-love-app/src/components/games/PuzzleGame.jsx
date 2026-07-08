import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

// Simple 3x3 sliding puzzle (numbers 1-8 + blank). Solve to unlock a memory.
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0]

export default function PuzzleGame() {
  const { unlock, openOverlay } = useApp()
  const [tiles, setTiles] = useState(() => shuffle(SOLVED))
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)

  useEffect(() => {
    if (JSON.stringify(tiles) === JSON.stringify(SOLVED) && moves > 0) {
      setWon(true)
      unlock('🧩 Puzzle game completed', { confetti: true })
      setTimeout(() => openOverlay('puzzlewin'), 600)
    }
  }, [tiles])

  function move(i) {
    const blank = tiles.indexOf(0)
    const validMoves = [blank - 1, blank + 1, blank - 3, blank + 3]
    const isRowMatch = (blank % 3 !== 0 || i !== blank - 1) && (blank % 3 !== 2 || i !== blank + 1)
    if (validMoves.includes(i) && isRowMatch) {
      const next = [...tiles]
      ;[next[i], next[blank]] = [next[blank], next[i]]
      setTiles(next)
      setMoves(m => m + 1)
    }
  }

  return (
    <div className="text-center">
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#7a5060', marginBottom: 16 }}>
        Moves: {moves} {won && '— Solved! 🎉'}
      </p>
      <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto">
        {tiles.map((t, i) => (
          <motion.div key={i} onClick={() => move(i)}
            whileHover={{ scale: t !== 0 ? 1.05 : 1 }} whileTap={{ scale: t !== 0 ? 0.95 : 1 }}
            className="aspect-square rounded-xl flex items-center justify-center cursor-pointer text-2xl font-bold"
            style={{
              background: t === 0 ? 'transparent' : 'linear-gradient(135deg,#FF4D8D,#A855F7)',
              color: '#fff', boxShadow: t === 0 ? 'none' : '0 4px 16px rgba(255,77,141,.3)',
            }}>
            {t !== 0 && t}
          </motion.div>
        ))}
      </div>
      <button onClick={() => { setTiles(shuffle(SOLVED)); setMoves(0); setWon(false) }}
        className="mt-5 text-xs px-4 py-2 rounded-full" style={{ background: 'rgba(255,77,141,.15)', color: '#f48fb1' }}>
        🔄 Shuffle Again
      </button>
    </div>
  )
}
