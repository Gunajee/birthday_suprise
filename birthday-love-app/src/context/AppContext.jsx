import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { notifySecretFound } from '../utils/api'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [found, setFound] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('bday_found') || '[]')) }
    catch { return new Set() }
  })
  const [nightMode, setNightMode] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [overlay, setOverlay] = useState(null)
  const [overlayData, setOverlayData] = useState(null)
  const [toast, setToast] = useState(null)
  const [glowingStar, setGlowingStar] = useState(false)

  // Persist progress to localStorage
  useEffect(() => {
    localStorage.setItem('bday_found', JSON.stringify([...found]))
    if (found.size >= 29 && !found.has('💍 PROPOSAL — The Deepest Secret')) {
      setGlowingStar(true)
    }
  }, [found])

  const unlock = useCallback((key, opts = {}) => {
    setFound(prev => {
      if (prev.has(key)) return prev
      const next = new Set([...prev, key])
      notifySecretFound(key) // fire-and-forget log to backend, never blocks the UI
      return next
    })
    showToast(`✨ Found: ${key}`)
    if (opts.fireworks) triggerFireworks()
    if (opts.confetti) triggerConfetti()
  }, [])

  function showToast(msg, duration = 3000) {
    setToast(msg)
    setTimeout(() => setToast(null), duration)
  }

  function triggerFireworks() {
    setShowFireworks(true)
    setTimeout(() => setShowFireworks(false), 4000)
  }

  function triggerConfetti() {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  function openOverlay(name, data = null) {
    setOverlay(name)
    setOverlayData(data)
  }

  function closeOverlay() {
    setOverlay(null)
    setOverlayData(null)
  }

  function resetProgress() {
    setFound(new Set())
    localStorage.removeItem('bday_found')
  }

  return (
    <AppContext.Provider value={{
      found, unlock, nightMode, setNightMode,
      showFireworks, triggerFireworks,
      showConfetti, triggerConfetti,
      overlay, overlayData, openOverlay, closeOverlay,
      toast, showToast,
      glowingStar, setGlowingStar,
      resetProgress,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
