export const analyticsConsole = 'https://analytics.google.com/analytics/web/#/a52976749p320722386/reports/intelligenthome'
export const analyticsScope = 'https://www.googleapis.com/auth/analytics.readonly'
export const analyticsClientId = import.meta.env.VITE_GA_REPORTS_CLIENT_ID?.trim() || '975781003185-iii9udn55qrjnr450sri9cob57i6dtv0.apps.googleusercontent.com'

interface GoogleOAuth {
  initTokenClient(config: {
    client_id: string
    scope: string
    include_granted_scopes: boolean
    callback: (response: { access_token?: string }) => void
    error_callback: () => void
  }): { requestAccessToken(config: { prompt: string }): void }
}

export function loadGoogleOAuth(): Promise<GoogleOAuth> {
  const getOAuth = () => (window as Window & { google?: { accounts?: { oauth2?: GoogleOAuth } } }).google?.accounts?.oauth2
  const existing = getOAuth()
  if (existing) return Promise.resolve(existing)
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = () => {
      const oauth = getOAuth()
      if (oauth) resolve(oauth)
      else reject(new Error('Google 授權工具未能啟動。'))
    }
    script.onerror = () => {
      script.remove()
      reject(new Error('Google 授權工具載入失敗，請重新整理。'))
    }
    document.head.append(script)
  })
}

type Row = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }
type Report = { rows?: Row[] }
export type ReportEntry = { label: string; count: number }

export async function getAnalyticsReport(token: string, days: number, signal: AbortSignal) {
  const property = import.meta.env.VITE_GA_REPORTS_PROPERTY_ID || '320722386'
  const stream = import.meta.env.VITE_GA_REPORTS_STREAM_ID || '16404095899'
  if (!/^\d+$/.test(property) || !/^\d+$/.test(stream)) throw new Error('GA4 資源或串流設定錯誤。')
  const endpoint = 'https://analyticsdata.googleapis.com/v1beta/properties/' + property
  const dimensionFilter = { filter: { fieldName: 'streamId', stringFilter: { matchType: 'EXACT', value: stream } } }
  const dateRanges = [{ startDate: (days - 1) + 'daysAgo', endDate: 'today' }]
  const names = (values: string[]) => values.map(name => ({ name }))
  const summary = { metrics: names(['activeUsers', 'sessions', 'screenPageViews', 'eventCount']) }
  const grouped = (dimension: string, metric: string) => ({
    dimensions: names([dimension]), metrics: names([metric]), limit: '10',
    orderBys: [{ metric: { metricName: metric }, desc: true }],
  })
  const core = (report: object) => ({ ...report, dimensionFilter, dateRanges })
  async function fetchReport<T>(method: string, body: object): Promise<T> {
    const response = await fetch(endpoint + ':' + method, {
      method: 'POST', headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body), signal,
    })
    if (response.status === 401) throw new Error('Google 授權已過期，請重新連線。')
    if (response.status === 403) throw new Error('無法讀取報表。請確認 Google 帳戶有此 GA4 資源的權限，且已啟用 Analytics Data API。')
    if (response.status === 429) throw new Error('已達 GA4 查詢上限，請稍後再試。')
    if (!response.ok) throw new Error('GA4 暫時無法提供報表，請稍後再試。')
    return response.json() as Promise<T>
  }
  const [batch, realtime] = await Promise.all([
    fetchReport<{ reports: Report[] }>('batchRunReports', {
      requests: [
        core(summary), core(grouped('pagePath', 'screenPageViews')),
        core(grouped('eventName', 'eventCount')), core(grouped('sessionDefaultChannelGroup', 'sessions')),
      ],
    }),
    fetchReport<Report>('runRealtimeReport', { ...grouped('eventName', 'eventCount'), dimensionFilter }),
  ])
  const entries = (report?: Report): ReportEntry[] => (report?.rows ?? []).map(row => ({
    label: row.dimensionValues?.[0]?.value ?? '未分類', count: Number(row.metricValues?.[0]?.value ?? 0),
  }))
  const [totals, pages, events, channels] = batch.reports
  const metrics = totals?.rows?.[0]?.metricValues ?? []
  return { metrics: summary.metrics.map((_, i) => Number(metrics[i]?.value ?? 0)),
    pages: entries(pages), events: entries(events), channels: entries(channels), realtime: entries(realtime) }
}
