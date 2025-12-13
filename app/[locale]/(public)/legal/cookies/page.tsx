export default function CookiePolicyPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      <p className="text-muted-foreground mb-8">
        Last updated: December 2024
      </p>

      <div className="prose prose-slate max-w-none">
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>
          AI Gift Finder uses cookies and similar technologies for several purposes:
        </p>

        <h3>2.1 Strictly Necessary Cookies</h3>
        <p>
          These cookies are essential for the website to function properly. They include:
        </p>
        <ul>
          <li><strong>Session cookies:</strong> Maintain your session as you navigate the site</li>
          <li><strong>Authentication cookies:</strong> Keep you logged in to your account</li>
          <li><strong>Security cookies:</strong> Help protect against fraudulent activity</li>
        </ul>
        <p>
          You cannot opt out of these cookies as they are necessary for the site to work.
        </p>

        <h3>2.2 Functional Cookies</h3>
        <p>
          These cookies enable enhanced functionality and personalization:
        </p>
        <ul>
          <li><strong>Language preferences:</strong> Remember your preferred language</li>
          <li><strong>Quiz progress:</strong> Save your quiz progress if you navigate away</li>
          <li><strong>Theme preferences:</strong> Remember your display preferences</li>
        </ul>

        <h3>2.3 Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our website:
        </p>
        <ul>
          <li><strong>Google Analytics:</strong> Tracks page views, user journeys, and site performance</li>
          <li><strong>Usage patterns:</strong> Helps us improve user experience</li>
        </ul>
        <p>
          Analytics data is aggregated and anonymized where possible.
        </p>

        <h3>2.4 Marketing and Affiliate Cookies</h3>
        <p>
          These cookies are used for advertising and affiliate tracking:
        </p>
        <ul>
          <li><strong>Affiliate tracking:</strong> Track referrals to our partner retailers (e.g., Amazon Associates)</li>
          <li><strong>Advertising:</strong> May be used to show relevant ads on other websites</li>
        </ul>

        <h2>3. Third-Party Cookies</h2>
        <p>
          Some cookies are placed by third-party services that appear on our pages:
        </p>
        <ul>
          <li><strong>Firebase/Google:</strong> Authentication and analytics</li>
          <li><strong>Amazon:</strong> Affiliate tracking</li>
          <li><strong>Social media:</strong> When using social login options</li>
        </ul>
        <p>
          These third parties have their own cookie policies that govern their use of cookies.
        </p>

        <h2>4. Cookie Retention</h2>
        <p>
          Different cookies are retained for different periods:
        </p>
        <ul>
          <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
          <li><strong>Persistent cookies:</strong> May remain for days to years, depending on their purpose</li>
          <li><strong>Affiliate cookies:</strong> Typically 24 hours to 30 days</li>
        </ul>

        <h2>5. Managing Cookies</h2>
        <p>
          You can control and manage cookies in several ways:
        </p>

        <h3>5.1 Browser Settings</h3>
        <p>
          Most browsers allow you to:
        </p>
        <ul>
          <li>View what cookies are stored</li>
          <li>Delete cookies individually or all at once</li>
          <li>Block third-party cookies</li>
          <li>Block all cookies from specific sites</li>
        </ul>
        <p>
          Note that blocking all cookies may affect your experience on our site.
        </p>

        <h3>5.2 Opt-Out Links</h3>
        <p>
          You can opt out of specific tracking:
        </p>
        <ul>
          <li>
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-purple-600">
              Google Analytics Opt-Out
            </a>
          </li>
          <li>
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-purple-600">
              Digital Advertising Alliance Opt-Out
            </a>
          </li>
        </ul>

        <h2>6. Do Not Track</h2>
        <p>
          Some browsers have a &quot;Do Not Track&quot; feature. Our site may not currently respond to DNT signals, but you can use the opt-out methods described above.
        </p>

        <h2>7. Updates to This Policy</h2>
        <p>
          We may update this cookie policy as our practices change or as required by law. Check back periodically for updates.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          For questions about our cookie practices, contact us at:{' '}
          <a href="mailto:privacy@giftfinder.ai" className="text-purple-600">
            privacy@giftfinder.ai
          </a>
        </p>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for AI Gift Finder - How we use cookies and similar technologies',
};
