/**
 * 平台模組 ID — 未來實作時依此掛載。
 * 目前僅定義契約，不包含執行邏輯。
 */

export const PlatformModule = {
  SSO: 'sso',
  AUTH_CENTER: 'auth-center',
  SUBSCRIPTION: 'subscription',
  BILLING: 'billing',
  USAGE_DASHBOARD: 'usage-dashboard',
} as const

export type PlatformModuleId = (typeof PlatformModule)[keyof typeof PlatformModule]

/** SSO — 跨產品單一登入（預留） */
export interface SsoConfig {
  issuerUrl?: string
  clientId?: string
}

/** Auth Center — 帳號、角色、API Key（預留） */
export interface AuthCenterConfig {
  baseUrl?: string
}

/** Subscription — 方案與權益（預留） */
export interface SubscriptionPlan {
  id: string
  productId: string
  name: string
}

/** Billing — 付款與發票（預留） */
export interface BillingConfig {
  provider?: 'stripe' | 'ecpay' | 'manual'
}

/** Usage Dashboard — 各產品 API 用量（預留） */
export interface UsageMetric {
  productId: string
  period: string
  calls: number
}

export interface PlatformModuleConfig {
  sso?: SsoConfig
  authCenter?: AuthCenterConfig
  billing?: BillingConfig
}

/** 集中設定入口，部署時注入環境變數 */
export const platformModuleConfig: PlatformModuleConfig = {}
