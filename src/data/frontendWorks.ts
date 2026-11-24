export const frontendWorks = [
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
    slug: 'maia-inference',
    title: 'MAIA Inference',
    area: '影像分析流程',
    summary: '讓使用者從模型選擇、影像預覽一路走到結果頁。',
    contribution: [
      '實作模型清單、模型選擇及影像檔案選取介面。',
      '處理影像暫存、預覽、分析中狀態與結果畫面。',
      '維護模型與結果元件之間的狀態，讓使用者可開始下一輪分析。',
    ],
    walkthrough: '載入合成範例圖片，選擇展示模型，再查看模擬結果。',
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
    walkthrough: '用示範編號搜尋資料，選一筆紀錄和一條規則，查看模擬比對。',
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
    walkthrough: '切換時間軸中的就診日期，查看檢驗；再比較四個影像視窗。',
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
    walkthrough: '取消勾選病區或班次，確認床位與合計變化，再切換英文介面。',
  },
] as const
export type WorkSlug = (typeof frontendWorks)[number]['slug']
export const workPaths = (slug: WorkSlug) => ({ case: '/works/' + slug, demo: '/works/' + slug + '/demo' })
