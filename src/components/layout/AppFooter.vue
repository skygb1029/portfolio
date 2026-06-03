<script setup lang="ts">
import { siteConfig } from '@/config/site'
</script>

<template>
  <footer class="border-t border-zinc-200 bg-zinc-50 py-10 dark:border-zinc-800 dark:bg-zinc-950">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8"
    >
      <div class="text-center sm:text-left">
        <p class="text-sm text-zinc-600 dark:text-zinc-400">
          © {{ new Date().getFullYear() }} {{ siteConfig.name }}
        </p>
        <p class="mt-1 text-xs text-zinc-500">
          {{ siteConfig.footerTagline }}
        </p>
      </div>
      <div class="flex gap-6 text-sm text-zinc-500">
        <a
          :href="`mailto:${siteConfig.email}`"
          class="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          Email
        </a>
        <a
          :href="siteConfig.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          GitHub
        </a>
      </div>
    </div>
  </footer>
</template>
