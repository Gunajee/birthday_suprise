import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { spawnParticles } from '../../utils/effects'
import Section from '../ui/Section'

// Words that unlock something. Add more freely — each maps to an overlay name.
const WHISPER_WORDS = {
  love:   { overlay: 'loveletter',  unlockKey: '💌 Love letter found',        emoji: '💌' },
  star:   { overlay: 'starmap',     unlockKey: '🌌 Star map unlocked',        emoji: '🌌' },
  angel:  { overlay: 'nightangel',  unlockKey: '🌙 Night angel unlocked',     emoji: '🌙' },
  forever:{ overlay: 'forevernote', unlockKey: '♾️ Forever note found',       emoji: '♾️' },
  smile:  { overlay: 'smilenote',   unlockKey: null,                         emoji: '😊' }, // bonus — doesn't count toward the 30
}

/**
 * A real visible <input>, so the secret-word triggers work identically on
 * mobile (native keyboard pops up) and desktop. Replaces the old
 * window-level "keypress" listener which silently failed on touch devices.
 */
export default function SecretWhisperSection() {
  const { unlock, openOverlay } = useApp()
  const [value, setValue] = useState('')
  const [found, setFound] = useState(null)

  function handleChange(e) {
    const v = e.target.value
    setValue(v)
    const lower = v.toLowerCase().trim()
    const match = Object.keys(WHISPER_WORDS).find(word => lower.includes(word))
    if (match) {
      const { overlay, unlockKey, emoji } = WHISPER_WORDS[match]
      if (unlockKey) unlock(unlockKey)
      setFound(emoji)
      setTimeout(() => {
        openOverlay(overlay)
        setValue('')
        setFound(null)
      }, 500)
    }
  }

  function handleTap(e) {
    spawnParticles(e.clientX || window.innerWidth / 2, e.clientY || 400, 4)
  }

  return (
    <Section eyebrow="// SECRET WHISPER" title="Whisper Something Sweet 🤫" id="whisper">
      <div className="max-w-md mx-auto text-center">
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: '#a09098', marginBottom: 20, fontStyle: 'italic' }}>
          Type a word that\'s on your mind... some words unlock secrets. 💭
        </p>

        <div className="relative">
          <motion.input
            type="text"
            value={value}
            onChange={handleChange}
            onClick={handleTap}
            placeholder="type here... ✨"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            className="w-full text-center px-6 py-4 rounded-full outline-none"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 18,
              color: '#fff',
              background: 'rgba(255,77,141,.08)',
              border: '2px solid rgba(255,77,141,.3)',
              caretColor: '#FF4D8D',
            }}
            whileFocus={{ scale: 1.02, borderColor: 'rgba(255,77,141,.7)' }}
          />
          <AnimatePresence>
            {found && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1.4, y: -40 }}
                exit={{ opacity: 0 }}
                className="absolute left-1/2 top-1/2 text-3xl"
                style={{ transform: 'translateX(-50%)', pointerEvents: 'none' }}>
                {found}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,.15)', marginTop: 14 }}>
          // hint: try words like love, star, angel, forever, smile...
        </p>
      </div>
    </Section>
  )
}
