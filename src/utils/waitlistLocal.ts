export interface WaitlistLead {
  id: string
  name: string
  email: string
  productId: string
  productLabel: string
  sourcePage: string
  createdAt: string
}

const STORAGE_KEY = 'jrjim_waitlist_leads'

export function saveWaitlistLead(
  lead: Omit<WaitlistLead, 'id' | 'createdAt'>,
): WaitlistLead {
  const entry: WaitlistLead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const list = getWaitlistLeads()
  list.unshift(entry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 500)))
  return entry
}

export function getWaitlistLeads(): WaitlistLead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as WaitlistLead[]) : []
  } catch {
    return []
  }
}

export function getWaitlistStats(leads: WaitlistLead[]) {
  const byProduct: Record<string, number> = {}
  const bySource: Record<string, number> = {}
  for (const l of leads) {
    byProduct[l.productLabel] = (byProduct[l.productLabel] ?? 0) + 1
    bySource[l.sourcePage] = (bySource[l.sourcePage] ?? 0) + 1
  }
  return { total: leads.length, byProduct, bySource }
}
