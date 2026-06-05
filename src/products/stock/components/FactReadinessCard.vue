<script setup lang="ts">
import type { WebFactReadiness } from '../services/stockApi'

defineProps<{
  data: WebFactReadiness | null
  loading: boolean
  error: string | null
}>()

function statusClass(status: string | undefined): string {
  if (status === 'GREEN') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  if (status === 'YELLOW') return 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  return 'bg-rose-500/20 text-rose-300 border-rose-500/40'
}
</script>

<template>
  <section class="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-5 shadow-lg">
    <header class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-white">Fact Status</h2>
      <span
        v-if="data?.status"
        class="rounded-full border px-3 py-1 text-xs font-semibold"
        :class="statusClass(data.status)"
      >
        Status: {{ data.status }}
      </span>
    </header>

    <div v-if="loading" class="space-y-2 animate-pulse">
      <div v-for="n in 4" :key="n" class="h-10 rounded bg-slate-800" />
    </div>

    <p v-else-if="error" class="text-sm text-rose-300">{{ error }}</p>

    <ul v-else-if="data" class="space-y-2">
      <li
        v-for="check in data.checks"
        :key="check.key"
        class="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/40 px-3 py-2.5"
      >
        <span class="text-sm text-slate-200">{{ check.label }}</span>
        <span
          class="text-sm font-medium"
          :class="check.present ? 'text-emerald-400' : 'text-rose-400'"
        >
          {{ check.present ? '✓' : '✗' }}
        </span>
      </li>
    </ul>

    <p v-if="data?.missing?.length && !loading" class="mt-3 text-xs text-slate-500">
      缺少：{{ data.missing.join('、') }}
    </p>
  </section>
</template>
