export type ApiHealthStatus = 'ONLINE' | 'DEGRADED' | 'OFFLINE'

export interface OpsProductConfig {
  id: string
  name: string
  icon: string
  status: string
  apiUrl: string
  healthKey: string
  githubProductId: string
  waitlistMatch: string[]
  feedbackMatch: string[]
  previewPath?: string
}

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
