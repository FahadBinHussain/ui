"use client";

import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { AICommandCenterDemo } from "@/components/marketing/AICommandCenterDemo";

export default function AICommandCenterShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="mt-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-cyan-300">
            <Zap className="h-3 w-3" />
            <span>AI · Command Palette · Streaming Text</span>
          </div>
          <h1 className="text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Semantic AI Command Center
            </span>
          </h1>
          <p className="max-w-2xl text-sm text-gray-300 md:text-base">
            A Command+K style modal for AI interaction that blends bio-luminescent glow, electric
            intent-aware borders, and streaming responses into a single semantic command surface.
          </p>
        </div>
      </div>

      <AICommandCenterDemo />

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 text-sm text-gray-300 md:text-base">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-cyan-200">Usage</h2>
          <p>
            The Command Center is a client-side React component that wires together{" "}
            <span className="font-medium text-cyan-300">Framer Motion</span>,{" "}
            <span className="font-medium text-cyan-300">bio-luminescent glow</span>, and the{" "}
            <span className="font-medium text-cyan-300">ElectricBorder</span> to create an AI-native
            command palette.
          </p>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/60">
            <div className="border-b border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-400">
              Install &amp; Import
            </div>
            <div className="space-y-4 px-4 py-4 text-xs md:text-sm">
              <p className="text-gray-400">Import the component anywhere in your app:</p>
              <pre className="overflow-x-auto rounded-lg bg-black/80 p-4 text-[11px] leading-relaxed text-gray-200">
                <code>{`import { AICommandCenter } from "@/components/ui/ai-command-center";

export function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      {/* Launcher button + ⌘K / Ctrl+K shortcut */}
      <AICommandCenter />
    </main>
  );
}`}</code>
              </pre>
              <p className="text-gray-400">
                Press <span className="rounded bg-white/5 px-1 py-0.5 font-mono text-[11px]">⌘ K</span> (macOS) or{" "}
                <span className="rounded bg-white/5 px-1 py-0.5 font-mono text-[11px]">Ctrl K</span> (Windows/Linux) to open
                the modal.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-white/10 bg-black/60 p-5">
            <h3 className="text-base font-semibold text-cyan-200">Intent-aware Electric Border</h3>
            <p>
              The border colors and glow are driven by a simple{" "}
              <span className="font-mono text-xs text-cyan-300">intent</span> classifier that inspects
              the query and matched command:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
              <li>
                <span className="font-medium text-red-300">Red</span> for settings / configuration verbs.
              </li>
              <li>
                <span className="font-medium text-blue-300">Blue</span> for navigation and routing.
              </li>
              <li>
                <span className="font-medium text-green-300">Green</span> for actions and workflows.
              </li>
            </ul>
            <p className="pt-1 text-xs text-gray-500">
              Swap out the classifier with your own intent model or rules engine and feed those values into the
              border theme.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-white/10 bg-black/60 p-5">
            <h3 className="text-base font-semibold text-cyan-200">Streaming AI Text Surface</h3>
            <p>
              The right-hand panel streams assistant responses character-by-character to mimic an LLM. It is
              intentionally backend-agnostic:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
              <li>Wire it to Server-Sent Events, WebSockets, or fetch + ReadableStream.</li>
              <li>Use the current intent and command metadata to decide which tool or endpoint to call.</li>
              <li>Replace the mock copy with real AI output while preserving the streaming experience.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-white/10 bg-black/60 p-5">
          <h3 className="text-base font-semibold text-cyan-200">Ghost Typeahead &amp; Command List</h3>
          <p>
            As you type, the Command Center doesn&apos;t just filter a list. It uses a{" "}
            <span className="font-medium text-cyan-300">typewriter-style ghost suggestion</span> that softly
            completes your current phrase based on the top-matched command.
          </p>
          <p className="text-sm text-gray-300">
            This is rendered as muted gray text next to your live input, with a blinking caret driven by a small
            CSS animation defined in <code className="rounded bg-white/10 px-1 py-0.5">globals.css</code>. The
            command list itself is fully keyboard-accessible (↑/↓ + Enter).
          </p>
        </section>
      </div>
    </div>
  );
}