import Link from 'next/link';
import { AlertTriangle, Clock, RefreshCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from '@awseen/ui';

const pipelines = [
  {
    name: 'Gemini product enrichment',
    status: 'Operational',
    cadence: 'Every 4 hours',
    lastRun: '12 minutes ago',
    badges: ['Gemini 1.5 Pro', 'Structured extraction']
  },
  {
    name: 'OpenAI description rewrite',
    status: 'Operational',
    cadence: 'Hourly',
    lastRun: '24 minutes ago',
    badges: ['GPT-4o', 'Copywriting']
  },
  {
    name: 'Programmable Search ingestion',
    status: 'Attention required',
    cadence: 'Every 6 hours',
    lastRun: 'Failed 32 minutes ago',
    badges: ['Google Search', 'Affiliate tokens'],
    alert: '429 rate limited - apply backoff'
  }
];

export default function AdminDashboardPage() {
  return (
    <div className="container space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Admin control centre</h1>
        <p className="max-w-2xl text-muted-foreground">
          Coordinate catalogue overrides, automation cadences and partner analytics from a single, secure interface with
          audit trails and environment-aware toggles.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/admin/products">Manage products</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/admin/partners">Partner access</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/logs">AI logs</Link>
          </Button>
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Automation pipelines</h2>
              <p className="text-sm text-muted-foreground">Monitor enrichment jobs, scraping tasks and downstream webhooks.</p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Sync now
            </Button>
          </div>
          <div className="space-y-4">
            {pipelines.map((pipeline) => (
              <Card key={pipeline.name} className="border-muted">
                <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg">{pipeline.name}</CardTitle>
                    <CardDescription>{pipeline.cadence}</CardDescription>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {pipeline.badges.map((badge) => (
                      <Badge key={badge} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>{pipeline.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Last run {pipeline.lastRun}</span>
                  </div>
                  {pipeline.alert ? (
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{pipeline.alert}</span>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Security & compliance</CardTitle>
            <CardDescription>Keep data governance tight with JWT enforcement and auditing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">JWT enforcement</p>
                <p>Rotation scheduled every 12 hours with Railway secrets.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">Prisma schema migrations</p>
                <p>Safe deploy preview running before production promotion.</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="font-medium text-foreground">Quick actions</p>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/admin/schedules">Edit cron schedules</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/audit">Review access logs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
