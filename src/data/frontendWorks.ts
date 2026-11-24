export const frontendWorks = [
  {
    slug: 'demi-studio',
    title: 'Demi Studio',
    area: '攝影品牌網站與內容管理',
    summary: '呈現婚紗婚禮與商業攝影作品，並提供工作室整理圖片、方案與常見問題的後台。',
    contribution: [
      '整理品牌首頁、攝影作品案例與預約入口。',
      '整合婚紗婚禮與商業攝影的常見問題。',
      '開發圖片、文字、FAQ 與方案的內容編輯、預覽和發布介面。',
    ],
    walkthrough: '開啟品牌網站，瀏覽婚紗婚禮、商業攝影案例與常見問題。',
  },
  {
    slug: 'iboxpost',
    title: 'IBoxPost',
    area: '物流與會員服務',
    summary: '把會員、寄件與查詢串成一條完整流程。',
    contribution: [
      '開發會員介面與 OAuth 登入流程，串接第三方身份驗證。',
      '實作寄件表單、欄位驗證、縣市與行政區連動，以及物流狀態查詢。',
      '參與會員點數與營運後台介面開發，與客戶及第三方確認介接流程。',
    ],
    walkthrough: '完成寄件表單，查詢剛建立的模擬寄件單，再切換到營運總覽。',
  },
  {
    slug: 'dayform',
    title: 'DAYFORM 日常選物',
    area: '電商網站與結帳流程',
    summary: '從商品照片、選物分類與折扣活動，一路走到購物車、展示付款及訂單查詢。',
    contribution: [
      '設計響應式首頁與商品目錄，加入精選橫列、關鍵字搜尋、分類與價格排序。',
      '開發商品詳情、完整照片與局部特寫切換、放大檢視及購買數量選擇。',
      '實作購物車、優惠碼即時金額與運費摘要，串接展示結帳及訂單查詢。',
    ],
    walkthrough: '用手機或桌機瀏覽商品，選擇兩件燕麥條紋靠枕，在優惠活動套用 WELCOME10，完成展示付款後查看訂單。',
  },
  {
    slug: 'maia-inference',
    title: 'MAIA Inference',
    area: '影像分析流程',
    summary: '讓使用者從模型選擇、影像預覽一路走到結果頁。',
    contribution: [
      '實作模型清單、模型選擇及影像檔案選取介面。',
      '處理影像暫存、預覽、分析中狀態與結果畫面。',
      '維護模型與結果元件之間的狀態，讓使用者可開始下一輪分析。',
    ],
    walkthrough: '下載合成 X 光範例，進入完整 Demo 後用 Browse File 選取圖片，查看本機預覽。',
  },
  {
    slug: 'gene-rule',
    title: 'Gene Rule',
    area: '規則與資料查詢',
    summary: '把紀錄搜尋、規則與比對結果整理成可操作的介面。',
    contribution: [
      '開發病歷資料查詢介面，以及搜尋條件、清除和空結果狀態。',
      '實作規則清單、版本與明細展示。',
      '整理資料查詢與規則比對間的切換流程，呈現後端回傳的結果。',
    ],
    walkthrough: '從比對結果查看示範紀錄，再開啟病患資料庫和比對規則，對照資料與規則的呈現方式。',
  },
  {
    slug: 'patient-journey',
    title: 'Patient Journey',
    area: '病患歷程與影像瀏覽',
    summary: '把分散的追蹤資訊整理成時間軸與影像檢視。',
    contribution: [
      '開發病患摘要、治療時間軸和檢驗趨勢介面。',
      '整合檢驗、病理、醫療與影像紀錄的瀏覽入口。',
      '實作四格影像檢視，每個視窗可獨立切換影像。',
    ],
    walkthrough: '從病患首頁查看治療時間軸與檢驗，接著進入 Imaging Records 比較四格合成 X 光。',
  },
  {
    slug: 'hms',
    title: 'HMS 血液透析管理平台',
    area: '排班與醫療工作流程',
    summary: '透過病區、班次與床位，把排班整理成可快速瀏覽的表格。',
    contribution: [
      '開發床位排班表、病區與班次篩選，並連動表格合計。',
      '實作患者管理及醫療紀錄前端頁面。',
      '整理中英文介面、側欄圖示和表單操作狀態。',
    ],
    walkthrough: '開啟排班管理並取消勾選 A 區，確認床位列與合計同步更新，再切換英文介面。',
  },
] as const
export type WorkSlug = (typeof frontendWorks)[number]['slug']
const externalDemos = {
  'demi-studio': 'https://demi-studio.vercel.app/',
  dayform: 'https://dayform-production.up.railway.app/',
} as const

type InlineWorkSlug = Exclude<WorkSlug, keyof typeof externalDemos>
export const hasInlineDemo = (slug: WorkSlug): slug is InlineWorkSlug => !Object.hasOwn(externalDemos, slug)

const originalEntry: Record<InlineWorkSlug, string> = {
  iboxpost: '#/home',
  'maia-inference': '?demo=1#/home',
  'gene-rule': '?demo=1#/search',
  'patient-journey': '?demo=1#/home/index?CHTNO=DEMO-001',
  hms: '#/home',
}
export const workPaths = (slug: WorkSlug) => ({
  case: '/works/' + slug,
  demo: '/works/' + slug + '/demo',
  fullDemo: hasInlineDemo(slug) ? '/project-demos/' + slug + '/index.html' + originalEntry[slug] : externalDemos[slug],
})
