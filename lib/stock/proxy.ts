const DEFAULT_STOCK_API_HOST = 'https://stock-api.jrjim.ai'

export function getStockUpstreamBase(): string {
  const host = (
    process.env.STOCK_API_URL ??
    process.env.VITE_STOCK_API_URL ??
    DEFAULT_STOCK_API_HOST
  ).replace(/\/$/, '')
  return `${host}/api/web`
}

export function buildStockUpstreamUrl(subPath: string): string {
  const base = getStockUpstreamBase()
  const path = subPath.startsWith('/') ? subPath : `/${subPath}`
  return `${base}${path}`
}
