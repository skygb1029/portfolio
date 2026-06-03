<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import { siteConfig, personalTraits } from '@/config/site'

const buildingProducts = [
  'AI 股票秘書',
  'AI 育兒助手',
  'AI 客服業務小能手',
  'AI 影片生成平台',
]
</script>

<template>
  <section id="about" class="section-padding">
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal variant="slide-left">
          <p class="text-sm font-medium tracking-widest text-indigo-500 uppercase">About</p>
          <h2 class="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {{ siteConfig.name }}
          </h2>
          <p class="mt-3 text-lg font-medium text-gradient">
            {{ siteConfig.title }}
          </p>
          <blockquote
            class="mt-6 border-l-2 border-indigo-500 pl-4 text-lg italic text-zinc-700 dark:text-zinc-300"
          >
            {{ siteConfig.tagline }}
          </blockquote>
        </ScrollReveal>

        <ScrollReveal :delay="120">
          <div class="space-y-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              從全端與專案管理背景出發，累積超過十年軟體開發與跨部門協作經驗。
              現專注於企業級前端架構與 AI 產品化，將技術轉化為可持續經營的 SaaS。
            </p>
            <p>
              曾參與郵局 i郵箱、醫療 AI 平台等企業專案，並獨立打造 LINE Bot 驅動的 AI 產品線。
              目標是建立完整的 AI SaaS 生態系，讓產品能真正解決生活與商業問題。
            </p>
          </div>
          <ul class="mt-6 flex flex-wrap gap-2">
            <li
              v-for="trait in personalTraits"
              :key="trait"
              class="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {{ trait }}
            </li>
          </ul>
        </ScrollReveal>
      </div>

      <ScrollReveal :delay="200">
        <div class="mt-12 glow-border rounded-2xl p-6 sm:p-8">
          <p class="text-sm font-medium text-zinc-500">正在打造的產品</p>
          <ul class="mt-4 flex flex-wrap gap-3">
            <li
              v-for="name in buildingProducts"
              :key="name"
              class="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-300"
            >
              {{ name }}
            </li>
          </ul>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>
