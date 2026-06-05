<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import DemoStock from '@/components/demo/DemoStock.vue'
import DemoParenting from '@/components/demo/DemoParenting.vue'
import DemoSales from '@/components/demo/DemoSales.vue'
import { productLandings } from '@/data/productLandings'

const tabs = [
  { id: 'stock', label: 'AI 股票秘書' },
  { id: 'parenting', label: 'AI 育兒助手' },
  { id: 'cs', label: 'AI 客服小能手' },
] as const

const active = ref<(typeof tabs)[number]['id']>('stock')
</script>

<template>
  <div class="pt-16">
    <section class="section-padding">
      <div class="mx-auto max-w-6xl">
        <RouterLink to="/" class="text-sm text-zinc-500 hover:text-indigo-600">← Product Hub</RouterLink>
        <h1 class="mt-6 text-4xl font-bold text-zinc-900 dark:text-zinc-50">Demo Center</h1>
        <p class="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          無需註冊，立即體驗 Jr Jim AI 產品的核心互動流程（模擬資料）。
        </p>

        <div class="mt-8 flex flex-wrap gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
            :class="
              active === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
            "
            @click="active = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="mt-10">
          <DemoStock v-if="active === 'stock'" />
          <DemoParenting v-else-if="active === 'parenting'" />
          <DemoSales v-else-if="active === 'cs'" />
        </div>

        <div class="mt-16">
          <h2 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">深入了解產品</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-3">
            <RouterLink
              v-for="p in productLandings"
              :key="p.slug"
              :to="`/product/${p.slug}`"
              class="glow-border rounded-xl p-4 transition-transform hover:-translate-y-0.5"
            >
              <span class="text-2xl">{{ p.emoji }}</span>
              <p class="mt-2 font-medium text-zinc-900 dark:text-zinc-100">{{ p.title }}</p>
              <p class="mt-1 text-xs text-indigo-600">查看 Landing →</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
