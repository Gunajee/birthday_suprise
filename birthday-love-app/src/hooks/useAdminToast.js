import { useState, useCallback } from 'react'

/**
 * Simple toast state for admin pages — success/error/info messages
 * that auto-dismiss. Kept separate from the public site's AppContext
 * toast since the admin panel doesn't need the "found secret" semantics.
 */
export function useAdminToast() {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  return { toast, showToast }
}
