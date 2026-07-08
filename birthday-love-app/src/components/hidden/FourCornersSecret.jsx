import { useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'

const CORNER_ZONE_PX = 60
const WINDOW_MS = 6000

/**
 * Tap all 4 corners of the screen (in any order) within a 6-second window.
 * Fully mobile-native — corners are easy to reach with a thumb, and this
 * uses plain onClick which fires identically for touch and mouse.
 */
export default function FourCornersSecret() {
  const { unlock, openOverlay } = useApp()
  const hitRef = useRef({ tl: false, tr: false, bl: false, br: false, firstHitTime: 0 })

  useEffect(() => {
    function handleClick(e) {
      const x = e.clientX, y = e.clientY
      const w = window.innerWidth, h = window.innerHeight
      const now = Date.now()
      const hits = hitRef.current

      // Reset the attempt if too much time has passed since the first corner tap
      if (hits.firstHitTime && now - hits.firstHitTime > WINDOW_MS) {
        hitRef.current = { tl: false, tr: false, bl: false, br: false, firstHitTime: 0 }
      }

      const inTL = x < CORNER_ZONE_PX && y < CORNER_ZONE_PX
      const inTR = x > w - CORNER_ZONE_PX && y < CORNER_ZONE_PX
      const inBL = x < CORNER_ZONE_PX && y > h - CORNER_ZONE_PX
      const inBR = x > w - CORNER_ZONE_PX && y > h - CORNER_ZONE_PX

      if (!(inTL || inTR || inBL || inBR)) return

      if (!hits.firstHitTime) hits.firstHitTime = now
      if (inTL) hits.tl = true
      if (inTR) hits.tr = true
      if (inBL) hits.bl = true
      if (inBR) hits.br = true

      if (hits.tl && hits.tr && hits.bl && hits.br) {
        unlock('🌗 Four corners secret', { fireworks: true })
        openOverlay('fourcorners')
        hitRef.current = { tl: false, tr: false, bl: false, br: false, firstHitTime: 0 }
      }
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return null
}
