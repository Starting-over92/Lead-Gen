import { CampaignFormValues } from "@/types/campaign";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CampaignReviewCard({ values }: { values: CampaignFormValues }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Campaign</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <p><strong>Name:</strong> {values.name}</p>
        <p><strong>Niche:</strong> {values.niche}</p>
        <p><strong>Location:</strong> {values.country} {values.cities.length ? `(${values.cities.join(", ")})` : ""}</p>
        <p><strong>Company Size:</strong> {values.companySizeLabel}</p>
        <p><strong>Job Titles:</strong> {values.jobTitles.join(", ")}</p>
        <p><strong>Outreach Tone:</strong> {values.outreachTone}</p>
        <p><strong>Daily / Weekly:</strong> {values.dailyLimit} / {values.dailyLimit * 7}</p>
        <p><strong>LinkedIn:</strong> {values.includeLinkedIn ? "Yes" : "No"}</p>
        <p><strong>Google Maps:</strong> {values.includeGoogleMaps ? "Yes" : "No"}</p>
        <p><strong>Verified emails only:</strong> {values.verifiedEmailsOnly ? "Yes" : "No"}</p>
        <p><strong>Exclude free emails:</strong> {values.excludeFreeEmails ? "Yes" : "No"}</p>
      </CardContent>
    </Card>
  );
}
