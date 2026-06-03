<template>
  <footer class="border-t border-zinc-200 bg-zinc-50 py-10 dark:border-zinc-800 dark:bg-zinc-950">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-zinc-500 sm:flex-row sm:px-6 lg:px-8 dark:text-zinc-500"
    >
      <p>© {{ new Date().getFullYear() }} Jr-Jim. Frontend Developer × AI Builder</p>
      <div class="flex gap-6">
        <a
          href="mailto:skygb1029@gmail.com"
          class="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          Email
        </a>
        <a
          href="https://github.com/skygb1029"
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
