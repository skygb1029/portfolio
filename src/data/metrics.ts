import { skillGroups } from '@/data/skills'
import { aiProjects } from '@/data/projects'
import { enterpriseProjects } from '@/data/enterprise'

const techCount = skillGroups.reduce((sum, g) => sum + g.skills.length, 0)

export interface MetricItem {
  id: string
  value: number
  suffix: string
  label: string
  labelZh: string
}

export const metrics: MetricItem[] = [
  {
    id: 'projects',
    value: Math.max(10, enterpriseProjects.length + aiProjects.length),
    suffix: '+',
    label: 'Projects',
    labelZh: '專案數量',
  },
  {
    id: 'ai',
    value: aiProjects.length,
    suffix: '',
    label: 'AI Products',
    labelZh: 'AI 產品',
  },
  {
    id: 'years',
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    labelZh: '開發年資',
  },
  {
    id: 'tech',
    value: techCount,
    suffix: '+',
    label: 'Technologies',
    labelZh: '技術技能',
  },
]
