"use client"

import { useEffect, useRef, useState } from "react"

interface AdBannerProps {
  placement: 'homepage-top' | 'homepage-bottom' | 'blog-top' | 'blog-content' | 'calculator-result' | 'faq-section' | 'info-page'
  size?: 'banner' | 'large-banner' | 'medium-rectangle' | 'responsive'
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  placement,
  size = 'responsive',
  className = ""
}) => {
  const adRef = useRef<HTMLModElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)

  // Check for consent using our custom UI + CookieScript backend
  useEffect(() => {
    const checkConsent = () => {
      // First check our custom localStorage (primary source)
      const customConsent = localStorage.getItem('tfc-cookie-consent')
      if (customConsent) {
        const consent = JSON.parse(customConsent)
        setHasConsent(consent.advertising)
        return
      }

      // Fallback: Check CookieScript if available (for edge cases)
      if (typeof window !== 'undefined' && (window as any).CookieScript?.instance) {
        try {
          const currentState = (window as any).CookieScript.instance.getCurrentState()
          if (currentState && currentState.action === 'accept') {
            const hasAdConsent = currentState.categories.includes('targeting')
            setHasConsent(hasAdConsent)
          } else {
            setHasConsent(false)
          }
        } catch (err) {
          console.warn('Could not check CookieScript consent:', err)
          setHasConsent(false)
        }
      } else {
        setHasConsent(false)
      }
    }

    // Check consent on mount
    checkConsent()

    // Listen for changes from our custom UI
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'tfc-cookie-consent') {
        checkConsent()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Also listen for CookieScript events as fallback
    window.addEventListener('CookieScript_consent', checkConsent)

    // Check periodically for the first 10 seconds
    const interval = setInterval(checkConsent, 1000)
    setTimeout(() => clearInterval(interval), 10000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('CookieScript_consent', checkConsent)
      clearInterval(interval)
    }
  }, [])

  // Get ad slot ID based on placement (these would be your actual AdSense slot IDs)
  const getAdSlot = () => {
    switch (placement) {
      case 'homepage-top':
        return process.env.NEXT_PUBLIC_ADSENSE_HOMEPAGE_TOP || 'ca-pub-xxxxxxxxxx/xxxxxxxxxx'
      case 'homepage-bottom':
        return process.env.NEXT_PUBLIC_ADSENSE_HOMEPAGE_BOTTOM || 'ca-pub-xxxxxxxxxx/xxxxxxxxxx'
      case 'blog-top':
        return process.env.NEXT_PUBLIC_ADSENSE_BLOG_TOP || 'ca-pub-xxxxxxxxxx/xxxxxxxxxx'
      case 'blog-content':
        return process.env.NEXT_PUBLIC_ADSENSE_BLOG_CONTENT || 'ca-pub-xxxxxxxxxx/xxxxxxxxxx'
      case 'calculator-result':
        return process.env.NEXT_PUBLIC_ADSENSE_CALCULATOR || 'ca-pub-xxxxxxxxxx/xxxxxxxxxx'
      case 'faq-section':
        return process.env.NEXT_PUBLIC_ADSENSE_FAQ || 'ca-pub-xxxxxxxxxx/xxxxxxxxxx'
      case 'info-page':
        return process.env.NEXT_PUBLIC_ADSENSE_INFO || 'ca-pub-xxxxxxxxxx/xxxxxxxxxx'
      default:
        return process.env.NEXT_PUBLIC_ADSENSE_DEFAULT || 'ca-pub-xxxxxxxxxx/xxxxxxxxxx'
    }
  }

  // Get ad size configuration
  const getAdSize = () => {
    switch (size) {
      case 'banner':
        return {
          width: 728,
          height: 90,
          style: { width: '728px', height: '90px' }
        }
      case 'large-banner':
        return {
          width: 970,
          height: 250,
          style: { width: '970px', height: '250px' }
        }
      case 'medium-rectangle':
        return {
          width: 300,
          height: 250,
          style: { width: '300px', height: '250px' }
        }
      case 'responsive':
      default:
        return {
          width: 'auto',
          height: 'auto',
          style: { display: 'block', width: '100%', height: 'auto' }
        }
    }
  }

  const adSize = getAdSize()

  useEffect(() => {
    if (!hasConsent) return

    const loadAd = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
          // Push the ad to AdSense
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          setIsLoaded(true)
        }
      } catch (error) {
        console.error('AdSense ad failed to load:', error)
      }
    }

    // Load ad after a small delay to ensure the script is loaded
    const timer = setTimeout(loadAd, 100)
    return () => clearTimeout(timer)
  }, [hasConsent])

  // Don't render if no consent
  if (!hasConsent) {
    return null
  }

  return (
    <div className={`flex justify-center items-center py-4 ${className}`}>
      <div
        className="ad-container border border-muted/50 rounded-lg overflow-hidden bg-muted/10"
        style={{ maxWidth: '100%' }}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={adSize.style}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-xxxxxxxxxx'}
          data-ad-slot={getAdSlot()}
          data-ad-format={size === 'responsive' ? 'auto' : undefined}
          data-full-width-responsive={size === 'responsive' ? 'true' : undefined}
        />
        {!isLoaded && (
          <div
            className="flex items-center justify-center text-xs text-muted-foreground bg-muted/20"
            style={adSize.style}
          >
            Advertisement
          </div>
        )}
      </div>
    </div>
  )
}