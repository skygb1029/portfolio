<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const placeholders = [
  { role: '客戶評價', text: '合作後產品上線效率明顯提升，溝通順暢且技術扎實。' },
  { role: '合作夥伴', text: 'AI 整合能力強，能快速將構想落地為可運行的 MVP。' },
  { role: '使用者回饋', text: 'LINE Bot 使用體驗直覺，每日晨報已成為固定習慣。' },
]
</script>

<template>
  <section id="testimonials" class="section-padding">
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="Testimonials"
          title="評價與回饋"
          subtitle="預留客戶、合作夥伴與使用者評價區，待正式上線後替換真實內容。"
          align="center"
        />
      </ScrollReveal>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <ScrollReveal
          v-for="(item, i) in placeholders"
          :key="item.role"
          :delay="i * 80"
        >
          <article
            class="glow-border relative flex h-full flex-col rounded-2xl p-6 opacity-75"
            aria-label="評價預留區"
          >
            <span
              class="absolute right-4 top-4 rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              Placeholder
            </span>
            <div class="mb-4 flex gap-1 text-amber-400" aria-hidden="true">
              <span v-for="n in 5" :key="n">★</span>
            </div>
            <p class="flex-1 text-sm italic leading-relaxed text-zinc-600 dark:text-zinc-400">
              「{{ item.text }}」
            </p>
            <p class="mt-4 text-xs font-medium text-zinc-500">{{ item.role }} · 待更新</p>
          </article>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
