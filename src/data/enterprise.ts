export type ProjectStatus = 'live' | 'development' | 'internal'

export interface EnterpriseProject {
  id: string
  title: string
  description: string
  features: string[]
  tech: string[]
  gradient: string
  status?: ProjectStatus
  statusLabel?: string
}

export const enterpriseProjects: EnterpriseProject[] = [
  {
    id: 'ipost',
    title: 'i郵箱郵件寄送平台',
    description: '整合郵局物流與 GS1 OAuth 的寄件平台。',
    features: ['OAuth 登入', '郵件寄送', '包裹追蹤', '狀態查詢'],
    tech: ['Vue3', 'TypeScript', 'REST API', 'Pinia'],
    gradient: 'from-sky-600/20 to-blue-500/10',
    status: 'live',
    statusLabel: '已上線',
  },
  {
    id: 'ai-medical',
    title: 'AI 坯孫偕妮',
    description: '整合病患資訊與 AI 分析結果的醫療平台。',
    features: ['病患資料整合', 'AI 分析結果呈現', '醫療決策輔助'],
    tech: ['Vue3', 'TypeScript', 'WebSocket', 'REST API'],
    gradient: 'from-teal-600/20 to-emerald-500/10',
  },
  {
    id: 'maya',
    title: '瑪雅音符蘭絲萊特',
    description: '透過檢驗資料分析病患潛在疾病風險。',
    features: ['病歷分析', 'AI 推測', '視覺化報表'],
    tech: ['Vue3', 'TypeScript', 'Chart.js'],
    gradient: 'from-violet-600/20 to-purple-500/10',
  },
  {
    id: 'geneluo',
    title: '基因螺',
    description: '透過基因規則引擎分析可能疾病。',
    features: ['基因規則管理', '疾病風險分析', '視覺化結果'],
    tech: ['Vue3', 'TypeScript', 'REST API'],
    gradient: 'from-rose-600/20 to-pink-500/10',
  },
]
