import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - TFC Calculator',
  description:
    'Terms of Service for TFC Calculator - Learn about our terms, conditions, and usage guidelines.',
};

const TermsOfService = () => (
  <div className="max-w-4xl mx-auto py-12 px-4">
    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
    <p className="text-gray-600 mb-8">
      Last updated: {new Date().toLocaleDateString()}
    </p>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
      <p className="mb-4">
        By accessing or using TFC Calculator, operated by Chewy Bytes
        Limited (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), you
        agree to be bound by these Terms of Service and all applicable laws and
        regulations. If you do not agree with any of these terms, you are
        prohibited from using or accessing this service.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">2. Company Information</h2>
      <p className="mb-4">
        Chewy Bytes Limited is a company registered in the United Kingdom.
      </p>
      <p className="mb-4">
        Registered Address:
        <br />
        71-75 Shelton Street
        <br />
        London
        <br />
        WC2H 9JQ
        <br />
        United Kingdom
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">3. Service Description</h2>
      <p className="mb-4">
        TFC Calculator is a free tool designed to help UK parents calculate
        government contributions for their Tax-Free Childcare costs. Our service provides:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Calculation of 20% government top-up for childcare expenses</li>
        <li>Tracking of quarterly top-up usage and limits</li>
        <li>Management of multiple children and their childcare payments</li>
        <li>Monitoring of payment history and reconfirmation dates</li>
        <li>Data export functionality for record-keeping</li>
        <li>Mobile applications for iOS and Android devices</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">4. Free Service and Optional Features</h2>
      <p className="mb-4">
        TFC Calculator is provided as a free service. However, our mobile applications
        may include:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Optional premium features through in-app purchases</li>
        <li>Advertisements to support the free service</li>
        <li>Premium subscription options for enhanced features</li>
      </ul>
      <p className="mb-4">
        Any paid features will be clearly marked, and you will be prompted to
        confirm any purchases before they are processed.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">5. Data and Privacy</h2>
      <p className="mb-4">
        Your personal calculation data (child information, payment details) is
        stored locally on your device and is not transmitted to our servers.
        By using our service, you acknowledge that:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>You are responsible for backing up your local data</li>
        <li>Data may be lost if you uninstall the app or clear browser data</li>
        <li>We collect anonymous usage analytics to improve the service</li>
        <li>You can export your data at any time for safekeeping</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">6. Accuracy and Disclaimers</h2>
      <p className="mb-4">
        TFC Calculator is designed to provide accurate calculations based on current
        UK Tax-Free Childcare regulations. However:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>This tool is for guidance only and is not official HMRC software</li>
        <li>Tax-Free Childcare rules may change, and calculations may become outdated</li>
        <li>You should always verify information with HMRC for official guidance</li>
        <li>We are not responsible for any financial decisions made based on our calculations</li>
        <li>The service is provided &ldquo;as is&rdquo; without warranties of any kind</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">7. Prohibited Uses</h2>
      <p className="mb-4">You agree not to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Use the service for any illegal purpose</li>
        <li>Violate any laws in your jurisdiction</li>
        <li>Infringe upon the rights of others</li>
        <li>Attempt to gain unauthorized access to any portion of the service</li>
        <li>Interfere with or disrupt the service or servers</li>
        <li>Submit false or misleading information for fraudulent purposes</li>
        <li>Use the service to harass or intimidate others</li>
        <li>Reverse engineer, decompile, or disassemble the mobile applications</li>
        <li>Use automated systems to access or use the service</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
      <p className="mb-4">
        The TFC Calculator service, including but not limited to text, graphics,
        logos, images, software, and design, is owned by Chewy Bytes Limited and
        is protected by copyright and other intellectual property laws. You may
        not reproduce, distribute, or create derivative works without our express
        written permission.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">9. User Content</h2>
      <p className="mb-4">
        You retain all rights to the personal data and information you enter into
        TFC Calculator. Since most data is stored locally on your device, you have
        full control over your content. For any data that may be transmitted
        (such as error reports or analytics), you grant us a license to use it
        solely for service improvement purposes.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">10. Service Availability</h2>
      <p className="mb-4">
        We strive to maintain continuous service availability, but we do not
        guarantee that the service will be available at all times. The service
        may be temporarily unavailable due to:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Scheduled maintenance</li>
        <li>Technical issues</li>
        <li>Third-party service outages</li>
        <li>Force majeure events</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
      <p className="mb-4">
        We may terminate or suspend your access to the service immediately,
        without prior notice or liability, for any reason whatsoever, including
        without limitation if you breach these Terms. Upon termination, your
        right to use the service will cease immediately.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">12. Limitation of Liability</h2>
      <p className="mb-4">
        In no event shall Chewy Bytes Limited, nor its directors, employees,
        partners, agents, suppliers, or affiliates, be liable for any indirect,
        incidental, special, consequential or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses resulting from your use of the service. We do not
        guarantee the accuracy of calculations or accept responsibility for
        any financial decisions made based on our service.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">13. Indemnification</h2>
      <p className="mb-4">
        You agree to indemnify and hold harmless Chewy Bytes Limited and its
        affiliates from any claims, damages, losses, costs, and expenses
        (including reasonable attorneys&apos; fees) arising from your use of
        the service or breach of these Terms.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed by and construed in accordance with the
        laws of England and Wales. Any disputes arising from these Terms or
        your use of the service shall be subject to the exclusive jurisdiction
        of the courts of England and Wales.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to modify or replace these Terms at any time. If a
        revision is material, we will provide at least 30 days notice prior to
        any new terms taking effect. Continued use of the service after changes
        constitutes acceptance of the new Terms.
      </p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">16. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms, please contact us at:
      </p>
      <p className="mb-4">
        Email:{' '}
        <a
          href="mailto:support@tfccalculator.co.uk"
          className="text-blue-600 underline"
        >
          support@tfccalculator.co.uk
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
      <h2 className="text-2xl font-semibold mb-4">17. Severability</h2>
      <p className="mb-4">
        If any provision of these Terms is found to be invalid or unenforceable,
        the remaining provisions shall remain in full force and effect.
      </p>
    </section>
  </div>
);

export default TermsOfService;