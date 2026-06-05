import type { ApiHealthStatus } from './types'

const HEALTH_PATHS = ['/health', '/api/health', '/status', '/ready', '/']
const DEGRADED_LATENCY_MS = 2000
const TIMEOUT_MS = 5000

export interface HealthCheckResult {
  status: ApiHealthStatus
  latencyMs: number | null
  detail: string
}

function baseUrl(url: string): string {
  return url.replace(/\/$/, '')
}

async function probe(
  url: string,
  method: 'GET' | 'HEAD' = 'GET',
): Promise<{ ok: boolean; status: number; latencyMs: number }> {
  const start = Date.now()
  const res = await fetch(url, {
    method,
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { Accept: 'application/json' },
  })
  return { ok: res.ok, status: res.status, latencyMs: Date.now() - start }
}

export async function checkProductApiHealth(
  apiUrl: string,
  previewPath?: string,
): Promise<HealthCheckResult> {
  const root = baseUrl(apiUrl)
  let best: HealthCheckResult | null = null

  for (const path of HEALTH_PATHS) {
    try {
      const { ok, status, latencyMs } = await probe(`${root}${path}`)
      if (ok) {
        const statusLabel: ApiHealthStatus =
          latencyMs >= DEGRADED_LATENCY_MS ? 'DEGRADED' : 'ONLINE'
        return {
          status: statusLabel,
          latencyMs,
          detail: `${path} ${statusLabel === 'ONLINE' ? 'OK' : 'slow'}`,
        }
      }
      if (status >= 500) continue
      if (status >= 400 && status < 500) {
        best = {
          status: 'DEGRADED',
          latencyMs,
          detail: `${path} HTTP ${status}`,
        }
      }
    } catch {
      /* try next path */
    }
  }

  if (previewPath) {
    try {
      const { ok, status, latencyMs } = await probe(`${root}${previewPath}`, 'GET')
      if (ok || status === 405 || status === 401) {
        return {
          status: latencyMs >= DEGRADED_LATENCY_MS ? 'DEGRADED' : 'DEGRADED',
          latencyMs,
          detail: `${previewPath} reachable (no /health)`,
        }
      }
    } catch {
      /* fall through */
    }
  }

  if (best) return best

  return {
    status: 'OFFLINE',
    latencyMs: null,
    detail: '無法連線至產品 API',
  }
}
