<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { blogPosts } from '@/data/blog'
import { noteDetails } from '@/data/noteDetails'

const props = defineProps<{ id?: string }>()
const route = useRoute()
const post = computed(() => blogPosts.find(item => item.id === props.id))
const groups = [...new Set(blogPosts.map(item => item.category))]
const notes = blogPosts
const details = computed(() => post.value ? noteDetails[post.value.id] : undefined)
const category = computed(() => groups.find(group => group === route.query.category))
const filtered = computed(() => category.value ? notes.filter(item => item.category === category.value) : notes)
const pageSize = 6
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const currentPage = computed(() => Math.min(totalPages.value, Math.max(1, Math.trunc(Number(route.query.page)) || 1)))
const visibleNotes = computed(() => filtered.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))
const relatedNotes = computed(() => {
  const active = post.value
  if (!active) return []
  return active.relatedNotes?.map(id => blogPosts.find(item => item.id === id)).filter(item => item !== undefined)
    ?? notes.filter(item => item.id !== active.id && item.category === active.category).slice(0, 3)
})
function listLink(group?: string, page = 1) {
  return { path: '/articles', query: { category: group, page: page > 1 ? String(page) : undefined } }
}
</script>

<template>
  <section class="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
    <template v-if="!id">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">相關筆記</h1>
      <nav aria-label="筆記分類" class="my-7 flex flex-wrap gap-2">
        <RouterLink v-for="group in [undefined, ...groups]" :key="group ?? 'all'" :to="listLink(group)"
          :aria-current="category === group ? 'true' : undefined"
          class="rounded-full border border-zinc-300 px-4 py-2 font-semibold hover:bg-indigo-100 aria-[current=true]:border-indigo-600 aria-[current=true]:text-indigo-700 dark:border-zinc-700 dark:hover:bg-indigo-950 dark:aria-[current=true]:text-indigo-300">{{ group ?? '全部' }}</RouterLink>
      </nav>
        <ul class="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          <li v-for="item in visibleNotes" :key="item.id">
            <RouterLink :to="'/articles/' + item.id" class="group flex items-start justify-between gap-4 py-4 transition-colors hover:text-indigo-700 dark:hover:text-indigo-300">
              <div><p class="text-sm font-semibold text-indigo-700 dark:text-indigo-300">{{ item.category }}</p><h2 class="mt-1 text-lg font-semibold">{{ item.title }}</h2><p class="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">{{ item.excerpt }}</p></div>
              <span aria-hidden="true" class="shrink-0 group-hover:translate-x-1">→</span>
            </RouterLink>
          </li>
        </ul>
      <nav v-if="totalPages > 1" aria-label="筆記頁碼" class="mt-6 flex flex-wrap gap-2">
        <RouterLink v-for="page in totalPages" :key="page" :to="listLink(category, page)" :aria-current="page === currentPage ? 'page' : undefined"
          :aria-label="'第 ' + page + ' 頁'" class="rounded-lg border border-zinc-300 px-4 py-2 font-semibold hover:bg-indigo-100 aria-[current=page]:bg-indigo-700 aria-[current=page]:text-white dark:border-zinc-700 dark:hover:bg-indigo-950">{{ page }}</RouterLink>
      </nav>
    </template>
    <template v-else>
      <RouterLink to="/articles" class="font-semibold text-indigo-700 hover:underline dark:text-indigo-300">← 全部筆記</RouterLink>
      <article v-if="post" class="mt-8">
        <header class="border-b border-zinc-200 pb-7 dark:border-zinc-800">
          <p class="font-semibold text-indigo-700 dark:text-indigo-300">{{ post.category }}</p>
          <h1 class="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{{ post.title }}</h1>
          <p class="mt-5 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">{{ post.excerpt }}</p>
          <a v-if="post.download" :href="post.download.url" download class="mt-5 inline-flex min-h-11 items-center rounded-lg border border-indigo-300 px-4 font-semibold text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-200 dark:hover:bg-indigo-950">{{ post.download.label }} <span aria-hidden="true" class="ml-2">↓</span></a>
        </header>
        <figure v-if="details?.image" class="mt-7 max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <img :src="details.image" :alt="post.title + '的實際專案介面'" class="block w-full" width="1440" height="960" style="height: auto">
          <figcaption class="px-4 py-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{{ details.caption }}</figcaption>
        </figure>
        <aside v-if="details" aria-label="這篇筆記的重點" class="mt-7 max-w-3xl rounded-xl border-l-4 border-indigo-600 bg-indigo-50 px-5 py-4 dark:border-indigo-300 dark:bg-indigo-950/60">
          <h2 class="text-base font-bold text-indigo-800 dark:text-indigo-200">核心觀念</h2>
          <p class="mt-1 text-xl font-bold leading-relaxed text-zinc-900 dark:text-white">{{ details.key }}</p>
        </aside>
        <nav aria-label="筆記目錄" class="mt-6 max-w-3xl rounded-2xl bg-indigo-50 p-5 dark:bg-indigo-950/60">
          <h2 class="font-bold">筆記目錄</h2>
          <ol class="mt-3 list-decimal space-y-2 pl-5">
            <li v-for="(section, index) in post.sections" :key="section.heading">
              <RouterLink :to="{ path: route.path, hash: '#note-' + (index + 1) }" class="underline underline-offset-4">{{ section.heading }}</RouterLink>
            </li>
            <li v-if="details"><RouterLink :to="{ path: route.path, hash: '#note-practice' }" class="underline underline-offset-4">{{ details.closingHeading ?? '做完後的反思' }}</RouterLink></li>
          </ol>
        </nav>
        <section v-for="(section, index) in post.sections" :id="'note-' + (index + 1)" :key="section.heading" class="mt-8 max-w-3xl border-l-2 border-indigo-200 pl-4 dark:border-indigo-800">
          <h2 class="text-xl font-bold sm:text-2xl">{{ section.heading }}</h2>
          <p class="mt-3 text-base leading-8 text-zinc-700 sm:text-lg sm:leading-9 dark:text-zinc-300">{{ section.body }}</p>
          <p v-for="paragraph in section.paragraphs" :key="paragraph" class="mt-3 text-base leading-8 text-zinc-700 sm:text-lg sm:leading-9 dark:text-zinc-300">{{ paragraph }}</p>
          <div v-if="section.table" class="mt-4 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
            <table class="w-full border-collapse text-left text-sm leading-relaxed sm:text-base">
              <caption class="border-b border-zinc-200 px-3 py-2 text-left font-semibold dark:border-zinc-700">{{ section.table.caption }}</caption>
              <thead class="bg-indigo-50 dark:bg-indigo-950/60">
                <tr>
                  <th v-for="column in section.table.columns" :key="column" scope="col" class="px-2.5 py-2.5 font-semibold sm:px-4">{{ column }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in section.table.rows" :key="row[0]" class="border-t border-zinc-200 even:bg-zinc-100/60 dark:border-zinc-700 dark:even:bg-zinc-900">
                  <th scope="row" class="px-2.5 py-2.5 font-semibold sm:px-4">{{ row[0] }}</th>
                  <td v-for="(cell, columnIndex) in row.slice(1)" :key="columnIndex" class="px-2.5 py-2.5 align-top sm:px-4">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-for="paragraph in section.afterTable" :key="paragraph" class="mt-3 text-base leading-8 text-zinc-700 sm:text-lg sm:leading-9 dark:text-zinc-300">{{ paragraph }}</p>
        </section>
        <figure v-if="details" class="mt-9 max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <img :src="'/article-images/' + post.id + '-flow.jpg'" :alt="'開發議題：' + details.steps.join('、')" class="block h-auto w-full" width="1200" height="526" loading="lazy">
          <figcaption class="bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {{ details.steps.join(' · ') }}
          </figcaption>
        </figure>
        <aside v-if="details" aria-label="注意事項" class="mt-7 max-w-3xl rounded-xl border-l-4 border-amber-600 bg-amber-50 px-5 py-4 text-zinc-900 dark:border-amber-400 dark:bg-amber-950/60 dark:text-zinc-50">
          <h2 class="text-base font-bold text-amber-900 dark:text-amber-200">實作注意</h2>
          <p class="mt-1 text-lg font-semibold leading-relaxed">{{ details.alert }}</p>
        </aside>
        <section v-if="details" id="note-practice" class="mt-9 max-w-3xl border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <h2 class="text-2xl font-bold sm:text-3xl">{{ details.closingHeading ?? '做完後的反思' }}</h2>
          <p v-for="paragraph in details.practice" :key="paragraph" class="mt-4 text-base leading-8 text-zinc-700 sm:text-lg sm:leading-9 dark:text-zinc-300">{{ paragraph }}</p>
        </section>
        <aside v-if="post.related || post.sources?.length || relatedNotes.length" class="mt-10 max-w-3xl rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
          <h2 class="font-bold">延伸閱讀</h2>
          <ul class="mt-3 space-y-3 text-indigo-700 dark:text-indigo-300">
            <li v-if="post.related"><RouterLink :to="post.related.to" class="underline underline-offset-4">{{ post.related.label }} →</RouterLink></li>
            <li v-for="note in relatedNotes" :key="note.id"><RouterLink :to="'/articles/' + note.id" class="underline underline-offset-4">{{ note.title }} →</RouterLink></li>
            <li v-for="source in post.sources" :key="source.url"><a :href="source.url" class="underline underline-offset-4">{{ source.label }} ↗</a></li>
          </ul>
        </aside>
      </article>
      <h1 v-else class="mt-8 text-3xl font-bold">找不到這篇筆記</h1>
    </template>
  </section>
</template>
