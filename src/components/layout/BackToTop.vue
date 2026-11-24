<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const visible = ref(false)
function updateVisibility() {
  visible.value = window.scrollY > 420
}
function backToTop() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById('main-content')?.focus({ preventScroll: true })
  window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })
}
onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', updateVisibility))
</script>

<template>
  <Transition name="back-top">
    <button v-if="visible" type="button" class="back-top" aria-label="回到頂端" @click="backToTop">
      <span aria-hidden="true">↑</span><span>回頂端</span>
    </button>
  </Transition>
</template>

<style scoped>
.back-top { position: fixed; z-index: 40; right: max(1rem, env(safe-area-inset-right)); bottom: max(1rem, env(safe-area-inset-bottom)); display: inline-flex; align-items: center; gap: .4rem; min-height: 44px; padding: .55rem .9rem; border: 1px solid #8b7aca; border-radius: 999px; background: #211a38; color: #fff; box-shadow: 0 6px 22px #09061442; cursor: pointer; font-weight: 650; }
.back-top:hover, .back-top:focus-visible { background: #433080; }
.back-top-enter-active, .back-top-leave-active { transition: opacity .2s, transform .2s; }
.back-top-enter-from, .back-top-leave-to { opacity: 0; transform: translateY(.55rem); }
@media (prefers-reduced-motion: reduce) {
  .back-top-enter-active, .back-top-leave-active { transition: none; }
}
</style>
