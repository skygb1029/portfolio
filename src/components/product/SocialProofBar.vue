<script setup lang="ts">
defineProps<{
  waitlistCount: number
  featuresBuilt: number
  featuresTotal: number
  eta: string
}>()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-3">
    <div class="glow-border rounded-xl p-4 text-center">
      <p class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{{ waitlistCount }}+</p>
      <p class="mt-1 text-xs text-zinc-500">等待名單</p>
    </div>
    <div class="glow-border rounded-xl p-4 text-center">
      <p class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {{ featuresBuilt }}/{{ featuresTotal }}
      </p>
      <p class="mt-1 text-xs text-zinc-500">已開發功能</p>
    </div>
    <div class="glow-border rounded-xl p-4 text-center">
      <p class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{{ eta }}</p>
      <p class="mt-1 text-xs text-zinc-500">預計上線</p>
    </div>
  </div>
</template>
