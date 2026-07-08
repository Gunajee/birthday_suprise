import React, { useEffect, useState } from 'react'
import { PageHeader, GlassCard, Field, TextInput, TextArea, FileUpload, Button, Spinner, Toast } from '../../components/admin/AdminUI'
import { heroApi } from '../../utils/contentApi'
import { useAdminToast } from '../../hooks/useAdminToast'

export default function HeroSettingsPage() {
  const [data, setData] = useState(null)
  const [saving, setSaving] = useState(false)
  const { toast, showToast } = useAdminToast()

  useEffect(() => {
    heroApi.get().then(setData).catch(() => {
      setData({ name: '', tagline: '', photoUrl: '' })
      showToast('Could not load hero settings — is the backend running?', 'error')
    })
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const updated = await heroApi.update(data)
      setData(updated)
      showToast('✨ Hero section updated')
    } catch {
      showToast('Save failed.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (!data) return <Spinner />

  return (
    <div>
      <PageHeader icon="👑" title="Hero & Photo" subtitle="THE FIRST THING SHE SEES" />

      <GlassCard glow>
        <Field label="HER NAME" hint="Shown as the big animated greeting below the title.">
          <TextInput value={data.name} onChange={v => setData({ ...data, name: v })} placeholder="My Dearest Angel" />
        </Field>
        <Field label="TAGLINE">
          <TextArea value={data.tagline} onChange={v => setData({ ...data, tagline: v })} rows={2}
            placeholder="Every moment with you becomes a beautiful memory." />
        </Field>
        <Field label="MAIN PHOTO" hint="Appears inside the rotating 3D gold ring on the hero section.">
          <FileUpload value={data.photoUrl} onChange={url => setData({ ...data, photoUrl: url })} accept="image/*" kind="image" />
        </Field>

        <div className="flex justify-end mt-4">
          <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : '💾 Save Changes'}</Button>
        </div>
      </GlassCard>

      <Toast message={toast?.message} type={toast?.type} />
    </div>
  )
}
