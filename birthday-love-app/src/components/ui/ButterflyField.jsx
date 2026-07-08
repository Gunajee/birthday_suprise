import React, { useMemo } from 'react'
import Butterfly from './Butterfly'

/**
 * Scatters a handful of Butterfly instances across the viewport with
 * varied size, flight speed, colour-cycle phase (via delay), and
 * wandering flight paths — so it reads as a small living swarm rather
 * than one element looping identically.
 *
 * One randomly-chosen butterfly per mount is "catchable" — tapping it
 * fires onCatch (used by the celebration page to unlock a hidden secret).
 * The catchable one isn't visually marked, so finding it is genuinely
 * a matter of curiosity/luck, consistent with the rest of the hidden
 * secrets on this site.
 *
 * Purely decorative otherwise: fixed, full-viewport, pointer-events none
 * on the container so it never intercepts taps/clicks on real content.
 * Count is kept modest (default 5) to stay light on mobile GPUs.
 */
export default function ButterflyField({ count = 5, onCatch }) {
  const catchableIndex = useMemo(() => Math.floor(Math.random() * count), [count])

  const butterflies = useMemo(() => {
    const startCorners = [
      { x: '8%', y: '18%' }, { x: '78%', y: '12%' }, { x: '15%', y: '62%' },
      { x: '85%', y: '58%' }, { x: '45%', y: '8%' }, { x: '55%', y: '75%' },
    ]
    return Array.from({ length: count }, (_, i) => {
      const corner = startCorners[i % startCorners.length]
      const dir = i % 2 === 0 ? 1 : -1
      return {
        id: i,
        size: 32 + Math.random() * 26,
        duration: 16 + Math.random() * 10,
        delay: i * 1.6,
        startX: corner.x,
        startY: corner.y,
        opacity: 0.55 + Math.random() * 0.35,
        pathX: [
          '0px',
          `${dir * (80 + Math.random() * 80)}px`,
          `${-dir * (40 + Math.random() * 60)}px`,
          `${dir * (60 + Math.random() * 90)}px`,
          '0px',
        ],
        pathY: [
          '0px',
          `${-(60 + Math.random() * 70)}px`,
          `${-(20 + Math.random() * 40)}px`,
          `${-(90 + Math.random() * 80)}px`,
          '0px',
        ],
      }
    })
  }, [count])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
      {butterflies.map((b, i) => (
        <Butterfly
          key={b.id}
          size={b.size}
          duration={b.duration}
          delay={b.delay}
          startX={b.startX}
          startY={b.startY}
          pathX={b.pathX}
          pathY={b.pathY}
          opacity={b.opacity}
          onClick={i === catchableIndex && onCatch ? (e) => onCatch(e) : undefined}
        />
      ))}
    </div>
  )
}
