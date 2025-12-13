export default function AffiliateDisclosurePage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Affiliate Disclosure</h1>
      <p className="text-muted-foreground mb-8">
        Last updated: December 2024
      </p>

      <div className="prose prose-slate max-w-none">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <h2 className="mt-0 text-purple-800">Important Notice</h2>
          <p className="mb-0 text-purple-700">
            AI Gift Finder is a participant in affiliate marketing programs. This means when you click on product links and make a purchase, we may earn a commission at no additional cost to you.
          </p>
        </div>

        <h2>What This Means For You</h2>
        <p>
          When you use our gift recommendation service and click through to purchase products from our partner retailers, we may receive a small commission from the sale. This commission helps us:
        </p>
        <ul>
          <li>Keep our gift recommendation service free</li>
          <li>Improve our AI algorithms</li>
          <li>Create helpful gift guide content</li>
          <li>Maintain and operate the website</li>
        </ul>
        <p>
          <strong>Important:</strong> You pay the same price whether you use our affiliate links or go directly to the retailer. The commission comes from the retailer, not from you.
        </p>

        <h2>Amazon Associates Program</h2>
        <p>
          AI Gift Finder is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
        </p>
        <p className="font-semibold bg-amber-50 p-4 rounded-lg border border-amber-200">
          As an Amazon Associate, we earn from qualifying purchases.
        </p>
        <p>
          Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
        </p>

        <h2>Other Affiliate Programs</h2>
        <p>
          In addition to Amazon, we may participate in other affiliate programs, including but not limited to:
        </p>
        <ul>
          <li>ShareASale</li>
          <li>Commission Junction (CJ)</li>
          <li>Rakuten Advertising</li>
          <li>Individual brand affiliate programs</li>
        </ul>
        <p>
          All affiliate relationships are clearly disclosed, and we only recommend products we believe provide genuine value.
        </p>

        <h2>Our Commitment to You</h2>
        <p>
          While we earn commissions from affiliate links, we are committed to:
        </p>
        <ul>
          <li><strong>Honest Recommendations:</strong> Our AI recommendations are based on the information you provide, not on which products pay higher commissions</li>
          <li><strong>Transparency:</strong> We clearly disclose affiliate relationships throughout our site</li>
          <li><strong>Quality Focus:</strong> We prioritize recommending quality products that match your needs</li>
          <li><strong>No Extra Cost:</strong> You never pay more for using our affiliate links</li>
        </ul>

        <h2>How We Balance Quality and Commerce</h2>
        <p>
          Our gift recommendation algorithm considers multiple factors:
        </p>
        <ul>
          <li>Match with recipient&apos;s interests and personality</li>
          <li>Price within your specified budget</li>
          <li>Product reviews and ratings</li>
          <li>Appropriateness for the occasion</li>
        </ul>
        <p>
          While affiliate commission rates may influence ranking when all other factors are equal, we never recommend products solely based on commission rates.
        </p>

        <h2>Identifying Affiliate Links</h2>
        <p>
          On our site, affiliate links can be identified by:
        </p>
        <ul>
          <li>Links to product pages on retailer websites</li>
          <li>&quot;View on Amazon&quot; or similar buttons</li>
          <li>Product cards with pricing information</li>
        </ul>
        <p>
          We include affiliate disclosure notices on pages containing affiliate links.
        </p>

        <h2>FTC Compliance</h2>
        <p>
          This disclosure is provided in accordance with the Federal Trade Commission&apos;s guidelines on endorsements and testimonials in advertising (16 CFR Part 255).
        </p>

        <h2>Questions?</h2>
        <p>
          If you have any questions about our affiliate relationships or this disclosure, please contact us at:{' '}
          <a href="mailto:info@giftfinder.ai" className="text-purple-600">
            info@giftfinder.ai
          </a>
        </p>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Affiliate Disclosure',
  description: 'Affiliate Disclosure for AI Gift Finder - How we earn commissions and our commitment to honest recommendations',
};
