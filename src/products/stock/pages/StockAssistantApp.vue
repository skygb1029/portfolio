<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import StockAssistantWidget from '../components/StockAssistantWidget.vue'
import LineJoinCta from '../components/LineJoinCta.vue'
import { trackEvent } from '@/composables/useAnalytics'

onMounted(() => {
  trackEvent('app_stock_open', { product_id: 'stock' })
})
</script>

<template>
  <div class="min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
    <div class="mx-auto max-w-5xl px-3 py-6 sm:px-6 sm:py-8">
      <nav
        class="flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm"
        aria-label="麵包屑"
      >
        <RouterLink to="/" class="hover:text-emerald-400">Product Hub</RouterLink>
        <span aria-hidden="true">/</span>
        <RouterLink to="/product/stock-secretary" class="hover:text-emerald-400">
          AI 股票秘書
        </RouterLink>
        <span aria-hidden="true">/</span>
        <span class="text-slate-200">App</span>
      </nav>

      <header class="mt-4 border-b border-slate-800/80 pb-5 sm:mt-6 sm:pb-6">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">AI 股票秘書</h1>
        <p class="mt-2 text-sm text-slate-400">
          今日預測 · 關注標的 · AI 問答
        </p>
        <div class="mt-5">
          <LineJoinCta variant="dark" />
        </div>
      </header>

      <main class="py-5 sm:py-8">
        <StockAssistantWidget />
      </main>
    </div>
  </div>
</template>
