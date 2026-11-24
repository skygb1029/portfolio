<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{ paused: boolean }>()
interface Flake {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  drift: number
  landed?: boolean
  released?: boolean
}
const flakes = ref<Flake[]>([])
let timer: ReturnType<typeof setTimeout> | undefined
let motion: MediaQueryList | undefined
let observer: IntersectionObserver | undefined
let inView = false
let nextId = 0
const layer = ref<HTMLElement | null>(null)

function stop() {
  clearTimeout(timer)
  timer = undefined
}

function addFlakes() {
  const count = 5 + Math.floor(Math.random() * 6)
  const batch = Array.from({ length: count }, () => ({
    id: nextId++,
    x: 1 + Math.random() * 98,
    size: 2 + Math.random() * 2.5,
    duration: 6 + Math.random() * 5,
    delay: Math.random() * .85,
    drift: Math.random() * 40 - 20,
  }))
  flakes.value = [...flakes.value, ...batch]
}

function schedule() {
  stop()
  if (!inView || props.paused || motion?.matches || document.hidden) return
  if (!flakes.value.length) addFlakes()
  timer = setTimeout(() => {
    addFlakes()
    schedule()
  }, 1000)
}

watch(() => props.paused, paused => {
  if (paused) flakes.value.forEach(flake => { flake.released = true })
  schedule()
})

function removeFlake(id: number) {
  flakes.value = flakes.value.filter(flake => flake.id !== id)
}

function syncMotion() {
  if (motion?.matches) flakes.value = []
  schedule()
}

onMounted(() => {
  motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  motion.addEventListener('change', syncMotion)
  document.addEventListener('visibilitychange', schedule)
  observer = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? false
    schedule()
  })
  if (layer.value) observer.observe(layer.value)
})

onUnmounted(() => {
  stop()
  observer?.disconnect()
  motion?.removeEventListener('change', syncMotion)
  document.removeEventListener('visibilitychange', schedule)
})
</script>

<template>
  <div ref="layer" class="snow-panel" aria-hidden="true">
    <span v-for="flake in flakes" :key="flake.id" class="snow-dot"
      :style="{ '--x': flake.x + '%', '--size': flake.size + 'px', '--fall-time': flake.duration + 's', '--delay': flake.delay + 's', '--drift': flake.drift + 'px' }"
      @animationend.self="flake.landed = true">
      <span class="snow-particle" :class="{ 'is-released': flake.released && flake.landed }"
        @animationend="removeFlake(flake.id)"></span>
    </span>
  </div>
</template>

<style scoped>
.snow-panel { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.snow-dot { position: absolute; top: calc(-1 * var(--size)); left: var(--x); width: var(--size); height: var(--size); animation: snowfall var(--fall-time) linear var(--delay) both; }
.snow-particle { display: block; width: 100%; height: 100%; border-radius: 50%; background: #fff; box-shadow: 0 0 4px #ffffff77; }
.snow-particle.is-released { animation: snow-exit .3s linear both; }
@keyframes snowfall {
  0% { top: calc(-1 * var(--size)); transform: translateX(0); opacity: .65; }
  40% { transform: translateX(var(--drift)); opacity: .9; }
  72% { transform: translateX(calc(var(--drift) * -.4)); }
  100% { top: calc(100% - var(--size)); transform: translateX(calc(var(--drift) * .5)); opacity: .86; }
}
@keyframes snow-exit { to { transform: translateY(calc(var(--size) + 5px)); } }
@media (prefers-reduced-motion: reduce) { .snow-dot { display: none; } }
</style>
