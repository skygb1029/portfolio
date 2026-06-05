import type { VercelRequest, VercelResponse } from '@vercel/node'

function buildUpstreamUrl(subPath: string): string {
  const host = (
    process.env.STOCK_API_URL ??
    process.env.VITE_STOCK_API_URL ??
    'https://ai-stock-secretary-production.up.railway.app'
  ).replace(/\/$/, '')
  const base = host.endsWith('/api/web') ? host : `${host}/api/web`
  const path = subPath.startsWith('/') ? subPath : `/${subPath}`
  return `${base}${path}`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204).end()
    return
  }

  const raw = req.query.path
  const segments = Array.isArray(raw) ? raw : raw ? [raw] : []
  const subPath = `/${segments.join('/')}`
  const upstream = buildUpstreamUrl(subPath)

  try {
    const headers: Record<string, string> = {
      Accept: 'application/json',
    }
    const init: RequestInit = { method: req.method, headers }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      headers['Content-Type'] = 'application/json'
      init.body = JSON.stringify(req.body ?? {})
    }

    const upstreamRes = await fetch(upstream, init)
    const text = await upstreamRes.text()
    res.status(upstreamRes.status)
    res.setHeader(
      'Content-Type',
      upstreamRes.headers.get('content-type') ?? 'application/json; charset=utf-8',
    )
    res.end(text)
  } catch (e) {
    res.status(502).json({
      message:
        'Stock API 無法連線。請在 Vercel 設定 STOCK_API_URL（例：https://stock-api.jrjim.ai）',
      upstream,
      error: e instanceof Error ? e.message : String(e),
    })
  }
}
