<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getLandingBySlug } from '@/data/productLandings'
import { productScenarios } from '@/data/productScenarios'
import { findRelatedArticle } from '@/data/blog'
import ProductStatusBadge from '@/components/ui/ProductStatusBadge.vue'
import ProductFeedbackSection from '@/components/product/ProductFeedbackSection.vue'
import ProductLandingCta from '@/components/product/ProductLandingCta.vue'
import LineJoinCta from '@/products/stock/components/LineJoinCta.vue'
import LineBotQr from '@/components/product/LineBotQr.vue'
import ProductPreviewPanel from '@/components/product/ProductPreviewPanel.vue'
import ProductWorkbench from '@/components/product/ProductWorkbench.vue'
import AiFlowDiagram from '@/components/architecture/AiFlowDiagram.vue'
import { getProductBySlug, hasApiPreview } from '@/data/products'
import { useWaitlistModalStore } from '@/stores/waitlistModal'
import { trackEvent } from '@/composables/useAnalytics'

const route = useRoute()
const waitlist = useWaitlistModalStore()
const props = defineProps<{ slug: string }>()
const product = computed(() => getLandingBySlug(props.slug))
const guide = computed(() => productScenarios[product.value?.id ?? ''])
const relatedArticle = computed(() => findRelatedArticle('/product/' + props.slug))
const registry = computed(() => getProductBySlug(props.slug))
const previewOpen = ref(false)
const activeIndex = ref(0)
const previewScenario = computed(() => guide.value?.scenes[activeIndex.value])
const publicLineUrls: Record<string, string | undefined> = {
  parenting: import.meta.env.VITE_PARENTING_LINE_URL,
  cs: import.meta.env.VITE_SALES_LINE_URL,
  life: import.meta.env.VITE_LIFE_LINE_URL,
}
const publicLineUrl = computed(() => publicLineUrls[product.value?.id ?? '']?.trim() ?? '')
const workbenchKind = computed(() => product.value?.id === 'cs' ? 'sales' : product.value?.id === 'life' ? 'life' : null)
const workbenchIntro = computed(() => workbenchKind.value === 'sales'
  ? '給需要處理訂單、配送與退換貨問題的客服團隊。一則顧客訊息進來後，先分類、擬回覆，再由客服確認內容或標記交班。'
  : '把散落的待辦、行程與提醒整理成一張清單。可先在網頁記下要做的事，完成後勾掉，回來就知道還有哪些事沒處理。')

watch(() => props.slug, () => {
  activeIndex.value = 0
  previewOpen.value = false
})
function joinWaitlist() {
  if (!product.value) return
  trackEvent('cta_landing_waitlist', { product_id: product.value.id })
  waitlist.open(product.value.id, route.path)
}
</script>

