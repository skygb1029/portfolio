import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { siteConfig } from '@/config/site'
import { productLandings } from '@/data/productLandings'
import { trackEvent } from '@/composables/useAnalytics'
import { stockProductRoutes } from '@/products/stock/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: siteConfig.brand },
    },
    ...productLandings.map((p) => ({
      path: `/product/${p.slug}`,
      name: `product-${p.slug}`,
      component: () => import('@/views/ProductLandingView.vue'),
      meta: { title: `${p.title} | ${siteConfig.brand}` },
    })),
    ...stockProductRoutes,
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/DemoCenterView.vue'),
      meta: { title: `Demo Center | ${siteConfig.brand}` },
    },
    {
      path: '/admin/waitlist',
      name: 'admin-waitlist',
      component: () => import('@/views/AdminWaitlistView.vue'),
      meta: { title: `Waitlist Admin | ${siteConfig.brand}` },
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

router.afterEach((to) => {
  const title = (to.meta.title as string) ?? siteConfig.brand
  document.title = title
  trackEvent('page_view', { path: to.path })
})

export default router
