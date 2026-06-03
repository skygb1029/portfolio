<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import MetricCounter from '@/components/ui/MetricCounter.vue'
import { metrics } from '@/data/metrics'
</script>

<template>
  <section
    id="metrics"
    class="relative border-y border-zinc-200/60 bg-zinc-100/40 py-12 dark:border-zinc-800/60 dark:bg-zinc-900/20 sm:py-16"
    aria-label="關鍵數據"
  >
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <MetricCounter
            v-for="m in metrics"
            :key="m.id"
            :value="m.value"
            :suffix="m.suffix"
            :label="m.label"
            :label-zh="m.labelZh"
          />
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>
