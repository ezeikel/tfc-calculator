"use client"

import { useEffect } from "react"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEnvelope,
  faQuestionCircle,
  faCalculator,
  faMobile,
  faGlobe,
  faHeadset,
  faArrowRight,
  faCheckCircle
} from "@fortawesome/pro-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const SupportClient = () => {
  // Track page view on mount
  useEffect(() => {
    trackEvent("support_page_viewed", {
      page: "/support"
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-public-sans">
          Support & Help
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Get help with TFC Calculator and Tax-Free Childcare questions
        </p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary" className="text-sm">
            <FontAwesomeIcon icon={faGlobe} className="mr-1" />
            Web App
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <FontAwesomeIcon icon={faMobile} className="mr-1" />
            Mobile App
          </Badge>
        </div>
      </div>

      {/* Contact Support */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faHeadset} className="text-primary" />
            Contact Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="font-semibold mb-3">General Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Questions about using the app, calculations, or features
              </p>
              <Button asChild className="w-full">
                <a
                  href="mailto:support@chewybytes.com"
                  onClick={() => trackEvent("support_contact_clicked", {
                    contact_type: "general_support",
                    page: "/support"
                  })}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  support@chewybytes.com
                </a>
              </Button>
            </div>

            <div className="text-center">
              <h3 className="font-semibold mb-3">Tax-Free Childcare Help</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Specific questions about Tax-Free Childcare calculations
              </p>
              <Button asChild variant="outline" className="w-full">
                <a
                  href="mailto:tfccalculator@chewybytes.com"
                  onClick={() => trackEvent("support_contact_clicked", {
                    contact_type: "tfc_help",
                    page: "/support"
                  })}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  tfccalculator@chewybytes.com
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Help */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Find answers to common questions about Tax-Free Childcare and using the calculator
            </p>
            <Link href="/faqs">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => trackEvent("support_help_link_clicked", {
                  help_link_type: "faqs",
                  page: "/support"
                })}
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                View FAQs
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Learn how Tax-Free Childcare works and how to use the calculator effectively
            </p>
            <Link href="/how-it-works">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => trackEvent("support_help_link_clicked", {
                  help_link_type: "how_it_works",
                  page: "/support"
                })}
              >
                <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                How It Works
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Common Issues */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Common Issues & Solutions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
              <div>
                <h4 className="font-semibold text-sm">Calculator not showing results</h4>
                <p className="text-xs text-muted-foreground">Ensure you've entered a valid childcare cost amount and your child's information is complete.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
              <div>
                <h4 className="font-semibold text-sm">Incorrect government top-up calculation</h4>
                <p className="text-xs text-muted-foreground">Check that you haven't exceeded the £500 quarterly limit and verify your payment history is accurate.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
              <div>
                <h4 className="font-semibold text-sm">Mobile app sync issues</h4>
                <p className="text-xs text-muted-foreground">Data is stored locally on each device. Use the export/import feature to transfer data between devices.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
              <div>
                <h4 className="font-semibold text-sm">Eligibility questions</h4>
                <p className="text-xs text-muted-foreground">Use our eligibility checker or contact the official Tax-Free Childcare helpline for definitive eligibility guidance.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Official Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Official Tax-Free Childcare Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Government Support</h4>
              <p className="text-sm text-muted-foreground mb-3">
                For official Tax-Free Childcare account help and eligibility questions
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="https://www.childcarechoices.gov.uk" target="_blank" rel="noopener noreferrer">
                  Official Gov.UK Support
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </a>
              </Button>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Helpline</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Call the official Tax-Free Childcare helpline for account issues
              </p>
              <div className="text-sm font-medium text-center p-2 bg-muted rounded">
                0300 123 4097
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> TFC Calculator is an independent tool to help estimate your Tax-Free Childcare savings.
              For official account management and applications, use the government's Childcare Choices website.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}