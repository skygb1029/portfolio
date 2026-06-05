<script setup lang="ts">
import { ref } from 'vue'
import { postJson } from '@/utils/apiClient'
import { trackEvent } from '@/composables/useAnalytics'

const input = ref('請問價格多少？')
const loading = ref(false)
const error = ref('')

interface CsApiResult {
  reply: string
  intent: string
  suggestedActions: string[]
  confidence: number
}

const result = ref<CsApiResult | null>(null)

async function send() {
  error.value = ''
  loading.value = true
  result.value = null
  try {
    result.value = await postJson<CsApiResult>('/api/demo/customer-service', {
      input: input.value.trim(),
    })
    trackEvent('demo_customer_service', { intent: result.value.intent })
  } catch (e) {
    error.value = e instanceof Error ? e.message : '送出失敗'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="glow-border rounded-2xl p-6">
    <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-50">客服助手 Demo</h3>
    <p class="mt-1 text-sm text-zinc-500">模擬客戶提問 — Customer Service API</p>
    <div class="mt-4 flex gap-2">
      <input
        v-model="input"
        type="text"
        class="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        @keyup.enter="send"
      />
      <button
        type="button"
        class="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
        :disabled="loading"
        @click="send"
      >
        {{ loading ? '回覆中…' : '送出' }}
      </button>
    </div>
    <p v-if="error" class="mt-3 text-sm text-red-500">{{ error }}</p>
    <div v-if="result" class="mt-6 flex gap-3">
      <span class="shrink-0 text-xs text-zinc-500">客戶</span>
      <p class="rounded-lg bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-800">{{ input }}</p>
    </div>
    <div v-if="result" class="mt-3 flex gap-3">
      <span class="shrink-0 text-xs font-medium text-indigo-600">AI</span>
      <div class="flex-1">
        <p
          class="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm dark:border-indigo-900 dark:bg-indigo-950/40"
        >
          {{ result.reply }}
        </p>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="action in result.suggestedActions"
            :key="action"
            class="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800"
          >
            {{ action }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
