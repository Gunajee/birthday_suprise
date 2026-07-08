import React from 'react'
import CrudListPage from '../../components/admin/CrudListPage'
import { Field, TextInput, TextArea, FileUpload } from '../../components/admin/AdminUI'
import { storyChaptersApi } from '../../utils/contentApi'

export default function StoryChaptersPage() {
  return (
    <CrudListPage
      icon="📖" title="Story Chapters" subtitle="HER STORY TIMELINE"
      api={storyChaptersApi} itemLabel="chapter" emptyIcon="📖"
      newItemDefaults={{ icon: '🌱', title: '', subtitle: '', description: '', photoUrl: '', sortOrder: 0 }}
      renderItem={item => (
        <div className="flex items-center gap-3">
          {item.photoUrl ? (
            <img src={item.photoUrl} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
          ) : (
            <span className="text-2xl">{item.icon}</span>
          )}
          <div>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 18, color: '#FFD700' }}>{item.title}</p>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7a5060' }}>{item.subtitle}</p>
          </div>
        </div>
      )}
      renderForm={({ item, onChange }) => (
        <>
          <Field label="ICON (shown if no photo)">
            <TextInput value={item.icon} onChange={v => onChange({ icon: v })} placeholder="🌱" />
          </Field>
          <Field label="CHAPTER TITLE">
            <TextInput value={item.title} onChange={v => onChange({ title: v })} placeholder="First Meeting" />
          </Field>
          <Field label="SUBTITLE">
            <TextInput value={item.subtitle} onChange={v => onChange({ subtitle: v })} placeholder="The day everything changed" />
          </Field>
          <Field label="DESCRIPTION">
            <TextArea value={item.description} onChange={v => onChange({ description: v })} rows={5} placeholder="From the very first moment..." />
          </Field>
          <Field label="PHOTO">
            <FileUpload value={item.photoUrl} onChange={url => onChange({ photoUrl: url })} accept="image/*" kind="image" />
          </Field>
        </>
      )}
    />
  )
}
