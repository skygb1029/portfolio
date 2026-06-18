import type { RouteRecordRaw } from 'vue-router'
import { siteConfig } from '@/config/site'

export const parentingProductRoutes: RouteRecordRaw[] = [
  {
    path: '/app/parenting',
    name: 'app-parenting',
    component: () => import('./pages/ParentingAssistantApp.vue'),
    meta: {
      title: `AI 育兒助手 App | ${siteConfig.brand}`,
      productId: 'parenting',
    },
  },
]
