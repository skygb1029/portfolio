export interface SkillGroup {
  id: string
  title: string
  icon: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '◈',
    skills: [
      'Vue3',
      'TypeScript',
      'JavaScript',
      'Pinia',
      'Vue Router',
      'TailwindCSS',
      'Vite',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '◇',
    skills: ['Node.js', 'Express', 'Prisma', 'SQLite', 'MySQL', 'REST API'],
  },
  {
    id: 'ai',
    title: 'AI',
    icon: '✦',
    skills: [
      'OpenAI API',
      'GPT',
      'AI Agent',
      'Prompt Engineering',
      'RAG',
      'LINE Bot',
      'Automation',
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Tools',
    icon: '◎',
    skills: ['Git', 'GitHub', 'Docker', 'Railway', 'Render', 'Vercel'],
  },
]
