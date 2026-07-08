import React from 'react'
import { motion } from 'framer-motion'
import { isAfterBirthdayThisYear } from '../../utils/birthdayDate'

/**
 * Floating "Need a hint?" button — only rendered from July 14th onward
 * (i.e. after her birthday this year has passed). Never shown on or
 * before July 13th, so it doesn't spoil the birthday-day surprise itself.
 *
 * Opens a modal listing hints for every hidden secret EXCEPT the proposal
 * — see data/index.js HINTS, which deliberately omits it. This button
 * must never be wired to reveal anything about the proposal's existence.
 */
export default function HintsButton({ onClick }) {
  if (!isAfterBirthdayThisYear()) return null

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed z-[800] flex items-center gap-2 px-4 py-3 rounded-full"
      style={{
        bottom: 24, left: 24,
        background: 'linear-gradient(135deg,rgba(96,165,250,.18),rgba(168,85,247,.12))',
        border: '1px solid rgba(96,165,250,.4)',
        boxShadow: '0 8px 28px rgba(96,165,250,.2)',
        color: '#93c5fd',
      }}
    >
      <span style={{ fontSize: 18 }}>💡</span>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: 1 }}>
        Need a hint?
      </span>
    </motion.button>
  )
}
