<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { blogPosts } from '@/data/blog'
</script>

<template>
  <section
    id="blog"
    class="section-padding bg-zinc-100/50 dark:bg-zinc-900/30"
  >
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="Blog"
          title="技術文章"
          subtitle="AI 開發、Vue 實踐與 LINE Bot 紀錄 — 目前為預覽 Mock 資料。"
          align="center"
        />
      </ScrollReveal>

      <div class="mt-12 grid gap-6 sm:grid-cols-2">
        <ScrollReveal
          v-for="(post, i) in blogPosts"
          :key="post.id"
          :delay="i * 60"
        >
          <article class="glow-border group flex h-full flex-col rounded-2xl p-6">
            <div class="flex items-center justify-between gap-2">
              <span
                class="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400"
              >
                {{ post.category }}
              </span>
              <span
                v-if="post.comingSoon"
                class="text-[10px] font-medium text-zinc-500"
              >
                Coming Soon
              </span>
            </div>
            <h3
              class="mt-4 text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400"
            >
              {{ post.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {{ post.excerpt }}
            </p>
            <div class="mt-4 flex items-center gap-3 text-xs text-zinc-500">
              <span>{{ post.date }}</span>
              <span>·</span>
              <span>{{ post.readTime }}</span>
            </div>
            <button
              type="button"
              disabled
              class="mt-4 w-full rounded-full border border-zinc-200 py-2 text-sm text-zinc-400 dark:border-zinc-700"
            >
              即將發布
            </button>
          </article>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
