"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCookie, faCheck, faTimes, faCog } from "@fortawesome/pro-solid-svg-icons"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface ConsentState {
  necessary: boolean
  analytics: boolean
  advertising: boolean
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true, // Always required
    analytics: false,
    advertising: false
  })

  useEffect(() => {
    // Check if consent has already been given
    const consentGiven = localStorage.getItem('cookie-consent')
    if (!consentGiven) {
      setShowBanner(true)
    } else {
      const savedConsent = JSON.parse(consentGiven)
      setConsent(savedConsent)
      updateGoogleConsent(savedConsent)
    }
  }, [])

  const updateGoogleConsent = (consentState: ConsentState) => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Update Google Consent Mode
      window.gtag('consent', 'update', {
        analytics_storage: consentState.analytics ? 'granted' : 'denied',
        ad_storage: consentState.advertising ? 'granted' : 'denied',
        ad_user_data: consentState.advertising ? 'granted' : 'denied',
        ad_personalization: consentState.advertising ? 'granted' : 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted'
      })
    }
  }

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      advertising: true
    }
    setConsent(newConsent)
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent))
    updateGoogleConsent(newConsent)
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleAcceptNecessary = () => {
    const newConsent = {
      necessary: true,
      analytics: false,
      advertising: false
    }
    setConsent(newConsent)
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent))
    updateGoogleConsent(newConsent)
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent))
    updateGoogleConsent(consent)
    setShowBanner(false)
    setShowSettings(false)
  }

  const toggleConsent = (type: keyof ConsentState) => {
    if (type === 'necessary') return // Can't disable necessary cookies
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t">
      <div className="container mx-auto max-w-4xl">
        {!showSettings ? (
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <FontAwesomeIcon icon={faCookie} className="text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold font-public-sans">We use cookies</h3>
                    <p className="text-sm text-muted-foreground text-pretty">
                      We use cookies to improve your experience, analyze traffic, and show relevant ads.
                      You can choose which cookies to accept.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        Essential functionality
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Analytics
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Advertising
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                    className="text-xs"
                  >
                    <FontAwesomeIcon icon={faCog} size="xs" className="mr-1" />
                    Customize
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAcceptNecessary}
                    className="text-xs"
                  >
                    <FontAwesomeIcon icon={faTimes} size="xs" className="mr-1" />
                    Necessary Only
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="text-xs"
                  >
                    <FontAwesomeIcon icon={faCheck} size="xs" className="mr-1" />
                    Accept All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCog} className="text-primary" />
                  <h3 className="font-semibold font-public-sans">Cookie Settings</h3>
                </div>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">Necessary Cookies</h4>
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Essential for the website to function properly. Cannot be disabled.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center">
                        <FontAwesomeIcon icon={faCheck} size="xs" className="text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-3 bg-background rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">Analytics Cookies</h4>
                      <p className="text-xs text-muted-foreground">
                        Help us understand how visitors use our website to improve performance.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleConsent('analytics')}
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                          consent.analytics
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {consent.analytics && (
                          <FontAwesomeIcon icon={faCheck} size="xs" className="text-primary-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Advertising Cookies */}
                  <div className="flex items-start justify-between p-3 bg-background rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">Advertising Cookies</h4>
                      <p className="text-xs text-muted-foreground">
                        Used to show relevant ads and measure ad effectiveness.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleConsent('advertising')}
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                          consent.advertising
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {consent.advertising && (
                          <FontAwesomeIcon icon={faCheck} size="xs" className="text-primary-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(false)}
                    className="text-xs"
                  >
                    Back
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAcceptNecessary}
                    className="text-xs"
                  >
                    Save & Accept Necessary Only
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveSettings}
                    className="text-xs"
                  >
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default CookieConsent