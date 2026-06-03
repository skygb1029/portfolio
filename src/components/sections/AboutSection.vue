<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const currentProjects = [
  'AI 股票秘書',
  'AI 育兒助手',
  'AI 客服業務小能手',
]
</script>

<template>
  <section id="about" class="section-padding">
    <div class="mx-auto max-w-6xl">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal variant="slide-left">
          <SectionTitle
            label="About"
            title="關於我"
          />
        </ScrollReveal>

        <ScrollReveal :delay="120">
          <div class="space-y-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              我是Jr-Jim，目前專注於前端開發與 AI 應用開發。
            </p>
            <p>
              過去主要使用 Vue3、TypeScript、Node.js 開發企業級系統。
              近年開始投入 AI 領域，結合 OpenAI、LINE Bot、自動化流程與資料分析技術，
              打造能真正解決生活與商業問題的 AI 產品。
            </p>
            <p>
              希望透過 AI 與軟體開發能力，打造能夠長期經營的 SaaS 服務。
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal :delay="200">
        <div class="mt-12 glow-border rounded-2xl p-6 sm:p-8">
          <p class="text-sm font-medium text-zinc-500 dark:text-zinc-500">目前持續開發</p>
          <ul class="mt-4 flex flex-wrap gap-3">
            <li
              v-for="name in currentProjects"
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
