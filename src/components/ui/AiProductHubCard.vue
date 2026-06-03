<script setup lang="ts">
import type { AiProject } from '@/data/projects'
import AiFlowDiagram from '@/components/architecture/AiFlowDiagram.vue'
import { useProjectModalStore } from '@/stores/projectModal'
import { useWaitlistModalStore } from '@/stores/waitlistModal'
import { trackEvent } from '@/composables/useAnalytics'

const props = defineProps<{ project: AiProject }>()

const projectModal = useProjectModalStore()
const waitlistModal = useWaitlistModalStore()

const flowVariant = props.project.id as 'stock' | 'parenting' | 'cs'

function joinWaitlist() {
  trackEvent('cta_waitlist', { product_id: props.project.id })
  waitlistModal.open(props.project.id)
}

function viewIntro() {
  trackEvent('cta_product_intro', { product_id: props.project.id })
  projectModal.open(props.project.id)
}
</script>

<template>
  <article
    :id="`ai-${project.id}`"
    class="glow-border overflow-hidden rounded-2xl"
  >
    <div class="border-b border-zinc-200/80 px-4 py-3 dark:border-zinc-800 sm:px-6">
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
        >
          Building Now
        </span>
        <span
          class="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300"
        >
          {{ project.statusLabel }}
        </span>
      </div>
    </div>

    <div class="lg:grid lg:grid-cols-5">
      <div
        class="flex flex-col justify-center bg-gradient-to-br p-6 lg:col-span-2"
        :class="project.gradient"
      >
        <div class="mb-4 flex justify-center lg:justify-start">
          <span class="text-4xl" aria-hidden="true">
            {{ project.id === 'stock' ? '📈' : project.id === 'parenting' ? '👶' : '💬' }}
          </span>
        </div>
        <AiFlowDiagram :variant="flowVariant" />
      </div>

      <div class="flex flex-col p-6 sm:p-8 lg:col-span-3">
        <h3 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {{ project.title }}
        </h3>
        <p class="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
          {{ project.description }}
        </p>

        <div class="mt-5">
          <div class="flex justify-between text-xs font-medium text-zinc-500">
            <span>開發進度</span>
            <span>{{ project.progress }}%</span>
          </div>
          <div
            class="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
            role="progressbar"
            :aria-valuenow="project.progress"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
              :style="{ width: `${project.progress}%` }"
            />
          </div>
        </div>

        <ul class="mt-5 flex flex-wrap gap-2">
          <li
            v-for="t in project.tech"
            :key="t"
            class="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs dark:border-zinc-700 dark:bg-zinc-900"
          >
            {{ t }}
          </li>
        </ul>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            class="flex-1 rounded-full bg-indigo-600 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
            @click="joinWaitlist"
          >
            加入等待名單
          </button>
          <button
            type="button"
            class="flex-1 rounded-full border border-zinc-300 py-3 text-sm font-semibold text-zinc-900 transition-all hover:border-indigo-500 dark:border-zinc-600 dark:text-zinc-100"
            @click="viewIntro"
          >
            查看產品介紹
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
