import React from 'react'
import CrudListPage from '../../components/admin/CrudListPage'
import { Field, TextInput, FileUpload } from '../../components/admin/AdminUI'
import { songsApi } from '../../utils/contentApi'

export default function SongsPage() {
  return (
    <CrudListPage
      icon="🎵" title="Songs" subtitle="MUSIC PLAYER PLAYLIST"
      api={songsApi} itemLabel="song" emptyIcon="🎵"
      newItemDefaults={{ title: '', film: '', artist: '', emoji: '🎵', url: '', sortOrder: 0 }}
      renderItem={item => (
        <div className="flex items-center gap-3">
          <span className="text-2xl">{item.emoji}</span>
          <div>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: 18, color: '#34D399' }}>{item.title}</p>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7a5060' }}>{item.film} · {item.artist}</p>
          </div>
        </div>
      )}
      renderForm={({ item, onChange }) => (
        <>
          <Field label="EMOJI"><TextInput value={item.emoji} onChange={v => onChange({ emoji: v })} placeholder="🎵" /></Field>
          <Field label="SONG TITLE"><TextInput value={item.title} onChange={v => onChange({ title: v })} placeholder="Uyire Uyire" /></Field>
          <Field label="FILM / ALBUM"><TextInput value={item.film} onChange={v => onChange({ film: v })} placeholder="Bombay" /></Field>
          <Field label="ARTIST"><TextInput value={item.artist} onChange={v => onChange({ artist: v })} placeholder="A.R. Rahman" /></Field>
          <Field label="AUDIO FILE">
            <FileUpload value={item.url} onChange={url => onChange({ url })} accept="audio/*" kind="audio" />
          </Field>
        </>
      )}
    />
  )
}
