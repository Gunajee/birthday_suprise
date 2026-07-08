import React from 'react'
import { HINTS } from '../../data'

/**
 * Lists a hint for every hidden secret EXCEPT the proposal — HINTS
 * (data/index.js) deliberately has no entry for it, so there is nothing
 * here that could reveal it even by omission-spotting (the list simply
 * never mentions a "final" item — it reads as complete on its own).
 *
 * Found secrets show with a checkmark and no hint text (no need — she
 * already has it). Unfound ones show their hint to nudge her along.
 */
export default function HintsModal({ found }) {
  const entries = Object.entries(HINTS)

  return (
    <div className="glass-purple rounded-3xl p-8" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">💡</div>
        <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 32, color: '#93c5fd' }}>Hints</h2>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7a5060', letterSpacing: 1, marginTop: 4 }}>
          A LITTLE NUDGE FOR ANYTHING YOU HAVEN'T FOUND YET
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {entries.map(([key, hint]) => {
          const isFound = found.has(key)
          const displayName = key.replace(/^\S+\s/, '')
          return (
            <div key={key}
              className="flex items-start gap-3 px-4 py-3 rounded-xl"
              style={{ background: isFound ? 'rgba(52,211,153,.06)' : 'rgba(255,255,255,.03)' }}>
              <span style={{ fontSize: 15, marginTop: 1 }}>{isFound ? '✅' : '🔒'}</span>
              <div className="flex-1">
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: isFound ? '#34D399' : '#e8d5e0' }}>
                  {displayName}
                </p>
                {!isFound && (
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 13, color: '#93c5fd', marginTop: 2 }}>
                    {hint}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
