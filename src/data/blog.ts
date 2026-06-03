export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  comingSoon?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: 'ai-notes',
    title: 'AI 開發筆記：從 Prompt 到 Agent',
    excerpt: '記錄 OpenAI API 整合、RAG 架構與 Agent 編排實戰心得。',
    category: 'AI 開發',
    date: '2025-06',
    readTime: '8 min',
    comingSoon: true,
  },
  {
    id: 'vue-tips',
    title: 'Vue 3 組合式 API 大型專案實踐',
    excerpt: 'Pinia、Router 與 TypeScript 在企業專案中的結構化設計。',
    category: 'Vue 開發',
    date: '2025-05',
    readTime: '6 min',
    comingSoon: true,
  },
  {
    id: 'stock-ai',
    title: '股票 AI 分析技術：晨報 Pipeline 設計',
    excerpt: '排程推播、行情驗證與 Prompt 優化的完整流程。',
    category: 'AI 產品',
    date: '2025-04',
    readTime: '10 min',
    comingSoon: true,
  },
  {
    id: 'line-bot',
    title: 'LINE Bot 開發紀錄：Webhook 到 Flex Message',
    excerpt: 'Messaging API、簽章驗證與訊息分段的最佳實踐。',
    category: 'LINE Bot',
    date: '2025-03',
    readTime: '7 min',
    comingSoon: true,
  },
]
