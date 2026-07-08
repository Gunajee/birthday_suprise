import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { spawnParticles, spawnFireworksBurst } from '../../utils/effects'
import { notifyProposalFound } from '../../utils/api'

const HEART_COUNT = 5
const SPAWN_INTERVAL_MS = 45000   // a new drifting heart appears roughly every 45s
const HEART_LIFETIME_MS = 14000   // each heart drifts for ~14s before fading

let heartIdSeq = 0

/**
 * Ultra-hidden, mobile-friendly proposal trigger.
 *
 * Tiny translucent hearts (almost invisible — low opacity, small size)
 * drift slowly across random spots on the page every ~45 seconds.
 * She must notice and tap exactly 5 of them (in any order, across any
 * span of time) to unlock the proposal. Nothing is ever announced —
 * discovering this is the whole point.
 *
 * Why this replaces "draw a heart with the mouse": that gesture relied on
 * mousedown/mousemove/mouseup which behave inconsistently with touch
 * scrolling on phones (the browser intercepts the drag as a scroll).
 * Discrete taps on a real element are 100% reliable on every device.
 */
export default function SecretHeartHunt() {
  const { unlock, openOverlay } = useApp()
  const [hearts, setHearts] = useState([])
  const foundCountRef = useRef(0)
  const triggeredRef = useRef(false)

  const spawnHeart = useCallback(() => {
    if (triggeredRef.current) return
    const id = heartIdSeq++
    const heart = {
      id,
      left: 8 + Math.random() * 84,   // vw %
      top: 12 + Math.random() * 70,   // vh %
      size: 10 + Math.random() * 6,   // small & subtle
      driftX: (Math.random() - 0.5) * 60,
      driftY: (Math.random() - 0.5) * 60,
      duration: HEART_LIFETIME_MS / 1000,
    }
    setHearts(prev => [...prev, heart])
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id))
    }, HEART_LIFETIME_MS)
  }, [])

  useEffect(() => {
    // First heart appears after a short delay, then on an interval.
    const firstDelay = setTimeout(spawnHeart, 8000)
    const interval = setInterval(spawnHeart, SPAWN_INTERVAL_MS)
    return () => { clearTimeout(firstDelay); clearInterval(interval) }
  }, [spawnHeart])

  function tapHeart(id, e) {
    e.stopPropagation()
    spawnParticles(e.clientX, e.clientY, 6, ['💖'])
    setHearts(prev => prev.filter(h => h.id !== id))
    foundCountRef.current += 1

    if (foundCountRef.current >= HEART_COUNT && !triggeredRef.current) {
      triggeredRef.current = true
      unlock('💍 PROPOSAL — The Deepest Secret', { fireworks: true })
      notifyProposalFound()
      spawnFireworksBurst()
      setTimeout(() => openOverlay('proposal'), 1200)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 700 }}>
      <AnimatePresence>
        {hearts.map(h => (
          <motion.div
            key={h.id}
            onClick={e => tapHeart(h.id, e)}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 0.55, 0.55, 0], x: h.driftX, y: h.driftY }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: h.duration, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: `${h.left}%`,
              top: `${h.top}%`,
              fontSize: h.size,
              pointerEvents: 'auto',
              cursor: 'pointer',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >💗</motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
