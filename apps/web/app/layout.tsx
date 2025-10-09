import type React from "react"
import type { Metadata } from "next"
import { Public_Sans, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { config } from "@fortawesome/fontawesome-svg-core"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CookieConsent from "@/components/CookieConsent"
import CookieScriptLoader from "@/components/CookieScriptLoader"

config.autoAddCss = false;

const publicSans = Public_Sans({
  subsets: ["latin"] as const,
  variable: "--font-public-sans",
  display: "swap",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"] as const,
  variable: "--font-source-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Tax-Free Childcare Calculator 2025 – See Your 20% Government Top-Up Instantly",
  description: "Use our free UK Tax-Free Childcare Calculator to see how much the government will top up your childcare costs by 20%. Get instant results, payment breakdowns, and quarterly contribution limits – perfect for parents using the Tax-Free Childcare scheme in 2025.",
  keywords: "tax free childcare calculator, tax-free childcare uk, childcare top-up calculator, government childcare support, childcare costs calculator, uk childcare scheme, childcare savings, tax-free childcare account calculator, 20 percent childcare contribution",
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
    title: "Free Tax-Free Childcare Calculator 2025 | Check Your 20% Government Top-Up",
    description: "Find out how much you’ll get from the UK government’s Tax-Free Childcare scheme. See your top-up instantly with our free calculator and save on childcare costs.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Free UK Tax-Free Childcare Calculator - 20% Government Top-Up Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tfccalculator",
    creator: "@tfccalculator",
    title: "Tax-Free Childcare Calculator 2025 | See Your 20% Government Top-Up Instantly",
    description: "Quickly calculate how much the UK government adds to your childcare payments with our free Tax-Free Childcare Calculator.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://tfccalculator.co.uk",
  },
  category: "finance",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Consent Mode - Must be loaded before AdSense */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Default consent settings (denied until user consents)
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted'
            });
          `}
        </Script>

        {/* CookieScript - Hidden backend for compliance */}
        <CookieScriptLoader />

        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`font-source-sans ${publicSans.variable} ${sourceSans.variable}`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Suspense>{children}</Suspense>
          </main>
          <Footer />
        </div>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  )
}
