export interface PracticeQuestion {
  prompt: string
  answer: string
  example?: string
}

interface PracticeTopic {
  id: string
  title: string
  kind: 'technical' | 'conversation' | 'exercise'
  questions: PracticeQuestion[]
}

const questions = (pairs: [string, string][]): PracticeQuestion[] =>
  pairs.map(([prompt, answer]) => ({ prompt, answer }))

export const practiceTopics: PracticeTopic[] = [
  {
    id: 'vue', title: 'Vue 3 核心', kind: 'technical',
    questions: questions([
      ['ref 和 reactive 怎麼選？', 'ref 可包純值或物件，在 JavaScript 裡用 .value 讀寫。reactive 回傳物件的 Proxy，適合集中管理同一組欄位。要解構 reactive 後保留更新，可用 toRefs。團隊若習慣用 ref 統一宣告，也不必混用。'],
      ['computed、watch、watchEffect 的差異？', 'computed 用來導出值，依反應式依賴快取。watch 指定來源，適合查詢參數變更後載入資料。watchEffect 會追蹤同步執行時讀取的依賴。非同步請求要處理過期回應，可在清理時取消上一筆請求。'],
      ['Vue 如何讓畫面跟資料同步？', '渲染讀取資料時會收集依賴。修改反應式資料時會通知相關 effect，Vue 再批次更新。需要依更新後的 DOM 做事，例如聚焦新欄位時，先等 nextTick。'],
      ['為什麼列表要有穩定的 key？', 'key 讓 Vue 在增刪與排序後辨認同一個項目，避免錯把上一筆的輸入框狀態留給下一筆。有業務 ID 就用 ID。序號只適合內容固定、沒有重排和局部狀態的清單。'],
      ['props 往下、事件往上在實務上怎麼用？', '父層持有資料，透過 props 交給子層。子層用 emit 回報意圖，例如更新篩選條件，父層再寫入狀態。雙向輸入可以用 v-model，底層仍依一個 prop 與更新事件協作。'],
      ['什麼時候抽成 composable？', '相同的狀態與副作用出現在多個畫面時，可以抽出可組合函式。例如把分頁、搜尋與取消請求放入同一個 composable，用參數傳入各頁的資料來源。只重複畫面結構時，通常先抽元件。'],
      ['Pinia 與元件內狀態怎麼分？', '表單焦點、目前展開項目留在元件。使用者工作階段或跨頁共用的購物車可放 Pinia。伺服器資料還要考慮快取與過期。解構 store 的狀態或 getter 時可用 storeToRefs，action 可直接取用。'],
      ['v-if 和 v-show 何時使用？', 'v-if 切換時會建立或卸載內容，適合少切換或初始不需要的區塊。v-show 一直保留 DOM，藉由 display 控制，適合頻繁切換。選擇也和元件狀態是否要保留有關。'],
      ['你會怎麼處理 Vue 元件的生命週期？', '掛載後才做依賴 DOM 的事，像初始化圖表或量測尺寸。離開時取消計時器、事件監聽和連線。若非同步載入可能在卸載後完成，要取消或忽略過期結果。'],
      ['如何查 Vue 畫面不必要的更新？', '先用 Vue DevTools 或效能錄製找出真正頻繁更新的元件。保持 props 穩定，避免父層每次新建整份設定，將昂貴運算移入 computed，資料量大時再做虛擬捲動。修改前後都量一次。'],
    ]),
  },
  {
    id: 'nuxt', title: 'Nuxt、渲染與 SEO', kind: 'technical',
    questions: questions([
      ['CSR、SSR 與 SSG 如何取捨？', 'CSR 在瀏覽器產生大部分畫面，適合登入後互動多的工具。SSR 每次請求產生 HTML，可提供完整首屏，但要照顧伺服器成本與快取。SSG 在建置時產生 HTML，適合更新頻率較低的公開內容。'],
      ['Hydration 是什麼？', '瀏覽器接收伺服器產生的 HTML 後，前端框架把事件及狀態接上既有畫面。兩端第一次渲染要一致。像時間、亂數或螢幕寬度，要用同一份初始值，或等客戶端掛載後再讀。'],
      ['Nuxt 頁面資料如何避免重複請求？', '用 useFetch 或 useAsyncData 取得首屏資料，讓伺服器結果可透過 Nuxt payload 提供給 hydration。頁面要有一致的 key 與錯誤狀態。只有按下按鈕才開始的請求，可直接在事件裡呼叫取資料函式。'],
      ['何時用 ClientOnly？', '第三方套件依賴 window 或 canvas，而且內容只有瀏覽器可畫時，把該區包在 ClientOnly 並提供尺寸相近的 fallback。產品標題和主要說明等可預先渲染內容，仍放在外面。'],
      ['公開產品頁要做哪些 SEO？', '每頁設定有辨識度的標題、描述和 canonical。向伺服器請求頁面時核對 HTTP 狀態、可見 HTML 與索引標記，再檢查 sitemap、內部連結和有助於辨識內容的結構化資料。'],
      ['同一內容可用多個網址打開怎麼辦？', '先決定主網址。過期路徑可用永久重新導向；必須保留的變體用 canonical 指向主版本。不要對所有分頁盲目指向首頁，並核對 sitemap 和內部連結使用同一套網址。'],
      ['Nuxt 的 runtimeConfig 哪些會暴露？', 'public 下的設定會提供給瀏覽器。後端 API 金鑰放在伺服器專用設定，只在 server handler 使用。應檢查打包後的資產和輸出回應有沒有誤帶憑證。'],
      ['頁面快取如何兼顧新鮮度與權限？', '公開共用的頁面可快取，並設更新與清除策略。登入後資料要按身份區隔，通常用 private 或 no-store，再檢查代理層設定。關鍵是不能讓某位使用者的 HTML 被共用給別人。'],
      ['如何找出 SSR 頁面首屏變慢的原因？', '分開看回應首位元組時間和瀏覽器渲染。先查伺服器 API 呼叫是否串行，能平行的就平行。瀏覽器端再查首圖、字型與阻塞腳本。用冷快取、真實路徑和相同裝置條件比對。'],
    ]),
  },
  {
    id: 'js-ts', title: 'JavaScript 與 TypeScript', kind: 'technical',
    questions: questions([
      ['請用例子解釋 closure。', '函式可以保留宣告時可見的外部變數。像建立計數器時，每次呼叫外層函式會建立自己的 count。回傳的內層函式可以繼續讀寫那一份變數。'],
      ['Event Loop 裡 Promise 和 setTimeout 誰先跑？', '當前同步程式會先跑完。已排入的 Promise 回呼會在微任務階段處理，通常早於同一輪安排的定時器回呼。用這個順序解釋日誌時，也要說清楚哪一個回呼已經入隊。'],
      ['Promise.all 和 allSettled 怎麼選？', '任何一個失敗就無法完成整體工作，用 Promise.all。可以顯示部分成功結果時，用 allSettled 再分別呈現狀態。all 的早期拒絕不會自動取消其他請求，需要另外處理取消。'],
      ['debounce 和 throttle 用在哪裡？', 'debounce 等操作停一段時間後才做事，例如輸入搜尋。throttle 限制執行頻率，適合捲動期間定期更新。最後一次是否補跑，以及卸載時如何取消，要依功能決定。'],
      ['TypeScript 的 unknown 與 any 差在哪？', 'unknown 可以接未知資料，但先做型別縮窄才能取用內部欄位。any 會跳過多數檢查。API JSON 即使被標註成某個介面，也要在資料邊界做執行期驗證。'],
      ['什麼是 discriminated union？', '不同狀態使用共同欄位區分，例如 status 是 loading、success 或 error。當程式確認某個 status 後，型別系統就知道哪些資料存在，避免出現成功畫面卻讀到不存在的資料。'],
      ['泛型有什麼實際用途？', '泛型保留輸入與輸出之間的型別關係。像讀取物件欄位時，讓 key 受物件鍵名限制，回傳型別會跟著欄位變化。只有一種固定資料形狀時，用明確型別通常更易懂。'],
      ['兩個請求先後順序顛倒怎麼辦？', '例如使用者快速切換條件，前一筆可能較晚回來。用 AbortController 取消不再需要的請求，或用遞增序號只接受目前的請求。錯誤與載入狀態也要只讓目前請求更新。'],
    ]),
  },
  {
    id: 'css', title: 'CSS、RWD 與 Tailwind', kind: 'technical',
    questions: questions([
      ['Flexbox、Grid 分別適合什麼？', 'Flexbox 適合沿一個方向配置，例如工具列的左右分組。Grid 可同時控制列和欄，適合作品卡排版。卡片組用 Grid，卡片內的按鈕群組用 Flexbox，兩個可以一起用。'],
      ['Flex 項目為什麼會把版面撐破？', 'Flex 子項預設有與內容大小相關的最小寬。長網址、圖表或不換行文字可能把容器撐大。需要縮小的項目可設 min-width 為零，再決定要換行、截斷，還是讓區塊捲動。'],
      ['如何排查 CSS 樣式被覆蓋？', '先看瀏覽器算出的樣式和來源。檢查層級、選擇器權重，以及同層同權重時的出現順序。若多個元件規則互相影響，縮小規則的作用範圍，避免一開始就加 important。'],
      ['設計 RWD 時會怎麼訂斷點？', '先從最小螢幕安排資訊和主要行動，版面因內容擁擠而需要改變時再設斷點。測窄螢幕、橫向、放大文字、長標題和鍵盤操作。相同元件在不同容器也可考慮 container query。'],
      ['手機為什麼會突然出現橫向捲軸？', '先找 scrollWidth 比可視寬度大的元素。常見原因是固定寬度、大型圖片、表格或長內容。讓圖片和容器可以縮小，表格可用自己的捲動容器，再確認最窄尺寸能正常操作。'],
      ['Tailwind 與元件 CSS 如何共存？', '簡短的排列、間距和狀態可用 utility。重複或多狀態的介面，可放入元件或集中變數，維持同一套色彩和間距。動態狀態最好對應到完整、可被建置掃描到的類名。'],
      ['除了滑鼠，怎麼確認互動能用？', '用 Tab 依順序走完整條路，檢查焦點是否清楚、Enter 或空白鍵能否操作。按鈕用原生 button，跳頁用連結，展開內容可用 details。錯誤訊息和圖示應有可理解的文字。'],
    ]),
  },
  {
    id: 'quality', title: '效能、資安與測試', kind: 'technical',
    questions: questions([
      ['怎麼看 LCP、INP 和 CLS？', 'LCP 看主要內容多久顯示。INP 反映頁面互動有多快出現下一次畫面更新。CLS 看非預期位移。用真實使用者資料定位影響，搭配效能錄製查到圖片、主執行緒或版面問題。'],
      ['首屏圖片怎麼優化？', '讓瀏覽器提供正確尺寸的圖，格式和壓縮依畫質需求取捨。首圖要及早發現，避免 lazy loading，並指定長寬以保留空間。折線下才使用懶載入，核對手機和桌面都不超抓。'],
      ['有數千列資料要怎麼顯示？', '先和產品確認使用者要的是查詢、匯出還是同時瀏覽，通常會搭配伺服器分頁。真正需要連續瀏覽時，再用虛擬清單只渲染可視列，並保留鍵盤和輔助科技可操作性。'],
      ['如何避免 XSS？', '一般文字用框架的跳脫機制輸出。若產品要顯示使用者提供的富文字，用經維護的清理工具和嚴格的白名單，避免直接套進 HTML。CSP 是額外防線，仍要查輸入與輸出路徑。'],
      ['什麼是 CSRF，如何防範？', '當瀏覽器會自動帶上登入 Cookie，惡意頁面可能誘使瀏覽器送出異動請求。伺服器應使用 CSRF token 或來源檢查並設定合適的 SameSite Cookie。GET 應維持讀取用途。'],
      ['CORS 能取代後端權限嗎？', 'CORS 只控制瀏覽器讓哪些來源讀跨站回應，不能阻止其他程式直接呼叫 API。身分驗證、資料權限和組織隔離仍要在伺服器逐筆判斷。'],
      ['單元、元件、端對端測試如何搭配？', '純規則用單元測試，表單和狀態切換用元件測試，登入到完成一項關鍵任務用少量端對端測試。每層挑容易出問題的條件，不用每一層重覆同一組案例。'],
      ['Storybook 在團隊中能解決什麼？', '把元件的載入、空資料、已填寫、錯誤和不同尺寸整理成可獨立查看的範例。設計、工程與測試可以確認同一套狀態。驗證跨頁流程時，仍要看實際應用。'],
      ['使用者偶爾遇到白畫面，怎麼追？', '先分辨是部署後舊頁載入不到切割檔，還是程式執行失敗。收集版本、路徑、瀏覽器和可重現的操作，從錯誤紀錄與網路請求對照。提供清楚的重試入口，修正後再測版本切換。'],
    ]),
  },
  {
    id: 'conversation', title: '面談與專案表達', kind: 'conversation',
    questions: questions([
      ['請用一分鐘介紹自己。', '可從現在的職能開始，說明常用技術及擅長的系統情境。選一個能代表能力的例子，指出你的責任、處理過的問題和實際成果，最後說明和本職缺的關聯。'],
      ['怎麼介紹最有代表性的前端專案？', '先說產品要服務誰、主要流程和原本的問題，再具體說你負責哪些部分與如何取捨。可以用載入時間、錯誤率或操作步驟量化成果，沒有記錄的數據就說明可驗證的變化。'],
      ['曾經處理最棘手的技術問題是什麼？', '選一個能清楚交代排查的例子。說明先看到的症狀、如何重現、如何排除其他原因，最後如何修復與防止再發。讓面試官聽得出是你做的部分。'],
      ['遇到需求不明確時會怎麼推進？', '先把使用者、目標、必要情境和驗收條件寫清楚。與產品確認衝突的需求，先畫一條主要流程或做小型原型，盡早核對理解再往下做。'],
      ['如何和後端、設計或營運協作？', '用可以共同驗證的內容對齊，例如 API 範例、狀態表和錯誤情境。模擬資料先讓介面進展，接口更新一併維護。需求或交期變動時明確說出影響和可調整範圍。'],
      ['你如何安排速度、品質與技術債的優先順序？', '先守住正確性、權限和關鍵流程，再看哪些技術債會妨礙改版。短期先解最重要的問題，列出未處理影響與回顧時間，無須為了統一風格做整站重構。'],
      ['面試官問期望薪資，怎麼回答？', '先了解職務責任、獎金、福利與工作型態，再依市場與自己的能力提出合理範圍。若資訊還不完整，可以說明希望先了解整體方案，並保留後續討論空間。'],
      ['有什麼問題想問團隊？', '可以問前三個月最優先要解決什麼、現有系統最大的痛點、前後端怎麼分工，以及上線前如何驗收。根據對方的回答追問一個實際案例。'],
    ]),
  },
  {
    id: 'exercises', title: 'JavaScript 實作', kind: 'exercise',
    questions: [
      { prompt: '寫一個 debounce，讓最後一次輸入才觸發查詢。', answer: '保存上一個計時器，每次傳入新參數就清掉它並重新倒數。觸發時保留原本呼叫的 this 與參數。離開畫面時可以呼叫 cancel。', example: [
        'function debounce(fn, delay) {', '  let timer', '  function delayed(...args) {', '    clearTimeout(timer)', '    timer = setTimeout(() => fn.apply(this, args), delay)', '  }', '  delayed.cancel = () => clearTimeout(timer)', '  return delayed', '}',
      ].join('\n') },
      { prompt: '用欄位把陣列分組，並保留每組原有順序。', answer: '遍歷一次陣列，用 Map 保存對應群組。以有效鍵名取得目前群組，有資料就放進原組，沒有就先建立。傳入取鍵函式，能支援不同型別及多筆資料。', example: [
        'function groupBy(items, keyOf) {', '  const groups = new Map()', '  for (const item of items) {', '    const key = keyOf(item)', '    let group = groups.get(key)', '    if (!group) groups.set(key, group = [])', '    group.push(item)', '  }', '  return groups', '}',
      ].join('\n') },
      { prompt: '依 ID 去除重複項目，只保留第一次出現。', answer: 'Set 用來記錄看過的 ID。累積輸出時保留第一次出現的項目，維持輸入順序。若 ID 可缺省，先定義缺省項目該如何辨識。', example: [
        'function uniqueById(items) {', '  const seen = new Set()', '  return items.filter(({ id }) => {', '    if (seen.has(id)) return false', '    seen.add(id)', '    return true', '  })', '}',
      ].join('\n') },
      { prompt: '限制同時執行的非同步工作數，回傳結果順序與輸入一致。', answer: '建立固定數量的執行者，每個執行者依序取下一個索引，將結果寫回對應位置。以下採 Promise.all 的失敗語意。若要收集全部異常，可以另外定義結果格式。', example: [
        'async function mapLimit(items, limit, task) {', '  if (!Number.isInteger(limit) || limit < 1) {', "    throw new RangeError('limit must be a positive integer')", '  }', '  const result = new Array(items.length)', '  let next = 0', '  async function worker() {', '    while (next < items.length) {', '      const i = next++', '      result[i] = await task(items[i], i)', '    }', '  }', '  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))', '  return result', '}',
      ].join('\n') },
      { prompt: '寫出只讓最新搜尋更新畫面的查詢函式。', answer: '用遞增序號標記請求。成功或失敗都先核對序號，只有最新請求可以更新畫面。若可控制 fetch 的來源，也能加上 AbortController 減少無用請求。', example: [
        'function createSearch(fetchResults, render, showError) {', '  let latest = 0', '  return async function search(query) {', '    const request = ++latest', '    try {', '      const results = await fetchResults(query)', '      if (request === latest) render(results)', '    } catch (error) {', '      if (request === latest) showError(error)', '    }', '  }', '}',
      ].join('\n') },
    ],
  },
]

export const practiceCounts = {
  technical: practiceTopics.filter(topic => topic.kind === 'technical').reduce((sum, topic) => sum + topic.questions.length, 0),
  conversation: practiceTopics.find(topic => topic.kind === 'conversation')!.questions.length,
  exercise: practiceTopics.find(topic => topic.kind === 'exercise')!.questions.length,
}
