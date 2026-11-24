<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import ParentingAssistantWidget from '../components/ParentingAssistantWidget.vue'
import { trackEvent } from '@/composables/useAnalytics'

onMounted(() => {
  trackEvent('app_parenting_open', { product_id: 'parenting' })
})
</script>

<template>
  <div class="min-h-dvh bg-gradient-to-b from-rose-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
    <div class="mx-auto max-w-3xl px-3 py-6 sm:px-6 sm:py-8">
      <nav
        class="flex flex-wrap items-center gap-2 text-xs text-zinc-500 sm:text-sm"
        aria-label="麵包屑"
      >
        <RouterLink to="/" class="hover:text-rose-600">Product Hub</RouterLink>
        <span aria-hidden="true">/</span>
        <RouterLink to="/product/parenting-assistant" class="hover:text-rose-600">
          AI 育兒助手
        </RouterLink>
        <span aria-hidden="true">/</span>
        <span class="text-zinc-700 dark:text-zinc-200">App</span>
      </nav>

      <header class="mt-4 border-b border-zinc-200 pb-5 dark:border-zinc-800 sm:mt-6 sm:pb-6">
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          AI 育兒助手
        </h1>
        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          記錄餵奶、換尿布與睡眠，回看今天的照護時間軸。
        </p>
      </header>

      <main class="py-5 sm:py-8">
        <ParentingAssistantWidget />
      </main>
    </div>
  </div>
</template>
