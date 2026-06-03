<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import AppButton from '@/components/ui/AppButton.vue'
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-screen items-center overflow-hidden pt-16"
  >
    <!-- Gradient orbs -->
    <div
      class="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px] animate-float"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[100px] animate-float-delayed"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[80px] animate-pulse-glow"
      aria-hidden="true"
    />

    <div class="section-padding relative z-10 mx-auto w-full max-w-6xl">
      <ScrollReveal>
        <p
          class="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/50 px-4 py-1.5 text-xs font-medium text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          正在打造 AI SaaS 產品生態系
        </p>
      </ScrollReveal>

      <ScrollReveal :delay="80">
        <h1
          class="mt-6 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-zinc-50"
        >
          Jr-Jim
        </h1>
      </ScrollReveal>

      <ScrollReveal :delay="160">
        <p class="mt-4 text-xl font-medium text-gradient sm:text-2xl">
          Frontend Developer × AI Builder
        </p>
      </ScrollReveal>

      <ScrollReveal :delay="240">
        <p
          class="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          專注於 Vue、TypeScript、AI Agent、LINE Bot 與 SaaS 產品開發。
          <br class="hidden sm:block" />
          從前端工程師轉型 AI 創業者，持續打造能解決真實問題的 AI 產品。
        </p>
      </ScrollReveal>

      <ScrollReveal :delay="320">
        <div class="mt-10 flex flex-wrap gap-4">
          <AppButton href="#portfolio" variant="primary" size="lg">
            查看作品
          </AppButton>
          <AppButton href="#ai-projects" variant="secondary" size="lg">
            AI 專案
          </AppButton>
          <AppButton href="#contact" variant="secondary" size="lg">
            聯絡我
          </AppButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>
