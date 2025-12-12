import Link from 'next/link';
import { CalendarClock, Workflow } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@awseen/ui';

const playbooks = [
  {
    title: 'Seasonal launch autopilot',
    description: 'Syncs new partner feeds, generates SEO landing pages and schedules nurture sequences.',
    tools: ['n8n', 'OpenAI', 'Railway cron'],
    href: '/automation/playbooks/seasonal-launch'
  },
  {
    title: 'High intent re-engagement',
    description: 'Listens to webhook clickstream, re-ranks inventory and triggers on-brand retargeting copy.',
    tools: ['Make.com', 'Gemini 1.5 Pro', 'Next.js webhooks'],
    href: '/automation/playbooks/reengagement'
  }
];

export default function AutomationPage() {
  return (
    <div className="container space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Automation playbooks</h1>
        <p className="max-w-2xl text-muted-foreground">
          Rapidly orchestrate partner feeds, AI enrichment and marketing ops using production-ready n8n / Make.com hooks.
        </p>
        <Button asChild size="lg">
          <Link href="/automation/webhooks">View webhook catalogue</Link>
        </Button>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        {playbooks.map((playbook) => (
          <Card key={playbook.title} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{playbook.title}</CardTitle>
              <CardDescription>{playbook.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {playbook.tools.map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </div>
              <Button asChild>
                <Link href={playbook.href}>
                  Explore workflow
                  <Workflow className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Webhook reliability</CardTitle>
            <CardDescription>Idempotency keys, retries and signature validation baked-in.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              Each webhook is signed with shared secrets and validated using HMAC-SHA256. Failure responses trigger exponential
              backoff with jitter and Slack alerts through automation bots.
            </p>
            <p>
              Replay endpoints are exposed to recover upstream data, ensuring product feeds remain consistent across partner
              commerce stacks.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scheduling cadence</CardTitle>
            <CardDescription>Coordinate cron jobs running on Railway with timezone awareness.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Product refresh</p>
                <p className="text-lg font-semibold">Every 4 hours</p>
              </div>
              <CalendarClock className="h-5 w-5 text-primary" />
            </div>
            <p>
              Deploy the official AWSEEN Railway template to instantly provision an Express API, PostgreSQL database and cron
              workers with observability dashboards.
            </p>
            <Button asChild variant="outline">
              <Link href="https://railway.app">Railway deployment guide</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
