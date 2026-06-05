import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchFactReadiness,
  fetchMorningReport,
  fetchMorningValidation,
  postChat,
  type WebChatResponse,
  type WebFactReadiness,
  type WebMorningReport,
  type WebMorningValidation,
} from '../services/stockApi'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export const useStockAssistantStore = defineStore('stockAssistant', () => {
  const morning = ref<WebMorningReport | null>(null)
  const factReadiness = ref<WebFactReadiness | null>(null)
  const validation = ref<WebMorningValidation | null>(null)

  const morningLoading = ref(true)
  const factLoading = ref(true)
  const validationLoading = ref(true)

  const morningError = ref<string | null>(null)
  const factError = ref<string | null>(null)
  const validationError = ref<string | null>(null)

  const messages = ref<ChatMessage[]>([])
  const chatLoading = ref(false)
  const chatError = ref<string | null>(null)

  async function loadDashboard(): Promise<void> {
    morningLoading.value = true
    factLoading.value = true
    validationLoading.value = true
    morningError.value = null
    factError.value = null
    validationError.value = null

    const [morningRes, factRes, validationRes] = await Promise.allSettled([
      fetchMorningReport(),
      fetchFactReadiness(),
      fetchMorningValidation(),
    ])

    if (morningRes.status === 'fulfilled') {
      morning.value = morningRes.value
    } else {
      morningError.value = morningRes.reason?.message ?? '載入失敗'
    }
    morningLoading.value = false

    if (factRes.status === 'fulfilled') {
      factReadiness.value = factRes.value
    } else {
      factError.value = factRes.reason?.message ?? '載入失敗'
    }
    factLoading.value = false

    if (validationRes.status === 'fulfilled') {
      validation.value = validationRes.value
    } else {
      validationError.value = validationRes.reason?.message ?? '載入失敗'
    }
    validationLoading.value = false
  }

  async function sendMessage(text: string): Promise<WebChatResponse | null> {
    const trimmed = text.trim()
    if (!trimmed || chatLoading.value) return null

    chatLoading.value = true
    chatError.value = null
    messages.value.push({
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    })

    try {
      const result = await postChat(trimmed)
      messages.value.push({
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: result.reply,
      })
      return result
    } catch (err) {
      const msg = err instanceof Error ? err.message : '發送失敗'
      chatError.value = msg
      messages.value.push({
        id: `e-${Date.now()}`,
        role: 'assistant',
        content: `抱歉，暫時無法回覆：${msg}`,
      })
      return null
    } finally {
      chatLoading.value = false
    }
  }

  return {
    morning,
    factReadiness,
    validation,
    morningLoading,
    factLoading,
    validationLoading,
    morningError,
    factError,
    validationError,
    messages,
    chatLoading,
    chatError,
    loadDashboard,
    sendMessage,
  }
})
