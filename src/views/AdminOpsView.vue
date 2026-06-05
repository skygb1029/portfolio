<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useOpsDashboard, healthBadgeClass } from '@/composables/useOpsDashboard'

const { data, loading, error, reload } = useOpsDashboard()

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('zh-TW')
}
</script>

<template>
  <div class="min-h-screen bg-zinc-100 pt-16 dark:bg-zinc-950">
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs font-medium text-violet-600">Product Operations</p>
          <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">SaaS 營運監控</h1>
          <p class="mt-1 text-sm text-zinc-500">
            資料來源：GitHub · Supabase · 產品 API（stock-api / parenting-api / sales-api）
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="rounded-lg border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700"
            @click="reload"
          >
            重新整理
          </button>
          <RouterLink
            to="/admin/waitlist"
            class="rounded-lg border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700"
          >
            等待名單
          </RouterLink>
          <RouterLink
            to="/"
            class="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-zinc-900"
          >
            返回網站
          </RouterLink>
        </div>
      </div>

      <div v-if="loading" class="mt-16 text-center text-zinc-500">載入營運資料…</div>
      <p v-else-if="error" class="mt-16 text-center text-sm text-red-500" role="alert">{{ error }}</p>

      <template v-else-if="data">
        <div class="mt-8 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>更新時間：{{ formatDate(data.generatedAt) }}</span>
          <span>GitHub {{ data.sources.github ? '✓' : '—' }}</span>
          <span>Supabase {{ data.sources.supabase ? '✓' : '—' }}</span>
          <span>產品 API {{ data.sources.productApi ? '✓' : '—' }}</span>
        </div>

        <div class="mt-8 overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table class="w-full min-w-[960px] text-left text-sm">
            <thead class="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/80">
              <tr>
                <th class="px-4 py-3 font-medium">產品</th>
                <th class="px-4 py-3 font-medium">狀態</th>
                <th class="px-4 py-3 font-medium text-right">等待名單</th>
                <th class="px-4 py-3 font-medium text-right">Feedback</th>
                <th class="px-4 py-3 font-medium">API 健康度</th>
                <th class="px-4 py-3 font-medium">版本</th>
                <th class="px-4 py-3 font-medium">最後部署</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in data.products"
                :key="row.id"
                class="border-b border-zinc-100 dark:border-zinc-800"
              >
                <td class="px-4 py-4">
                  <div class="flex items-center gap-2">
                    <span class="text-xl" aria-hidden="true">{{ row.icon }}</span>
                    <div>
                      <p class="font-medium text-zinc-900 dark:text-zinc-100">{{ row.name }}</p>
                      <p class="font-mono text-[10px] text-zinc-400">{{ row.healthKey }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4">
                  <span
                    class="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium uppercase dark:bg-zinc-800"
                  >
                    {{ row.status }}
                  </span>
                </td>
                <td class="px-4 py-4 text-right tabular-nums">{{ row.waitlistCount }}</td>
                <td class="px-4 py-4 text-right tabular-nums">{{ row.feedbackCount }}</td>
                <td class="px-4 py-4">
                  <span
                    class="inline-flex rounded-full px-2.5 py-1 text-xs font-bold tracking-wide"
                    :class="healthBadgeClass(row.apiHealth)"
                  >
                    {{ row.apiHealth }}
                  </span>
                  <p class="mt-1 text-[10px] text-zinc-400">
                    <template v-if="row.apiLatencyMs != null">{{ row.apiLatencyMs }}ms · </template>
                    {{ row.apiHealthDetail }}
                  </p>
                </td>
                <td class="px-4 py-4 font-mono text-xs">{{ row.version }}</td>
                <td class="px-4 py-4 text-xs text-zinc-500 whitespace-nowrap">
                  {{ formatDate(row.lastDeployedAt) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <div
            v-for="row in data.products"
            :key="`card-${row.id}`"
            class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div class="flex items-center justify-between">
              <span class="text-2xl">{{ row.icon }}</span>
              <span
                class="rounded-full px-2 py-0.5 text-[10px] font-bold"
                :class="healthBadgeClass(row.apiHealth)"
              >
                {{ row.apiHealth }}
              </span>
            </div>
            <p class="mt-3 font-semibold">{{ row.name }}</p>
            <p class="mt-1 font-mono text-xs text-zinc-400">{{ row.healthKey }}</p>
            <dl class="mt-4 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div class="flex justify-between">
                <dt>等待名單</dt>
                <dd class="font-medium text-zinc-900 dark:text-zinc-100">{{ row.waitlistCount }}</dd>
              </div>
              <div class="flex justify-between">
                <dt>Feedback</dt>
                <dd class="font-medium">{{ row.feedbackCount }}</dd>
              </div>
              <div class="flex justify-between">
                <dt>版本</dt>
                <dd class="font-mono">{{ row.version }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
