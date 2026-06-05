<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getLandingBySlug } from '@/data/productLandings'
import ProductStatusBadge from '@/components/ui/ProductStatusBadge.vue'
import SocialProofBar from '@/components/product/SocialProofBar.vue'
import ProductVideo from '@/components/product/ProductVideo.vue'
import ProductFeedbackSection from '@/components/product/ProductFeedbackSection.vue'
import ProductLandingCta from '@/components/product/ProductLandingCta.vue'
import ProductPreviewPanel from '@/components/product/ProductPreviewPanel.vue'
import AiFlowDiagram from '@/components/architecture/AiFlowDiagram.vue'
import { getProductBySlug, hasApiPreview } from '@/data/products'
import { useWaitlistModalStore } from '@/stores/waitlistModal'
import { useProductGithubProgress } from '@/composables/useProductGithubProgress'
import { trackEvent } from '@/composables/useAnalytics'

const route = useRoute()
const waitlist = useWaitlistModalStore()

const product = computed(() => getLandingBySlug(route.params.slug as string))
const registry = computed(() =>
  product.value ? getProductBySlug(product.value.slug) : undefined,
)
const githubId = computed(() => product.value?.githubProductId ?? '')
const { progress } = useProductGithubProgress(githubId)
const previewOpen = ref(false)

function joinWaitlist() {
  if (!product.value) return
  trackEvent('cta_landing_waitlist', { product_id: product.value.id })
  waitlist.open(product.value.id, route.path)
}
</script>

<template>
  <div v-if="product" class="pt-16">
    <section
      class="section-padding relative overflow-hidden border-b border-zinc-200/60 dark:border-zinc-800/60"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60"
        :class="product.gradient"
      />
      <div class="relative mx-auto max-w-6xl">
        <RouterLink
          to="/"
          class="text-sm text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          ← 返回 Product Hub
        </RouterLink>
        <div class="mt-6 flex flex-wrap items-center gap-3">
          <ProductStatusBadge :status="product.lifecycleStatus" />
          <span class="text-3xl" aria-hidden="true">{{ product.emoji }}</span>
        </div>
        <h1 class="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          {{ product.title }}
        </h1>
        <p class="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          {{ product.tagline }}
        </p>
        <ProductLandingCta
          v-if="product"
          :product-id="product.id"
          @join-waitlist="joinWaitlist"
          @open-preview="previewOpen = true"
        />
        <ProductPreviewPanel
          v-if="product && registry && hasApiPreview(registry)"
          :product-id="product.id"
          :open="previewOpen"
          @close="previewOpen = false"
        />
        <div v-if="product.videoSrc" class="mt-10 max-w-2xl">
          <ProductVideo :src="product.videoSrc" :title="product.title" />
        </div>
        <div v-if="progress" class="mt-6 flex flex-wrap gap-3 text-xs text-zinc-500">
          <span>版本 {{ progress.currentVersion }}</span>
          <span v-if="progress.latestRelease">· {{ progress.latestRelease.name }}</span>
        </div>
        <div class="mt-12">
          <SocialProofBar
            :waitlist-count="product.waitlistCount"
            :features-built="product.featuresBuilt"
            :features-total="product.featuresTotal"
            :eta="product.eta"
          />
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="mx-auto max-w-6xl lg:grid lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">問題</h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="p in product.problems"
              :key="p"
              class="flex gap-3 text-zinc-600 dark:text-zinc-400"
            >
              <span class="text-rose-500">?</span>
              {{ p }}
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">解決方案</h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="s in product.solutions"
              :key="s"
              class="flex gap-3 text-zinc-600 dark:text-zinc-400"
            >
              <svg class="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ s }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section-padding bg-zinc-100/50 dark:bg-zinc-900/30">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{{ product.demo.title }}</h2>
        <div class="mt-8 grid gap-6 md:grid-cols-3">
          <article
            v-for="section in product.demo.sections"
            :key="section.title"
            class="glow-border rounded-2xl p-6"
          >
            <h3 class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{{ section.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
              {{ section.content }}
            </p>
          </article>
        </div>
        <div v-if="product.flowVariant" class="mt-12 max-w-sm mx-auto">
          <p class="mb-4 text-center text-sm text-zinc-500">系統架構</p>
          <AiFlowDiagram :variant="product.flowVariant" />
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">產品畫面</h2>
        <div class="mt-8 grid gap-6 sm:grid-cols-2">
          <div
            v-for="shot in product.screenshots"
            :key="shot.label"
            class="glow-border flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700"
          >
            <p class="text-sm font-medium text-zinc-600 dark:text-zinc-400">{{ shot.label }}</p>
            <p class="mt-2 text-xs text-zinc-400">截圖預留區</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-zinc-100/50 dark:bg-zinc-900/30">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">商業模式</h2>
        <div class="mt-8 grid gap-6 md:grid-cols-3">
          <div class="glow-border rounded-2xl p-6">
            <p class="text-xs font-semibold uppercase text-zinc-500">適合誰使用</p>
            <p class="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{{ product.business.audience }}</p>
          </div>
          <div class="glow-border rounded-2xl p-6">
            <p class="text-xs font-semibold uppercase text-zinc-500">預計收費模式</p>
            <p class="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{{ product.business.pricing }}</p>
          </div>
          <div class="glow-border rounded-2xl p-6">
            <p class="text-xs font-semibold uppercase text-zinc-500">功能規劃</p>
            <ul class="mt-3 space-y-2">
              <li
                v-for="r in product.business.roadmap"
                :key="r"
                class="text-sm text-zinc-700 dark:text-zinc-300"
              >
                · {{ r }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <ProductFeedbackSection
      v-if="product"
      :product-key="product.slug"
    />

    <section class="section-padding border-t border-zinc-200 dark:border-zinc-800">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">搶先加入等待名單</h2>
        <p class="mt-3 text-zinc-600 dark:text-zinc-400">產品上線時優先通知，並取得早鳥優惠資格。</p>
        <div class="mt-8 flex justify-center">
          <ProductLandingCta
            v-if="product"
            :product-id="product.id"
            size="footer"
            :show-demo="false"
            @join-waitlist="joinWaitlist"
            @open-preview="previewOpen = true"
          />
        </div>
      </div>
    </section>
  </div>

  <div v-else class="flex min-h-[60vh] flex-col items-center justify-center pt-16">
    <p class="text-zinc-500">找不到此產品</p>
    <RouterLink to="/" class="mt-4 text-indigo-600">返回首頁</RouterLink>
  </div>
</template>
