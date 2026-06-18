import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchFocusSymbols,
  fetchMorningReport,
  postChat,
  postChatFeedback,
  type ChatFeedbackRating,
  type WebChatResponse,
  type WebFocusSymbol,
  type WebMorningReport,
} from '../services/stockApi'
import { getStockSessionId } from '../utils/stockSession'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  question?: string
  feedbackSent?: boolean
  feedbackRating?: ChatFeedbackRating
}

export const useStockAssistantStore = defineStore('stockAssistant', () => {
  const morning = ref<WebMorningReport | null>(null)
  const focusSymbols = ref<WebFocusSymbol[]>([])
  const focusDate = ref<string | null>(null)

  const morningLoading = ref(true)
  const focusLoading = ref(true)

  const morningError = ref<string | null>(null)
  const focusError = ref<string | null>(null)

  const messages = ref<ChatMessage[]>([])
  const chatLoading = ref(false)
  const chatError = ref<string | null>(null)

  async function loadDashboard(): Promise<void> {
    morningLoading.value = true
    focusLoading.value = true
    morningError.value = null
    focusError.value = null

    const [morningRes, focusRes] = await Promise.allSettled([
      fetchMorningReport(),
      fetchFocusSymbols(),
    ])

    if (morningRes.status === 'fulfilled') {
      morning.value = morningRes.value
    } else {
      morningError.value = morningRes.reason?.message ?? '載入失敗'
    }
    morningLoading.value = false

    if (focusRes.status === 'fulfilled') {
      focusSymbols.value = focusRes.value.symbols
      focusDate.value = focusRes.value.date
    } else {
      focusError.value = focusRes.reason?.message ?? '載入失敗'
    }
    focusLoading.value = false
  }

  async function sendMessage(text: string): Promise<WebChatResponse | null> {
    const trimmed = text.trim()
    if (!trimmed || chatLoading.value) return null

    const sessionId = getStockSessionId()

    chatLoading.value = true
    chatError.value = null
    messages.value.push({
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    })

    try {
      const result = await postChat(trimmed, sessionId)
      messages.value.push({
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: result.reply,
        question: trimmed,
      })

      return result
    } catch (err) {
      const msg = err instanceof Error ? err.message : '發送失敗'
      chatError.value = msg
      messages.value.push({
        id: `e-${Date.now()}`,
        role: 'assistant',
        content: `抱歉，暫時無法回覆：${msg}`,
        question: trimmed,
      })
      return null
    } finally {
      chatLoading.value = false
    }
  }

  async function sendFeedback(
    messageId: string,
    rating: ChatFeedbackRating,
  ): Promise<void> {
    const msg = messages.value.find((m) => m.id === messageId)
    if (!msg || msg.role !== 'assistant' || !msg.question || msg.feedbackSent) return

    await postChatFeedback({
      question: msg.question,
      answer: msg.content,
      rating,
    })
    msg.feedbackSent = true
    msg.feedbackRating = rating
  }

  return {
    morning,
    focusSymbols,
    focusDate,
    morningLoading,
    focusLoading,
    morningError,
    focusError,
    messages,
    chatLoading,
    chatError,
    loadDashboard,
    sendMessage,
    sendFeedback,
  }
})
