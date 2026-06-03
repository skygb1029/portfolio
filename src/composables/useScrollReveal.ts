import { useIntersectionObserver } from '@vueuse/core'
import { ref, type Ref } from 'vue'

export type RevealVariant = 'fade-up' | 'slide-left'

export function useScrollReveal(
  target: Ref<HTMLElement | null | undefined>,
  variant: RevealVariant = 'fade-up',
) {
  const isVisible = ref(false)

  useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )

  const revealClass = () => {
    const base = isVisible.value ? 'reveal-visible' : 'reveal-hidden'
    const variantClass = variant === 'slide-left' ? 'reveal-slide-left' : ''
    return `${base} ${variantClass}`.trim()
  }

  return { isVisible, revealClass }
}
