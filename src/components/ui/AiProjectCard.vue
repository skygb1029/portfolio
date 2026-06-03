<script setup lang="ts">
import type { AiProject } from '@/data/projects'
import { useProjectModalStore } from '@/stores/projectModal'
import AiFlowDiagram from '@/components/architecture/AiFlowDiagram.vue'

const props = defineProps<{ project: AiProject }>()
const modal = useProjectModalStore()

const flowVariant = props.project.id as 'stock' | 'parenting' | 'cs'

function openDetail() {
  modal.open(props.project.id)
}
</script>

<template>
  <article
    :id="`ai-${project.id}`"
    class="glow-border group overflow-hidden rounded-2xl lg:grid lg:grid-cols-5 lg:gap-0"
  >
    <div
      class="relative flex min-h-[220px] flex-col items-center justify-center bg-gradient-to-br p-6 lg:col-span-2 lg:min-h-[360px]"
      :class="project.gradient"
    >
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div class="relative w-full px-4">
        <p class="mb-3 text-center text-xs font-medium text-white/80">系統流程</p>
        <AiFlowDiagram :variant="flowVariant" />
      </div>
    </div>

    <div class="flex flex-col p-6 sm:p-8 lg:col-span-3">
      <div class="mb-2 flex items-center gap-2">
        <span
          class="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400"
        >
          AI 專案
        </span>
        <span
          v-if="project.featured"
          class="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400"
        >
          重點產品
        </span>
      </div>

      <h3 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {{ project.title }}
      </h3>
      <p class="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {{ project.description }}
      </p>

      <div class="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">功能</p>
          <ul class="mt-3 space-y-2">
            <li
              v-for="f in project.features.slice(0, 4)"
              :key="f"
              class="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
            >
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ f }}
            </li>
          </ul>
        </div>
        <div>
          <p class="text-xs font-semibold tracking-wider text-zinc-500 uppercase">特色</p>
          <ul class="mt-3 space-y-2">
            <li
              v-for="h in project.highlights"
              :key="h"
              class="rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300"
            >
              {{ h }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-6 flex flex-wrap gap-2 border-t border-zinc-200/80 pt-6 dark:border-zinc-800">
        <span
          v-for="t in project.tech"
          :key="t"
          class="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        >
          {{ t }}
        </span>
      </div>

      <button
        type="button"
        class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 py-3 text-sm font-medium text-zinc-900 transition-all hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 sm:w-auto sm:px-8 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300"
        @click="openDetail"
      >
        查看完整專案介紹
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </article>
</template>
