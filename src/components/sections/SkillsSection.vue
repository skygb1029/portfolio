<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { skillGroups } from '@/data/skills'
</script>

<template>
  <section
    id="skills"
    class="section-padding bg-zinc-100/50 dark:bg-zinc-900/30"
  >
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="Skills"
          title="技能專區"
          subtitle="橫跨前端、後端、AI 與 DevOps 的全端開發能力。"
          align="center"
        />
      </ScrollReveal>

      <div class="mt-16 grid gap-6 sm:grid-cols-2">
        <ScrollReveal
          v-for="(group, i) in skillGroups"
          :key="group.id"
          :delay="i * 80"
        >
          <div class="glow-border h-full rounded-2xl p-6">
            <div class="flex items-center gap-3">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-lg text-indigo-600 dark:text-indigo-400"
              >
                {{ group.icon }}
              </span>
              <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {{ group.title }}
              </h3>
            </div>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li
                v-for="skill in group.skills"
                :key="skill"
                class="rounded-lg border border-zinc-200/80 bg-white/60 px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:border-indigo-400/50 hover:bg-indigo-50/50 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-950/30"
              >
                {{ skill }}
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>
