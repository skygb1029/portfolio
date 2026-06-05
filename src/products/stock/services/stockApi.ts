/**
 * Stock Public API client — 對齊 ai-stock-secretary `/api/web/*` 契約。
 * 參考實作：ai-stock-secretary/web-widget/src/api/client.ts
 *
 * 環境變數（擇一）：
 * - VITE_API_BASE=https://host/api/web  （建議，與 web-widget 一致）
 * - VITE_STOCK_API_URL=https://host     （舊版，自動補 /api/web）
 */
function resolveApiBase(): string {
  const apiBase = import.meta.env.VITE_API_BASE?.replace(/\/$/, '')
  if (apiBase) return apiBase

  const host = import.meta.env.VITE_STOCK_API_URL?.replace(/\/$/, '')
  if (host) return `${host}/api/web`

  return 'http://localhost:3002/api/web'
}

const API_BASE = resolveApiBase()

export interface WebApiVersion {
  service: string
  version: string
  buildVersion: string
  timestamp: string
}

export interface WebMorningMainLine {
  topic: string
  reason: string
}

export interface WebMorningReport {
  date: string
  direction: string
  status: string
  upProbability: number
  downProbability: number
  mainLines: WebMorningMainLine[]
  observations: string[]
  risks: string[]
  summary: string | null
}

export interface WebFactCheck {
  key: string
  label: string
  present: boolean
}

export interface WebFactReadiness {
  date: string
  status: 'GREEN' | 'YELLOW' | 'RED'
  integrationAllowed: boolean
  checks: WebFactCheck[]
  missing: string[]
}

export interface WebMorningValidation {
  date: string | null
  predictionDate: string | null
  predictedDirection: string | null
  actualResult: string | null
  verdict: string | null
  successRatePercent: number | null
  topicCount: number
  alignedCount: number
  note: string | null
}

export interface WebChatResponse {
  message: string
  reply: string
  handled: boolean
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function fetchApiVersion(): Promise<WebApiVersion> {
  return fetchJson<WebApiVersion>('/version')
}

export function fetchMorningReport(): Promise<WebMorningReport> {
  return fetchJson<WebMorningReport>('/morning')
}

export function fetchFactReadiness(): Promise<WebFactReadiness> {
  return fetchJson<WebFactReadiness>('/fact-readiness')
}

export function fetchMorningValidation(): Promise<WebMorningValidation> {
  return fetchJson<WebMorningValidation>('/morning-validation')
}

export function postChat(message: string): Promise<WebChatResponse> {
  return fetchJson<WebChatResponse>('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
}

export function getStockApiBaseUrl(): string {
  return API_BASE
}
