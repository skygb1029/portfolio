<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { getProductById, hasApiPreview } from '@/data/products'
import { callProductPreviewApi } from '@/utils/productApiClient'
import { trackEvent } from '@/composables/useAnalytics'

const props = defineProps<{
  productId: string
  open: boolean
}>()

const emit = defineEmits<{ close: [] }>()

const registry = computed(() => getProductById(props.productId))
const preview = computed(() => registry.value?.preview)
const input = ref('')
const loading = ref(false)
const error = ref('')
const source = ref<'product-api' | 'hub-fallback' | null>(null)
const resultJson = ref('')

const canRun = computed(() => registry.value && hasApiPreview(registry.value))

function initInput() {
  if (preview.value) input.value = preview.value.sampleInput
}

async function runPreview() {
  const entry = registry.value
  if (!entry || !preview.value) return
  error.value = ''
  loading.value = true
  source.value = null
  resultJson.value = ''
  try {
    const { data, source: src } = await callProductPreviewApi<Record<string, unknown>>(
      entry,
      input.value,
    )
    source.value = src
    resultJson.value = JSON.stringify(data, null, 2)
    trackEvent('product_preview', { product_id: entry.id, api_source: src })
  } catch (e) {
    error.value = e instanceof Error ? e.message : '預覽請求失敗'
  } finally {
    loading.value = false
  }
}

watch(
  () => props.open,
  (v) => {
    if (v) {
      initInput()
      error.value = ''
      resultJson.value = ''
      source.value = null
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    v-if="open && canRun && registry"
    class="mt-8 rounded-2xl border border-violet-300/60 bg-violet-50/40 p-6 dark:border-violet-800 dark:bg-violet-950/20"
  >
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-400">
          產品預覽模式
        </p>
        <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          直接呼叫 <code class="text-xs">{{ registry.apiUrl }}</code>
          <span v-if="preview"> → {{ preview.endpoint }}</span>
        </p>
      </div>
      <button
        type="button"
        class="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        @click="emit('close')"
      >
        關閉
      </button>
    </div>

    <label v-if="preview" class="mt-4 block text-xs font-medium text-zinc-500">
      {{ preview.inputLabel }}
    </label>
    <div class="mt-2 flex flex-wrap gap-2">
      <input
        v-model="input"
        type="text"
        :placeholder="preview?.placeholder"
        class="min-w-[200px] flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        @keyup.enter="runPreview"
      />
      <button
        type="button"
        class="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-500 disabled:opacity-60"
        :disabled="loading"
        @click="runPreview"
      >
        {{ loading ? '呼叫中…' : '呼叫 API' }}
      </button>
    </div>

    <p v-if="error" class="mt-3 text-sm text-red-500">{{ error }}</p>
    <p v-if="source" class="mt-3 text-xs text-zinc-500">
      資料來源：{{ source === 'product-api' ? '產品 API' : 'Hub 備援 API' }}
    </p>
    <pre
      v-if="resultJson"
      class="mt-4 max-h-80 overflow-auto rounded-xl bg-zinc-900 p-4 text-xs text-emerald-300"
    >{{ resultJson }}</pre>
  </div>
</template>
