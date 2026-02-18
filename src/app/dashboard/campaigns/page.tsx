import Link from "next/link";
import { CampaignStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CampaignTable } from "@/components/campaign/campaign-table";
import { normalizeCampaign } from "@/lib/campaign";

export default async function CampaignsPage({ searchParams }: { searchParams: { q?: string; status?: CampaignStatus | "ALL"; sort?: "asc" | "desc" } }) {
  const user = await getAuthUser();
  if (!user) return <main className="p-6">Please log in.</main>;

  const q = searchParams.q ?? "";
  const status = searchParams.status ?? "ALL";
  const sort = searchParams.sort ?? "desc";

  const campaigns = await prisma.campaign.findMany({
    where: {
      userId: user.id,
      ...(q ? { OR: [{ name: { contains: q } }, { niche: { contains: q } }] } : {}),
      ...(status !== "ALL" ? { status } : {}),
    },
    orderBy: { createdAt: sort },
  });

  return (
    <main className="mx-auto max-w-6xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Button asChild><Link href="/dashboard/campaigns/new">New Campaign</Link></Button>
      </div>
      <form className="grid gap-2 rounded-lg border bg-white p-4 md:grid-cols-4">
        <Input name="q" placeholder="Search campaign or niche" defaultValue={q} />
        <select name="status" className="h-10 rounded-md border px-2 text-sm" defaultValue={status}>
          <option value="ALL">All statuses</option>
          {Object.values(CampaignStatus).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="sort" className="h-10 rounded-md border px-2 text-sm" defaultValue={sort}>
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
        <Button type="submit">Apply</Button>
      </form>
      <CampaignTable campaigns={campaigns.map(normalizeCampaign)} />
    </main>
  );
}
