<script setup lang="ts">
import { computed, ref, watch } from 'vue'
const props = defineProps<{ url: string; title: string }>()
const emit = defineEmits<{ join: [] }>()
const image = ref('')
const validUrl = computed(() => {
  try {
    const url = new URL(props.url)
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return ''
    const path = url.pathname.replace(/\/$/, '')
    if (url.hostname === 'lin.ee' && /^[a-z0-9]+$/i.test(path.slice(1))) return props.url
    const prefix = '/R/ti/p/'
    if (url.hostname === 'line.me' && path.startsWith(prefix) && /^(?:@|%40)[a-z0-9._-]+$/i.test(path.slice(prefix.length))) return props.url
  } catch {
    // Hide the QR card until there is a supported public link.
  }
  return ''
})
watch(validUrl, async (url, _, onCleanup) => {
  let active = true
  onCleanup(() => { active = false })
  image.value = ''
  if (!url) return
  try {
    const { default: QRCode } = await import('qrcode')
    const result = await QRCode.toDataURL(url, { width: 320, margin: 4, errorCorrectionLevel: 'M', color: { dark: '#10261b', light: '#ffffff' } })
    if (active) image.value = result
  } catch {
    // The direct join link remains available.
  }
}, { immediate: true })
</script>

<template>
  <section v-if="validUrl" class="motion-enter rounded-3xl border border-emerald-400/30 bg-emerald-50 p-5 dark:bg-[#10241c] sm:p-6">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-xl font-bold">用 LINE 開啟</h2>
      <span class="rounded-full bg-[#08793b] px-3 py-1 text-sm font-bold text-white">LINE</span>
    </div>
    <figure v-if="image" class="mx-auto mt-5 w-fit max-w-full rounded-2xl bg-gradient-to-br from-emerald-300 via-white to-emerald-500 p-2 shadow-lg">
      <img :src="image" :alt="title + '的 LINE 加入 QR Code'" width="176" height="176" class="block h-auto max-w-full rounded-xl bg-white">
    </figure>
    <p v-if="image" class="mt-4 text-center text-sm text-zinc-700 dark:text-zinc-200">用手機相機掃描 QR Code</p>
    <a :href="validUrl" target="_blank" rel="noopener noreferrer" class="mt-4 flex min-h-11 items-center justify-center rounded-full bg-[#08793b] px-5 py-2 font-semibold text-white hover:bg-[#076333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600" @click="emit('join')">加入 LINE ↗</a>
  </section>
</template>
