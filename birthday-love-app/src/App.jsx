import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import CelebrationPage from './pages/CelebrationPage'
import AdminPage from './pages/AdminPage'

/**
 * Top-level router.
 *   /        → the public birthday celebration + proposal site
 *   /admin   → password-gated content management dashboard
 *
 * AppProvider wraps both routes so the "found secrets" progress state
 * (used only by the celebration page) is available everywhere consistently,
 * even though /admin doesn't use it.
 */
export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<CelebrationPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </AppProvider>
  )
}
