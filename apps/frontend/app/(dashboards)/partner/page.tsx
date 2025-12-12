import Link from 'next/link';
import { ArrowRight, Coins, ExternalLink, FileDown, Globe2 } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@awseen/ui';

const integrations = [
  {
    name: 'Amazon Associates',
    description: 'Real-time pricing sync with tagging for contextual placements.',
    status: 'Connected'
  },
  {
    name: 'Impact.com',
    description: 'Conversion postbacks with payout reconciliation.',
    status: 'Connected'
  },
  {
    name: 'Custom CSV feed',
    description: 'Secure S3 upload with schema validation.',
    status: 'Awaiting upload'
  }
];

export default function PartnerDashboardPage() {
  return (
    <div className="container space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Partner revenue workspace</h1>
        <p className="max-w-2xl text-muted-foreground">
          Upload feeds, monitor click → conversion → payout funnels and share Gemini-enriched product storytelling assets
          directly with AWSEEN shoppers.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/partner/onboarding">Complete onboarding</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/partner/feeds">Manage feeds</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/partner/api">API credentials</Link>
          </Button>
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Integrations</h2>
              <p className="text-sm text-muted-foreground">Connect affiliate networks, product feeds and payout providers.</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/partner/integrations">
                <ExternalLink className="mr-2 h-4 w-4" />
                View all
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            {integrations.map((integration) => (
              <Card key={integration.name}>
                <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                  <Badge variant={integration.status === 'Connected' ? 'secondary' : 'outline'}>{integration.status}</Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Payout overview</CardTitle>
            <CardDescription>Live earnings with scheduled disbursements.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatBlock label="Pending" value="$12,430" icon={Coins} accent />
            <StatBlock label="Last 30 days" value="$42,910" icon={Globe2} />
            <StatBlock label="Conversion rate" value="6.3%" icon={ArrowRight} />
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/partner/reports/payouts.csv" download>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export payout report
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/partner/invite">Invite teammate</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function StatBlock({
  label,
  value,
  icon: Icon,
  accent
}: {
  label: string;
  value: string;
  icon: typeof ArrowRight;
  accent?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between rounded-xl border px-3 py-2 ${accent ? 'border-primary/50 bg-primary/10' : 'bg-muted/30'}`}>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
      <Icon className={`h-5 w-5 ${accent ? 'text-primary' : 'text-muted-foreground'}`} />
    </div>
  );
}
