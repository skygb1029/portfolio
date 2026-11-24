import { portfolioOrigin, publicPages } from '@/data/seoPages'

export function applyPortfolioSeo(path: string) {
  const page = publicPages.find(entry => entry.path === path)
  const fallback = publicPages[0]!
  const url = portfolioOrigin + (page?.path ?? path)
  document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  for (const [name, value] of Object.entries({
    description: (page ?? fallback).description, 'og:title': document.title,
    'og:url': url, 'og:description': (page ?? fallback).description,
    'og:type': page?.article ? 'article' : 'website',
    'twitter:title': document.title, 'twitter:description': (page ?? fallback).description,
    'og:image': portfolioOrigin + (page ?? fallback).image,
    'twitter:image': portfolioOrigin + (page ?? fallback).image,
    robots: page ? 'index, follow, max-image-preview:large' : 'noindex, follow',
  })) {
    const attribute = name.startsWith('og:') ? 'property' : 'name'
    const existing = document.head.querySelector(`meta[${attribute}="${name}"]`)
    const element = existing ?? document.createElement('meta')
    element.setAttribute(attribute, name)
    element.setAttribute('content', value)
    if (!existing) document.head.appendChild(element)
  }
  return page
}
