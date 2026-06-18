<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useStockAssistantStore } from '../stores/assistant'

const store = useStockAssistantStore()
const input = ref('')
const scrollEl = ref<HTMLElement | null>(null)

const hotQuestions = [
  '0050今天走勢',
  '00919今天走勢',
  '2330今天走勢',
  '00878配息',
  '今天大盤如何',
]

const emptyStateQuestions = [
  '0050今天走勢',
  '00919今天走勢',
  '2330今天走勢',
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
  <section
    class="flex min-h-[min(70vh,520px)] flex-col rounded-2xl border border-slate-700/80 bg-slate-900/80 shadow-lg"
  >
    <header class="border-b border-slate-700/60 px-4 py-4 sm:px-5">
      <h2 class="text-lg font-semibold text-white">AI 問答</h2>
      <p class="text-xs text-slate-400">輸入代號或名稱，取得即時分析</p>
    </header>

    <div class="border-b border-slate-700/40 px-3 py-3 sm:px-4">
      <p class="mb-2 text-xs font-medium text-slate-500">熱門問題</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="action in hotQuestions"
          :key="action"
          type="button"
          class="min-h-11 rounded-full border border-slate-600 bg-slate-800/80 px-3 py-2 text-xs text-slate-200 transition hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-200 disabled:opacity-50 sm:min-h-0 sm:py-1.5"
          :disabled="store.chatLoading"
          @click="submit(action)"
        >
          {{ action }}
        </button>
      </div>
    </div>

    <div
      ref="scrollEl"
      class="min-h-[200px] flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:min-h-[280px] sm:max-h-[420px] sm:px-5"
    >
      <div v-if="store.messages.length === 0" class="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
        <p class="text-sm font-medium text-slate-300">你可以直接詢問：</p>
        <ul class="mt-3 space-y-2">
          <li v-for="q in emptyStateQuestions" :key="q">
            <button
              type="button"
              class="text-left text-sm text-emerald-400/90 transition hover:text-emerald-300 disabled:opacity-50"
              :disabled="store.chatLoading"
              @click="submit(q)"
            >
              · {{ q }}
            </button>
          </li>
        </ul>
      </div>

      <div
        v-for="msg in store.messages"
        :key="msg.id"
        class="flex flex-col"
        :class="msg.role === 'user' ? 'items-end' : 'items-start'"
      >
        <div
          class="max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[85%]"
          :class="
            msg.role === 'user'
              ? 'bg-emerald-600/90 text-white'
              : 'border border-slate-700 bg-slate-800/90 text-slate-100'
          "
        >
          {{ msg.content }}
        </div>
        <div
          v-if="msg.role === 'assistant' && msg.question"
          class="mt-1.5 flex flex-col gap-1"
        >
          <div class="flex gap-2">
            <button
              type="button"
              class="rounded-full border px-2.5 py-1 text-xs transition disabled:cursor-default disabled:opacity-60"
              :class="
                msg.feedbackSent && msg.feedbackRating === 'helpful'
                  ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-600 text-slate-300 hover:border-emerald-500/60 hover:text-emerald-300'
              "
              :disabled="msg.feedbackSent"
              @click="store.sendFeedback(msg.id, 'helpful')"
            >
              👍 有幫助
            </button>
            <button
              type="button"
              class="rounded-full border px-2.5 py-1 text-xs transition disabled:cursor-default disabled:opacity-60"
              :class="
                msg.feedbackSent && msg.feedbackRating === 'not_helpful'
                  ? 'border-rose-500/60 bg-rose-500/10 text-rose-300'
                  : 'border-slate-600 text-slate-300 hover:border-rose-500/60 hover:text-rose-300'
              "
              :disabled="msg.feedbackSent"
              @click="store.sendFeedback(msg.id, 'not_helpful')"
            >
              👎 沒幫助
            </button>
          </div>
          <p class="text-xs text-slate-500">
            你的回饋將協助改善 AI 股票秘書
          </p>
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

    <form
      class="sticky bottom-0 flex gap-2 border-t border-slate-700/60 bg-slate-900/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:p-4"
      @submit.prevent="submit()"
    >
      <input
        v-model="input"
        type="text"
        placeholder="0050今天走勢"
        class="min-h-11 flex-1 rounded-xl border border-slate-600 bg-slate-950 px-4 py-2.5 text-base text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none sm:text-sm"
        :disabled="store.chatLoading"
      />
      <button
        type="submit"
        class="min-h-11 shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
        :disabled="store.chatLoading || !input.trim()"
      >
        送出
      </button>
    </form>
  </section>
</template>
