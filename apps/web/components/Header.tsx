'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator,
  faNewspaper,
  faInfoCircle,
  faEnvelope,
  faBars,
  faCheckCircle,
  faGear,
  faQuestion,
  faMapMarkerAlt,
} from '@fortawesome/pro-solid-svg-icons';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type NavItem = {
  label: string;
  href: string;
  icon?: any;
  external?: boolean;
};

// Primary navigation items (always visible on desktop)
const PRIMARY_NAV_ITEMS: NavItem[] = [
  {
    label: 'Calculator',
    href: '/',
    icon: faCalculator,
  },
  {
    label: 'Eligibility',
    href: '/eligibility',
    icon: faCheckCircle,
  },
  {
    label: 'How It Works',
    href: '/how-it-works',
    icon: faGear,
  },
  {
    label: 'FAQs',
    href: '/faqs',
    icon: faQuestion,
  },
  {
    label: 'Regional Guide',
    href: '/regional-guide',
    icon: faMapMarkerAlt,
  },
];

// All navigation items (for mobile menu)
const NAV_ITEMS: NavItem[] = [
  ...PRIMARY_NAV_ITEMS,
  {
    label: 'Blog',
    href: '/blog',
    icon: faNewspaper,
  },
  {
    label: 'About',
    href: '/about',
    icon: faInfoCircle,
  },
  {
    label: 'Contact',
    href: 'mailto:tfccalculator@chewybytes.com',
    icon: faEnvelope,
    external: true,
  },
];

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const renderNavLink = (item: NavItem, mobile: boolean = false) => {
    const baseClasses = mobile
      ? 'flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors'
      : 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors';

    const activeClasses = mobile
      ? 'bg-primary text-primary-foreground'
      : 'bg-primary/10 text-primary';

    const defaultClasses = mobile
      ? 'text-foreground hover:bg-muted'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50';

    const isActive = isActivePath(item.href);

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            baseClasses,
            isActive ? activeClasses : defaultClasses
          )}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
        >
          {item.icon && (
            <FontAwesomeIcon
              icon={item.icon}
              className={mobile ? 'text-lg' : 'text-sm'}
            />
          )}
          {item.label}
        </a>
      );
    }

    return (
      <Link
        href={item.href}
        className={cn(
          baseClasses,
          isActive ? activeClasses : defaultClasses
        )}
        onClick={() => mobile && setIsMobileMenuOpen(false)}
      >
        {item.icon && (
          <FontAwesomeIcon
            icon={item.icon}
            className={mobile ? 'text-lg' : 'text-sm'}
          />
        )}
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <FontAwesomeIcon
                  icon={faCalculator}
                  size="lg"
                  className="text-primary"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-balance font-public-sans">
                  TFC Calculator
                </h1>
                <p className="text-xs text-muted-foreground font-source-sans hidden sm:block">
                  Tax-Free Childcare Calculator
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <div key={item.href}>{renderNavLink(item)}</div>
              ))}

              {/* Blog and About links for larger screens */}
              <Link
                href="/blog"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActivePath('/blog')
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <FontAwesomeIcon icon={faNewspaper} className="text-sm" />
                Blog
              </Link>

              <Link
                href="/about"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActivePath('/about')
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="text-sm" />
                About
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                <FontAwesomeIcon
                  icon={isMobileMenuOpen ? faClose : faBars}
                  size="lg"
                />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <div key={item.href}>{renderNavLink(item, true)}</div>
                ))}
              </nav>

              {/* Mobile Contact Info */}
              <div className="mt-6 pt-4 border-t space-y-3">
                <div className="text-sm text-muted-foreground font-source-sans">
                  Need help with Tax-Free Childcare?
                </div>
                <div className="space-y-2">
                  <a
                    href="mailto:tfccalculator@chewybytes.com"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    tfccalculator@chewybytes.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;