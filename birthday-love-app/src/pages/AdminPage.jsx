import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLoginPage from './AdminLoginPage'
import AdminLayout from '../components/admin/AdminLayout'
import DashboardPage from './admin/DashboardPage'
import HeroSettingsPage from './admin/HeroSettingsPage'
import QuotesPage from './admin/QuotesPage'
import GreetingsPage from './admin/GreetingsPage'
import StoryChaptersPage from './admin/StoryChaptersPage'
import KavithaiPage from './admin/KavithaiPage'
import SongsPage from './admin/SongsPage'
import VideosPage from './admin/VideosPage'
import MemoryGalleryPage from './admin/MemoryGalleryPage'
import { getStoredAdminPassword, adminLogin } from '../utils/contentApi'

/**
 * Gate for everything under /admin/*.
 *
 * On mount, if a password is already stored in sessionStorage (from a
 * previous successful login this tab session), it's silently re-verified
 * against the backend. Otherwise the login screen is shown.
 *
 * Session-scoped (not localStorage) intentionally — closing the browser
 * tab logs the admin out, which is the right default for a shared/family
 * computer scenario.
 */
export default function AdminPage() {
  const [authState, setAuthState] = useState('checking') // 'checking' | 'authed' | 'unauthed'

  useEffect(() => {
    const stored = getStoredAdminPassword()
    if (!stored) { setAuthState('unauthed'); return }
    adminLogin(stored)
      .then(() => setAuthState('authed'))
      .catch(() => setAuthState('unauthed'))
  }, [])

  if (authState === 'checking') {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0612', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          border: '3px solid rgba(168,85,247,.2)', borderTopColor: '#A855F7',
          animation: 'spin 1s linear infinite',
        }} />
      </div>
    )
  }

  if (authState === 'unauthed') {
    return <AdminLoginPage onSuccess={() => setAuthState('authed')} />
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/hero" element={<HeroSettingsPage />} />
        <Route path="/quotes" element={<QuotesPage />} />
        <Route path="/greetings" element={<GreetingsPage />} />
        <Route path="/story" element={<StoryChaptersPage />} />
        <Route path="/kavithai" element={<KavithaiPage />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/gallery" element={<MemoryGalleryPage />} />
      </Routes>
    </AdminLayout>
  )
}
