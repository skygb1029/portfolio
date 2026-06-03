import { ref, watch, type Ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useCounter(
  target: Ref<HTMLElement | null | undefined>,
  endValue: number,
  duration = 1800,
) {
  const display = ref(0)
  const hasAnimated = ref(false)

  function animate() {
    if (hasAnimated.value) return
    hasAnimated.value = true
    const start = performance.now()
    const startVal = 0

    function step(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      display.value = Math.round(startVal + (endValue - startVal) * eased)
      if (progress < 1) requestAnimationFrame(step)
      else display.value = endValue
    }

    requestAnimationFrame(step)
  }

  useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) animate()
    },
    { threshold: 0.3 },
  )

  watch(
    () => endValue,
    () => {
      if (!hasAnimated.value) display.value = 0
    },
  )

  return { display }
}
