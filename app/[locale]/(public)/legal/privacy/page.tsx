export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">
        Last updated: December 2024
      </p>

      <div className="prose prose-slate max-w-none">
        <h2>1. Introduction</h2>
        <p>
          AI Gift Finder (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our service.
        </p>

        <h2>2. Information We Collect</h2>

        <h3>2.1 Information You Provide</h3>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, profile picture (when using social login)</li>
          <li><strong>Quiz Responses:</strong> Information about gift recipients including relationships, occasions, interests, and preferences</li>
          <li><strong>Contact Information:</strong> Name, email, and message content when you contact us</li>
          <li><strong>Partnership Inquiries:</strong> Business information when applying for partnerships</li>
        </ul>

        <h3>2.2 Information Collected Automatically</h3>
        <ul>
          <li><strong>Usage Data:</strong> Pages visited, features used, time spent on site</li>
          <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
          <li><strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use collected information to:</p>
        <ul>
          <li>Generate personalized gift recommendations</li>
          <li>Improve our AI algorithms and service quality</li>
          <li>Maintain and secure your account</li>
          <li>Send service-related communications</li>
          <li>Send marketing emails (with your consent)</li>
          <li>Analyze usage patterns to improve user experience</li>
          <li>Process partnership applications</li>
        </ul>

        <h2>4. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul>
          <li><strong>Firebase (Google):</strong> Authentication and user management</li>
          <li><strong>Analytics Services:</strong> To understand how users interact with our site</li>
          <li><strong>AI Providers:</strong> To generate gift recommendations (OpenAI, Google, Anthropic)</li>
          <li><strong>Affiliate Networks:</strong> Amazon Associates and other affiliate programs</li>
          <li><strong>Email Services:</strong> For transactional and marketing emails</li>
        </ul>
        <p>
          Each third-party service has its own privacy policy governing their use of your data.
        </p>

        <h2>5. Data Sharing</h2>
        <p>We do not sell your personal data. We may share data:</p>
        <ul>
          <li>With service providers who assist in operating our service</li>
          <li>When required by law or to protect our rights</li>
          <li>In connection with a business transfer or merger</li>
          <li>With your consent for any other purpose</li>
        </ul>

        <h2>6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data, including:
        </p>
        <ul>
          <li>Encryption of data in transit (HTTPS)</li>
          <li>Secure authentication methods</li>
          <li>Regular security assessments</li>
          <li>Access controls and monitoring</li>
        </ul>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of your personal data</li>
          <li><strong>Correction:</strong> Request correction of inaccurate data</li>
          <li><strong>Deletion:</strong> Request deletion of your data</li>
          <li><strong>Portability:</strong> Receive your data in a portable format</li>
          <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
          <li><strong>Object:</strong> Object to certain data processing</li>
        </ul>
        <p>
          To exercise these rights, please contact us at{' '}
          <a href="mailto:privacy@giftfinder.ai" className="text-purple-600">
            privacy@giftfinder.ai
          </a>
        </p>

        <h2>8. Data Retention</h2>
        <p>
          We retain your data for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Quiz data may be retained to improve our AI recommendations even after account deletion, but in anonymized form.
        </p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>
          Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information.
        </p>

        <h2>10. International Transfers</h2>
        <p>
          Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this privacy policy periodically. We will notify you of significant changes via email or through our service.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          For privacy-related questions or concerns, contact us at:{' '}
          <a href="mailto:privacy@giftfinder.ai" className="text-purple-600">
            privacy@giftfinder.ai
          </a>
        </p>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AI Gift Finder - How we collect, use, and protect your data',
};
