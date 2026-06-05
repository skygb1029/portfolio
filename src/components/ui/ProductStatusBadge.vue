<script setup lang="ts">
import type { ProductLifecycleStatus } from '@/data/productStatus'
import { productStatusLabels, productStatusColors } from '@/data/productStatus'

defineProps<{ status: ProductLifecycleStatus }>()
</script>

<template>
  <span
    class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
    :class="productStatusColors[status]"
  >
    {{ productStatusLabels[status] }}
  </span>
</template>
