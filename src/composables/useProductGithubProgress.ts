import { ref, watch, type Ref } from 'vue'
import { getJson } from '@/utils/apiClient'

export interface ProductProgress {
  productId: string
  currentVersion: string
  latestRelease: { tag: string; name: string; publishedAt: string; summary: string } | null
  recentUpdates: { tag: string; name: string; date: string }[]
  roadmap: { status: string; title: string }[]
}

export function useProductGithubProgress(productId: Ref<string> | string) {
  const progress = ref<ProductProgress | null>(null)
  const loading = ref(false)

  async function load(id: string) {
    if (!id) return
    loading.value = true
    try {
      progress.value = await getJson<ProductProgress>(
        `/api/github/product-progress?product=${encodeURIComponent(id)}`,
      )
    } catch {
      progress.value = null
    } finally {
      loading.value = false
    }
  }

  if (typeof productId === 'string') {
    load(productId)
  } else {
    watch(productId, (id) => load(id), { immediate: true })
  }

  return { progress, loading, reload: () => load(typeof productId === 'string' ? productId : productId.value) }
}
