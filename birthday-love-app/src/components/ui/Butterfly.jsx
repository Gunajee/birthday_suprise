import React, { useId, useMemo } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════
// A single, beautifully-detailed animated butterfly.
//
// Design notes:
//  • Built from layered SVG paths (forewing + hindwing per side, plus
//    a body/antennae) rather than a flat icon — gives real depth and
//    lets the wing patterns catch light believably.
//  • Wings flap via a fast scaleX oscillation on each side, which reads
//    as a believable flutter rather than a flat squash.
//  • Colour-shifts continuously through a curated gradient stop sequence
//    (rose → gold → violet → sky → rose) using Framer Motion's animate
//    on the gradient's stop-color attributes — buttery smooth, GPU-cheap.
//  • The whole butterfly drifts along a wandering path (independent x/y
//    keyframe arrays) with gentle rotation, so it feels alive rather
//    than looping mechanically.
//  • Fully presentational/decorative by default: pointer-events disabled,
//    never blocks taps on anything underneath, unless an onClick is
//    explicitly provided (used for the hidden "catch the butterfly" secret).
// ═══════════════════════════════════════════════════════════

const COLOR_STOPS = [
  ['#FF4D8D', '#FFD700'], // rose → gold
  ['#A855F7', '#FF4D8D'], // violet → rose
  ['#60A5FA', '#A855F7'], // sky → violet
  ['#FFD700', '#34D399'], // gold → mint
  ['#FF4D8D', '#A855F7'], // back toward rose → violet
]

function WingPair({ gradId, side = 1 }) {
  // side: 1 = right wing, -1 = left wing (mirrored via scaleX)
  return (
    <g transform={`scale(${side},1)`}>
      {/* Forewing (upper, larger) */}
      <path
        d="M2,0 C 18,-22 42,-26 50,-10 C 56,2 50,16 34,20 C 20,23 6,16 2,0 Z"
        fill={`url(#${gradId})`}
        opacity="0.95"
      />
      {/* Forewing pattern accent */}
      <ellipse cx="26" cy="2" rx="7" ry="4" fill="rgba(255,255,255,0.35)" />
      <circle cx="36" cy="-4" r="2.4" fill="rgba(255,255,255,0.55)" />

      {/* Hindwing (lower, smaller) */}
      <path
        d="M2,2 C 14,18 28,26 24,34 C 20,40 6,38 1,28 C -2,20 -1,9 2,2 Z"
        fill={`url(#${gradId})`}
        opacity="0.85"
      />
      <circle cx="14" cy="24" r="2" fill="rgba(255,255,255,0.4)" />
    </g>
  )
}

export default function Butterfly({
  size = 46,
  duration = 18,
  delay = 0,
  startX = '10%',
  startY = '30%',
  pathX,   // array of x keyframes (px), e.g. ["0px","120px","-60px","90px","0px"]
  pathY,
  opacity = 0.9,
  onClick,
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const gradId = `bfly-grad-${uid}`

  const flightX = pathX || ['0px', '120px', '-60px', '90px', '0px']
  const flightY = pathY || ['0px', '-70px', '-30px', '-110px', '0px']

  // Precompute the colour-stop animation sequence (loops through COLOR_STOPS)
  const stopSequence = useMemo(() => {
    const seq = [...COLOR_STOPS, COLOR_STOPS[0]]
    return {
      c1: seq.map(s => s[0]),
      c2: seq.map(s => s[1]),
    }
  }, [])

  return (
    <motion.div
      style={{
        position: 'absolute', left: startX, top: startY,
        width: size, height: size, pointerEvents: onClick ? 'auto' : 'none', zIndex: 5,
        willChange: 'transform', cursor: onClick ? 'pointer' : 'default',
      }}
      animate={{ x: flightX, y: flightY, rotate: [0, 8, -6, 10, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
      onClick={onClick}
      whileTap={onClick ? { scale: 1.3 } : {}}
    >
      {/* Generous invisible tap padding around the visual SVG — makes catching
          the butterfly on a phone screen realistic without enlarging the art itself. */}
      {onClick && (
        <div style={{ position: 'absolute', inset: -16, borderRadius: '50%' }} />
      )}

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '100%', height: '100%' }}
      >
        <svg
          viewBox="-60 -40 120 90"
          width={size}
          height={size}
          style={{ opacity, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.25))', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop
                offset="0%"
                animate={{ stopColor: stopSequence.c1 }}
                transition={{ duration: duration * 1.4, repeat: Infinity, ease: 'linear' }}
              />
              <motion.stop
                offset="100%"
                animate={{ stopColor: stopSequence.c2 }}
                transition={{ duration: duration * 1.4, repeat: Infinity, ease: 'linear' }}
              />
            </linearGradient>
          </defs>

          {/* Right wing pair — flaps via fast scaleX oscillation */}
          <motion.g
            style={{ transformOrigin: '0px 0px' }}
            animate={{ scaleX: [1, 0.55, 1] }}
            transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
          >
            <WingPair gradId={gradId} side={1} />
          </motion.g>

          {/* Left wing pair — mirrored, same flap rhythm */}
          <motion.g
            style={{ transformOrigin: '0px 0px' }}
            animate={{ scaleX: [1, 0.55, 1] }}
            transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
          >
            <WingPair gradId={gradId} side={-1} />
          </motion.g>

          {/* Body */}
          <path d="M0,-14 C 2,-6 2,8 0,18 C -2,8 -2,-6 0,-14 Z" fill="#2a1a30" />
          {/* Antennae */}
          <path d="M-1,-14 C -6,-22 -10,-26 -12,-30" stroke="#2a1a30" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M1,-14 C 6,-22 10,-26 12,-30" stroke="#2a1a30" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <circle cx="-12" cy="-30" r="1.6" fill="#2a1a30" />
          <circle cx="12" cy="-30" r="1.6" fill="#2a1a30" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
