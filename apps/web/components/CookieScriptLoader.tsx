"use client"

import Script from "next/script"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    CookieScript: {
      instance: {
        show: () => void
        hide: () => void
        acceptAction: (categories: string[]) => void
        acceptAllAction: () => void
        getCurrentState: () => { action: string; categories: string[] }
      }
    }
  }
}

const CookieScriptLoader = () => {
  const scriptId = process.env.NEXT_PUBLIC_COOKIESCRIPT_ID

  const handleCookieScriptLoad = () => {
    // Wait for CookieScript to fully initialize
    const initializeCookieScript = () => {
      if (typeof window !== 'undefined' && window.CookieScript?.instance) {
        try {
          // Hide CookieScript's default UI since we use our custom one
          window.CookieScript.instance.hide()
          console.log('✅ CookieScript loaded and hidden')
        } catch (err) {
          console.warn('Could not hide CookieScript UI:', err)
        }
      } else {
        // CookieScript might not be fully loaded yet, try again
        setTimeout(initializeCookieScript, 500)
      }
    }

    // Start initialization
    initializeCookieScript()

    // Configure Google Consent Mode defaults
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted'
      })
    }
  }

  if (!scriptId) {
    return null
  }

  return (
    <Script
      src={`https://cdn.cookiescript.com/app/js/${scriptId}.js`}
      strategy="afterInteractive"
      onLoad={handleCookieScriptLoad}
    />
  )
}

export default CookieScriptLoader