<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { useProjectModalStore } from '@/stores/projectModal'

const modal = useProjectModalStore()

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

onUnmounted(() => window.removeEventListener('keydown', onKeydown))

const stackLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  aiService: 'AI Service',
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
        v-if="modal.isOpen && modal.detail"
        class="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'modal-title'"
      >
        <div
          class="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
          aria-hidden="true"
          @click="modal.close()"
        />

        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-8 sm:translate-y-4 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-8"
          appear
        >
          <div
            v-if="modal.isOpen"
            class="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white shadow-2xl sm:rounded-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div
              class="shrink-0 border-b border-zinc-200 px-6 py-5 dark:border-zinc-800"
              :class="['bg-gradient-to-r', modal.gradient]"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {{ modal.detail.type === 'ai' ? 'AI 產品' : '企業專案' }}
                  </p>
                  <h2
                    id="modal-title"
                    class="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50"
                  >
                    {{ modal.title }}
                  </h2>
                </div>
                <button
                  type="button"
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300/80 bg-white/80 text-zinc-600 transition-colors hover:bg-white dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
                  aria-label="關閉"
                  @click="modal.close()"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto px-6 py-6">
              <section class="mb-8">
                <h3 class="text-sm font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                  專案背景
                </h3>
                <p class="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {{ modal.detail.background }}
                </p>
              </section>

              <section class="mb-8">
                <h3 class="text-sm font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                  解決問題
                </h3>
                <p class="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {{ modal.detail.problem }}
                </p>
              </section>

              <section class="mb-8">
                <h3 class="text-sm font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                  核心功能
                </h3>
                <ul class="mt-3 grid gap-2 sm:grid-cols-2">
                  <li
                    v-for="f in modal.detail.features"
                    :key="f"
                    class="flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <svg class="h-4 w-4 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ f }}
                  </li>
                </ul>
              </section>

              <section class="mb-8">
                <h3 class="text-sm font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                  技術架構
                </h3>
                <div class="mt-4 grid gap-4 sm:grid-cols-2">
                  <div
                    v-for="(key) in (['frontend', 'backend', 'database', 'aiService'] as const)"
                    :key="key"
                    v-show="modal.detail.techStack[key].length > 0"
                    class="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
                  >
                    <p class="text-xs font-semibold text-zinc-500">{{ stackLabels[key] }}</p>
                    <div class="mt-2 flex flex-wrap gap-1.5">
                      <span
                        v-for="t in modal.detail.techStack[key]"
                        :key="t"
                        class="rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300"
                      >
                        {{ t }}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section class="mb-8">
                <h3 class="text-sm font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                  系統架構圖
                </h3>
                <div
                  class="mt-4 flex min-h-[160px] items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/50"
                >
                  <p class="text-center text-sm text-zinc-500">
                    架構圖預留區<br />
                    <span class="text-xs">可放置 public/architecture/{{ modal.detail.id }}.png</span>
                  </p>
                </div>
              </section>

              <section>
                <h3 class="text-sm font-semibold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
                  開發心得
                </h3>
                <ul class="mt-4 space-y-3">
                  <li
                    v-for="(insight, i) in modal.detail.devInsights"
                    :key="i"
                    class="rounded-xl border-l-2 border-indigo-500 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300"
                  >
                    {{ insight }}
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
