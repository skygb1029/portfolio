import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'

interface SeoPage {
  path: string
  title: string
  description: string
  image?: string
  article?: boolean
}

function escape(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!)
}

export function seoPages(origin: string, pages: SeoPage[], verification?: string): Plugin {
  return {
    name: 'public-page-seo',
    apply: 'build',
    writeBundle: {
      order: 'post',
      sequential: true,
      async handler({ dir = 'dist' }) {
        const entry = join(dir, 'index.html')
        const template = await readFile(entry, 'utf8')
        await Promise.all(pages.map(async page => {
          const url = origin + page.path
          const tags = [
            '<title>' + escape(page.title) + '</title>',
            '<link rel="canonical" href="' + escape(url) + '">',
            ...['description', 'twitter:description'].map(name => '<meta name="' + name + '" content="' + escape(page.description) + '">'),
            '<meta name="twitter:title" content="' + escape(page.title) + '">',
            ...Object.entries({ 'og:title': page.title, 'og:description': page.description, 'og:url': url, 'og:type': page.article ? 'article' : 'website', ...(page.image ? { 'og:image': origin + page.image } : {}) }).map(([key, value]) => '<meta property="' + key + '" content="' + escape(value) + '">'),
          ]
          if (page.image) tags.push('<meta name="twitter:image" content="' + escape(origin + page.image) + '">')
          if (verification) tags.push('<meta name="google-site-verification" content="' + escape(verification) + '">')
          const html = template
            .replace(/<title>[\s\S]*?<\/title>/i, '')
            .replace(/<link\b[^>]*\brel="canonical"[^>]*>/gi, '')
            .replace(/<meta\b[^>]*\b(?:name|property)="(?:description|twitter:title|twitter:description|twitter:image|og:title|og:description|og:url|og:type|og:image|google-site-verification)"[^>]*>/gi, '')
            .replace('</head>', () => tags.join('\n') + '\n</head>')
          const output = page.path === '/' ? entry : join(dir, '_seo', page.path.slice(1) + '.html')
          await mkdir(dirname(output), { recursive: true })
          await writeFile(output, html)
        }))
        const urls = pages.map(page => '  <url><loc>' + escape(origin + page.path) + '</loc></url>')
        await writeFile(join(dir, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.join('\n') + '\n</urlset>\n')
        await writeFile(join(dir, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + origin + '/sitemap.xml\n')
      },
    },
  }
}
