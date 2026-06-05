import type { VercelRequest, VercelResponse } from '@vercel/node'
import { analyzeCustomerMessage } from '../../lib/demo/customerService'
import { readJsonBody, sendNodeJson } from '../../lib/http'
import { getSupabaseAdmin } from '../../lib/supabase/server'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }
  if (req.method !== 'POST') {
    sendNodeJson(res, { error: 'Method not allowed' }, 405)
    return
  }

  const body = await readJsonBody<{ input?: string }>(req)
  const input = body.input ?? ''
  if (!input.trim()) {
    sendNodeJson(res, { error: '請提供 input' }, 400)
    return
  }

  const result = analyzeCustomerMessage(input)
  const sb = getSupabaseAdmin()
  if (sb) {
    await sb.from('analytics_events').insert({
      event: 'demo_customer_service',
      product: 'sales-assistant',
      source: 'demo',
      meta: { intent: result.intent },
    })
  }

  sendNodeJson(res, {
    reply: result.reply,
    intent: result.intent,
    suggestedActions: result.suggestedActions,
    confidence: result.confidence,
    input: result.input,
  })
}
