// ═══════════════════════════════════════════════════════════
// API client — talks to the Spring Boot backend.
//
// IMPORTANT: set VITE_API_BASE_URL in a .env file at the project root:
//   VITE_API_BASE_URL=http://localhost:8080
//
// Without it, BASE_URL defaults to '' and every request silently hits
// the FRONTEND's own dev server (e.g. localhost:3000) instead of the
// backend — which has no matching routes, so you'll see 404s in the
// console. That's exactly what was happening here: the backend was
// either not running, or .env wasn't set/loaded.
//
// All requests fail completely silently from her perspective — no
// console output, no broken UI — regardless of whether the backend
// is reachable, returns an error, or doesn't exist yet.
// ═══════════════════════════════════════════════════════════

const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

if (import.meta.env.DEV) {
  // Dev-only, informational — helps you (the developer) notice immediately
  // if the backend URL isn't configured, instead of guessing from 404s.
  if (!BASE_URL) {
    console.info(
      '%c[birthday-app] No VITE_API_BASE_URL set — backend calls (Mailjet notifications) are disabled.\nCreate a .env file with: VITE_API_BASE_URL=http://localhost:8080',
      'color:#A855F7'
    )
  } else {
    console.info(`%c[birthday-app] Backend configured at ${BASE_URL}`, 'color:#34D399')
  }
}

async function post(path, body) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) return null // e.g. 404/500 — backend not reachable or not set up yet, fail quietly
    return await res.json().catch(() => null)
  } catch {
    // Network/CORS errors land here. Never throw, never log —
    // the celebration must continue no matter what.
    return null
  }
}

/**
 * Fired the instant she finds the hidden proposal.
 * Backend immediately sends an email via Mailjet to notify you.
 */
export function notifyProposalFound() {
  return post('/api/proposal-found', {
    event: 'proposal_unlocked',
    at: new Date().toISOString(),
    userAgent: navigator.userAgent,
  })
}

/**
 * Optional: log every secret she unlocks, so you can see her
 * progress in real time (requires the /api/secret-found endpoint).
 */
export function notifySecretFound(secretName) {
  return post('/api/secret-found', {
    secret: secretName,
    at: new Date().toISOString(),
  })
}

/**
 * Fired when she answers the proposal ("Yes" or "Need time").
 */
export function notifyProposalAnswer(answer) {
  return post('/api/proposal-answer', {
    answer, // "yes" | "wait"
    at: new Date().toISOString(),
  })
}
