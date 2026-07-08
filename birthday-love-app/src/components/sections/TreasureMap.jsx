import React from 'react'
import { motion } from 'framer-motion'
import { HIDDEN_LIST } from '../../data'
import { useApp } from '../../context/AppContext'
import Section from '../ui/Section'

export default function TreasureMap() {
  const { found } = useApp()
  return (
    <Section eyebrow="// THE TREASURE MAP" title="Hidden Memories Found 🗺️" id="treasuremap">
      <div className="text-center mb-8">
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 24, color: '#FFD700', fontWeight: 700 }}>
          {found.size} / {HIDDEN_LIST.length}
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-4 max-w-3xl mx-auto">
        {HIDDEN_LIST.map((f, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className="aspect-square rounded-2xl flex items-center justify-center text-2xl relative"
            style={{
              background: found.has(f) ? 'linear-gradient(135deg,#FF4D8D,#A855F7)' : 'rgba(255,255,255,.04)',
              border: `1px solid ${found.has(f) ? 'rgba(255,77,141,.5)' : 'rgba(255,255,255,.1)'}`,
            }}>
            {found.has(f) ? f.split(' ')[0] : '❓'}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
