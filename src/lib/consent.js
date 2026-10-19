import { inject, track as vercelTrack } from '@vercel/analytics'

// Analitik izni tarayıcıda saklanır (çerez değil). Vercel Analytics yalnızca izin verilince yüklenir.
const KEY = 'tayra-consent'
export const OPEN_EVENT = 'tayra:consent-open'

export function getConsent() {
  try { return localStorage.getItem(KEY) } catch { return null }
}

export function setConsent(value) {
  try { localStorage.setItem(KEY, value) } catch { /* gizli sekme vb. */ }
  if (value === 'granted') startAnalytics()
}

let started = false
export function startAnalytics() {
  if (started) return
  started = true
  inject()
}

export function track(name, data) {
  if (started) vercelTrack(name, data)
}
