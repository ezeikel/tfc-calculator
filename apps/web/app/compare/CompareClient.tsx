"use client"

import { useState } from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBalanceScale,
  faCheckCircle,
  faTimesCircle,
  faExclamationTriangle,
  faCalculator,
  faArrowRight,
  faMoneyBillWave,
  faUsers,
  faGraduationCap,
  faInfoCircle
} from "@fortawesome/pro-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Scheme = {
  name: string
  description: string
  icon: any
  maxSupport: string
  eligibility: string[]
  pros: string[]
  cons: string[]
  availability: "Available" | "Closed" | "Limited"
  bestFor: string
}

const schemes: Scheme[] = [
  {
    name: "Tax-Free Childcare",
    description: "Government adds 20% to your childcare payments",
    icon: faMoneyBillWave,
    maxSupport: "£500 per quarter per child (£1,000 for disabled children)",
    eligibility: [
      "Earn £183+ per week and under £100,000 per year",
      "Both partners must qualify (if applicable)",
      "Child under 12 (17 for disabled)",
      "Not receiving Universal Credit or Tax Credits"
    ],
    pros: [
      "Simple 20% top-up on all payments",
      "No upper income limit (until £100,000)",
      "Can be used with 30 hours free childcare",
      "Works with most registered providers",
      "Available to new applicants"
    ],
    cons: [
      "Must reconfirm every 3 months",
      "Quarterly limits don't roll over",
      "Can't use with Universal Credit",
      "Provider must be registered"
    ],
    availability: "Available",
    bestFor: "Working families earning £25,000-£100,000 annually"
  },
  {
    name: "Universal Credit (Childcare)",
    description: "Covers up to 85% of childcare costs for eligible families",
    icon: faUsers,
    maxSupport: "Up to £951/month (1 child) or £1,630/month (2+ children)",
    eligibility: [
      "Receiving Universal Credit",
      "Working (or partner working)",
      "Low to moderate income",
      "Child under 16"
    ],
    pros: [
      "Covers up to 85% of childcare costs",
      "Higher maximum support than TFC",
      "Integrated with other benefits",
      "No quarterly reconfirmation"
    ],
    cons: [
      "Only for Universal Credit recipients",
      "Income restrictions",
      "Can't use with Tax-Free Childcare",
      "May affect other benefits"
    ],
    availability: "Available",
    bestFor: "Low to moderate income families already on Universal Credit"
  },
  {
    name: "Employer Childcare Vouchers",
    description: "Tax and National Insurance savings on childcare costs",
    icon: faGraduationCap,
    maxSupport: "Up to £243 per month in tax/NI savings",
    eligibility: [
      "Employer must offer the scheme",
      "Any income level",
      "Already in scheme before Oct 2018"
    ],
    pros: [
      "No income upper limit",
      "Saves tax and National Insurance",
      "Employer may contribute additional amount",
      "No quarterly limits"
    ],
    cons: [
      "Closed to new applicants since Oct 2018",
      "Only existing members can continue",
      "Can't use with Tax-Free Childcare",
      "Depends on employer participation"
    ],
    availability: "Closed",
    bestFor: "Existing members with higher incomes (over £100,000)"
  },
  {
    name: "30 Hours Free Childcare",
    description: "Free early education for 3-4 year olds",
    icon: faGraduationCap,
    maxSupport: "Up to 30 hours per week (term-time or stretched)",
    eligibility: [
      "Child aged 3-4 years",
      "Earn at least £183 per week",
      "Earn less than £100,000 per year",
      "Both partners must qualify (if applicable)"
    ],
    pros: [
      "Completely free childcare hours",
      "Can use with Tax-Free Childcare",
      "Covers education and care",
      "Available at most nurseries"
    ],
    cons: [
      "Only for 3-4 year olds",
      "Limited to 30 hours per week",
      "May not cover full working hours",
      "Additional costs may apply"
    ],
    availability: "Available",
    bestFor: "Working families with 3-4 year olds"
  }
]

