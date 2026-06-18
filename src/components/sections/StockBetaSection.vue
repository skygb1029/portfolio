<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  fetchFeedbackSummary,
  fetchUsageStats,
  type FeedbackSummary,
  type UsageStats,
} from '@/products/stock/services/stockApi'
import { trackEvent } from '@/composables/useAnalytics'
import LineJoinCta from '@/products/stock/components/LineJoinCta.vue'

const usage = ref<UsageStats | null>(null)
const feedback = ref<FeedbackSummary | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const [u, f] = await Promise.allSettled([
      fetchUsageStats(),
      fetchFeedbackSummary(),
    ])
    if (u.status === 'fulfilled') usage.value = u.value
    if (f.status === 'fulfilled') feedback.value = f.value
  } finally {
    loading.value = false
  }
})

function onBetaClick(): void {
  trackEvent('cta_stock_beta_home', { product_id: 'stock' })
}
</script>

<template>
  <section
    class="section-padding border-t border-zinc-200/60 bg-gradient-to-b from-emerald-500/5 to-transparent dark:border-zinc-800/60"
  >
    <div class="mx-auto max-w-6xl">
      <div
        class="glow-border overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/80 dark:bg-zinc-900/80"
      >
        <div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
          <div class="space-y-6">
            <LineJoinCta />
            <div>
            <span
              class="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
            >
              <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Beta 開放中
            </span>
            <h2 class="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              AI 股票秘書 Beta
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              免費使用、無需登入。今日預測、關注標的與 AI 問答，支援 0050、00919、00878、2330 等。
            </p>
            <RouterLink
              to="/app/stock"
              class="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              @click="onBetaClick"
            >
              立即體驗
            </RouterLink>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
              <p class="text-xs font-medium uppercase tracking-wide text-zinc-500">
                使用統計
              </p>
              <div v-if="loading" class="mt-3 h-16 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
              <dl v-else class="mt-3 space-y-2 text-sm">
                <div class="flex justify-between">
                  <dt class="text-zinc-500">總提問數</dt>
                  <dd class="font-semibold text-zinc-900 dark:text-zinc-100">
                    {{ usage?.totalQuestions ?? 0 }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-zinc-500">今日提問</dt>
                  <dd class="font-semibold text-zinc-900 dark:text-zinc-100">
                    {{ usage?.todayQuestions ?? 0 }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-zinc-500">近 7 日</dt>
                  <dd class="font-semibold text-zinc-900 dark:text-zinc-100">
                    {{ usage?.last7DaysQuestions ?? 0 }}
                  </dd>
                </div>
              </dl>
            </div>

            <div class="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
              <p class="text-xs font-medium uppercase tracking-wide text-zinc-500">
                使用者回饋（最近 30 筆）
              </p>
              <div v-if="loading" class="mt-3 h-16 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
              <div v-else class="mt-3">
                <div class="flex gap-4 text-sm">
                  <span class="text-emerald-600 dark:text-emerald-400">
                    👍 {{ feedback?.positivePercent ?? 0 }}%
                  </span>
                  <span class="text-rose-600 dark:text-rose-400">
                    👎 {{ feedback?.negativePercent ?? 0 }}%
                  </span>
                </div>
                <ul
                  v-if="feedback?.recent?.length"
                  class="mt-3 max-h-40 space-y-1 overflow-y-auto text-xs text-zinc-500"
                >
                  <li
                    v-for="item in feedback.recent"
                    :key="item.timestamp + item.question"
                    class="truncate"
                  >
                    {{ item.rating === 'helpful' ? '👍' : '👎' }}
                    {{ item.question }}
                  </li>
                </ul>
                <p v-else class="mt-3 text-xs text-zinc-400">尚無回饋，歡迎試用後評價</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
