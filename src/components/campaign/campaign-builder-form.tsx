"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CampaignStatus, OutreachTone } from "@prisma/client";
import { campaignFormSchema, CampaignFormValues } from "@/types/campaign";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CampaignStepper } from "./campaign-stepper";
import { CampaignFormStepTargeting } from "./campaign-form-step-targeting";
import { CampaignFormStepOutreach } from "./campaign-form-step-outreach";
import { CampaignReviewCard } from "./campaign-review-card";

export function CampaignBuilderForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      niche: "",
      country: "",
      cities: [],
      companySizeLabel: "11-50",
      companySizeMin: 11,
      companySizeMax: 50,
      jobTitles: [],
      outreachTone: OutreachTone.FORMAL,
      dailyLimit: 50,
      includeLinkedIn: true,
      includeGoogleMaps: true,
      verifiedEmailsOnly: false,
      excludeFreeEmails: true,
      blacklistKeywords: [],
      includeKeywords: [],
      status: CampaignStatus.DRAFT,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Failed to create campaign");
      toast.success("Campaign created");
      router.push(`/dashboard/campaigns/${data.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Builder Module</CardTitle>
      </CardHeader>
      <CardContent>
        <CampaignStepper currentStep={step} />
        <form className="space-y-6" onSubmit={onSubmit}>
          {step === 1 && <CampaignFormStepTargeting form={form} />}
          {step === 2 && <CampaignFormStepOutreach form={form} />}
          {step === 3 && <CampaignReviewCard values={form.getValues()} />}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1 || loading}>Back</Button>
            {step < 3 ? (
              <Button type="button" onClick={() => setStep((s) => Math.min(3, s + 1))}>Next</Button>
            ) : (
              <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Campaign"}</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
