import { siteConfig } from '@/config/site'
import { trackEvent } from '@/composables/useAnalytics'

export interface WaitlistPayload {
  name: string
  email: string
  productId: string
  productLabel: string
}

export function submitWaitlist(payload: WaitlistPayload): boolean {
  const { formAction, entryName, entryEmail, entryProduct } = siteConfig.waitlist

  trackEvent('waitlist_submit', {
    product_id: payload.productId,
    product_name: payload.productLabel,
  })

  if (!formAction) {
    console.warn('[Waitlist] 請在 .env 設定 VITE_WAITLIST_FORM_ACTION')
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
