<script setup lang="ts">
import ProductWorkbench from '@/components/product/ProductWorkbench.vue'
const lineUrl = import.meta.env.VITE_PARENTING_LINE_URL?.trim()
</script>
<template>
  <div class="grid gap-5">
    <ProductWorkbench kind="parenting" />
    <section class="rounded-2xl border border-rose-300 p-5 dark:border-rose-900">
      <h2 class="text-xl font-bold">跨照護者記錄與提醒</h2>
      <p class="mt-2">日常照護可先在上方記錄。需要 LINE 紀錄、提醒或寶寶 Dashboard 時，可從產品入口開始。</p>
      <a v-if="lineUrl" :href="lineUrl" target="_blank" rel="noopener noreferrer" class="mt-3 inline-block font-bold underline">開啟 LINE 育兒助手</a>
      <RouterLink v-else to="/product/parenting-assistant" class="mt-3 inline-block font-bold underline">查看 LINE 操作方式</RouterLink>
    </section>
  </div>
</template>
