import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campaign Builder Module",
  description: "Lead generation campaign setup",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
