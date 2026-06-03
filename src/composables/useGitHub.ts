import { ref, onMounted } from 'vue'
import { siteConfig } from '@/config/site'

export interface GitHubRepo {
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  updated_at: string
  language: string | null
}

const GITHUB_API = 'https://api.github.com'

export function useGitHub() {
  const loading = ref(true)
  const error = ref<string | null>(null)
  const repoCount = ref(0)
  const totalStars = ref(0)
  const recentRepos = ref<GitHubRepo[]>([])

  async function fetchGitHub() {
    loading.value = true
    error.value = null
    try {
      const userRes = await fetch(`${GITHUB_API}/users/${siteConfig.github}`)
      if (!userRes.ok) throw new Error('無法載入 GitHub 資料')
      const user = await userRes.json()
      repoCount.value = user.public_repos ?? 0

      const reposRes = await fetch(
        `${GITHUB_API}/users/${siteConfig.github}/repos?sort=updated&per_page=100`,
      )
      if (!reposRes.ok) throw new Error('無法載入 Repository')
      const repos: GitHubRepo[] = await reposRes.json()

      totalStars.value = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0)
      recentRepos.value = repos
        .filter((r) => !r.name.startsWith('.'))
        .slice(0, 5)
        .map((r) => ({
          name: r.name,
          html_url: r.html_url,
          description: r.description,
          stargazers_count: r.stargazers_count,
          updated_at: r.updated_at,
          language: r.language,
        }))
    } catch (e) {
      error.value = e instanceof Error ? e.message : '載入失敗'
      repoCount.value = 0
      totalStars.value = 0
      recentRepos.value = []
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchGitHub)

  return { loading, error, repoCount, totalStars, recentRepos, refetch: fetchGitHub }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export { formatDate as formatGitHubDate }
