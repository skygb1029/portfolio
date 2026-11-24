<script setup lang="ts">
import { computed, ref, watch } from 'vue'
const records = [
  { id:'CASE-101', label:'個案甲', markers:['M-01','M-03'] },
  { id:'CASE-102', label:'個案乙', markers:['M-02'] },
  { id:'CASE-103', label:'個案丙', markers:['M-01','M-02'] },
]
const rules = [
  { id:'RULE-01', label:'展示規則 A', version:'1.2', marker:'M-01' },
  { id:'RULE-02', label:'展示規則 B', version:'1.1', marker:'M-02' },
  { id:'RULE-03', label:'展示規則 C', version:'2.0', marker:'M-03' },
]
const input = ref('')
const query = ref('')
const recordId = ref('CASE-101')
const ruleId = ref('RULE-01')
const result = ref('')
const matches = computed(() => records.filter(record => (record.id+' '+record.label).toUpperCase().includes(query.value.trim().toUpperCase())))
const rule = computed(() => rules.find(item => item.id === ruleId.value)!)
watch([recordId,ruleId], () => { result.value = '' })
function search() {
  query.value = input.value
  if (!matches.value.some(item => item.id === recordId.value)) recordId.value = matches.value[0]?.id ?? ''
  result.value = ''
}
function compare() {
  const record = records.find(item => item.id === recordId.value)
  if (!record) return
  result.value = record.id + ' × ' + rule.value.id + ' · ' + (record.markers.includes(rule.value.marker) ? '符合展示條件' : '未符合展示條件')
}
</script>
<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <section class="work-panel">
      <h2 class="text-xl font-semibold">資料庫</h2>
      <form class="mt-4 flex flex-wrap items-end gap-2" @submit.prevent="search">
        <label class="work-label grow">個案編號或名稱<input v-model="input" placeholder="例如 CASE-101" class="work-field" /></label>
        <button class="work-button" type="submit">搜尋</button>
        <button class="work-button" type="button" @click="input = ''; search()">清除</button>
      </form>
      <div class="mt-4 grid gap-2">
        <button v-for="record in matches" :key="record.id" class="work-button justify-start" type="button" :aria-pressed="recordId === record.id" @click="recordId = record.id">
          {{ record.id }} · {{ record.label }}
        </button>
        <p v-if="!matches.length" role="status" class="work-note">查無符合的展示個案。</p>
      </div>
    </section>
    <section class="work-panel grid content-start gap-4">
      <h2 class="text-xl font-semibold">規則比對</h2>
      <label class="work-label">選擇規則<select v-model="ruleId" class="work-field"><option v-for="item in rules" :key="item.id" :value="item.id">{{ item.label }}</option></select></label>
      <p class="work-note">{{ rule.id }} · v{{ rule.version }} · 示範欄位 {{ rule.marker }}</p>
      <button class="work-button work-primary justify-self-start" type="button" :disabled="!recordId" @click="compare">比對展示資料</button>
      <p v-if="result" role="status" class="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950">{{ result }}</p>
    </section>
  </div>
</template>
