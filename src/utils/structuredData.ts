import { siteConfig } from '@/config/site'
import { aiProjects } from '@/data/projects'

export function getStructuredDataJson(): string {
  const graph = [
    {
      '@type': 'Person',
      '@id': `${siteConfig.siteUrl}/#person`,
      name: siteConfig.name,
      jobTitle: siteConfig.title,
      email: siteConfig.email,
      url: siteConfig.siteUrl,
      sameAs: [siteConfig.githubUrl],
      knowsAbout: [
        'Vue.js',
        'TypeScript',
        'AI Agent',
        'LINE Bot',
        'SaaS Development',
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${siteConfig.siteUrl}/#organization`,
      name: `${siteConfig.name} Studio`,
      url: siteConfig.siteUrl,
      founder: { '@id': `${siteConfig.siteUrl}/#person` },
      description: 'AI SaaS 產品開發與前端工程服務',
    },
    ...aiProjects.map((p) => ({
      '@type': 'SoftwareApplication',
      name: p.title,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, LINE',
      description: p.description,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
      author: { '@id': `${siteConfig.siteUrl}/#person` },
    })),
  ]

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  })
}

export function injectStructuredData() {
  const id = 'structured-data-jsonld'
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = getStructuredDataJson()
}
