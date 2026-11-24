<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{ kind: 'parenting' | 'life' | 'sales' }>()
interface Entry { id: string; label: string; category: string; time: string; done: boolean; due?: string }
const key = computed(() => 'jrjim-workbench-' + props.kind)
function readEntries(): Entry[] {
  try { return JSON.parse(localStorage.getItem(key.value) ?? '[]') as Entry[] } catch { return [] }
}
const entries = ref<Entry[]>(readEntries())
const input = ref('')
const category = ref('')
const due = ref('')
const reply = ref('')
const handoff = ref(false)
const storageError = ref(false)
const categories = computed(() => props.kind === 'parenting' ? ['餵奶', '換尿布', '睡眠'] : ['待辦', '行程', '提醒'])
const salesCategory = computed(() => /退款|退貨|取消/.test(input.value) ? '退換貨' : /配送|出貨|到貨|包裹/.test(input.value) ? '物流' : '一般詢問')
watch(() => props.kind, () => { entries.value = readEntries(); input.value = ''; category.value = ''; reply.value = ''; handoff.value = false; storageError.value = false })
watch(entries, value => {
  try { localStorage.setItem(key.value, JSON.stringify(value)); storageError.value = false } catch { storageError.value = true }
}, { deep: true, flush: 'sync' })
function submit() {
  if (!input.value.trim()) return
  if (props.kind === 'sales') {
    reply.value = salesCategory.value === '物流'
      ? '您好，我可以協助查詢配送進度。請提供訂單編號，我們確認物流狀態後會回覆您。'
      : salesCategory.value === '退換貨'
        ? '您好，我們會協助確認退換貨條件。請提供訂單編號與商品狀況，客服確認後會提供下一步。'
        : '您好，感謝您的來訊。方便補充您想了解的商品或服務嗎？我們會接續協助。'
    handoff.value = false
    return
  }
  entries.value = [{ id: crypto.randomUUID(), label: input.value.trim(), category: category.value || categories.value[0]!, time: new Date().toISOString(), done: false, due: due.value || undefined }, ...entries.value]
  input.value = ''
  due.value = ''
}
</script>

<template>
  <section id="workbench" class="rounded-3xl border border-zinc-300 bg-white p-5 sm:p-7 dark:border-zinc-700 dark:bg-zinc-900">
    <h2 class="text-2xl font-bold">{{ kind === 'parenting' ? '寶寶照護紀錄' : kind === 'life' ? '我的待辦清單' : '客服收件工作台' }}</h2>
    <p class="mt-2 text-zinc-600 dark:text-zinc-300">{{ kind === 'sales' ? '輸入訊息即可用規則分類並產生可編輯草稿，交班只在本頁生效。' : kind === 'life' ? '在這個瀏覽器整理待辦、行程與提醒事項。LINE 通知需在正式服務中設定。' : '記下餵奶、換尿布或睡眠，立即查看照護時間軸。紀錄只存在這個瀏覽器。' }}</p>
    <form class="mt-5 grid gap-3" @submit.prevent="submit">
      <label v-if="kind !== 'sales'" class="grid gap-1 font-semibold">類別
        <select v-model="category" class="rounded-lg border border-zinc-400 bg-transparent p-2 dark:bg-zinc-900">
          <option value="">預設：{{ categories[0] }}</option>
          <option v-for="item in categories" :key="item">{{ item }}</option>
        </select>
      </label>
      <label class="grid gap-1 font-semibold">{{ kind === 'sales' ? '顧客訊息' : '紀錄內容' }}
        <textarea v-model="input" class="rounded-lg border border-zinc-400 bg-transparent p-3" rows="2" required maxlength="400" @input="reply = ''; handoff = false"></textarea>
      </label>
      <label v-if="kind === 'life'" class="grid gap-1 font-semibold">預定時間
        <input v-model="due" type="datetime-local" class="w-fit rounded-lg border border-zinc-400 bg-transparent p-2">
      </label>
      <button class="w-fit rounded-xl bg-indigo-700 px-4 py-2.5 font-bold text-white" :disabled="!input.trim()">{{ kind === 'sales' ? '分類並建立草稿' : '新增紀錄' }}</button>
    </form>
    <div v-if="kind === 'sales' && reply" class="mt-5 grid gap-3">
      <p>分類：<strong>{{ salesCategory }}</strong></p>
      <label class="grid gap-1 font-semibold">回覆草稿<textarea v-model="reply" class="rounded-lg border border-zinc-400 bg-transparent p-3" rows="3"></textarea></label>
      <button class="w-fit rounded-lg border border-zinc-400 px-4 py-2" @click="handoff = true">標記待人工處理</button>
      <p v-if="handoff" role="status">已標記待人工處理。草稿尚未發送。</p>
    </div>
    <div v-else-if="kind !== 'sales'" class="mt-5">
      <p v-if="storageError" role="status" class="mb-3 font-semibold">瀏覽器暫時無法保存，紀錄僅保留在本頁。</p>
      <p v-if="!entries.length">還沒有紀錄。</p>
      <ul v-else class="divide-y divide-zinc-300 dark:divide-zinc-700">
        <li v-for="entry in entries" :key="entry.id" class="flex flex-wrap items-center gap-3 py-3">
          <label v-if="kind === 'life'"><input v-model="entry.done" type="checkbox"> 完成</label>
          <div class="min-w-0 flex-1 break-words"><p :class="{ 'line-through': entry.done }">{{ entry.category }} · {{ entry.label }}</p><time :datetime="entry.due || entry.time" class="text-sm">{{ entry.due ? '預定 ' : '' }}{{ new Date(entry.due || entry.time).toLocaleString('zh-TW') }}</time></div>
          <button class="rounded-lg border border-zinc-400 px-3 py-2" @click="entries = entries.filter(item => item.id !== entry.id)">移除<span class="sr-only">{{ entry.label }}</span></button>
        </li>
      </ul>
    </div>
  </section>
</template>
