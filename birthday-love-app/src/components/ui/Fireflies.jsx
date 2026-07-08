import React, { useMemo } from 'react'

// Floating fireflies for night-mode / proposal scene
export default function Fireflies({ count = 25 }) {
  const flies = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: Math.random() * 4 + 3,
    delay: Math.random() * 4,
  })), [count])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {flies.map(f => (
        <div key={f.id} style={{
          position: 'absolute',
          width: 4, height: 4, borderRadius: '50%',
          background: '#FFD700',
          boxShadow: '0 0 8px 2px rgba(255,215,0,.8)',
          left: `${f.left}%`, top: `${f.top}%`,
          animation: `twinkle ${f.dur}s ease-in-out ${f.delay}s infinite, float ${f.dur * 1.5}s ease-in-out ${f.delay}s infinite`,
        }} />
      ))}
    </div>
  )
}
