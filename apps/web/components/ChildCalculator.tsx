"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalculator, faCalendar, faPoundSign, faExclamationCircle, faTrash, faPen, faReceipt, faClockRotateLeft } from "@fortawesome/pro-solid-svg-icons"
import { trackEvent } from "@/lib/analytics"
import { PaymentConfirmationDialog, type Payment } from "./PaymentConfirmationDialog"
import { PaymentHistory } from "./PaymentHistory"

type Child = {
  id: string
  name?: string
  dateOfBirth: string
  reconfirmationDate: string
  quarterlyTopUpReceived: number
}

type ChildCalculatorProps = {
  child: Child
  onUpdate: (updates: Partial<Child>) => void
  onRemove: () => void
  payments: Payment[]
  onAddPayment: (payment: Omit<Payment, "id">) => void
  onRemovePayment: (paymentId: string) => void
}

const ChildCalculator = ({
  child,
  onUpdate,
  onRemove,
  payments,
  onAddPayment,
  onRemovePayment,
}: ChildCalculatorProps) => {
  const [childcareCost, setChildcareCost] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(child.name || "")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showPaymentHistory, setShowPaymentHistory] = useState(false)

  const childPayments = payments.filter((payment) => payment.childId === child.id)

  // Calculate child's age for display
  const getChildAge = () => {
    const today = new Date()
    const birthDate = new Date(child.dateOfBirth)
    const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth())

    if (ageInMonths < 12) {
      return `${ageInMonths} months`
    } else {
      const years = Math.floor(ageInMonths / 12)
      const months = ageInMonths % 12
      return months > 0 ? `${years}y ${months}m` : `${years} years`
    }
  }

  // Calculate days remaining in current quarter
  const getDaysRemainingInQuarter = () => {
    const today = new Date()
    const reconfirmDate = new Date(child.reconfirmationDate)

    // Calculate the end of current quarter (3 months from reconfirmation)
    const quarterEnd = new Date(reconfirmDate)
    quarterEnd.setMonth(quarterEnd.getMonth() + 3)

    // If we're past the quarter end, calculate next quarter
    if (today > quarterEnd) {
      const monthsPassed = Math.floor((today.getTime() - reconfirmDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44))
      const quartersCompleted = Math.floor(monthsPassed / 3)
      const nextQuarterEnd = new Date(reconfirmDate)
      nextQuarterEnd.setMonth(nextQuarterEnd.getMonth() + (quartersCompleted + 1) * 3)

      const timeDiff = nextQuarterEnd.getTime() - today.getTime()
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    }

    const timeDiff = quarterEnd.getTime() - today.getTime()
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  }

  const calculateContribution = () => {
    const cost = Number.parseFloat(childcareCost) || 0
    const maxQuarterlyTopUp = 500

    // Calculate total top-up used from confirmed payments in current quarter
    const confirmedTopUpThisQuarter = childPayments.reduce((sum, payment) => sum + payment.governmentTopUp, 0)
    const remainingTopUp = maxQuarterlyTopUp - confirmedTopUpThisQuarter

    // Calculate 20% of the cost
    const potentialTopUp = cost * 0.2

    // The actual top-up is the minimum of potential top-up and remaining allowance
    const actualTopUp = Math.min(potentialTopUp, remainingTopUp)

    // Amount user needs to pay (cost minus government contribution)
    const userPayment = cost - actualTopUp

    return {
      userPayment: Math.max(0, userPayment),
      governmentTopUp: actualTopUp,
      remainingThisQuarter: remainingTopUp - actualTopUp,
      isAtLimit: remainingTopUp <= 0,
      exceedsLimit: potentialTopUp > remainingTopUp,
      confirmedTopUpUsed: confirmedTopUpThisQuarter,
    }
  }

  const calculation = calculateContribution()
  const daysRemaining = getDaysRemainingInQuarter()
  const progressPercentage = (calculation.confirmedTopUpUsed / 500) * 100

  // Track quarterly limit events
  useEffect(() => {
    if (calculation.isAtLimit) {
      trackEvent("quarterly_limit_reached", {
        total_quarterly_received: calculation.confirmedTopUpUsed,
        child_count: 1
      })
    } else if (calculation.exceedsLimit) {
      trackEvent("quarterly_limit_warning", {
        total_quarterly_received: calculation.confirmedTopUpUsed,
        quarterly_limit_remaining: calculation.remainingThisQuarter,
        childcare_cost: parseFloat(childcareCost) || 0
      })
    }
  }, [calculation.isAtLimit, calculation.exceedsLimit, calculation.confirmedTopUpUsed, calculation.remainingThisQuarter, childcareCost])

  const handleNameEdit = () => {
    onUpdate({ name: editName.trim() || undefined })
    setIsEditing(false)

    // Track name update
    trackEvent("child_name_updated", {
      has_child_name: !!(editName.trim())
    })
  }

  const handleConfirmPayment = (payment: Omit<Payment, "id">) => {
    onAddPayment(payment)
    // Update the quarterly top-up received to reflect confirmed payments
    const newTopUpTotal = calculation.confirmedTopUpUsed + payment.governmentTopUp
    onUpdate({ quarterlyTopUpReceived: newTopUpTotal })
  }

  return (
    <Card className="relative">
      <CardHeader className="pb-4">
        <div className="space-y-3">
          {/* Child Name and Edit Button */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Child's name (optional)"
                    className="text-lg font-semibold h-8"
                    onBlur={handleNameEdit}
                    onKeyDown={(e) => e.key === "Enter" && handleNameEdit()}
                    autoFocus
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-public-sans">{child.name || "Unnamed Child"}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                  >
                    <FontAwesomeIcon icon={faPen} size="xs" />
                  </Button>
                </div>
              )}
            </div>

            {/* Action Buttons - Always visible on desktop, mobile handles below */}
            <div className="hidden sm:flex items-center gap-2">
              {childPayments.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowPaymentHistory(!showPaymentHistory)
                    if (!showPaymentHistory) {
                      trackEvent("payment_history_viewed")
                    }
                  }}
                  className="h-8 text-xs"
                >
                  <FontAwesomeIcon icon={faClockRotateLeft} size="xs" className="mr-1" />
                  {showPaymentHistory ? "Hide" : "Show"} Payments
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="h-8 text-xs text-destructive hover:text-destructive bg-transparent"
              >
                <FontAwesomeIcon icon={faTrash} size="xs" className="mr-1" />
                Remove
              </Button>
            </div>
          </div>

          {/* Child Info - Stack on mobile, flow on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <Badge variant="outline" className="text-xs">
                {getChildAge()}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <FontAwesomeIcon icon={faCalendar} size="xs" />
                <span className="whitespace-nowrap">{daysRemaining} days left</span>
              </div>
              {childPayments.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {childPayments.length} payment{childPayments.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex sm:hidden items-center gap-2">
              {childPayments.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowPaymentHistory(!showPaymentHistory)
                    if (!showPaymentHistory) {
                      trackEvent("payment_history_viewed")
                    }
                  }}
                  className="h-8 text-xs flex-1"
                >
                  <FontAwesomeIcon icon={faClockRotateLeft} size="xs" className="mr-1" />
                  {showPaymentHistory ? "Hide Payments" : "Show Payments"}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="h-8 text-xs text-destructive hover:text-destructive bg-transparent flex-1"
              >
                <FontAwesomeIcon icon={faTrash} size="xs" className="mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quarter Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Government top-up used this quarter</span>
            <span className="font-medium">£{calculation.confirmedTopUpUsed.toFixed(2)} / £500.00</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          {calculation.isAtLimit && (
            <div className="flex items-center gap-2 text-xs text-warning">
              <FontAwesomeIcon icon={faExclamationCircle} size="xs" />
              You&apos;ve reached the quarterly limit
            </div>
          )}
        </div>

        {showPaymentHistory && (
          <>
            <Separator />
            <PaymentHistory
              payments={childPayments}
              onRemovePayment={onRemovePayment}
              reconfirmationDate={child.reconfirmationDate}
            />
          </>
        )}

        <Separator />

        {/* Calculator Inputs */}
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor={`childcare-cost-${child.id}`} className="text-sm font-medium">
              Total Childcare Cost
            </Label>
            <div className="relative">
              <FontAwesomeIcon icon={faPoundSign} size="sm" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id={`childcare-cost-${child.id}`}
                type="number"
                step="0.01"
                min="0"
                value={childcareCost}
                onChange={(e) => setChildcareCost(e.target.value)}
                placeholder="0.00"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">Enter the total amount you need to pay for childcare</p>
          </div>
        </div>

        {/* Results */}
        {childcareCost && Number.parseFloat(childcareCost) > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalculator} size="sm" className="text-primary" />
                <h4 className="font-medium font-public-sans">Calculation Results</h4>
              </div>

              <div className="grid grid-cols-3 gap-4 p-6 bg-muted/30 rounded-xl border border-muted">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">You Pay</p>
                  <p className="font-bold text-2xl">£{calculation.userPayment.toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Government Adds</p>
                  <p className="font-bold text-2xl">£{calculation.governmentTopUp.toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Remaining This Quarter</p>
                  <p className="font-bold text-2xl">£{calculation.remainingThisQuarter.toFixed(2)}</p>
                </div>
              </div>

              <Button
                onClick={() => {
                  setShowPaymentDialog(true)

                  // Track calculation and dialog opening
                  trackEvent("childcare_cost_calculated", {
                    childcare_cost: parseFloat(childcareCost) || 0,
                    calculated_parent_payment: calculation.userPayment,
                    calculated_government_topup: calculation.governmentTopUp,
                    is_over_limit: calculation.exceedsLimit,
                    quarterly_limit_remaining: calculation.remainingThisQuarter
                  })
                }}
                className="w-full"
                disabled={calculation.governmentTopUp <= 0}
              >
                <FontAwesomeIcon icon={faReceipt} size="sm" className="mr-2" />
                Confirm This Payment
              </Button>

              {calculation.exceedsLimit && !calculation.isAtLimit && (
                <div className="flex items-start gap-2 p-3 bg-warning/10 rounded-lg">
                  <FontAwesomeIcon icon={faExclamationCircle} size="sm" className="text-warning mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-warning-foreground">
                    <p className="font-medium">Quarterly limit reached</p>
                    <p>You can only receive £{calculation.remainingThisQuarter.toFixed(2)} more this quarter.</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>

      <PaymentConfirmationDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        childId={child.id}
        childName={child.name}
        onConfirmPayment={handleConfirmPayment}
        suggestedAmount={calculation.userPayment}
        suggestedTopUp={calculation.governmentTopUp}
      />
    </Card>
  )
}

export { ChildCalculator }
