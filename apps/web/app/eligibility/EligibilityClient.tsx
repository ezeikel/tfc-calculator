"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faTimesCircle, faInfoCircle, faCalculator, faArrowRight } from "@fortawesome/pro-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

type EligibilityScenario = {
  title: string
  income: string
  children: string
  employment: string
  result: "eligible" | "not-eligible" | "maybe"
  explanation: string
}

const eligibilityScenarios: EligibilityScenario[] = [
  {
    title: "Dual-Income Family",
    income: "£45,000 each (£90,000 total)",
    children: "2 children (aged 3 and 5)",
    employment: "Both parents employed",
    result: "eligible",
    explanation: "Both parents earn over £183 per week and under £100,000 annually. Both children are under 12."
  },
  {
    title: "Single Parent",
    income: "£35,000 annually",
    children: "1 child (aged 4)",
    employment: "Full-time employed",
    result: "eligible",
    explanation: "Earns over £183 per week and under £100,000. Child is under 12."
  },
  {
    title: "Self-Employed Parent",
    income: "£40,000 annually",
    children: "1 child (aged 8)",
    employment: "Self-employed (both parents)",
    result: "eligible",
    explanation: "Self-employed income counts if you expect to earn over £183 per week on average."
  },
  {
    title: "High-Earning Couple",
    income: "£95,000 each (£190,000 total)",
    children: "1 child (aged 5)",
    employment: "Both parents employed",
    result: "eligible",
    explanation: "Both parents earn under £100,000 individually, so they qualify despite high household income."
  },
  {
    title: "Single High Earner",
    income: "£120,000 annually",
    children: "2 children (aged 6 and 9)",
    employment: "One parent employed",
    result: "not-eligible",
    explanation: "Income exceeds £100,000 annual limit per parent."
  },
  {
    title: "Universal Credit Recipient",
    income: "£18,000 annually",
    children: "1 child (aged 3)",
    employment: "Part-time + Universal Credit",
    result: "not-eligible",
    explanation: "Cannot claim Tax-Free Childcare while receiving Universal Credit."
  }
]

export const EligibilityClient = () => {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null)

  // Track page view on mount
  useEffect(() => {
    trackEvent("eligibility_page_viewed", {
      page: "/eligibility"
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-public-sans">
          Tax-Free Childcare Eligibility Checker
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Find out if you qualify for the government's 20% childcare contribution scheme in minutes
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm">
            Updated for 2025
          </Badge>
        </div>
      </div>

      {/* Quick Eligibility Checklist */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
            Quick Eligibility Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            You probably qualify for Tax-Free Childcare if:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">You earn at least £183 per week (about £9,518 annually)</span>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">You earn less than £100,000 per year</span>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">Your child is under 12 (or under 17 with disabilities)</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">You're employed, self-employed, or on parental leave</span>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">You live in England, Wales, Scotland, or Northern Ireland</span>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">Your childcare provider accepts Tax-Free Childcare payments</span>
              </div>
            </div>
          </div>

          <Alert className="mb-4">
            <FontAwesomeIcon icon={faInfoCircle} />
            <AlertDescription>
              <strong>Partners:</strong> If you have a partner, you both need to meet the income and employment requirements.
            </AlertDescription>
          </Alert>

          <div className="text-center">
            <Link href="/">
              <Button
                size="lg"
                className="text-white"
                onClick={() => trackEvent("eligibility_calculator_clicked", {
                  button_location: "main_cta",
                  page: "/eligibility"
                })}
              >
                <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                Calculate Your Savings Now
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* You May Not Qualify Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faTimesCircle} className="text-red-600" />
            You May Not Qualify If
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">You earn more than £100,000 per year</span>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">You receive Universal Credit (with childcare costs element)</span>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">You claim Working Tax Credit</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">Your child is 12 or older (17+ with disabilities)</span>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">You're on Income Support or Jobseeker's Allowance</span>
              </div>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 mt-1 flex-shrink-0" size="sm" />
                <span className="text-sm">Neither parent meets the minimum income requirement</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-Life Examples */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Real-Life Examples</CardTitle>
          <p className="text-muted-foreground">
            See how Tax-Free Childcare eligibility works in practice
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {eligibilityScenarios.map((scenario, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedScenario === index
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/50"
                }`}
                onClick={() => {
                  const newSelection = selectedScenario === index ? null : index
                  setSelectedScenario(newSelection)

                  if (newSelection !== null) {
                    trackEvent("eligibility_scenario_clicked", {
                      scenario_name: scenario.title,
                      scenario_result: scenario.result,
                      scenario_index: index,
                      page: "/eligibility"
                    })
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={scenario.result === "eligible" ? faCheckCircle : faTimesCircle}
                      className={scenario.result === "eligible" ? "text-green-600" : "text-red-600"}
                    />
                    <div>
                      <h3 className="font-semibold">{scenario.title}</h3>
                      <p className="text-sm text-muted-foreground">{scenario.income}</p>
                    </div>
                  </div>
                  <Badge
                    variant={scenario.result === "eligible" ? "default" : "destructive"}
                    className={scenario.result === "eligible" ? "bg-green-600 text-white" : ""}
                  >
                    {scenario.result === "eligible" ? "Eligible" : "Not Eligible"}
                  </Badge>
                </div>

                {selectedScenario === index && (
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Children:</strong> {scenario.children}
                      </div>
                      <div>
                        <strong>Employment:</strong> {scenario.employment}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Why:</strong> {scenario.explanation}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Income Limits Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Income Limits 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Situation</th>
                  <th className="text-left p-3">Minimum Income</th>
                  <th className="text-left p-3">Maximum Income</th>
                  <th className="text-left p-3">Per Week</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Single parent</td>
                  <td className="p-3">£9,518 annually</td>
                  <td className="p-3">£99,999 annually</td>
                  <td className="p-3">£183 - £1,923</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Couple (both must qualify)</td>
                  <td className="p-3">£9,518 each</td>
                  <td className="p-3">£99,999 each</td>
                  <td className="p-3">£183 - £1,923 each</td>
                </tr>
                <tr className="border-b bg-green-50">
                  <td className="p-3 font-medium">Couple earning maximum</td>
                  <td className="p-3">£9,518 each</td>
                  <td className="p-3 font-semibold text-green-700">£199,998 total</td>
                  <td className="p-3">Up to £1,923 each</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Disabled child support</td>
                  <td className="p-3">Same as above</td>
                  <td className="p-3">Same as above</td>
                  <td className="p-3">Higher quarterly limits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Ready to Apply?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Calculate Your Savings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use our calculator to see exactly how much you could save each quarter.
              </p>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                  Try Calculator
                </Button>
              </Link>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Official Application</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Apply directly through the government's Childcare Choices website.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://www.childcarechoices.gov.uk" target="_blank" rel="noopener noreferrer">
                  Apply on Gov.UK
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}