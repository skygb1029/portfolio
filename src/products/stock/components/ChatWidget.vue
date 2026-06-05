<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useStockAssistantStore } from '../stores/assistant'

const store = useStockAssistantStore()
const input = ref('')
const scrollEl = ref<HTMLElement | null>(null)

const quickActions = [
  '0050 今天走勢',
  '00919 今天走勢',
  '00878 今天走勢',
  '台積電 今天走勢',
  '聯發科 今天走勢',
  '大盤分析',
]

async function submit(text?: string): Promise<void> {
  const msg = (text ?? input.value).trim()
  if (!msg) return
  input.value = ''
  await store.sendMessage(msg)
  await nextTick()
  scrollEl.value?.scrollTo({ top: scrollEl.value.scrollHeight, behavior: 'smooth' })
}

watch(
  () => store.messages.length,
  async () => {
    await nextTick()
    scrollEl.value?.scrollTo({ top: scrollEl.value.scrollHeight, behavior: 'smooth' })
  },
)
</script>

<template>
  <section class="flex flex-col rounded-2xl border border-slate-700/80 bg-slate-900/80 shadow-lg">
    <header class="border-b border-slate-700/60 px-5 py-4">
      <h2 class="text-lg font-semibold text-white">AI 對話區</h2>
      <p class="text-xs text-slate-400">與 LINE Bot 相同引擎 · Fact-Based 股票問答</p>
    </header>

    <div class="flex flex-wrap gap-2 border-b border-slate-700/40 px-4 py-3">
      <button
        v-for="action in quickActions"
        :key="action"
        type="button"
        class="rounded-full border border-slate-600 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-200 transition hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-200 disabled:opacity-50"
        :disabled="store.chatLoading"
        @click="submit(action)"
      >
        {{ action }}
      </button>
    </div>

    <div
      ref="scrollEl"
      class="min-h-[280px] max-h-[420px] flex-1 space-y-4 overflow-y-auto px-5 py-4"
    >
      <p v-if="store.messages.length === 0" class="text-center text-sm text-slate-500">
        輸入股票代號或名稱，例如「0056 今天走勢如何」
      </p>

      <div
        v-for="msg in store.messages"
        :key="msg.id"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
          :class="
            msg.role === 'user'
              ? 'bg-emerald-600/90 text-white'
              : 'border border-slate-700 bg-slate-800/90 text-slate-100'
          "
        >
          {{ msg.content }}
        </div>
      </div>

      <div v-if="store.chatLoading" class="flex justify-start">
        <div
          class="rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-2 text-sm text-slate-400"
        >
          分析中…
        </div>
      </div>
    </div>

    <form class="flex gap-2 border-t border-slate-700/60 p-4" @submit.prevent="submit()">
      <input
        v-model="input"
        type="text"
        placeholder="0056 今天走勢如何"
        class="flex-1 rounded-xl border border-slate-600 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
        :disabled="store.chatLoading"
      />
      <button
        type="submit"
        class="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
        :disabled="store.chatLoading || !input.trim()"
      >
        送出
      </button>
    </form>
  </section>
</template>
