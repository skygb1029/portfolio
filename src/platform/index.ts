/**
 * Jr Jim Multi-Product Platform Layer
 *
 * Product Hub 為統一入口；各產品透過 Product Registry 對接。
 * 以下模組預留架構，暫不實作：
 * - SSO
 * - Auth Center
 * - Subscription
 * - Billing
 * - Usage Dashboard
 */
export { platformCapabilities, type PlatformCapabilities } from './capabilities'
export {
  PlatformModule,
  platformModuleConfig,
  type PlatformModuleId,
  type SsoConfig,
  type AuthCenterConfig,
  type SubscriptionPlan,
  type BillingConfig,
  type UsageMetric,
  type PlatformModuleConfig,
} from './modules'
