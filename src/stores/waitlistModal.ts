import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWaitlistModalStore = defineStore('waitlistModal', () => {
  const isOpen = ref(false)
  const preselectedProductId = ref<string>('')

  const sourceHint = ref('')

  function open(productId = '', source = '') {
    preselectedProductId.value = productId
    sourceHint.value = source
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function close() {
    isOpen.value = false
    preselectedProductId.value = ''
    sourceHint.value = ''
    document.body.style.overflow = ''
  }

  return { isOpen, preselectedProductId, sourceHint, open, close }
})
