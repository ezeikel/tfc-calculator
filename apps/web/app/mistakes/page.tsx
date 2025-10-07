import { Metadata } from "next"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExclamationTriangle,
  faLightbulb,
  faCalendarCheck,
  faUserCheck,
  faMoneyBillWave,
  faShield,
  faCalculator,
  faArrowRight,
  faInfoCircle,
  faClock,
  faRefresh
} from "@fortawesome/pro-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Common Tax-Free Childcare Mistakes & Tips 2025 | TFC Calculator",
  description: "Avoid the top 5 Tax-Free Childcare mistakes. Learn how to fix missed reconfirmation, payment problems, and eligibility issues. Expert tips for maximizing your savings.",
  keywords: "tax free childcare mistakes, TFC problems, missed reconfirmation, payment didn't work, tax-free childcare tips, troubleshooting childcare account"
}

type Mistake = {
  title: string
  description: string
  icon: any
  impact: "High" | "Medium" | "Low"
  prevention: string
  solution: string
}

type Tip = {
  title: string
  description: string
  icon: any
  category: "Planning" | "Payments" | "Eligibility" | "Savings"
}

const commonMistakes: Mistake[] = [
  {
    title: "Missing Reconfirmation Deadlines",
    description: "Forgetting to reconfirm eligibility every 3 months, causing government top-ups to stop",
    icon: faCalendarCheck,
    impact: "High",
    prevention: "Set calendar reminders 2 weeks before your reconfirmation date and check your account monthly",
    solution: "Log into your account immediately and complete reconfirmation. Contact HMRC if you've missed the deadline by more than a few days."
  },
  {
    title: "Exceeding Income Limits",
    description: "Not reporting income increases that push you over the £100,000 annual limit",
    icon: faMoneyBillWave,
    impact: "High",
    prevention: "Update your account immediately when your income changes, including bonuses, pay rises, or investment income",
    solution: "Stop paying into your account and contact HMRC. You may need to repay government contributions if you're no longer eligible."
  },
  {
    title: "Using Unregistered Childcare Providers",
    description: "Paying childcare providers who aren't registered with the Tax-Free Childcare scheme",
    icon: faUserCheck,
    impact: "Medium",
    prevention: "Always check your provider is registered before making payments. Ask them to join the scheme if they're not already",
    solution: "Contact your provider to register with the scheme, or find alternative registered providers in your area."
  },
  {
    title: "Not Understanding Quarterly Limits",
    description: "Expecting unused quarterly allowance to roll over to the next quarter",
    icon: faShield,
    impact: "Medium",
    prevention: "Plan your childcare costs quarterly and use your full allowance before each quarter ends",
    solution: "Use remaining allowance before the quarter ends, or save money by reducing payments if you won't reach the limit."
  },
  {
    title: "Claiming Multiple Childcare Schemes",
    description: "Trying to use Tax-Free Childcare alongside Universal Credit or employer childcare vouchers",
    icon: faExclamationTriangle,
    impact: "High",
    prevention: "Compare schemes before applying and choose the one that saves you the most money for your situation",
    solution: "Choose one scheme only. If you're already receiving benefits, you may need to switch schemes or stop Tax-Free Childcare."
  }
]

const expertTips: Tip[] = [
  {
    title: "Set Up Payment Reminders",
    description: "Create monthly calendar reminders to pay into your account and use your quarterly allowance",
    icon: faClock,
    category: "Planning"
  },
  {
    title: "Track Your Quarterly Usage",
    description: "Keep a simple spreadsheet of payments to ensure you maximize your government top-ups each quarter",
    icon: faCalculator,
    category: "Savings"
  },
  {
    title: "Verify Provider Registration",
    description: "Before starting with a new childcare provider, confirm they're registered and can accept Tax-Free Childcare payments",
    icon: faUserCheck,
    category: "Payments"
  },
  {
    title: "Update Income Changes Immediately",
    description: "Report pay rises, bonuses, or job changes within 30 days to avoid eligibility issues",
    icon: faMoneyBillWave,
    category: "Eligibility"
  },
  {
    title: "Plan Around School Holidays",
    description: "Consider holiday club costs when calculating your quarterly childcare needs",
    icon: faCalendarCheck,
    category: "Planning"
  },
  {
    title: "Keep Evidence of Expenses",
    description: "Save receipts and payment confirmations in case HMRC needs to verify your childcare costs",
    icon: faShield,
    category: "Eligibility"
  }
]

const MistakesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-public-sans">
          Common Tax-Free Childcare Mistakes & Tips
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Learn from others' mistakes and expert tips to maximize your Tax-Free Childcare savings
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm">
            Updated 2025
          </Badge>
        </div>
      </div>

      {/* Quick Alert */}
      <Alert className="mb-8 border-orange-200 bg-orange-50">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-600" />
        <AlertDescription>
          <strong>Most Common Issue:</strong> Missing reconfirmation deadlines causes 60% of Tax-Free Childcare problems. Set reminders now to avoid losing your benefits.
        </AlertDescription>
      </Alert>

      {/* Common Mistakes Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-public-sans">Top 5 Mistakes to Avoid</h2>
        <div className="space-y-6">
          {commonMistakes.map((mistake, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className={`${
                mistake.impact === "High" ? "bg-red-50 border-b border-red-200" :
                mistake.impact === "Medium" ? "bg-yellow-50 border-b border-yellow-200" :
                "bg-blue-50 border-b border-blue-200"
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    mistake.impact === "High" ? "bg-red-100" :
                    mistake.impact === "Medium" ? "bg-yellow-100" :
                    "bg-blue-100"
                  }`}>
                    <FontAwesomeIcon
                      icon={mistake.icon}
                      className={`text-xl ${
                        mistake.impact === "High" ? "text-red-600" :
                        mistake.impact === "Medium" ? "text-yellow-600" :
                        "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{mistake.title}</CardTitle>
                      <Badge
                        variant={mistake.impact === "High" ? "destructive" :
                                mistake.impact === "Medium" ? "secondary" : "default"}
                        className="text-xs"
                      >
                        {mistake.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{mistake.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-700">
                      <FontAwesomeIcon icon={faShield} className="mr-2" />
                      How to Prevent
                    </h4>
                    <p className="text-sm text-muted-foreground">{mistake.prevention}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-700">
                      <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                      How to Fix
                    </h4>
                    <p className="text-sm text-muted-foreground">{mistake.solution}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Expert Tips Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-public-sans">Expert Tips for Success</h2>

        {/* Tips by Category */}
        {["Planning", "Payments", "Eligibility", "Savings"].map(category => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-primary">{category} Tips</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {expertTips
                .filter(tip => tip.category === category)
                .map((tip, index) => (
                  <Card key={index} className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={tip.icon} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">{tip.title}</h4>
                          <p className="text-sm text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Troubleshooting Quick Guide */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faRefresh} />
            Quick Troubleshooting Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Payment Problems</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Check provider is registered with the scheme</li>
                <li>• Verify you have sufficient account balance</li>
                <li>• Ensure you haven't exceeded quarterly limits</li>
                <li>• Confirm your reconfirmation is up to date</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Account Issues</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Complete any overdue reconfirmations</li>
                <li>• Update changed income or employment status</li>
                <li>• Check for system maintenance messages</li>
                <li>• Contact HMRC if problems persist</li>
              </ul>
            </div>
          </div>

          <Alert className="mt-6">
            <FontAwesomeIcon icon={faInfoCircle} />
            <AlertDescription>
              <strong>Need immediate help?</strong> Call the Childcare Service helpline on 0300 123 4097 (Monday to Friday, 8am to 6pm).
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Prevention Checklist */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Monthly Prevention Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Every Month</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span>Check reconfirmation date</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span>Review account balance</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span>Plan next month's payments</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span>Check quarterly limit progress</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Every Quarter</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span>Complete reconfirmation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span>Use remaining allowance</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span>Update any income changes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span>Review provider registrations</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold font-public-sans">Ready to Calculate Your Savings?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Avoid these common mistakes and maximize your Tax-Free Childcare benefits with our calculator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="text-white">
                  <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                  Use Our Calculator
                </Button>
              </Link>
              <Link href="/faqs">
                <Button variant="outline" size="lg">
                  Read FAQs
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

export default MistakesPage