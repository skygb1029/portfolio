import { blogPosts } from './blog'
import { noteDetails } from './noteDetails'
import { frontendWorks } from './frontendWorks'
import { publicProductLandings } from './productLandings'

export const portfolioOrigin = 'https://jrjim-portfolio.vercel.app'
const commonImage = '/case-previews/iboxpost.jpg'

export const publicPages = [
  { path: '/', title: 'JR JIM｜許智鈞的前端工程作品集', description: '許智鈞的前端工程作品集。瀏覽企業系統、AI 產品、技術筆記與完整履歷。' },
  { path: '/works', title: '前端作品案例｜JR JIM', description: '瀏覽 Demi Studio、IBoxPost、DAYFORM 電商、醫療影像與血液透析排班等前端案例及操作入口。' },
  { path: '/products', title: 'AI 產品｜JR JIM', description: '探索 AI 股票秘書的證交所收盤行情、晨報分析與問答功能。' },
  { path: '/articles', title: '相關筆記｜JR JIM', description: '閱讀 Vue 3、LINE Bot、AI 產品與前端系統整合的實作筆記，包含 Live2D 和 WebSocket。' },
  { path: '/interview-practice', title: '前端面試練習｜JR JIM', description: '按主題與初階、中階、高階複習 Vue、Nuxt、JavaScript、CSS、網站效能與面談。每題附短答、教學與練習，另有兩種 MP3 版本。' },
  { path: '/resume', title: '關於與履歷｜許智鈞', description: '許智鈞的工作經歷、前端技術、跨團隊整合經驗及代表專案。' },
  { path: '/privacy', title: 'GA4 報表隱私權政策｜JR JIM', description: '了解 Portfolio 流量報表如何存取與處理 Google Analytics 資料，以及如何撤銷授權。' },
  { path: '/contact', title: '聯絡合作｜JR JIM', description: '洽詢企業前端系統、管理後台、資料視覺化、前端重構與 API 整合。' },
  ...frontendWorks.map(work => ({ path: '/works/' + work.slug, title: work.title + '｜前端作品｜JR JIM', description: work.summary + ' 查看負責的前端功能、專案心得及操作入口。', image: '/case-previews/' + work.slug + '.jpg' })),
  ...publicProductLandings.map(product => ({ path: '/product/' + product.slug, title: product.title + '｜JR JIM', description: product.tagline + ' 查看產品功能、操作流程、常見問題與使用方式。' })),
  ...blogPosts.map(post => {
    const detail = noteDetails[post.id]
    const image = detail ? detail.image ?? '/article-images/' + post.id + '-flow.jpg' : commonImage
    return { path: '/articles/' + post.id, title: post.title + '｜JR JIM', description: post.excerpt, article: true, image }
  }),
].map(page => ({ image: commonImage, article: false, ...page }))
