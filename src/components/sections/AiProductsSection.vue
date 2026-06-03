<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import AiProductHubCard from '@/components/ui/AiProductHubCard.vue'
import { aiProjects } from '@/data/projects'
import { useWaitlistModalStore } from '@/stores/waitlistModal'
import { trackEvent } from '@/composables/useAnalytics'

const waitlist = useWaitlistModalStore()

function openGeneralWaitlist() {
  trackEvent('cta_waitlist_hub')
  waitlist.open()
}
</script>

<template>
  <section
    id="ai-products"
    class="section-padding border-t border-zinc-200/60 dark:border-zinc-800/60"
  >
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <div class="text-center">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
          >
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Building Now
          </span>
        </div>
        <div class="mt-6">
        <SectionTitle
          label="AI Products"
          title="正在打造的 AI 產品"
          subtitle="每一項產品皆具備架構圖、技術堆疊、開發進度與等待名單 — 歡迎搶先體驗。"
          align="center"
        />
        </div>
      </ScrollReveal>

      <ScrollReveal :delay="80">
        <div class="mt-10 space-y-12">
          <AiProductHubCard
            v-for="(project, i) in aiProjects"
            :key="project.id"
            :project="project"
            :style="{ transitionDelay: `${i * 80}ms` }"
          />
        </div>
      </ScrollReveal>

      <ScrollReveal :delay="160">
        <div class="mt-12 text-center">
          <button
            type="button"
            class="rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            @click="openGeneralWaitlist"
          >
            加入產品等待名單
          </button>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>
