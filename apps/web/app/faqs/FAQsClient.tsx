"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { trackEvent } from "@/lib/analytics"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp, faQuestion, faCalculator, faArrowRight } from "@fortawesome/pro-solid-svg-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { AdBanner } from "@/components/AdBanner"

type FAQ = {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    question: "How much does the government add to Tax-Free Childcare?",
    answer: "The government adds 20% to what you pay into your Tax-Free Childcare account. For every £4 you pay in, the government adds £1. This means if you pay £400, you'll have £500 total to spend on childcare.",
    category: "Payments"
  },
  {
    question: "What is the maximum Tax-Free Childcare top-up per quarter?",
    answer: "The maximum government top-up is £500 per child per quarter for children under 12, or £1,000 per quarter for disabled children under 17. This means you can pay in up to £2,000 per quarter (£2,500 for disabled children) to get the maximum top-up.",
    category: "Limits"
  },
  {
    question: "Who is eligible for Tax-Free Childcare?",
    answer: "You're eligible if you earn at least £183 per week (£9,518 annually) and less than £100,000 per year, are employed or self-employed, and have children under 12 (or under 17 with disabilities). If you have a partner, you both need to meet these requirements.",
    category: "Eligibility"
  },
  {
    question: "How often do I need to reconfirm my Tax-Free Childcare eligibility?",
    answer: "You must reconfirm your eligibility every 3 months. This involves updating your employment status, income, and family circumstances. Missing your reconfirmation deadline will stop government top-ups until you update your details.",
    category: "Reconfirmation"
  },
  {
    question: "Can I use Tax-Free Childcare with Universal Credit?",
    answer: "No, you cannot claim Tax-Free Childcare if you receive Universal Credit with the childcare costs element. You must choose between the two schemes - they cannot be used together.",
    category: "Eligibility"
  },
  {
    question: "What childcare providers accept Tax-Free Childcare?",
    answer: "Most registered childcare providers accept Tax-Free Childcare, including nurseries, childminders, after-school clubs, and holiday clubs. The provider must be registered with Ofsted (in England) or equivalent bodies in other UK nations and signed up to the Tax-Free Childcare scheme.",
    category: "Providers"
  },
  {
    question: "When do Tax-Free Childcare quarters start and end?",
    answer: "Tax-Free Childcare quarters run from: January-March, April-June, July-September, and October-December. Your quarterly limits reset at the start of each quarter, and unused allowance doesn't carry over to the next quarter.",
    category: "Limits"
  },
  {
    question: "Can self-employed parents claim Tax-Free Childcare?",
    answer: "Yes, self-employed parents can claim Tax-Free Childcare if they expect to earn at least £183 per week on average. You'll need to provide evidence of your expected earnings when applying and during reconfirmation.",
    category: "Eligibility"
  },
  {
    question: "What happens if I forget to reconfirm my Tax-Free Childcare?",
    answer: "If you miss your reconfirmation deadline, government top-ups will stop immediately. You can still use any money already in your account, but no new top-ups will be added until you complete reconfirmation and are approved again.",
    category: "Reconfirmation"
  },
  {
    question: "How long does it take for Tax-Free Childcare payments to reach providers?",
    answer: "Payments to childcare providers typically arrive within 24-48 hours of being sent from your Tax-Free Childcare account. Some providers may take longer to process the payment on their end.",
    category: "Payments"
  },
  {
    question: "Can I get Tax-Free Childcare for children over 12?",
    answer: "Children must be under 12 to qualify for Tax-Free Childcare, except for disabled children who can qualify until they turn 17. Once a child reaches the age limit, they are no longer eligible for the scheme.",
    category: "Eligibility"
  },
  {
    question: "How does Tax-Free Childcare work with 30 hours free childcare?",
    answer: "Tax-Free Childcare and 30 hours free childcare can be used together. The 30 hours covers some of your childcare costs for free, and you can use Tax-Free Childcare to help pay for additional hours or costs not covered by the free entitlement.",
    category: "Other Schemes"
  }
]

const categories = ["All", "Payments", "Eligibility", "Limits", "Reconfirmation", "Providers", "Other Schemes"]

export const FAQsClient = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [openItems, setOpenItems] = useState<number[]>([])

  const filteredFAQs = selectedCategory === "All"
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory)

  // Track page view on mount
  useEffect(() => {
    trackEvent("faq_page_viewed", {
      page: "/faqs"
    })
  }, [])

  const toggleItem = (index: number) => {
    const isOpening = !openItems.includes(index)
    const faq = filteredFAQs[index]

    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )

    // Track FAQ interaction
    if (faq) {
      trackEvent(isOpening ? "faq_question_opened" : "faq_question_closed", {
        faq_question: faq.question,
        faq_category: faq.category,
        faq_question_index: index,
        page: "/faqs"
      })
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    trackEvent("faq_category_selected", {
      faq_category: category,
      page: "/faqs"
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-public-sans">
          Tax-Free Childcare FAQs
        </h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Quick answers to the most common questions about the UK government's Tax-Free Childcare scheme
        </p>
      </div>

      {/* Category Filter */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={selectedCategory === category ? "text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Top Ad */}
      <AdBanner placement="faq-section" size="responsive" />

      {/* FAQ Items */}
      <div className="space-y-4 mb-12">
        {filteredFAQs.map((faq, index) => (
          <div key={index}>
            {/* Add ad every 4 FAQs */}
            {index > 0 && index % 4 === 0 && (
              <div className="mb-4">
                <AdBanner placement="faq-section" size="banner" />
              </div>
            )}
            <Card className="overflow-hidden">
            <Collapsible
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3 text-left">
                      <FontAwesomeIcon
                        icon={faQuestion}
                        className="text-primary mt-1 flex-shrink-0"
                        size="sm"
                      />
                      <CardTitle className="text-lg font-semibold">
                        {faq.question}
                      </CardTitle>
                    </div>
                    <FontAwesomeIcon
                      icon={openItems.includes(index) ? faChevronUp : faChevronDown}
                      className="text-muted-foreground flex-shrink-0 ml-4"
                    />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="pl-8">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="mt-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
            </Card>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Calculate Your Savings</h3>
              <p className="text-sm text-muted-foreground mb-3">
                See how much the government will add to your childcare costs
              </p>
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => trackEvent("faq_help_link_clicked", {
                    help_link_type: "calculator",
                    page: "/faqs"
                  })}
                >
                  <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                  Use Calculator
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <h3 className="font-semibold mb-2">Check Eligibility</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Find out if you qualify for Tax-Free Childcare
              </p>
              <Link href="/eligibility">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => trackEvent("faq_help_link_clicked", {
                    help_link_type: "eligibility",
                    page: "/faqs"
                  })}
                >
                  Check Eligibility
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <h3 className="font-semibold mb-2">Official Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get help from the government's official helpline
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="https://www.childcarechoices.gov.uk" target="_blank" rel="noopener noreferrer">
                  Gov.UK Support
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </div>
  )
}