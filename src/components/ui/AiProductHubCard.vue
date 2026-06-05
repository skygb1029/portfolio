<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { AiProject } from '@/data/projects'
import { getLandingBySlug } from '@/data/productLandings'
import { getProductById, hasInternalApp } from '@/data/products'
import ProductStatusBadge from '@/components/ui/ProductStatusBadge.vue'
import AiFlowDiagram from '@/components/architecture/AiFlowDiagram.vue'
import ProductVideo from '@/components/product/ProductVideo.vue'
import { useWaitlistModalStore } from '@/stores/waitlistModal'
import { trackEvent } from '@/composables/useAnalytics'
import type { ProductLifecycleStatus } from '@/data/productStatus'

const props = defineProps<{ project: AiProject }>()

const waitlist = useWaitlistModalStore()
const landing = () => getLandingBySlug(
  props.project.id === 'stock'
    ? 'stock-secretary'
    : props.project.id === 'parenting'
      ? 'parenting-assistant'
      : 'sales-assistant',
)

const flowVariant = props.project.id as 'stock' | 'parenting' | 'cs'

const lifecycleMap: Record<string, ProductLifecycleStatus> = {
  stock: 'beta',
  parenting: 'beta',
  cs: 'mvp',
}

const registry = () => getProductById(props.project.id)

function joinWaitlist() {
  trackEvent('cta_waitlist', { product_id: props.project.id })
  waitlist.open(props.project.id)
}

function appPath(): string | null {
  const entry = registry()
  if (!entry || !hasInternalApp(entry)) return null
  return entry.appBasePath ?? null
}
</script>

<template>
  <article
    :id="`ai-${project.id}`"
    class="glow-border overflow-hidden rounded-2xl"
  >
    <div class="border-b border-zinc-200/80 px-4 py-3 dark:border-zinc-800 sm:px-6">
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400"
        >
          Building Now
        </span>
        <ProductStatusBadge :status="lifecycleMap[project.id] ?? 'mvp'" />
      </div>
    </div>

    <div class="lg:grid lg:grid-cols-5">
      <div
        class="flex flex-col justify-center bg-gradient-to-br p-6 lg:col-span-2"
        :class="project.gradient"
      >
        <ProductVideo
          v-if="landing()?.videoSrc"
          :src="landing()!.videoSrc!"
          :title="project.title"
          class="mb-4"
        />
        <div v-else class="mb-4 flex justify-center lg:justify-start">
          <span class="text-4xl" aria-hidden="true">
            {{ project.id === 'stock' ? '📈' : project.id === 'parenting' ? '👶' : '💬' }}
          </span>
        </div>
        <AiFlowDiagram :variant="flowVariant" />
      </div>

      <div class="flex flex-col p-6 sm:p-8 lg:col-span-3">
        <h3 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {{ project.title }}
        </h3>
        <p class="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
          {{ project.description }}
        </p>

        <div v-if="landing()" class="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div class="rounded-lg bg-zinc-100 py-2 dark:bg-zinc-800">
            <p class="font-bold text-zinc-900 dark:text-zinc-100">{{ landing()!.waitlistCount }}+</p>
            <p class="text-zinc-500">等待名單</p>
          </div>
          <div class="rounded-lg bg-zinc-100 py-2 dark:bg-zinc-800">
            <p class="font-bold">{{ landing()!.featuresBuilt }}/{{ landing()!.featuresTotal }}</p>
            <p class="text-zinc-500">功能</p>
          </div>
          <div class="rounded-lg bg-zinc-100 py-2 dark:bg-zinc-800">
            <p class="font-semibold text-indigo-600">{{ landing()!.eta.split(' ')[0] }}</p>
            <p class="text-zinc-500">上線</p>
          </div>
        </div>

        <div class="mt-5">
          <div class="flex justify-between text-xs font-medium text-zinc-500">
            <span>開發進度</span>
            <span>{{ project.progress }}%</span>
          </div>
          <div class="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              :style="{ width: `${project.progress}%` }"
            />
          </div>
        </div>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <RouterLink
            v-if="appPath()"
            :to="appPath()!"
            class="flex flex-1 items-center justify-center rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
            @click="trackEvent('cta_app_experience', { product_id: project.id })"
          >
            立即體驗
          </RouterLink>
          <button
            type="button"
            class="flex-1 rounded-full bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
            @click="joinWaitlist"
          >
            加入等待名單
          </button>
          <RouterLink
            v-if="landing()"
            :to="`/product/${landing()!.slug}`"
            class="flex flex-1 items-center justify-center rounded-full border border-zinc-300 py-3 text-sm font-semibold hover:border-indigo-500 dark:border-zinc-600"
          >
            產品介紹 →
          </RouterLink>
        </div>
        <RouterLink
          to="/demo"
          class="mt-3 text-center text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          或先體驗 Demo →
        </RouterLink>
      </div>
    </div>
  </article>
</template>
