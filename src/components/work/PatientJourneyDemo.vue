<script setup lang="ts">
import { ref } from 'vue'
const visits = [
  { date:'2026-08-12', label:'初次評估', summary:'建立虛構個案資料及首次影像紀錄。', value:42 },
  { date:'2026-09-16', label:'回診追蹤', summary:'新增回診說明及第二次示範檢驗。', value:28 },
  { date:'2026-10-14', label:'影像與檢驗複查', summary:'記錄示範檢驗數值與比較影像。', value:18 },
  { date:'2026-11-12', label:'定期追蹤', summary:'檢視完整歷程及本次檢驗趨勢。', value:12 },
] as const
const images = [
  { key:'chest-pa', label:'胸部正面' },
  { key:'chest-lateral', label:'胸部側面' },
  { key:'abdomen-ap', label:'腹部正面' },
  { key:'pelvis-ap', label:'骨盆正面' },
]
const tab = ref<'timeline' | 'images'>('timeline')
const current = ref<(typeof visits)[number]>(visits[0])
const slots = ref(images.map(image => image.key))
</script>
<template>
  <div class="grid gap-4">
    <div class="flex flex-wrap gap-2" role="group" aria-label="個案展示功能">
      <button type="button" class="work-button" :aria-pressed="tab === 'timeline'" @click="tab = 'timeline'">歷程與檢驗</button>
      <button type="button" class="work-button" :aria-pressed="tab === 'images'" @click="tab = 'images'">四格影像</button>
    </div>
    <section v-if="tab === 'timeline'" class="work-panel">
      <h2 class="text-xl font-semibold">DEMO-001 · 虛構個案</h2>
      <div class="mt-4 flex flex-wrap gap-2" aria-label="就診時間軸" role="group">
        <button v-for="visit in visits" :key="visit.date" type="button" class="work-button" :aria-pressed="current.date === visit.date" @click="current = visit">
          {{ visit.date }}
        </button>
      </div>
      <div class="mt-5 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-950" aria-live="polite">
        <h3 class="font-semibold">{{ current.label }}</h3>
        <p class="mt-1 work-note">{{ current.summary }}</p>
        <p class="mt-2">AFP 展示值 <strong>{{ current.value }}</strong> ng/mL</p>
      </div>
      <h3 class="mb-3 mt-5 font-semibold">檢驗趨勢</h3>
      <ul class="grid max-w-xl gap-2">
        <li v-for="visit in visits" :key="visit.date" class="grid grid-cols-[6rem_minmax(0,1fr)_2rem] items-center gap-2 text-sm">
          <span>{{ visit.date }}</span>
          <span class="h-3 rounded-full bg-zinc-100 dark:bg-zinc-800"><span class="block h-full rounded-full bg-indigo-600" :style="{ width: (visit.value / 50 * 100) + '%' }" /></span>
          <span>{{ visit.value }}</span>
        </li>
      </ul>
    </section>
    <section v-else class="work-panel">
      <h2 class="text-xl font-semibold">合成影像</h2>
      <p class="mt-2 work-note">以下圖片為合成展示素材。</p>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <figure v-for="(_, i) in slots" :key="i" class="grid gap-3 rounded-xl bg-zinc-950 p-3 text-white">
          <label class="work-label">視窗 {{ i+1 }}
            <select v-model="slots[i]" class="work-field text-zinc-950 dark:text-white"><option v-for="image in images" :key="image.key" :value="image.key">{{ image.label }}</option></select>
          </label>
          <img class="h-52 w-full object-contain sm:h-64" :src="'/work/imaging/' + slots[i] + '.webp'" :alt="images.find(image => image.key === slots[i])?.label + '合成範例'" />
        </figure>
      </div>
    </section>
  </div>
</template>
