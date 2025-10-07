import { Metadata } from "next"
import { FAQsClient } from "./FAQsClient"

export const metadata: Metadata = {
  title: "Tax-Free Childcare FAQs - Your Questions Answered 2025 | TFC Calculator",
  description: "Get answers to the most common Tax-Free Childcare questions. Learn about eligibility, payments, reconfirmation, quarterly limits, and more. Quick, accurate answers for UK parents.",
  keywords: "tax free childcare FAQ, childcare questions answered, tax-free childcare help, government childcare scheme questions, TFC support"
}

const FAQsPage = () => {
  return <FAQsClient />
}

export default FAQsPage