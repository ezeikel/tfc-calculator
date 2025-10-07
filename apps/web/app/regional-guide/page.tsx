import { Metadata } from 'next'
import { RegionalGuideClient } from './RegionalGuideClient'

export const metadata: Metadata = {
  title: 'Tax-Free Childcare by Region: England, Wales, Scotland & Northern Ireland Guide | TFC Calculator',
  description: 'Complete guide to Tax-Free Childcare differences across England, Wales, Scotland and Northern Ireland. Regional registration bodies, providers, and application processes.',
  keywords: [
    'Tax-Free Childcare England',
    'Tax-Free Childcare Wales',
    'Tax-Free Childcare Scotland',
    'Tax-Free Childcare Northern Ireland',
    'Ofsted registration',
    'Care Inspectorate Wales',
    'Care Inspectorate Scotland',
    'regional childcare differences',
    'UK childcare schemes by region',
    'childcare registration bodies'
  ],
  openGraph: {
    title: 'Tax-Free Childcare Regional Guide - England, Wales, Scotland & Northern Ireland',
    description: 'Understand how Tax-Free Childcare works in your region with our complete guide to differences across all UK nations.',
    type: 'article',
    url: 'https://tfccalculator.com/regional-guide',
  },
  alternates: {
    canonical: 'https://tfccalculator.com/regional-guide'
  }
}

export default function RegionalGuidePage() {
  return <RegionalGuideClient />
}