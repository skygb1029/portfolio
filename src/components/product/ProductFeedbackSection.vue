<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { postJson, getJson } from '@/utils/apiClient'

const props = defineProps<{ productKey: string }>()

const type = ref<'suggestion' | 'issue' | 'requirement'>('suggestion')
const content = ref('')
const submitting = ref(false)
const message = ref('')
const list = ref<{ type: string; content: string; created_at: string }[]>([])

async function loadFeedback() {
  try {
    const res = await getJson<{ feedback: typeof list.value }>(
      `/api/feedback?product=${encodeURIComponent(props.productKey)}`,
    )
    list.value = res.feedback
  } catch {
    list.value = []
  }
}

async function submit() {
  if (!content.value.trim()) return
  submitting.value = true
  message.value = ''
  try {
    await postJson('/api/feedback', {
      product: props.productKey,
      type: type.value,
      content: content.value.trim(),
    })
    content.value = ''
    message.value = '感謝您的回饋！'
    await loadFeedback()
  } catch {
    message.value = '送出失敗，請稍後再試'
  } finally {
    submitting.value = false
  }
}

onMounted(loadFeedback)
</script>

<template>
  <section class="section-padding border-t border-zinc-200 dark:border-zinc-800">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">用戶回饋</h2>
      <p class="mt-2 text-sm text-zinc-500">分享建議、問題或需求，協助產品迭代</p>

      <form class="mt-6 max-w-xl space-y-4" @submit.prevent="submit">
        <select
          v-model="type"
          class="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="suggestion">建議</option>
          <option value="issue">問題</option>
          <option value="requirement">需求</option>
        </select>
        <textarea
          v-model="content"
          rows="3"
          placeholder="您的想法…"
          class="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          class="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
          :disabled="submitting"
        >
          送出回饋
        </button>
        <p v-if="message" class="text-sm text-emerald-600">{{ message }}</p>
      </form>

      <ul v-if="list.length" class="mt-10 space-y-4">
        <li
          v-for="(f, i) in list"
          :key="i"
          class="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
        >
          <span class="text-xs font-medium text-indigo-600">{{ f.type }}</span>
          <p class="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{{ f.content }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
