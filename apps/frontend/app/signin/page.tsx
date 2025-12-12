import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@awseen/ui';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <CardTitle>Sign in to AWSEEN</CardTitle>
          <CardDescription>Authenticate with Google to access personalised recommendations and dashboards.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" size="lg">
            <Sparkles className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <div className="rounded-lg border border-dashed bg-muted/40 p-3 text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Secure OAuth via NextAuth.js + Google Cloud Console configuration.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
