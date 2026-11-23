<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { fetchLineJoinInfo, type LineJoinInfo } from '../services/stockApi'
import { trackEvent } from '@/composables/useAnalytics'

const props = withDefaults(
  defineProps<{
    variant?: 'light' | 'dark'
    compact?: boolean
  }>(),
  {
    variant: 'light',
    compact: false,
  },
)

const info = ref<LineJoinInfo | null>(null)
const envUrl = import.meta.env.VITE_STOCK_LINE_URL?.trim()

const joinUrl = computed(() =>
  info.value?.url?.trim() || envUrl || 'https://line.me/R/ti/p/@072swhdz',
)
const benefits = computed(() => info.value?.benefits ?? [
  '無需登入',
  '免費使用',
  '每日晨報',
  '個股分析',
  'ETF 分析',
])

onMounted(async () => {
  try {
    info.value = await fetchLineJoinInfo()
  } catch {
    /* fallback to env URL */
  }
})

function onJoinClick(): void {
  trackEvent('cta_line_join', { product_id: 'stock' })
}
</script>

<template>
  <div
    class="rounded-2xl border p-5 sm:p-6"
    :class="
      variant === 'dark'
        ? 'border-emerald-500/30 bg-emerald-500/10'
        : 'border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5'
    "
  >
    <div
      class="flex flex-col gap-4"
      :class="compact ? '' : 'sm:flex-row sm:items-center sm:justify-between'"
    >
      <div class="min-w-0 flex-1">
        <h3
          class="text-lg font-bold sm:text-xl"
          :class="variant === 'dark' ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'"
        >
          加入 LINE 免費體驗
        </h3>
        <ul
          class="mt-3 flex flex-wrap gap-2"
          :class="compact ? 'text-xs' : 'text-sm'"
        >
          <li
            v-for="item in benefits"
            :key="item"
            class="rounded-full px-3 py-1"
            :class="
              variant === 'dark'
                ? 'bg-slate-800/80 text-slate-200'
                : 'bg-white/80 text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300'
            "
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <a
        :href="joinUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#06C755] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#05b34c]"
        @click="onJoinClick"
      >
        加入 LINE
      </a>
    </div>
  </div>
</template>
