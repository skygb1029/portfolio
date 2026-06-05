import type { VercelRequest, VercelResponse } from '@vercel/node'
import { analyzeStock } from '../../lib/demo/stockAnalysis'
import { readJsonBody, sendNodeJson } from '../../lib/http'
import { getSupabaseAdmin } from '../../lib/supabase/server'

async function trackDemo(event: string, product: string, meta?: Record<string, unknown>) {
  const sb = getSupabaseAdmin()
  if (!sb) return
  await sb.from('analytics_events').insert({
    event,
    product,
    source: 'demo',
    meta: meta ?? {},
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }
  if (req.method !== 'POST' && req.method !== 'GET') {
    sendNodeJson(res, { error: 'Method not allowed' }, 405)
    return
  }

  let symbol = ''
  if (req.method === 'GET') {
    symbol = String(req.query.symbol ?? '')
  } else {
    const body = await readJsonBody<{ symbol?: string }>(req)
    symbol = body.symbol ?? ''
  }

  if (!symbol.trim()) {
    sendNodeJson(res, { error: '請提供 symbol（例：0050、2330）' }, 400)
    return
  }

  const result = analyzeStock(symbol)
  await trackDemo('demo_stock', 'stock-secretary', { symbol: result.symbol })

  sendNodeJson(res, {
    direction: result.direction,
    probability: result.probability,
    reasons: result.reasons,
    risks: result.risks,
    name: result.name,
    symbol: result.symbol,
    etfFlow: result.etfFlow,
    marketContext: result.marketContext,
    disclaimer: result.disclaimer,
  })
}
