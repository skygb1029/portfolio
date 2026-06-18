/**
 * Stock Public API client — 對齊 ai-stock-secretary `/api/web/*` 契約。
 *
 * 環境變數（擇一，建置時注入）：
 * - VITE_API_BASE=https://host/api/web
 * - VITE_STOCK_API_URL=https://host
 *
 * 正式站未設定時：走同源 `/api/stock`（Vercel 代理 → STOCK_API_URL）
 * 本機未設定時：http://localhost:3002/api/web
 */
function resolveApiBase(): string {
  const apiBase = import.meta.env.VITE_API_BASE?.replace(/\/$/, '')
  if (apiBase) {
    if (import.meta.env.PROD && /localhost|127\.0\.0\.1/i.test(apiBase)) {
      return '/api/stock'
    }
    return apiBase
  }

  const host = import.meta.env.VITE_STOCK_API_URL?.replace(/\/$/, '')
  if (host) {
    if (import.meta.env.PROD && /localhost|127\.0\.0\.1/i.test(host)) {
      return '/api/stock'
    }
    return `${host}/api/web`
  }

  if (import.meta.env.PROD) {
    return '/api/stock'
  }

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
  interactionId?: string
}

export type ChatFeedbackRating = 'helpful' | 'not_helpful'

export interface WebFocusSymbol {
  symbol: string
  displayLabel: string
  direction: string
  upProbability: number
  downProbability: number
  summary: string | null
}

export interface WebFocusSymbolsResponse {
  date: string
  symbols: WebFocusSymbol[]
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const hint = (body as { message?: string }).message
    if (res.status === 502 && API_BASE === '/api/stock') {
      throw new Error(
        hint ??
          'Stock API 未部署或 Vercel 未設定 STOCK_API_URL。請部署 ai-stock-secretary 後端並設定環境變數。',
      )
    }
    throw new Error(hint ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function fetchApiVersion(): Promise<WebApiVersion> {
  return fetchJson<WebApiVersion>('/version')
}

export function fetchMorningReport(): Promise<WebMorningReport> {
  return fetchJson<WebMorningReport>('/morning')
}

export function fetchFocusSymbols(): Promise<WebFocusSymbolsResponse> {
  return fetchJson<WebFocusSymbolsResponse>('/focus-symbols')
}

export function postChat(message: string, sessionId?: string): Promise<WebChatResponse> {
  return fetchJson<WebChatResponse>('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  })
}

export function postChatFeedback(input: {
  question: string
  answer: string
  rating: ChatFeedbackRating
}): Promise<{ ok: boolean; timestamp: string }> {
  return fetchJson('/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...input,
      timestamp: new Date().toISOString(),
    }),
  })
}

export interface UsageStats {
  generatedAt: string
  totalQuestions: number
  todayQuestions: number
  last7DaysQuestions: number
}

export interface FeedbackSummary {
  generatedAt: string
  totalFeedback: number
  positivePercent: number
  negativePercent: number
  recent: Array<{
    timestamp: string
    question: string
    rating: ChatFeedbackRating
  }>
}

export interface Phase8ProgressMetric {
  current: number
  target: number
  percent: number
}

export interface Phase8Progress {
  generatedAt: string
  reportDate: string
  questions: Phase8ProgressMetric
  users: Phase8ProgressMetric
  feedback: Phase8ProgressMetric
  overallPercent: number
  phase8BReady: boolean
}

export interface LineJoinInfo {
  url: string | null
  available: boolean
  benefits: string[]
}

export function fetchUsageStats(): Promise<UsageStats> {
  return fetchJson<UsageStats>('/analytics/usage')
}

export function fetchFeedbackSummary(): Promise<FeedbackSummary> {
  return fetchJson<FeedbackSummary>('/analytics/feedback')
}

export function fetchPhase8Progress(): Promise<Phase8Progress> {
  return fetchJson<Phase8Progress>('/analytics/progress')
}

export function fetchLineJoinInfo(): Promise<LineJoinInfo> {
  return fetchJson<LineJoinInfo>('/line-join')
}

export function getStockApiBaseUrl(): string {
  return API_BASE
}

export function isStockApiMisconfiguredOnProduction(): boolean {
  if (!import.meta.env.PROD || typeof window === 'undefined') return false
  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1') return false
  return /localhost|127\.0\.0\.1/i.test(API_BASE)
}
