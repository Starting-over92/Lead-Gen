import Link from "next/link";
import { Campaign } from "@prisma/client";
import { CampaignStatusBadge } from "./campaign-status-badge";
import { Button } from "@/components/ui/button";

export function CampaignTable({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="p-3">Campaign Name</th><th className="p-3">Niche</th><th className="p-3">Location</th><th className="p-3">Daily Limit</th><th className="p-3">Status</th><th className="p-3">Created Date</th><th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="border-t">
              <td className="p-3 font-medium">{campaign.name}</td>
              <td className="p-3">{campaign.niche}</td>
              <td className="p-3">{campaign.country}{campaign.cities.length ? ` (${campaign.cities.join(", ")})` : ""}</td>
              <td className="p-3">{campaign.dailyLimit}</td>
              <td className="p-3"><CampaignStatusBadge status={campaign.status} /></td>
              <td className="p-3">{new Date(campaign.createdAt).toLocaleDateString()}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline"><Link href={`/dashboard/campaigns/${campaign.id}`}>View</Link></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
