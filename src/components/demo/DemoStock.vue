<script setup lang="ts">
import { ref } from 'vue'
import { postJson } from '@/utils/apiClient'
import { trackEvent } from '@/composables/useAnalytics'

const input = ref('0050')
const loading = ref(false)
const error = ref('')

interface StockApiResult {
  symbol: string
  name: string
  direction: string
  probability: number
  reasons: string[]
  risks: string[]
  etfFlow: string
  marketContext: string
  disclaimer: string
}

const result = ref<StockApiResult | null>(null)

async function analyze() {
  error.value = ''
  loading.value = true
  result.value = null
  try {
    result.value = await postJson<StockApiResult>('/api/demo/stock', {
      symbol: input.value.trim(),
    })
    trackEvent('demo_stock', { symbol: result.value.symbol })
  } catch (e) {
    error.value = e instanceof Error ? e.message : '分析失敗'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="glow-border rounded-2xl p-6">
    <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-50">股票秘書 Demo</h3>
    <p class="mt-1 text-sm text-zinc-500">輸入代號（0050、00919、2330）— 由 API 回傳 AI 分析格式</p>
    <div class="mt-4 flex gap-2">
      <input
        v-model="input"
        type="text"
        placeholder="0050"
        class="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm uppercase dark:border-zinc-700 dark:bg-zinc-900"
        @keyup.enter="analyze"
      />
      <button
        type="button"
        class="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
        :disabled="loading"
        @click="analyze"
      >
        {{ loading ? '分析中…' : '分析' }}
      </button>
    </div>
    <p v-if="error" class="mt-3 text-sm text-red-500">{{ error }}</p>
    <div v-if="result" class="mt-6 space-y-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900/50">
      <div class="flex flex-wrap items-center gap-2">
        <p class="text-sm font-medium text-indigo-600">{{ result.name }} ({{ result.symbol }})</p>
        <span
          class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
          :class="
            result.direction === '偏多'
              ? 'bg-emerald-500/15 text-emerald-700'
              : result.direction === '偏空'
                ? 'bg-rose-500/15 text-rose-700'
                : 'bg-zinc-500/15 text-zinc-600'
          "
        >
          {{ result.direction }}
        </span>
        <span class="text-xs text-zinc-500">上漲機率 {{ result.probability }}%</span>
      </div>
      <div>
        <p class="text-xs font-semibold text-zinc-500 uppercase">原因</p>
        <ul class="mt-1 list-inside list-disc text-sm text-zinc-700 dark:text-zinc-300">
          <li v-for="(r, i) in result.reasons" :key="i">{{ r }}</li>
        </ul>
      </div>
      <div>
        <p class="text-xs font-semibold text-zinc-500 uppercase">風險</p>
        <ul class="mt-1 list-inside list-disc text-sm text-zinc-700 dark:text-zinc-300">
          <li v-for="(r, i) in result.risks" :key="i">{{ r }}</li>
        </ul>
      </div>
      <div>
        <p class="text-xs font-semibold text-zinc-500 uppercase">ETF 資金流</p>
        <p class="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{{ result.etfFlow }}</p>
      </div>
      <div>
        <p class="text-xs font-semibold text-zinc-500 uppercase">市場脈絡</p>
        <p class="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{{ result.marketContext }}</p>
      </div>
      <p class="text-[10px] text-zinc-400">{{ result.disclaimer }}</p>
    </div>
  </div>
</template>
