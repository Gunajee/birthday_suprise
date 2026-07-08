import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MEMORY_GALLERY } from '../../data'

/**
 * Full photo viewer with prev/next navigation — essential once the
 * gallery holds 50+ photos rather than a handful. Supports:
 *   • ← / → keyboard arrows
 *   • swipe left/right on touch devices
 *   • tap the arrow buttons
 *
 * `idx` is an index into MEMORY_GALLERY (each photo is its own entry).
 * `onNavigate` lets the parent update which index is open so the Overlay
 * wrapper around this doesn't need to close/reopen between photos.
 */
export default function LightboxModal({ idx, onNavigate }) {
  const total = MEMORY_GALLERY.length
  const mem = MEMORY_GALLERY[idx] ?? MEMORY_GALLERY[0]
  const touchStartX = useRef(null)

  function goPrev() { onNavigate((idx - 1 + total) % total) }
  function goNext() { onNavigate((idx + 1) % total) }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx])

  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 60) goPrev()
    else if (delta < -60) goNext()
    touchStartX.current = null
  }

  return (
    <div className="text-center relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7a5060', marginBottom: 10 }}>
        {idx + 1} / {total}
      </p>

      <div className="relative mx-auto" style={{ width: 300, maxWidth: '90vw' }}>
        <button onClick={goPrev}
          className="absolute left-2 top-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ transform: 'translateY(-50%)', background: 'rgba(0,0,0,.4)', border: '1px solid rgba(255,255,255,.25)', color: '#fff' }}>
          ←
        </button>
        <button onClick={goNext}
          className="absolute right-2 top-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ transform: 'translateY(-50%)', background: 'rgba(0,0,0,.4)', border: '1px solid rgba(255,255,255,.25)', color: '#fff' }}>
          →
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl overflow-hidden"
            style={{ width: '100%', height: 380, background: mem.grad }}
          >
            {mem.photoUrl ? (
              <img src={mem.photoUrl} alt={mem.label} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl">🌸</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <h3 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 28, color: '#FF4D8D', marginTop: 16 }}>{mem.label}</h3>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 15, color: '#a09098', marginTop: 6 }}>{mem.note}</p>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7a5060', marginTop: 10 }}>{mem.year}</p>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,.2)', marginTop: 14 }}>
        ← swipe or use arrow keys →
      </p>
    </div>
  )
}
