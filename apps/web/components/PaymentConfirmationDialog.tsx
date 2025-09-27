"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPoundSign, faCalendar, faReceipt } from "@fortawesome/pro-solid-svg-icons"

type Payment = {
  id: string
  childId: string
  amount: number
  parentPaid?: number
  date: string
  description?: string
  governmentTopUp: number
}

type PaymentConfirmationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  childId: string
  childName?: string
  onConfirmPayment: (payment: Omit<Payment, "id">) => void
  suggestedAmount?: number
  suggestedTopUp?: number
}

const PaymentConfirmationDialog = ({
  open,
  onOpenChange,
  childId,
  childName,
  onConfirmPayment,
  suggestedAmount = 0,
  suggestedTopUp = 0,
}: PaymentConfirmationDialogProps) => {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0] || "")
  const [description, setDescription] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (suggestedAmount <= 0) return

    onConfirmPayment({
      childId,
      amount: suggestedAmount,
      date,
      description: description.trim() || undefined,
      governmentTopUp: suggestedTopUp,
    })

    // Reset form
    setDate(new Date().toISOString().split("T")[0] || "")
    setDescription("")
    onOpenChange(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Reset form when opening
      setDate(new Date().toISOString().split("T")[0] || "")
      setDescription("")
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FontAwesomeIcon icon={faReceipt} size="lg" />
            Confirm Payment
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Record a payment made for {childName || "this child"}'s childcare
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Amount You Pay</Label>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPoundSign} size="sm" className="text-muted-foreground" />
                <span className="font-bold text-lg">£{suggestedAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Government Top-Up</Label>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPoundSign} size="sm" className="text-muted-foreground" />
                <span className="font-bold text-lg">£{suggestedTopUp.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-date">Payment Date</Label>
            <div className="relative">
              <FontAwesomeIcon icon={faCalendar} size="sm" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="payment-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-description">Description (Optional)</Label>
            <Textarea
              id="payment-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Weekly nursery payment, Holiday club"
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Confirm Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { PaymentConfirmationDialog }
export type { Payment }
