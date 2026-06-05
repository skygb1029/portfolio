export type ProductLifecycleStatus =
  | 'mvp'
  | 'beta'
  | 'internal-testing'
  | 'public-beta'
  | 'released'

export const productStatusLabels: Record<ProductLifecycleStatus, string> = {
  mvp: 'MVP',
  beta: 'Beta',
  'internal-testing': 'Internal Testing',
  'public-beta': 'Public Beta',
  released: 'Released',
}

export const productStatusColors: Record<ProductLifecycleStatus, string> = {
  mvp: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-300',
  beta: 'bg-amber-500/15 text-amber-800 dark:text-amber-300',
  'internal-testing': 'bg-violet-500/15 text-violet-800 dark:text-violet-300',
  'public-beta': 'bg-blue-500/15 text-blue-800 dark:text-blue-300',
  released: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
}
