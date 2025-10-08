import { Metadata } from 'next'
import { SupportClient } from './SupportClient'

export const metadata: Metadata = {
  title: 'Support & Help | TFC Calculator - Tax-Free Childcare Support',
  description: 'Get help with TFC Calculator app and Tax-Free Childcare questions. Contact support for technical issues, account help, and childcare calculation assistance.',
  keywords: [
    'TFC Calculator support',
    'Tax-Free Childcare help',
    'childcare calculator support',
    'technical support',
    'app help',
    'contact support'
  ],
  openGraph: {
    title: 'Support & Help | TFC Calculator',
    description: 'Get help with TFC Calculator and Tax-Free Childcare questions. Technical support and guidance available.',
    type: 'website',
    url: 'https://tfccalculator.com/support',
  },
  alternates: {
    canonical: 'https://tfccalculator.com/support'
  }
}

export default function SupportPage() {
  return <SupportClient />
}