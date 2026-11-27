<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from '@/components/layout/ThemeToggle.vue'
const route = useRoute()
const open = ref(false)
const toggle = ref<HTMLButtonElement>()
const items = [
  ['作品案例', '/works'],
  ['AI 產品', '/products'],
  ['相關筆記', '/articles'],
  ['前端面試練習', '/interview-practice'],
  ['關於與履歷', '/resume'],
  ['聯絡合作', '/contact'],
] as const
function active(path: string) {
  return route.path === path || route.path.startsWith(path + '/') ||
    (path === '/products' && (route.path.startsWith('/product/') || route.path === '/demo'))
}
watch(() => route.fullPath, () => { open.value = false })
function closeOnEscape() {
  if (open.value) {
    open.value = false
    toggle.value?.focus()
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-zinc-200 bg-[#faf8f4]/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95" @keydown.esc="closeOnEscape">
    <div class="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center gap-3 px-5 sm:px-8">
      <RouterLink to="/" aria-label="JR JIM 首頁" :aria-current="route.path === '/' ? 'page' : undefined" class="mr-auto inline-flex items-center gap-2.5 font-extrabold tracking-widest hover:text-indigo-600 dark:hover:text-indigo-300" @click="open = false">
        <span aria-hidden="true" class="h-2.5 w-2.5 rotate-45 bg-[#304ad2] dark:bg-[#ddfa86]"></span>JR JIM
      </RouterLink>
      <nav id="primary-nav" aria-label="主要導覽" class="order-last w-full flex-col gap-1 pb-3 md:order-none md:w-auto md:flex-row md:pb-0"
        :class="open ? 'flex' : 'hidden md:flex'">
        <RouterLink v-for="[title, path] in items" :key="path" :to="path"
          class="rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-indigo-100 md:px-2.5 lg:px-4 dark:hover:bg-indigo-950"
          :class="active(path) ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200' : ''"
          :aria-current="active(path) ? (route.path === path ? 'page' : 'location') : undefined" @click="open = false">{{ title }}</RouterLink>
      </nav>
      <ThemeToggle />
      <button ref="toggle" type="button" class="cursor-pointer rounded-lg border border-zinc-300 px-3 py-2 text-sm hover:bg-indigo-100 md:hidden dark:border-zinc-700 dark:hover:bg-indigo-950"
        aria-controls="primary-nav" :aria-expanded="open" @click="open = !open">{{ open ? '關閉選單' : '開啟選單' }}</button>
    </div>
  </header>
</template>
