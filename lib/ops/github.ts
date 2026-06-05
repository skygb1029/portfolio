interface GhRelease {
  tag_name: string
  name: string
  published_at: string
}

const PRODUCT_REPOS: Record<string, string> = {
  'stock-secretary': 'portfolio',
  'parenting-assistant': 'portfolio',
  'sales-assistant': 'portfolio',
}

async function ghFetch(path: string): Promise<unknown | null> {
  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'jr-jim-product-hub-ops',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers,
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export interface GithubDeployInfo {
  version: string
  lastDeployedAt: string | null
  configured: boolean
}

export async function fetchGithubDeployInfo(
  githubProductId: string,
): Promise<GithubDeployInfo> {
  const owner = process.env.GITHUB_OWNER ?? 'skygb1029'
  const repo = PRODUCT_REPOS[githubProductId] ?? 'portfolio'

  const [releases, tags, deployments] = await Promise.all([
    ghFetch(`/repos/${owner}/${repo}/releases?per_page=3`) as Promise<GhRelease[] | null>,
    ghFetch(`/repos/${owner}/${repo}/tags?per_page=5`) as Promise<{ name: string }[] | null>,
    ghFetch(`/repos/${owner}/${repo}/deployments?per_page=1`) as Promise<
      { created_at: string; environment: string }[] | null
    >,
  ])

  const latest = releases?.[0]
  const version = latest?.tag_name ?? tags?.[0]?.name ?? '—'
  const lastDeployedAt =
    deployments?.[0]?.created_at ?? latest?.published_at ?? null

  return {
    version,
    lastDeployedAt,
    configured: !!process.env.GITHUB_TOKEN || !!releases,
  }
}
