<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { timelineEntries } from '@/data/timeline'
</script>

<template>
  <section
    id="timeline"
    class="section-padding bg-zinc-100/50 dark:bg-zinc-900/30"
  >
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="Journey"
          title="個人成長歷程"
          subtitle="從前端工程師到 AI 產品創業者的轉型路徑。"
          align="center"
        />
      </ScrollReveal>

      <div class="relative mt-16 max-w-2xl mx-auto">
        <div
          class="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent sm:left-8"
          aria-hidden="true"
        />
        <ScrollReveal
          v-for="(entry, i) in timelineEntries"
          :key="entry.id"
          :delay="i * 80"
        >
          <div class="relative flex gap-6 pb-12 last:pb-0 sm:gap-8">
            <div
              class="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-indigo-500 bg-white text-xs font-bold text-indigo-600 dark:bg-zinc-950 dark:text-indigo-400"
            >
              {{ entry.year.slice(2) }}
            </div>
            <div class="glow-border flex-1 rounded-2xl p-5 pt-4">
              <p class="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                {{ entry.year }}
              </p>
              <h3 class="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {{ entry.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {{ entry.description }}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
