import { CampaignStatus, OutreachTone } from "@prisma/client";
import { z } from "zod";

export const toneOptions = [OutreachTone.FORMAL, OutreachTone.FRIENDLY, OutreachTone.AGGRESSIVE] as const;

export const campaignFormSchema = z.object({
  name: z.string().min(3, "Campaign name is required"),
  niche: z.string().min(2, "Niche is required"),
  country: z.string().min(2, "Country is required"),
  cities: z.array(z.string().min(1)).default([]),
  companySizeLabel: z.string().min(1, "Company size is required"),
  companySizeMin: z.number().int().positive().optional().nullable(),
  companySizeMax: z.number().int().positive().optional().nullable(),
  jobTitles: z.array(z.string().min(1)).min(1, "At least one title is required").max(20, "Max 20 titles"),
  outreachTone: z.nativeEnum(OutreachTone),
  dailyLimit: z.number().min(1).max(500),
  includeLinkedIn: z.boolean().default(true),
  includeGoogleMaps: z.boolean().default(true),
  verifiedEmailsOnly: z.boolean().default(false),
  excludeFreeEmails: z.boolean().default(true),
  blacklistKeywords: z.array(z.string()).default([]),
  includeKeywords: z.array(z.string()).default([]),
  status: z.nativeEnum(CampaignStatus).default(CampaignStatus.DRAFT),
});

export type CampaignFormValues = z.infer<typeof campaignFormSchema>;
