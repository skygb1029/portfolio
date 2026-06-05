import type { IncomingMessage } from 'node:http'
import type { Plugin } from 'vite'
import { analyzeStock } from '../lib/demo/stockAnalysis'
import { parseParentingInput } from '../lib/demo/parentingParser'
import { analyzeCustomerMessage } from '../lib/demo/customerService'
import { sendNodeJson, readJsonBody } from '../lib/http'

function readQuery(url: string): URLSearchParams {
  const i = url.indexOf('?')
  return new URLSearchParams(i >= 0 ? url.slice(i + 1) : '')
}

async function readBody(req: IncomingMessage): Promise<Record<string, string>> {
  try {
    return await readJsonBody<Record<string, string>>(req)
  } catch {
    return {}
  }
}

export function devApiPlugin(): Plugin {
  return {
    name: 'jr-jim-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url ?? ''
        if (!rawUrl.startsWith('/api/')) {
          next()
          return
        }

        const path = rawUrl.split('?')[0] ?? ''
        const method = req.method ?? 'GET'

        if (method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        try {
          if (path === '/api/demo/stock' && (method === 'POST' || method === 'GET')) {
            const symbol =
              method === 'GET'
                ? readQuery(rawUrl).get('symbol') ?? ''
                : ((await readBody(req)).symbol ?? '')
            if (!symbol.trim()) {
              sendNodeJson(res, { error: '請提供 symbol' }, 400)
              return
            }
            const r = analyzeStock(symbol)
            sendNodeJson(res, {
              direction: r.direction,
              probability: r.probability,
              reasons: r.reasons,
              risks: r.risks,
              name: r.name,
              symbol: r.symbol,
              etfFlow: r.etfFlow,
              marketContext: r.marketContext,
              disclaimer: r.disclaimer,
            })
            return
          }

          if (path === '/api/demo/parenting' && method === 'POST') {
            const { input } = await readBody(req)
            if (!input?.trim()) {
              sendNodeJson(res, { error: '請提供 input' }, 400)
              return
            }
            const p = parseParentingInput(input)
            sendNodeJson(res, {
              parse: p.type,
              record: p.record,
              reminder: p.reminder,
              reminderAt: p.reminderAt,
              confidence: p.confidence,
              input: p.input,
            })
            return
          }

          if (path === '/api/demo/customer-service' && method === 'POST') {
            const { input } = await readBody(req)
            if (!input?.trim()) {
              sendNodeJson(res, { error: '請提供 input' }, 400)
              return
            }
            const r = analyzeCustomerMessage(input)
            sendNodeJson(res, {
              reply: r.reply,
              intent: r.intent,
              suggestedActions: r.suggestedActions,
              confidence: r.confidence,
              input: r.input,
            })
            return
          }

          if (path === '/api/waitlist' && method === 'POST') {
            sendNodeJson(
              res,
              { error: 'Supabase 未設定（本地開發）', fallback: true },
              503,
            )
            return
          }

          if (path === '/api/github/product-progress' && method === 'GET') {
            const product = readQuery(rawUrl).get('product') ?? ''
            sendNodeJson(res, {
              productId: product,
              currentVersion: 'dev',
              recentUpdates: [],
              roadmap: [
                { status: 'in_progress', title: 'Demo API' },
              ],
              source: 'dev',
            })
            return
          }

          if (path === '/api/feedback' && method === 'GET') {
            sendNodeJson(res, { feedback: [] })
            return
          }

          if (path === '/api/analytics' && method === 'POST') {
            sendNodeJson(res, { ok: true })
            return
          }

          if (path.startsWith('/api/stock/') || path === '/api/stock') {
            const sub = path.replace(/^\/api\/stock\/?/, '') || 'version'
            const upstream = `http://localhost:3002/api/web/${sub}`
            try {
              const body =
                method === 'POST' || method === 'PUT' ? await readBody(req) : undefined
              const upstreamRes = await fetch(upstream, {
                method,
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body:
                  body && Object.keys(body).length
                    ? JSON.stringify(body)
                    : method === 'POST'
                      ? '{}'
                      : undefined,
              })
              const text = await upstreamRes.text()
              res.statusCode = upstreamRes.status
              res.setHeader('Content-Type', 'application/json; charset=utf-8')
              res.end(text)
            } catch (e) {
              sendNodeJson(
                res,
                { message: '本機 Stock API 未啟動，請在 ai-stock-secretary 執行 pnpm dev:webhook' },
                502,
              )
            }
            return
          }

          if (path === '/api/ops' && method === 'GET') {
            const auth = req.headers.authorization?.replace('Bearer ', '')
            const secret = process.env.ADMIN_API_SECRET
            if (secret && auth !== secret) {
              sendNodeJson(res, { error: 'Unauthorized' }, 401)
              return
            }
            const { buildOpsDashboard } = await import('../lib/ops/snapshot')
            const dashboard = await buildOpsDashboard()
            sendNodeJson(res, dashboard)
            return
          }

          sendNodeJson(res, { error: 'Not found' }, 404)
        } catch (e) {
          sendNodeJson(res, { error: String(e) }, 500)
        }
      })
    },
  }
}
