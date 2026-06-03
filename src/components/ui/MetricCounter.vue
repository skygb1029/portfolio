<script setup lang="ts">
import { ref } from 'vue'
import { useCounter } from '@/composables/useCounter'

const props = defineProps<{
  value: number
  suffix?: string
  label: string
  labelZh: string
}>()

const el = ref<HTMLElement | null>(null)
const { display } = useCounter(el, props.value)
</script>

<template>
  <div ref="el" class="glow-border rounded-2xl p-6 text-center sm:p-8">
    <p class="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
      {{ display }}{{ suffix }}
    </p>
    <p class="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
      {{ label }}
    </p>
    <p class="mt-1 text-xs text-zinc-500">{{ labelZh }}</p>
  </div>
</template>
