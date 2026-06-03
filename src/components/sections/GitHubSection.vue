<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useGitHub, formatGitHubDate } from '@/composables/useGitHub'
import { siteConfig } from '@/config/site'

const { loading, error, repoCount, totalStars, recentRepos } = useGitHub()
</script>

<template>
  <section id="github" class="section-padding">
    <div class="mx-auto max-w-6xl">
      <ScrollReveal>
        <SectionTitle
          label="Open Source"
          title="GitHub 活動"
          :subtitle="`@${siteConfig.github} 的開源與專案動態，以真實數據展現持續開發。`"
          align="center"
        />
      </ScrollReveal>

      <div v-if="loading" class="mt-12 text-center text-sm text-zinc-500">
        載入 GitHub 資料中…
      </div>

      <div v-else-if="error" class="mt-12 glow-border rounded-2xl p-8 text-center">
        <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ error }}</p>
        <a
          :href="siteConfig.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-block text-sm font-medium text-indigo-600 dark:text-indigo-400"
        >
          前往 GitHub 查看 →
        </a>
      </div>

      <template v-else>
        <ScrollReveal :delay="80">
          <div class="mt-12 grid gap-4 sm:grid-cols-3">
            <div class="glow-border rounded-2xl p-6 text-center">
              <p class="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{{ repoCount }}</p>
              <p class="mt-1 text-sm text-zinc-500">Repositories</p>
            </div>
            <div class="glow-border rounded-2xl p-6 text-center">
              <p class="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{{ totalStars }}</p>
              <p class="mt-1 text-sm text-zinc-500">Total Stars</p>
            </div>
            <a
              :href="siteConfig.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="glow-border flex flex-col items-center justify-center rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
            >
              <p class="text-sm font-medium text-indigo-600 dark:text-indigo-400">查看 Profile</p>
              <p class="mt-1 text-xs text-zinc-500">github.com/{{ siteConfig.github }}</p>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="160">
          <h3 class="mt-12 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            最近更新專案
          </h3>
          <ul class="mt-6 space-y-3">
            <li
              v-for="repo in recentRepos"
              :key="repo.name"
              class="glow-border group rounded-xl p-4 transition-transform hover:-translate-y-0.5 sm:flex sm:items-center sm:justify-between sm:gap-4"
            >
              <div class="min-w-0 flex-1">
                <a
                  :href="repo.html_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400"
                >
                  {{ repo.name }}
                </a>
                <p
                  v-if="repo.description"
                  class="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400"
                >
                  {{ repo.description }}
                </p>
              </div>
              <div class="mt-2 flex shrink-0 items-center gap-4 text-xs text-zinc-500 sm:mt-0">
                <span v-if="repo.language">{{ repo.language }}</span>
                <span v-if="repo.stargazers_count">★ {{ repo.stargazers_count }}</span>
                <span>{{ formatGitHubDate(repo.updated_at) }}</span>
              </div>
            </li>
          </ul>
        </ScrollReveal>
      </template>
    </div>
  </section>
</template>
