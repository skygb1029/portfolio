<script setup lang="ts">
import { onMounted } from 'vue'
import { useStockAssistantStore } from '../stores/assistant'
import ChatWidget from './ChatWidget.vue'
import FactReadinessCard from './FactReadinessCard.vue'
import MorningReportCard from './MorningReportCard.vue'
import MorningValidationCard from './MorningValidationCard.vue'

const store = useStockAssistantStore()

onMounted(() => {
  void store.loadDashboard()
})
</script>

<template>
  <div class="space-y-5">
    <div class="grid gap-5 lg:grid-cols-2">
      <MorningReportCard
        :data="store.morning"
        :loading="store.morningLoading"
        :error="store.morningError"
      />
      <FactReadinessCard
        :data="store.factReadiness"
        :loading="store.factLoading"
        :error="store.factError"
      />
    </div>

    <MorningValidationCard
      :data="store.validation"
      :loading="store.validationLoading"
      :error="store.validationError"
    />

    <ChatWidget />
  </div>
</template>
