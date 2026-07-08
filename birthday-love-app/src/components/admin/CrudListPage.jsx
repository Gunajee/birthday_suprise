import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core'
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { PageHeader, GlassCard, Button, EmptyState, Spinner, Toast } from './AdminUI'
import { useAdminToast } from '../../hooks/useAdminToast'

/**
 * Generic CRUD list page for any content type (quotes, greetings, story
 * chapters, kavithai, songs, videos, memory gallery). Configured via props
 * so each concrete page (e.g. QuotesPage.jsx) is just a thin wrapper.
 *
 * Features: list with drag-to-reorder, create, edit, delete — all backed
 * by the matching `api` object from utils/contentApi.js.
 */
export default function CrudListPage({
  icon, title, subtitle, api, emptyText, emptyIcon,
  renderItem,        // (item) => JSX preview shown in the list
  renderForm,        // ({ item, onChange }) => JSX form fields for create/edit
  newItemDefaults,   // object — shape of a brand-new item
  itemLabel = 'item',
}) {
  const [items, setItems] = useState(null)
  const [editing, setEditing] = useState(null) // null = no modal, {} = new, {...} = editing existing
  const [saving, setSaving] = useState(false)
  const { toast, showToast } = useAdminToast()

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const load = useCallback(() => {
    api.list()
      .then(setItems)
      .catch(() => { setItems([]); showToast('Failed to load — is the backend running?', 'error') })
  }, [api])

  useEffect(() => { load() }, [load])

  async function handleSave() {
    setSaving(true)
    try {
      if (editing.id) {
        const updated = await api.update(editing.id, editing)
        setItems(prev => prev.map(i => i.id === editing.id ? updated : i))
      } else {
        const created = await api.create(editing)
        setItems(prev => [...prev, created])
      }
      showToast(`✨ ${itemLabel} saved`)
      setEditing(null)
    } catch (err) {
      showToast(err.message === 'UNAUTHORIZED' ? 'Session expired — please log in again.' : 'Save failed.', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm(`Delete this ${itemLabel}? This can\'t be undone.`)) return
    try {
      await api.remove(id)
      setItems(prev => prev.filter(i => i.id !== id))
      showToast(`🗑️ ${itemLabel} deleted`)
    } catch {
      showToast('Delete failed.', 'error')
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setItems(prev => {
      const oldIndex = prev.findIndex(i => i.id === active.id)
      const newIndex = prev.findIndex(i => i.id === over.id)
      const reordered = arrayMove(prev, oldIndex, newIndex)
      api.reorder(reordered.map(i => i.id)).catch(() => showToast('Reorder failed to save', 'error'))
      return reordered
    })
  }

  return (
    <div>
      <PageHeader
        icon={icon} title={title} subtitle={subtitle}
        action={
          <Button onClick={() => setEditing({ ...newItemDefaults })}>
            ＋ Add {itemLabel}
          </Button>
        }
      />

      {items === null ? <Spinner /> : items.length === 0 ? (
        <EmptyState icon={emptyIcon || '✨'} text={emptyText || `No ${itemLabel}s yet — add your first one!`} />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-3">
              {items.map(item => (
                <SortableRow key={item.id} item={item} onEdit={() => setEditing({ ...item })} onDelete={() => handleDelete(item.id)}>
                  {renderItem(item)}
                </SortableRow>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <AnimatePresence>
        {editing && (
          <EditModal
            editing={editing}
            setEditing={setEditing}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
            saving={saving}
            renderForm={renderForm}
            itemLabel={itemLabel}
          />
        )}
      </AnimatePresence>

      <Toast message={toast?.message} type={toast?.type} />
    </div>
  )
}

function SortableRow({ item, onEdit, onDelete, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div ref={setNodeRef} style={style}>
      <GlassCard className="flex items-center gap-3 !p-4">
        <button {...attributes} {...listeners} className="cursor-grab text-lg px-1" style={{ color: 'rgba(255,255,255,.3)', touchAction: 'none' }}>
          ⠿
        </button>
        <div className="flex-1 min-w-0">{children}</div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={onEdit} className="px-3 py-1.5 rounded-lg text-xs"
            style={{ background: 'rgba(168,85,247,.12)', color: '#ce93d8' }}>✏️ Edit</button>
          <button onClick={onDelete} className="px-3 py-1.5 rounded-lg text-xs"
            style={{ background: 'rgba(255,77,141,.1)', color: '#FF4D8D' }}>🗑️</button>
        </div>
      </GlassCard>
    </div>
  )
}

function EditModal({ editing, setEditing, onSave, onCancel, saving, renderForm, itemLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={e => e.target === e.currentTarget && onCancel()}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-5"
      style={{ background: 'rgba(5,2,12,.85)', backdropFilter: 'blur(8px)' }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg rounded-3xl p-8 max-h-[85vh] overflow-y-auto"
        style={{ background: 'rgba(16,10,26,.98)', border: '1px solid rgba(168,85,247,.3)', boxShadow: '0 20px 80px rgba(168,85,247,.2)' }}>
        <h2 className="text-shimmer" style={{ fontFamily: "'Great Vibes',cursive", fontSize: 30, marginBottom: 20 }}>
          {editing.id ? `Edit ${itemLabel}` : `New ${itemLabel}`}
        </h2>

        {renderForm({ item: editing, onChange: (patch) => setEditing(prev => ({ ...prev, ...patch })) })}

        <div className="flex gap-3 mt-6 justify-end">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={onSave} disabled={saving}>
            {saving ? 'Saving...' : '💾 Save'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
