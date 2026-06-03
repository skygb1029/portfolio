export interface RoadmapItem {
  id: string
  title: string
  status: 'building' | 'planned'
  description: string
  quarter: string
}

export const roadmapItems: RoadmapItem[] = [
  {
    id: 'stock',
    title: 'AI 股票秘書',
    status: 'building',
    description: 'LINE 股票分析與每日市場情報 SaaS',
    quarter: '2025 Q2',
  },
  {
    id: 'parenting',
    title: 'AI 育兒助手',
    status: 'building',
    description: '新手爸媽聊天式育兒紀錄助手',
    quarter: '2025 Q3',
  },
  {
    id: 'cs',
    title: 'AI 客服業務小能手',
    status: 'building',
    description: '多平台客服與 AI 業務整合',
    quarter: '2025 Q3',
  },
  {
    id: 'video',
    title: 'AI 影片生成平台',
    status: 'planned',
    description: '自動化影片內容生成與發布工具',
    quarter: '2026 Q1',
  },
]
