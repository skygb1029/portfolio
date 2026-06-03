export interface WebProject {
  id: string
  title: string
  description: string
  features: string[]
  tech: string[]
  gradient: string
}

export interface AiProject {
  id: string
  title: string
  description: string
  features: string[]
  tech: string[]
  highlights: string[]
  gradient: string
  accent: string
  featured?: boolean
}

export const webProjects: WebProject[] = [
  {
    id: 'erp',
    title: 'ERP 管理系統',
    description: '企業內部管理平台，整合會員、權限與報表分析。',
    features: ['會員管理', '權限管理', '報表分析', '資料匯出'],
    tech: ['Vue3', 'TypeScript', 'Node.js', 'MySQL'],
    gradient: 'from-blue-600/20 to-cyan-500/10',
  },
  {
    id: 'ecommerce',
    title: '電商平台',
    description: '完整電商網站系統，涵蓋商品到金流全流程。',
    features: ['商品管理', '購物車', '訂單管理', '金流串接'],
    tech: ['Vue3', 'Express', 'REST API'],
    gradient: 'from-violet-600/20 to-purple-500/10',
  },
  {
    id: 'calendar',
    title: '行事曆管理系統',
    description: '個人生活管理與排程平台，支援拖曳與 Dashboard。',
    features: ['FullCalendar', '任務管理', '拖曳排程', 'Dashboard 分析'],
    tech: ['Vue3', 'Pinia', 'Express', 'Prisma', 'SQLite'],
    gradient: 'from-emerald-600/20 to-teal-500/10',
  },
]

export const aiProjects: AiProject[] = [
  {
    id: 'stock',
    title: 'AI 股票秘書',
    description: '透過 LINE 即可獲得股票分析與每日市場情報。',
    features: [
      '每日 AI 晨報',
      'ETF 資金流分析',
      '主動型 ETF 持股追蹤',
      '個股分析',
      '漲跌原因解析',
      '個人化關注標的',
    ],
    tech: ['OpenAI', 'LINE Messaging API', 'Node.js', 'Express', 'Prisma', 'Scheduler'],
    highlights: [
      '每日 07:00 晨報推播',
      '每日 13:30 驗證分析結果',
      '每日 18:00 ETF 持股追蹤',
    ],
    gradient: 'from-amber-500/25 via-orange-500/15 to-rose-500/10',
    accent: 'amber',
    featured: true,
  },
  {
    id: 'parenting',
    title: 'AI 育兒助手',
    description: '協助新手爸媽透過聊天完成寶寶紀錄，自然語言即可建檔。',
    features: ['奶量紀錄', '睡眠追蹤', '尿布紀錄', '體溫紀錄', '喝奶提醒'],
    tech: ['LINE Bot', 'OpenAI', 'Vue3', 'Node.js', 'Prisma'],
    highlights: ['喝奶120 → 自動辨識奶量', '睡著了 → 睡眠紀錄', '38.2度 → 體溫紀錄'],
    gradient: 'from-pink-500/25 via-rose-500/15 to-fuchsia-500/10',
    accent: 'pink',
    featured: true,
  },
  {
    id: 'cs',
    title: 'AI 客服業務小能手',
    description: '整合多平台客服與 AI 業務助手，一站式管理潛在客戶。',
    features: [
      'AI 自動回覆',
      '商品介紹',
      '客戶追蹤',
      '潛在客戶管理',
      'AI 銷售建議',
    ],
    tech: ['OpenAI', 'Webhook Gateway', 'CRM', 'Multi Channel Messaging'],
    highlights: ['支援 LINE、Instagram、Facebook、Threads'],
    gradient: 'from-indigo-500/25 via-blue-500/15 to-cyan-500/10',
    accent: 'indigo',
    featured: true,
  },
]

export const featuredAiIds = ['stock', 'parenting', 'cs']
