import React from 'react'
import CrudListPage from '../../components/admin/CrudListPage'
import { Field, TextInput, TextArea, FileUpload } from '../../components/admin/AdminUI'
import { memoryGalleryApi } from '../../utils/contentApi'

export default function MemoryGalleryPage() {
  return (
    <CrudListPage
      icon="📸" title="Memory Gallery" subtitle="THE POLAROID SCRAPBOOK"
      api={memoryGalleryApi} itemLabel="memory" emptyIcon="📸"
      newItemDefaults={{ year: '', label: '', note: '', photoUrl: '', sortOrder: 0 }}
      renderItem={item => (
        <div className="flex items-center gap-3">
          {item.photoUrl ? (
            <img src={item.photoUrl} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
          ) : <span className="text-2xl">🌸</span>}
          <div>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 18, color: '#FFD700' }}>{item.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7a5060' }}>{item.year}</p>
          </div>
        </div>
      )}
      renderForm={({ item, onChange }) => (
        <>
          <Field label="YEAR"><TextInput value={item.year} onChange={v => onChange({ year: v })} placeholder="2025" /></Field>
          <Field label="LABEL"><TextInput value={item.label} onChange={v => onChange({ label: v })} placeholder="Birthday 🎂" /></Field>
          <Field label="NOTE">
            <TextArea value={item.note} onChange={v => onChange({ note: v })} placeholder="Happiest Birthday, my dearest angel." />
          </Field>
          <Field label="PHOTO">
            <FileUpload value={item.photoUrl} onChange={url => onChange({ photoUrl: url })} accept="image/*" kind="image" />
          </Field>
        </>
      )}
    />
  )
}
