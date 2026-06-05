<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { siteConfig } from '@/config/site'
import { useWaitlistModalStore } from '@/stores/waitlistModal'
import { trackEvent } from '@/composables/useAnalytics'

const waitlist = useWaitlistModalStore()

function openWaitlist() {
  trackEvent('cta_hero_waitlist')
  waitlist.open()
}
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-screen items-center overflow-hidden pt-16"
  >
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
          {{ siteConfig.brand }}
        </p>
      </ScrollReveal>

      <ScrollReveal :delay="80">
        <h1
          class="mt-6 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-zinc-50"
        >
          {{ siteConfig.name }}
        </h1>
      </ScrollReveal>

      <ScrollReveal :delay="160">
        <p class="mt-4 text-xl font-medium text-gradient sm:text-2xl">
          {{ siteConfig.title }}
        </p>
      </ScrollReveal>

      <ScrollReveal :delay="200">
        <ul class="mt-4 flex flex-wrap gap-2">
          <li
            v-for="role in siteConfig.roles"
            :key="role"
            class="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          >
            {{ role }}
          </li>
        </ul>
      </ScrollReveal>

      <ScrollReveal :delay="280">
        <p
          class="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          企業級前端 × AI 產品化 — 從 Vue 架構到 LINE Bot SaaS，
          讓訪客看見專業背景、技術深度與正在打造的產品生態系。
        </p>
      </ScrollReveal>

      <ScrollReveal :delay="360">
        <div class="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3 text-base font-medium text-white transition-all hover:bg-zinc-800 hover-glow dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            @click="openWaitlist"
          >
            加入等待名單
          </button>
          <AppButton href="/demo" variant="secondary" size="lg">
            體驗 Demo
          </AppButton>
          <AppButton href="#ai-products" variant="secondary" size="lg">
            探索 AI 產品
          </AppButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>
