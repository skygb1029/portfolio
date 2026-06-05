import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendNodeJson } from '../../lib/http'

const PRODUCT_REPOS: Record<string, { repo: string; label: string }> = {
  'stock-secretary': { repo: 'portfolio', label: 'AI 股票秘書' },
  'parenting-assistant': { repo: 'portfolio', label: 'AI 育兒助手' },
  'sales-assistant': { repo: 'portfolio', label: 'AI 客服業務小能手' },
}

interface GhRelease {
  tag_name: string
  name: string
  published_at: string
  body: string
}

async function ghFetch(path: string) {
  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'jr-jim-product-hub',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`https://api.github.com${path}`, { headers })
  if (!res.ok) return null
  return res.json()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    sendNodeJson(res, { error: 'Method not allowed' }, 405)
    return
  }

  const productId = String(req.query.product ?? '')
  const owner = process.env.GITHUB_OWNER ?? 'skygb1029'
  const mapping = PRODUCT_REPOS[productId] ?? { repo: 'portfolio', label: productId }

  const [releases, tags] = await Promise.all([
    ghFetch(`/repos/${owner}/${mapping.repo}/releases?per_page=5`) as Promise<GhRelease[] | null>,
    ghFetch(`/repos/${owner}/${mapping.repo}/tags?per_page=10`) as Promise<{ name: string }[] | null>,
  ])

  const latest = releases?.[0]
  sendNodeJson(res, {
    productId,
    label: mapping.label,
    currentVersion: latest?.tag_name ?? tags?.[0]?.name ?? '開發中',
    latestRelease: latest
      ? {
          tag: latest.tag_name,
          name: latest.name,
          publishedAt: latest.published_at,
          summary: (latest.body ?? '').slice(0, 280),
        }
      : null,
    recentUpdates: (releases ?? []).slice(0, 3).map((r) => ({
      tag: r.tag_name,
      name: r.name,
      date: r.published_at,
    })),
    roadmap: [
      { status: 'done', title: 'Product Hub 統一入口' },
      { status: 'in_progress', title: 'Demo API 與真實資料後端' },
      { status: 'planned', title: '正式版 App 上架' },
    ],
    source: 'github',
  })
}
