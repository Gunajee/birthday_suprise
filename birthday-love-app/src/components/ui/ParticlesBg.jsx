import React, { useMemo } from 'react'

export default function ParticlesBg() {
  const dots = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    id: i, size: Math.random() * 6 + 3, left: Math.random() * 100,
    dur: Math.random() * 10 + 7, delay: Math.random() * 6,
  })), [])
  const stars = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i, color: Math.random() > 0.5 ? '255,77,141' : '168,85,247',
    size: Math.random() * 9 + 6, left: Math.random() * 100, top: Math.random() * 100,
    dur: Math.random() * 3 + 1.5, delay: Math.random() * 3,
  })), [])
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {dots.map(p => (
        <div key={p.id} style={{
          position: 'absolute', borderRadius: '50%',
          width: p.size, height: p.size, left: `${p.left}%`,
          background: 'radial-gradient(circle,rgba(255,77,141,.4),transparent)',
          animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
      {stars.map(s => (
        <div key={`s${s.id}`} style={{
          position: 'absolute', fontSize: s.size,
          color: `rgba(${s.color},.5)`,
          left: `${s.left}%`, top: `${s.top}%`,
          animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
        }}>✦</div>
      ))}
    </div>
  )
}
