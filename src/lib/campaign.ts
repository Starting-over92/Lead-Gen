import { Campaign, Prisma } from "@prisma/client";

function jsonArrayToStrings(value: Prisma.JsonValue): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
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
    cities: jsonArrayToStrings(campaign.cities),
    jobTitles: jsonArrayToStrings(campaign.jobTitles),
    blacklistKeywords: jsonArrayToStrings(campaign.blacklistKeywords),
    includeKeywords: jsonArrayToStrings(campaign.includeKeywords),
  };
}
