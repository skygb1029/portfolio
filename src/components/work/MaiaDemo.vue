<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
const model = ref('影像分類介面')
const image = ref('')
const fileName = ref('')
const problem = ref('')
const result = ref('')
const busy = ref(false)
let uploadedUrl = ''
let timer: ReturnType<typeof setTimeout> | undefined
function resetResult() {
  clearTimeout(timer)
  result.value = ''
  busy.value = false
}
function selectImage(url: string, name: string) {
  if (uploadedUrl) URL.revokeObjectURL(uploadedUrl)
  uploadedUrl = url.startsWith('blob:') ? url : ''
  image.value = url
  fileName.value = name
  problem.value = ''
  resetResult()
}
function upload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
    problem.value = '請選擇 5 MB 以內的 JPEG、PNG 或 WebP。'
  } else {
    selectImage(URL.createObjectURL(file), file.name)
  }
  input.value = ''
}
function run() {
  if (!image.value || busy.value) return
  busy.value = true
  result.value = ''
  timer = setTimeout(() => {
    result.value = model.value === '影像分類介面' ? '分類 A · 結果預覽' : '標記 2 筆 · 結果預覽'
    busy.value = false
  }, 550)
}
watch(model, resetResult)
onBeforeUnmount(() => { resetResult(); if (uploadedUrl) URL.revokeObjectURL(uploadedUrl) })
</script>
<template>
  <div class="grid gap-4 md:grid-cols-[1fr_1.3fr]">
    <section class="work-panel grid content-start gap-4">
      <h2 class="text-xl font-semibold">影像與模型</h2>
      <label class="work-label">模型<select v-model="model" class="work-field"><option>影像分類介面</option><option>影像標記介面</option></select></label>
      <button type="button" class="work-button justify-self-start" @click="selectImage('/work/imaging/chest-pa.webp','合成範例影像')">載入範例圖片</button>
      <label class="work-label">或選取圖片（僅在瀏覽器預覽）<input type="file" accept="image/jpeg,image/png,image/webp" class="work-field" @change="upload" /></label>
      <p v-if="problem" role="alert" class="text-red-700 dark:text-red-300">{{ problem }}</p>
      <button type="button" class="work-button work-primary justify-self-start" :disabled="!image || busy" @click="run">查看結果預覽</button>
      <p role="status" class="work-note">{{ busy ? '正在準備展示結果…' : result }}</p>
    </section>
    <section class="work-panel">
      <h2 class="text-xl font-semibold">影像預覽</h2>
      <div class="mt-4 grid min-h-56 place-items-center overflow-hidden rounded-xl bg-zinc-950 p-3 text-zinc-300">
        <img v-if="image" :src="image" :alt="fileName" class="max-h-80 w-full object-contain" />
        <p v-else>請載入範例或選取圖片</p>
      </div>
      <p v-if="fileName" class="mt-2 break-all work-note">{{ fileName }}。展示結果不供診斷。</p>
    </section>
  </div>
</template>
