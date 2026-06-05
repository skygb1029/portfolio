<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { productLandings } from '@/data/productLandings'
import ProductStatusBadge from '@/components/ui/ProductStatusBadge.vue'
</script>

<template>
  <section class="section-padding border-t border-zinc-200/60 dark:border-zinc-800/60">
    <div class="mx-auto max-w-6xl">
      <h2 class="text-center text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        探索產品 Landing
      </h2>
      <p class="mx-auto mt-3 max-w-xl text-center text-sm text-zinc-600 dark:text-zinc-400">
        深入了解每項 AI 產品的問題、解法、Demo 與商業模式
      </p>
      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <RouterLink
          v-for="p in productLandings"
          :key="p.slug"
          :to="`/product/${p.slug}`"
          class="glow-border group rounded-2xl p-6 transition-transform hover:-translate-y-1"
        >
          <div class="flex items-center justify-between">
            <span class="text-3xl">{{ p.emoji }}</span>
            <ProductStatusBadge :status="p.lifecycleStatus" />
          </div>
          <h3 class="mt-4 text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {{ p.title }}
          </h3>
          <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{{ p.tagline }}</p>
          <span class="mt-4 inline-block text-sm font-medium text-indigo-600">進入產品頁 →</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
