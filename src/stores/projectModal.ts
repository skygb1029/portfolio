import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getProjectDetail, type ProjectDetail } from '@/data/projectDetails'
import { webProjects, aiProjects } from '@/data/projects'

export const useProjectModalStore = defineStore('projectModal', () => {
  const isOpen = ref(false)
  const projectId = ref<string | null>(null)

  const detail = computed<ProjectDetail | null>(() =>
    projectId.value ? getProjectDetail(projectId.value) ?? null : null,
  )

  const title = computed(() => {
    if (!projectId.value) return ''
    const web = webProjects.find((p) => p.id === projectId.value)
    if (web) return web.title
    return aiProjects.find((p) => p.id === projectId.value)?.title ?? ''
  })

  const gradient = computed(() => {
    if (!projectId.value) return ''
    const web = webProjects.find((p) => p.id === projectId.value)
    if (web) return web.gradient
    return aiProjects.find((p) => p.id === projectId.value)?.gradient ?? ''
  })

  function open(id: string) {
    if (!getProjectDetail(id)) return
    projectId.value = id
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function close() {
    isOpen.value = false
    projectId.value = null
    document.body.style.overflow = ''
  }

  return { isOpen, projectId, detail, title, gradient, open, close }
})
