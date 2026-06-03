export interface TimelineEntry {
  id: string
  year: string
  title: string
  description: string
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'fe',
    year: '2019',
    title: '前端工程師',
    description: '專注 Vue、TypeScript 與企業級 Web 系統開發，累積 ERP、電商等專案經驗。',
  },
  {
    id: 'ai-start',
    year: '2023',
    title: '開始接觸 AI',
    description: '探索 OpenAI API、Prompt Engineering 與 LINE Bot 整合，將 AI 導入實際產品場景。',
  },
  {
    id: 'stock',
    year: '2024',
    title: '開發 AI 股票秘書',
    description: '打造 LINE 股票分析助手，每日晨報與 ETF 追蹤自動化推播。',
  },
  {
    id: 'parenting',
    year: '2024',
    title: '開發 AI 育兒助手',
    description: '自然語言育兒紀錄與提醒系統，降低新手爸媽的記錄負擔。',
  },
  {
    id: 'ecosystem',
    year: '2025',
    title: '打造 AI SaaS 生態系',
    description: '整合客服、育兒、金融等多條產品線，朝向可長期經營的 SaaS 邁進。',
  },
]
