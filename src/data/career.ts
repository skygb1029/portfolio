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
    period: '2015/02 – 2016/02',
    company: '百威旅遊',
    role: '網頁全端工程師',
    highlights: ['開發及維護旅遊網站的前後端功能，處理資料與整合系統功能。'],
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'jQuery'],
  },
  {
    id: 'fanma',
    period: '2016/03 – 2019/02',
    company: '凡馬科技',
    role: '專案經理',
    highlights: ['確認專案需求、規劃時程及追蹤進度，協調客戶、設計與技術人員。', '管理 4 人以下團隊，負責工作分配與執行進度。'],
  },
  {
    id: 'gaia',
    period: '2019/02 – 2020/02',
    company: '蓋亞科技',
    role: '前端工程師',
    highlights: ['開發網站介面與互動功能，負責後端資料串接與既有程式維護。'],
    tech: ['Vue', 'JavaScript', 'SCSS', 'Bootstrap'],
  },
  {
    id: 'jinfeng',
    period: '2022/08 – 2023/12',
    company: '機鋒實業',
    role: '前端工程師',
    highlights: ['開發及維護第三方入口網站並整合 API，參與 Telegram Bot 串接。', '使用 Docker 建置開發環境，參與 GCP 雲端環境維護。'],
    tech: ['Vue3', 'Node.js', 'Docker', 'Jenkins', 'TG Bot', 'GCP'],
  },
  {
    id: 'moonen',
    period: '2024/03 – 2025/11',
    company: '沐恩生醫光電',
    role: '前端工程師',
    highlights: ['擔任團隊資深前端工程師，負責前端規劃、API 串接、系統整合與新人培訓。', '擔任 i郵箱專案主要技術窗口，協調客戶、後端工程師與第三方廠商。', '開發 AI 醫療語音互動介面，並參與醫療影像推論、病患資訊及基因資料視覺化。'],
    tech: ['Vue3', 'TypeScript', 'Pinia', 'REST API', 'WebSocket'],
  },
  {
    id: 'yisheng',
    period: '2025/11 – 至今',
    company: '易勝資訊',
    role: '前端工程師',
    highlights: ['參與既有系統重構、前端功能開發及維護。', '與團隊確認功能與資料處理流程，改善程式架構及可維護性。'],
  },
]
