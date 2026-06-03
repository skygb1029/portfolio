export const siteConfig = {
  name: '許智鈞',
  brand: '許智鈞 AI Product Hub',
  title: 'Frontend Engineer × AI Product Builder',
  tagline: '沒有擊敗我的，都將成為我的養料',
  roles: ['Frontend Engineer', 'AI Product Builder', 'SaaS Founder'],
  email: 'skygb1029@gmail.com',
  github: 'skygb1029',
  githubUrl: 'https://github.com/skygb1029',
  siteUrl: 'https://portfolio.vercel.app',
  calendlyUrl: 'mailto:skygb1029@gmail.com?subject=預約討論',
  /** Google Form — 替換為你的表單 ID 與 entry 欄位 */
  waitlist: {
    formAction: import.meta.env.VITE_WAITLIST_FORM_ACTION ?? '',
    entryName: import.meta.env.VITE_WAITLIST_ENTRY_NAME ?? '',
    entryEmail: import.meta.env.VITE_WAITLIST_ENTRY_EMAIL ?? '',
    entryProduct: import.meta.env.VITE_WAITLIST_ENTRY_PRODUCT ?? '',
  },
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID ?? '',
    clarityId: import.meta.env.VITE_CLARITY_PROJECT_ID ?? '',
  },
} as const

export const personalTraits = [
  '協調能力',
  '團隊合作',
  '自我學習',
  '獨立開發',
  '問題解決',
  '樂於助人',
] as const
