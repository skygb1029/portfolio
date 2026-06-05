/**
 * 平台能力開關（預留）。
 * 各模組實作完成後改為 true，並接上對應 provider。
 */
export interface PlatformCapabilities {
  sso: boolean
  authCenter: boolean
  subscription: boolean
  billing: boolean
  usageDashboard: boolean
}

export const platformCapabilities: PlatformCapabilities = {
  sso: false,
  authCenter: false,
  subscription: false,
  billing: false,
  usageDashboard: false,
}
