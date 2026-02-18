import { NextResponse } from "next/server";
import { campaignFormSchema } from "@/types/campaign";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { normalizeCampaign, serializeCampaignCreateData } from "@/lib/campaign";

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = campaignFormSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await prisma.user.upsert({ where: { id: user.id }, update: { email: user.email }, create: { id: user.id, email: user.email } });

  const campaign = await prisma.campaign.create({
    data: { ...serializeCampaignCreateData(parsed.data), userId: user.id, status: "DRAFT" },
  });
  return NextResponse.json({ id: campaign.id }, { status: 201 });
}

export async function GET(request: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const campaigns = await prisma.campaign.findMany({
    where: { userId: user.id, ...(status ? { status: status as never } : {}) },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(campaigns.map(normalizeCampaign));
}
