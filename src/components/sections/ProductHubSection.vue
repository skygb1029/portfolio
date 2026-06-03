<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { roadmapItems } from '@/data/roadmap'

const statusLabel = {
  building: '開發中',
  planned: '規劃中',
}
</script>

<template>
  <section
    id="product-hub"
    class="section-padding bg-zinc-100/50 dark:bg-zinc-900/30"
  >
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="Product Hub"
          title="正在打造的 AI SaaS 生態系"
          subtitle="從金融、育兒、客服到影片生成 — 產品矩陣與上線 Roadmap。"
          align="center"
        />
      </ScrollReveal>

      <div class="relative mt-16">
        <div
          class="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-indigo-500/60 via-violet-500/40 to-transparent sm:left-1/2 sm:-translate-x-px"
          aria-hidden="true"
        />

        <div class="space-y-12">
          <ScrollReveal
            v-for="(item, i) in roadmapItems"
            :key="item.id"
            :delay="i * 100"
          >
            <div
              class="relative flex flex-col gap-4 sm:flex-row sm:items-center"
              :class="i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'"
            >
              <div
                class="hidden flex-1 sm:block"
                :class="i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'"
              >
                <span class="text-sm font-medium text-zinc-500">{{ item.quarter }}</span>
              </div>

              <div
                class="absolute left-4 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center sm:left-1/2"
              >
                <span
                  class="h-3 w-3 rounded-full ring-4 ring-zinc-100 dark:ring-zinc-900"
                  :class="
                    item.status === 'building'
                      ? 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]'
                      : 'bg-zinc-400 dark:bg-zinc-600'
                  "
                />
              </div>

              <div
                class="glow-border ml-10 flex-1 rounded-2xl p-6 sm:ml-0"
                :class="i % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12'"
              >
                <span class="text-sm text-zinc-500 sm:hidden">{{ item.quarter }}</span>
                <span
                  class="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium sm:mt-0"
                  :class="
                    item.status === 'building'
                      ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                      : 'bg-zinc-200/80 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                  "
                >
                  {{ statusLabel[item.status] }}
                </span>
                <h3 class="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {{ item.title }}
                </h3>
                <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {{ item.description }}
                </p>
              </div>

              <div class="hidden flex-1 sm:block" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
</template>
