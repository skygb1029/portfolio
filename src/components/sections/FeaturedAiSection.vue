<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { aiProjects, featuredAiIds } from '@/data/projects'
import { useProjectModalStore } from '@/stores/projectModal'

const featured = aiProjects.filter((p) => featuredAiIds.includes(p.id))
const modal = useProjectModalStore()
</script>

<template>
  <section id="featured" class="section-padding border-t border-zinc-200/60 dark:border-zinc-800/60">
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="重點展示"
          title="AI 產品生態系"
          subtitle="三位一體的 AI SaaS 產品線 — 從金融、育兒到多平台客服，以 LINE 與 OpenAI 驅動真實商業場景。"
          align="center"
        />
      </ScrollReveal>

      <div class="mt-16 grid gap-6 lg:grid-cols-3">
        <ScrollReveal
          v-for="(project, i) in featured"
          :key="project.id"
          :delay="i * 100"
        >
          <button
            type="button"
            class="group glow-border flex h-full w-full flex-col overflow-hidden rounded-2xl p-6 text-left transition-transform duration-300 hover:-translate-y-1"
            @click="modal.open(project.id)"
          >
            <div
              class="mb-6 flex h-36 items-center justify-center rounded-xl bg-gradient-to-br"
              :class="project.gradient"
            >
              <div
                class="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl backdrop-blur dark:bg-black/20"
              >
                {{ project.id === 'stock' ? '📈' : project.id === 'parenting' ? '👶' : '💬' }}
              </div>
            </div>
            <h3
              class="text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400"
            >
              {{ project.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {{ project.description }}
            </p>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li
                v-for="tag in project.tech.slice(0, 3)"
                :key="tag"
                class="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {{ tag }}
              </li>
            </ul>
            <span
              class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400"
            >
              查看詳細介紹
              <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
