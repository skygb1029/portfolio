<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}>()

const isInternal = computed(() => props.href?.startsWith('/') ?? false)

const variantClasses = {
  primary:
    'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200',
  secondary:
    'border border-zinc-300 bg-white/80 text-zinc-900 hover:border-indigo-400 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-indigo-500',
  ghost: 'text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

const btnClass = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 hover-glow',
  variantClasses[props.variant ?? 'primary'],
  sizeClasses[props.size ?? 'md'],
])
</script>

<template>
  <RouterLink v-if="href && isInternal" :to="href" :class="btnClass">
    <slot />
  </RouterLink>
  <a v-else-if="href" :href="href" :class="btnClass">
    <slot />
  </a>
  <button v-else type="button" :class="btnClass">
    <slot />
  </button>
</template>
