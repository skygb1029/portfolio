<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import WebProjectCard from '@/components/ui/WebProjectCard.vue'
import AiProjectCard from '@/components/ui/AiProjectCard.vue'
import { webProjects, aiProjects } from '@/data/projects'
</script>

<template>
  <section id="portfolio" class="section-padding">
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="Portfolio"
          title="作品展示"
          subtitle="一般網站專案與 AI 產品專案，展現全端與 AI 產品開發能力。"
          align="center"
        />
      </ScrollReveal>

      <!-- Web projects -->
      <ScrollReveal :delay="80">
        <h3 class="mt-16 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          一般網站專案
        </h3>
      </ScrollReveal>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <ScrollReveal
          v-for="(project, i) in webProjects"
          :key="project.id"
          :delay="i * 80"
        >
          <WebProjectCard :project="project" />
        </ScrollReveal>
      </div>

      <!-- AI projects -->
      <div id="ai-projects">
      <ScrollReveal :delay="80">
        <h3 class="mt-20 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          AI 專案
          <span class="ml-2 text-sm font-normal text-indigo-600 dark:text-indigo-400">
            重點展示區
          </span>
        </h3>
        <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          透過 LINE Bot 與 OpenAI 打造的 SaaS 級 AI 產品
        </p>
      </ScrollReveal>
      </div>
      <div class="mt-10 space-y-10">
        <ScrollReveal
          v-for="(project, i) in aiProjects"
          :key="project.id"
          :delay="i * 100"
        >
          <AiProjectCard :project="project" />
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
