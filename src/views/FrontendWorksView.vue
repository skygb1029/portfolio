<script setup lang="ts">
import { frontendWorks, workPaths } from '@/data/frontendWorks'
</script>

<template>
  <section class="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8">
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">前端作品</h1>
    <p class="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
      從物流寄件到醫療工作流程，這裡記錄我負責的前端介面、資料整合與互動。每個案例都有可操作的展示。
    </p>
    <ul class="mt-10 grid gap-4 sm:grid-cols-2">
      <li v-for="work in frontendWorks" :key="work.slug" class="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-800 dark:bg-zinc-900/65">
        <p class="text-sm font-medium text-indigo-700 dark:text-indigo-300">{{ work.area }}</p>
        <h2 class="mt-3 text-2xl font-semibold">{{ work.title }}</h2>
        <p class="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">{{ work.summary }}</p>
        <div class="mt-6 flex flex-wrap items-center gap-4">
          <RouterLink :to="workPaths(work.slug).case" class="text-sm font-semibold underline underline-offset-4 hover:text-indigo-600">查看案例</RouterLink>
          <a :href="workPaths(work.slug).fullDemo" class="rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">操作完整 Demo</a>
        </div>
      </li>
    </ul>
  </section>
</template>
