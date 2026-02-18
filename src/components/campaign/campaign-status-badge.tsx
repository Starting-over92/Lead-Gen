import { CampaignStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  if (status === CampaignStatus.ACTIVE) return <Badge variant="success">ACTIVE</Badge>;
  if (status === CampaignStatus.PAUSED) return <Badge variant="warning">PAUSED</Badge>;
  if (status === CampaignStatus.COMPLETED) return <Badge variant="secondary">COMPLETED</Badge>;
  return <Badge>DRAFT</Badge>;
}
