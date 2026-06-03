<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import FloatingActions from '@/components/layout/FloatingActions.vue'
import { useThemeStore } from '@/stores/theme'
import { injectStructuredData } from '@/utils/structuredData'

const theme = useThemeStore()

onMounted(() => {
  theme.init()
  injectStructuredData()
})
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />
    <main id="main-content">
      <RouterView />
    </main>
    <AppFooter />
    <FloatingActions />
  </div>
</template>
