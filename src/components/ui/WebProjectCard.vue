<script setup lang="ts">
import type { WebProject } from '@/data/projects'
import { useProjectModalStore } from '@/stores/projectModal'

defineProps<{ project: WebProject }>()

const modal = useProjectModalStore()

function openDetail(id: string) {
  modal.open(id)
}
</script>

<template>
  <article
    class="glow-border group flex h-full cursor-pointer flex-col rounded-2xl p-6 text-left transition-transform duration-300 hover:-translate-y-1"
    role="button"
    tabindex="0"
    :aria-label="`查看 ${project.title} 詳細介紹`"
    @click="openDetail(project.id)"
    @keydown.enter="openDetail(project.id)"
    @keydown.space.prevent="openDetail(project.id)"
  >
    <div
      class="mb-5 flex h-24 items-end rounded-xl bg-gradient-to-br p-4"
      :class="project.gradient"
    >
      <span class="text-2xl opacity-80" aria-hidden="true">🖥</span>
    </div>
    <h3
      class="text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400"
    >
      {{ project.title }}
    </h3>
    <p class="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      {{ project.description }}
    </p>
    <div class="mt-4">
      <p class="text-xs font-medium text-zinc-500">功能</p>
      <ul class="mt-2 space-y-1">
        <li
          v-for="f in project.features.slice(0, 3)"
          :key="f"
          class="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
        >
          <span class="h-1 w-1 rounded-full bg-indigo-500" />
          {{ f }}
        </li>
      </ul>
    </div>
    <div class="mt-auto flex items-center justify-between pt-5">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="t in project.tech.slice(0, 3)"
          :key="t"
          class="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
        >
          {{ t }}
        </span>
      </div>
      <span class="text-xs font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-indigo-400">
        詳細 →
      </span>
    </div>
  </article>
</template>
