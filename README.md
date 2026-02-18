# Campaign Builder Module (AI Lead Gen)

A production-style Next.js 14 module to create and manage lead generation campaigns for future scraping and outreach automation.

## Stack
- Next.js 14 (App Router) + React + TypeScript
- Tailwind CSS
- Shadcn-style UI components
- Prisma ORM
- MySQL database
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
npm run prisma:migrate -- --name init_campaign_builder_mysql
```

4. Start dev server
```bash
npm run dev
```

> Auth assumption: pass `x-user-id`/`x-user-email` headers from your auth layer, or set `DEV_USER_ID` for local testing.

## Production env variables (Hostinger Node.js)
```env
DATABASE_URL="mysql://DB_USER:DB_PASS@DB_HOST:3306/DB_NAME"
DEV_USER_ID="00000000-0000-0000-0000-000000000001"
```

## API endpoints
- `POST /api/campaigns`
- `GET /api/campaigns`
- `GET /api/campaigns/:id`
- `PATCH /api/campaigns/:id`
- `DELETE /api/campaigns/:id`
- `POST /api/campaigns/:id/activate`
- `POST /api/campaigns/:id/pause`

## UI screenshot description
- `/dashboard/campaigns/new`: a centered card with 3-step progress indicator, clean form rows, inline validation, tone preview, and advanced settings accordion.
- `/dashboard/campaigns`: top actions row, filters in a card, data table with badges and quick view actions.
- `/dashboard/campaigns/[id]`: detail card with campaign KPIs, status badge, and action buttons.
