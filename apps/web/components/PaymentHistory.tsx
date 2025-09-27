"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReceipt, faCalendar, faTrash, faArrowTrendUp } from "@fortawesome/pro-solid-svg-icons"
import type { Payment } from "./PaymentConfirmationDialog"

type PaymentHistoryProps = {
  payments: Payment[]
  onRemovePayment: (paymentId: string) => void
  reconfirmationDate: string // Added reconfirmationDate to filter current quarter payments
}

const PaymentHistory = ({ payments, onRemovePayment, reconfirmationDate }: PaymentHistoryProps) => {
  const getCurrentQuarterPayments = () => {
    const today = new Date()
    const reconfirmDate = new Date(reconfirmationDate)

    // Calculate current quarter boundaries
    const monthsSinceReconfirm = Math.floor((today.getTime() - reconfirmDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44))
    const currentQuarterStart = Math.floor(monthsSinceReconfirm / 3) * 3

    const quarterStartDate = new Date(reconfirmDate)
    quarterStartDate.setMonth(quarterStartDate.getMonth() + currentQuarterStart)

    const quarterEndDate = new Date(quarterStartDate)
    quarterEndDate.setMonth(quarterEndDate.getMonth() + 3)

    return payments.filter((payment) => {
      const paymentDate = new Date(payment.date)
      return paymentDate >= quarterStartDate && paymentDate < quarterEndDate
    })
  }

  const currentQuarterPayments = getCurrentQuarterPayments()

  if (currentQuarterPayments.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-4">
            <FontAwesomeIcon icon={faReceipt} size="2x" className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No payments recorded this quarter</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalPaid = currentQuarterPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const totalTopUp = currentQuarterPayments.reduce((sum, payment) => sum + payment.governmentTopUp, 0)
  const totalChildcareCost = totalPaid + totalTopUp

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-public-sans">
          <FontAwesomeIcon icon={faReceipt} size="sm" />
          Current Quarter Payments
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {currentQuarterPayments.length} payment{currentQuarterPayments.length !== 1 ? "s" : ""} recorded
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 p-6 bg-muted/50 rounded-lg border">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Childcare</p>
            <p className="font-bold text-2xl">£{totalChildcareCost.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">You Paid</p>
            <p className="font-bold text-2xl">£{totalPaid.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">Gov Top-Up</p>
            <p className="font-bold text-2xl">£{totalTopUp.toFixed(2)}</p>
          </div>
        </div>

        {totalChildcareCost > 0 && (
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground bg-muted/30 rounded-lg py-2">
            <FontAwesomeIcon icon={faArrowTrendUp} size="sm" />
            <span>For every £8 you pay, the government adds £2 (20% top-up)</span>
          </div>
        )}

        <Separator />

        {/* Payment List */}
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {currentQuarterPayments
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((payment) => (
              <div key={payment.id} className="flex items-start justify-between p-3 bg-card border rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">£{payment.amount.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground">you</span>
                    </div>
                    {payment.governmentTopUp > 0 && (
                      <>
                        <span className="text-xs text-muted-foreground">+</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-success">
                            £{payment.governmentTopUp.toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground">gov</span>
                        </div>
                        <Badge variant="outline" className="text-xs ml-1">
                          = £{(payment.amount + payment.governmentTopUp).toFixed(2)} total
                        </Badge>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <FontAwesomeIcon icon={faCalendar} size="xs" />
                    {new Date(payment.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: new Date(payment.date).getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
                    })}
                  </div>
                  {payment.description && (
                    <p className="text-xs text-muted-foreground truncate">{payment.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemovePayment(payment.id)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <FontAwesomeIcon icon={faTrash} size="xs" />
                </Button>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}

export { PaymentHistory }
