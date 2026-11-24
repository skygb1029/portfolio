<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { siteConfig } from '@/config/site'
</script>

<template>
  <footer class="border-t border-zinc-800 bg-[#171827] py-10 text-zinc-100">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8"
    >
      <div class="text-center sm:text-left">
        <p class="text-sm text-zinc-200">
          © {{ new Date().getFullYear() }} {{ siteConfig.name }}
        </p>
        <p class="mt-1 text-xs text-zinc-400">
          前端工程作品集
        </p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-300 sm:justify-end">
        <RouterLink to="/works" class="hover:text-white hover:underline">作品案例</RouterLink>
        <RouterLink to="/contact" class="hover:text-white hover:underline">聯絡合作</RouterLink>
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
