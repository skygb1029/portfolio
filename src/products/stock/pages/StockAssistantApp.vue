<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import StockAssistantWidget from '../components/StockAssistantWidget.vue'
import {
  fetchApiVersion,
  getStockApiBaseUrl,
  type WebApiVersion,
} from '../services/stockApi'
import { trackEvent } from '@/composables/useAnalytics'

const apiVersion = ref<WebApiVersion | null>(null)
const versionError = ref<string | null>(null)

onMounted(() => {
  trackEvent('app_stock_open', { product_id: 'stock' })
  fetchApiVersion()
    .then((v) => {
      apiVersion.value = v
    })
    .catch((e) => {
      versionError.value = e instanceof Error ? e.message : '無法取得 API 版本'
    })
})
</script>

<template>
  <div class="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
    <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <nav class="flex flex-wrap items-center gap-2 text-sm text-slate-400" aria-label="麵包屑">
        <RouterLink to="/" class="hover:text-emerald-400">Product Hub</RouterLink>
        <span aria-hidden="true">/</span>
        <RouterLink
          to="/product/stock-secretary"
          class="hover:text-emerald-400"
        >
          AI 股票秘書
        </RouterLink>
        <span aria-hidden="true">/</span>
        <span class="text-slate-200">App</span>
      </nav>

      <header class="mt-6 border-b border-slate-800/80 pb-6">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-xs font-medium text-emerald-400/90">Fact-Based Market Intelligence</p>
            <h1 class="mt-1 text-3xl font-bold tracking-tight">AI 股票秘書</h1>
            <p class="mt-2 text-sm text-slate-400">
              晨報 · Fact Readiness · 驗證 · AI 對話 — 資料來自獨立 Stock API
            </p>
          </div>
          <div class="text-right font-mono text-[10px] text-slate-500">
            <p>{{ getStockApiBaseUrl() }}</p>
            <p v-if="apiVersion" class="mt-1 text-emerald-500/80">
              API {{ apiVersion.version }} · build {{ apiVersion.buildVersion }}
            </p>
            <p v-else-if="versionError" class="mt-1 text-amber-400/80">
              {{ versionError }}
            </p>
          </div>
        </div>
      </header>

      <main class="py-8">
        <StockAssistantWidget />
      </main>
    </div>
  </div>
</template>
