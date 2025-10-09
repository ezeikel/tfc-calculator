"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle, faBaby, faPlus } from "@fortawesome/pro-solid-svg-icons"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChildCalculator } from "@/components/ChildCalculator"
import { AddChildDialog } from "@/components/AddChildDialog"
import { AdBanner } from "@/components/AdBanner"
import { useTheme } from "@/hooks/useTheme"
import { trackEvent, getChildAnalyticsProperties } from "@/lib/analytics"
import type { Payment } from "@/components/PaymentConfirmationDialog"

type Child = {
  id: string
  name?: string
  dateOfBirth: string
  reconfirmationDate: string
  quarterlyTopUpReceived: number
}

const TaxFreeChildcareCalculator = () => {
  const { isDark } = useTheme()
  const [children, setChildren] = useState<Child[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [isAddChildOpen, setIsAddChildOpen] = useState(false)

  useEffect(() => {
    try {
      const savedChildren = localStorage.getItem("tfc-children")
      const savedPayments = localStorage.getItem("tfc-payments")

      if (savedChildren) {
        setChildren(JSON.parse(savedChildren))
      } else {
        const sampleChild: Child = {
          id: "sample-child-1",
          name: "Emma",
          dateOfBirth: "2020-03-15",
          reconfirmationDate: "2025-01-01",
          quarterlyTopUpReceived: 160,
        }
        setChildren([sampleChild])
      }

      if (savedPayments) {
        setPayments(JSON.parse(savedPayments))
      } else {
        const currentDate = new Date()
        const samplePayments: Payment[] = [
          {
            id: "sample-payment-1",
            childId: "sample-child-1",
            amount: 400,
            parentPaid: 320,
            governmentTopUp: 80,
            date: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            description: "Weekly nursery fees",
          },
          {
            id: "sample-payment-2",
            childId: "sample-child-1",
            amount: 400,
            parentPaid: 320,
            governmentTopUp: 80,
            date: new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
            description: "Weekly nursery fees",
          },
        ]
        setPayments(samplePayments)
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("tfc-children", JSON.stringify(children))
    } catch (error) {
      console.error("Error saving children to localStorage:", error)
    }
  }, [children])

  useEffect(() => {
    try {
      localStorage.setItem("tfc-payments", JSON.stringify(payments))
    } catch (error) {
      console.error("Error saving payments to localStorage:", error)
    }
  }, [payments])

  const addChild = (child: Omit<Child, "id">) => {
    const newChild: Child = {
      ...child,
      id: crypto.randomUUID(),
    }
    setChildren([...children, newChild])

    // Track child addition
    trackEvent("child_added", {
      ...getChildAnalyticsProperties([...children, newChild]),
      has_child_name: !!(child.name && child.name.trim().length > 0)
    })
  }

  const updateChild = (id: string, updates: Partial<Child>) => {
    setChildren(children.map((child) => (child.id === id ? { ...child, ...updates } : child)))
  }

  const removeChild = (id: string) => {
    const remainingChildren = children.filter((child) => child.id !== id)
    setChildren(remainingChildren)
    setPayments(payments.filter((payment) => payment.childId !== id))

    // Track child removal
    trackEvent("child_removed", {
      ...getChildAnalyticsProperties(remainingChildren)
    })
  }

  const addPayment = (payment: Omit<Payment, "id">) => {
    const newPayment: Payment = {
      ...payment,
      id: crypto.randomUUID(),
    }
    setPayments([...payments, newPayment])

    // Track payment addition
    trackEvent("payment_added", {
      payment_amount: payment.amount,
      government_topup: payment.governmentTopUp,
      payment_description_provided: !!(payment.description && payment.description.trim().length > 0)
    })
  }

  const removePayment = (paymentId: string) => {
    const payment = payments.find((p) => p.id === paymentId)
    if (payment) {
      // Update child's quarterly top-up received
      const child = children.find((c) => c.id === payment.childId)
      if (child) {
        const remainingPayments = payments.filter((p) => p.id !== paymentId && p.childId === payment.childId)
        const newTopUpTotal = remainingPayments.reduce((sum, p) => sum + p.governmentTopUp, 0)
        updateChild(child.id, { quarterlyTopUpReceived: newTopUpTotal })
      }
    }
    setPayments(payments.filter((payment) => payment.id !== paymentId))

    // Track payment removal
    if (payment) {
      trackEvent("payment_removed", {
        payment_amount: payment.amount,
        government_topup: payment.governmentTopUp
      })
    }
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">

        {/* Description */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faInfoCircle} size="lg" className="text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm text-pretty leading-relaxed font-source-sans">
                  Add your childcare costs and we&apos;ll show how much you need to pay into your Tax-Free Childcare account
                  — and how much the government will top up, based on your current usage this quarter.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    20% government contribution
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    £500 quarterly limit per child
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    3-month cycles
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Payment tracking
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Homepage Ad */}
        <AdBanner placement="homepage-top" size="responsive" />

        {/* Children List */}
        {children.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-muted rounded-full">
                  <FontAwesomeIcon icon={faBaby} size="2x" className="text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold font-public-sans">No children added yet</h3>
                  <p className="text-muted-foreground text-sm max-w-md text-pretty">
                    Add your first child to start calculating government contributions for your childcare costs.
                  </p>
                </div>
                <Button onClick={() => {
                  setIsAddChildOpen(true)
                  trackEvent("add_child_dialog_opened", { button_location: "empty_state" })
                }} className="mt-2">
                  <FontAwesomeIcon icon={faPlus} size="sm" className="mr-2" />
                  Add Your First Child
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {children.map((child) => (
              <ChildCalculator
                key={child.id}
                child={child}
                onUpdate={(updates) => updateChild(child.id, updates)}
                onRemove={() => removeChild(child.id)}
                payments={payments}
                onAddPayment={addPayment}
                onRemovePayment={removePayment}
              />
            ))}

            <Card className="border-dashed">
              <CardContent className="pt-6">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsAddChildOpen(true)
                    trackEvent("add_child_dialog_opened", { button_location: "add_another" })
                  }}
                  className="w-full h-16 text-muted-foreground hover:text-foreground"
                >
                  <FontAwesomeIcon icon={faPlus} size="lg" className="mr-2" />
                  Add Another Child
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bottom Homepage Ad */}
        <AdBanner placement="homepage-bottom" size="banner" />

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center">
          <div className="mb-8">
            <h3 className="text-lg font-semibold font-public-sans mb-4">Get the Mobile App</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
              Take your Tax-Free Childcare calculations on the go with our mobile app
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                onClick={() => trackEvent("play_store_clicked", { theme: isDark ? "dark" : "light" })}
              >
                <Image
                  src={isDark ? "/play-store-dark.svg" : "/play-store-light.svg"}
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>

              <a
                href="#"
                className="hover:opacity-80 transition-opacity"
                onClick={() => trackEvent("app_store_clicked", { theme: isDark ? "dark" : "light" })}
              >
                <Image
                  src={isDark ? "/app-store-dark.svg" : "/app-store-light.svg"}
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>

        </div>

        <AddChildDialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen} onAddChild={addChild} />
      </div>
    </div>
  )
}

export default TaxFreeChildcareCalculator
