"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChildCalculator } from "@/components/ChildCalculator"
import { AddChildDialog } from "@/components/AddChildDialog"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useTheme } from "@/hooks/useTheme"
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
  }

  const updateChild = (id: string, updates: Partial<Child>) => {
    setChildren(children.map((child) => (child.id === id ? { ...child, ...updates } : child)))
  }

  const removeChild = (id: string) => {
    setChildren(children.filter((child) => child.id !== id))
    setPayments(payments.filter((payment) => payment.childId !== id))
  }

  const addPayment = (payment: Omit<Payment, "id">) => {
    const newPayment: Payment = {
      ...payment,
      id: crypto.randomUUID(),
    }
    setPayments([...payments, newPayment])
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
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <i className="fas fa-calculator fa-lg text-primary"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-balance font-public-sans">TFC Calculator</h1>
              <p className="text-muted-foreground text-sm font-source-sans">
                Calculate government contributions for your childcare costs
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Description */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle fa-lg text-primary mt-0.5 flex-shrink-0"></i>
              <div className="space-y-2">
                <p className="text-sm text-pretty leading-relaxed font-source-sans">
                  Add your childcare costs and we'll show how much you need to pay into your Tax-Free Childcare account
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

        {/* Children List */}
        {children.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-muted rounded-full">
                  <i className="fas fa-baby fa-2x text-muted-foreground"></i>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold font-public-sans">No children added yet</h3>
                  <p className="text-muted-foreground text-sm max-w-md text-pretty">
                    Add your first child to start calculating government contributions for your childcare costs.
                  </p>
                </div>
                <Button onClick={() => setIsAddChildOpen(true)} className="mt-2">
                  <i className="fas fa-plus fa-sm mr-2"></i>
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
                  onClick={() => setIsAddChildOpen(true)}
                  className="w-full h-16 text-muted-foreground hover:text-foreground"
                >
                  <i className="fas fa-plus fa-lg mr-2"></i>
                  Add Another Child
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center">
          <div className="mb-8">
            <h3 className="text-lg font-semibold font-public-sans mb-4">Get the Mobile App</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
              Take your Tax-Free Childcare calculations on the go with our mobile app
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src={isDark ? "/play-store-dark.svg" : "/play-store-light.svg"}
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>

              <a href="#" className="hover:opacity-80 transition-opacity">
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

          <p className="text-xs text-muted-foreground">
            This calculator is for guidance only. Always check with HMRC for official information.
          </p>
        </div>

        <AddChildDialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen} onAddChild={addChild} />
      </div>
    </div>
  )
}

export default TaxFreeChildcareCalculator
