"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMapMarkerAlt,
  faCheckCircle,
  faInfoCircle,
  faCalculator,
  faArrowRight,
  faExternalLinkAlt,
  faPhone,
  faGlobe
} from "@fortawesome/pro-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type RegionInfo = {
  name: string
  flag: string
  registrationBody: string
  registrationBodyUrl: string
  helplineNumber: string
  localSupport: string
  applicationProcess: string
  providerRequirements: string
  keyDifferences: string[]
  commonProviders: string[]
  localSchemes: string[]
}

const regions: RegionInfo[] = [
  {
    name: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    registrationBody: "Ofsted",
    registrationBodyUrl: "https://www.ofsted.gov.uk",
    helplineNumber: "0300 123 1231",
    localSupport: "Local authorities and Family Information Services provide childcare guidance",
    applicationProcess: "Standard UK-wide application through Childcare Choices website",
    providerRequirements: "Must be registered with Ofsted and signed up to the Tax-Free Childcare scheme",
    keyDifferences: [
      "Largest network of registered providers",
      "Most comprehensive local authority support",
      "Widest range of childcare options available"
    ],
    commonProviders: [
      "Nurseries and pre-schools",
      "Registered childminders",
      "After-school clubs",
      "Holiday clubs and schemes",
      "Breakfast clubs"
    ],
    localSchemes: [
      "30 hours free childcare (3-4 year olds)",
      "15 hours free childcare (2 year olds)",
      "Early Years Pupil Premium"
    ]
  },
  {
    name: "Wales",
    flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    registrationBody: "Care Inspectorate Wales (CIW)",
    registrationBodyUrl: "https://careinspectorate.wales",
    helplineNumber: "0300 7900 126",
    localSupport: "Flying Start programme and local authority Family Information Services",
    applicationProcess: "Same UK-wide system, but providers must be CIW registered",
    providerRequirements: "Must be registered with Care Inspectorate Wales and joined Tax-Free Childcare",
    keyDifferences: [
      "Bilingual childcare options (Welsh/English)",
      "Flying Start programme for 2-3 year olds in targeted areas",
      "Welsh-medium education pathway support"
    ],
    commonProviders: [
      "Cylchoedd Meithrin (Welsh-medium playgroups)",
      "English and Welsh-medium nurseries",
      "Registered childminders",
      "After-school and holiday clubs"
    ],
    localSchemes: [
      "Flying Start (free part-time childcare 2-3 years)",
      "30 hours free childcare (3-4 year olds)",
      "Welsh Government Childcare Offer"
    ]
  },
  {
    name: "Scotland",
    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    registrationBody: "Care Inspectorate Scotland",
    registrationBodyUrl: "https://www.careinspectorate.com",
    helplineNumber: "0345 600 9527",
    localSupport: "Local authority Family Information Services and Childcare Information Scotland",
    applicationProcess: "UK-wide application, but providers must be Care Inspectorate Scotland registered",
    providerRequirements: "Must be registered with Care Inspectorate Scotland and part of Tax-Free Childcare",
    keyDifferences: [
      "1140 hours free childcare (3-4 year olds)",
      "Some eligible 2-year-olds get free hours",
      "Different term times and holiday patterns"
    ],
    commonProviders: [
      "Local authority nurseries",
      "Private nurseries and kindergartens",
      "Registered childminders",
      "Family centres and playgroups"
    ],
    localSchemes: [
      "1140 hours free childcare (almost 30 hours/week)",
      "Free meals for nursery children",
      "Best Start Grant and payments"
    ]
  },
  {
    name: "Northern Ireland",
    flag: "🇬🇧",
    registrationBody: "Health and Social Care Trusts",
    registrationBodyUrl: "https://www.health-ni.gov.uk",
    helplineNumber: "028 9536 3000",
    localSupport: "Health and Social Care Trusts and local councils provide childcare information",
    applicationProcess: "UK-wide system, providers registered with local Health and Social Care Trusts",
    providerRequirements: "Must be registered with local Health and Social Care Trust and signed up to Tax-Free Childcare",
    keyDifferences: [
      "Different registration system through Health and Social Care Trusts",
      "Smaller provider network",
      "Strong community-based childcare options"
    ],
    commonProviders: [
      "Day nurseries and crèches",
      "Registered childminders",
      "Playgroups and parent & toddler groups",
      "Sure Start centres"
    ],
    localSchemes: [
      "Free pre-school education (3-4 year olds)",
      "Sure Start programmes",
      "Childcare partnerships with community groups"
    ]
  }
]

