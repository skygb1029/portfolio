<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
  }>(),
  { align: 'left' },
)
</script>

<template>
  <div :class="align === 'center' ? 'text-center' : 'text-left'">
    <p
      v-if="label"
      class="mb-3 text-sm font-medium tracking-widest text-indigo-500 uppercase dark:text-indigo-400"
    >
      {{ label }}
    </p>
    <h2
      class="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
