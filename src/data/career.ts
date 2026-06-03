export interface CareerEntry {
  id: string
  period: string
  company: string
  role: string
  tech?: string[]
  highlights?: string[]
}

export const careerTimeline: CareerEntry[] = [
  {
    id: 'bwt',
    period: '2015',
    company: '百威旅遊',
    role: '全端工程師',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'jQuery'],
  },
  {
    id: 'fanma',
    period: '2016 – 2019',
    company: '凡馬科技',
    role: '專案經理',
    highlights: ['專案管理', '時程控管', '跨部門溝通', '資源整合'],
  },
  {
    id: 'gaia',
    period: '2019 – 2020',
    company: '蓋亞科技',
    role: '前端工程師',
    tech: ['Vue', 'JavaScript', 'SCSS', 'Bootstrap'],
  },
  {
    id: 'jinfeng',
    period: '2022 – 2023',
    company: '機鋒實業',
    role: '前端工程師',
    tech: ['Vue3', 'Node.js', 'Docker', 'Jenkins', 'TG Bot', 'GCP'],
  },
  {
    id: 'moonen',
    period: '2024 – 2025',
    company: '沐恩生醫光電',
    role: '前端工程師',
    highlights: ['郵局 i郵箱開發', '醫療 AI 系統開發', '新人輔導'],
    tech: ['Vue3', 'TypeScript', 'Pinia', 'REST API', 'WebSocket'],
  },
  {
    id: 'yisheng',
    period: '2025 – Present',
    company: '易勝資訊',
    role: '前端工程師',
    highlights: ['企業系統開發', 'AI 系統開發', '前端架構規劃'],
  },
]
