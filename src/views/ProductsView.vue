<script setup lang="ts">
import { publicProductLandings } from '@/data/productLandings'
import type { ProductLifecycleStatus } from '@/data/productStatus'

const labels: Record<ProductLifecycleStatus, string> = {
  mvp: '開發中',
  beta: 'Beta 測試',
  'internal-testing': '內部測試',
  'public-beta': '公開測試',
  released: '已推出',
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">AI 產品</h1>
    <p class="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">查看股票秘書的行情、晨報與問答功能。</p>
    <ul class="mt-8 grid gap-5 sm:grid-cols-2">
      <li v-for="product in publicProductLandings" :key="product.slug" class="motion-card flex flex-col items-start rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p class="text-sm font-semibold text-indigo-700 dark:text-indigo-300">{{ labels[product.lifecycleStatus] }}</p>
        <h2 class="mt-2 text-2xl font-bold">{{ product.title }}</h2>
        <p class="mb-5 mt-2 leading-7 text-zinc-600 dark:text-zinc-300">{{ product.tagline }}</p>
        <RouterLink :to="'/product/' + product.slug" class="mt-auto rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">查看產品</RouterLink>
      </li>
    </ul>
  </section>
</template>
