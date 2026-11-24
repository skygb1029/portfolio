import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { siteConfig } from '@/config/site'
import { hiddenProductSlugs, publicProductLandings } from '@/data/productLandings'
import { trackPage } from '@/composables/useAnalytics'
import { publicPages } from '@/data/seoPages'
import { applyPortfolioSeo } from '@/utils/portfolioSeo'
import { stockProductRoutes } from '@/products/stock/routes'
import { parentingProductRoutes } from '@/products/parenting/routes'
import { frontendWorks, hasInlineDemo, workPaths } from '@/data/frontendWorks'
import { blogPosts } from '@/data/blog'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: siteConfig.brand },
    },
    {
      path: '/articles/:id?',
      component: () => import('@/views/ArticlesView.vue'),
      props: true,
      meta: { title: `相關筆記 | ${siteConfig.name}` },
    },
    {
      path: '/products',
      component: () => import('@/views/ProductsView.vue'),
      meta: { title: `AI 產品 | ${siteConfig.name}` },
    },
    {
      path: '/privacy',
      component: () => import('@/views/AnalyticsPrivacyView.vue'),
      meta: { title: 'GA4 報表隱私權政策｜JR JIM' },
    },
    {
      path: '/contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { title: `聯絡合作 | ${siteConfig.name}` },
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('@/views/ResumeView.vue'),
      meta: { title: `關於與履歷 | ${siteConfig.name}` },
    },
    ...publicProductLandings.map((p) => ({
      path: `/product/${p.slug}`,
      name: `product-${p.slug}`,
      component: () => import('@/views/ProductLandingView.vue'),
      props: { slug: p.slug },
      meta: { title: `${p.title} | ${siteConfig.brand}` },
    })),
    ...stockProductRoutes,
    ...parentingProductRoutes,
    {
      path: '/works',
      name: 'frontend-works',
      component: () => import('@/views/FrontendWorksView.vue'),
      meta: { title: `前端作品 | ${siteConfig.name}` },
    },
    ...frontendWorks.flatMap((work) => [
      {
        path: workPaths(work.slug).case,
        name: `work-${work.slug}`,
        component: () => import('@/views/FrontendWorkView.vue'),
        props: { slug: work.slug },
        meta: { title: `${work.title} | ${siteConfig.name}` },
      },
      ...(hasInlineDemo(work.slug) ? [{
        path: workPaths(work.slug).demo,
        name: `work-demo-${work.slug}`,
        component: () => import('@/views/FrontendWorkView.vue'),
        props: { slug: work.slug, demo: true },
        meta: { title: `${work.title} Demo | ${siteConfig.name}` },
      }] : []),
    ]),
    {
      path: '/demo',
      name: 'demo',
      redirect: '/app/stock',
    },
    {
      path: '/admin/waitlist',
      name: 'admin-waitlist',
      component: () => import('@/views/AdminWaitlistView.vue'),
      meta: { title: `Waitlist Admin | ${siteConfig.brand}` },
    },
    {
      path: '/admin/analytics',
      name: 'admin-analytics',
      component: () => import('@/views/AdminAnalyticsView.vue'),
      meta: { title: 'Portfolio 流量報表' },
    },
    {
      path: '/admin/ops',
      name: 'admin-ops',
      component: () => import('@/views/AdminOpsView.vue'),
      meta: { title: `Product Ops | ${siteConfig.brand}` },
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

const legacySections: Record<string, string> = {
  '#github': '/resume#resume-github',
  '#product-hub': '/products',
  '#metrics': '/products',
}
router.beforeEach(to => {
  const slug = to.path.match(/^\/(?:product|articles)\/([^/]+)\/?$/)?.[1]
  if (to.name === 'app-parenting' || (slug && hiddenProductSlugs.has(slug))) {
    return { path: '/product/stock-secretary', replace: true }
  }
  const target = to.path === '/' ? legacySections[to.hash] : undefined
  if (target) return { ...router.resolve(target), query: to.query, replace: true }
})

router.afterEach((to, from, failure) => {
  if (failure) return
  const post = to.path.startsWith('/articles/') ? blogPosts.find(item => item.id === to.params.id) : undefined
  const title = post ? `${post.title} | ${siteConfig.name}` : (to.meta.title as string) ?? siteConfig.brand
  document.title = publicPages.find(page => page.path === to.path)?.title ?? title
  const page = applyPortfolioSeo(to.path)
  if (page && (!from.matched.length || to.path !== from.path)) trackPage(to.path, document.title)
})

export default router
