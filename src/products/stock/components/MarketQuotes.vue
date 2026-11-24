<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Quote { symbol: string; name: string; close: string; change: string; volume: string; date: string }
const quotes = ref<Quote[]>([])
const loading = ref(false)
const error = ref(false)
async function refresh() {
  loading.value = true
  error.value = false
  try {
    const response = await fetch('/api/market-quotes')
    if (!response.ok) throw new Error()
    quotes.value = await response.json()
  } catch { error.value = true }
  finally { loading.value = false }
}
onMounted(refresh)
</script>

<template>
  <section class="rounded-2xl border border-slate-700 bg-slate-900 p-4 sm:p-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div><h2 class="text-xl font-bold">證交所收盤行情</h2><p class="text-sm text-slate-300">最近公告交易日 · 新台幣 · 收盤後更新</p></div>
      <button class="rounded-lg border border-slate-500 px-4 py-2" :disabled="loading" @click="refresh">{{ loading ? '載入中…' : '重新整理' }}</button>
    </div>
    <p v-if="error" role="status" class="mt-3 text-amber-200">{{ quotes.length ? '更新失敗，以下保留上次成功載入的行情。' : '行情暫時無法載入，可重新整理。' }}</p>
    <div v-if="quotes.length" class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="quote in quotes" :key="quote.symbol" class="rounded-xl bg-slate-800 p-4">
        <p class="font-bold">{{ quote.symbol }} {{ quote.name }}</p>
        <p class="mt-1 text-xl font-semibold">{{ quote.close }} <span class="text-sm text-slate-300">漲跌 {{ quote.change }}</span></p>
        <p class="mt-1 text-sm text-slate-300">{{ quote.date }} · 成交 {{ Number(quote.volume).toLocaleString('zh-TW') }} 股</p>
      </article>
    </div>
  </section>
</template>
