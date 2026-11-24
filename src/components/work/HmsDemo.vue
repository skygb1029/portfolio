<script setup lang="ts">
import { computed, ref } from 'vue'
const language = ref<'zh'|'en'>('zh')
const labels = {
  zh: { title:'床位排班', ward:'病區', shift:'班次', bed:'床位', patient:'個案', total:'顯示排班', empty:'目前沒有符合的排班。', AM:'上午', PM:'下午', Night:'晚上' },
  en: { title:'Bed Schedule', ward:'Ward', shift:'Shift', bed:'Bed', patient:'Fictional Patient', total:'Shown appointments', empty:'No schedules match these filters.', AM:'Morning', PM:'Afternoon', Night:'Evening' },
}
const copy = computed(() => labels[language.value])
const wards = ['A','B','C']
const shifts = ['AM','PM','Night'] as const
const activeWards = ref([...wards])
const activeShifts = ref<(typeof shifts)[number][]>([...shifts])
const beds = [
  { ward:'A', shift:'AM', bed:'A01', patient:'DEMO-001' },
  { ward:'A', shift:'PM', bed:'A02', patient:'DEMO-002' },
  { ward:'B', shift:'PM', bed:'B01', patient:'DEMO-003' },
  { ward:'B', shift:'Night', bed:'B02', patient:'DEMO-004' },
  { ward:'C', shift:'AM', bed:'C01', patient:'DEMO-005' },
  { ward:'C', shift:'Night', bed:'C02', patient:'DEMO-006' },
] as const
const visible = computed(() => beds.filter(record => activeWards.value.includes(record.ward) && activeShifts.value.includes(record.shift)))
</script>
<template>
  <section class="work-panel">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 class="text-xl font-semibold">{{ copy.title }}</h2>
      <div class="flex gap-2" role="group" aria-label="語言 / Language">
        <button type="button" class="work-button" :aria-pressed="language === 'zh'" @click="language = 'zh'">中文</button>
        <button type="button" class="work-button" :aria-pressed="language === 'en'" @click="language = 'en'">English</button>
      </div>
    </div>
    <div class="my-5 flex flex-wrap gap-5">
      <fieldset class="rounded-lg border border-zinc-200 px-3 pb-2 dark:border-zinc-700">
        <legend class="px-1 text-sm font-semibold">{{ copy.ward }}</legend>
        <label v-for="ward in wards" :key="ward" class="mx-1 inline-flex items-center gap-1.5 px-1 py-2"><input v-model="activeWards" :value="ward" type="checkbox" />{{ ward }}</label>
      </fieldset>
      <fieldset class="rounded-lg border border-zinc-200 px-3 pb-2 dark:border-zinc-700">
        <legend class="px-1 text-sm font-semibold">{{ copy.shift }}</legend>
        <label v-for="shift in shifts" :key="shift" class="mx-1 inline-flex items-center gap-1.5 px-1 py-2"><input v-model="activeShifts" :value="shift" type="checkbox" />{{ copy[shift] }}</label>
      </fieldset>
    </div>
    <p role="status" class="mb-3 text-sm font-semibold">{{ copy.total }} {{ visible.length }} / {{ beds.length }}</p>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="bg-zinc-100 dark:bg-zinc-800"><tr><th class="p-2">{{ copy.ward }}</th><th class="p-2">{{ copy.shift }}</th><th class="p-2">{{ copy.bed }}</th><th class="p-2">{{ copy.patient }}</th></tr></thead>
        <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
          <tr v-for="record in visible" :key="record.bed"><td class="p-2">{{ record.ward }}</td><td class="p-2">{{ copy[record.shift] }}</td><td class="p-2">{{ record.bed }}</td><td class="p-2">{{ record.patient }}</td></tr>
          <tr v-if="!visible.length"><td colspan="4" class="p-4">{{ copy.empty }}</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
