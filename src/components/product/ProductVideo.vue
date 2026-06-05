<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  src: string
  title: string
  poster?: string
}>()

const failed = ref(false)
</script>

<template>
  <div class="glow-border overflow-hidden rounded-2xl">
    <video
      v-if="!failed"
      class="aspect-video w-full bg-zinc-900 object-cover"
      controls
      playsinline
      preload="metadata"
      :poster="poster"
      @error="failed = true"
    >
      <source :src="src" type="video/mp4" />
    </video>
    <div
      v-else
      class="flex aspect-video flex-col items-center justify-center bg-zinc-100 px-6 text-center dark:bg-zinc-900"
    >
      <p class="text-sm font-medium text-zinc-600 dark:text-zinc-400">{{ title }} — 30 秒 Demo</p>
      <p class="mt-2 text-xs text-zinc-500">
        請將影片放至 <code class="text-indigo-600">public/videos/</code>
      </p>
    </div>
  </div>
</template>
