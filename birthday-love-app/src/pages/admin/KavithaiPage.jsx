import React from 'react'
import CrudListPage from '../../components/admin/CrudListPage'
import { Field, TextInput, TextArea } from '../../components/admin/AdminUI'
import { kavithaiApi } from '../../utils/contentApi'

export default function KavithaiPage() {
  return (
    <CrudListPage
      icon="🪷" title="Tamil Kavithai" subtitle="TAMIL POEMS"
      api={kavithaiApi} itemLabel="kavithai" emptyIcon="🪷"
      newItemDefaults={{ title: '', lines: '', translation: '', sortOrder: 0 }}
      renderItem={item => (
        <div>
          <p style={{ fontFamily: "'Noto Sans Tamil',sans-serif", fontSize: 17, color: '#A855F7' }}>{item.title}</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 12, color: '#7a5060' }}>{item.translation}</p>
        </div>
      )}
      renderForm={({ item, onChange }) => (
        <>
          <Field label="TITLE (TAMIL)">
            <TextInput value={item.title} onChange={v => onChange({ title: v })} placeholder="உன் புன்னகை" />
          </Field>
          <Field label="LINES (one per line)" hint="Each line will be displayed on its own row, alternating colour.">
            <TextArea value={item.lines} onChange={v => onChange({ lines: v })} rows={5}
              placeholder={'உன் புன்னகை ஒரு மழை,\nஎன் உள்ளம் ஒரு வயல்,\nநீ சிரிக்கும் போது,\nஎன் உலகம் பூக்கிறது. 🌸'} />
          </Field>
          <Field label="ENGLISH TRANSLATION">
            <TextArea value={item.translation} onChange={v => onChange({ translation: v })} rows={2}
              placeholder="Your smile is a rain, my heart is a field..." />
          </Field>
        </>
      )}
    />
  )
}
