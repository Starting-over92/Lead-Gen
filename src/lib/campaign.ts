import { Campaign, Prisma } from "@prisma/client";
import { CampaignFormValues } from "@/types/campaign";

function textArrayToStrings(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export type CampaignView = Omit<Campaign, "cities" | "jobTitles" | "blacklistKeywords" | "includeKeywords"> & {
  cities: string[];
  jobTitles: string[];
  blacklistKeywords: string[];
  includeKeywords: string[];
};

export function normalizeCampaign(campaign: Campaign): CampaignView {
  return {
    ...campaign,
    cities: textArrayToStrings(campaign.cities),
    jobTitles: textArrayToStrings(campaign.jobTitles),
    blacklistKeywords: textArrayToStrings(campaign.blacklistKeywords),
    includeKeywords: textArrayToStrings(campaign.includeKeywords),
  };
}

export function serializeCampaignCreateData(values: CampaignFormValues): Omit<Prisma.CampaignUncheckedCreateInput, "userId" | "status"> {
  return {
    ...values,
    cities: JSON.stringify(values.cities),
    jobTitles: JSON.stringify(values.jobTitles),
    blacklistKeywords: JSON.stringify(values.blacklistKeywords),
    includeKeywords: JSON.stringify(values.includeKeywords),
  };
}

export function serializeCampaignUpdateData(values: Partial<CampaignFormValues>): Prisma.CampaignUpdateInput {
  const payload: Prisma.CampaignUpdateInput = {};

  if ("name" in values) payload.name = values.name;
  if ("niche" in values) payload.niche = values.niche;
  if ("country" in values) payload.country = values.country;
  if ("companySizeLabel" in values) payload.companySizeLabel = values.companySizeLabel;
  if ("companySizeMin" in values) payload.companySizeMin = values.companySizeMin;
  if ("companySizeMax" in values) payload.companySizeMax = values.companySizeMax;
  if ("outreachTone" in values) payload.outreachTone = values.outreachTone;
  if ("dailyLimit" in values) payload.dailyLimit = values.dailyLimit;
  if ("includeLinkedIn" in values) payload.includeLinkedIn = values.includeLinkedIn;
  if ("includeGoogleMaps" in values) payload.includeGoogleMaps = values.includeGoogleMaps;
  if ("verifiedEmailsOnly" in values) payload.verifiedEmailsOnly = values.verifiedEmailsOnly;
  if ("excludeFreeEmails" in values) payload.excludeFreeEmails = values.excludeFreeEmails;
  if ("status" in values) payload.status = values.status;

  if ("cities" in values) payload.cities = JSON.stringify(values.cities ?? []);
  if ("jobTitles" in values) payload.jobTitles = JSON.stringify(values.jobTitles ?? []);
  if ("blacklistKeywords" in values) payload.blacklistKeywords = JSON.stringify(values.blacklistKeywords ?? []);
  if ("includeKeywords" in values) payload.includeKeywords = JSON.stringify(values.includeKeywords ?? []);

  return payload;
}
