import { Metadata } from "next"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalculator,
  faArrowRight,
  faChild,
  faUsers,
  faWheelchair,
  faChartLine,
  faMoneyBillWave,
  faInfoCircle
} from "@fortawesome/pro-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Tax-Free Childcare Examples - Real Scenarios & Savings 2025 | TFC Calculator",
  description: "See real Tax-Free Childcare examples with actual savings calculations. Examples for one child, two children, disabled child, and different income levels. Calculate your potential savings.",
  keywords: "tax free childcare examples, childcare savings calculator, how much will I get, working example, TFC scenarios, government top-up examples"
}

type ExampleScenario = {
  title: string
  description: string
  icon: any
  family: {
    children: Array<{
      age: number
      disabled?: boolean
    }>
    monthlyChildcareCost: number
    quarterlyChildcareCost: number
  }
  calculation: {
    parentPayment: number
    governmentTopUp: number
    total: number
    quarterlyLimit: number
    remainingAllowance: number
  }
  annual: {
    totalCost: number
    parentPays: number
    governmentContributes: number
    savings: number
  }
}

const scenarios: ExampleScenario[] = [
  {
    title: "Single Child - Nursery",
    description: "Family with one 4-year-old in full-time nursery",
    icon: faChild,
    family: {
      children: [{ age: 4 }],
      monthlyChildcareCost: 1200,
      quarterlyChildcareCost: 3600
    },
    calculation: {
      parentPayment: 2880,
      governmentTopUp: 720,
      total: 3600,
      quarterlyLimit: 1500,
      remainingAllowance: 780
    },
    annual: {
      totalCost: 14400,
      parentPays: 11520,
      governmentContributes: 2880,
      savings: 2880
    }
  },
  {
    title: "Two Children - Mixed Care",
    description: "Family with children aged 3 and 7, nursery and after-school club",
    icon: faUsers,
    family: {
      children: [{ age: 3 }, { age: 7 }],
      monthlyChildcareCost: 1800,
      quarterlyChildcareCost: 5400
    },
    calculation: {
      parentPayment: 4320,
      governmentTopUp: 1080,
      total: 5400,
      quarterlyLimit: 3000,
      remainingAllowance: 1920
    },
    annual: {
      totalCost: 21600,
      parentPays: 17280,
      governmentContributes: 4320,
      savings: 4320
    }
  },
  {
    title: "Disabled Child - Enhanced Support",
    description: "Family with one 8-year-old disabled child requiring specialist care",
    icon: faWheelchair,
    family: {
      children: [{ age: 8, disabled: true }],
      monthlyChildcareCost: 2000,
      quarterlyChildcareCost: 6000
    },
    calculation: {
      parentPayment: 4800,
      governmentTopUp: 1200,
      total: 6000,
      quarterlyLimit: 3000,
      remainingAllowance: 1800
    },
    annual: {
      totalCost: 24000,
      parentPays: 19200,
      governmentContributes: 4800,
      savings: 4800
    }
  },
  {
    title: "Part-Time Care",
    description: "Family with one 5-year-old in part-time nursery and holiday club",
    icon: faChartLine,
    family: {
      children: [{ age: 5 }],
      monthlyChildcareCost: 600,
      quarterlyChildcareCost: 1800
    },
    calculation: {
      parentPayment: 1440,
      governmentTopUp: 360,
      total: 1800,
      quarterlyLimit: 1500,
      remainingAllowance: 1140
    },
    annual: {
      totalCost: 7200,
      parentPays: 5760,
      governmentContributes: 1440,
      savings: 1440
    }
  }
]

const ExamplesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-public-sans">
          Tax-Free Childcare Examples
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          See real-world examples of how Tax-Free Childcare works for different family situations and childcare costs
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm">
            2025 Calculations
          </Badge>
        </div>
      </div>

      {/* Key Information */}
      <Alert className="mb-8">
        <FontAwesomeIcon icon={faInfoCircle} />
        <AlertDescription>
          <strong>Remember:</strong> These examples assume families are eligible and use the maximum government contribution available. Your actual savings will depend on your specific childcare costs and usage.
        </AlertDescription>
      </Alert>

      {/* Example Scenarios */}
      <div className="grid gap-8 mb-12">
        {scenarios.map((scenario, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={scenario.icon} className="text-primary text-xl" />
                </div>
                <div>
                  <CardTitle className="text-xl">{scenario.title}</CardTitle>
                  <p className="text-muted-foreground">{scenario.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="grid lg:grid-cols-3 gap-6">

                {/* Family Details */}
                <div>
                  <h3 className="font-semibold mb-3">Family Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Children:</span>
                      <span>{scenario.family.children.length}</span>
                    </div>
                    {scenario.family.children.map((child, childIndex) => (
                      <div key={childIndex} className="flex justify-between text-muted-foreground">
                        <span>Age {child.age}:</span>
                        <span>{child.disabled ? "Disabled child" : "Regular child"}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span>Monthly cost:</span>
                        <span>£{scenario.family.monthlyChildcareCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quarterly cost:</span>
                        <span>£{scenario.family.quarterlyChildcareCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quarterly Calculation */}
                <div>
                  <h3 className="font-semibold mb-3">Quarterly Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>You pay in:</span>
                      <span>£{scenario.calculation.parentPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Government adds:</span>
                      <span>£{scenario.calculation.governmentTopUp.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total available:</span>
                      <span>£{scenario.calculation.total.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Quarterly limit:</span>
                        <span>£{scenario.calculation.quarterlyLimit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Remaining allowance:</span>
                        <span>£{scenario.calculation.remainingAllowance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Annual Summary */}
                <div>
                  <h3 className="font-semibold mb-3">Annual Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total childcare cost:</span>
                      <span>£{scenario.annual.totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>You pay:</span>
                      <span>£{scenario.annual.parentPays.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Government contributes:</span>
                      <span>£{scenario.annual.governmentContributes.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg text-green-600">
                      <span>Your annual saving:</span>
                      <span>£{scenario.annual.savings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Breakdown */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-3">Payment Breakdown</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 flex items-center justify-center text-white text-xs"
                        style={{ width: `${(scenario.calculation.parentPayment / scenario.calculation.total) * 100}%` }}
                      >
                        You pay: {Math.round((scenario.calculation.parentPayment / scenario.calculation.total) * 100)}%
                      </div>
                      <div
                        className="h-full bg-green-500 flex items-center justify-center text-white text-xs"
                        style={{ width: `${(scenario.calculation.governmentTopUp / scenario.calculation.total) * 100}%` }}
                      >
                        Gov: {Math.round((scenario.calculation.governmentTopUp / scenario.calculation.total) * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Scenario</th>
                  <th className="text-left p-3">Monthly Cost</th>
                  <th className="text-left p-3">You Pay (Quarterly)</th>
                  <th className="text-left p-3">Gov Adds (Quarterly)</th>
                  <th className="text-left p-3">Annual Saving</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((scenario, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 font-medium">{scenario.title}</td>
                    <td className="p-3">£{scenario.family.monthlyChildcareCost.toLocaleString()}</td>
                    <td className="p-3">£{scenario.calculation.parentPayment.toLocaleString()}</td>
                    <td className="p-3 text-green-600">£{scenario.calculation.governmentTopUp.toLocaleString()}</td>
                    <td className="p-3 font-semibold text-green-600">£{scenario.annual.savings.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Quarterly Limits</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Regular child: £500 government top-up per quarter</li>
                <li>• Disabled child: £1,000 government top-up per quarter</li>
                <li>• Limits reset every 3 months</li>
                <li>• Unused allowance doesn't roll over</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Eligibility Requirements</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Earn £183+ per week and under £100,000 per year</li>
                <li>• Both partners must qualify (if applicable)</li>
                <li>• Reconfirm eligibility every 3 months</li>
                <li>• Childcare provider must be registered</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold font-public-sans">Calculate Your Own Savings</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every family's situation is different. Use our free calculator to see exactly how much you could save with Tax-Free Childcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="text-white">
                  <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                  Try Our Calculator
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

export default ExamplesPage