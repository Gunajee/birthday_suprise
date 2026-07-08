import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Section from '../ui/Section'
import PuzzleGame from '../games/PuzzleGame'
import MemoryMatchGame from '../games/MemoryMatchGame'
import GuessColorGame from '../games/GuessColorGame'
import GuessSongGame from '../games/GuessSongGame'

const TABS = [
  { id: 'puzzle', label: '🧩 Puzzle', Comp: PuzzleGame },
  { id: 'match',  label: '🃏 Memory Match', Comp: MemoryMatchGame },
  { id: 'color',  label: '🎨 Guess Colour', Comp: GuessColorGame },
  { id: 'song',   label: '🎵 Guess Song', Comp: GuessSongGame },
]

export default function GamesSection() {
  const [tab, setTab] = useState('puzzle')
  const Active = TABS.find(t => t.id === tab).Comp

  return (
    <Section eyebrow="// FUN MINI GAMES" title="Play & Unlock 🎮" id="games">
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-4 py-2 rounded-full text-sm transition-all"
            style={{
              background: tab === t.id ? 'linear-gradient(135deg,#FF4D8D,#A855F7)' : 'rgba(255,255,255,.05)',
              color: tab === t.id ? '#fff' : '#a09098',
              fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
            }}>
            {t.label}
          </button>
        ))}
      </div>
      <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="glass-purple rounded-3xl p-8 max-w-lg mx-auto">
        <Active />
      </motion.div>
    </Section>
  )
}
