# Campaign Builder Module (AI Lead Gen)

A production-style Next.js 14 module to create and manage lead generation campaigns for future scraping and outreach automation.

## Stack
- Next.js 14 (App Router) + React + TypeScript
- Tailwind CSS
- Shadcn-style UI components
- Prisma ORM
- PostgreSQL
- Zod + React Hook Form
- Sonner toasts

## Features
- 3-step campaign builder (Targeting → Outreach Settings → Review)
- Advanced settings (collapsible)
- Real-time validation
- Niche-based job title suggestions
- Campaign list with search/filter/sort
- Campaign detail page with activate/pause/delete actions
- Full authorized API routes

## Prisma schema
See `prisma/schema.prisma`.

## Run locally
1. Install dependencies
```bash
npm install
```

2. Configure env
```bash
cp .env.example .env
```

3. Generate prisma client + run migration
```bash
npm run prisma:generate
npm run prisma:migrate -- --name init_campaign_builder
```

4. Start dev server
```bash
npm run dev
```

> Auth assumption: pass `x-user-id`/`x-user-email` headers from your auth layer, or set `DEV_USER_ID` for local testing.

## API endpoints
- `POST /api/campaigns`
- `GET /api/campaigns`
- `GET /api/campaigns/:id`
- `PATCH /api/campaigns/:id`
- `DELETE /api/campaigns/:id`
- `POST /api/campaigns/:id/activate`
- `POST /api/campaigns/:id/pause`

## Airtable alternative (if PostgreSQL unavailable)

### Base/Table: `Campaigns`
| Field | Type |
|---|---|
| id | Single line text (UUID) |
| userId | Single line text |
| name | Single line text |
| niche | Single line text |
| country | Single select |
| cities | Multiple select |
| companySizeMin | Number |
| companySizeMax | Number |
| companySizeLabel | Single line text |
| jobTitles | Multiple select |
| outreachTone | Single select (FORMAL, FRIENDLY, AGGRESSIVE) |
| dailyLimit | Number |
| includeLinkedIn | Checkbox |
| includeGoogleMaps | Checkbox |
| verifiedEmailsOnly | Checkbox |
| excludeFreeEmails | Checkbox |
| blacklistKeywords | Multiple select |
| includeKeywords | Multiple select |
| status | Single select (DRAFT, ACTIVE, PAUSED, COMPLETED) |
| totalLeadsScraped | Number |
| totalEmailsSent | Number |
| nextRunAt | Date |
| createdAt | Created time |
| updatedAt | Last modified time |

### Airtable integration sample
```ts
const AIRTABLE_BASE = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const TABLE = 'Campaigns';

export async function createCampaignAirtable(payload: Record<string, unknown>) {
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${TABLE}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records: [{ fields: payload }] }),
  });
  if (!res.ok) throw new Error('Airtable create failed');
  return res.json();
}

export async function listCampaignsAirtable(filterFormula?: string) {
  const q = filterFormula ? `?filterByFormula=${encodeURIComponent(filterFormula)}` : '';
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${TABLE}${q}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
  });
  if (!res.ok) throw new Error('Airtable list failed');
  return res.json();
}

export async function updateCampaignStatusAirtable(recordId: string, status: string) {
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${TABLE}/${recordId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: { status } }),
  });
  if (!res.ok) throw new Error('Airtable update failed');
  return res.json();
}
```

### Field mapping
- `campaign.id -> fields.id`
- `campaign.userId -> fields.userId`
- `campaign.status -> fields.status`
- arrays map to Airtable multiple select fields.

## UI screenshot description
- `/dashboard/campaigns/new`: a centered card with 3-step progress indicator, clean form rows, inline validation, tone preview, and advanced settings accordion.
- `/dashboard/campaigns`: top actions row, filters in a card, data table with badges and quick view actions.
- `/dashboard/campaigns/[id]`: detail card with campaign KPIs, status badge, and action buttons.
