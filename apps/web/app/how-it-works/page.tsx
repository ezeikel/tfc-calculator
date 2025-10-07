import { Metadata } from "next"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircle1,
  faCircle2,
  faCircle3,
  faCircle4,
  faCalculator,
  faArrowRight,
  faMoneyBillWave,
  faCalendarAlt,
  faRefresh,
  faCreditCard,
  faInfoCircle,
  faCheck
} from "@fortawesome/pro-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "How Tax-Free Childcare Works - Complete Guide 2025 | TFC Calculator",
  description: "Learn how Tax-Free Childcare works step-by-step. Understand the 20% government top-up, quarterly caps, reconfirmation cycles, and payment process. Complete guide for UK parents.",
  keywords: "how tax-free childcare works, 20% government top-up explained, childcare payment help UK, tax free childcare guide, quarterly caps, reconfirmation"
}

const HowItWorksPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-public-sans">
          How Tax-Free Childcare Works
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Understanding the government's 20% childcare contribution scheme - from application to payment
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm">
            Complete Guide 2025
          </Badge>
        </div>
      </div>

      {/* Quick Overview */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold font-public-sans">The Simple Explanation</h2>
            <p className="text-lg">
              For every <strong>£4 you pay in</strong>, the government adds <strong>£1</strong> to your childcare account
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">£400</div>
                <div className="text-sm text-muted-foreground">You pay</div>
              </div>
              <div className="text-center">
                <FontAwesomeIcon icon={faArrowRight} className="text-primary text-xl" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">£500</div>
                <div className="text-sm text-muted-foreground">Total available (£100 government top-up)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step by Step Process */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How It Works: Step-by-Step</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  <FontAwesomeIcon icon={faCircle1} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Apply for Tax-Free Childcare</h3>
                <p className="text-muted-foreground mb-3">
                  Apply online through the government's Childcare Choices website. You'll need to confirm your eligibility and provide basic information about your family and income.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check eligibility requirements</li>
                  <li>• Provide employment and income details</li>
                  <li>• Add your children's information</li>
                  <li>• Verify your identity</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  <FontAwesomeIcon icon={faCircle2} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Get Your Childcare Account</h3>
                <p className="text-muted-foreground mb-3">
                  Once approved, you'll receive your online childcare account. This is where you'll manage payments, view top-ups, and pay your childcare providers.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Secure online account access</li>
                  <li>• Add approved childcare providers</li>
                  <li>• Set up payment preferences</li>
                  <li>• View your quarterly allowance</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  <FontAwesomeIcon icon={faCircle3} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Pay Into Your Account</h3>
                <p className="text-muted-foreground mb-3">
                  Add money to your childcare account using a debit card. The government automatically adds 20% on top of what you pay in.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                  <div className="text-sm">
                    <strong>Example:</strong> Pay in £400 → Government adds £100 → You have £500 to spend
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  <FontAwesomeIcon icon={faCircle4} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Pay Your Childcare Provider</h3>
                <p className="text-muted-foreground mb-3">
                  Use the money in your account to pay approved childcare providers directly. Payments are made electronically through the government system.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Select your childcare provider</li>
                  <li>• Enter the payment amount</li>
                  <li>• Confirm and send payment</li>
                  <li>• Provider receives payment within 24-48 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quarterly System */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarAlt} />
            Quarterly System Explained
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Quarterly Limits</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Regular child (under 12)</span>
                  <Badge>£500 per quarter</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Disabled child (under 17)</span>
                  <Badge>£1,000 per quarter</Badge>
                </div>
              </div>
              <Alert className="mt-4">
                <FontAwesomeIcon icon={faInfoCircle} />
                <AlertDescription>
                  These limits reset every 3 months. Unused allowance doesn't roll over to the next quarter.
                </AlertDescription>
              </Alert>
            </div>

            <div>
              <h3 className="font-semibold mb-3">2025 Quarter Dates</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Q1 2025:</span>
                  <span>1 Jan - 31 Mar</span>
                </div>
                <div className="flex justify-between">
                  <span>Q2 2025:</span>
                  <span>1 Apr - 30 Jun</span>
                </div>
                <div className="flex justify-between">
                  <span>Q3 2025:</span>
                  <span>1 Jul - 30 Sep</span>
                </div>
                <div className="flex justify-between">
                  <span>Q4 2025:</span>
                  <span>1 Oct - 31 Dec</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reconfirmation Process */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faRefresh} />
            Reconfirmation Every 3 Months
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You must reconfirm your eligibility every 3 months to continue receiving government top-ups. Here's what you need to know:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">What to Update</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Employment status changes</li>
                  <li>• Income changes</li>
                  <li>• Benefit claims</li>
                  <li>• Family circumstances</li>
                  <li>• Contact details</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Important Deadlines</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Reconfirm within deadline to avoid suspension</li>
                  <li>• Late reconfirmation may delay top-ups</li>
                  <li>• Set reminders for your reconfirmation date</li>
                  <li>• Check your account regularly for updates</li>
                </ul>
              </div>
            </div>

            <Alert>
              <FontAwesomeIcon icon={faRefresh} />
              <AlertDescription>
                Missing your reconfirmation deadline will stop government top-ups until you update your details.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Payment Flow Diagram */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Payment Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <FontAwesomeIcon icon={faCreditCard} className="text-blue-600 text-xl" />
                </div>
                <h4 className="font-semibold">You Pay In</h4>
                <p className="text-sm text-muted-foreground">Add money via debit card</p>
              </div>

              <div className="space-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-green-600 text-xl" />
                </div>
                <h4 className="font-semibold">Gov Adds 20%</h4>
                <p className="text-sm text-muted-foreground">Automatic top-up</p>
              </div>

              <div className="space-y-2">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <FontAwesomeIcon icon={faCalculator} className="text-purple-600 text-xl" />
                </div>
                <h4 className="font-semibold">Account Balance</h4>
                <p className="text-sm text-muted-foreground">Combined total available</p>
              </div>

              <div className="space-y-2">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <FontAwesomeIcon icon={faCheck} className="text-orange-600 text-xl" />
                </div>
                <h4 className="font-semibold">Pay Provider</h4>
                <p className="text-sm text-muted-foreground">Direct to childcare provider</p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Example Monthly Childcare Costs</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monthly nursery fees:</span>
                  <span>£1,600</span>
                </div>
                <div className="flex justify-between">
                  <span>You pay into account:</span>
                  <span>£1,280</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Government adds:</span>
                  <span>£320</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total available:</span>
                  <span>£1,600</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Differences */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tax-Free Childcare vs Other Schemes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Feature</th>
                  <th className="text-left p-3">Tax-Free Childcare</th>
                  <th className="text-left p-3">Childcare Vouchers</th>
                  <th className="text-left p-3">Universal Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">Government contribution</td>
                  <td className="p-3 text-green-600">20% top-up</td>
                  <td className="p-3 text-yellow-600">Tax/NI savings</td>
                  <td className="p-3 text-blue-600">Up to 85% of costs</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Maximum support</td>
                  <td className="p-3">£500/quarter per child</td>
                  <td className="p-3">£243/month</td>
                  <td className="p-3">£951/month</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Available to</td>
                  <td className="p-3">New applicants</td>
                  <td className="p-3 text-red-600">Closed to new applicants</td>
                  <td className="p-3">Low income families</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Income limit</td>
                  <td className="p-3">£100K per parent</td>
                  <td className="p-3">No upper limit</td>
                  <td className="p-3">Low income only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold font-public-sans">Ready to Calculate Your Savings?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use our free calculator to see exactly how much the government will contribute to your childcare costs each quarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="text-white">
                  <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                  Calculate My Savings
                </Button>
              </Link>
              <Link href="/eligibility">
                <Button variant="outline" size="lg">
                  Check Eligibility First
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

export default HowItWorksPage