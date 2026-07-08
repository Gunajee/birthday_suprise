import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import AdminBackdrop3D from '../3d/AdminBackdrop3D'
import { clearStoredAdminPassword } from '../../utils/contentApi'

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/hero', label: 'Hero & Photo', icon: '👑' },
  { path: '/admin/quotes', label: 'Quotes', icon: '💭' },
  { path: '/admin/greetings', label: 'Greetings', icon: '💌' },
  { path: '/admin/story', label: 'Story Chapters', icon: '📖' },
  { path: '/admin/kavithai', label: 'Tamil Kavithai', icon: '🪷' },
  { path: '/admin/songs', label: 'Songs', icon: '🎵' },
  { path: '/admin/videos', label: 'Videos', icon: '🎬' },
  { path: '/admin/gallery', label: 'Memory Gallery', icon: '📸' },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleLogout() {
    clearStoredAdminPassword()
    navigate('/admin')
    window.location.reload()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0612', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
      <AdminBackdrop3D />

      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 relative z-20"
        style={{ background: 'rgba(10,6,18,.9)', borderBottom: '1px solid rgba(168,85,247,.2)' }}>
        <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: 24, color: '#A855F7' }}>✦ Admin</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(168,85,247,.15)', border: '1px solid rgba(168,85,247,.3)' }}>
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -280 }}
          className="fixed lg:sticky top-0 lg:top-0 left-0 h-screen w-64 z-30 flex flex-col"
          style={{
            background: 'rgba(14,8,24,.92)', backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(168,85,247,.18)',
          }}>
          <div className="p-6 hidden lg:block">
            <h1 className="text-shimmer" style={{ fontFamily: "'Great Vibes',cursive", fontSize: 32 }}>✦ Admin</h1>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#7a5060', letterSpacing: 2, marginTop: 4 }}>
              CONTENT MANAGEMENT
            </p>
          </div>

          <nav className="flex-1 px-3 py-2 overflow-y-auto">
            {NAV_ITEMS.map(item => {
              const active = location.pathname === item.path
              return (
                <motion.button
                  key={item.path}
                  onClick={() => { navigate(item.path); setSidebarOpen(false) }}
                  whileHover={{ x: 4 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-left transition-all"
                  style={{
                    background: active ? 'linear-gradient(135deg,rgba(168,85,247,.25),rgba(255,77,141,.15))' : 'transparent',
                    border: active ? '1px solid rgba(168,85,247,.4)' : '1px solid transparent',
                    color: active ? '#fff' : '#a09098',
                  }}>
                  <span className="text-lg">{item.icon}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15 }}>{item.label}</span>
                </motion.button>
              )
            })}
          </nav>

          <div className="p-4 border-t" style={{ borderColor: 'rgba(168,85,247,.15)' }}>
            <button onClick={() => navigate('/')}
              className="w-full text-center px-4 py-2 rounded-lg mb-2 text-sm"
              style={{ background: 'rgba(255,255,255,.04)', color: '#a09098' }}>
              🌸 View Live Site
            </button>
            <button onClick={handleLogout}
              className="w-full text-center px-4 py-2 rounded-lg text-sm"
              style={{ background: 'rgba(255,77,141,.1)', color: '#FF4D8D', border: '1px solid rgba(255,77,141,.25)' }}>
              🔒 Log Out
            </button>
          </div>
        </motion.aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-20" style={{ background: 'rgba(0,0,0,.5)' }}
            onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 p-5 md:p-10 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
