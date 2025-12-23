import SemanticCommandCenter from "./component";

export default function SemanticCommandCenterDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -inset-40 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.22),_transparent_60%)]" />
          <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.45),transparent_55%),radial-gradient(circle_at_90%_80%,rgba(168,85,247,0.55),transparent_55%)]" />
        </div>

        <div className="relative z-10 mb-10 space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            React · Framer Motion · Streaming Text
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
            Semantic AI Command Center
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-400 md:text-base">
            A Command+K style palette designed for AI-native interfaces. When it opens,
            the border glows with bio-luminescent energy, the electric frame shifts color
            based on intent, and responses stream in token by token.
          </p>
          <p className="mx-auto max-w-md text-xs text-slate-500">
            Press <span className="rounded border border-slate-600 bg-slate-900/80 px-1.5 py-0.5">⌘ K</span> on macOS or{" "}
            <span className="rounded border border-slate-600 bg-slate-900/80 px-1.5 py-0.5">Ctrl K</span> on Windows/Linux
            to summon the command center. Try phrases like “open analytics dashboard”, “update billing settings”,
            or “create onboarding experiment”.
          </p>
        </div>

        <SemanticCommandCenter />
      </div>
    </div>
  );
}