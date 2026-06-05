import type { OpsProductConfig } from './types'

/** 與 src/data/products.ts 保持同步 */
export const opsProductRegistry: OpsProductConfig[] = [
  {
    id: 'stock',
    name: 'AI 股票秘書',
    icon: '📈',
    status: 'beta',
    apiUrl: 'https://stock-api.jrjim.ai',
    healthKey: 'stock-api',
    githubProductId: 'stock-secretary',
    waitlistMatch: ['AI 股票秘書', 'stock', 'stock-secretary'],
    feedbackMatch: ['stock-secretary', 'AI 股票秘書', 'stock'],
    previewPath: '/demo/stock',
  },
  {
    id: 'parenting',
    name: 'AI 育兒助手',
    icon: '👶',
    status: 'beta',
    apiUrl: 'https://parenting-api.jrjim.ai',
    healthKey: 'parenting-api',
    githubProductId: 'parenting-assistant',
    waitlistMatch: ['AI 育兒助手', 'parenting', 'parenting-assistant'],
    feedbackMatch: ['parenting-assistant', 'AI 育兒助手', 'parenting'],
    previewPath: '/demo/parenting',
  },
  {
    id: 'cs',
    name: 'AI 客服業務小能手',
    icon: '💬',
    status: 'mvp',
    apiUrl: 'https://sales-api.jrjim.ai',
    healthKey: 'sales-api',
    githubProductId: 'sales-assistant',
    waitlistMatch: ['AI 客服業務小能手', 'AI 客服小能手', 'cs', 'sales-assistant'],
    feedbackMatch: ['sales-assistant', 'AI 客服業務小能手', 'cs'],
    previewPath: '/demo/customer-service',
  },
]
