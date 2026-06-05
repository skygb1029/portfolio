import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readJsonBody, sendNodeJson } from '../../lib/http'
import { getSupabaseAdmin } from '../../lib/supabase/server'

const TYPES = ['suggestion', 'issue', 'requirement'] as const

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  const sb = getSupabaseAdmin()

  if (req.method === 'POST') {
    const body = await readJsonBody<{
      product?: string
      type?: string
      content?: string
    }>(req)
    const product = body.product?.trim()
    const type = body.type?.trim() as (typeof TYPES)[number]
    const content = body.content?.trim()
    if (!product || !content || !TYPES.includes(type)) {
      sendNodeJson(res, { error: 'product、type、content 為必填' }, 400)
      return
    }
    if (!sb) {
      sendNodeJson(res, { error: 'Supabase 未設定' }, 503)
      return
    }
    const { data, error } = await sb
      .from('feedback')
      .insert({ product, type, content })
      .select('id, product, type, content, created_at')
      .single()
    if (error) {
      sendNodeJson(res, { error: error.message }, 500)
      return
    }
    sendNodeJson(res, { ok: true, feedback: data })
    return
  }

  if (req.method === 'GET') {
    const product = String(req.query.product ?? '').trim()
    if (!sb) {
      sendNodeJson(res, { feedback: [] })
      return
    }
    let q = sb
      .from('feedback')
      .select('id, product, type, content, created_at')
      .order('created_at', { ascending: false })
      .limit(20)
    if (product) q = q.eq('product', product)
    const { data, error } = await q
    if (error) {
      sendNodeJson(res, { error: error.message }, 500)
      return
    }
    sendNodeJson(res, { feedback: data })
    return
  }

  sendNodeJson(res, { error: 'Method not allowed' }, 405)
}
