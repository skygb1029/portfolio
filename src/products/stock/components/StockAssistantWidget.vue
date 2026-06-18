<script setup lang="ts">
import { onMounted } from 'vue'
import { useStockAssistantStore } from '../stores/assistant'
import ChatWidget from './ChatWidget.vue'
import FocusStocksCard from './FocusStocksCard.vue'
import MorningReportCard from './MorningReportCard.vue'

const store = useStockAssistantStore()

onMounted(() => {
  void store.loadDashboard()
})
</script>

<template>
  <div class="flex flex-col gap-5 pb-4">
    <MorningReportCard
      :data="store.morning"
      :loading="store.morningLoading"
      :error="store.morningError"
    />

    <FocusStocksCard
      :symbols="store.focusSymbols"
      :date="store.focusDate"
      :loading="store.focusLoading"
      :error="store.focusError"
    />

    <ChatWidget class="lg:sticky lg:bottom-4 lg:z-10" />
  </div>
</template>
