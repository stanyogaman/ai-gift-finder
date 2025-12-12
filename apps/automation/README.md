# AWSEEN Automation Workflows

This workspace stores reference automation playbooks for n8n and Make.com. The flows orchestrate the Express backend webhooks
with partner feeds, AI enrichment jobs and marketing automation platforms.

## Included examples

- `playbooks/seasonal-launch.json` – bootstraps new partner feeds, triggers Gemini enrichment, posts to Slack and schedules
  newsletter sends.
- `playbooks/reengagement.json` – listens to the `/api/webhooks/partner` endpoint, re-scores products and syncs warm leads to
  HubSpot.

Each file is compatible with n8n import/export. Secrets are injected via environment variables managed within the automation
platform.
