import { Metadata } from "next"
import { EligibilityClient } from "./EligibilityClient"

export const metadata: Metadata = {
  title: "Tax-Free Childcare Eligibility Checker 2025 - Am I Eligible? | TFC Calculator",
  description: "Check if you qualify for Tax-Free Childcare with our simple eligibility guide. Find out income limits, age requirements, and qualifying benefits. Get instant answers about your eligibility.",
  keywords: "tax free childcare eligibility, am I eligible, tax-free childcare qualification, childcare scheme eligibility UK, tax free childcare income limits"
}

const EligibilityPage = () => {
  return <EligibilityClient />
}

export default EligibilityPage