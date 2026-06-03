export interface TechStack {
  frontend: string[]
  backend: string[]
  database: string[]
  aiService: string[]
}

export interface ProjectDetail {
  id: string
  type: 'enterprise' | 'ai'
  background: string
  problem: string
  features: string[]
  techStack: TechStack
  devInsights: string[]
}

export const projectDetails: Record<string, ProjectDetail> = {
  ipost: {
    id: 'ipost',
    type: 'enterprise',
    background: '郵局 i郵箱業務需要與 GS1 標準整合，提供企業與民眾可靠的寄件與追蹤體驗。',
    problem: '簡化 OAuth 登入與寄件流程，讓使用者能一站式完成寄件、追蹤與狀態查詢。',
    features: ['OAuth 登入', '郵件寄送', '包裹追蹤', '狀態查詢'],
    techStack: {
      frontend: ['Vue3', 'TypeScript', 'Pinia'],
      backend: ['REST API', 'GS1 OAuth'],
      database: ['企業後端 DB'],
      aiService: [],
    },
    devInsights: [
      'OAuth token 刷新與過期處理需與寄件流程解耦，避免中途登出造成資料遺失。',
      '物流狀態 API 採輪詢與快取策略，降低高峰時段請求壓力。',
    ],
  },
  'ai-medical': {
    id: 'ai-medical',
    type: 'enterprise',
    background: '醫療場域需整合病患資料與 AI 推論結果，協助醫護快速掌握決策依據。',
    problem: '將分散的病患資訊與 AI 分析統一呈現，縮短臨床判讀時間。',
    features: ['病患資料整合', 'AI 分析結果呈現', '醫療決策輔助'],
    techStack: {
      frontend: ['Vue3', 'TypeScript'],
      backend: ['REST API', 'WebSocket'],
      database: ['醫療資料庫'],
      aiService: ['AI 分析引擎'],
    },
    devInsights: [
      'WebSocket 推送需處理斷線重連與分析任務狀態同步。',
      '敏感資料顯示需配合權限與遮罩規則。',
    ],
  },
  maya: {
    id: 'maya',
    type: 'enterprise',
    background: '檢驗數據需轉化為可視化風險報告，輔助醫師評估潛在疾病。',
    problem: '透過 AI 推測與圖表呈現，讓複雜檢驗結果一目了然。',
    features: ['病歷分析', 'AI 推測', '視覺化報表'],
    techStack: {
      frontend: ['Vue3', 'TypeScript', 'Chart.js'],
      backend: ['REST API'],
      database: ['檢驗資料'],
      aiService: ['AI 推測模型'],
    },
    devInsights: [
      'Chart.js 大量數據時需抽樣與懶加載，維持 Dashboard 流暢度。',
    ],
  },
  geneluo: {
    id: 'geneluo',
    type: 'enterprise',
    background: '基因檢測結果需透過規則引擎對應疾病風險，支援醫療團隊解讀。',
    problem: '管理基因規則並輸出視覺化風險分析，提升解讀效率。',
    features: ['基因規則管理', '疾病風險分析', '視覺化結果'],
    techStack: {
      frontend: ['Vue3', 'TypeScript'],
      backend: ['REST API', '規則引擎'],
      database: ['基因資料'],
      aiService: [],
    },
    devInsights: [
      '規則版本控管與回溯是核心，避免規則更新影響歷史報告一致性。',
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
