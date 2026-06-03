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
      'Vue2',
      'Vue3',
      'React',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'SCSS',
      'TailwindCSS',
      'Element Plus',
      'Ant Design',
      'Naive UI',
      'Chart.js',
      'PIXI.js',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '◇',
    skills: [
      'Node.js',
      'Express',
      'PHP',
      'MySQL',
      'SQLite',
      'REST API',
      'WebSocket',
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: '◎',
    skills: ['Git', 'GitHub', 'Jenkins', 'Docker', 'GCP', 'Vercel'],
  },
  {
    id: 'ai',
    title: 'AI',
    icon: '✦',
    skills: [
      'OpenAI',
      'AI Agent',
      'Prompt Engineering',
      'LINE Bot',
      'TG Bot',
      'Automation',
    ],
  },
  {
    id: 'design',
    title: 'Design',
    icon: '◆',
    skills: ['Figma', 'Photoshop', 'Illustrator'],
  },
]
