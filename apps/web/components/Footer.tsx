'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator,
  faEnvelope,
} from '@fortawesome/pro-solid-svg-icons';
import { faHeart } from '@fortawesome/pro-regular-svg-icons';
import { useTheme } from '@/hooks/useTheme';
import { trackEvent } from '@/lib/analytics';
import { APP_STORE_LINKS, APP_STORE_IMAGES } from '@/lib/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isDark } = useTheme();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FontAwesomeIcon
                  icon={faCalculator}
                  size="lg"
                  className="text-primary"
                />
              </div>
              <div>
                <h3 className="font-bold font-public-sans">TFC Calculator</h3>
                <p className="text-xs text-muted-foreground font-source-sans">
                  Tax-Free Childcare Calculator
                </p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground font-source-sans">
              Calculate your government childcare contributions with our free,
              easy-to-use Tax-Free Childcare calculator.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold font-public-sans">Quick Links</h4>
            <ul className="space-y-2 text-sm font-source-sans">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Support
                </Link>
              </li>
              <li>
                <a
                  href="mailto:tfccalculator@chewybytes.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold font-public-sans">Resources</h4>
            <ul className="space-y-2 text-sm font-source-sans">
              <li>
                <a
                  href="https://www.gov.uk/tax-free-childcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Gov.uk Tax-Free Childcare
                </a>
              </li>
              <li>
                <a
                  href="https://www.childcarechoices.gov.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Childcare Choices
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold font-public-sans">Get in Touch</h4>
            <div className="space-y-3 text-sm font-source-sans">
              <a
                href="mailto:tfccalculator@chewybytes.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                tfccalculator@chewybytes.com
              </a>
            </div>
          </div>

          {/* Mobile App */}
          <div className="space-y-4">
            <h4 className="font-semibold font-public-sans">Mobile App</h4>
            <div className="space-y-3">
              <a
                href={APP_STORE_LINKS.GOOGLE}
                className="block hover:opacity-80 transition-opacity"
                onClick={() => trackEvent("play_store_clicked", { button_location: "footer", theme: isDark ? "dark" : "light" })}
              >
                <Image
                  src={isDark ? APP_STORE_IMAGES.GOOGLE.DARK : APP_STORE_IMAGES.GOOGLE.LIGHT}
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </a>
              <a
                href={APP_STORE_LINKS.APPLE}
                className="block hover:opacity-80 transition-opacity"
                onClick={() => trackEvent("app_store_clicked", { button_location: "footer", theme: isDark ? "dark" : "light" })}
              >
                <Image
                  src={isDark ? APP_STORE_IMAGES.APPLE.DARK : APP_STORE_IMAGES.APPLE.LIGHT}
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-source-sans">
            © {currentYear} TFC Calculator. Made with{' '}
            <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" />
            in <span className="font-semibold">South London</span> for UK families.
          </p>
          <p className="text-xs text-muted-foreground font-source-sans">
            This calculator is for guidance only. Always check with HMRC for
            official information.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;