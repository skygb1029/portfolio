<script setup lang="ts">
import { computed } from 'vue'
import { blogPosts } from '@/data/blog'

const props = defineProps<{ id?: string }>()
const post = computed(() => blogPosts.find(item => item.id === props.id))
const groups = [...new Set(blogPosts.map(item => item.category))]
</script>

<template>
  <section class="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
    <template v-if="!id">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">技術文章</h1>
      <div v-for="group in groups" :key="group" class="mt-10">
        <h2 class="mb-3 text-xl font-bold">{{ group }}</h2>
        <ul class="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          <li v-for="item in blogPosts.filter(entry => entry.category === group)" :key="item.id">
            <RouterLink :to="'/articles/' + item.id" class="group flex items-start justify-between gap-4 py-4 transition-colors hover:text-indigo-700 dark:hover:text-indigo-300">
              <div><h3 class="text-lg font-semibold">{{ item.title }}</h3><p class="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">{{ item.excerpt }}</p></div>
              <span aria-hidden="true" class="shrink-0 group-hover:translate-x-1">→</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <RouterLink to="/articles" class="font-semibold text-indigo-700 hover:underline dark:text-indigo-300">← 全部文章</RouterLink>
      <article v-if="post" class="mt-8">
        <header class="border-b border-zinc-200 pb-7 dark:border-zinc-800">
          <p class="font-semibold text-indigo-700 dark:text-indigo-300">{{ post.category }}</p>
          <h1 class="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{{ post.title }}</h1>
          <p class="mt-5 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">{{ post.excerpt }}</p>
        </header>
        <section v-for="section in post.sections" :key="section.heading" class="mt-8 max-w-3xl">
          <h2 class="text-xl font-bold sm:text-2xl">{{ section.heading }}</h2>
          <p class="mt-3 text-base leading-8 text-zinc-700 sm:text-lg sm:leading-9 dark:text-zinc-300">{{ section.body }}</p>
        </section>
        <aside v-if="post.related || post.sources?.length" class="mt-10 max-w-3xl rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
          <h2 class="font-bold">延伸閱讀</h2>
          <ul class="mt-3 space-y-3 text-indigo-700 dark:text-indigo-300">
            <li v-if="post.related"><RouterLink :to="post.related.to" class="underline underline-offset-4">{{ post.related.label }} →</RouterLink></li>
            <li v-for="source in post.sources" :key="source.url"><a :href="source.url" class="underline underline-offset-4">{{ source.label }} ↗</a></li>
          </ul>
        </aside>
      </article>
      <h1 v-else class="mt-8 text-3xl font-bold">找不到這篇文章</h1>
    </template>
  </section>
</template>
