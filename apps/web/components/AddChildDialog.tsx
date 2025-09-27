"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBaby } from "@fortawesome/pro-solid-svg-icons"

type Child = {
  name?: string
  dateOfBirth: string
  reconfirmationDate: string
  quarterlyTopUpReceived: number
}

type AddChildDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddChild: (child: Child) => void
}

const AddChildDialog = ({ open, onOpenChange, onAddChild }: AddChildDialogProps) => {
  const [name, setName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [reconfirmationDate, setReconfirmationDate] = useState("")
  const [quarterlyTopUpReceived, setQuarterlyTopUpReceived] = useState("0")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!dateOfBirth || !reconfirmationDate) {
      return
    }

    onAddChild({
      name: name.trim() || undefined,
      dateOfBirth,
      reconfirmationDate,
      quarterlyTopUpReceived: Number.parseFloat(quarterlyTopUpReceived) || 0,
    })

    // Reset form
    setName("")
    setDateOfBirth("")
    setReconfirmationDate("")
    setQuarterlyTopUpReceived("0")
    onOpenChange(false)
  }

  const handleCancel = () => {
    setName("")
    setDateOfBirth("")
    setReconfirmationDate("")
    setQuarterlyTopUpReceived("0")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FontAwesomeIcon icon={faBaby} size="sm" className="text-primary" />
            </div>
            <div>
              <DialogTitle>Add Child</DialogTitle>
              <DialogDescription>Add a child to calculate their Tax-Free Childcare contributions</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="child-name">Child's Name (Optional)</Label>
            <Input
              id="child-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter child's name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-of-birth">Date of Birth *</Label>
            <Input
              id="date-of-birth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Used for age calculation and sorting</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reconfirmation-date">Last HMRC Reconfirmation Date *</Label>
            <Input
              id="reconfirmation-date"
              type="date"
              value={reconfirmationDate}
              onChange={(e) => setReconfirmationDate(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">This determines your 3-month top-up cycle</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quarterly-top-up">Government Top-Up Received This Quarter</Label>
            <Input
              id="quarterly-top-up"
              type="number"
              step="0.01"
              min="0"
              max="500"
              value={quarterlyTopUpReceived}
              onChange={(e) => setQuarterlyTopUpReceived(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Enter £0.00 if starting fresh this quarter</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Child
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { AddChildDialog }
