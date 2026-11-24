<script setup lang="ts">
import { computed, ref } from 'vue'
import { siteConfig } from '@/config/site'

const category = ref('企業前端系統')
const email = ref('')
const message = ref('')
const prepared = ref(false)
const mailHref = computed(() => {
  const subject = encodeURIComponent('JR JIM 合作洽詢｜' + category.value)
  const body = encodeURIComponent('回覆信箱：' + email.value.trim() + '\n\n' + message.value.trim())
  return 'mailto:' + siteConfig.email + '?subject=' + subject + '&body=' + body
})
</script>

<template>
  <section class="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">聯絡合作</h1>
    <div class="mt-8 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
      <div>
        <h2 class="text-xl font-bold">合作範圍</h2>
        <p class="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">企業系統、管理後台、資料視覺化、前端重構與 API 整合。</p>
        <a :href="'mailto:' + siteConfig.email" class="mt-5 inline-block break-all font-semibold text-indigo-700 underline dark:text-indigo-300">{{ siteConfig.email }}</a>
      </div>
      <form class="grid min-w-0 gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900" @input="prepared = false" @submit.prevent="prepared = true">
        <h2 class="text-xl font-bold">整理合作需求</h2>
        <label class="grid gap-2">合作類型
          <select v-model="category" class="w-full rounded-lg border border-zinc-300 bg-transparent p-3 dark:border-zinc-700 dark:bg-zinc-900">
            <option>企業前端系統</option><option>既有介面改版</option><option>招募與技術合作</option><option>其他</option>
          </select>
        </label>
        <label class="grid gap-2">回覆信箱
          <input v-model="email" type="email" autocomplete="email" required class="w-full rounded-lg border border-zinc-300 p-3 dark:border-zinc-700">
        </label>
        <label class="grid gap-2">需求說明
          <textarea v-model="message" required rows="5" class="w-full rounded-lg border border-zinc-300 p-3 dark:border-zinc-700"></textarea>
        </label>
        <button type="submit" class="w-fit cursor-pointer rounded-full bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800">產生郵件草稿</button>
        <div v-if="prepared" aria-live="polite" class="rounded-lg bg-indigo-50 p-4 text-sm dark:bg-indigo-950">
          草稿已準備，請在郵件程式檢查後寄出。
          <a :href="mailHref" class="mt-2 block font-semibold underline">開啟郵件程式</a>
        </div>
      </form>
    </div>
  </section>
</template>
