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
      event?: string
      product?: string
      source?: string
      meta?: Record<string, unknown>
    }>(req)
    if (!body.event?.trim()) {
      sendNodeJson(res, { error: 'event 為必填' }, 400)
      return
    }
    if (sb) {
      await sb.from('analytics_events').insert({
        event: body.event,
        product: body.product,
        source: body.source,
        meta: body.meta ?? {},
      })
    }
    sendNodeJson(res, { ok: true })
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
      sendNodeJson(res, { metrics: null, configured: false })
      return
    }

    const [waitlist, events] = await Promise.all([
      sb.from('waitlist').select('id', { count: 'exact', head: true }),
      sb.from('analytics_events').select('event, product, created_at').order('created_at', { ascending: false }).limit(2000),
    ])

    const rows = events.data ?? []
    const countBy = (predicate: (e: { event: string }) => boolean) =>
      rows.filter(predicate).length

    sendNodeJson(res, {
      configured: true,
      metrics: {
        waitlistCount: waitlist.count ?? 0,
        demoStock: countBy((e) => e.event === 'demo_stock'),
        demoParenting: countBy((e) => e.event === 'demo_parenting'),
        demoCustomerService: countBy((e) => e.event === 'demo_customer_service'),
        ctaClicks: countBy((e) => e.event.startsWith('cta_')),
        pageViews: countBy((e) => e.event === 'page_view'),
        waitlistSubmits: countBy((e) => e.event === 'waitlist_submit'),
        conversionRate:
          waitlist.count && rows.length
            ? Math.round(((waitlist.count ?? 0) / Math.max(countBy((e) => e.event === 'page_view'), 1)) * 1000) / 10
            : 0,
      },
    })
    return
  }

  sendNodeJson(res, { error: 'Method not allowed' }, 405)
}
