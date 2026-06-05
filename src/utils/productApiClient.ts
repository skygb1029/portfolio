import type { ProductRegistryEntry } from '@/data/products'
import { postJson } from '@/utils/apiClient'

export type ProductApiSource = 'product-api' | 'hub-fallback'

export interface ProductApiResult<T> {
  data: T
  source: ProductApiSource
}

function buildUrl(base: string, path: string): string {
  const root = base.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${root}${p}`
}

/**
 * 優先呼叫產品 apiUrl；失敗時改走 Hub 同源 API（避免 CORS / 未上線）。
 */
export async function callProductPreviewApi<T>(
  entry: ProductRegistryEntry,
  input: string,
): Promise<ProductApiResult<T>> {
  const preview = entry.preview
  if (!preview) {
    throw new Error('此產品未設定預覽 API')
  }

  const body = { [preview.bodyKey]: input.trim() }
  const method = preview.method ?? 'POST'

  if (entry.apiUrl) {
    try {
      const url = buildUrl(entry.apiUrl, preview.endpoint)
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: method === 'POST' ? JSON.stringify(body) : undefined,
      })
      if (res.ok) {
        return { data: (await res.json()) as T, source: 'product-api' }
      }
    } catch {
      /* 外部 API 不可用，改 Hub 備援 */
    }
  }

  const data = await postJson<T>(preview.hubFallbackPath, body)
  return { data, source: 'hub-fallback' }
}
