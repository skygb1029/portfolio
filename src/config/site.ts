export const siteConfig = {
  name: 'Jr Jim',
  logo: 'JR JIM',
  brand: 'Jr Jim AI Product Hub',
  productHub: 'Jr Jim Product Hub',
  title: 'Frontend Engineer × AI Product Builder',
  jobTitle: 'Frontend Engineer',
  alternateName: 'AI Product Builder',
  footerTagline: 'Building AI Products & SaaS Solutions',
  roles: ['Frontend Engineer', 'AI Product Builder', 'SaaS Founder'],
  email: 'skygb1029@gmail.com',
  github: 'skygb1029',
  githubUrl: 'https://github.com/skygb1029',
  siteUrl: 'https://portfolio.vercel.app',
  calendlyUrl: 'mailto:skygb1029@gmail.com?subject=Jr Jim - 預約討論',
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
