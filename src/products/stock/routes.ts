import type { RouteRecordRaw } from 'vue-router'
import { siteConfig } from '@/config/site'

export const stockProductRoutes: RouteRecordRaw[] = [
  {
    path: '/app/stock',
    name: 'app-stock',
    component: () => import('./pages/StockAssistantApp.vue'),
    meta: {
      title: `AI 股票秘書 App | ${siteConfig.brand}`,
      productId: 'stock',
    },
  },
]