export const RegionalGuideClient = () => {
  const [selectedRegion, setSelectedRegion] = useState("England")

  // Track page view on mount
  useEffect(() => {
    trackEvent("regional_guide_page_viewed", {
      page: "/regional-guide"
    })
  }, [])

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region)
    trackEvent("regional_guide_region_selected", {
      selected_region: region,
      page: "/regional-guide"
    })
  }


  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-public-sans">
          Tax-Free Childcare Regional Guide
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
          Understanding how Tax-Free Childcare works across England, Wales, Scotland and Northern Ireland
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary" className="text-sm">
            All UK Regions
          </Badge>
          <Badge variant="outline" className="text-sm">
            Updated 2025
          </Badge>
        </div>
      </div>

      {/* Key Similarities Alert */}
      <Alert className="mb-8">
        <FontAwesomeIcon icon={faInfoCircle} />
        <AlertDescription>
          <strong>Good news:</strong> Tax-Free Childcare eligibility, benefits, and quarterly limits are the same across all UK regions.
          The main differences are in provider registration and local childcare schemes.
        </AlertDescription>
      </Alert>

      {/* Region Selector */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" />
            Select Your Region
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedRegion} onValueChange={handleRegionChange}>
            <TabsList className="grid w-full grid-cols-4">
              {regions.map((region) => (
                <TabsTrigger
                  key={region.name}
                  value={region.name}
                  className="text-sm"
                >
                  <span className="mr-1">{region.flag}</span>
                  {region.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {regions.map((region) => (
              <TabsContent key={region.name} value={region.name} className="mt-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Registration & Oversight */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Registration & Oversight</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Registration Body</h4>
                        <p className="text-sm text-muted-foreground mb-2">{region.registrationBody}</p>
                        <Button variant="outline" size="sm" asChild>
                          <a href={region.registrationBodyUrl} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                            Visit Website
                          </a>
                        </Button>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Provider Requirements</h4>
                        <p className="text-sm text-muted-foreground">{region.providerRequirements}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Support & Helplines */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Support & Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Helpline Number</h4>
                        <div className="flex items-center gap-2 text-sm">
                          <FontAwesomeIcon icon={faPhone} className="text-primary" />
                          <a href={`tel:${region.helplineNumber}`} className="text-primary hover:underline">
                            {region.helplineNumber}
                          </a>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Local Support</h4>
                        <p className="text-sm text-muted-foreground">{region.localSupport}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Application Process */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Application Process</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{region.applicationProcess}</p>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.childcarechoices.gov.uk" target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                          Apply Now
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Key Regional Differences */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Regional Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {region.keyDifferences.map((difference, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                            {difference}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Provider Types */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Common Provider Types in {region.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Tax-Free Childcare Providers</h4>
                        <ul className="space-y-2">
                          {region.commonProviders.map((provider, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" size="sm" />
                              {provider}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Other Local Schemes</h4>
                        <ul className="space-y-2">
                          {region.localSchemes.map((scheme, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600" size="sm" />
                              {scheme}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Universal Information */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Same Across All Regions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                <span><strong>Eligibility requirements:</strong> Income limits, employment status, and age criteria are identical</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                <span><strong>Government contribution:</strong> 20% top-up rate across all regions</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                <span><strong>Quarterly limits:</strong> £500 maximum per child per quarter</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                <span><strong>Reconfirmation:</strong> Every 3 months across all regions</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Finding Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To find Tax-Free Childcare providers in your area, check with your local:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" size="sm" />
                  Family Information Service
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" size="sm" />
                  Local authority childcare team
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" size="sm" />
                  Regional registration body website
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Calculator CTA */}
      <Card>
        <CardHeader>
          <CardTitle>Calculate Your Tax-Free Childcare Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-muted-foreground mb-4">
                Regardless of your region, use our calculator to see exactly how much the government
                will contribute to your childcare costs each quarter.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">Works for all UK regions</Badge>
                <Badge variant="outline" className="text-xs">Real-time calculations</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/">
                <Button
                  size="lg"
                  className="w-full text-white"
                  onClick={() => trackEvent("regional_guide_calculator_clicked", {
                    selected_region: selectedRegion,
                    page: "/regional-guide"
                  })}
                >
                  <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                  Calculate Your Savings
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Button>
              </Link>
              <Link href="/eligibility">
                <Button variant="outline" className="w-full">
                  Check Your Eligibility
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}