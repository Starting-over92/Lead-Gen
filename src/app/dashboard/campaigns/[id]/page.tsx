import { notFound } from "next/navigation";
import { CampaignStatusBadge } from "@/components/campaign/campaign-status-badge";
import { CampaignDetailActions } from "@/components/campaign/campaign-detail-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { normalizeCampaign } from "@/lib/campaign";

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const user = await getAuthUser();
  if (!user) return <main className="p-6">Please log in.</main>;

  try {
    const campaignRecord = await prisma.campaign.findFirst({ where: { id: params.id, userId: user.id } });
    if (!campaignRecord) notFound();
    const campaign = normalizeCampaign(campaignRecord);

    return (
      <main className="mx-auto max-w-4xl space-y-4 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {campaign.name}
              <CampaignStatusBadge status={campaign.status} />
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <p><strong>Niche:</strong> {campaign.niche}</p>
            <p><strong>Location:</strong> {campaign.country} {campaign.cities.length ? `(${campaign.cities.join(", ")})` : ""}</p>
            <p><strong>Daily limit:</strong> {campaign.dailyLimit}</p>
            <p><strong>Total leads scraped:</strong> {campaign.totalLeadsScraped}</p>
            <p><strong>Total emails sent:</strong> {campaign.totalEmailsSent}</p>
            <p><strong>Next run:</strong> {campaign.nextRunAt ? campaign.nextRunAt.toLocaleString() : "Not scheduled"}</p>
            <CampaignDetailActions id={campaign.id} />
          </CardContent>
        </Card>
      </main>
    );
  } catch {
    return (
      <main className="mx-auto max-w-3xl space-y-3 p-6">
        <h1 className="text-2xl font-bold">Campaign Details</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-medium">Unable to load this campaign right now.</p>
          <p className="mt-1">Please verify DATABASE_URL, database host access, and that the User and Campaign tables exist.</p>
        </div>
      </main>
    );
  }
}
