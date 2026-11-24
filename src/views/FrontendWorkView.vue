<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { frontendWorks, workPaths, type WorkSlug } from '@/data/frontendWorks'
const props = defineProps<{ slug: WorkSlug; demo?: boolean }>()
const work = computed(() => frontendWorks.find(item => item.slug === props.slug)!)
const screens = {
  iboxpost: defineAsyncComponent(() => import('@/components/work/IBoxPostDemo.vue')),
  'maia-inference': defineAsyncComponent(() => import('@/components/work/MaiaDemo.vue')),
  'gene-rule': defineAsyncComponent(() => import('@/components/work/GeneRuleDemo.vue')),
  'patient-journey': defineAsyncComponent(() => import('@/components/work/PatientJourneyDemo.vue')),
  hms: defineAsyncComponent(() => import('@/components/work/HmsDemo.vue')),
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
    <RouterLink :to="demo ? workPaths(slug).case : '/works'" class="text-sm font-semibold text-indigo-700 hover:underline dark:text-indigo-300">
      {{ demo ? '← 回到案例介紹' : '← 全部作品案例' }}
    </RouterLink>
    <header class="mb-8 mt-5">
      <p class="text-sm font-medium text-indigo-700 dark:text-indigo-300">{{ work.area }}</p>
      <h1 class="mt-2 text-balance text-4xl font-bold tracking-tight sm:text-5xl">{{ work.title }}<span v-if="demo"> Demo</span></h1>
      <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-300">{{ demo ? work.walkthrough : work.summary }}</p>
      <a v-if="!demo" :href="workPaths(slug).fullDemo" class="mt-5 inline-flex rounded-full bg-indigo-700 px-5 py-2.5 font-semibold text-white hover:bg-indigo-800">{{ slug === 'demi-studio' ? '瀏覽正式網站' : '開啟完整 Demo' }}</a>
    </header>
    <template v-if="demo">
      <a :href="workPaths(slug).fullDemo" class="mb-4 inline-block text-sm font-semibold text-indigo-700 underline dark:text-indigo-300">開啟原介面的完整 Demo</a>
      <p class="mb-4 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-200">
        作品展示使用虛構資料。操作僅在當前頁面，重新整理即可重置。
      </p>
      <component v-if="slug !== 'demi-studio'" :is="screens[slug]" :key="slug" />
    </template>
    <div v-else class="grid gap-5 md:grid-cols-[1.35fr_1fr]">
      <article class="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <img :src="'/case-previews/' + slug + '.jpg'" :alt="work.title + '原介面展示'" width="1440" height="810" class="aspect-video w-full border-b border-zinc-200 object-cover dark:border-zinc-800">
        <div class="p-6 sm:p-8">
        <h2 class="text-xl font-semibold">我負責的前端功能</h2>
        <ul class="mt-4 list-disc space-y-3 pl-5 leading-7 text-zinc-700 dark:text-zinc-300">
          <li v-for="item in work.contribution" :key="item">{{ item }}</li>
        </ul>
        </div>
      </article>
      <aside class="rounded-3xl bg-indigo-50 p-6 sm:p-8 dark:bg-indigo-950/60">
        <h2 class="text-xl font-semibold">建議操作流程</h2>
        <p class="mt-3 leading-7 text-zinc-700 dark:text-zinc-300">{{ work.walkthrough }}</p>
        <p v-if="slug !== 'demi-studio'" class="mt-3 text-sm text-zinc-600 dark:text-zinc-300">完整 Demo 保留原專案介面和多頁操作，使用虛構資料與模擬結果。建議使用桌機體驗。</p>
        <div v-if="slug !== 'demi-studio'" class="mt-5 flex flex-wrap items-center gap-4">
          <a :href="workPaths(slug).demo" class="text-sm underline underline-offset-4">快速體驗</a>
        </div>
        <p v-if="slug === 'iboxpost'" class="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
          會員測試帳密 <code>demo@example.test</code> ／ <code>DemoPass123!</code>
          <a href="/project-demos/iboxpost/index.html#/admin/dashboard" class="mt-2 block underline underline-offset-4">開啟後台展示</a>
        </p>
        <a v-if="slug === 'maia-inference'" href="/project-demos/maia-inference/demo-xrays/chest-pa.png" download class="mt-4 block text-sm underline underline-offset-4">下載合成 X 光範例</a>
        <RouterLink to="/contact" class="mt-6 block text-sm font-semibold text-indigo-700 hover:underline dark:text-indigo-300">有類似需求？聯絡合作 →</RouterLink>
      </aside>
    </div>
  </section>
</template>
