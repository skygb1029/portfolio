<script setup lang="ts">
import type { WebMorningValidation } from '../services/stockApi'

defineProps<{
  data: WebMorningValidation | null
  loading: boolean
  error: string | null
}>()

function verdictClass(verdict: string | null | undefined): string {
  if (!verdict) return 'text-slate-400'
  if (verdict.includes('成功')) return 'text-emerald-400'
  if (verdict.includes('略過') || verdict.includes('尚無')) return 'text-amber-300'
  return 'text-rose-400'
}
</script>

<template>
  <section class="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-5 shadow-lg">
    <header class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-white">晨報驗證</h2>
      <span v-if="data?.predictionDate" class="text-xs text-slate-400">
        驗證日 {{ data.predictionDate }}
      </span>
    </header>

    <div v-if="loading" class="grid gap-3 sm:grid-cols-4 animate-pulse">
      <div v-for="n in 4" :key="n" class="h-16 rounded bg-slate-800" />
    </div>

    <p v-else-if="error" class="text-sm text-rose-300">{{ error }}</p>

    <div v-else-if="data" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg bg-slate-800/50 p-3">
        <p class="text-xs text-slate-400">昨日預測</p>
        <p class="mt-1 text-lg font-semibold text-white">
          {{ data.predictedDirection ?? '—' }}
        </p>
      </div>
      <div class="rounded-lg bg-slate-800/50 p-3">
        <p class="text-xs text-slate-400">實際</p>
        <p class="mt-1 text-lg font-semibold text-white">
          {{ data.actualResult ?? '—' }}
        </p>
      </div>
      <div class="rounded-lg bg-slate-800/50 p-3">
        <p class="text-xs text-slate-400">結果</p>
        <p class="mt-1 text-lg font-semibold" :class="verdictClass(data.verdict)">
          {{ data.verdict ?? '—' }}
        </p>
      </div>
      <div class="rounded-lg bg-slate-800/50 p-3">
        <p class="text-xs text-slate-400">成功率</p>
        <p class="mt-1 text-lg font-semibold text-emerald-400">
          {{ data.successRatePercent != null ? `${data.successRatePercent}%` : '—' }}
        </p>
        <p v-if="data.topicCount > 0" class="mt-1 text-xs text-slate-500">
          {{ data.alignedCount }}/{{ data.topicCount }} 主線命中
        </p>
      </div>
    </div>

    <p v-if="data?.note && !loading" class="mt-3 text-sm text-slate-400">
      {{ data.note }}
    </p>
  </section>
</template>
