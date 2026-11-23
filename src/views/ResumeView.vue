<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { siteConfig } from '@/config/site'
import { careerTimeline } from '@/data/career'
import { skillGroups } from '@/data/skills'
import { enterpriseProjects } from '@/data/enterprise'

const experience = [...careerTimeline].reverse()
const featuredProject = enterpriseProjects.find((project) => project.id === 'ipost')
</script>

<template>
  <div class="section-padding mx-auto max-w-6xl pb-24 pt-28">
    <header class="rounded-3xl border border-zinc-200 bg-gradient-to-br from-indigo-50 to-white p-7 sm:p-12 dark:border-zinc-800 dark:from-indigo-950/60 dark:to-zinc-900">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">{{ siteConfig.name }}</h1>
      <p class="mt-3 text-lg font-medium text-indigo-700 dark:text-indigo-300">{{ siteConfig.title }}</p>
      <p class="mt-5 max-w-2xl leading-7 text-zinc-700 dark:text-zinc-300">
        以 Vue 和 TypeScript 開發企業前端與 AI 產品，具備前端架構規劃、REST API
        與 WebSocket 整合，以及專案管理經驗。
      </p>
      <div class="mt-7 flex flex-wrap gap-3">
        <a :href="`mailto:${siteConfig.email}`" class="rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800">Email 聯絡</a>
        <a :href="siteConfig.githubUrl" class="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">GitHub</a>
      </div>
    </header>

    <div class="mt-9 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div class="space-y-8">
        <section aria-labelledby="resume-experience" class="rounded-2xl border border-zinc-200 p-6 sm:p-8 dark:border-zinc-800">
          <h2 id="resume-experience" class="text-xl font-bold">工作經歷</h2>
          <ol class="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
            <li v-for="entry in experience" :key="entry.id" class="py-5 last:pb-0">
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 class="font-semibold">{{ entry.role }} · {{ entry.company }}</h3>
                <span class="text-sm text-zinc-600 dark:text-zinc-400">{{ entry.period }}</span>
              </div>
              <ul v-if="entry.highlights?.length" class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                <li v-for="highlight in entry.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
              <p v-if="entry.tech?.length" class="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{{ entry.tech.join(' · ') }}</p>
            </li>
          </ol>
        </section>

        <section v-if="featuredProject" aria-labelledby="resume-projects" class="rounded-2xl border border-zinc-200 p-6 sm:p-8 dark:border-zinc-800">
          <h2 id="resume-projects" class="text-xl font-bold">代表專案</h2>
          <h3 class="mt-4 font-semibold">{{ featuredProject.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{{ featuredProject.description }}</p>
          <p class="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{{ featuredProject.features.join(' · ') }}</p>
          <RouterLink :to="{ path: '/', hash: '#enterprise' }" class="mt-4 inline-block text-sm font-semibold text-indigo-700 underline dark:text-indigo-300">查看企業專案</RouterLink>
        </section>
      </div>

      <section aria-labelledby="resume-skills" class="self-start rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 id="resume-skills" class="text-xl font-bold">專業技能</h2>
        <div v-for="group in skillGroups" :key="group.id" class="mt-5">
          <h3 class="mb-2 text-sm font-semibold">{{ group.title }}</h3>
          <ul class="flex flex-wrap gap-2">
            <li v-for="skill in group.skills" :key="skill" class="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">{{ skill }}</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
