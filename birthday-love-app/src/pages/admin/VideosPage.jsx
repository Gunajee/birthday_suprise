import React from 'react'
import CrudListPage from '../../components/admin/CrudListPage'
import { Field, TextInput, TextArea, FileUpload } from '../../components/admin/AdminUI'
import { videosApi } from '../../utils/contentApi'

export default function VideosPage() {
  return (
    <CrudListPage
      icon="🎬" title="Videos" subtitle="VIDEO GALLERY"
      api={videosApi} itemLabel="video" emptyIcon="🎬"
      newItemDefaults={{ title: '', description: '', emoji: '🎬', url: '', thumbnailUrl: '', sortOrder: 0 }}
      renderItem={item => (
        <div className="flex items-center gap-3">
          <span className="text-2xl">{item.emoji}</span>
          <div>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 18, color: '#FF4D8D' }}>{item.title}</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: '#a09098' }}>{item.description}</p>
          </div>
        </div>
      )}
      renderForm={({ item, onChange }) => (
        <>
          <Field label="EMOJI"><TextInput value={item.emoji} onChange={v => onChange({ emoji: v })} placeholder="🎬" /></Field>
          <Field label="TITLE"><TextInput value={item.title} onChange={v => onChange({ title: v })} placeholder="Our Best Moments" /></Field>
          <Field label="DESCRIPTION">
            <TextArea value={item.description} onChange={v => onChange({ description: v })} placeholder="A beautiful edit of memories" />
          </Field>
          <Field label="VIDEO FILE">
            <FileUpload value={item.url} onChange={url => onChange({ url })} accept="video/*" kind="video" />
          </Field>
          <Field label="THUMBNAIL (optional)">
            <FileUpload value={item.thumbnailUrl} onChange={url => onChange({ thumbnailUrl: url })} accept="image/*" kind="image" />
          </Field>
        </>
      )}
    />
  )
}
