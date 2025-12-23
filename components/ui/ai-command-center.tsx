"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Sparkles, X, MessageCircle } from "lucide-react";
import BioLuminescentGlow from "./bio-luminescent-glow";
import { ElectricBorder } from "./electric-border";
import { cn } from "@/lib/utils";

type Intent = "default" | "settings" | "navigation" | "action";

type Command = {
  id: string;
  label: string;
  description: string;
  intent: Intent;
  shortcut?: string;
};

type Message = {
  role: "user" | "assistant";
  text: string;
};

interface StreamingState {
  messageIndex: number;
  fullText: string;
}

const COMMANDS: Command[] = [
  {
    id: "open-settings",
    label: "Open Settings",
    description: "Jump directly to the global settings of your app.",
    intent: "settings",
    shortcut: "⌘ ,",
  },
  {
    id: "toggle-theme",
    label: "Toggle Dark Mode",
    description: "Switch between light and dark appearance.",
    intent: "settings",
    shortcut: "⌘ ⇧ D",
  },
  {
    id: "go-dashboard",
    label: "Go to Dashboard",
    description: "Navigate to your primary overview screen.",
    intent: "navigation",
    shortcut: "G D",
  },
  {
    id: "go-components",
    label: "Browse Components",
    description: "Open the components gallery and search patterns.",
    intent: "navigation",
    shortcut: "G C",
  },
  {
    id: "run-cleanup",
    label: "Run Cleanup Action",
    description: "Clear caches and temporary AI state.",
    intent: "action",
    shortcut: "⇧ ⌘ K",
  },
  {
    id: "new-chat",
    label: "Start New AI Chat",
    description: "Reset the conversation and begin a fresh thread.",
    intent: "action",
    shortcut: "⌘ N",
  },
];

const INTENT_THEME: Record<
  Intent,
  {
    border: string;
    glow: string;
    gradient: string;
    background: string;
    bio: string;
    label: string;
  }
> = {
  default: {
    border: "#38bdf8",
    glow: "#0ea5e9",
    gradient: "#6366f1",
    background: "#020617",
    bio: "#22d3ee",
    label: "Semantic",
  },
  settings: {
    border: "#f97373",
    glow: "#ef4444",
    gradient: "#fb7185",
    background: "#111827",
    bio: "#f97373",
    label: "Settings",
  },
  navigation: {
    border: "#60a5fa",
    glow: "#3b82f6",
    gradient: "#4f46e5",
    background: "#020617",
    bio: "#60a5fa",
    label: "Navigation",
  },
  action: {
    border: "#4ade80",
    glow: "#22c55e",
    gradient: "#22c55e",
    background: "#022c22",
    bio: "#4ade80",
    label: "Action",
  },
};

function inferIntentFromQuery(query: string): Intent {
  const value = query.toLowerCase();
  if (!value.trim()) return "default";

  if (
    value.includes("setting") ||
    value.includes("preference") ||
    value.includes("config") ||
    value.includes("theme")
  ) {
    return "settings";
  }
  if (
    value.includes("go to") ||
    value.includes("open ") ||
    value.includes("navigate") ||
    value.includes("route") ||
    value.includes("page") ||
    value.includes("screen")
  ) {
    return "navigation";
  }
  if (
    value.includes("run ") ||
    value.includes("execute") ||
    value.includes("start") ||
    value.includes("stop") ||
    value.includes("toggle") ||
    value.includes("create") ||
    value.includes("launch")
  ) {
    return "action";
  }
  return "default";
}

function buildAssistantResponse(
  intent: Intent,
  command: Command | undefined,
  userText: string
): string {
  const intentLabel = INTENT_THEME[intent].label;

  if (command) {
    switch (intent) {
      case "settings":
        return `I\u2019m treating \u201c${userText}\u201d as a ${intentLabel.toLowerCase()} command.\n\nIn a real app, this is where you would open the \u201c${command.label}\u201d screen or panel, update configuration state, and sync it with your backend.`;
      case "navigation":
        return `Got it \u2014 this looks like a navigation request.\n\nI would route you to \u201c${command.label}\u201d and keep the Command Center open for the next thing you need. Wire this up to your router (Next.js, React Router, or your own navigation system).`;
      case "action":
        return `This reads like an action.\n\nI\u2019d trigger the \u201c${command.label}\u201d workflow, stream back progress updates, and resolve with a final status message. You can connect this slot to any mutation endpoint or automation pipeline.`;
      default:
        return `I\u2019ve parsed \u201c${userText}\u201d as a semantic command.\n\nRight now this is a visual prototype. To make it live, plug this intent into your own command handler and let it dispatch settings, navigation, or actions for your product.`;
    }
  }

  switch (intent) {
    case "settings":
      return `This looks like a settings query, but I couldn't map it to a specific command.\n\nExpose your own settings registry here and match queries to real configuration toggles.`;
    case "navigation":
      return `This feels like navigation.\n\nConnect this command center to your routing layer and map phrases like \u201cgo to billing\u201d or \u201copen analytics\u201d to real destinations.`;
    case "action":
      return `This is likely an action.\n\nYou can wire this to background jobs, automation, or AI tools \u2014 the streaming output area is ready for live updates.`;
    default:
      return `This is a neutral semantic query.\n\nTreat this area as the streaming AI response surface and return structured results, explanations, or follow-up actions.`;
  }
}

