import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseParentingInput } from '../../lib/demo/parentingParser'
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

  const parsed = parseParentingInput(input)
  const sb = getSupabaseAdmin()
  if (sb) {
    await sb.from('analytics_events').insert({
      event: 'demo_parenting',
      product: 'parenting-assistant',
      source: 'demo',
      meta: { type: parsed.type },
    })
  }

  sendNodeJson(res, {
    parse: parsed.type,
    record: parsed.record,
    reminder: parsed.reminder,
    reminderAt: parsed.reminderAt,
    confidence: parsed.confidence,
    input: parsed.input,
  })
}
