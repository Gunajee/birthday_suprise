import React from 'react'
import CrudListPage from '../../components/admin/CrudListPage'
import { Field, TextInput, TextArea } from '../../components/admin/AdminUI'
import { quotesApi } from '../../utils/contentApi'

export default function QuotesPage() {
  return (
    <CrudListPage
      icon="💭" title="Quotes" subtitle="QUOTES CAROUSEL ON THE HOME PAGE"
      api={quotesApi} itemLabel="quote" emptyIcon="💭"
      newItemDefaults={{ text: '', author: '', sortOrder: 0 }}
      renderItem={item => (
        <>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 15, color: '#e8d5e0' }}>
            "{item.text}"
          </p>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#7a5060', marginTop: 2 }}>— {item.author}</p>
        </>
      )}
      renderForm={({ item, onChange }) => (
        <>
          <Field label="QUOTE TEXT">
            <TextArea value={item.text} onChange={v => onChange({ text: v })} placeholder="She is rare, and the world is better because..." />
          </Field>
          <Field label="AUTHOR / SOURCE">
            <TextInput value={item.author} onChange={v => onChange({ author: v })} placeholder="For her, always" />
          </Field>
        </>
      )}
    />
  )
}
