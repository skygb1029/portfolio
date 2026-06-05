import { ref, onMounted } from 'vue'
import { getJson } from '@/utils/apiClient'

export type ApiHealthStatus = 'ONLINE' | 'DEGRADED' | 'OFFLINE'

export interface OpsProductRow {
  id: string
  name: string
  icon: string
  status: string
  healthKey: string
  waitlistCount: number
  feedbackCount: number
  apiHealth: ApiHealthStatus
  apiLatencyMs: number | null
  apiHealthDetail: string
  lastDeployedAt: string | null
  version: string
}

export interface OpsDashboardPayload {
  generatedAt: string
  sources: {
    github: boolean
    supabase: boolean
    productApi: boolean
  }
  products: OpsProductRow[]
}

export function useOpsDashboard() {
  const data = ref<OpsDashboardPayload | null>(null)
  const loading = ref(true)
  const error = ref('')

  const adminSecret = import.meta.env.VITE_ADMIN_API_SECRET ?? ''

  async function load() {
    loading.value = true
    error.value = ''
    if (!adminSecret) {
      error.value = '請在 .env 設定 VITE_ADMIN_API_SECRET（與伺服器 ADMIN_API_SECRET 相同）'
      loading.value = false
      return
    }
    try {
      data.value = await getJson<OpsDashboardPayload>('/api/ops', {
        Authorization: `Bearer ${adminSecret}`,
      })
    } catch (e) {
      error.value = e instanceof Error ? e.message : '載入失敗'
      data.value = null
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  return { data, loading, error, reload: load }
}

export function healthBadgeClass(status: ApiHealthStatus): string {
  switch (status) {
    case 'ONLINE':
      return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
    case 'DEGRADED':
      return 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
    case 'OFFLINE':
      return 'bg-rose-500/15 text-rose-800 dark:text-rose-300'
  }
}
