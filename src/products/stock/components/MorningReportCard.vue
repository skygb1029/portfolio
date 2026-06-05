<script setup lang="ts">
import type { WebMorningReport } from '../services/stockApi'

defineProps<{
  data: WebMorningReport | null
  loading: boolean
  error: string | null
}>()

function directionColor(direction: string): string {
  if (direction === '偏多') return 'text-emerald-400'
  if (direction === '偏空') return 'text-rose-400'
  return 'text-amber-300'
}
</script>

<template>
  <section class="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-5 shadow-lg">
    <header class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-white">今日晨報</h2>
      <span v-if="data?.date" class="text-xs text-slate-400">{{ data.date }}</span>
    </header>

    <div v-if="loading" class="space-y-3 animate-pulse">
      <div class="h-8 rounded bg-slate-800" />
      <div class="h-4 rounded bg-slate-800" />
      <div class="h-4 w-2/3 rounded bg-slate-800" />
    </div>

    <p v-else-if="error" class="text-sm text-rose-300">{{ error }}</p>

    <div v-else-if="data" class="space-y-4">
      <div class="flex flex-wrap items-end gap-4">
        <div>
          <p class="text-xs uppercase tracking-wide text-slate-400">市場方向</p>
          <p class="text-2xl font-bold" :class="directionColor(data.direction)">
            {{ data.direction }}
          </p>
          <p class="text-sm text-slate-400">{{ data.status }}</p>
        </div>
        <div class="flex gap-6">
          <div>
            <p class="text-xs text-slate-400">上漲機率</p>
            <p class="text-xl font-semibold text-emerald-400">{{ data.upProbability }}%</p>
          </div>
          <div>
            <p class="text-xs text-slate-400">下跌機率</p>
            <p class="text-xl font-semibold text-rose-400">{{ data.downProbability }}%</p>
          </div>
        </div>
      </div>

      <p v-if="data.summary" class="rounded-lg bg-slate-800/60 px-3 py-2 text-sm text-slate-200">
        {{ data.summary }}
      </p>

      <div>
        <h3 class="mb-2 text-sm font-medium text-slate-300">市場主線 Top 3</h3>
        <ul class="space-y-2">
          <li
            v-for="(line, i) in data.mainLines"
            :key="line.topic"
            class="rounded-lg border border-slate-700/60 bg-slate-800/40 px-3 py-2"
          >
            <span class="text-xs text-emerald-400">#{{ i + 1 }}</span>
            <span class="ml-2 font-medium text-white">{{ line.topic }}</span>
            <p class="mt-1 text-sm text-slate-400">{{ line.reason }}</p>
          </li>
          <li v-if="data.mainLines.length === 0" class="text-sm text-slate-500">
            主線資料累積中
          </li>
        </ul>
      </div>

      <div v-if="data.observations.length">
        <h3 class="mb-2 text-sm font-medium text-slate-300">今日觀察</h3>
        <ul class="list-inside list-disc space-y-1 text-sm text-slate-300">
          <li v-for="obs in data.observations" :key="obs">{{ obs }}</li>
        </ul>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium text-slate-300">今日風險</h3>
        <ul class="list-inside list-disc space-y-1 text-sm text-amber-200/90">
          <li v-for="risk in data.risks" :key="risk">{{ risk }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