interface AICommandCenterProps {
  className?: string;
  showLauncher?: boolean;
}

export function AICommandCenter({ className, showLauncher = true }: AICommandCenterProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ghostText, setGhostText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Ask me to open a screen, change a setting, or run an action. I\u2019ll infer the intent and light up the border.",
    },
  ]);
  const [streaming, setStreaming] = useState<StreamingState | null>(null);

  const normalizedQuery = query.toLowerCase();

  const filteredCommands = useMemo(() => {
    if (!normalizedQuery.trim()) {
      return COMMANDS;
    }
    return COMMANDS.filter((command) => {
      const haystack = (command.label + " " + command.description).toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [normalizedQuery]);

  const highlighted = filteredCommands[selectedIndex] ?? filteredCommands[0];
  const intentFromQuery = inferIntentFromQuery(normalizedQuery);
  const effectiveIntent: Intent = highlighted?.intent ?? intentFromQuery;
  const theme = INTENT_THEME[effectiveIntent];

  const suggestionKey = `${highlighted?.id ?? "none"}-${normalizedQuery}`;

  useEffect(() => {
    if (!highlighted || !query.trim()) {
      setGhostText("");
      return;
    }

    const rawSuggestion = highlighted.label;
    const trimmedQuery = query.trim();
    const lowerSuggestion = rawSuggestion.toLowerCase();
    const lowerQuery = trimmedQuery.toLowerCase();

    let remaining = "";

    if (lowerSuggestion.startsWith(lowerQuery)) {
      remaining = rawSuggestion.slice(trimmedQuery.length);
    } else {
      remaining = rawSuggestion;
    }

    if (!remaining) {
      setGhostText("");
      return;
    }

    let index = 0;
    let timeoutId: number;

    setGhostText("");

    const tick = () => {
      index += 1;
      setGhostText(remaining.slice(0, index));
      if (index < remaining.length) {
        timeoutId = window.setTimeout(tick, 25);
      }
    };

    tick();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [suggestionKey, query, highlighted]);

  useEffect(() => {
    if (!streaming) return;

    const { messageIndex, fullText } = streaming;
    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setMessages((prev) =>
        prev.map((message, i) =>
          i === messageIndex ? { ...message, text: fullText.slice(0, index) } : message
        )
      );

      if (index >= fullText.length) {
        window.clearInterval(intervalId);
        setStreaming(null);
      }
    }, 15);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [streaming]);

  const handleSubmit = useCallback(() => {
    const trimmed = query.trim();
    const currentHighlighted = highlighted;

    if (!trimmed && currentHighlighted) {
      const response = buildAssistantResponse(
        effectiveIntent,
        currentHighlighted,
        currentHighlighted.label
      );
      setMessages((prev) => {
        const updated = [
          ...prev,
          { role: "user", text: currentHighlighted.label },
          { role: "assistant", text: "" },
        ];
        const assistantIndex = updated.length - 1;
        setStreaming({ messageIndex: assistantIndex, fullText: response });
        return updated;
      });
      return;
    }

    if (!trimmed) return;

    const response = buildAssistantResponse(effectiveIntent, currentHighlighted, trimmed);

    setQuery("");
    setSelectedIndex(0);

    setMessages((prev) => {
      const updated = [...prev, { role: "user", text: trimmed }, { role: "assistant", text: "" }];
      const assistantIndex = updated.length - 1;
      setStreaming({ messageIndex: assistantIndex, fullText: response });
      return updated;
    });
  }, [query, effectiveIntent, highlighted]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((previous) => !previous);
        return;
      }

      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((previous) => {
          if (!filteredCommands.length) return previous;
          return Math.min(previous + 1, filteredCommands.length - 1);
        });
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((previous) => {
          if (!filteredCommands.length) return previous;
          return Math.max(previous - 1, 0);
        });
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredCommands.length, handleSubmit]);

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full max-w-3xl px-4"
            >
              <BioLuminescentGlow
                intensity={1.2}
                size={320}
                speed={0.8}
                color={theme.bio}
                className="rounded-[32px]"
              >
                <ElectricBorder
                  titleVisible={false}
                  descriptionVisible={false}
                  labelVisible={true}
                  label={INTENT_THEME[effectiveIntent].label}
                  labelColor="#e5e7eb"
                  borderColor={theme.border}
                  glowColor={theme.glow}
                  gradientColor={theme.gradient}
                  backgroundColor={theme.background}
                  borderRadius={28}
                  height="540px"
                >
                  <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 p-1 text-xs text-gray-300 hover:bg-black/60"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <header className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-black/60">
                        <Sparkles className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
                          Semantic AI Command Center
                        </h2>
                        <p className="text-xs text-gray-500">
                          Command+K modal for chat, navigation, and intent-aware actions.
                        </p>
                      </div>
                      <div className="ml-auto hidden items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-gray-400 md:flex">
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono">
                          ⌘
                        </span>
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono">
                          K
                        </span>
                        <span className="text-gray-500">or</span>
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono">
                          Ctrl
                        </span>
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono">
                          K
                        </span>
                      </div>
                    </header>

                    <section className="space-y-3">
                      <div className="relative flex items-center rounded-2xl border border-white/10 bg-black/60 px-3 py-2">
                        <Search className="mr-3 h-4 w-4 text-gray-500" />
                        <input
                          autoFocus
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder="Ask the AI to open, change, or run something..."
                          className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500 outline-none"
                        />
                        <div className="flex items-center gap-1 text-[11px] text-gray-500">
                          <span className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono md:inline">
                            ↑↓
                          </span>
                          <span className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono md:inline">
                            Enter
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">
                            {query.trim() ||
                              "Try phrases like \u201copen settings\u201d, \u201cgo to dashboard\u201d, or \u201crun cleanup\u201d."}
                          </span>
                          {ghostText && (
                            <span className="text-gray-500/70">{ghostText}</span>
                          )}
                        </div>
                        <span className="ml-2 h-4 w-px animate-blink-border border-r border-gray-400" />
                      </div>
                    </section>

                    <section className="mt-4 grid flex-1 grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.8fr)]">
                      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/50">
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 text-[11px] text-gray-500">
                          <span>Commands</span>
                          <span className="capitalize">{effectiveIntent} intent</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-1">
                          {filteredCommands.map((command, index) => {
                            const isActive = index === selectedIndex;
                            return (
                              <button
                                key={command.id}
                                type="button"
                                onMouseEnter={() => setSelectedIndex(index)}
                                onClick={() => {
                                  setQuery(command.label);
                                  setSelectedIndex(index);
                                  handleSubmit();
                                }}
                                className={cn(
                                  "group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs transition-colors",
                                  isActive
                                    ? "bg-cyan-500/15 text-gray-100"
                                    : "text-gray-400 hover:bg-white/5"
                                )}
                              >
                                <div
                                  className={cn(
                                    "h-2 w-2 rounded-full",
                                    command.intent === "settings" && "bg-red-400",
                                    command.intent === "navigation" && "bg-blue-400",
                                    command.intent === "action" && "bg-green-400",
                                    command.intent === "default" && "bg-cyan-400"
                                  )}
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-medium">
                                      {command.label}
                                    </span>
                                    {command.shortcut && (
                                      <span className="ml-2 text-[10px] font-mono text-gray-500">
                                        {command.shortcut}
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-0.5 text-[11px] text-gray-500">
                                    {command.description}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                          {!filteredCommands.length && (
                            <div className="px-3 py-4 text-[11px] text-gray-500">
                              No matching commands yet. Plug your own command registry into this panel.
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/60">
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 text-[11px] text-gray-500">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3 text-cyan-400" />
                            <span>Streaming AI Response</span>
                          </div>
                          <span className="text-[10px] text-gray-500">
                            Mocked · Bring your own backend
                          </span>
                        </div>
                        <div className="flex-1 space-y-2 overflow-y-auto p-3 text-[11px] leading-relaxed">
                          {messages.map((message, index) => (
                            <div
                              key={`${message.role}-${index}-${message.text.slice(0, 8)}`}
                              className={cn(
                                "max-w-full rounded-lg px-3 py-2",
                                message.role === "assistant"
                                  ? "bg-white/5 text-gray-100"
                                  : "ml-auto bg-cyan-500/20 text-cyan-100"
                              )}
                            >
                              {message.text.split("\n").map((line, lineIndex) => (
                                <p key={lineIndex} className="whitespace-pre-wrap">
                                  {line}
                                </p>
                              ))}
                            </div>
                          ))}
                          {!streaming && (
                            <p className="text-[10px] text-gray-500">
                              Responses are streamed character-by-character to mimic a real LLM. Replace this with your own
                              streaming transport (SSE, WebSockets, or fetch+ReadableStream).
                            </p>
                          )}
                        </div>
                      </div>
                    </section>

                    <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[10px] text-gray-500">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          <span>Settings</span>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                          <span className="h-2 w-2 rounded-full bg-blue-400" />
                          <span>Navigation</span>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                          <span className="h-2 w-2 rounded-full bg-green-400" />
                          <span>Actions</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono">
                          Esc
                        </span>
                        <span>to close</span>
                        <span className="mx-1 text-gray-600">·</span>
                        <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono">
                          ↑↓
                        </span>
                        <span>to move</span>
                        <span className="mx-1 text-gray-600">·</span>
                        <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono">
                          Enter
                        </span>
                        <span>to run</span>
                      </div>
                    </footer>
                  </div>
                </ElectricBorder>
              </BioLuminescentGlow>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showLauncher && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs text-gray-200 shadow-lg shadow-cyan-500/20 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-cyan-300" />
          <span className="hidden sm:inline">Open AI Command Center</span>
          <span className="inline sm:hidden">Command Center</span>
          <span className="ml-1 hidden items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-gray-400 sm:flex">
            ⌘ K
          </span>
        </button>
      )}
    </div>
  );
}

export default AICommandCenter;