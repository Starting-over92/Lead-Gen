"use client";

import { Info } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CampaignFormValues } from "@/types/campaign";
import { companySizePresets, countries, nicheJobTitleSuggestions } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/campaign/tag-input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function CampaignFormStepTargeting({ form }: { form: UseFormReturn<CampaignFormValues> }) {
  const niche = form.watch("niche");
  const nicheSuggestions = nicheJobTitleSuggestions[niche.toLowerCase()] ?? [];

  return (
    <TooltipProvider>
      <div className="grid gap-4">
        <div>
          <Label className="mb-1 inline-flex items-center gap-1">Campaign Name <Info className="h-3 w-3" /></Label>
          <Input {...form.register("name")} />
          <p className="mt-1 text-xs text-red-500">{form.formState.errors.name?.message}</p>
        </div>
        <div>
          <Label className="mb-1 inline-flex items-center gap-1">Niche / Industry
            <Tooltip>
              <TooltipTrigger asChild><button type="button"><Info className="h-3 w-3" /></button></TooltipTrigger>
              <TooltipContent>Define your target market segment.</TooltipContent>
            </Tooltip>
          </Label>
          <Input {...form.register("niche")} />
          <p className="mt-1 text-xs text-red-500">{form.formState.errors.niche?.message}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label className="mb-1">Country</Label>
            <select className="h-10 w-full rounded-md border bg-white px-3 text-sm" {...form.register("country")}>
              <option value="">Select country</option>
              {countries.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
            <p className="mt-1 text-xs text-red-500">{form.formState.errors.country?.message}</p>
          </div>
          <div>
            <Label className="mb-1">Cities</Label>
            <TagInput value={form.watch("cities")} onChange={(v) => form.setValue("cities", v, { shouldValidate: true })} placeholder="Dubai, Abu Dhabi..." />
          </div>
        </div>
        <div>
          <Label className="mb-1">Company Size</Label>
          <input list="company-size" className="h-10 w-full rounded-md border bg-white px-3 text-sm" {...form.register("companySizeLabel")} />
          <datalist id="company-size">{companySizePresets.map((s) => <option key={s} value={s} />)}</datalist>
          <p className="mt-1 text-xs text-red-500">{form.formState.errors.companySizeLabel?.message}</p>
        </div>
        <div>
          <Label className="mb-1">Job Titles</Label>
          <TagInput
            max={20}
            value={form.watch("jobTitles")}
            onChange={(v) => form.setValue("jobTitles", v, { shouldValidate: true })}
            placeholder="Add job title and press enter"
            suggestions={nicheSuggestions}
          />
          <p className="mt-1 text-xs text-red-500">{form.formState.errors.jobTitles?.message as string}</p>
        </div>
      </div>
    </TooltipProvider>
  );
}
