import { skillGroups } from '@/data/skills'
import { aiProjects, webProjects } from '@/data/projects'

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
    value: Math.max(10, webProjects.length + aiProjects.length),
    suffix: '+',
    label: 'Projects',
    labelZh: '專案數量',
  },
  {
    id: 'ai',
    value: aiProjects.length,
    suffix: '',
    label: 'AI Products',
    labelZh: 'AI 專案',
  },
  {
    id: 'years',
    value: 5,
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
