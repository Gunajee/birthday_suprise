import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'

const ICONS = ['🌸','💖','🌺','✨','🦋','🌙','💫','🎂']

function shuffleCards() {
  const pairs = [...ICONS, ...ICONS]
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pairs[i], pairs[j]] = [pairs[j], pairs[i]]
  }
  return pairs.map((icon, id) => ({ id, icon, flipped: false, matched: false }))
}

export default function MemoryMatchGame() {
  const { unlock, openOverlay } = useApp()
  const [cards, setCards] = useState(shuffleCards)
  const [selected, setSelected] = useState([])
  const [matchedCount, setMatchedCount] = useState(0)

  useEffect(() => {
    if (matchedCount === ICONS.length && matchedCount > 0) {
      unlock('🧩 Puzzle game completed', { confetti: true })
      setTimeout(() => openOverlay('puzzlewin'), 500)
    }
  }, [matchedCount])

  function flip(id) {
    if (selected.length === 2) return
    const card = cards.find(c => c.id === id)
    if (card.flipped || card.matched) return

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c)
    setCards(newCards)
    const newSelected = [...selected, id]
    setSelected(newSelected)

    if (newSelected.length === 2) {
      const [a, b] = newSelected
      const cardA = newCards.find(c => c.id === a)
      const cardB = newCards.find(c => c.id === b)
      if (cardA.icon === cardB.icon) {
        setTimeout(() => {
          setCards(prev => prev.map(c => (c.id === a || c.id === b) ? { ...c, matched: true } : c))
          setMatchedCount(m => m + 1)
          setSelected([])
        }, 500)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => (c.id === a || c.id === b) ? { ...c, flipped: false } : c))
          setSelected([])
        }, 900)
      }
    }
  }

  return (
    <div className="text-center">
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#7a5060', marginBottom: 16 }}>
        Matched: {matchedCount} / {ICONS.length}
      </p>
      <div className="grid grid-cols-4 gap-2 max-w-[320px] mx-auto">
        {cards.map(c => (
          <motion.div key={c.id} onClick={() => flip(c.id)}
            className="aspect-square rounded-xl cursor-pointer flex items-center justify-center text-2xl"
            style={{
              background: c.flipped || c.matched ? 'linear-gradient(135deg,#FF4D8D,#A855F7)' : 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,77,141,.2)',
            }}
            whileHover={{ scale: c.matched ? 1 : 1.05 }} whileTap={{ scale: 0.95 }}>
            <AnimatePresence>
              {(c.flipped || c.matched) && (
                <motion.span initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }}>{c.icon}</motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <button onClick={() => { setCards(shuffleCards()); setSelected([]); setMatchedCount(0) }}
        className="mt-5 text-xs px-4 py-2 rounded-full" style={{ background: 'rgba(255,77,141,.15)', color: '#f48fb1' }}>
        🔄 Restart
      </button>
    </div>
  )
}
