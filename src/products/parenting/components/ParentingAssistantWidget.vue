<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  fetchApiVersion,
  fetchServiceStatus,
  type WebApiVersion,
  type WebServiceStatus,
} from '../services/parentingApi'

const version = ref<WebApiVersion | null>(null)
const status = ref<WebServiceStatus | null>(null)
const error = ref<string | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const [v, s] = await Promise.all([fetchApiVersion(), fetchServiceStatus()])
    version.value = v
    status.value = s
  } catch (e) {
    error.value = e instanceof Error ? e.message : '載入失敗'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-5">
    <section class="rounded-2xl border border-rose-200/80 bg-white p-5 shadow-sm dark:border-rose-900/40 dark:bg-zinc-900/80">
      <h2 class="text-lg font-semibold text-zinc-900 dark:text-zinc-50">育兒助手雲端狀態</h2>
      <p class="mt-1 text-sm text-zinc-500">對齊 Stock 部署架構 · Public API</p>

      <div v-if="loading" class="mt-4 h-20 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />

      <p v-else-if="error" class="mt-4 text-sm text-rose-600 dark:text-rose-400">{{ error }}</p>

      <dl v-else class="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div class="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/60">
          <dt class="text-xs text-zinc-500">服務</dt>
          <dd class="font-medium text-zinc-900 dark:text-zinc-100">
            {{ version?.service ?? '—' }}
          </dd>
        </div>
        <div class="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/60">
          <dt class="text-xs text-zinc-500">版本</dt>
          <dd class="font-medium text-zinc-900 dark:text-zinc-100">
            {{ version?.version ?? '—' }} ({{ version?.buildVersion ?? '—' }})
          </dd>
        </div>
        <div class="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/60">
          <dt class="text-xs text-zinc-500">資料庫</dt>
          <dd
            class="font-medium"
            :class="status?.databaseReady ? 'text-emerald-600' : 'text-amber-600'"
          >
            {{ status?.databaseReady ? '就緒' : '未就緒' }}
          </dd>
        </div>
        <div class="rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/60">
          <dt class="text-xs text-zinc-500">儲存後端</dt>
          <dd class="font-medium text-zinc-900 dark:text-zinc-100">
            {{ status?.storage ?? '—' }}
          </dd>
        </div>
      </dl>
    </section>

    <section class="rounded-2xl border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
      <p class="text-4xl" aria-hidden="true">👶</p>
      <h3 class="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">LINE 寶寶紀錄</h3>
      <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        完整紀錄、提醒與 Dashboard 請透過 LINE 使用。Web 版功能持續擴充中。
      </p>
      <RouterLink
        to="/product/parenting-assistant"
        class="mt-4 inline-flex rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-500"
      >
        了解產品介紹
      </RouterLink>
    </section>
  </div>
</template>
