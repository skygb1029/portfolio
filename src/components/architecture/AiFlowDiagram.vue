<script setup lang="ts">
export type FlowVariant = 'stock' | 'parenting' | 'cs'

const props = defineProps<{ variant: FlowVariant }>()

const flows: Record<FlowVariant, string[]> = {
  stock: [
    '使用者',
    'LINE Bot',
    'Express API',
    'AI Service',
    'Stock Intelligence Engine',
    'Response',
  ],
  parenting: ['使用者', 'LINE Bot', 'Parser', 'Reminder Engine', 'Dashboard'],
  cs: ['LINE / IG / FB', 'Webhook Gateway', 'AI Engine', 'CRM', 'Dashboard'],
}

const steps = () => flows[props.variant]
</script>

<template>
  <svg
    :viewBox="`0 0 280 ${steps().length * 56 + 16}`"
    class="mx-auto w-full max-w-xs text-zinc-700 dark:text-zinc-300"
    role="img"
    :aria-label="`${variant} 系統流程圖`"
  >
    <defs>
      <linearGradient id="flowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" class="[stop-color:theme(colors.indigo.500)]" style="stop-color: #6366f1" />
        <stop offset="100%" class="[stop-color:theme(colors.violet.500)]" style="stop-color: #8b5cf6" />
      </linearGradient>
    </defs>
    <template v-for="(step, i) in steps()" :key="step">
      <rect
        :x="40"
        :y="12 + i * 56"
        width="200"
        height="40"
        rx="10"
        fill="currentColor"
        fill-opacity="0.06"
        stroke="url(#flowGrad)"
        stroke-width="1.5"
      />
      <text
        :x="140"
        :y="36 + i * 56"
        text-anchor="middle"
        class="fill-current text-[13px] font-medium"
        style="font-family: Inter, 'Noto Sans TC', sans-serif"
      >
        {{ step }}
      </text>
      <path
        v-if="i < steps().length - 1"
        :d="`M140 ${52 + i * 56} L140 ${68 + i * 56}`"
        stroke="url(#flowGrad)"
        stroke-width="2"
        marker-end="url(#arrow)"
        fill="none"
      />
      <polygon
        v-if="i < steps().length - 1"
        :points="`135,${64 + i * 56} 145,${64 + i * 56} 140,${70 + i * 56}`"
        fill="#6366f1"
      />
    </template>
  </svg>
</template>
