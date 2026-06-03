<script setup lang="ts">
import type { EnterpriseProject } from '@/data/enterprise'
import { useProjectModalStore } from '@/stores/projectModal'

defineProps<{ project: EnterpriseProject }>()

const modal = useProjectModalStore()

function openDetail(id: string) {
  modal.open(id)
}
</script>

<template>
  <article
    class="glow-border group flex h-full cursor-pointer flex-col rounded-2xl p-6 text-left transition-transform hover:-translate-y-1"
    role="button"
    tabindex="0"
    @click="openDetail(project.id)"
    @keydown.enter="openDetail(project.id)"
    @keydown.space.prevent="openDetail(project.id)"
  >
    <div class="flex items-start justify-between gap-2">
      <span
        v-if="project.statusLabel"
        class="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400"
      >
        {{ project.statusLabel }}
      </span>
      <span class="text-xs text-zinc-500">Enterprise</span>
    </div>
    <div
      class="mb-5 mt-4 flex h-20 items-center rounded-xl bg-gradient-to-br px-4"
      :class="project.gradient"
    >
      <span class="text-2xl opacity-70" aria-hidden="true">🏢</span>
    </div>
    <h3
      class="text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400"
    >
      {{ project.title }}
    </h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      {{ project.description }}
    </p>
    <div class="mt-4 flex flex-wrap gap-1.5">
      <span
        v-for="t in project.tech"
        :key="t"
        class="rounded-md bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800"
      >
        {{ t }}
      </span>
    </div>
    <span class="mt-4 text-xs font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-indigo-400">
      查看案例詳情 →
    </span>
  </article>
</template>
