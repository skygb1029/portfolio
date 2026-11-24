import { ref } from 'vue'
import { list as news } from '@/components/data/news'
import { list as faq, text as faqText } from '@/components/data/faq'

const extraQuestions = [
  ['1', '寄件前需要準備什麼？', '請準備已包裝的包裹，確認收件資訊，再建立寄件單。'],
  ['2', '到郵箱後如何取件？', '依取件通知前往指定郵箱，再依畫面輸入取件資訊。'],
  ['3', '尚未收到取件簡訊怎麼辦？', '先確認郵件狀態和填寫的手機號碼。'],
  ['4', '會員可以在哪裡查看紀錄？', '登入後可從會員中心查看寄件與點數紀錄。'],
  ['5', '郵箱操作中斷怎麼辦？', '記下郵箱位置與畫面提示，透過服務管道詢問。'],
  ['6', '可以在展示版使用代收貨款嗎？', '此功能未開放，請勿輸入帳戶資料。'],
]

export const categories = faqText.selectList
export const initialContent = {
  news: news.map((item, index) => ({ id: index + 1, title: item.title, date: item.date.replaceAll('/', '-'), img: item.img, body: item.body, visible: true })),
  faq: [...faq.map(item => ['0', item.title, item.text.replaceAll('/n', '\n').trim()]), ...extraQuestions]
    .map(([category, title, body], index) => ({ id: index + 1, category, title, body, visible: true })),
  home: { newsTitle: '最新消息', newsIntro: '不定期更新發布最新消息之外，更多優惠活動在此公告，記得點閱瀏覽。', showNews: true, rotateBanners: true },
}

const key = 'public-demo:iboxpost:website-content:v1'
function read() {
  try {
    const stored = JSON.parse(localStorage.getItem(key))
    if (Array.isArray(stored?.news) && Array.isArray(stored?.faq) && stored?.home) return stored
  } catch {
    // Fall back to the bundled showcase data.
  }
  return initialContent
}

export const content = ref(read())
window.addEventListener('storage', event => {
  if (event.key === key || event.key === null) content.value = read()
})

export function saveContent(section, value) {
  const next = { ...read(), [section]: value }
  localStorage.setItem(key, JSON.stringify(next))
  content.value = next
}

export const visibleNews = () => content.value.news.filter(item => item.visible).sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
