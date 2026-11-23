import { fileURLToPath, URL } from 'node:url'
import { execFileSync } from 'node:child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { devApiPlugin } from './plugins/devApiPlugin'

function resolveGitVersion(): string {
  const deployedSha = process.env.VERCEL_GIT_COMMIT_SHA?.trim()
  if (deployedSha && /^[a-f0-9]{40}$/i.test(deployedSha)) return deployedSha.slice(0, 6)

  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: fileURLToPath(new URL('.', import.meta.url)),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim().slice(0, 6)
  } catch {
    return ''
  }
}

export default defineConfig({
  define: { __GIT_VERSION__: JSON.stringify(resolveGitVersion()) },
  plugins: [vue(), tailwindcss(), devApiPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
