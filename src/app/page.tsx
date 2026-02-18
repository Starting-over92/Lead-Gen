import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl items-center justify-center p-6">
      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold">AI Lead Gen Dashboard</h1>
        <p className="mt-2 text-slate-600">Build and manage lead generation campaigns.</p>
        <Button asChild className="mt-6">
          <Link href="/dashboard/campaigns">Go to Campaigns</Link>
        </Button>
      </div>
    </main>
  );
}
