import { siteConfig } from '@/config/site'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

export function initAnalytics() {
  const { gaId, clarityId } = siteConfig.analytics

  if (gaId && typeof document !== 'undefined') {
    const gtagScript = document.createElement('script')
    gtagScript.async = true
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(gtagScript)

    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(args)
    }
    window.dataLayer = window.dataLayer || []
    window.gtag('js', new Date())
    window.gtag('config', gaId)
  }

  if (clarityId && typeof document !== 'undefined') {
    const clarityScript = document.createElement('script')
    clarityScript.innerHTML = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`
    document.head.appendChild(clarityScript)
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (window.gtag) {
    window.gtag('event', eventName, params)
  }
  if (window.clarity) {
    window.clarity('event', eventName)
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}
