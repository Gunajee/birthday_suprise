import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PageHeader, GlassCard, Spinner } from '../../components/admin/AdminUI'
import {
  quotesApi, greetingsApi, storyChaptersApi, kavithaiApi,
  songsApi, videosApi, memoryGalleryApi,
} from '../../utils/contentApi'

const SECTIONS = [
  { key: 'quotes', label: 'Quotes', icon: '💭', path: '/admin/quotes', api: quotesApi, color: '#A855F7' },
  { key: 'greetings', label: 'Greetings', icon: '💌', path: '/admin/greetings', api: greetingsApi, color: '#FF4D8D' },
  { key: 'story', label: 'Story Chapters', icon: '📖', path: '/admin/story', api: storyChaptersApi, color: '#FFD700' },
  { key: 'kavithai', label: 'Tamil Kavithai', icon: '🪷', path: '/admin/kavithai', api: kavithaiApi, color: '#A855F7' },
  { key: 'songs', label: 'Songs', icon: '🎵', path: '/admin/songs', api: songsApi, color: '#34D399' },
  { key: 'videos', label: 'Videos', icon: '🎬', path: '/admin/videos', api: videosApi, color: '#FF4D8D' },
  { key: 'gallery', label: 'Memory Gallery', icon: '📸', path: '/admin/gallery', api: memoryGalleryApi, color: '#FFD700' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all(SECTIONS.map(s => s.api.list().catch(() => [])))
      .then(results => {
        if (cancelled) return
        const map = {}
        SECTIONS.forEach((s, i) => { map[s.key] = results[i]?.length ?? 0 })
        setCounts(map)
      })
      .catch(() => setError(true))
    return () => { cancelled = true }
  }, [])

  return (
    <div>
      <PageHeader icon="📊" title="Dashboard" subtitle="OVERVIEW OF ALL CONTENT" />

      {error && (
        <GlassCard className="mb-6" style={{ borderColor: 'rgba(255,77,141,.3)' }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", color: '#FF4D8D' }}>
            ⚠️ Couldn\'t reach the backend. Make sure Spring Boot is running and{' '}
            <code style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>VITE_API_BASE_URL</code> is set in your .env file.
          </p>
        </GlassCard>
      )}

      {counts === null && !error ? <Spinner /> : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.04, y: -4 }}
              onClick={() => navigate(s.path)}
              className="cursor-pointer"
            >
              <GlassCard glow style={{ borderColor: `${s.color}33` }}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 24, color: s.color }}>{s.label}</p>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 28, color: '#fff', fontWeight: 700, marginTop: 8 }}>
                  {counts?.[s.key] ?? '–'}
                </p>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#7a5060' }}>items</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
