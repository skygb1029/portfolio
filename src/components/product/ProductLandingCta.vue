<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  getProductById,
  hasInternalApp,
  hasApiPreview,
  type ProductRegistryEntry,
} from '@/data/products'
import { trackEvent } from '@/composables/useAnalytics'

const props = defineProps<{
  productId: string
  showWaitlist?: boolean
  showDemo?: boolean
  size?: 'hero' | 'footer'
}>()

const emit = defineEmits<{
  openPreview: []
  joinWaitlist: []
}>()

const registry = computed(() => getProductById(props.productId))
const canUseInternal = computed(() => registry.value && hasInternalApp(registry.value))
const canPreview = computed(() => registry.value && hasApiPreview(registry.value))

const btnClass = computed(() =>
  props.size === 'footer'
    ? 'rounded-full px-10 py-3.5 text-base font-semibold'
    : 'rounded-full px-8 py-3 text-sm font-semibold',
)

function trackUse(entry: ProductRegistryEntry, internal: boolean) {
  trackEvent('cta_use_product', {
    product_id: entry.id,
    mount: internal ? 'internal' : 'external',
  })
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <RouterLink
      v-if="canUseInternal && registry"
      :to="registry.appBasePath!"
      :class="[btnClass, 'inline-flex items-center bg-emerald-600 text-white hover:bg-emerald-500']"
      @click="trackUse(registry, true)"
    >
      立即使用
    </RouterLink>

    <button
      v-if="canPreview"
      type="button"
      :class="[btnClass, 'border border-violet-400/80 bg-violet-500/10 text-violet-800 hover:bg-violet-500/20 dark:text-violet-300']"
      @click="emit('openPreview')"
    >
      產品預覽模式
    </button>

    <button
      v-if="showWaitlist !== false"
      type="button"
      :class="[btnClass, 'bg-indigo-600 text-white hover:bg-indigo-500']"
      @click="emit('joinWaitlist')"
    >
      加入等待名單
    </button>

    <RouterLink
      v-if="showDemo !== false"
      to="/demo"
      :class="[
        btnClass,
        'inline-flex items-center border border-zinc-300 text-zinc-900 hover:border-indigo-500 dark:border-zinc-600 dark:text-zinc-100',
      ]"
      @click="trackEvent('cta_demo', { product_id: productId })"
    >
      Hub Demo
    </RouterLink>
  </div>
</template>
