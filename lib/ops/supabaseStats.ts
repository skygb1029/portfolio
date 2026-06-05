import { getSupabaseAdmin } from '../supabase/server'
import type { OpsProductConfig } from './types'

function matches(value: string, keys: string[]): boolean {
  const v = value.trim().toLowerCase()
  return keys.some((k) => v === k.toLowerCase() || v.includes(k.toLowerCase()))
}

export async function fetchSupabaseProductStats(
  products: OpsProductConfig[],
): Promise<{
  configured: boolean
  waitlistByProduct: Record<string, number>
  feedbackByProduct: Record<string, number>
}> {
  const sb = getSupabaseAdmin()
  const waitlistByProduct: Record<string, number> = {}
  const feedbackByProduct: Record<string, number> = {}

  for (const p of products) {
    waitlistByProduct[p.id] = 0
    feedbackByProduct[p.id] = 0
  }

  if (!sb) {
    return { configured: false, waitlistByProduct, feedbackByProduct }
  }

  const [waitlist, feedback] = await Promise.all([
    sb.from('waitlist').select('product'),
    sb.from('feedback').select('product'),
  ])

  for (const row of waitlist.data ?? []) {
    const label = String(row.product ?? '')
    for (const p of products) {
      if (matches(label, p.waitlistMatch)) {
        waitlistByProduct[p.id] = (waitlistByProduct[p.id] ?? 0) + 1
      }
    }
  }

  for (const row of feedback.data ?? []) {
    const label = String(row.product ?? '')
    for (const p of products) {
      if (matches(label, p.feedbackMatch)) {
        feedbackByProduct[p.id] = (feedbackByProduct[p.id] ?? 0) + 1
      }
    }
  }

  return { configured: true, waitlistByProduct, feedbackByProduct }
}
