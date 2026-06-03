<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useWaitlistModalStore } from '@/stores/waitlistModal'
import { trackEvent } from '@/composables/useAnalytics'

const theme = useThemeStore()
const waitlist = useWaitlistModalStore()
const showTop = ref(false)

function onScroll() {
  showTop.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function openWaitlist() {
  trackEvent('cta_fab_waitlist')
  waitlist.open()
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div
    class="fixed bottom-6 right-4 z-40 flex flex-col gap-2 sm:right-6"
    role="toolbar"
    aria-label="快捷操作"
  >
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 scale-90"
    >
      <button
        v-if="showTop"
        type="button"
        class="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-700 shadow-lg backdrop-blur transition-all hover:border-indigo-400 dark:border-zinc-700 dark:bg-zinc-900/90"
        aria-label="返回頂部"
        @click="scrollToTop"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </Transition>

    <button
      type="button"
      class="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-500"
      aria-label="加入等待名單"
      @click="openWaitlist"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>

    <a
      href="#contact"
      class="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-700 shadow-lg backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/90"
      aria-label="聯絡我"
      @click="trackEvent('cta_fab_contact')"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </a>

    <button
      type="button"
      class="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/90 shadow-lg backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/90"
      :aria-label="theme.mode === 'dark' ? '切換淺色模式' : '切換深色模式'"
      @click="theme.toggle()"
    >
      <svg
        v-if="theme.mode === 'dark'"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  </div>
</template>
