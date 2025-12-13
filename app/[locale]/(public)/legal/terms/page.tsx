import { useTranslations, useLocale } from 'next-intl';

export default function TermsPage() {
  const locale = useLocale();

  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">
        Last updated: December 2024
      </p>

      <div className="prose prose-slate max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using AI Gift Finder (the &quot;Service&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          AI Gift Finder is an online platform that uses artificial intelligence to provide personalized gift recommendations based on user-provided information about gift recipients. Our service includes:
        </p>
        <ul>
          <li>An interactive quiz to gather preferences</li>
          <li>AI-powered gift recommendations</li>
          <li>Links to third-party retailers</li>
          <li>Blog content with gift guides</li>
        </ul>

        <h2>3. Affiliate Disclosure</h2>
        <p>
          AI Gift Finder participates in affiliate marketing programs. This means we may earn commissions from qualifying purchases made through links on our site. This does not affect the price you pay for products.
        </p>

        <h2>4. Third-Party Products and Services</h2>
        <p>
          We provide links to third-party websites and retailers. We are not responsible for:
        </p>
        <ul>
          <li>The quality, safety, or legality of products sold by third parties</li>
          <li>The accuracy of product descriptions on third-party sites</li>
          <li>Any issues with orders, shipping, or returns from third-party retailers</li>
          <li>Changes in product availability or pricing</li>
        </ul>

        <h2>5. AI-Generated Content</h2>
        <p>
          Our gift recommendations are generated using artificial intelligence. While we strive for accuracy and relevance:
        </p>
        <ul>
          <li>AI recommendations are suggestions, not guarantees</li>
          <li>Results may vary based on the information provided</li>
          <li>We do not guarantee that recipients will like recommended gifts</li>
          <li>AI may occasionally produce unexpected or inaccurate results</li>
        </ul>

        <h2>6. User Accounts</h2>
        <p>
          When you create an account, you agree to:
        </p>
        <ul>
          <li>Provide accurate and current information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized use</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <p>
          All content on AI Gift Finder, including text, graphics, logos, and software, is the property of AI Gift Finder or its content suppliers and is protected by intellectual property laws.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          AI Gift Finder shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
        </p>
        <ul>
          <li>Your use or inability to use the Service</li>
          <li>Any purchases made through affiliate links</li>
          <li>Unauthorized access to your data</li>
          <li>Any errors or omissions in content</li>
        </ul>

        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the Service. Continued use after changes constitutes acceptance of new terms.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AI Gift Finder operates, without regard to its conflict of law provisions.
        </p>

        <h2>11. Contact Information</h2>
        <p>
          For questions about these Terms, please contact us at:{' '}
          <a href="mailto:legal@giftfinder.ai" className="text-purple-600">
            legal@giftfinder.ai
          </a>
        </p>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for AI Gift Finder',
};
