import { ref, onMounted } from 'vue'
import { getJson } from '@/utils/apiClient'
import { getWaitlistLeads, getWaitlistStats, type WaitlistLead } from '@/utils/waitlistLocal'
import { productLandings } from '@/data/productLandings'

export interface DashboardMetrics {
  waitlistCount: number
  demoStock: number
  demoParenting: number
  demoCustomerService: number
  ctaClicks: number
  pageViews: number
  waitlistSubmits: number
  conversionRate: number
}

export function useWaitlistDashboard() {
  const leads = ref<WaitlistLead[]>([])
  const loading = ref(true)
  const dataSource = ref<'supabase' | 'local' | 'offline'>('offline')
  const metrics = ref<DashboardMetrics | null>(null)

  const adminSecret = import.meta.env.VITE_ADMIN_API_SECRET ?? ''

  async function load() {
    loading.value = true

    if (adminSecret) {
      try {
        const [wl, analytics] = await Promise.all([
          getJson<{ entries: ApiWaitlistRow[] }>('/api/waitlist', {
            Authorization: `Bearer ${adminSecret}`,
          }),
          getJson<{ metrics: DashboardMetrics | null; configured: boolean }>(
            '/api/analytics',
            { Authorization: `Bearer ${adminSecret}` },
          ),
        ])
        leads.value = wl.entries.map(mapApiRow)
        dataSource.value = 'supabase'
        metrics.value = analytics.metrics
        loading.value = false
        return
      } catch (e) {
        console.warn('[Dashboard] API 載入失敗', e)
      }
    }

    const local = getWaitlistLeads()
    leads.value = local
    dataSource.value = local.length ? 'local' : 'offline'
    metrics.value = null
    loading.value = false
  }

  onMounted(load)

  const stats = () => getWaitlistStats(leads.value)

  const productTotals = () =>
    productLandings.map((p) => ({
      title: p.title,
      count: leads.value.filter(
        (l) => l.productId === p.id || l.productLabel === p.title,
      ).length,
    }))

  return { leads, loading, dataSource, metrics, stats, productTotals, reload: load }
}

interface ApiWaitlistRow {
  id: string
  name: string
  email: string
  product: string
  source: string
  created_at: string
}

function mapApiRow(row: ApiWaitlistRow): WaitlistLead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    productLabel: row.product,
    productId: '',
    sourcePage: row.source ?? '/',
    createdAt: row.created_at,
  }
}
