<script setup lang="ts">
import { ref } from 'vue'
import { postJson } from '@/utils/apiClient'
import { trackEvent } from '@/composables/useAnalytics'

const input = ref('喝奶120')
const loading = ref(false)
const error = ref('')

interface ParentingApiResult {
  parse: string
  record: Record<string, string | number>
  reminder: string
  reminderAt: string
  confidence: number
}

const result = ref<ParentingApiResult | null>(null)

async function parse() {
  error.value = ''
  loading.value = true
  result.value = null
  try {
    result.value = await postJson<ParentingApiResult>('/api/demo/parenting', {
      input: input.value.trim(),
    })
    trackEvent('demo_parenting', { type: result.value.parse })
  } catch (e) {
    error.value = e instanceof Error ? e.message : '解析失敗'
  } finally {
    loading.value = false
  }
}

function formatRecord(record: Record<string, string | number>) {
  return Object.entries(record)
    .map(([k, v]) => `${k}: ${v}`)
    .join(' · ')
}
</script>

<template>
  <div class="glow-border rounded-2xl p-6">
    <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-50">育兒助手 Demo</h3>
    <p class="mt-1 text-sm text-zinc-500">試試：喝奶120、睡著了、38.2度 — Parser API</p>
    <div class="mt-4 flex gap-2">
      <input
        v-model="input"
        type="text"
        class="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        @keyup.enter="parse"
      />
      <button
        type="button"
        class="rounded-full bg-pink-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-pink-500 disabled:opacity-60"
        :disabled="loading"
        @click="parse"
      >
        {{ loading ? '解析中…' : '解析' }}
      </button>
    </div>
    <p v-if="error" class="mt-3 text-sm text-red-500">{{ error }}</p>
    <div
      v-if="result"
      class="mt-6 rounded-xl border border-pink-200/80 bg-pink-50/50 p-4 dark:border-pink-900 dark:bg-pink-950/30"
    >
      <p class="text-sm font-semibold text-pink-800 dark:text-pink-300">
        {{ result.parse }}
        <span class="ml-2 text-xs font-normal text-zinc-500">
          信心度 {{ Math.round(result.confidence * 100) }}%
        </span>
      </p>
      <p class="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        紀錄：{{ formatRecord(result.record) }}
      </p>
      <p class="mt-2 text-xs text-zinc-500">提醒：{{ result.reminder }}</p>
      <p class="mt-1 text-xs text-zinc-400">
        排程時間：{{ new Date(result.reminderAt).toLocaleString('zh-TW') }}
      </p>
    </div>
  </div>
</template>
