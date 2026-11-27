export const difficultyLabels = {
  beginner: '初階',
  intermediate: '中階',
  advanced: '高階',
} as const

export type PracticeDifficulty = keyof typeof difficultyLabels

export interface PracticeQuestion {
  level: PracticeDifficulty
  prompt: string
  answer: string
  lesson: { explanation: string; practice: string }
  followUp?: { title: string; body: string }
  example?: string
}

interface PracticeTopic {
  id: string
  title: string
  kind: 'technical' | 'conversation' | 'exercise'
  questions: PracticeQuestion[]
}

export const practiceTopics: PracticeTopic[] = [
  {
    id: "vue", title: "Vue 核心觀念", kind: "technical",
    questions: [
      {
        level: 'beginner',
        prompt: "ref 和 reactive 有什麼差別？",
        answer: "ref 可包純值或物件，在 JavaScript 中用 .value 讀寫。reactive 把物件或陣列轉成 Proxy，可直接操作屬性。",
        lesson: {
          explanation: "可以把 ref 想成可追蹤的容器。改 count.value 是替換容器內容。reactive 則代理物件，改 form.name 時 Vue 會追蹤讀過 name 的畫面。直接把 form.name 解構成普通變數，只會取得當時的值。",
          practice: "用一個計數器和一個姓名欄位做實驗。分別更新 count.value、form.name 及解構出的 name，觀察哪些變更會重新渲染。",
        },
        followUp: { title: "實務補充", body: "如果解構 reactive 後仍要追蹤屬性，可用 toRefs。團隊也可以統一用 ref 宣告，減少混用規則。" },
      },
      {
        level: 'intermediate',
        prompt: "computed、watch、watchEffect 的差別？",
        answer: "computed 快取衍生值。watch 監聽指定來源後執行副作用。watchEffect 會立即執行，並追蹤同步執行期間讀取的反應式依賴。",
        lesson: {
          explanation: "購物車總價是既有資料推導出來的值，用 computed，總價的依賴沒變就可重用結果。切換幣別需要向 API 取價，是副作用，可用 watch 明確指定來源。watchEffect 會立刻執行，並自動記下同步執行時讀取的響應式資料。",
          practice: "建立 quantity、unitPrice 和 currency。用 computed 顯示小計，用 watch 記錄換匯幣別，再改 quantity，確認換匯的回呼沒有被觸發。",
        },
        followUp: { title: "實務補充", body: "查詢參數變更後可用 watch 載入資料，並在清理時取消上一筆請求。watchEffect 的非同步回呼只會自動追蹤第一次 await 前讀取的依賴。" },
      },
      {
        level: 'intermediate',
        prompt: "Vue 2 和 Vue 3 的差別？",
        answer: "Vue 3 以 Proxy 追蹤反應式物件，原生支援多根節點、Teleport，並改善 TypeScript 整合。Composition API 在 Vue 3 中是核心功能，Vue 2.7 也有回移植版本。",
        lesson: {
          explanation: "以表單新增欄位為例。Vue 2 主要在初始化時替既有欄位設置 getter 和 setter，動態新增欄位常需要 Vue.set。Vue 3 的 Proxy 可攔截新增、刪除和讀取等操作。遷移時也要檢查外掛相容性及 v-model 的約定。",
          practice: "寫出一份舊表單升級清單，包含動態欄位、v-model、UI 元件庫和兩條應測的操作流程。",
        },
      },
      {
        level: 'beginner',
        prompt: "v-if 和 v-show 的差別？",
        answer: "v-if 依條件建立或卸載內容。v-show 保留 DOM，用 CSS display 切換。需要常切換並保留元件狀態時，可考慮 v-show。",
        lesson: {
          explanation: "篩選面板如果一頁會頻繁開關，v-show 在首次建立後主要切換 CSS，面板的輸入和元件狀態可保留。v-if 會在條件變為 false 時卸載元件，再打開會重新掛載，適合低頻或建立成本高的區塊。",
          practice: "在子元件加上輸入框和 onMounted 紀錄。用兩種方式各開關三次，比較輸入值和掛載次數。",
        },
        followUp: { title: "實務補充", body: "被 v-if 卸載的元件重新顯示時會重新建立。用 v-show 隱藏的元件仍然掛載，計時器或事件監聽可能繼續執行。" },
      },
      {
        level: 'intermediate',
        prompt: "Pinia 和 Vuex 的差別？",
        answer: "Pinia 不要求透過 mutations 更新 state，可直接寫入或用 action 組織流程。Vuex 的慣例是用 mutation 修改 state。Pinia 的 store API 較精簡，也有 TypeScript 型別推導。",
        lesson: {
          explanation: "在 Vuex 常見做法是 action 負責非同步流程，mutation 負責提交狀態。Pinia 把 state、getters、actions 依領域組成 store，action 可以直接寫入 state。購物車跨元件共用適合放 store，一次性的彈窗開關通常留在元件。",
          practice: "設計 cart store 的狀態、總價 getter 和新增商品 action，再說明「目前哪個欄位有焦點」應該放在哪裡。",
        },
        followUp: { title: "實務補充", body: "表單焦點、目前展開項目留在元件。使用者工作階段或跨頁共用的購物車可放 Pinia。伺服器資料還要考慮快取與過期。解構 store 的狀態或 getter 時可用 storeToRefs，action 可直接取用。" },
      },
      {
        level: 'intermediate',
        prompt: "Vue 為什麼需要 nextTick？",
        answer: "Vue 會批次更新 DOM。修改反應式資料後，等 await nextTick()，就能操作這一輪更新完成的 DOM，例如聚焦新出現的欄位。",
        lesson: {
          explanation: "Vue 會把同一輪的多次狀態寫入合併到一次 DOM 更新。如果剛把 show 設為 true 就讀由 v-if 控制的輸入框，元素可能還沒建立。await nextTick() 後可以讀這批更新後的 DOM。",
          practice: "做一個按下「重新命名」才出現的輸入框。分別在變更 show 後立即和等 nextTick 後讀取元素，確認哪個時機能聚焦。",
        },
        followUp: { title: "實務補充", body: "例如先把顯示欄位的狀態設為 true，等 nextTick 再呼叫 input.focus()。若需量測實際完成繪製的畫面，也要留意瀏覽器繪製時機。" },
      },
      {
        level: 'intermediate',
        prompt: "v-for 為什麼要加 key？",
        answer: "穩定的 key 讓 Vue 在新增、刪除或重排後辨識同一個節點，保留對應的元件與輸入狀態。能用業務 ID 時優先用 ID。",
        lesson: {
          explanation: "key 讓清單項目在新增、刪除或排序後還能對應到原本的元件。商品 A 和 B 交換位置時，穩定的商品 ID 會讓各自的輸入狀態跟著商品移動。使用陣列索引時，留下來的是位置的身分。",
          practice: "做兩筆可編輯清單，在第二列輸入文字，再倒轉排序。先用索引當 key，接著改用 ID，比較文字留在哪一筆。",
        },
        followUp: { title: "實務補充", body: "若用序號當 key，清單重排後，輸入中的文字可能跟著位置而非項目。只有內容和順序固定時，序號才較適合。" },
      },
      {
        level: 'intermediate',
        prompt: "什麼是 Composition API？",
        answer: "Composition API 用 ref、computed、生命週期函式等 API，把同一項功能的狀態與行為寫在一起。重複的反應式邏輯可抽成 composable。",
        lesson: {
          explanation: "一個列表頁可能同時有查詢、載入、換頁和取消請求。可把這些資料和方法放在同一個 useProductSearch composable，讓元件只需要取得結果、狀態與搜尋函式。相同畫面可以抽元件，相同互動邏輯可以抽 composable。",
          practice: "把兩個頁面重複的搜尋邏輯畫成輸入和輸出。指定查詢函式、loading、error 和取消請求各由哪裡管理。",
        },
        followUp: { title: "元件的 props、事件與清理", body: "相同的狀態與副作用出現在多個畫面時，可以抽出可組合函式。例如把分頁、搜尋與取消請求放入同一個 composable，用參數傳入各頁的資料來源。只重複畫面結構時，通常先抽元件。 父層持有主要狀態，子層可用 emit 回報意圖。需要雙向輸入時可用 v-model。掛載後才能安全讀取 DOM，卸載時取消計時器、事件監聽及不再使用的請求。" },
      },
      {
        level: 'advanced',
        prompt: "什麼是 Static Hoisting？",
        answer: "Vue 編譯器會將可以重用的靜態內容提取到渲染函式之外，避免每次渲染都重新建立這些節點描述。",
        lesson: {
          explanation: "Vue 編譯器能從模板知道哪些內容與狀態無關。像固定的標題可以提升或快取相關產物，後續更新商品數量時，可把工作集中在會變動的部分。這項最佳化發生在 Vue 模板編譯與渲染流程。",
          practice: "拿一段含固定標題與動態商品數量的模板，到 Vue Template Explorer 看編譯輸出，標出固定子樹與帶有更新線索的節點。",
        },
        followUp: { title: "實務補充", body: "先用 Vue DevTools 或效能錄製找出真正頻繁更新的元件。保持 props 穩定，避免父層每次新建整份設定，將昂貴運算移入 computed，資料量大時再做虛擬捲動。修改前後都量一次。" },
      },
      {
        level: 'beginner',
        prompt: "什麼是 Fragment？",
        answer: "Vue 3 的元件可以有多個根節點，不必額外包一層 div。若有未宣告的 class 或其他 attributes，應明確指定要傳到哪個根節點。",
        lesson: {
          explanation: "同一個 Vue 3 元件可以同時回傳標題和內容等多個根節點。這有助於維持列表或表格原先要求的 HTML 結構。多根元件收到額外的 class 或事件時，需要明確決定要轉交到哪個根元素。",
          practice: "做一個有標題和段落兩個根節點的元件，從父層傳入 class，再用 v-bind=\"$attrs\" 指定要把屬性套在哪裡。",
        },
      },
    ],
  },
  {
    id: "nuxt", title: "Nuxt 3 與 SEO", kind: "technical",
    questions: [
      {
        level: 'beginner',
        prompt: "Vue 和 Nuxt 有什麼差別？",
        answer: "Vue 提供元件、反應式狀態和畫面渲染。Nuxt 在 Vue 之上提供應用框架，包含檔案式路由、SSR、自動匯入、伺服器 API 和 SEO 工具。",
        lesson: {
          explanation: "Vue 管元件、響應式狀態和畫面更新。Nuxt 在 Vue 上提供應用層的結構，從頁面路由、服務端渲染到 API 與資料載入。普通 Vue 專案也能做相似能力，需要自行組合工具與規則。",
          practice: "替內部表單和需要搜尋流量的商品站各選一種架構，列出路由、部署和首屏內容由誰處理。",
        },
        followUp: { title: "實務補充", body: "第三方套件依賴 window 或 canvas，而且內容只有瀏覽器可畫時，把該區包在 ClientOnly 並提供尺寸相近的 fallback。產品標題和主要說明等可預先渲染內容，仍放在外面。" },
      },
      {
        level: 'beginner',
        prompt: "SSR 和 CSR 有什麼差別？",
        answer: "SSR 先在伺服器產生 HTML，瀏覽器收到時已有初始內容。CSR 主要在瀏覽器執行 JavaScript 後產生畫面。SSR 可讓公開頁面的首屏內容更早可用，也便於索引。",
        lesson: {
          explanation: "直接開啟商品頁時，SSR 可先交付含商品名稱和價格的 HTML，再載入 JS 讓畫面可互動。CSR 常先回傳容器和腳本，等瀏覽器執行 JS 並取資料才看到商品。SSR 的伺服器回應是否夠快，也會影響首屏。",
          practice: "分別找一個客戶端渲染頁和服務端渲染頁，用「檢視網頁原始碼」找主要標題，再與 Elements 裡的最終 DOM 比較。",
        },
        followUp: { title: "實務補充", body: "分開看回應首位元組時間和瀏覽器渲染。先查伺服器 API 呼叫是否串行，能平行的就平行。瀏覽器端再查首圖、字型與阻塞腳本。用冷快取、真實路徑和相同裝置條件比對。" },
      },
      {
        level: 'intermediate',
        prompt: "SSR 和 SSG 有什麼差別？",
        answer: "以常見模式來說，SSR 在收到請求時渲染，SSG 在建置時預先產生靜態頁面。內容更新頻繁的頁面要考慮快取與重新產生的策略。",
        lesson: {
          explanation: "公司介紹很少改，可在建置時輸出 HTML，再從 CDN 提供。依請求更新的商品價格可由 SSR 產生，也可拆成公開頁面和獨立的即時價格請求。選擇時要考慮資料更新頻率、頁數和快取清除時機。",
          practice: "為首頁、數萬筆商品詳情和私人訂單頁各選 SSG、SSR 或混合策略，並說明資料變動後何時能看到新內容。",
        },
        followUp: { title: "實務補充", body: "公開共用的頁面可快取，並設更新與清除策略。登入後資料要按身份區隔，通常用 private 或 no-store，再檢查代理層設定。關鍵是不能讓某位使用者的 HTML 被共用給別人。" },
      },
      {
        level: 'advanced',
        prompt: "什麼是 Hydration？",
        answer: "瀏覽器拿到伺服器產生的 HTML 後，Vue 把客戶端的狀態與事件接上現有畫面。兩端的第一次渲染應相符。",
        lesson: {
          explanation: "Nuxt 已經把 HTML 送到瀏覽器，Vue 仍要在客戶端建立對應的元件狀態，接管既有 DOM 並掛上事件。兩端第一次渲染若對同一欄位算出不同結果，例如受時區影響，可能出現警告或需要修正部分 DOM。",
          practice: "測試含「今天」標籤的 SSR 頁面，讓瀏覽器與伺服器使用不同時區，再改成由伺服器傳入共同格式化的初始值，比較是否一致。",
        },
        followUp: { title: "實務補充", body: "時間、亂數或螢幕寬度可能讓兩端產出不同的初始內容。先共用同一份初始值，或等客戶端掛載後再讀裝置特有資料。" },
      },
      {
        level: 'beginner',
        prompt: "Nuxt 如何建立路由？",
        answer: "Nuxt 3 通常從 pages 目錄自動建立路由。例如 pages/products/[id].vue 對應類似 /products/123 的動態商品頁。",
        lesson: {
          explanation: "在標準 Nuxt 3 結構中，pages/products/index.vue 對應 /products，pages/products/[id].vue 對應同目錄下的單一商品頁。頁面可從 useRoute().params 讀取 id，合法格式與商品是否存在要分別處理。",
          practice: "規劃 /products、/products/8 與無效商品 ID 的路由和畫面，再測直接開網址與從清單點進去的結果。",
        },
      },
      {
        level: 'intermediate',
        prompt: "Nuxt Middleware 有什麼作用？",
        answer: "路由 Middleware 可在切換頁面前檢查登入狀態、導向或中止導航。受保護 API 仍須在伺服器驗證身分與權限。",
        lesson: {
          explanation: "路由 middleware 可以在進入會員頁前檢查登入狀態，再把訪客導去登入。特定頁面可透過 definePageMeta 掛上具名 middleware。處理私人資料時，伺服器端 API 也要驗證使用者及其對該筆資料的存取權。",
          practice: "設計未登入進訂單頁、已登入進自己的訂單、API 收到無權查看的訂單三個案例，標出每項檢查應放在哪一層。",
        },
        followUp: { title: "實務補充", body: "public 下的設定會提供給瀏覽器。後端 API 金鑰放在伺服器專用設定，只在 server handler 使用。應檢查打包後的資產和輸出回應有沒有誤帶憑證。" },
      },
      {
        level: 'intermediate',
        prompt: "useFetch 和 $fetch 有什麼差別？",
        answer: "useFetch 整合非同步狀態與 SSR payload，讓資料可供 hydration 使用，避免同一筆首屏資料重抓。$fetch 是直接發送請求的工具，適合按鈕操作等事件觸發。",
        lesson: {
          explanation: "商品詳情在頁面初始化時可用 useFetch，直接取得 data、status 與 error。SSR 取得的結果可進 Nuxt payload，讓瀏覽器在 hydration 時重用。按下收藏按鈕才發出的請求，可在事件處理函式呼叫 $fetch。",
          practice: "做商品頁加收藏按鈕，分別記錄「直接開頁」與「連點兩次收藏」的 Network 請求，說明哪一步需要共用資料或防止重複送出。",
        },
        followUp: { title: "實務補充", body: "可以用 useAsyncData 包需要自行控制的查詢函式。為頁面資料提供穩定的 key 與清楚的錯誤狀態。" },
      },
      {
        level: 'advanced',
        prompt: "Nuxt 怎麼設定 SEO？",
        answer: "用 useSeoMeta 或 useHead 設標題、描述、Open Graph 等資訊，再依內容加入 canonical、sitemap 或 JSON-LD。",
        lesson: {
          explanation: "商品頁可用 useSeoMeta 設定與商品一致的 title、description、Open Graph 資料，再由 useHead 管理 canonical 等標籤。後續要查實際交付的 HTML 和 HTTP 狀態，確認不存在的商品走對應的 404。",
          practice: "挑兩個可公開商品和一個無效網址，驗證 HTML 裡的標題、canonical 與回應狀態，然後核對 sitemap 是否只列出要被搜尋的網址。",
        },
        followUp: { title: "實務補充", body: "檢查伺服器回傳的 HTTP 狀態與 HTML，再核對 canonical、sitemap、內部連結和索引規則。" },
      },
      {
        level: 'intermediate',
        prompt: "什麼是 JSON-LD？",
        answer: "JSON-LD 用 JSON 描述網頁的實體和關係，例如商品、價格與評價。依搜尋引擎規範加入真實且可見的資料，可取得合適的複合式結果資格，是否顯示由搜尋引擎決定。",
        lesson: {
          explanation: "HTML 裡的結構化資料可用 JSON-LD 描述商品、價格、幣別和供貨狀態。欄位要與使用者看見的內容一致。搜尋引擎可用它理解頁面並判斷是否符合複合式搜尋結果的資格。",
          practice: "從一個公開商品頁記下名稱、價格、幣別和供貨狀態，對照頁面的 JSON-LD，標記缺少欄位和與畫面不一致的資料。",
        },
        followUp: { title: "實務補充", body: "同一商品若有多個網址，先定義主要網址。過期路徑可導向新頁，仍要提供的變體可設定 canonical，並讓 sitemap 以主網址為準。" },
      },
    ],
  },
  {
    id: "js-ts", title: "JavaScript 與 TypeScript", kind: "technical",
    questions: [
      {
        level: 'beginner',
        prompt: "var、let、const 有什麼差別？",
        answer: "函式內的 var 依函式作用域，let 和 const 依區塊。const 的變數不能重新賦值。如果它指向物件，物件本身的屬性仍可修改。",
        lesson: {
          explanation: "函式裡的 var 即使宣告在 if 區塊內，區塊外仍在同一個函式作用域。let 和 const 只在所在區塊可用。const 固定變數的綁定，因此 cart = [] 會出錯，cart.push(item) 仍可修改陣列。",
          practice: "把 var x 和 let y 分別宣告在同一個 if 區塊內，預測區塊外的讀取結果。再用 const 建立陣列，試著加元素和重新賦值。",
        },
      },
      {
        level: 'beginner',
        prompt: "什麼是 Closure？",
        answer: "函式保留對宣告當時外部作用域的存取，即使外層函式已執行結束，內層函式仍可讀取那些變數。",
        lesson: {
          explanation: "外層建立初始 count 並回傳增加 count 的函式。外層執行結束後，回傳的函式仍保有該次呼叫的變數環境。建立兩個計數器時，各自擁有一份 count，因此可以用閉包封裝每個實例的狀態。",
          practice: "實作 makeCounter，回傳可以加一的函式。建立 a 和 b，再依序呼叫 a、a、b，預期得到 1、2、1。",
        },
        followUp: { title: "實務補充", body: "用外層函式建立計數器時，每次呼叫會得到各自獨立的 count。內層函式可以繼續讀寫它。" },
      },
      {
        level: 'advanced',
        prompt: "什麼是 Event Loop？",
        answer: "事件迴圈協調任務與微任務。當前同步程式執行完後，瀏覽器會處理已排入的微任務，再取下一個任務，例如定時器回呼。",
        lesson: {
          explanation: "瀏覽器先執行目前任務中的同步程式。呼叫堆疊清空後會清空微任務佇列，再進到下一個任務。已完成的 Promise 註冊的 .then 屬於微任務，setTimeout 排入後續任務。",
          practice: "依序寫同步 A、setTimeout 印 B、Promise.then 印 C 並排入微任務印 E、另一個微任務印 F、同步 D。預測 A、D、C、F、E、B，再到瀏覽器驗證。",
        },
        followUp: { title: "實務補充", body: "已入隊的 Promise.then 回呼屬於微任務。用 console.log 預測順序時，先確定哪個回呼已經入隊，再比較它跟定時器。" },
      },
      {
        level: 'intermediate',
        prompt: "Promise.all 和 Promise.allSettled 有什麼差別？",
        answer: "Promise.all 有一項拒絕就提前拒絕。Promise.allSettled 會等所有輸入都完成，分別回傳成功或失敗狀態。",
        lesson: {
          explanation: "一個頁面的三筆資料缺一不可時，可用 Promise.all，任何一筆拒絕就處理整體錯誤。報表各區可以獨立顯示時，allSettled 讓你逐筆判斷成功與失敗。兩者的成功結果順序以輸入為準。",
          practice: "用三個完成時間不同的 Promise，其中一個拒絕。對同一組輸入比較兩種方法，並觀察較慢的工作是否繼續。",
        },
        followUp: { title: "過期請求與取消", body: "Promise.all 的提前拒絕不會自動取消其他請求。搜尋切換條件時可用 AbortController，或用遞增序號讓最新請求才能更新結果及錯誤狀態。" },
      },
      {
        level: 'intermediate',
        prompt: "debounce 和 throttle 有什麼差別？",
        answer: "debounce 等觸發停一段時間再執行。throttle 控制一段時間內的執行頻率。搜尋輸入和捲動更新各適合其中一種。",
        lesson: {
          explanation: "搜尋框需要等使用者停下來再查，可用 debounce。捲動時想定期更新區塊位置，可用 throttle 壓住更新頻率。規格要先說清楚第一次是否立即執行，以及停止操作後是否補跑最後一次。",
          practice: "安排每 80 毫秒出現一次輸入，共持續 1 秒。試著畫出 300 毫秒的 trailing debounce 和 leading throttle 會在哪些時點執行。",
        },
        followUp: { title: "實務補充", body: "要設定停止後是否補跑最後一次，以及元件卸載時如何取消計時器或待執行工作。" },
      },
      {
        level: 'beginner',
        prompt: "淺拷貝和深拷貝有什麼差別？",
        answer: "淺拷貝只複製外層，巢狀物件仍共享參照。深拷貝會複製巢狀資料，能用 structuredClone 複製支援的型別，例如 Map 和 Date。函式不在支援類型內。",
        lesson: {
          explanation: "對含 address 物件的 user 使用展開運算子後，頂層欄位可各自替換，兩份資料仍會指向同一個 address。structuredClone 會遞迴複製支援的資料，例如 Date、Map 和陣列。函式等值不受支援。",
          practice: "建立 user 和含 city 的 address。用展開複製後改 city，確認原始值跟著變，再用 structuredClone 測一次。",
        },
      },
      {
        level: 'intermediate',
        prompt: "TypeScript 的 interface 和 type 有什麼差別？",
        answer: "兩者都可描述物件形狀。interface 可宣告合併，type 可表達聯集、原始型別別名等，兩者也能用不同方式組合多種結構。",
        lesson: {
          explanation: "描述可擴充的物件契約時，可以用 interface，兩個同名介面在適用範圍會嘗試合併。用 type 可直接宣告 'idle' | 'loading' | 'done' 之類的聯集。物件結構兩者都可描述，團隊可維持一致慣例。",
          practice: "用 interface 定義 Product，再用 type 寫待載入、成功和失敗三種狀態。嘗試只在 status 為成功時讀取 product。",
        },
        followUp: { title: "聯集縮窄與泛型", body: "可在聯集中用 status 區分載入中、成功和失敗，讓 TypeScript 縮窄型別。泛型則能保留輸入與輸出關係，例如 key 受物件鍵名限制，回傳型別跟著欄位變化。" },
      },
      {
        level: 'intermediate',
        prompt: "any 和 unknown 有什麼差別？",
        answer: "any 會略過大多數編譯期型別檢查。unknown 要先縮窄型別，才能安全使用其中的值或欄位。",
        lesson: {
          explanation: "把外部資料標成 any 之後，存取不存在的欄位也容易通過編譯。用 unknown 保留未知的事實，再用 typeof、Array.isArray 或自訂型別守衛確認結構，讓後續程式安全使用。",
          practice: "讓一個函式接收 unknown 並回傳裁掉前後空白的字串。輸入數字、null 和字串，確認只有字串能呼叫 trim。",
        },
        followUp: { title: "實務補充", body: "API JSON 即使被標註成某個介面，執行時仍可能有缺值或錯誤型別，應在資料邊界驗證。" },
      },
    ],
  },
  {
    id: "css", title: "CSS、RWD 與 Tailwind", kind: "technical",
    questions: [
      {
        level: 'beginner',
        prompt: "Flex 和 Grid 有什麼差別？",
        answer: "Flexbox 適合一個主要方向的排列。Grid 可以同時控制列與欄，適合二維版面。",
        lesson: {
          explanation: "導覽列中的左側標誌、連結和右側頭像，主要沿同一軸排列，Flex 可處理對齊和剩餘空間。商品清單需要跨列保持欄位一致，Grid 較容易定義欄軌與間隙。",
          practice: "做一個三欄商品 Grid，每張卡內用 Flex 排價格和按鈕。縮小到窄螢幕，觀察哪一層負責變欄和對齊。",
        },
        followUp: { title: "實務補充", body: "卡片組可以用 Grid 決定欄數，卡片內的按鈕群組則用 Flexbox 對齊。兩種排版可以互相搭配。" },
      },
      {
        level: 'advanced',
        prompt: "CSS 權重如何判斷？",
        answer: "先看層疊的來源、重要性和 layer，再比較同一層級內選擇器的權重。一般是 ID 高於 class，class 高於元素。行內樣式另有層疊規則。同權重還要看先後順序。",
        lesson: {
          explanation: "先看規則是否匹配，再檢查來源、重要性與層。只有進到相同優先階層時，才比較選擇器權重。權重相同且同樣接近作用域時，後面的規則優先。單看選擇器裡的 ID 無法解釋所有覆蓋結果。",
          practice: "分別在 base 與 components layer 為同一按鈕設色。先猜哪一條生效，再用 DevTools 查來源。移出 layer 或讓兩條權重相同後再比一次。",
        },
        followUp: { title: "實務補充", body: "用 DevTools 查 Computed 或 Styles，定位實際生效規則。元件的樣式互相影響時，可先縮小作用範圍。" },
      },
      {
        level: 'intermediate',
        prompt: "relative、absolute、fixed、sticky 有什麼差別？",
        answer: "relative 保留原來版面空間，可相對原位置偏移。absolute 脫離正常流，依定位包含區塊定位。fixed 通常依視窗定位。sticky 在捲動到指定門檻後，會在容器範圍內黏附。",
        lesson: {
          explanation: "relative 可微調元素並保留原本佔位。卡片設 relative 後，absolute 的角標可在卡片內定位且不占流內空間。fixed 通常固定在視窗，sticky 是元素先正常排列，再達到偏移門檻時跟隨其捲動容器。",
          practice: "做有捲動內容的側欄，把標題設成 sticky 並給 top，角標以 absolute 定位。改外層的 overflow，觀察 sticky 相對哪裡停住。",
        },
      },
      {
        level: 'intermediate',
        prompt: "如何實作 RWD？",
        answer: "用彈性尺寸、Flex 或 Grid 建立基本版面，再用 Media Query 為版面開始擁擠的寬度設斷點。也要檢查橫向、放大文字和長內容。",
        lesson: {
          explanation: "先讓內容在窄版自然換行，使用可伸縮的寬度、圖片和格線。當內容太擠或一行過長時設斷點，調整欄位和控制項。除了寬度，也要驗證長文字、瀏覽器縮放和操作焦點。",
          practice: "做一張含圖片、長標題和按鈕的產品卡。用 320、768 和 1280 像素測試，再放大瀏覽器文字，檢查是否需要橫向捲動。",
        },
        followUp: { title: "手機版跑版與鍵盤", body: "測窄螢幕、橫向、放大文字和鍵盤焦點。遇到橫向捲軸，可找出 scrollWidth 超出可視寬度的元素，再決定要換行、縮圖或在區塊內捲動。" },
      },
      {
        level: 'beginner',
        prompt: "什麼是 CSS Box Model？",
        answer: "盒模型包含內容、內距、邊框和外距。使用 border-box 時，指定寬度包含內容、內距和邊框，外距另外計算。",
        lesson: {
          explanation: "content 是內容，padding 是內距，border 是邊框，margin 是框外空間。指定 width: 200px、左右 padding 各 16px、左右 border 各 2px 時，content-box 的外框寬 236px，border-box 的外框寬維持 200px。",
          practice: "用兩個相同區塊分別套 content-box 和 border-box。在 DevTools 的尺寸示意圖核對內容寬與外框寬，額外加 margin 比較。",
        },
        followUp: { title: "實務補充", body: "Flex 子項預設有與內容大小相關的最小寬。長網址、圖表或不換行文字可能把容器撐大。需要縮小的項目可設 min-width 為零，再決定要換行、截斷，還是讓區塊捲動。" },
      },
      {
        level: 'beginner',
        prompt: "rem、em、px 有什麼差別？",
        answer: "px 是 CSS 像素單位。rem 依根元素字體大小。em 一般依當前元素字體大小，在 font-size 屬性上則以父元素字體大小為基準。",
        lesson: {
          explanation: "px 是 CSS 像素，在高像素密度螢幕可對應多個實體像素。rem 以根元素的字級計算。em 用在 font-size 時參照繼承的字級，用在 padding 等其他屬性時通常依元素自己的字級。",
          practice: "根元素設 16px、父層設 20px，讓子元素的 font-size 與 padding 都是 1.5em。先算出 30px 和 45px，再比較改用 rem 的效果。",
        },
      },
      {
        level: 'intermediate',
        prompt: "Tailwind CSS 的優缺點？",
        answer: "Utility class 讓開發較快、樣式規則容易統一。HTML 的類名有時較長，可用元件或共用規則整理重複的結構和狀態。",
        lesson: {
          explanation: "現成 utility 可把色彩、間距和響應式規則對到同一設計系統。當一段按鈕樣式重複出現時，可封裝成元件，統一各狀態。從變數拼半段 class 可能讓建置時掃描不到完整類名，可用明確的對照表列出完整字串。",
          practice: "做 primary、secondary 和 disabled 三種按鈕。先用 utility 拼出，再用元件 props 選固定的 class 組，並檢查正式建置下三種狀態都生效。",
        },
        followUp: { title: "實務補充", body: "簡短的排列、間距和狀態可用 utility。重複或多狀態的介面，可放入元件或集中變數，維持同一套色彩和間距。動態狀態最好對應到完整、可被建置掃描到的類名。" },
      },
    ],
  },
  {
    id: "quality", title: "前端效能、資安與元件庫", kind: "technical",
    questions: [
      {
        level: 'advanced',
        prompt: "如何提升電商網站效能？",
        answer: "先用 Lighthouse、DevTools 或實際使用者資料找到瓶頸。依問題選擇圖片壓縮、延遲載入、程式碼分割、快取或減少 API 請求，並用相同條件驗證前後差異。",
        lesson: {
          explanation: "先從真實使用資料找出慢的裝置和路徑，再用 DevTools 重現該情境。若主要延遲是首圖，依序看何時被發現、傳輸檔案大小和何時開始渲染。互動卡頓則用 Performance 找長任務，優先修影響最大的操作。",
          practice: "用一個商品頁做前後測，固定裝置和網路條件，記錄 LCP、首圖大小及長任務時間。只改一項，再比較結果。",
        },
        followUp: { title: "首圖和 LCP", body: "LCP 看主要內容多久顯示。INP 反映頁面互動有多快出現下一次畫面更新。CLS 看非預期位移。用真實使用者資料定位影響，搭配效能錄製查到圖片、主執行緒或版面問題。 讓瀏覽器提供正確尺寸的圖，格式和壓縮依畫質需求取捨。首圖要及早發現，避免 lazy loading，並指定長寬以保留空間。折線下才使用懶載入，核對手機和桌面都不超抓。" },
      },
      {
        level: 'intermediate',
        prompt: "什麼是 XSS？如何防禦？",
        answer: "XSS 是不可信內容被當成程式碼執行。一般文字使用正確的輸出跳脫，富文字經過維護良好的清理工具。CSP 可以限制腳本來源，作為額外防線。",
        lesson: {
          explanation: "商品評論是外部資料。若只接受文字，就使用會跳脫的文字插值。需要允許部分富文字時，應透過維護中的清理工具和允許清單約束內容。CSP 可補強瀏覽器端限制。",
          practice: "設計評論元件的驗收條件。用含尖括號和引號的普通測試字串，驗證畫面逐字顯示。再列出富文字允許的標籤並驗證輸出。",
        },
        followUp: { title: "實務補充", body: "需要顯示富文字時，先決定允許的標籤與屬性，再檢查渲染點。一般文字用框架的預設跳脫輸出。" },
      },
      {
        level: 'intermediate',
        prompt: "什麼是 CSRF？如何防禦？",
        answer: "CSRF 利用瀏覽器自動帶憑證，誘使登入者送出非預期請求。伺服器可檢查 CSRF token 或請求來源，並使用合適的 SameSite Cookie。",
        lesson: {
          explanation: "瀏覽器對符合條件的請求會自動帶上 Cookie，因此伺服器仍要判斷變更是由自己的應用發起。常見做法是替狀態異動驗證 CSRF token，並配合 SameSite 及來源檢查。處理權限依然要確認使用者身分和資源歸屬。",
          practice: "為「變更收件地址」列出測試矩陣，包含合法請求、缺少權杖、工作階段逾期。把測試寫在後端並核對合法操作能成功。",
        },
        followUp: { title: "實務補充", body: "GET 維持讀取用途。送出異動時，伺服器要核對憑證與防護條件。" },
      },
      {
        level: 'beginner',
        prompt: "什麼是 CORS？",
        answer: "CORS 是瀏覽器控制跨來源讀取的機制。伺服器透過回應標頭表示允許的來源，部分請求還需要預檢來確認方法與標頭。",
        lesson: {
          explanation: "來源由協定、主機與連接埠組成。網站的前端與 API 位於不同來源時，瀏覽器依 API 回應標頭決定是否讓前端讀取回應。一些方法或請求標頭會先觸發 OPTIONS 預檢。API 的驗證與資料權限仍由後端負責。",
          practice: "在自己控制的兩個本機服務設置單一允許來源，觀察 Network 中 OPTIONS 和實際請求。記錄允許來源、方法及必要標頭。",
        },
        followUp: { title: "實務補充", body: "跨來源限制作用於瀏覽器，伺服器仍要逐筆驗證身分與資料權限。" },
      },
      {
        level: 'beginner',
        prompt: "什麼是 Storybook？",
        answer: "Storybook 可獨立開發、展示與測試 UI 元件。團隊可以為相同元件保留載入、空資料、錯誤與不同尺寸等狀態。",
        lesson: {
          explanation: "Story 把元件放進一個可獨立重現的狀態。訂單列表可以各做有資料、載入、空清單與錯誤的 Story，設計和工程可以直接檢查每種畫面，也能用來驗證點擊和鍵盤操作。",
          practice: "為同一個按鈕建立預設、等待中及停用三個 Story。檢查外觀、焦點和點擊時是否觸發事件。",
        },
        followUp: { title: "元件與上線流程的驗證", body: "如果正式站偶爾出現白畫面，先看部署後是否還在載入舊切割檔，再用版本、路徑和瀏覽器紀錄定位。Storybook 的元件測試之外，也要在實際應用驗證跨頁流程。" },
      },
      {
        level: 'beginner',
        prompt: "什麼是 Jest？",
        answer: "Jest 是 JavaScript 測試框架，提供測試執行、斷言、mock 和覆蓋率等功能，可用於單元或適當的整合測試。",
        lesson: {
          explanation: "可以用 Jest 把折扣、價格轉換等純函式用例寫成測試，以 expect 比對結果。測到外部服務時可用 mock 提供固定輸入或錯誤。先選真正在意的邊界，再用覆蓋率協助找遺漏。",
          practice: "替折扣函式寫三個案例，分別是低於門檻、剛好達門檻和高於門檻。故意改成嚴格大於，確認門檻測試會失敗。",
        },
        followUp: { title: "實務補充", body: "純規則用單元測試，表單和狀態切換用元件測試，登入到完成一項關鍵任務用少量端對端測試。每層挑容易出問題的條件，不用每一層重覆同一組案例。" },
      },
      {
        level: 'advanced',
        prompt: "如何設計共用元件庫？",
        answer: "先釐清要共用的元件與設計規範，再統一 Props、Events、Slots 和互動狀態。搭配文件、無障礙驗收與測試，讓各個產品能低耦合地重用。",
        lesson: {
          explanation: "先盤點重複且穩定的介面，定義可共用的色彩、尺寸與互動規則。按鈕約定變體、停用和載入狀態，對外保留小而穩定的契約。用 Storybook 展示，搭配鍵盤、可及性與視覺回歸測試。破壞相容的改動應規劃版本和遷移。",
          practice: "用三個產品裡的按鈕整理共用 props、事件和設計變數。列出要維持的舊用法，以及如何測試升級。",
        },
      },
      {
        level: 'advanced',
        prompt: "如何處理大量 API 資料？",
        answer: "依操作需求做伺服器分頁、快取與請求取消。畫面要同時瀏覽很多資料時可用虛擬列表，讓瀏覽器主要渲染可見區域。",
        lesson: {
          explanation: "頁面只需顯示前 20 筆時，先限制 API 回傳資料，以伺服器端分頁、排序和搜尋控制傳輸量。使用者若需捲動大量資料，可用虛擬列表減少同時呈現的 DOM。查詢快取依條件區分，並處理過期結果。",
          practice: "做 10,000 筆假資料，測全量渲染、每頁 30 筆及虛擬列表。比較傳輸、DOM 節點數、鍵盤操作與快速切換條件時的結果。",
        },
        followUp: { title: "實務補充", body: "先跟產品確認要的是搜尋、匯出或一次瀏覽。改用虛擬列表時也要保留鍵盤與輔助科技的操作路徑。" },
      },
      {
        level: 'intermediate',
        prompt: "什麼是 PWA？",
        answer: "PWA 運用 Web App Manifest、Service Worker 等技術，在支援的瀏覽器提供安裝或離線等體驗。可離線的範圍由應用的快取策略決定。",
        lesson: {
          explanation: "Web App Manifest 可描述安裝後的名稱、圖示和啟動方式。Service Worker 可協助快取與離線應對。例如網路斷線時提供已讀文章，連回網路後再更新。帳戶頁與敏感資料須另訂快取策略。",
          practice: "選一條文章列表流程，寫下哪些靜態資源能快取、離線時顯示什麼，再用 DevTools 模擬斷網和重新上線。",
        },
      },
    ],
  },
  {
    id: "conversation", title: "面談與專案表達", kind: "conversation",
    questions: [
      {
        level: 'beginner',
        prompt: "請用一分鐘介紹自己。",
        answer: "可從現在的職能開始，說明常用技術及擅長的系統情境。選一個能代表能力的例子，指出你的責任、處理過的問題和實際成果，最後說明和本職缺的關聯。",
        lesson: {
          explanation: "可把 60 秒分成背景 10 秒、最相關的成果與方法 35 秒、對這個職缺有興趣的原因 15 秒。選一個專案講你負責的具體範圍，例如從串購物車 API 到驗證錯誤狀態，讓對方有可以追問的細節。",
          practice: "錄兩次各 60 秒的版本。第二次把「我很熟某工具」換成一項你實際做過、可以驗證的工作。",
        },
      },
      {
        level: 'intermediate',
        prompt: "怎麼介紹最有代表性的前端專案？",
        answer: "先說產品要服務誰、主要流程和原本的問題，再具體說你負責哪些部分與如何取捨。可以用載入時間、錯誤率或操作步驟量化成果，沒有記錄的數據就說明可驗證的變化。",
        lesson: {
          explanation: "用情境、任務、行動、結果串成故事。先講使用者遇到的問題，再講你負責哪些決策，例如把表單錯誤移到欄位旁。用改動前後畫面、測試或錯誤率來支持成果，清楚說明結果的來源。",
          practice: "拿一個專案，準備 90 秒口頭版和一份可以打開的作品。練習回答「為什麼選這個做法」與「如何證明有效」。",
        },
      },
      {
        level: 'advanced',
        prompt: "曾經處理最棘手的技術問題是什麼？",
        answer: "選一個能清楚交代排查的例子。說明先看到的症狀、如何重現、如何排除其他原因，最後如何修復與防止再發。讓面試官聽得出是你做的部分。",
        lesson: {
          explanation: "先給重現條件與影響，例如切換篩選時上一個請求偶爾蓋掉新資料。描述如何用時間線驗證假設、評估取消與序號兩種修法，再說明驗收與防止重現的方法。",
          practice: "用一張圖畫出兩筆請求的發出與回來時間。練習在兩分鐘內說清楚如何從現象定位問題、驗證修法。",
        },
      },
      {
        level: 'intermediate',
        prompt: "遇到需求不明確時會怎麼推進？",
        answer: "先把使用者、目標、必要情境和驗收條件寫清楚。與產品確認衝突的需求，先畫一條主要流程或做小型原型，盡早核對理解再往下做。",
        lesson: {
          explanation: "先問使用者要完成什麼、有哪些角色和限制，再挑影響最大的未知條件釐清。把驗收寫成可見行為，例如「付款失敗後保留購物車內容並可重試」。有待決定的地方先用小原型讓對方選。",
          practice: "把「購物流程做順一點」拆成三項可驗收的情境，寫出自己需要向產品、設計和後端確認的問題。",
        },
      },
      {
        level: 'intermediate',
        prompt: "如何和後端、設計或營運協作？",
        answer: "用可以共同驗證的內容對齊，例如 API 範例、狀態表和錯誤情境。模擬資料先讓介面進展，接口更新一併維護。需求或交期變動時明確說出影響和可調整範圍。",
        lesson: {
          explanation: "與設計確認錯誤、等待及空畫面。與後端約好欄位、錯誤碼和範例。與營運確認上線時程和發現異常時的聯絡方式。把最容易有歧義的決定留在同一份可查閱的紀錄。",
          practice: "挑一個新增訂單篩選的需求，寫出你會和三個角色確認的事項，也寫出碰到 API 延遲時要如何回報。",
        },
      },
      {
        level: 'advanced',
        prompt: "你如何安排速度、品質與技術債的優先順序？",
        answer: "先守住正確性、權限和關鍵流程，再看哪些技術債會妨礙改版。短期先解最重要的問題，列出未處理影響與回顧時間，無須為了統一風格做整站重構。",
        lesson: {
          explanation: "先看錯誤會影響多少使用者、是否碰到金流或核心流程，以及改動是否易於回退。低風險的畫面可先縮小範圍交付。未解的問題記錄影響、負責人與何時處理，方便下一次排程。",
          practice: "假設同天出現結帳重複送出、低使用率頁面跑版和大量重複 CSS。排處理順序，並說明每件事的回退與驗收方法。",
        },
      },
      {
        level: 'beginner',
        prompt: "面試官問期望薪資，怎麼回答？",
        answer: "先了解職務責任、獎金、福利與工作型態，再依市場與自己的能力提出合理範圍。若資訊還不完整，可以說明希望先了解整體方案，並保留後續討論空間。",
        lesson: {
          explanation: "先確認職缺是談月薪還是年薪，以及年終是否保證。可說你期望的固定薪資區間，再詢問獎金、股票、值班等條件。把不同方案換算成固定年薪後，比較責任、彈性與可變收入。",
          practice: "用兩份假設 offer 練習，甲每月 6 萬、保證 14 個月，乙每月 6.5 萬、保證 12 個月。算固定年薪，再練一句說明期望和可談條件。",
        },
      },
      {
        level: 'beginner',
        prompt: "有什麼問題想問團隊？",
        answer: "可以問前三個月最優先要解決什麼、現有系統最大的痛點、前後端怎麼分工，以及上線前如何驗收。根據對方的回答追問一個實際案例。",
        lesson: {
          explanation: "挑能理解工作日常的問題。問「最近一次前端上線失敗，團隊怎麼回復和復盤」通常比只問「有沒有 CI/CD」更能了解實際作法。也可以問前三個月期待交付什麼，以及由誰給回饋。",
          practice: "準備三題，分別了解日常交付、學習支援和前三個月目標。為每題寫下一個可以根據對方回答追問的問題。",
        },
      },
    ],
  },
  {
    id: "exercises", title: "JavaScript 實作", kind: "exercise",
    questions: [
      {
        level: 'beginner',
        prompt: "陣列去重，保留每個值第一次出現的順序。",
        answer: "Set 只保留不重複的項目，並保留插入順序。將 Set 展開回陣列即可。若輸入是物件，要先確認是以物件參照還是特定欄位去重。",
        lesson: {
          explanation: "Set 在加入時只保留一份，迭代依第一次插入的順序。先用陣列建立 Set，再展開成陣列，即可得到新結果。物件按參考比較，兩個內容相同但分開建立的物件會被當成兩個值。",
          practice: "驗證 [3, 1, 3, 2] 變成 [3, 1, 2]，再測空陣列、兩個 NaN 和兩個內容相同的物件。",
        },
        example: [
          "function unique(items) {",
          "  return [...new Set(items)]",
          "}",
          "",
          "unique([1, 2, 2, 3]) // [1, 2, 3]",
        ].join('\n'),
      },
      {
        level: 'beginner',
        prompt: "統計字串中各字元出現次數，略過空白。",
        answer: "用 for...of 逐一讀取 Unicode 碼位，略過空白後累加次數。以無原型物件存放計數。若題目要把帶結合符號或連接符號的使用者可見字素算成一個，須再考慮分段。",
        lesson: {
          explanation: "用 for...of 逐個走過 Unicode 碼點。跳過空白字元，其餘以字元作為鍵，未出現過從零起算。用無原型物件做計數表，可以避免繼承的屬性。若題目要求以肉眼看到的字為單位，先釐清組合字形怎麼處理。",
          practice: "用「a a☀」驗證 a 為 2、☀ 為 1。再測換行、Tab、空字串及一個由多個碼點組成的表情符號。",
        },
        example: [
          "function countChar(text) {",
          "  const counts = Object.create(null)",
          "  for (const char of text) {",
          "    if (/\\s/u.test(char)) continue",
          "    counts[char] = (counts[char] ?? 0) + 1",
          "  }",
          "  return counts",
          "}",
          "",
          "countChar('aa b') // a: 2, b: 1",
        ].join('\n'),
      },
      {
        level: 'beginner',
        prompt: "依條件篩選物件，回傳符合條件的欄位。",
        answer: "把物件的自有可列舉字串欄位轉成鍵值組，用條件篩選，再用 Object.fromEntries 建立新物件。範例保留大於零的欄位。",
        lesson: {
          explanation: "Object.entries 把物件自有且可列舉的字串鍵轉為鍵值陣列。用 filter 把 key 和 value 傳給判斷函式，最後由 Object.fromEntries 重建新物件。如果要求保留 Symbol 或不可列舉欄位，須選擇不同的走訪方式。",
          practice: "用 { a: 0, b: 4, c: 2 } 篩選出大於零且鍵不是 c 的欄位，預期只保留 b。再測各欄都不符合和物件是否被修改。",
        },
        example: [
          "function filterObj(object, predicate) {",
          "  return Object.fromEntries(",
          "    Object.entries(object).filter(([key, value]) => predicate(value, key)),",
          "  )",
          "}",
          "",
          "filterObj({ a: 0, b: 2 }, value => value > 0) // { b: 2 }",
        ].join('\n'),
      },
      {
        level: 'intermediate',
        prompt: "寫一個 debounce，讓最後一次輸入才觸發查詢。",
        answer: "保存上一個計時器，每次傳入新參數就清掉它並重新倒數。觸發時保留原本呼叫的 this 與參數。離開畫面時可以呼叫 cancel。",
        lesson: {
          explanation: "讓外層函式持有共用的計時器。每次呼叫先清掉前一筆計時工作，再安排用最新參數執行。使用方法回呼時需保存 this，卸載元件前則可用 cancel 清掉尚未執行的工作。已發出的請求要另外處理取消或過期回應。",
          practice: "以 100 毫秒的間隔呼叫三次，等待 300 毫秒的 debounce 結束。驗證只執行一次且拿到最後參數，再測等待途中呼叫 cancel。",
        },
        example: [
          "function debounce(fn, delay) {",
          "  let timer",
          "  function delayed(...args) {",
          "    clearTimeout(timer)",
          "    timer = setTimeout(() => fn.apply(this, args), delay)",
          "  }",
          "  delayed.cancel = () => clearTimeout(timer)",
          "  return delayed",
          "}",
        ].join('\n'),
      },
      {
        level: 'intermediate',
        prompt: "用欄位把陣列分組，並保留每組原有順序。",
        answer: "遍歷一次陣列，用 Map 保存對應群組。以有效鍵名取得目前群組，有資料就放進原組，沒有就先建立。傳入取鍵函式，能支援不同型別及多筆資料。",
        lesson: {
          explanation: "逐筆取出分組鍵，以 Map 保存每個鍵對應的陣列。第一次看見鍵時先建立容器，其後把項目加到同一個陣列。這樣只需走訪一次，分組及組內都能保留遇到的順序。",
          practice: "以 A、B、A 三筆資料練習，確認 A 組包含第一與第三筆。再驗證數字 1 和字串「1」會留在不同組。",
        },
        example: [
          "function groupBy(items, keyOf) {",
          "  const groups = new Map()",
          "  for (const item of items) {",
          "    const key = keyOf(item)",
          "    let group = groups.get(key)",
          "    if (!group) groups.set(key, group = [])",
          "    group.push(item)",
          "  }",
          "  return groups",
          "}",
        ].join('\n'),
      },
      {
        level: 'intermediate',
        prompt: "依 ID 去除重複項目，只保留第一次出現。",
        answer: "Set 用來記錄看過的 ID。累積輸出時保留第一次出現的項目，維持輸入順序。若 ID 可缺省，先定義缺省項目該如何辨識。",
        lesson: {
          explanation: "這題的相同由 id 決定，即使兩個物件是分開建立，ID 相同也視為重複。走訪每筆資料時查 Set，還沒看過才加入結果。實務上要先確認缺失 ID 要保留、排除還是回報。",
          practice: "用 ID 1、2、1，但同 ID 的名稱不同，確認留下第一個 1。再問清楚沒有 id 的資料要如何處理，補一個測試。",
        },
        example: [
          "function uniqueById(items) {",
          "  const seen = new Set()",
          "  return items.filter(({ id }) => {",
          "    if (seen.has(id)) return false",
          "    seen.add(id)",
          "    return true",
          "  })",
          "}",
        ].join('\n'),
      },
      {
        level: 'advanced',
        prompt: "限制同時執行的非同步工作數，回傳結果順序與輸入一致。",
        answer: "建立固定數量的執行者，每個執行者依序取下一個索引，將結果寫回對應位置。以下採 Promise.all 的失敗語意。若要收集全部異常，可以另外定義結果格式。",
        lesson: {
          explanation: "先建立數量受限的工作迴圈。每個迴圈選定一個尚未處理的索引，再等待該筆工作。完成後把結果放回該索引，因此結果順序與先完成的工作無關。失敗時還要依規格決定是中止、等待既有工作，還是保留錯誤結果。",
          practice: "用五個延遲不同的工作，將上限設為二。記錄每次開始和完成，核對峰值不超過二、結果依輸入排列，再加一筆會拒絕的工作。",
        },
        example: [
          "async function mapLimit(items, limit, task) {",
          "  if (!Number.isInteger(limit) || limit < 1) {",
          "    throw new RangeError('limit must be a positive integer')",
          "  }",
          "  const result = new Array(items.length)",
          "  let next = 0",
          "  async function worker() {",
          "    while (next < items.length) {",
          "      const i = next++",
          "      result[i] = await task(items[i], i)",
          "    }",
          "  }",
          "  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))",
          "  return result",
          "}",
        ].join('\n'),
      },
      {
        level: 'advanced',
        prompt: "寫出只讓最新搜尋更新畫面的查詢函式。",
        answer: "用遞增序號標記請求。成功或失敗都先核對序號，只有最新請求可以更新畫面。若可控制 fetch 的來源，也能加上 AbortController 減少無用請求。",
        lesson: {
          explanation: "每開始一次搜尋就更新請求身分，回應時只允許最新那筆改畫面。範例同時中止上一筆工作以節省資源，並檢查請求是否仍是目前的控制器。這樣即使資料來源忽略中止訊號，舊回應也無法覆蓋新結果。",
          practice: "送出慢的 A 再送快的 B，安排 A 較晚返回，確認頁面保留 B。再測舊請求失敗和最新請求失敗時，哪一筆能更新錯誤狀態。",
        },
        example: [
          "function createSearch(fetchResults, render, showError) {",
          "  let latest = 0",
          "  return async function search(query) {",
          "    const request = ++latest",
          "    try {",
          "      const results = await fetchResults(query)",
          "      if (request === latest) render(results)",
          "    } catch (error) {",
          "      if (request === latest) showError(error)",
          "    }",
          "  }",
          "}",
        ].join('\n'),
      },
    ],
  },
]

export const practiceCounts = {
  technical: practiceTopics.filter(topic => topic.kind === 'technical').reduce((sum, topic) => sum + topic.questions.length, 0),
  conversation: practiceTopics.find(topic => topic.kind === 'conversation')!.questions.length,
  exercise: practiceTopics.find(topic => topic.kind === 'exercise')!.questions.length,
}
