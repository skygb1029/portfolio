import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWaitlistModalStore = defineStore('waitlistModal', () => {
  const isOpen = ref(false)
  const preselectedProductId = ref<string>('')

  function open(productId = '') {
    preselectedProductId.value = productId
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function close() {
    isOpen.value = false
    preselectedProductId.value = ''
    document.body.style.overflow = ''
  }

  return { isOpen, preselectedProductId, open, close }
})
