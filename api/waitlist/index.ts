import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readJsonBody, sendNodeJson } from '../../lib/http'
import { getSupabaseAdmin } from '../../lib/supabase/server'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  const sb = getSupabaseAdmin()

  if (req.method === 'POST') {
    const body = await readJsonBody<{
      name?: string
      email?: string
      product?: string
      source?: string
    }>(req)
    const name = body.name?.trim()
    const email = body.email?.trim()
    const product = body.product?.trim()
    if (!name || !email || !product) {
      sendNodeJson(res, { error: 'name、email、product 為必填' }, 400)
      return
    }
    if (!sb) {
      sendNodeJson(res, { error: 'Supabase 未設定', fallback: true }, 503)
      return
    }
    const { data, error } = await sb
      .from('waitlist')
      .insert({
        name,
        email,
        product,
        source: body.source?.trim() || '/',
      })
      .select('id, name, email, product, source, created_at')
      .single()
    if (error) {
      sendNodeJson(res, { error: error.message }, 500)
      return
    }
    await sb.from('analytics_events').insert({
      event: 'waitlist_submit',
      product,
      source: body.source,
    })
    sendNodeJson(res, { ok: true, entry: data })
    return
  }

  if (req.method === 'GET') {
    const secret = process.env.ADMIN_API_SECRET
    const auth = req.headers.authorization?.replace('Bearer ', '')
    if (!secret || auth !== secret) {
      sendNodeJson(res, { error: 'Unauthorized' }, 401)
      return
    }
    if (!sb) {
      sendNodeJson(res, { error: 'Supabase 未設定' }, 503)
      return
    }
    const { data, error } = await sb
      .from('waitlist')
      .select('id, name, email, product, source, created_at')
      .order('created_at', { ascending: false })
      .limit(500)
    if (error) {
      sendNodeJson(res, { error: error.message }, 500)
      return
    }
    sendNodeJson(res, { entries: data })
    return
  }

  sendNodeJson(res, { error: 'Method not allowed' }, 405)
}
