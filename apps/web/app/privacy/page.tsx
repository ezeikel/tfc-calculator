import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - TFC Calculator',
  description:
    'Privacy Policy for TFC Calculator - Learn how we collect, use, and protect your data.',
};

const PrivacyPolicy = () => (
  <div className="max-w-4xl mx-auto py-12 px-4">
    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
    <p className="text-gray-600 mb-8">
      Last updated: {new Date().toLocaleDateString()}
    </p>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
      <p className="mb-4">
        Welcome to TFC Calculator (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;).
        We respect your privacy and are committed to protecting your personal data. This privacy
        policy will inform you about how we look after your personal data when you use our
        website and mobile applications (iOS and Android) and tell you about your privacy rights
        and how the law protects you.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">2. What TFC Calculator Does</h2>
      <p className="mb-4">
        TFC Calculator is a free tool that helps UK parents calculate government contributions
        for their Tax-Free Childcare costs. Our service allows you to:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Calculate the 20% government top-up for childcare expenses</li>
        <li>Track your quarterly top-up usage and limits</li>
        <li>Manage multiple children and their childcare payments</li>
        <li>Monitor payment history and reconfirmation dates</li>
        <li>Export your data for record-keeping</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">3. Data We Collect</h2>

      <h3 className="text-xl font-medium mb-2">3.1 Personal Data</h3>
      <p className="mb-4">
        We may collect, use, store and transfer different kinds of personal data about you:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Child Data: includes child names (optional), dates of birth, and reconfirmation dates</li>
        <li>Payment Data: includes childcare payment amounts, dates, and descriptions</li>
        <li>Usage Data: includes information about how you use our website and mobile apps</li>
        <li>Technical Data: includes internet protocol (IP) address, browser type and version,
            device information, operating system, and app version</li>
        <li>Analytics Data: includes interaction patterns, feature usage, and error reports</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">3.2 Local Storage</h3>
      <p className="mb-4">
        Most of your personal data (child information and payment history) is stored locally
        on your device and is not transmitted to our servers. This includes:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Child names, dates of birth, and reconfirmation dates</li>
        <li>Payment amounts, dates, and descriptions</li>
        <li>Calculator preferences and settings</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">4. How We Use Your Data</h2>
      <p className="mb-4">
        We use your personal data for the following purposes:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide and maintain our calculation service</li>
        <li>To improve our calculator and user experience</li>
        <li>To analyze usage patterns and feature adoption</li>
        <li>To detect and prevent technical issues</li>
        <li>To monitor app performance and crashes</li>
        <li>To ensure compliance with UK Tax-Free Childcare regulations</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>

      <h3 className="text-xl font-medium mb-2">5.1 Analytics and Performance</h3>
      <p className="mb-4">
        We use the following services to analyze and improve our applications:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Vercel Analytics for web usage analytics</li>
        <li>PostHog for product analytics and user behavior insights</li>
        <li>Sentry for error tracking and performance monitoring</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">5.2 Mobile App Services</h3>
      <p className="mb-4">
        Our mobile applications use the following services:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Google AdMob for displaying advertisements</li>
        <li>RevenueCat for managing in-app purchases and subscriptions</li>
        <li>Expo services for app updates and crash reporting</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">5.3 App Distribution</h3>
      <p className="mb-4">
        Our mobile apps are distributed through:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Apple App Store (iOS)</li>
        <li>Google Play Store (Android)</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">6. Data Storage and Security</h2>
      <p className="mb-4">
        Your calculation data is primarily stored locally on your device. For data that is
        transmitted to our servers:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>We use industry-standard encryption in transit</li>
        <li>Anonymous analytics data is stored with our third-party providers</li>
        <li>No personally identifiable calculation data leaves your device</li>
        <li>Error reports may contain anonymized usage information</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">7. Data Sharing</h2>
      <p className="mb-4">
        We do not sell, trade, or otherwise transfer your personal data to third parties,
        except as described in this policy:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Anonymous analytics data shared with our analytics providers</li>
        <li>Error reports shared with monitoring services for debugging</li>
        <li>Aggregated usage statistics for service improvement</li>
        <li>When required by law or to protect our rights</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
      <p className="mb-4">
        Under data protection laws, you have rights including:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Your right of access to personal data</li>
        <li>Your right to rectification of inaccurate data</li>
        <li>Your right to erasure of your data</li>
        <li>Your right to restrict processing</li>
        <li>Your right to data portability (export feature)</li>
        <li>Your right to object to processing</li>
        <li>Your right to withdraw consent</li>
      </ul>
      <p className="mb-4">
        Since most data is stored locally on your device, you can exercise many of these
        rights directly through the app settings or by deleting the app.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">9. Children&apos;s Privacy</h2>
      <p className="mb-4">
        While our service is designed to help parents calculate childcare costs, we do not
        knowingly collect personal information from children under 13 years of age. The child
        information entered into our calculator is controlled by parents/guardians and stored
        locally on their devices.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. We will notify you of any
        material changes by posting the new privacy policy on this page and updating the
        &ldquo;Last updated&rdquo; date.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this privacy policy or our privacy practices,
        please contact us at:
      </p>
      <p className="mb-4">
        Email:{' '}
        <a
          href="mailto:privacy@tfccalculator.co.uk"
          className="text-blue-600 underline"
        >
          privacy@tfccalculator.co.uk
        </a>
        <br />
        Website:{' '}
        <a
          href="https://tfccalculator.co.uk"
          className="text-blue-600 underline"
        >
          https://tfccalculator.co.uk
        </a>
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">12. Disclaimer</h2>
      <p className="mb-4">
        TFC Calculator is an independent tool and is not affiliated with HMRC or the UK
        government. This calculator is for guidance only. Always check with HMRC for
        official Tax-Free Childcare information and requirements.
      </p>
    </section>
  </div>
);

export default PrivacyPolicy;