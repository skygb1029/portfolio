<script setup lang="ts">
import { ref } from 'vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { siteConfig } from '@/config/site'
import { useWaitlistModalStore } from '@/stores/waitlistModal'
import { trackEvent } from '@/composables/useAnalytics'

const waitlist = useWaitlistModalStore()

const form = ref({
  name: '',
  email: '',
  message: '',
})

const submitted = ref(false)
const error = ref('')

function openWaitlist() {
  trackEvent('cta_contact_waitlist')
  waitlist.open()
}

const ctaButtons = [
  {
    label: '加入等待名單',
    sub: '搶先體驗 AI 產品',
    action: 'waitlist' as const,
    variant: 'primary' as const,
  },
  {
    label: '立即合作',
    sub: '討論專案與技術合作',
    href: `mailto:${siteConfig.email}?subject=合作洽詢`,
    variant: 'secondary' as const,
  },
  {
    label: '預約討論',
    sub: '安排線上會議',
    href: siteConfig.calendlyUrl,
    variant: 'secondary' as const,
  },
  {
    label: 'Email 我',
    sub: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    variant: 'secondary' as const,
  },
  {
    label: '查看 GitHub',
    sub: `github.com/${siteConfig.github}`,
    href: siteConfig.githubUrl,
    variant: 'secondary' as const,
    external: true,
  },
]

function handleSubmit() {
  error.value = ''
  if (!form.value.name.trim() || !form.value.email.trim() || !form.value.message.trim()) {
    error.value = '請填寫所有欄位'
    return
  }
  const subject = encodeURIComponent(`Portfolio 聯絡 - ${form.value.name}`)
  const body = encodeURIComponent(
    `姓名：${form.value.name}\nEmail：${form.value.email}\n\n${form.value.message}`,
  )
  window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  submitted.value = true
}
</script>

<template>
  <section id="contact" class="section-padding">
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="Contact"
          title="聯絡我"
          subtitle="歡迎討論合作、技術交流或 AI 產品想法。選擇最適合您的方式開始對話。"
          align="center"
        />
      </ScrollReveal>

      <ScrollReveal :delay="80">
        <div class="mt-12 grid gap-4 sm:grid-cols-2">
          <component
            :is="'action' in btn && btn.action === 'waitlist' ? 'button' : 'a'"
            v-for="btn in ctaButtons"
            :key="btn.label"
            :href="'href' in btn ? btn.href : undefined"
            :target="'external' in btn && btn.external ? '_blank' : undefined"
            :rel="'external' in btn && btn.external ? 'noopener noreferrer' : undefined"
            type="'action' in btn && btn.action === 'waitlist' ? 'button' : undefined"
            class="group flex flex-col rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover-glow"
            :class="
              btn.variant === 'primary'
                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                : 'glow-border bg-white/60 dark:bg-zinc-900/40'
            "
            @click="'action' in btn && btn.action === 'waitlist' ? openWaitlist() : undefined"
          >
            <span
              class="text-lg font-semibold"
              :class="btn.variant === 'primary' ? '' : 'text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400'"
            >
              {{ btn.label }}
            </span>
            <span
              class="mt-1 text-sm"
              :class="btn.variant === 'primary' ? 'text-indigo-100' : 'text-zinc-500'"
            >
              {{ btn.sub }}
            </span>
          </component>
        </div>
      </ScrollReveal>

      <div class="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal>
          <div class="space-y-6">
            <div class="glow-border rounded-2xl p-6 text-center">
              <p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">LINE 聯絡</p>
              <p class="mt-1 text-xs text-zinc-500">掃描 QR Code 加入好友</p>
              <div
                class="mx-auto mt-4 flex h-40 w-40 items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div class="text-center text-xs text-zinc-400">
                  <svg class="mx-auto h-16 w-16 opacity-40" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
                    <rect x="10" y="10" width="25" height="25" rx="2" />
                    <rect x="65" y="10" width="25" height="25" rx="2" />
                    <rect x="10" y="65" width="25" height="25" rx="2" />
                  </svg>
                  <p class="mt-2">請替換 public/line-qr.png</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="120">
          <form
            class="glow-border rounded-2xl p-6 sm:p-8"
            aria-label="聯絡表單"
            @submit.prevent="handleSubmit"
          >
            <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">聯絡表單</h3>
            <p class="mt-1 text-sm text-zinc-500">送出後將開啟您的郵件程式</p>

            <div class="mt-6 space-y-4">
              <div>
                <label for="contact-name" class="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  姓名
                </label>
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  autocomplete="name"
                  required
                  class="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  placeholder="您的姓名"
                />
              </div>
              <div>
                <label for="contact-email" class="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  required
                  class="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label for="contact-message" class="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  訊息
                </label>
                <textarea
                  id="contact-message"
                  v-model="form.message"
                  name="message"
                  rows="5"
                  required
                  class="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  placeholder="想聊的內容..."
                />
              </div>
            </div>

            <p v-if="error" class="mt-3 text-sm text-red-500" role="alert">{{ error }}</p>
            <p v-if="submitted" class="mt-3 text-sm text-emerald-600 dark:text-emerald-400">
              已開啟郵件程式，感謝您的來信！
            </p>

            <button
              type="submit"
              class="mt-6 w-full rounded-full bg-zinc-900 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              送出訊息
            </button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
