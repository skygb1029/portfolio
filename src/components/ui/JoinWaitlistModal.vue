<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useWaitlistModalStore } from '@/stores/waitlistModal'
import { waitlistProductOptions } from '@/data/projects'
import { submitWaitlist } from '@/utils/waitlistSubmit'
import { trackEvent } from '@/composables/useAnalytics'
import { siteConfig } from '@/config/site'

const modal = useWaitlistModalStore()

const name = ref('')
const email = ref('')
const productId = ref('')
const error = ref('')
const success = ref(false)
const needsConfig = ref(false)

const productLabel = computed(
  () => waitlistProductOptions.find((p) => p.id === productId.value)?.label ?? '',
)

watch(
  () => modal.isOpen,
  (open) => {
    if (open) {
      productId.value =
        modal.preselectedProductId || (waitlistProductOptions[0]?.id ?? '')
      name.value = ''
      email.value = ''
      error.value = ''
      success.value = false
      needsConfig.value = false
      trackEvent('waitlist_modal_open', { product_id: productId.value })
    }
  },
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && modal.isOpen) modal.close()
}

watch(
  () => modal.isOpen,
  (open) => {
    if (open) window.addEventListener('keydown', onKeydown)
    else window.removeEventListener('keydown', onKeydown)
  },
)

const submitting = ref(false)

async function handleSubmit() {
  error.value = ''
  if (!name.value.trim() || !email.value.trim() || !productId.value) {
    error.value = '請填寫所有欄位'
    return
  }
  submitting.value = true
  const ok = await submitWaitlist({
    name: name.value.trim(),
    email: email.value.trim(),
    productId: productId.value,
    productLabel: productLabel.value,
    sourcePage: modal.sourceHint || window.location.pathname,
  })
  submitting.value = false
  if (!ok) {
    needsConfig.value = true
    error.value = '後端尚未設定，請聯絡站長或稍後再試'
    return
  }
  success.value = true
  setTimeout(() => modal.close(), 2000)
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modal.isOpen"
        class="fixed inset-0 z-[110] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
      >
        <div class="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" @click="modal.close()" />

        <div
          class="relative z-10 w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
        >
          <button
            type="button"
            class="absolute right-4 top-4 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            aria-label="關閉"
            @click="modal.close()"
          >
            ✕
          </button>

          <p class="text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {{ siteConfig.productHub }}
          </p>
          <h2 id="waitlist-title" class="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-50">
            加入等待名單
          </h2>
          <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            產品上線時將由 {{ siteConfig.productHub }} 優先通知您。資料儲存於 Supabase（備援 Google 表單）。
          </p>

          <form v-if="!success" class="mt-6 space-y-4" @submit.prevent="handleSubmit">
            <div>
              <label for="wl-name" class="mb-1.5 block text-sm font-medium">姓名</label>
              <input
                id="wl-name"
                v-model="name"
                type="text"
                required
                class="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
            <div>
              <label for="wl-email" class="mb-1.5 block text-sm font-medium">Email</label>
              <input
                id="wl-email"
                v-model="email"
                type="email"
                required
                class="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
            <div>
              <label for="wl-product" class="mb-1.5 block text-sm font-medium">感興趣產品</label>
              <select
                id="wl-product"
                v-model="productId"
                required
                class="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
              >
                <option v-for="p in waitlistProductOptions" :key="p.id" :value="p.id">
                  {{ p.label }}
                </option>
              </select>
            </div>

            <p v-if="error" class="text-sm text-red-500" role="alert">{{ error }}</p>
            <p v-if="needsConfig" class="text-xs text-zinc-500">
              站長請參考 .env.example 設定 Google Form。
            </p>

            <button
              type="submit"
              class="w-full rounded-full bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
              :disabled="submitting"
            >
              {{ submitting ? '送出中…' : '送出並加入名單' }}
            </button>
          </form>

          <p v-else class="mt-6 text-center text-sm text-emerald-600 dark:text-emerald-400">
            感謝您加入 {{ siteConfig.productHub }}！已開啟確認頁面，我們將盡快與您聯繫。
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
