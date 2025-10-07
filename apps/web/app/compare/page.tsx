import { Metadata } from "next"
import { CompareClient } from "./CompareClient"

export const metadata: Metadata = {
  title: "Tax-Free Childcare vs Other Schemes - Complete Comparison 2025 | TFC Calculator",
  description: "Compare Tax-Free Childcare with Universal Credit, Childcare Vouchers, and 30 hours free childcare. See which scheme saves you the most money with our detailed comparison.",
  keywords: "tax free childcare vs universal credit, childcare vouchers comparison, tax-free childcare vs other schemes, best childcare support UK, childcare benefits comparison"
}

const ComparisonPage = () => {
  return <CompareClient />
}

export default ComparisonPage