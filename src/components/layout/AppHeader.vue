<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import ThemeToggle from '@/components/layout/ThemeToggle.vue'
import { siteConfig } from '@/config/site'
import { productLandings } from '@/data/productLandings'
import { useWaitlistModalStore } from '@/stores/waitlistModal'
import { trackEvent } from '@/composables/useAnalytics'

const route = useRoute()
const isHome = computed(() => route.path === '/')

const navItems = computed(() =>
  isHome.value
    ? [
        { label: '首頁', to: '/#home', external: false },
        { label: 'AI 產品', to: '/#ai-products', external: false },
        { label: 'Demo', to: '/demo', external: true },
        { label: '關於', to: '/#about', external: false },
        { label: '聯絡', to: '/#contact', external: false },
      ]
    : [
        { label: '首頁', to: '/', external: true },
        { label: 'AI 產品', to: '/#ai-products', external: true },
        { label: 'Demo', to: '/demo', external: true },
        { label: '企業專案', to: '/#enterprise', external: true },
      ],
)

const scrolled = ref(false)
const menuOpen = ref(false)
const productsOpen = ref(false)
const waitlist = useWaitlistModalStore()

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
  productsOpen.value = false
}

function openWaitlist() {
  trackEvent('cta_nav_waitlist')
  waitlist.open('', route.path)
  closeMenu()
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
      <RouterLink
        to="/"
        class="text-sm font-semibold tracking-widest text-zinc-900 dark:text-zinc-100"
      >
        {{ siteConfig.logo }}
      </RouterLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="主要導覽">
        <template v-for="item in navItems" :key="item.label">
          <RouterLink
            v-if="item.external"
            :to="item.to"
            class="rounded-full px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {{ item.label }}
          </RouterLink>
          <a
            v-else
            :href="item.to"
            class="rounded-full px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {{ item.label }}
          </a>
        </template>
        <div class="relative">
          <button
            type="button"
            class="rounded-full px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            @click="productsOpen = !productsOpen"
          >
            產品 ▾
          </button>
          <div
            v-if="productsOpen"
            class="absolute right-0 top-full mt-2 w-52 rounded-xl border border-zinc-200 bg-white py-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            <RouterLink
              v-for="p in productLandings"
              :key="p.slug"
              :to="`/product/${p.slug}`"
              class="block px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
              @click="productsOpen = false"
            >
              {{ p.title }}
            </RouterLink>
          </div>
        </div>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="hidden rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 sm:inline-flex"
          @click="openWaitlist"
        >
          等待名單
        </button>
        <ThemeToggle />
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 lg:hidden dark:border-zinc-700"
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
      class="border-t border-zinc-200 bg-white/95 px-4 py-4 backdrop-blur-xl lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95"
    >
      <template v-for="item in navItems" :key="item.label">
        <RouterLink
          v-if="item.external"
          :to="item.to"
          class="block rounded-lg px-3 py-2.5 text-sm"
          @click="closeMenu"
        >
          {{ item.label }}
        </RouterLink>
        <a v-else :href="item.to" class="block rounded-lg px-3 py-2.5 text-sm" @click="closeMenu">
          {{ item.label }}
        </a>
      </template>
      <p class="mt-2 px-3 text-xs text-zinc-500">產品</p>
      <RouterLink
        v-for="p in productLandings"
        :key="p.slug"
        :to="`/product/${p.slug}`"
        class="block rounded-lg px-3 py-2 text-sm"
        @click="closeMenu"
      >
        {{ p.title }}
      </RouterLink>
      <button
        type="button"
        class="mt-2 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white"
        @click="openWaitlist"
      >
        加入等待名單
      </button>
    </div>
  </header>
</template>
