"use client";

import AnamorphicTypographyDemo from "@/components/marketing/AnamorphicTypographyDemo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AnamorphicTypographyPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Back button */}
      <Link
        href="/showcase/all"
        className="fixed top-4 left-4 z-50 inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Showcase
      </Link>

      <AnamorphicTypographyDemo />
    </div>
  );
}
