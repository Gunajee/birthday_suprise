import { useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'

/**
 * Pinch-out (zoom-in) gesture with two fingers anywhere on the page.
 * Fully mobile-native — this is a gesture every phone user already knows
 * instinctively. Listens at the window level via passive touch handlers,
 * never blocks normal scrolling or other taps.
 */
export default function PinchSecret() {
  const { unlock, openOverlay } = useApp()
  const startDist = useRef(null)
  const firedRef = useRef(false)

  useEffect(() => {
    function dist(touches) {
      const [a, b] = touches
      return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
    }

    function onTouchStart(e) {
      if (e.touches.length === 2) {
        startDist.current = dist(e.touches)
        firedRef.current = false
      }
    }

    function onTouchMove(e) {
      if (e.touches.length !== 2 || !startDist.current || firedRef.current) return
      const current = dist(e.touches)
      if (current - startDist.current > 120) { // generous pinch-out threshold
        firedRef.current = true
        unlock('🔭 Pinch-zoom secret', { confetti: true })
        openOverlay('pinchreveal')
      }
    }

    function onTouchEnd() {
      startDist.current = null
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return null
}
