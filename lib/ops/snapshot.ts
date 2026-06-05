import { opsProductRegistry } from './registry'
import { checkProductApiHealth } from './healthCheck'
import { fetchGithubDeployInfo } from './github'
import { fetchSupabaseProductStats } from './supabaseStats'
import type { OpsDashboardPayload } from './types'

export async function buildOpsDashboard(): Promise<OpsDashboardPayload> {
  const [supabaseStats, ...productRows] = await Promise.all([
    fetchSupabaseProductStats(opsProductRegistry),
    ...opsProductRegistry.map(async (product) => {
      const [health, github] = await Promise.all([
        checkProductApiHealth(product.apiUrl, product.previewPath),
        fetchGithubDeployInfo(product.githubProductId),
      ])

      return {
        id: product.id,
        name: product.name,
        icon: product.icon,
        status: product.status,
        healthKey: product.healthKey,
        waitlistCount: 0,
        feedbackCount: 0,
        apiHealth: health.status,
        apiLatencyMs: health.latencyMs,
        apiHealthDetail: health.detail,
        lastDeployedAt: github.lastDeployedAt,
        version: github.version,
      }
    }),
  ])

  const products = productRows.map((row) => ({
    ...row,
    waitlistCount: supabaseStats.waitlistByProduct[row.id] ?? 0,
    feedbackCount: supabaseStats.feedbackByProduct[row.id] ?? 0,
  }))

  return {
    generatedAt: new Date().toISOString(),
    sources: {
      github: products.some((p) => p.version !== '—'),
      supabase: supabaseStats.configured,
      productApi: true,
    },
    products,
  }
}
