<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { careerTimeline } from '@/data/career'
</script>

<template>
  <section
    id="career"
    class="section-padding bg-zinc-100/50 dark:bg-zinc-900/30"
  >
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="Career"
          title="職涯時間軸"
          subtitle="從全端開發、專案管理到企業前端與 AI 產品化的完整歷程。"
          align="center"
        />
      </ScrollReveal>

      <div class="relative mt-16 max-w-3xl mx-auto">
        <div
          class="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent sm:left-6"
          aria-hidden="true"
        />
        <ScrollReveal
          v-for="(entry, i) in careerTimeline"
          :key="entry.id"
          :delay="i * 60"
        >
          <div class="relative flex gap-6 pb-10 last:pb-0 sm:gap-8">
            <div
              class="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-indigo-500/60 bg-white text-[10px] font-bold leading-tight text-indigo-600 dark:bg-zinc-950 dark:text-indigo-400"
            >
              {{ entry.period.includes('–') ? entry.period.split('–')[0].trim().slice(-2) : entry.period.slice(-2) }}
            </div>
            <div class="glow-border flex-1 rounded-2xl p-5 sm:p-6">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {{ entry.company }}
                </h3>
                <span class="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {{ entry.period }}
                </span>
              </div>
              <p class="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {{ entry.role }}
              </p>
              <ul v-if="entry.highlights?.length" class="mt-3 space-y-1">
                <li
                  v-for="h in entry.highlights"
                  :key="h"
                  class="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <span class="h-1 w-1 rounded-full bg-indigo-500" />
                  {{ h }}
                </li>
              </ul>
              <div v-if="entry.tech?.length" class="mt-4 flex flex-wrap gap-1.5">
                <span
                  v-for="t in entry.tech"
                  :key="t"
                  class="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  {{ t }}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
