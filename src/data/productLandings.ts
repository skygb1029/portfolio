import type { ProductLifecycleStatus } from '@/data/productStatus'

export interface ProductLanding {
  id: string
  slug: string
  title: string
  tagline: string
  gradient: string
  emoji: string
  lifecycleStatus: ProductLifecycleStatus
  waitlistCount: number
  featuresBuilt: number
  featuresTotal: number
  eta: string
  problems: string[]
  solutions: string[]
  demo: {
    title: string
    sections: { title: string; content: string }[]
  }
  screenshots: { label: string; placeholder: string }[]
  business: {
    audience: string
    pricing: string
    roadmap: string[]
  }
  flowVariant?: 'stock' | 'parenting' | 'cs'
  videoSrc?: string
  githubProductId?: string
}

export const productLandings: ProductLanding[] = [
  {
    id: 'stock',
    slug: 'stock-secretary',
    title: 'AI 股票秘書',
    tagline: '每日晨報 · ETF 追蹤 · 個股分析，透過 LINE 直達',
    gradient: 'from-amber-500/25 via-orange-500/15 to-rose-500/10',
    emoji: '📈',
    lifecycleStatus: 'beta',
    waitlistCount: 128,
    featuresBuilt: 12,
    featuresTotal: 16,
    eta: '2025 Q3 Public Beta',
    problems: [
      '每天新聞很多，不知道哪些會影響股票',
      'ETF 換股看不懂，難以判斷資金流向',
      '盤中資訊分散，缺乏結構化晨報',
    ],
    solutions: [
      'AI 自動整理台股、美股、ETF 新聞與事件',
      '產生大盤分析、ETF 資金流與關注標的報告',
      '每日定時推播至 LINE，節省篩選時間',
    ],
    demo: {
      title: '晨報範例（模擬）',
      sections: [
        {
          title: '大盤分析',
          content:
            '台股加權指數開高走低，收於 22,450，成交量放大。美股昨夜科技板塊回穩，亞股早盤跟隨反彈後賣壓浮現。',
        },
        {
          title: 'ETF 資金流',
          content:
            '0050 淨流入 3.2 億，00919 持股調整：增碼台积电、減碼金融股。主動型 ETF 換股比例較上週上升 12%。',
        },
        {
          title: '關注標的',
          content: '2330：法說優於預期，短期留意 580 壓力區。2303：受益 AI 伺服器需求，量能溫和放大。',
        },
      ],
    },
    screenshots: [
      { label: 'LINE 晨報推播', placeholder: 'screenshot-stock-line' },
      { label: 'ETF 持股追蹤', placeholder: 'screenshot-stock-etf' },
    ],
    business: {
      audience: '忙碌上班族、小型投資人、需每日市場摘要者',
      pricing: 'Freemium + 進階晨報訂閱（規劃中）',
      roadmap: ['每日晨報', '個股問答', '自訂關注清單', '進階 ETF 追蹤'],
    },
    flowVariant: 'stock',
    videoSrc: '/videos/stock-demo.mp4',
    githubProductId: 'stock-secretary',
  },
  {
    id: 'parenting',
    slug: 'parenting-assistant',
    title: 'AI 育兒助手',
    tagline: '用說的就能記錄，自動提醒不遺漏',
    gradient: 'from-pink-500/25 via-rose-500/15 to-fuchsia-500/10',
    emoji: '👶',
    lifecycleStatus: 'beta',
    waitlistCount: 86,
    featuresBuilt: 8,
    featuresTotal: 12,
    eta: '2025 Q4 Public Beta',
    problems: [
      '新手爸媽難以持續填寫繁瑣紀錄表',
      '半夜餵奶後容易忘記記錄',
      '體溫、奶量等數據分散難以回顧',
    ],
    solutions: [
      '輸入「喝奶120」「睡著了」「38.2度」自動辨識並建檔',
      '依紀錄自動設定喝奶、睡眠提醒',
      'Dashboard 一眼掌握寶寶作息',
    ],
    demo: {
      title: '對話紀錄範例',
      sections: [
        { title: '輸入', content: '喝奶120' },
        {
          title: '解析結果',
          content: '類型：喝奶｜奶量：120ml｜時間：14:32｜已寫入今日紀錄',
        },
        {
          title: '提醒',
          content: '已排程 3 小時後喝奶提醒。今日累計奶量 480ml。',
        },
      ],
    },
    screenshots: [
      { label: 'LINE 對話紀錄', placeholder: 'screenshot-parenting-chat' },
      { label: '作息 Dashboard', placeholder: 'screenshot-parenting-dash' },
    ],
    business: {
      audience: '0–2 歲寶寶家長、保母、雙薪家庭',
      pricing: '免費基礎紀錄 + 進階提醒訂閱',
      roadmap: ['多寶紀錄', '家庭共享', '成長曲線報告', '醫療紀錄匯出'],
    },
    flowVariant: 'parenting',
    videoSrc: '/videos/parenting-demo.mp4',
    githubProductId: 'parenting-assistant',
  },
  {
    id: 'cs',
    slug: 'sales-assistant',
    title: 'AI 客服業務小能手',
    tagline: '多平台訊息一站整合，AI 助攻成交',
    gradient: 'from-indigo-500/25 via-blue-500/15 to-cyan-500/10',
    emoji: '💬',
    lifecycleStatus: 'mvp',
    waitlistCount: 54,
    featuresBuilt: 6,
    featuresTotal: 14,
    eta: '2026 Q1 Internal → Public Beta',
    problems: [
      '客服訊息分散在 LINE、IG、FB 難以統一管理',
      '重複性問題占用業務時間',
      '潛在客戶追蹤缺乏系統化',
    ],
    solutions: [
      'Webhook Gateway 整合多通道訊息',
      'AI 自動回覆與商品介紹',
      'CRM 追蹤潛在客戶與 AI 銷售建議',
    ],
    demo: {
      title: '客服流程',
      sections: [
        { title: '通道', content: 'LINE · Instagram · Facebook · Threads' },
        { title: '架構', content: 'Webhook Gateway → AI Engine → CRM → Dashboard' },
      ],
    },
    screenshots: [
      { label: '多平台收件匣', placeholder: 'screenshot-cs-inbox' },
      { label: 'CRM 看板', placeholder: 'screenshot-cs-crm' },
    ],
    business: {
      audience: '中小電商、品牌客服、業務團隊',
      pricing: '依訊息量 + 座席數 SaaS 訂閱',
      roadmap: ['多通道串接', 'AI 話術模板', '成交漏斗', '業績報表'],
    },
    flowVariant: 'cs',
    videoSrc: '/videos/sales-demo.mp4',
    githubProductId: 'sales-assistant',
  },
]

export function getLandingBySlug(slug: string): ProductLanding | undefined {
  return productLandings.find((p) => p.slug === slug)
}

export function getLandingPath(slug: string): string {
  return `/product/${slug}`
}
