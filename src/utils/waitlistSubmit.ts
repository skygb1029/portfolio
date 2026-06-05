import { siteConfig } from '@/config/site'
import { trackEvent } from '@/composables/useAnalytics'
import { postJson } from '@/utils/apiClient'
import { saveWaitlistLead } from '@/utils/waitlistLocal'

export interface WaitlistPayload {
  name: string
  email: string
  productId: string
  productLabel: string
  sourcePage?: string
}

export async function submitWaitlist(payload: WaitlistPayload): Promise<boolean> {
  const sourcePage = payload.sourcePage ?? window.location.pathname

  trackEvent('waitlist_submit', {
    product_id: payload.productId,
    product_name: payload.productLabel,
    source_page: sourcePage,
  })

  saveWaitlistLead({
    name: payload.name,
    email: payload.email,
    productId: payload.productId,
    productLabel: payload.productLabel,
    sourcePage,
  })

  try {
    const res = await postJson<{ ok: boolean; fallback?: boolean }>('/api/waitlist', {
      name: payload.name,
      email: payload.email,
      product: payload.productLabel,
      source: sourcePage,
    })
    return res.ok
  } catch {
    return submitGoogleFormFallback(payload)
  }
}

function submitGoogleFormFallback(payload: WaitlistPayload): boolean {
  const { formAction, entryName, entryEmail, entryProduct } = siteConfig.waitlist
  if (!formAction) {
    console.warn('[Waitlist] Supabase 未設定且無 Google Form')
    return false
  }

  const form = document.createElement('form')
  form.action = formAction
  form.method = 'POST'
  form.target = '_blank'
  form.style.display = 'none'

  const fields: [string, string][] = [
    [entryName, payload.name],
    [entryEmail, payload.email],
    [entryProduct, payload.productLabel],
  ].filter(([key]) => key.length > 0) as [string, string][]

  for (const [name, value] of fields) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    form.appendChild(input)
  }

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
  return true
}
