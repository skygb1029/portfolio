<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from '@/components/layout/ThemeToggle.vue'

const navItems = [
  { label: '首頁', href: '#home' },
  { label: '關於', href: '#about' },
  { label: '作品', href: '#portfolio' },
  { label: 'GitHub', href: '#github' },
  { label: '聯絡', href: '#contact' },
]

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      scrolled
        ? 'border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80'
        : 'bg-transparent'
    "
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a
        href="#home"
        class="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
      >
        Jr-Jim
      </a>

      <nav class="hidden items-center gap-1 md:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="rounded-full px-3.5 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 md:hidden dark:border-zinc-700"
          aria-label="開啟選單"
          @click="menuOpen = !menuOpen"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              v-if="!menuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="menuOpen"
      class="border-t border-zinc-200 bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden dark:border-zinc-800 dark:bg-zinc-950/95"
    >
      <a
        v-for="item in navItems"
        :key="item.href"
        :href="item.href"
        class="block rounded-lg px-3 py-2.5 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        @click="closeMenu"
      >
        {{ item.label }}
      </a>
    </div>
  </header>
</template>
