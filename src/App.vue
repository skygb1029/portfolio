<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import BackToTop from '@/components/layout/BackToTop.vue'
import JoinWaitlistModal from '@/components/ui/JoinWaitlistModal.vue'
import { useThemeStore } from '@/stores/theme'
import { injectStructuredData } from '@/utils/structuredData'

const theme = useThemeStore()

onMounted(() => {
  theme.init()
  injectStructuredData()
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[#faf8f4] text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-indigo-700 focus:px-4 focus:py-2 focus:text-white">跳到主要內容</a>
    <AppHeader />
    <main id="main-content" tabindex="-1" class="flex-1 scroll-mt-16">
      <RouterView />
    </main>
    <AppFooter />
    <BackToTop />
    <JoinWaitlistModal />
  </div>
</template>
