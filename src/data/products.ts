/**
 * Product Registry — 所有 AI 產品的統一註冊表。
 * Product Hub 透過此檔對接各產品網站與 API。
 */
export type ProductRegistryStatus = 'mvp' | 'beta' | 'released' | 'planned'
export type ProductMountMode = 'internal' | 'external'

export interface ProductPreviewConfig {
  /** 相對於 apiUrl 的路徑，例如 /demo/stock */
  endpoint: string
  method?: 'POST' | 'GET'
  /** 請求 body 的欄位名稱 */
  bodyKey: string
  sampleInput: string
  inputLabel: string
  placeholder?: string
  /** 外部 API 不可用時，Hub 同源備援路徑 */
  hubFallbackPath: string
}

export interface ProductRegistryEntry {
  id: string
  /** 對應 /product/:slug */
  slug: string
  name: string
  description: string
  status: ProductRegistryStatus
  websiteUrl?: string
  apiUrl?: string
  icon: string
  /** Hub 內嵌 App 路徑，例如 /app/stock */
  appBasePath?: string
  mountMode?: ProductMountMode
  preview?: ProductPreviewConfig
}

export const productRegistry: ProductRegistryEntry[] = [
  {
    id: 'stock',
    slug: 'stock-secretary',
    name: 'AI 股票秘書',
    description: '每日晨報、ETF 追蹤與個股分析，透過 LINE 直達。',
    status: 'beta',
    websiteUrl: 'https://stock.jrjim.ai',
    apiUrl: 'https://stock-api.jrjim.ai',
    appBasePath: '/app/stock',
    mountMode: 'internal',
    icon: '📈',
    preview: {
      endpoint: '/demo/stock',
      method: 'POST',
      bodyKey: 'symbol',
      sampleInput: '0050',
      inputLabel: '股票代號',
      placeholder: '0050、00919、2330',
      hubFallbackPath: '/api/demo/stock',
    },
  },
  {
    id: 'parenting',
    slug: 'parenting-assistant',
    name: 'AI 育兒助手',
    description: '自然語言記錄喝奶、睡眠、體溫，自動提醒不遺漏。',
    status: 'beta',
    websiteUrl: 'https://parenting.jrjim.ai',
    apiUrl: 'https://parenting-api.jrjim.ai',
    icon: '👶',
    preview: {
      endpoint: '/demo/parenting',
      method: 'POST',
      bodyKey: 'input',
      sampleInput: '喝奶120',
      inputLabel: '輸入內容',
      placeholder: '喝奶120、睡著了、38.2度',
      hubFallbackPath: '/api/demo/parenting',
    },
  },
  {
    id: 'cs',
    slug: 'sales-assistant',
    name: 'AI 客服業務小能手',
    description: '多平台客服整合、AI 自動回覆與 CRM 追蹤。',
    status: 'mvp',
    websiteUrl: 'https://sales.jrjim.ai',
    apiUrl: 'https://sales-api.jrjim.ai',
    icon: '💬',
    preview: {
      endpoint: '/demo/customer-service',
      method: 'POST',
      bodyKey: 'input',
      sampleInput: '請問價格多少？',
      inputLabel: '客戶訊息',
      placeholder: '請問價格多少？',
      hubFallbackPath: '/api/demo/customer-service',
    },
  },
]

const byId = new Map(productRegistry.map((p) => [p.id, p]))
const bySlug = new Map(productRegistry.map((p) => [p.slug, p]))

export function getProductById(id: string): ProductRegistryEntry | undefined {
  return byId.get(id)
}

export function getProductBySlug(slug: string): ProductRegistryEntry | undefined {
  return bySlug.get(slug)
}

export function hasInternalApp(entry: ProductRegistryEntry): boolean {
  return entry.mountMode === 'internal' && !!entry.appBasePath?.trim()
}

export function hasWebsite(entry: ProductRegistryEntry): boolean {
  return !!entry.websiteUrl?.trim()
}

export function hasApiPreview(entry: ProductRegistryEntry): boolean {
  return !!entry.apiUrl?.trim() && !!entry.preview
}
