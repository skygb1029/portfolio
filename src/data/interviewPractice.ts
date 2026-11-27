export const difficultyLabels = {
  beginner: '初階',
  intermediate: '中階',
  advanced: '高階',
} as const

export type PracticeDifficulty = keyof typeof difficultyLabels

export interface PracticeQuestion {
  level: PracticeDifficulty
  prompt: string
  writtenExam?: number
  answer: string
  lesson: { explanation: string; practice: string }
  followUp?: { title: string; body: string }
  example?: string
  exampleLanguage?: 'HTML / CSS' | 'Vue'
  reference?: { label: string; url: string }
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
        writtenExam: 10,
        prompt: "Vue 3 的 ref() 和 reactive() 有什麼差別？什麼時候用哪一個？",
        answer: "ref 可存原始型別或物件，在 JavaScript 中通常用 .value 讀寫，適合計數器或可能整份替換的資料。reactive 接受物件、陣列等物件型別並回傳 Proxy，適合逐欄修改的表單狀態。",
        lesson: {
          explanation: "用 ref 放查詢結果時，可以用 results.value 直接換成新陣列。表單使用 reactive 時，更新 form.name 可觸發依賴。直接將字串欄位解構成普通變數，只會取得當時的值。",
          practice: "建立計數器和姓名表單。分別替換 ref 的內容、更新 form.name 與改動解構得來的變數，看看畫面何時更新。",
        },
        followUp: { title: "解構表單物件", body: "如果需要解構 reactive 後繼續追蹤各欄位，可用 toRefs。用 ref 保存物件時，預設也會讓可代理的巢狀值具備響應性。" },
        reference: {
          label: "Vue 響應式基礎",
          url: "https://vuejs.org/guide/essentials/reactivity-fundamentals.html",
        },
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
        level: 'intermediate',
        writtenExam: 11,
        prompt: "Vue 3 的 setup() 在何時執行？請依階段說出至少四個生命週期鉤子。",
        answer: "setup 在每個元件實例初始化時執行，早於 Options API 的 beforeCreate。一般掛載流程依序是 onBeforeMount、onMounted。資料更新時是 onBeforeUpdate、onUpdated。移除元件時是 onBeforeUnmount、onUnmounted。",
        lesson: {
          explanation: "在 setup 的同步執行階段註冊鉤子。需要存取元件 DOM 時，可等到 onMounted。在 onUnmounted 清除計時器或訂閱。更新鉤子要有實際渲染更新才會觸發，onMounted 等 DOM 相關鉤子不在 SSR 時執行。",
          practice: "做一個父元件控制顯示的計數器。印出 setup、onMounted、onUpdated 和 onUnmounted，依序顯示、點擊更新、移除，記下出現的順序。",
        },
        reference: {
          label: "Vue 生命週期鉤子",
          url: "https://vuejs.org/api/composition-api-lifecycle.html",
        },
      },
      {
        level: 'intermediate',
        writtenExam: 12,
        prompt: "Vue 3 父元件如何呼叫子元件的方法？請用 template ref 示範。",
        answer: "子元件用 defineExpose 公開需要的操作。父元件以 template ref 取得已掛載的子元件實例，再呼叫該方法。資料流通常留給 props 與 emit，需要主動聚焦或重設時可用這種方式。",
        lesson: {
          explanation: "script setup 宣告的函式預設不會公開。子元件只暴露 focus，父元件透過 ref 呼叫。初始化或子元件被 v-if 移除時，實例可能是 null，因此先檢查。",
          practice: "做一個子元件輸入框。按父元件的按鈕時讓它取得焦點，再用 v-if 移除子元件，確認 optional chaining 能處理 ref 為空的情況。",
        },
        exampleLanguage: 'Vue',
        example: [
          "<!-- SearchInput.vue -->",
          "<script setup>",
          "import { ref } from 'vue'",
          "const field = ref(null)",
          "function focus() { field.value?.focus() }",
          "defineExpose({ focus })",
          "</script>",
          "<template><input ref=\"field\" aria-label=\"搜尋關鍵字\"></template>",
          "",
          "<!-- Parent.vue -->",
          "<script setup>",
          "import { ref } from 'vue'",
          "import SearchInput from './SearchInput.vue'",
          "const search = ref(null)",
          "</script>",
          "<template>",
          "  <SearchInput ref=\"search\" />",
          "  <button type=\"button\" @click=\"search?.focus()\">聚焦搜尋欄</button>",
          "</template>",
        ].join('\n'),
        reference: {
          label: "Vue 元件 Template Ref",
          url: "https://vuejs.org/guide/essentials/template-refs.html",
        },
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
        writtenExam: 13,
        prompt: "Nuxt 3 的 useAsyncData() 與 useFetch() 怎麼選？SSR 如何預取並重用資料？",
        answer: "useAsyncData 可執行自訂非同步 handler。useFetch 封裝 useAsyncData 與 $fetch，可用 URL 和選項取得資料。預設 SSR 時先在伺服器取得資料，結果放進 Nuxt payload，瀏覽器 hydration 依 key 重用結果。",
        lesson: {
          explanation: "單一 HTTP API 可直接 await useFetch。需同時載入多項資料或呼叫額外的資料介面時，可用 useAsyncData 自訂 handler。給資料穩定且有意義的 key，回傳可序列化的有效值。server: false 時請求留到前端，因此首份伺服器 HTML 不會有這筆資料。",
          practice: "在 Nuxt 3 建立商品頁和簡單 API，用 useFetch 直接載入商品，再用 useAsyncData 同時載入商品和分類。重新整理並檢查伺服器紀錄和瀏覽器 Network，確認 hydration 是否重用結果。",
        },
        reference: {
          label: "Nuxt 3 Data Fetching",
          url: "https://nuxt.com/docs/3.x/getting-started/data-fetching",
        },
      },
      {
        level: 'intermediate',
        writtenExam: 14,
        prompt: "Nuxt 3／4 的 composables 和 utils 如何分工？請各舉一例。",
        answer: "composables 放可共用的 Vue／Nuxt 邏輯，例如 useCart() 回傳響應式購物車與方法。utils 放一般工具函式，例如 formatPrice() 把數字格式化為金額。兩者依 Nuxt 的目錄設定都可自動匯入。",
        lesson: {
          explanation: "Nuxt 3 標準目錄通常是 composables/、utils/。Nuxt 4 標準應用結構通常是 app/composables/、app/utils/。目錄名稱本身不會讓函式變成響應式。需要 Vue 或 Nuxt context 的 composable 要在支援的環境與時機呼叫。",
          practice: "讓 formatPrice 接收金額與幣別並可獨立測試。再寫 useCart，讓購物車總價依商品數量更新，並在畫面呼叫 formatPrice 顯示結果。",
        },
        reference: {
          label: "Nuxt 4 utils 與 composables",
          url: "https://nuxt.com/docs/4.x/directory-structure/app/utils",
        },
      },
      {
        level: 'intermediate',
        writtenExam: 15,
        prompt: "Vue／Nuxt 的狀態預設存在哪裡？重新整理後如何保留資料？",
        answer: "Pinia、Vue 響應式狀態和 Nuxt useState 預設在執行環境記憶體中。Nuxt SSR 可將初始值傳給瀏覽器進行 hydration。重新整理會重建應用，要持久保留可依資料用途選用瀏覽器儲存、Cookie 或後端資料庫。",
        lesson: {
          explanation: "偏好設定可用 localStorage。只需在同一個分頁保留的草稿可用 sessionStorage。跨裝置資料可存後端並在登入後載入。Nuxt SSR 需要提前知道的簡短偏好可以用 Cookie。登入憑證應由後端管理，例如適當設定的 HttpOnly Cookie。",
          practice: "用記憶體保存主題色與草稿後重新整理。接著讓主題色從 localStorage、草稿從 sessionStorage 讀取，比較在重新整理和關閉分頁之後是否保留。",
        },
        followUp: { title: "SSR 讀取時機", body: "localStorage 和 sessionStorage 只存在瀏覽器，請在客戶端適當時機讀取。SSR 先從 Cookie 決定需要一致的初值，避免兩端首次渲染不同。" },
        reference: {
          label: "Nuxt 狀態管理",
          url: "https://nuxt.com/docs/4.x/getting-started/state-management",
        },
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
        writtenExam: 1,
        prompt: "比較 var、let、const 的作用域、提升和可能造成的 bug。",
        answer: "var 是函式作用域，也能重新宣告。執行到賦值前，已建立的 var 綁定是 undefined。let 和 const 是區塊作用域，宣告前的暫時性死區會在讀取時拋出 ReferenceError。let 可重新賦值，const 宣告時要初始化，綁定之後不能重新賦值。",
        lesson: {
          explanation: "迴圈用 var 宣告索引時，非同步回呼共用同一個索引。等回呼執行時，值可能已變成最後一次迴圈之後的數字。for 用 let 宣告索引時，每次迭代會有自己的綁定。const 物件的欄位仍可修改。",
          practice: "讓 for 迴圈排三個 setTimeout，各印一次索引。先用 var 再用 let，確認兩者會印出 3、3、3 與 0、1、2。",
        },
        followUp: { title: "宣告與初始化", body: "let 和 const 的綁定在進入作用域時就已存在，待執行到宣告處才初始化。用 TDZ 解釋宣告前不能存取，比只說「沒有提升」精確。" },
        reference: {
          label: "MDN JavaScript 語言概覽",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview",
        },
      },
      {
        level: 'beginner',
        writtenExam: 2,
        prompt: "什麼是閉包（Closure）？請舉出用途與常見情境。",
        answer: "函式可以保留對宣告時外層詞法環境的存取，因此外層函式執行完，內層函式仍能讀寫那些變數。常見用途包括封裝私有狀態、產生有設定的函式，以及讓 debounce 記住計時器。",
        lesson: {
          explanation: "makeCounter 內宣告 count 後回傳一個遞增函式。每次呼叫 makeCounter 都會建立新的環境，因此兩個計數器可以各自累加。同一個計數器內的函式則會持續操作自己的 count。",
          practice: "實作 makeCounter，建立 a 和 b，再依序呼叫 a、a、b，預期得到 1、2、1。試著加入 reset，讓同一計數器的兩個方法共用 count。",
        },
        reference: {
          label: "MDN 閉包",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
        },
      },
      {
        level: 'intermediate',
        writtenExam: 3,
        prompt: "一般函式、物件方法和箭頭函式的 this 分別如何決定？",
        answer: "一般函式的 this 取決於呼叫方式。嚴格模式的獨立呼叫是 undefined，非嚴格模式通常替換為 globalThis。以 obj.method() 呼叫一般方法時，this 是 obj。箭頭函式沿用外層的 this。",
        lesson: {
          explanation: "把 obj.method 存入變數再呼叫，呼叫時已沒有 obj 作為接收者。一般函式可用 call、apply 或 bind 指定這個值。箭頭函式以詞法方式取得外層 this，這些方法無法改寫它的 this。",
          practice: "比較 obj.getName()、把 getName 拆出後直接呼叫，以及用 call(obj) 呼叫。再把物件方法改成箭頭函式，觀察 call(obj) 能否改變結果。",
        },
        example: [
          "'use strict'",
          "const user = {",
          "  name: 'Mia',",
          "  read() { return this?.name },",
          "  makeReader() { return () => this.name },",
          "}",
          "const detached = user.read",
          "console.log(user.read(), detached(), detached.call(user)) // Mia undefined Mia",
          "console.log(user.makeReader().call({ name: 'Kai' })) // Mia",
        ].join('\n'),
        reference: {
          label: "MDN this",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
        },
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
        writtenExam: 4,
        prompt: "淺拷貝與深拷貝有什麼差別？請比較兩種深拷貝做法。",
        answer: "淺拷貝只複製最外層，巢狀物件仍共用參考。深拷貝會複製可支援的巢狀資料。structuredClone 可處理 Date、Map 與循環參考。JSON 序列化再解析適合原本就只有 JSON 可表示值的普通資料。",
        lesson: {
          explanation: "展開物件後，改 copy.address.city 會影響原本的 address。structuredClone 可讓兩份 address 獨立，遇到函式會拋出錯誤。JSON 的方法遇到 Date 會得到字串，遇到循環參考會失敗，也無法原樣保留 undefined。",
          practice: "建立有 address、Date 和 undefined 的物件，分別用展開、structuredClone 和 JSON 轉換。比較巢狀欄位是否共用，以及型別有沒有改變。",
        },
        reference: {
          label: "MDN structuredClone",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone",
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
        writtenExam: 6,
        prompt: "Flexbox 和 Grid 各有什麼優勢？什麼版面適合用哪一種？",
        answer: "Flexbox 適合沿單一主軸排列與對齊，例如導覽列、按鈕群組。Grid 能同時規劃列與欄的軌道，適合需要跨列對齊的商品清單或整頁版面。兩種可以在外層和內層搭配使用。",
        lesson: {
          explanation: "具備換行的 Flex 容器仍以每一行分別計算剩餘空間。三欄商品清單如果要求每列的欄線一致，Grid 可以共享欄軌。每張卡片裡的價格與按鈕則可交給 Flex 沿單軸排版。",
          practice: "做三欄商品 Grid，每張卡內用 Flex 排價格和按鈕。改變一張卡的文字長度，再比較窄畫面時格線及按鈕的行為。",
        },
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
        level: 'advanced',
        writtenExam: 8,
        prompt: "CSS 選擇器 #main div.content span 和 .content-span，哪一個通常比較費工？",
        answer: "在相同目標和可比的頁面中，#main div.content span 通常需要更多比對。引擎比對右端的 span 候選，再確認是否有符合條件的祖先。單一 class 的比對條件較簡單。實際開銷需要在真實 DOM 上量測。",
        lesson: {
          explanation: "選擇器效能是符合條件所需的工作。Specificity 是級聯中用來比較規則優先順序的資訊。大量 span、較深的祖先鏈或頻繁改變 class 可能增加重算樣式的代價。現代引擎有快取與篩選最佳化，實際差距取決於頁面。",
          practice: "用兩組作用範圍一致的樣式做成測試頁。固定 DOM 和互動動作，以 Chrome DevTools 的 Selector Stats 比較樣式重算時間及匹配次數。",
        },
        reference: {
          label: "Chrome DevTools Selector Stats",
          url: "https://developer.chrome.com/docs/devtools/performance/selector-stats",
        },
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
        writtenExam: 7,
        prompt: "如何實作 RWD？Viewport meta 和 Media Query 分別負責什麼？",
        answer: "RWD 讓同一頁依可用空間調整佈局。viewport meta 的 width=device-width 讓行動瀏覽器採用裝置寬度作為版面視窗的基準。Media Query 依條件套用樣式，例如視窗夠寬時改成兩欄。",
        lesson: {
          explanation: "用流動寬度、可縮放圖片與 Flexbox 或 Grid 先完成窄版。viewport meta 讓行動瀏覽器以合理的 CSS 寬度呈現。畫面需要更多欄位時，透過 @media 選擇新的佈局。也要保留瀏覽器縮放能力。",
          practice: "做一張商品卡。在 DevTools 的 360 px 裝置模式切換 viewport meta，比較版面寬度。再加入以 48rem 為條件的兩欄樣式，觀察何時切換。",
        },
        followUp: { title: "跑版檢查", body: "手機測試時同時檢查橫向捲動、長文字、放大文字與鍵盤焦點。優先從撐寬容器的實際元素定位問題。" },
        reference: {
          label: "MDN Viewport meta",
          url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport",
        },
      },
      {
        level: 'intermediate',
        writtenExam: 9,
        prompt: "用語意化 HTML 和 CSS 寫出 Holy Grail 三欄版面，中間隨視窗寬度調整。",
        answer: "以 header、nav、main、aside、footer 分配頁面區塊。中段用 Grid 設定左右欄及 minmax(0, 1fr) 的中央欄。窄畫面時以 Media Query 改為單欄。",
        lesson: {
          explanation: "外層 Grid 讓頁首和頁尾用 auto，中段用 1fr。內層 Grid 把扣掉左右欄與間距後的空間給主要內容。中央欄用 minmax(0, 1fr)，搭配長文字換行，可降低內容的最小尺寸撐寬版面的機會。",
          practice: "將範例存為 HTML 檔，在寬與窄視窗測試。加入一條很長的網址，驗證中央欄會換行，並用鍵盤查看 HTML 順序是否合理。",
        },
        exampleLanguage: 'HTML / CSS',
        example: [
          "<!doctype html>",
          "<html lang=\"zh-Hant\">",
          "<head>",
          "  <meta charset=\"utf-8\">",
          "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
          "  <title>三欄佈局</title>",
          "  <style>",
          "    body { margin: 0; min-height: 100vh; display: grid;",
          "      grid-template-rows: auto 1fr auto; }",
          "    header, nav, main, aside, footer { padding: 1rem; }",
          "    .layout { display: grid;",
          "      grid-template-columns: 11rem minmax(0, 1fr) 11rem; }",
          "    main { overflow-wrap: anywhere; }",
          "    @media (max-width: 48rem) {",
          "      .layout { grid-template-columns: minmax(0, 1fr); }",
          "    }",
          "  </style>",
          "</head>",
          "<body>",
          "  <header>頁首</header>",
          "  <div class=\"layout\">",
          "    <nav aria-label=\"主要導覽\"><a href=\"#content\">閱讀內容</a></nav>",
          "    <main id=\"content\"><h1>主要內容</h1></main>",
          "    <aside>相關資訊</aside>",
          "  </div>",
          "  <footer>頁尾</footer>",
          "</body>",
          "</html>",
        ].join('\n'),
        reference: {
          label: "MDN Grid 欄軌設定",
          url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns",
        },
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
        writtenExam: 5,
        prompt: "用 Array.prototype.reduce 將員工清單整理成各部門的薪資總和。",
        answer: "以空物件為初始累加器，對每一筆員工以 department 當鍵。尚未有總額時從零開始，再加上當筆 salary。走完後回傳累加器，原陣列維持原值。",
        lesson: {
          explanation: "分組累加只需要走訪陣列一次。使用 Object.create(null) 建立累加器，可以避免部門名稱碰到從原型繼承的名稱。準備空的初始值，也能讓空陣列回傳空物件。此題假設薪資已驗證為有限數字。",
          practice: "執行範例，預期 Support 為 70000、Product 為 96000、Ops 為 36000。再測空陣列與相同部門的兩筆資料。",
        },
        example: [
          "function sumSalaryByDepartment(employees) {",
          "  return employees.reduce((totals, { department, salary }) => {",
          "    totals[department] = (totals[department] ?? 0) + salary;",
          "    return totals;",
          "  }, Object.create(null));",
          "}",
          "",
          "const employees = [",
          "  { department: 'Support', salary: 32000 },",
          "  { department: 'Product', salary: 42000 },",
          "  { department: 'Support', salary: 38000 },",
          "  { department: 'Product', salary: 54000 },",
          "  { department: 'Ops', salary: 36000 },",
          "];",
          "console.log(sumSalaryByDepartment(employees));",
        ].join('\n'),
        reference: {
          label: "MDN Array.prototype.reduce",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
        },
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
  written: practiceTopics.reduce((sum, topic) => sum + topic.questions.filter(question => question.writtenExam).length, 0),
  technical: practiceTopics.filter(topic => topic.kind === 'technical').reduce((sum, topic) => sum + topic.questions.length, 0),
  conversation: practiceTopics.find(topic => topic.kind === 'conversation')!.questions.length,
  exercise: practiceTopics.find(topic => topic.kind === 'exercise')!.questions.length,
}
