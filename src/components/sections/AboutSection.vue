<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import { siteConfig, personalTraits } from '@/config/site'

const experienceAreas = ['電商系統', '郵政系統', '醫療系統', 'AI 平台']

const buildingProducts = [
  'AI 股票秘書',
  'AI 育兒助手',
  'AI 客服業務小能手',
]
</script>

<template>
  <section id="about" class="section-padding">
    <div class="mx-auto max-w-6xl">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal variant="slide-left">
          <p class="text-sm font-medium tracking-widest text-indigo-500 uppercase">About</p>
          <h2 class="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            About {{ siteConfig.name }}
          </h2>
          <p class="mt-3 text-lg font-medium text-gradient">
            {{ siteConfig.title }}
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="120">
          <div class="space-y-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              {{ siteConfig.name }} 是一位擁有多年企業系統開發經驗的前端工程師。
            </p>
            <div>
              <p class="font-medium text-zinc-800 dark:text-zinc-200">曾參與：</p>
              <ul class="mt-2 space-y-1">
                <li
                  v-for="area in experienceAreas"
                  :key="area"
                  class="flex items-center gap-2"
                >
                  <span class="h-1 w-1 rounded-full bg-indigo-500" />
                  {{ area }}
                </li>
              </ul>
              <p class="mt-1">開發。</p>
            </div>
            <p>
              近年專注於 AI Product、Automation、Agent Workflow 與 SaaS 產品開發。
            </p>
            <p>
              希望透過 AI 技術與軟體產品能力，建立可持續發展的 SaaS 生態系。
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
          <p class="text-sm font-medium text-zinc-500">目前正打造</p>
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
