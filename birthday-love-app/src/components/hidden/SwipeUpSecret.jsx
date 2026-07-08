import { useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'

const SWIPE_THRESHOLD_PX = 80

/**
 * Mobile-native replacement for the old "shake phone" secret
 * (devicemotion is unreliable, needs iOS permission prompts, and many
 * Android browsers throttle it). A vertical swipe gesture is something
 * every phone handles perfectly with zero permissions required.
 *
 * Trigger: swipe up at least 80px starting from the bottom 20% of the screen.
 *
 * Implemented as window-level passive listeners (not a DOM overlay element),
 * so it NEVER blocks normal scrolling or taps anywhere on the page.
 * Renders nothing.
 */
export default function SwipeUpSecret() {
  const { unlock, openOverlay } = useApp()
  const startRef = useRef(null)
  const firedRef = useRef(false)

  useEffect(() => {
    function onTouchStart(e) {
      const t = e.touches[0]
      const fromBottomZone = t.clientY > window.innerHeight * 0.8
      startRef.current = fromBottomZone ? t.clientY : null
    }

    function onTouchEnd(e) {
      if (startRef.current == null || firedRef.current) return
      const t = e.changedTouches[0]
      const delta = startRef.current - t.clientY
      if (delta > SWIPE_THRESHOLD_PX) {
        firedRef.current = true
        unlock('📳 Swipe-up surprise', { confetti: true })
        openOverlay('shakereveal')
        setTimeout(() => { firedRef.current = false }, 4000) // allow re-trigger later
      }
      startRef.current = null
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return null
}
