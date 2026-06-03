<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal, type RevealVariant } from '@/composables/useScrollReveal'

const props = withDefaults(
  defineProps<{
    variant?: RevealVariant
    delay?: number
    as?: string
  }>(),
  { variant: 'fade-up', delay: 0, as: 'div' },
)

const el = ref<HTMLElement | null>(null)
const { revealClass } = useScrollReveal(el, props.variant)
</script>

<template>
  <component
    :is="as"
    ref="el"
    :class="revealClass()"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot />
  </component>
</template>
