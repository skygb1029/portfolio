<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { fetchPhase8Progress, type Phase8Progress } from '@/products/stock/services/stockApi'

const progress = ref<Phase8Progress | null>(null)
const loading = ref(true)

const rows = computed(() => {
  const p = progress.value
  if (!p) return []
  return [
    { label: '提問數', current: p.questions.current, target: p.questions.target, percent: p.questions.percent },
    { label: '使用者', current: p.users.current, target: p.users.target, percent: p.users.percent },
    { label: 'Feedback', current: p.feedback.current, target: p.feedback.target, percent: p.feedback.percent },
  ]
})

onMounted(async () => {
  try {
    progress.value = await fetchPhase8Progress()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="section-padding border-t border-zinc-200/60 dark:border-zinc-800/60">
    <div class="mx-auto max-w-6xl">
      <div class="glow-border rounded-2xl border border-zinc-200/80 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-8">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-2xl">
            Beta 測試進度
          </h2>
          <span
            v-if="progress?.phase8BReady"
            class="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
          >
            Phase 8B Ready
          </span>
        </div>

        <div v-if="loading" class="mt-6 space-y-4">
          <div v-for="i in 3" :key="i" class="h-10 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        </div>

        <div v-else class="mt-6 space-y-5">
          <div v-for="row in rows" :key="row.label">
            <div class="mb-1.5 flex items-center justify-between text-sm">
              <span class="font-medium text-zinc-700 dark:text-zinc-300">{{ row.label }}</span>
              <span class="tabular-nums text-zinc-600 dark:text-zinc-400">
                {{ row.current }} / {{ row.target }}
                <span class="ml-2 text-xs text-zinc-500">({{ row.percent }}%)</span>
              </span>
            </div>
            <div class="h-2.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                class="h-full rounded-full bg-emerald-500 transition-all duration-500"
                :style="{ width: `${row.percent}%` }"
              />
            </div>
          </div>

          <p class="text-xs text-zinc-500">
            目標：提問 ≥100、使用者 ≥10、Feedback ≥20 — 達標後進入 Phase 8B
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
