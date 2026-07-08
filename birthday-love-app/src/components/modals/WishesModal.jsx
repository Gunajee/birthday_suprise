import React from 'react'
import { motion } from 'framer-motion'
import { getBirthdayMode, daysUntilBirthday } from '../../utils/birthdayDate'

export default function WishesModal() {
  const mode = getBirthdayMode()
  const daysLeft = daysUntilBirthday()

  const heading = mode === 'birthday' ? 'Happy Birthday!' : 'Advance Happy Birthday!'

  const bodyText = mode === 'birthday' ? (
    <>
      On this gorgeous day, the universe blessed us all — the day <strong style={{ color: '#FF4D8D' }}>you</strong> were born. 🌸<br /><br />
      You bring warmth into every room, laughter into every silence, and{' '}
      <strong style={{ color: '#ce93d8' }}>light into every dark corner</strong> of life.<br /><br />
      May this year overflow with joy, love, adventures, and{' '}
      <strong style={{ color: '#FFD700' }}>infinite beautiful moments</strong>. 🎂
    </>
  ) : (
    <>
      Your special day is only <strong style={{ color: '#FFD700' }}>{daysLeft} day{daysLeft === 1 ? '' : 's'}</strong> away —
      but I couldn{'\u2019'}t wait to start celebrating <strong style={{ color: '#FF4D8D' }}>you</strong>. 🌸<br /><br />
      You bring warmth into every room, laughter into every silence, and{' '}
      <strong style={{ color: '#ce93d8' }}>light into every dark corner</strong> of life, every single day of the year.<br /><br />
      Consider this an early little taste of all the love coming your way. 🎂
    </>
  )

  return (
    <div className="glass-pink rounded-3xl p-10 text-center">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl mb-4">🎂</motion.div>
      <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: 44, color: '#FFD700', marginBottom: 8, textShadow: '0 0 24px rgba(255,215,0,.35)' }}>
        {heading}
      </h2>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#FF4D8D', letterSpacing: 4, marginBottom: 24 }}>
        ✦ A VERY SPECIAL HUMAN ✦
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, lineHeight: 2.2, color: '#e8d5e0', marginBottom: 28 }}>
        {bodyText}
      </p>
      <div className="flex gap-2 justify-center flex-wrap">
        {['🎂','🎉','🌸','💖','🎁','🌺','🎊','💫','🌟','🎀'].map((e, i) => (
          <motion.span key={i} className="text-2xl" animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2 + i * 0.14, repeat: Infinity }}>{e}</motion.span>
        ))}
      </div>
    </div>
  )
}
