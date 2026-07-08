// ═══════════════════════════════════════════════════════════
// Content CMS API client — talks to the Spring Boot admin endpoints.
// Used by the /admin dashboard for full CRUD, and can optionally be
// used by the public site too (see data/index.js fallback pattern).
// ═══════════════════════════════════════════════════════════

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const ADMIN_PASSWORD_KEY = 'admin_password'

export function getStoredAdminPassword() {
  return sessionStorage.getItem(ADMIN_PASSWORD_KEY) || ''
}

export function setStoredAdminPassword(pw) {
  sessionStorage.setItem(ADMIN_PASSWORD_KEY, pw)
}

export function clearStoredAdminPassword() {
  sessionStorage.removeItem(ADMIN_PASSWORD_KEY)
}

async function request(path, { method = 'GET', body, auth = false, isFormData = false } = {}) {
  const headers = {}
  if (!isFormData) headers['Content-Type'] = 'application/json'
  if (auth) headers['X-Admin-Password'] = getStoredAdminPassword()

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
  })

  if (res.status === 401) {
    throw new Error('UNAUTHORIZED')
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Request failed (${res.status}): ${text}`)
  }
  if (res.status === 204) return null
  return res.json().catch(() => null)
}

// ── AUTH ──────────────────────────────────────────────────────
export async function adminLogin(password) {
  return request('/api/admin/login', { method: 'POST', body: { password } })
}

// ── GENERIC CRUD FACTORY ─────────────────────────────────────
// Each content type (quotes, greetings, story chapters, etc.) gets the
// same 5 operations. This factory avoids repeating the same 5 functions
// 7+ times across the admin panel.
function crudFor(resourcePath) {
  return {
    list: () => request(`/api/admin/${resourcePath}`, { auth: true }),
    get: (id) => request(`/api/admin/${resourcePath}/${id}`, { auth: true }),
    create: (data) => request(`/api/admin/${resourcePath}`, { method: 'POST', body: data, auth: true }),
    update: (id, data) => request(`/api/admin/${resourcePath}/${id}`, { method: 'PUT', body: data, auth: true }),
    remove: (id) => request(`/api/admin/${resourcePath}/${id}`, { method: 'DELETE', auth: true }),
    reorder: (orderedIds) => request(`/api/admin/${resourcePath}/reorder`, { method: 'PUT', body: orderedIds, auth: true }),
  }
}

export const quotesApi = crudFor('quotes')
export const greetingsApi = crudFor('greetings')
export const storyChaptersApi = crudFor('story-chapters')
export const kavithaiApi = crudFor('kavithai')
export const songsApi = crudFor('songs')
export const videosApi = crudFor('videos')
export const memoryGalleryApi = crudFor('memory-gallery')

// ── HERO SETTINGS (singleton) ────────────────────────────────
export const heroApi = {
  get: () => request('/api/admin/hero', { auth: true }),
  update: (data) => request('/api/admin/hero', { method: 'PUT', body: data, auth: true }),
}

// ── PUBLIC READS (no auth — used by the live site, optional) ─
export const publicContentApi = {
  quotes: () => request('/api/quotes'),
  greetings: () => request('/api/greetings'),
  storyChapters: () => request('/api/story-chapters'),
  kavithai: () => request('/api/kavithai'),
  songs: () => request('/api/songs'),
  videos: () => request('/api/videos'),
  memoryGallery: () => request('/api/memory-gallery'),
  hero: () => request('/api/hero'),
}

// ── FILE UPLOAD ───────────────────────────────────────────────
export async function uploadFile(file, onProgress) {
  const formData = new FormData()
  formData.append('file', file)

  // Use XHR instead of fetch so we get real upload progress events —
  // handy for video files which can take a while.
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${BASE_URL}/api/admin/upload`)
    xhr.setRequestHeader('X-Admin-Password', getStoredAdminPassword())
    xhr.upload.onprogress = (e) => {
      if (onProgress && e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      if (xhr.status === 401) return reject(new Error('UNAUTHORIZED'))
      if (xhr.status >= 200 && xhr.status < 300) {
        try { resolve(JSON.parse(xhr.responseText)) }
        catch { reject(new Error('Invalid response from server')) }
      } else {
        reject(new Error(`Upload failed (${xhr.status})`))
      }
    }
    xhr.onerror = () => reject(new Error('Network error during upload'))
    xhr.send(formData)
  })
}
