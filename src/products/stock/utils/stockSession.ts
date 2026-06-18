const SESSION_KEY = 'stock_web_session_id'

function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function getStockSessionId(): string {
  if (typeof window === 'undefined') return 'server'
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = randomId()
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}