<template>
  <div v-if="product && guide">
    <section class="relative overflow-hidden border-b border-zinc-200 px-5 py-10 sm:px-8 sm:py-16 dark:border-zinc-800">
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-65" :class="product.gradient" aria-hidden="true"></div>
      <div class="relative mx-auto max-w-6xl">
        <RouterLink to="/products" class="font-semibold text-indigo-700 hover:underline dark:text-indigo-300">← 返回 AI 產品</RouterLink>
        <div class="mt-7 grid min-w-0 items-start gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-3">
              <ProductStatusBadge :status="product.lifecycleStatus" />
              <p class="font-semibold text-zinc-700 dark:text-zinc-200">{{ guide.tag }}</p>
            </div>
            <h1 class="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-6xl">{{ product.title }}</h1>
            <p class="mt-5 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-200">{{ workbenchKind ? workbenchIntro : guide.intro }}</p>
            <a v-if="workbenchKind" href="#workbench" class="mt-6 inline-flex rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white">{{ workbenchKind === 'sales' ? '試著處理一則訊息 ↓' : '新增一筆待辦 ↓' }}</a>
            <ProductLandingCta v-else class="mt-6"
              :product-id="product.id" :show-waitlist="product.id !== 'stock' && product.id !== 'life'" :show-demo="false"
              @join-waitlist="joinWaitlist" @open-preview="previewOpen = true" />
            <div class="mt-5 flex flex-wrap gap-4 font-semibold text-indigo-700 dark:text-indigo-300">
              <RouterLink :to="{ path: route.path, hash: '#how-it-works' }" class="underline-offset-4 hover:underline">看操作流程 ↓</RouterLink>
              <RouterLink v-if="relatedArticle" :to="'/articles/' + relatedArticle.id" class="underline-offset-4 hover:underline">開發筆記 ↗</RouterLink>
            </div>
          </div>
          <div class="space-y-4">
            <LineJoinCta v-if="product.id === 'stock'" qr />
            <LineBotQr v-else-if="publicLineUrl" :url="publicLineUrl" :title="product.title" />
            <aside class="rounded-3xl border border-zinc-200 bg-white/80 p-5 dark:border-zinc-700 dark:bg-zinc-950/55">
              <h2 class="font-bold">如何開始</h2>
              <p class="mt-2 leading-7 text-zinc-700 dark:text-zinc-200">{{ workbenchKind === 'sales' ? '貼上顧客訊息 → 檢查分類 → 編輯草稿或標記待人工處理。' : workbenchKind === 'life' ? '選擇類別 → 輸入事項 → 查看清單與完成狀態。' : guide.access }}</p>
              <template v-if="product.beta">
                <p class="mt-4 text-sm font-semibold">可查詢標的</p>
                <ul class="mt-2 flex flex-wrap gap-2">
                  <li v-for="symbol in product.beta.supportedSymbols" :key="symbol" class="rounded-full border border-zinc-200 px-3 py-1 text-sm dark:border-zinc-700">{{ symbol }}</li>
                </ul>
              </template>
            </aside>
          </div>
        </div>
      </div>
    </section>

    <div v-if="workbenchKind" class="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
      <ProductWorkbench :key="workbenchKind" :kind="workbenchKind" class="scroll-mt-24" />
    </div>

    <section id="how-it-works" class="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <h2 class="text-3xl font-bold tracking-tight">操作流程</h2>
      <div class="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div class="grid content-start gap-2" role="group" aria-label="選擇操作情境">
          <button v-for="([label], index) in guide.scenes" :key="label" type="button"
            :aria-pressed="activeIndex === index"
            class="motion-action cursor-pointer rounded-xl border border-zinc-300 px-4 py-3 text-left font-semibold hover:border-indigo-500 aria-pressed:border-indigo-500 aria-pressed:bg-indigo-50 aria-pressed:text-indigo-900 dark:border-zinc-700 dark:aria-pressed:border-indigo-400 dark:aria-pressed:bg-indigo-950 dark:aria-pressed:text-indigo-100"
            @click="activeIndex = index">{{ label }}</button>
        </div>
        <div aria-live="polite" class="min-w-0">
          <article v-if="previewScenario" :key="previewScenario[0]" class="motion-enter rounded-3xl border border-zinc-200 bg-white p-5 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 class="text-xl font-bold">{{ previewScenario[0] }}</h3>
            <p class="mt-4 text-sm font-semibold text-indigo-700 dark:text-indigo-300">輸入或操作</p>
            <p class="mt-2 rounded-2xl bg-indigo-50 px-4 py-3 font-semibold dark:bg-indigo-950">{{ previewScenario[1] }}</p>
            <p class="mt-5 text-sm font-semibold text-indigo-700 dark:text-indigo-300">下一步</p>
            <p class="mt-2 leading-7 text-zinc-700 dark:text-zinc-200">{{ previewScenario[2] }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-if="product.highlights?.length" class="mx-auto max-w-6xl px-5 pb-12 sm:px-8 sm:pb-16">
      <h2 class="text-3xl font-bold">產品功能</h2>
      <ul class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="feature in product.highlights" :key="feature.title" class="motion-card rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 class="font-bold">{{ feature.title }}</h3>
          <p class="mt-2 leading-7 text-zinc-700 dark:text-zinc-200">{{ feature.description }}</p>
        </li>
      </ul>
    </section>

    <section class="border-y border-zinc-200 bg-white/50 px-5 py-12 sm:px-8 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-3xl font-bold">常見問題</h2>
        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <details v-for="[question, answer] in guide.questions" :key="question" class="rounded-2xl border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
            <summary class="cursor-pointer font-semibold hover:text-indigo-700 dark:hover:text-indigo-300">{{ question }}</summary>
            <p class="mt-3 leading-7 text-zinc-700 dark:text-zinc-200">{{ answer }}</p>
          </details>
        </div>
        <details class="mt-4 rounded-2xl border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
          <summary class="cursor-pointer font-semibold hover:text-indigo-700 dark:hover:text-indigo-300">想了解產品規劃與架構</summary>
          <div class="mt-4 grid items-start gap-6 md:grid-cols-2">
            <ul class="list-disc space-y-2 pl-5 leading-7 text-zinc-700 dark:text-zinc-200">
              <li v-for="item in product.business.roadmap" :key="item">{{ item }}</li>
            </ul>
            <AiFlowDiagram v-if="product.flowVariant" :variant="product.flowVariant" />
          </div>
        </details>
      </div>
    </section>

    <ProductPreviewPanel v-if="registry && hasApiPreview(registry)" :product-id="product.id" :open="previewOpen" @close="previewOpen = false" />
    <ProductFeedbackSection :key="product.slug" :product-key="product.slug" />
  </div>
  <div v-else class="flex min-h-[60vh] flex-col items-center justify-center">
    <h1 class="text-2xl font-bold">找不到此產品</h1>
    <RouterLink to="/products" class="mt-4 text-indigo-700 underline dark:text-indigo-300">返回 AI 產品</RouterLink>
  </div>
</template>
