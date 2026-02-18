"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { UseFormReturn } from "react-hook-form";
import { CampaignFormValues } from "@/types/campaign";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { outreachPreview } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "./tag-input";

export function CampaignFormStepOutreach({ form }: { form: UseFormReturn<CampaignFormValues> }) {
  const tone = form.watch("outreachTone");
  const daily = form.watch("dailyLimit");

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block">Outreach Tone</Label>
        <RadioGroup value={tone} onValueChange={(v) => form.setValue("outreachTone", v as CampaignFormValues["outreachTone"], { shouldValidate: true })} className="grid gap-3">
          {(["FORMAL", "FRIENDLY", "AGGRESSIVE"] as const).map((item) => (
            <label key={item} className="flex items-center gap-2 rounded-md border p-3">
              <RadioGroupItem value={item} />
              <span>{item}</span>
            </label>
          ))}
        </RadioGroup>
        <p className="mt-2 rounded-md bg-slate-100 p-2 text-sm text-slate-600">Preview: {outreachPreview[tone]}</p>
      </div>

      <div>
        <Label className="mb-1">Daily Outreach Limit</Label>
        <Input type="number" min={1} max={500} {...form.register("dailyLimit", { valueAsNumber: true })} />
        <p className="mt-1 text-sm text-slate-600">Estimated weekly outreach: {(daily || 0) * 7}</p>
        <p className="mt-1 text-xs text-red-500">{form.formState.errors.dailyLimit?.message}</p>
      </div>

      <Collapsible.Root>
        <Collapsible.Trigger className="rounded-md border px-3 py-2 text-sm font-medium">Advanced Settings</Collapsible.Trigger>
        <Collapsible.Content className="mt-4 space-y-4 rounded-lg border p-4">
          {[
            ["includeLinkedIn", "Include LinkedIn scraping"],
            ["includeGoogleMaps", "Include Google Maps scraping"],
            ["verifiedEmailsOnly", "Require verified email only"],
            ["excludeFreeEmails", "Exclude free emails"],
          ].map(([field, label]) => (
            <div key={field} className="flex items-center justify-between">
              <Label>{label}</Label>
              <Switch checked={form.watch(field as keyof CampaignFormValues) as boolean} onCheckedChange={(checked) => form.setValue(field as keyof CampaignFormValues, checked as never)} />
            </div>
          ))}
          <div>
            <Label className="mb-1">Blacklist keywords</Label>
            <TagInput value={form.watch("blacklistKeywords")} onChange={(v) => form.setValue("blacklistKeywords", v)} placeholder="agency, freelancer" />
          </div>
          <div>
            <Label className="mb-1">Include keywords</Label>
            <TagInput value={form.watch("includeKeywords")} onChange={(v) => form.setValue("includeKeywords", v)} placeholder="b2b, growth" />
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}
