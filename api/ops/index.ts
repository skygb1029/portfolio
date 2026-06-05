import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendNodeJson } from '../../lib/http'
import { buildOpsDashboard } from '../../lib/ops/snapshot'

function isAuthorized(req: VercelRequest): boolean {
  const secret = process.env.ADMIN_API_SECRET
  const auth = req.headers.authorization?.replace('Bearer ', '')
  return !!secret && auth === secret
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }
  if (req.method !== 'GET') {
    sendNodeJson(res, { error: 'Method not allowed' }, 405)
    return
  }
  if (!isAuthorized(req)) {
    sendNodeJson(res, { error: 'Unauthorized' }, 401)
    return
  }

  try {
    const dashboard = await buildOpsDashboard()
    sendNodeJson(res, dashboard)
  } catch (e) {
    sendNodeJson(res, { error: e instanceof Error ? e.message : 'Ops snapshot failed' }, 500)
  }
}
