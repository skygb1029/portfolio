<script setup lang="ts">
import type { WebFocusSymbol } from '../services/stockApi'

defineProps<{
  symbols: WebFocusSymbol[]
  date: string | null
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
      <h2 class="text-lg font-semibold text-white">關注標的</h2>
      <span v-if="date" class="text-xs text-slate-400">{{ date }}</span>
    </header>

    <div v-if="loading" class="grid gap-3 sm:grid-cols-2">
      <div v-for="i in 4" :key="i" class="h-24 animate-pulse rounded-xl bg-slate-800" />
    </div>

    <p v-else-if="error" class="text-sm text-rose-300">{{ error }}</p>

    <div v-else class="grid gap-3 sm:grid-cols-2">
      <article
        v-for="item in symbols"
        :key="item.symbol"
        class="rounded-xl border border-slate-700/60 bg-slate-800/40 px-4 py-3"
      >
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="font-mono text-sm font-semibold text-white">{{ item.symbol }}</p>
            <p class="text-xs text-slate-400">{{ item.displayLabel }}</p>
          </div>
          <p class="text-sm font-semibold" :class="directionColor(item.direction)">
            {{ item.direction }}
          </p>
        </div>
        <div class="mt-2 flex gap-4 text-xs">
          <span class="text-emerald-400">↑ {{ item.upProbability }}%</span>
          <span class="text-rose-400">↓ {{ item.downProbability }}%</span>
        </div>
        <p v-if="item.summary" class="mt-2 line-clamp-2 text-xs text-slate-400">
          {{ item.summary }}
        </p>
      </article>

      <p v-if="symbols.length === 0" class="text-sm text-slate-500 sm:col-span-2">
        關注標的資料載入中
      </p>
    </div>
  </section>
</template>
