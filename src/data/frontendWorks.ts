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
    summary: '從商品照片、分類和折扣活動走到購物車、綠界付款頁及訂單查詢。公開站使用綠界測試環境。',
    contribution: [
      '設計響應式首頁與商品目錄，加入精選橫列、關鍵字搜尋、分類與價格排序。',
      '開發商品詳情、完整照片與局部特寫切換、放大檢視及購買數量選擇。',
      '由後端計算優惠與運費，串接綠界付款頁、簽章通知及付款狀態查詢。',
    ],
    walkthrough: '挑選商品，套用 WELCOME10，從購物車前往綠界付款頁。公開站可用官方測試卡體驗，並在訂單頁查看結果。',
  },
  {
    slug: 'little-days',
    title: '小小日子・拼貼工作室',
    area: '照片編輯與成長紀念',
    summary: '把寶寶第一年的照片放進 12 個月份數字，製作可下載的成長紀念卡。',
    contribution: [
      '以 Canvas 實作數字遮罩、照片圖層、拖曳和縮放。',
      '支援自訂文字、卡片配色、手機觸控和白天／黑夜介面。',
      '以 IndexedDB 保存各月的文字與配色，照片僅在本次編輯保留，並提供 PNG 匯出。',
    ],
    walkthrough: '選擇月份並上傳照片，拖曳虛線框調整構圖，加入文字後下載 PNG。',
  },
  {
    slug: 'postroom',
    title: '發文間 Postroom',
    area: 'Threads 內容與背景排程',
    summary: '整理 Threads 草稿與內容日曆，授權帳戶後可背景發布文字貼文並同步成效。',
    contribution: [
      '設計草稿看板、排程日曆、成效面板與備份。',
      '串接 OpenAI 撰稿與 Meta Threads 官方發布、成效 API。',
      '實作持久化背景排程、帳戶隔離、取消與避免重複發布的狀態。',
    ],
    walkthrough: '可直接試用草稿看板與日曆。AI 撰稿需要 OpenAI API 金鑰，實際發文與成效同步需要已授權的 Threads 帳戶。',
  },
  {
    slug: 'night-parcel',
    title: '夜航郵差 Night Parcel',
    area: '瀏覽器街機與跨裝置互動',
    summary: '駕駛紙翼信使穿越夜港訊號門，收集星郵並挑戰最高分。',
    contribution: [
      '以 Canvas 實作飛行物理、障礙生成、碰撞和計分。',
      '支援滑鼠、觸控及鍵盤，並在分頁切到背景時暫停。',
      '設計夜港場景、星郵收集、漸進難度及本機最高分。',
    ],
    walkthrough: '點按畫面或按空白鍵控制高度，穿越訊號門或收集星郵得分。',
  },
  {
    slug: 'last-train',
    title: '末班車 The Last Train',
    area: '橫向敘事與逐格動畫',
    summary: '深夜列車的六節車廂越走越空。主角固定在畫面中央，隨著滾動走過車門、暗窗與黑色連接罩。',
    contribution: [
      '將垂直滾動換算成橫向鏡頭位移，同步角色步伐與車廂進度。',
      '維持車廂原圖比例，讓背景與車窗特效使用同一套座標，並以風琴式連接罩遮住接縫。',
      '按位置觸發窗外身影、列車員與音效，加入章節跳轉和減少動態效果模式。',
    ],
    walkthrough: '在桌面向下滾動，或在手機向上滑，從第 06 節走到第 01 節。右上角可選擇開啟音效。',
  },
  {
    slug: 'last-ride',
    title: '末班樂園 Last Ride',
    area: '滾動式恐怖短篇',
    summary: '一座原本熱鬧的樂園逐盞熄燈。五幕故事從最後一輪遊客散場，走向售票員現身。',
    contribution: [
      '以 GSAP ScrollTrigger 驅動固定舞台和五幕場景的過場。',
      '運用亮度、色調、雜訊和抓痕，讓同一處樂園從熱鬧轉向空寂。',
      '以 Web Audio 合成分幕聲景，提供章節選擇、鍵盤操作及音效開關。',
    ],
    walkthrough: '向下滾動走進樂園，或用章節列切換場景。最後一幕含突發驚嚇。',
  },
  {
    slug: 'investigator-archive',
    title: '調查員檔案室',
    area: 'COC 第七版角色建立與團務',
    summary: '從職業、屬性和技能點建立調查員，並在同一個工作台整理角色卡和團務。',
    contribution: [
      '將職業與技能資料連到角色卡欄位，集中顯示點數分配和驗證結果。',
      '實作本機存檔、雲端角色管理及送交主持人審核的流程。',
      '整理規則、場景和角色資訊，讓玩家從建立調查員一路進到團務。',
    ],
    walkthrough: '開啟建立調查員頁面，調整屬性和技能點，再查看即時角色卡預覽。',
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
  'night-parcel': 'https://night-parcel-flight.consideratebook2.chatgpt.site/',
  'little-days': 'https://little-days-monthbook.consideratebook2.chatgpt.site/studio.html',
  postroom: 'https://postroom-production-3e647d51.up.railway.app/',
  'last-train': 'https://last-train-after-midnight.consideratebook2.chatgpt.site/',
  'last-ride': 'https://last-ride-after-closing.consideratebook2.chatgpt.site/',
  'investigator-archive': 'https://investigator-archive-mww41j2r.consideratebook2.chatgpt.site/',
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
