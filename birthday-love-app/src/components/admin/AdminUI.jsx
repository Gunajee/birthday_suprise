import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { uploadFile } from '../../utils/contentApi'

// ═══════════════════════════════════════════════════════════
// Shared admin UI primitives — glassmorphic, 3D-tilt-on-hover cards,
// gold/violet accent system distinct from the public site's pink/gold.
// ═══════════════════════════════════════════════════════════

export function GlassCard({ children, className = '', glow = false, ...props }) {
  return (
    <motion.div
      {...props}
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: 'rgba(255,255,255,.04)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(168,85,247,.18)',
        boxShadow: glow ? '0 0 40px rgba(168,85,247,.15)' : 'none',
      }}>
      {children}
    </motion.div>
  )
}

export function PageHeader({ icon, title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{icon}</span>
          <h1 className="text-shimmer" style={{ fontFamily: "'Great Vibes',cursive", fontSize: 38 }}>{title}</h1>
        </div>
        {subtitle && (
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7a5060', letterSpacing: 1 }}>{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}

export function Field({ label, children, hint }) {
  return (
    <div className="mb-5">
      <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#ce93d8', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: 'rgba(255,255,255,.25)', marginTop: 4 }}>{hint}</p>}
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: 10,
  background: 'rgba(255,255,255,.05)', border: '1px solid rgba(168,85,247,.25)',
  color: '#fff', fontFamily: "'Cormorant Garamond',serif", fontSize: 15,
  outline: 'none',
}

export function TextInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <motion.input
      type={type}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      whileFocus={{ borderColor: 'rgba(168,85,247,.7)', scale: 1.005 }}
      style={inputStyle}
    />
  )
}

export function TextArea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <motion.textarea
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      whileFocus={{ borderColor: 'rgba(168,85,247,.7)', scale: 1.005 }}
      style={{ ...inputStyle, resize: 'vertical', fontFamily: "'Cormorant Garamond',serif" }}
    />
  )
}

export function NumberInput({ value, onChange, placeholder }) {
  return (
    <TextInput type="number" value={value} onChange={v => onChange(v === '' ? '' : Number(v))} placeholder={placeholder} />
  )
}

/**
 * File upload widget — handles photos, audio, and video uniformly.
 * Shows a live progress bar (via XHR upload progress in contentApi.js),
 * and a small preview once uploaded.
 */
export function FileUpload({ value, onChange, accept = 'image/*', kind = 'image' }) {
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')
  const inputRef = useRef()

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setProgress(0)
    try {
      const result = await uploadFile(file, setProgress)
      onChange(result.url)
    } catch (err) {
      setError(err.message === 'UNAUTHORIZED' ? 'Session expired — please log in again.' : 'Upload failed. Is the backend running?')
    } finally {
      setProgress(null)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 rounded-lg text-sm"
          style={{ background: 'rgba(168,85,247,.15)', border: '1px solid rgba(168,85,247,.35)', color: '#ce93d8' }}>
          📤 Upload {kind}
        </button>
        <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
        {value && (
          <button type="button" onClick={() => onChange('')}
            className="px-3 py-2 rounded-lg text-xs"
            style={{ background: 'rgba(255,77,141,.1)', color: '#FF4D8D' }}>
            ✕ Remove
          </button>
        )}
      </div>

      <AnimatePresence>
        {progress !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.08)' }}>
              <motion.div className="h-full rounded-full" animate={{ width: `${progress}%` }}
                style={{ background: 'linear-gradient(90deg,#A855F7,#FFD700)' }} />
            </div>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#7a5060', marginTop: 4 }}>{progress}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: '#FB923C', marginTop: 6 }}>{error}</p>}

      {value && progress === null && (
        <div className="mt-3">
          {kind === 'image' && (
            <img src={value} alt="preview" className="rounded-lg" style={{ maxHeight: 140, objectFit: 'cover' }} />
          )}
          {kind === 'audio' && <audio src={value} controls className="w-full mt-1" />}
          {kind === 'video' && <video src={value} controls className="rounded-lg w-full" style={{ maxHeight: 200 }} />}
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: 'rgba(255,255,255,.2)', marginTop: 4, wordBreak: 'break-all' }}>
            {value}
          </p>
        </div>
      )}
    </div>
  )
}

export function Button({ children, onClick, variant = 'primary', type = 'button', disabled }) {
  const styles = {
    primary: { background: 'linear-gradient(135deg,#A855F7,#FF4D8D)', color: '#fff' },
    gold: { background: 'linear-gradient(135deg,#FFD700,#FFA500)', color: '#0a0612' },
    ghost: { background: 'rgba(255,255,255,.05)', color: '#e8d5e0', border: '1px solid rgba(255,255,255,.15)' },
    danger: { background: 'rgba(255,77,141,.12)', color: '#FF4D8D', border: '1px solid rgba(255,77,141,.3)' },
  }
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.04 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className="px-5 py-2.5 rounded-xl text-sm font-semibold"
      style={{ ...styles[variant], opacity: disabled ? 0.5 : 1, fontFamily: "'Cormorant Garamond',serif", cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {children}
    </motion.button>
  )
}

export function EmptyState({ icon, text }) {
  return (
    <GlassCard className="text-center py-16">
      <div className="text-5xl mb-4 opacity-40">{icon}</div>
      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: '#7a5060', fontStyle: 'italic' }}>{text}</p>
    </GlassCard>
  )
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          border: '3px solid rgba(168,85,247,.2)', borderTopColor: '#A855F7',
        }}
      />
    </div>
  )
}

export function Toast({ message, type = 'success' }) {
  const colors = { success: '#34D399', error: '#FF4D8D', info: '#A855F7' }
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 40, x: '-50%' }}
          className="fixed bottom-8 left-1/2 z-[2000] px-6 py-3 rounded-full text-sm"
          style={{
            background: 'rgba(20,12,30,.95)', backdropFilter: 'blur(10px)',
            border: `1px solid ${colors[type]}55`, color: colors[type],
            fontFamily: "'JetBrains Mono',monospace",
          }}>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
