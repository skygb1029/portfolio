<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
const tab = ref<'send' | 'track' | 'admin'>('send')
const districts = { 臺北市: ['中正區', '大安區', '信義區'], 新北市: ['板橋區', '三重區', '新店區'], 臺中市: ['西區', '南屯區', '北屯區'] } as const
const form = reactive({ name: '', city: '臺北市' as keyof typeof districts, district: '', size: '小型' })
const shipments = ref([{ id: 'DEMO-0001', name: '展示收件人', destination: '臺北市 大安區', size: '小型', status: '配送中' }])
const number = ref('DEMO-0001')
const query = ref('DEMO-0001')
const created = ref('')
const found = computed(() => shipments.value.find(item => item.id === query.value.trim().toUpperCase()))
watch(() => form.city, () => { form.district = '' })
function send() {
  if (!form.name.trim() || !form.district) return
  const id = 'DEMO-' + String(shipments.value.length + 1).padStart(4, '0')
  shipments.value.push({ id, name: form.name.trim(), destination: form.city + ' ' + form.district, size: form.size, status: '待寄件' })
  created.value = id
  query.value = number.value = id
  tab.value = 'track'
}
</script>
<template>
  <div class="grid gap-4">
    <div class="flex flex-wrap gap-2" role="group" aria-label="寄件展示功能">
      <button type="button" class="work-button" :aria-pressed="tab === 'send'" @click="tab = 'send'">建立寄件</button>
      <button type="button" class="work-button" :aria-pressed="tab === 'track'" @click="tab = 'track'">查詢包裹</button>
      <button type="button" class="work-button" :aria-pressed="tab === 'admin'" @click="tab = 'admin'">營運總覽</button>
    </div>
    <form v-if="tab === 'send'" class="work-panel grid max-w-xl gap-4" @submit.prevent="send">
      <h2 class="text-xl font-semibold">寄件資料</h2>
      <label class="work-label">收件人暱稱<input v-model="form.name" required maxlength="24" placeholder="例如 展示收件人" class="work-field" /></label>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="work-label">縣市<select v-model="form.city" class="work-field"><option v-for="city in Object.keys(districts)" :key="city">{{ city }}</option></select></label>
        <label class="work-label">行政區<select v-model="form.district" required class="work-field"><option value="">選擇行政區</option><option v-for="item in districts[form.city]" :key="item">{{ item }}</option></select></label>
      </div>
      <label class="work-label">包裹尺寸<select v-model="form.size" class="work-field"><option>小型</option><option>中型</option><option>大型</option></select></label>
      <button class="work-button work-primary justify-self-start">新增寄件單</button>
    </form>
    <div v-else-if="tab === 'track'" class="work-panel grid max-w-xl gap-4">
      <h2 class="text-xl font-semibold">查詢包裹</h2>
      <p v-if="created" role="status" class="work-note">已建立 {{ created }}。</p>
      <form class="flex flex-wrap items-end gap-2" @submit.prevent="query = number">
        <label class="work-label grow">寄件編號<input v-model="number" required class="work-field" /></label>
        <button class="work-button work-primary">查詢</button>
      </form>
      <p v-if="found" aria-live="polite">{{ found.id }} · {{ found.destination }} · {{ found.size }} · <strong>{{ found.status }}</strong></p>
      <p v-else role="status">查無此寄件編號。可試用 DEMO-0001。</p>
    </div>
    <section v-else class="work-panel">
      <h2 class="text-xl font-semibold">營運總覽</h2>
      <p class="mt-3 work-note">本次展示共有 {{ shipments.length }} 筆寄件單。</p>
      <ul class="mt-4 divide-y divide-zinc-200 dark:divide-zinc-700">
        <li v-for="item in shipments" :key="item.id" class="flex flex-wrap items-center justify-between gap-3 py-3">
          <span>{{ item.id }} · {{ item.name }} · {{ item.destination }}</span>
          <label class="work-label">物流狀態
            <select v-model="item.status" class="work-field"><option>待寄件</option><option>配送中</option><option>已取件</option></select>
          </label>
        </li>
      </ul>
    </section>
  </div>
</template>
