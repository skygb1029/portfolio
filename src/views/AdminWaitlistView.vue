<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useWaitlistDashboard } from '@/composables/useWaitlistDashboard'

const { leads, loading, dataSource, metrics, stats, productTotals, reload } = useWaitlistDashboard()

const stat = computed(() => stats())

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('zh-TW')
}
</script>

<template>
  <div class="min-h-screen bg-zinc-100 pt-16 dark:bg-zinc-950">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p class="text-xs font-medium text-indigo-600">Admin Dashboard</p>
          <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">等待名單</h1>
          <p class="mt-1 text-sm text-zinc-500">
            資料來源：{{ dataSource }}（Supabase 真實資料，需設定 VITE_ADMIN_API_SECRET）
          </p>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="rounded-lg border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700"
            @click="reload"
          >
            重新整理
          </button>
          <RouterLink
            to="/admin/ops"
            class="rounded-lg border border-violet-300 px-4 py-2 text-sm text-violet-700 dark:border-violet-800 dark:text-violet-300"
          >
            營運監控
          </RouterLink>
          <RouterLink to="/" class="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-zinc-900">
            返回網站
          </RouterLink>
        </div>
      </div>

      <div v-if="loading" class="mt-12 text-center text-zinc-500">載入中…</div>

      <template v-else>
        <div v-if="metrics" class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p class="text-2xl font-bold">{{ metrics.waitlistCount }}</p>
            <p class="text-xs text-zinc-500">等待名單（DB）</p>
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p class="text-2xl font-bold">{{ metrics.pageViews }}</p>
            <p class="text-xs text-zinc-500">產品瀏覽</p>
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p class="text-2xl font-bold">
              {{ metrics.demoStock + metrics.demoParenting + metrics.demoCustomerService }}
            </p>
            <p class="text-xs text-zinc-500">Demo 使用次數</p>
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p class="text-2xl font-bold">{{ metrics.conversionRate }}%</p>
            <p class="text-xs text-zinc-500">轉換率 · CTA {{ metrics.ctaClicks }}</p>
          </div>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p class="text-3xl font-bold">{{ stat.total }}</p>
            <p class="text-sm text-zinc-500">列表筆數</p>
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:col-span-2">
            <p class="text-sm font-medium text-zinc-500 mb-3">產品分布</p>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="(count, product) in stat.byProduct"
                :key="product"
                class="rounded-full bg-indigo-500/10 px-3 py-1 text-sm text-indigo-700 dark:text-indigo-300"
              >
                {{ product }}: {{ count }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p class="text-sm font-medium text-zinc-500 mb-4">產品分布（真實名單）</p>
          <div class="grid gap-3 sm:grid-cols-3">
            <div v-for="p in productTotals()" :key="p.title" class="text-center">
              <p class="text-xl font-bold">{{ p.count }}</p>
              <p class="text-xs text-zinc-500">{{ p.title }}</p>
            </div>
          </div>
        </div>

        <div class="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table class="w-full text-left text-sm">
            <thead class="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
              <tr>
                <th class="px-4 py-3 font-medium">日期</th>
                <th class="px-4 py-3 font-medium">姓名</th>
                <th class="px-4 py-3 font-medium">Email</th>
                <th class="px-4 py-3 font-medium">產品</th>
                <th class="px-4 py-3 font-medium">來源頁面</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="lead in leads"
                :key="lead.id"
                class="border-b border-zinc-100 dark:border-zinc-800"
              >
                <td class="px-4 py-3 text-zinc-500">{{ formatDate(lead.createdAt) }}</td>
                <td class="px-4 py-3">{{ lead.name }}</td>
                <td class="px-4 py-3">{{ lead.email }}</td>
                <td class="px-4 py-3">{{ lead.productLabel }}</td>
                <td class="px-4 py-3 font-mono text-xs">{{ lead.sourcePage }}</td>
              </tr>
              <tr v-if="leads.length === 0">
                <td colspan="5" class="px-4 py-8 text-center text-zinc-500">尚無資料</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
</template>
