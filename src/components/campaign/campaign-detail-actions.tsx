"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CampaignDetailActions({ id }: { id: string }) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  async function doAction(action: "activate" | "pause" | "delete") {
    setLoading(action);
    try {
      const endpoint = action === "delete" ? `/api/campaigns/${id}` : `/api/campaigns/${id}/${action}`;
      const method = action === "delete" ? "DELETE" : "POST";
      const response = await fetch(endpoint, { method });
      if (!response.ok) throw new Error("Action failed");
      toast.success(`Campaign ${action}d`);
      if (action === "delete") router.push("/dashboard/campaigns");
      else router.refresh();
    } catch {
      toast.error("Unable to update campaign");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => doAction("activate")} disabled={!!loading}>Activate Campaign</Button>
      <Button variant="secondary" onClick={() => doAction("pause")} disabled={!!loading}>Pause Campaign</Button>
      <Button variant="outline" onClick={() => router.push(`/dashboard/campaigns/new?id=${id}`)} disabled={!!loading}>Edit Campaign</Button>
      <Button variant="destructive" onClick={() => doAction("delete")} disabled={!!loading}>Delete Campaign</Button>
    </div>
  );
}
