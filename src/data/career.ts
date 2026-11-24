export interface CareerEntry {
  id: string
  period: string
  company: string
  role: string
  milestone: string
  highlights: string[]
  tech: string[]
  projects?: { title: string; description: string }[]
}

export const careerTimeline: CareerEntry[] = [
  {
    id: 'bwt',
    period: '2015/02 – 2016/02',
    company: '百威旅遊',
    role: '網頁全端工程師',
    milestone: '從旅遊網站的前後端開發起步。',
    highlights: [
      '開發與維護旅遊網站的前後端功能。',
      '負責網頁介面實作、資料處理與系統功能整合。',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP', 'MySQL'],
  },
  {
    id: 'fanma',
    period: '2016/03 – 2019/02',
    company: '凡馬科技媒體',
    role: '專案經理兼前端工程師',
    milestone: '兼任專案管理與前端開發，改善政府相關文件的篩選與查找流程。',
    highlights: [
      '確認需求、規劃執行方向、安排時程並追蹤進度。',
      '管理 4 人以下團隊，協調工作分配與執行進度。',
      '與客戶、設計和技術人員確認需求，處理跨部門協作問題。',
      '同時參與多項前端開發，將文件查找需求整理成篩選條件、結果呈現與操作流程。',
    ],
    tech: [],
    projects: [
      { title: '法務部相關文檔篩選與檢索介面', description: '參與法務部相關資料的前端開發，整理文檔篩選條件與結果呈現，改善使用者從大量文件中查找所需資料的流程。' },
      { title: '警政署相關文檔查找與結果瀏覽介面', description: '參與警政署相關資料的前端開發，釐清常見查找需求，優化調整條件、定位文件與瀏覽查詢結果的操作流程。' },
    ],
  },
  {
    id: 'gaia',
    period: '2019/02 – 2020/02',
    company: '蓋亞科技',
    role: '前端工程師',
    milestone: '回到前端開發，負責互動介面與資料串接。',
    highlights: [
      '使用 Vue、JavaScript、AJAX 與 Sass 開發網站。',
      '實作網頁介面與互動功能，串接後端資料，並依需求維護既有程式。',
    ],
    tech: ['Vue', 'JavaScript', 'AJAX', 'Sass', 'Bootstrap', 'CSS'],
  },
  {
    id: 'jinfeng',
    period: '2022/08 – 2023/12',
    company: '機鋒實業',
    role: '前端工程師',
    milestone: '將入口網站開發延伸到 Bot、開發環境與雲端維護。',
    highlights: [
      '負責第三方入口網站的前端開發、維護與 API 整合。',
      '參與 Telegram Bot 功能開發與服務串接。',
      '以 Docker 協助建置開發環境與自動化流程，參與 GCP 環境管理與系統維護。',
      '使用 Git 進行版本管理，配合團隊開發與功能更新。',
    ],
    tech: ['Vue', 'Node.js', 'Git', 'Docker', 'Jenkins', 'GCP', 'Telegram Bot API'],
  },
  {
    id: 'moonen',
    period: '2024/03 – 2025/11',
    company: '沐恩生醫光電',
    role: '前端工程師',
    milestone: '擔任資深前端與技術窗口，負責物流和醫療 AI 專案。',
    highlights: [
      '獨立負責多項前端功能規劃、介面開發、API 串接、既有系統維護與技術問題處理。',
      '指導新人熟悉專案架構、開發流程與相關技術。',
      '擔任 i郵箱主要技術窗口，與客戶、後端工程師及第三方廠商確認流程及介接規格。',
      '開發 AI 即時語音互動介面，並參與醫療影像推論結果、病患資訊與基因資料視覺化。',
    ],
    tech: ['Vue 2 / Vue 3', 'JavaScript', 'TypeScript', 'Pinia', 'REST API', 'WebSocket', 'Sass', 'Git', 'Live2D'],
  },
  {
    id: 'yisheng',
    period: '2025/11 – 至今',
    company: '易勝資訊',
    role: '前端工程師',
    milestone: '參與富邦保代電話作業系統重構。',
    highlights: [
      '負責富邦保代電話作業系統的前端功能開發與既有功能調整。',
      '配合業務需求調整介面並維護功能。',
      '與團隊確認系統功能與資料處理流程，協助改善既有程式架構和可維護性。',
    ],
    tech: ['Vue', 'JavaScript', 'TypeScript', 'Git'],
  },
]
