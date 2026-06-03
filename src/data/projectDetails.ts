export interface TechStack {
  frontend: string[]
  backend: string[]
  database: string[]
  aiService: string[]
}

export interface ProjectDetail {
  id: string
  type: 'web' | 'ai'
  background: string
  problem: string
  features: string[]
  techStack: TechStack
  devInsights: string[]
}

export const projectDetails: Record<string, ProjectDetail> = {
  erp: {
    id: 'erp',
    type: 'web',
    background:
      '企業內部營運需要統一管理平台，取代分散的 Excel 與人工流程，讓管理層能即時掌握營運數據。',
    problem:
      '解決會員資料分散、權限難以控管、報表產出耗時等問題，提升內部協作效率與決策速度。',
    features: ['會員管理', '權限管理', '報表分析', '資料匯出'],
    techStack: {
      frontend: ['Vue3', 'TypeScript', 'Pinia', 'TailwindCSS'],
      backend: ['Node.js', 'Express', 'REST API'],
      database: ['MySQL'],
      aiService: [],
    },
    devInsights: [
      'RBAC 權限設計需與前端路由守衛同步，避免僅靠 UI 隱藏造成安全漏洞。',
      '大量報表查詢採用分頁與索引優化，將匯出任務改為非同步處理避免阻塞 API。',
    ],
  },
  ecommerce: {
    id: 'ecommerce',
    type: 'web',
    background:
      '為品牌打造可擴展的電商前台與後台，支援商品上架、訂單追蹤與金流整合的完整商業閉環。',
    problem:
      '讓商家能在單一系統管理商品、訂單與付款狀態，降低跨平台營運成本並提升轉換率。',
    features: ['商品管理', '購物車', '訂單管理', '金流串接'],
    techStack: {
      frontend: ['Vue3', 'Vue Router', 'Pinia'],
      backend: ['Express', 'REST API'],
      database: ['MySQL'],
      aiService: [],
    },
    devInsights: [
      '購物車與庫存需處理併發，採用樂觀鎖避免超賣。',
      '金流 webhook 需冪等設計，防止重複通知造成訂單狀態錯誤。',
    ],
  },
  calendar: {
    id: 'calendar',
    type: 'web',
    background:
      '個人與小型團隊需要視覺化排程工具，整合任務、行事曆與數據分析於同一 Dashboard。',
    problem:
      '幫助使用者掌握時間分配、任務進度，透過拖曳排程降低排程摩擦。',
    features: ['FullCalendar', '任務管理', '拖曳排程', 'Dashboard 分析'],
    techStack: {
      frontend: ['Vue3', 'Pinia', 'FullCalendar'],
      backend: ['Express', 'Prisma'],
      database: ['SQLite'],
      aiService: [],
    },
    devInsights: [
      '拖曳事件與時區處理是主要痛點，統一以 UTC 儲存、本地顯示轉換。',
      'Prisma schema 預留 recurring 欄位，方便後續擴充週期任務。',
    ],
  },
  stock: {
    id: 'stock',
    type: 'ai',
    background:
      '一般投資人難以每日追蹤市場資訊，希望透過熟悉的 LINE 介面，在通勤時就能取得結構化晨報與個股分析。',
    problem:
      '降低資訊焦慮、節省篩選新聞時間，並以 AI 解讀漲跌原因與 ETF 資金流向，提供可執行的關注清單。',
    features: [
      '每日 AI 晨報',
      'ETF 資金流分析',
      '主動型 ETF 持股追蹤',
      '個股分析',
      '漲跌原因解析',
      '個人化關注標的',
    ],
    techStack: {
      frontend: ['Vue3 Admin Dashboard'],
      backend: ['Node.js', 'Express', 'Scheduler'],
      database: ['Prisma', 'PostgreSQL/SQLite'],
      aiService: ['OpenAI GPT', 'Stock Intelligence Engine'],
    },
    devInsights: [
      '晨報需 07:00 準時推播，排程與重試機制分離，避免單次 API 失敗影響全天用戶。',
      '13:30 驗證分析結果的 pipeline 將預測與實際行情比對，持續優化 Prompt。',
      'LINE 訊息長度限制需分段推送，並以 Flex Message 提升可讀性。',
    ],
  },
  parenting: {
    id: 'parenting',
    type: 'ai',
    background:
      '新手爸媽在忙碌育兒中難以持續記錄，希望用自然對話取代繁瑣表單，降低紀錄門檻。',
    problem:
      '透過「喝奶120」「睡著了」等口語輸入自動建檔，並提供提醒與 Dashboard 掌握寶寶作息。',
    features: ['奶量紀錄', '睡眠追蹤', '尿布紀錄', '體溫紀錄', '喝奶提醒'],
    techStack: {
      frontend: ['Vue3 Dashboard'],
      backend: ['Node.js', 'Express', 'LINE Bot'],
      database: ['Prisma'],
      aiService: ['OpenAI Parser', 'Reminder Engine'],
    },
    devInsights: [
      'NLU Parser 需處理模糊輸入（如「大概喝了一百」），設計 fallback 追問流程。',
      '提醒引擎與紀錄時區綁定用戶設定，避免跨日餵奶統計錯誤。',
    ],
  },
  cs: {
    id: 'cs',
    type: 'ai',
    background:
      '中小商家同時經營 LINE、IG、FB 等平台，客服訊息分散且難以轉換為銷售機會。',
    problem:
      '統一多通道訊息、AI 自動回覆與 CRM 追蹤，讓業務人員專注高價值對話並提升轉換。',
    features: [
      'AI 自動回覆',
      '商品介紹',
      '客戶追蹤',
      '潛在客戶管理',
      'AI 銷售建議',
    ],
    techStack: {
      frontend: ['Vue3 CRM Dashboard'],
      backend: ['Webhook Gateway', 'Express'],
      database: ['CRM DB', 'Prisma'],
      aiService: ['OpenAI', 'Multi Channel Messaging'],
    },
    devInsights: [
      'Webhook Gateway 需驗證各平台簽章，並以 queue 削峰避免瞬間流量壓垮 AI API。',
      'CRM 狀態機設計區分「詢問中／報價中／成交」，讓 AI 建議依階段調整語氣。',
    ],
  },
}

export function getProjectDetail(id: string): ProjectDetail | undefined {
  return projectDetails[id]
}
