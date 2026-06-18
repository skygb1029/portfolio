function resolveApiBase(): string {
  const apiBase = import.meta.env.VITE_PARENTING_API_BASE?.replace(/\/$/, '')
  if (apiBase) {
    if (import.meta.env.PROD && /localhost|127\.0\.0\.1/i.test(apiBase)) {
      return '/api/parenting'
    }
    return apiBase
  }

  const host = import.meta.env.VITE_PARENTING_API_URL?.replace(/\/$/, '')
  if (host) {
    if (import.meta.env.PROD && /localhost|127\.0\.0\.1/i.test(host)) {
      return '/api/parenting'
    }
    return `${host}/api/web`
  }

  if (import.meta.env.PROD) {
    return '/api/parenting'
  }

  return 'http://localhost:3001/api/web'
}

const API_BASE = resolveApiBase()

export interface WebApiVersion {
  service: string
  version: string
  buildVersion: string
  timestamp: string
}

export interface WebServiceStatus {
  ok: boolean
  service: string
  storage: string
  databaseReady: boolean
  schedulerReady: boolean
  channels: string[]
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function fetchApiVersion(): Promise<WebApiVersion> {
  return fetchJson<WebApiVersion>('/version')
}

export function fetchServiceStatus(): Promise<WebServiceStatus> {
  return fetchJson<WebServiceStatus>('/status')
}

export function getParentingApiBaseUrl(): string {
  return API_BASE
}
