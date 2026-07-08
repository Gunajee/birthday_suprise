import React, { useEffect } from 'react'
import Confetti from 'react-confetti'
import { useApp } from '../../context/AppContext'
import { spawnFireworksBurst } from '../../utils/effects'

export default function EffectsLayer() {
  const { showFireworks, showConfetti } = useApp()

  useEffect(() => {
    if (showFireworks) spawnFireworksBurst()
  }, [showFireworks])

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={250}
          recycle={false}
          colors={['#FF4D8D', '#A855F7', '#FFD700', '#60A5FA', '#34D399']}
          style={{ position: 'fixed', zIndex: 9997, pointerEvents: 'none' }}
        />
      )}
    </>
  )
}
