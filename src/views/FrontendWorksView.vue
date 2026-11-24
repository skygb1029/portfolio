<script setup lang="ts">
import { frontendWorks, workPaths } from '@/data/frontendWorks'
import { trackEvent } from '@/composables/useAnalytics'
</script>

<template>
  <section class="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">作品案例</h1>
    <p class="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
      從物流寄件到醫療工作流程，這裡記錄我負責的前端介面、資料整合與互動。每個案例都有可操作的展示。
    </p>
    <ul class="mt-10 grid gap-4 sm:grid-cols-2">
      <li v-for="work in frontendWorks" :key="work.slug" class="motion-card overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <img :src="'/case-previews/' + work.slug + '.jpg'" :alt="work.title + '展示畫面'" width="1440" height="810" loading="lazy" class="aspect-video w-full border-b border-zinc-200 object-cover dark:border-zinc-800">
        <div class="p-6">
          <p class="text-sm font-medium text-indigo-700 dark:text-indigo-300">{{ work.area }}</p>
          <h2 class="mt-3 text-2xl font-semibold">{{ work.title }}</h2>
          <p class="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">{{ work.summary }}</p>
          <a :href="workPaths(work.slug).fullDemo" target="_blank" rel="noopener" :aria-label="'查看專案：' + work.title + '（另開分頁）'" class="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800" @click="trackEvent('project_open', { project_slug: work.slug })">
            查看專案 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </li>
    </ul>
  </section>
</template>