export const CompareClient = () => {
  const [selectedSchemes, setSelectedSchemes] = useState<string[]>(["Tax-Free Childcare", "Universal Credit (Childcare)"])

  const toggleScheme = (schemeName: string) => {
    setSelectedSchemes(prev => {
      if (prev.includes(schemeName)) {
        return prev.filter(name => name !== schemeName)
      } else if (prev.length < 3) {
        return [...prev, schemeName]
      }
      return prev
    })
  }

  const selectedSchemeData = schemes.filter(scheme => selectedSchemes.includes(scheme.name))

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-public-sans">
          Tax-Free Childcare vs Other Schemes
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Compare all UK childcare support schemes to find the best option for your family situation
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm">
            Updated for 2025
          </Badge>
        </div>
      </div>

      {/* Scheme Selector */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBalanceScale} />
            Select Schemes to Compare (max 3)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {schemes.map((scheme) => (
              <div
                key={scheme.name}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedSchemes.includes(scheme.name)
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/50"
                } ${scheme.availability === "Closed" ? "opacity-60" : ""}`}
                onClick={() => toggleScheme(scheme.name)}
              >
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={scheme.icon} className="text-primary mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{scheme.name}</h3>
                    <Badge
                      variant={
                        scheme.availability === "Available" ? "default" :
                        scheme.availability === "Closed" ? "destructive" : "secondary"
                      }
                      className="text-xs mt-1"
                    >
                      {scheme.availability}
                    </Badge>
                  </div>
                  {selectedSchemes.includes(scheme.name) && (
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {selectedSchemes.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Side-by-Side Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Feature</th>
                    {selectedSchemeData.map((scheme) => (
                      <th key={scheme.name} className="text-left p-3 font-semibold min-w-48">
                        {scheme.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Maximum Support</td>
                    {selectedSchemeData.map((scheme) => (
                      <td key={scheme.name} className="p-3">{scheme.maxSupport}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Availability</td>
                    {selectedSchemeData.map((scheme) => (
                      <td key={scheme.name} className="p-3">
                        <Badge
                          variant={
                            scheme.availability === "Available" ? "default" :
                            scheme.availability === "Closed" ? "destructive" : "secondary"
                          }
                          className="text-xs"
                        >
                          {scheme.availability}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Best For</td>
                    {selectedSchemeData.map((scheme) => (
                      <td key={scheme.name} className="p-3">{scheme.bestFor}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Scheme Information */}
      <div className="space-y-8 mb-12">
        {schemes.map((scheme) => (
          <Card key={scheme.name} className="overflow-hidden">
            <CardHeader className={scheme.availability === "Closed" ? "bg-red-50" : "bg-muted/20"}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={scheme.icon} className="text-primary text-xl" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{scheme.name}</CardTitle>
                    <p className="text-muted-foreground">{scheme.description}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    scheme.availability === "Available" ? "default" :
                    scheme.availability === "Closed" ? "destructive" : "secondary"
                  }
                >
                  {scheme.availability}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Eligibility Requirements</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {scheme.eligibility.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-0.5 flex-shrink-0" size="sm" />
                        {req}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Maximum Support</h4>
                    <p className="text-sm text-muted-foreground">{scheme.maxSupport}</p>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-700">Advantages</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {scheme.pros.map((pro, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 mt-0.5 flex-shrink-0" size="sm" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-red-700">Disadvantages</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {scheme.cons.map((con, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 mt-0.5 flex-shrink-0" size="sm" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold mb-2">Best For</h4>
                <p className="text-sm text-muted-foreground">{scheme.bestFor}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Decision Helper */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Which Scheme Should You Choose?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <AlertDescription>
                <strong>Important:</strong> You cannot use Tax-Free Childcare with Universal Credit or employer childcare vouchers. You must choose one scheme.
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Choose Tax-Free Childcare if you:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Earn between £25,000 - £100,000 annually</li>
                  <li>• Are not on Universal Credit</li>
                  <li>• Want a simple 20% top-up system</li>
                  <li>• Can manage quarterly reconfirmations</li>
                  <li>• Use registered childcare providers</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Choose Universal Credit if you:</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Already receive Universal Credit</li>
                  <li>• Have low to moderate income</li>
                  <li>• Need higher percentage support (up to 85%)</li>
                  <li>• Want integrated benefit system</li>
                  <li>• Prefer monthly assessments</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Combination Opportunities */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Schemes You Can Use Together</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-green-800">✅ Can Combine</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Tax-Free Childcare + 30 hours free childcare</li>
                <li>• Universal Credit + 30 hours free childcare</li>
                <li>• Employer vouchers + 30 hours free childcare</li>
              </ul>
            </div>

            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-red-800">❌ Cannot Combine</h4>
              <ul className="space-y-1 text-sm text-red-700">
                <li>• Tax-Free Childcare + Universal Credit</li>
                <li>• Tax-Free Childcare + Employer vouchers</li>
                <li>• Universal Credit + Employer vouchers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold font-public-sans">Calculate Your Potential Savings</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use our calculator to see exactly how much you could save with Tax-Free Childcare for your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="text-white">
                  <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                  Calculate Tax-Free Childcare Savings
                </Button>
              </Link>
              <Link href="/eligibility">
                <Button variant="outline" size="lg">
                  Check Eligibility
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}