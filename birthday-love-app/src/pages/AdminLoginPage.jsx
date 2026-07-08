import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AdminBackdrop3D from '../components/3d/AdminBackdrop3D'
import FloatingHeart3D from '../components/3d/FloatingHeart3D'
import { adminLogin, setStoredAdminPassword } from '../utils/contentApi'

export default function AdminLoginPage({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      setStoredAdminPassword(password) // store optimistically so the login call itself can be verified
      await adminLogin(password)
      onSuccess()
    } catch (err) {
      setError('Incorrect password, or the backend isn\'t running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0612', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <AdminBackdrop3D />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative z-10 w-full max-w-md mx-4 p-10 rounded-3xl"
        style={{ background: 'rgba(255,255,255,.04)', backdropFilter: 'blur(24px)', border: '1px solid rgba(168,85,247,.25)', boxShadow: '0 20px 80px rgba(168,85,247,.15)' }}>

        <div style={{ height: 110, marginBottom: -10 }}>
          <FloatingHeart3D height={110} />
        </div>

        <h1 className="text-shimmer text-center" style={{ fontFamily: "'Great Vibes',cursive", fontSize: 44, marginBottom: 4 }}>
          Admin Access
        </h1>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7a5060', letterSpacing: 2, textAlign: 'center', marginBottom: 32 }}>
          ENTER THE PASSWORD TO MANAGE CONTENT
        </p>

        <form onSubmit={handleSubmit}>
          <motion.input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            autoFocus
            whileFocus={{ borderColor: 'rgba(168,85,247,.7)', scale: 1.01 }}
            style={{
              width: '100%', padding: '14px 18px', borderRadius: 14, textAlign: 'center',
              background: 'rgba(255,255,255,.05)', border: '1px solid rgba(168,85,247,.25)',
              color: '#fff', fontSize: 18, outline: 'none', marginBottom: 16,
              fontFamily: "'JetBrains Mono',monospace", letterSpacing: 4,
            }}
          />

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ color: '#FB923C', fontFamily: "'Cormorant Garamond',serif", fontSize: 14, textAlign: 'center', marginBottom: 16 }}>
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading || !password}
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            className="w-full py-3.5 rounded-2xl font-semibold"
            style={{
              background: 'linear-gradient(135deg,#A855F7,#FF4D8D)', color: '#fff',
              opacity: loading || !password ? 0.6 : 1,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 32px rgba(168,85,247,.4)',
              fontFamily: "'Cormorant Garamond',serif", fontSize: 17,
            }}>
            {loading ? 'Verifying...' : '✦ Enter Dashboard'}
          </motion.button>
        </form>

        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,.15)', textAlign: 'center', marginTop: 20 }}>
          // password set in backend application.properties → admin.password
        </p>
      </motion.div>
    </div>
  )
}
