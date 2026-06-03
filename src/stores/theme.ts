import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('dark')

  function init() {
    const stored = localStorage.getItem('theme') as ThemeMode | null
    if (stored === 'light' || stored === 'dark') {
      mode.value = stored
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      mode.value = 'light'
    }
    apply()
  }

  function apply() {
    document.documentElement.classList.toggle('dark', mode.value === 'dark')
    localStorage.setItem('theme', mode.value)
  }

  function toggle() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  watch(mode, apply)

  return { mode, init, toggle }
})
