import type React from "react"
import type { Metadata } from "next"
import { Public_Sans, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { config } from "@fortawesome/fontawesome-svg-core"
import { Analytics } from "@vercel/analytics/next"

config.autoAddCss = false;

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Tax-Free Childcare Calculator | UK Government 20% Top-Up Calculator 2025",
  description: "Calculate exactly how much the UK government will top up your Tax-Free Childcare account. Get instant results showing your 20% government contribution, quarterly limits, and payment breakdowns. Free tool for parents using TFC scheme.",
  keywords: "tax free childcare calculator, TFC calculator, UK childcare vouchers, government 20% contribution, childcare costs calculator, tax free childcare account, childcare support UK, nursery fees calculator",
  authors: [{ name: "TFC Calculator" }],
  creator: "TFC Calculator",
  publisher: "TFC Calculator",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://tfccalculator.co.uk",
    siteName: "TFC Calculator",
    title: "Tax-Free Childcare Calculator | UK Government 20% Top-Up Calculator 2025",
    description: "Calculate exactly how much the UK government will top up your Tax-Free Childcare account. Get instant results showing your 20% government contribution, quarterly limits, and payment breakdowns.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TFC Calculator - Tax-Free Childcare Calculator for UK Parents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tfccalculator",
    creator: "@tfccalculator",
    title: "Tax-Free Childcare Calculator | UK Government 20% Top-Up Calculator 2025",
    description: "Calculate exactly how much the UK government will top up your Tax-Free Childcare account. Get instant results showing your 20% government contribution.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://tfccalculator.co.uk",
  },
  category: "finance",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-source-sans ${publicSans.variable} ${sourceSans.variable}`}>
        <Suspense>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
