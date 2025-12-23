"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ElectricBorder } from "@/components/ui/electric-border";
import BioLuminescentGlow from "@/components/ui/bio-luminescent-glow";
import { cn } from "@/lib/utils";
import {
  Command,
  Compass,
  CornerDownLeft,
  MessageSquare,
  Play,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";

type Intent = "navigation" | "settings" | "action" | "chat";

interface IntentConfig {
  label: string;
  borderColor: string;
  glowColor: string;
  gradientColor: string;
  backgroundColor: string;
  glowAccent: string;
}

const INTENT_CONFIG: Record<Intent, IntentConfig> = {
  navigation: {
    label: "Navigation",
    borderColor: "#3b82f6",
    glowColor: "#60a5fa",
    gradientColor: "#2563eb",
    backgroundColor: "#020617",
    glowAccent: "#38bdf8",
  },
  settings: {
    label: "Settings",
    borderColor: "#ef4444",
    glowColor: "#f97373",
    gradientColor: "#b91c1c",
    backgroundColor: "#1b0709",
    glowAccent: "#fb7185",
  },
  action: {
    label: "Action",
    borderColor: "#22c55e",
    glowColor: "#4ade80",
    gradientColor: "#16a34a",
    backgroundColor: "#03140b",
    glowAccent: "#22c55e",
  },
  chat: {
    label: "AI Chat",
    borderColor: "#a855f7",
    glowColor: "#c084fc",
    gradientColor: "#7c3aed",
    backgroundColor: "#050816",
    glowAccent: "#8b5cf6",
  },
};

interface CommandItem {
  id: string;
  label: string;
  hint: string;
  intent: Intent;
  shortcut?: string;
  keywords: string[];
}

const COMMANDS: CommandItem[] = [
  {
    id: "open-dashboard",
    label: "Open analytics dashboard",
    hint: "Navigate to /analytics/overview",
    intent: "navigation",
    shortcut: "G D",
    keywords: ["dashboard", "analytics", "metrics", "charts", "reports"],
  },
  {
    id: "goto-settings",
    label: "Open workspace settings",
    hint: "Account, billing, notifications, and security",
    intent: "settings",
    shortcut: "S S",
    keywords: ["settings", "preferences", "billing", "account", "profile"],
  },
  {
    id: "change-theme",
    label: "Switch to dark theme",
    hint: "Toggle appearance presets",
    intent: "settings",
    shortcut: "T D",
    keywords: ["theme", "dark mode", "light mode", "appearance"],
  },
  {
    id: "start-experiment",
    label: "Create new experiment",
    hint: "Spin up an A/B test with defaults",
    intent: "action",
    shortcut: "X N",
    keywords: ["experiment", "a/b", "ab test", "test", "variant"],
  },
  {
    id: "summarize-page",
    label: "Summarize the current page",
    hint: "Ask AI for a concise, semantic summary",
    intent: "chat",
    shortcut: "⌘ ⏎",
    keywords: ["summarize", "tl;dr", "explain", "overview"],
  },
  {
    id: "ask-anything",
    label: "Ask the AI anything",
    hint: "Freeform natural language question",
    intent: "chat",
    shortcut: "?",
    keywords: ["help", "how do i", "question", "why", "what is"],
  },
];

type Role = "assistant" | "user";

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}

function detectIntentFromText(text: string): Intent {
  const value = text.trim().toLowerCase();
  if (!value) return "chat";

  const matchedCommand = COMMANDS.find(
    (cmd) =>
      cmd.label.toLowerCase().startsWith(value) ||
      cmd.keywords.some((k) => value.includes(k)),
  );
  if (matchedCommand) return matchedCommand.intent;

  if (
    /(setting|preference|config|configuration|account|billing|notification|theme|appearance)/.test(
      value,
    )
  ) {
    return "settings";
  }

  if (
    /(go to|open|navigate|show|take me to|jump to|view)/.test(value) ||
    /^\/[a-z]/.test(value)
  ) {
    return "navigation";
  }

  if (
    /^(run|create|deploy|start|stop|schedule|trigger|generate|launch|execute)\b/.test(
      value,
    )
  ) {
    return "action";
  }

  return "chat";
}

function pickCommandSuggestion(query: string): CommandItem | null {
  const value = query.trim().toLowerCase();
  if (!value) return COMMANDS[0];

  return (
    COMMANDS.find((cmd) =>
      cmd.label.toLowerCase().startsWith(value),
    ) ??
    COMMANDS.find((cmd) =>
      cmd.keywords.some((k) => k.includes(value) || value.includes(k)),
    ) ??
    COMMANDS[0]
  );
}

function buildAssistantResponse(
  prompt: string,
  intent: Intent,
  command: CommandItem | null,
): string {
  const basePrompt = prompt.trim();
  const normalized = basePrompt || "your request";

  if (intent === "navigation") {
    return (
      `I’d route you to the right surface for “${normalized}”. ` +
      (command
        ? `Concretely, this maps to the “${command.label}” navigation intent, which would open ${command.hint.toLowerCase()}. `
        : "") +
      "Because this is semantic, the underlying matcher doesn’t care about exact wording—only where you’re trying to go."
    );
  }

  if (intent === "settings") {
    return (
      `Got it — “${normalized}” looks like a settings update. ` +
      (command
        ? `Internally I’d resolve this to “${command.label}” and pre-load the relevant settings surface (${command.hint.toLowerCase()}). `
        : "") +
      "From here I’d highlight the fields that are most likely relevant so you only tweak what matters."
    );
  }

  if (intent === "action") {
    return (
      `“${normalized}” is classified as an executable action. ` +
      (command
        ? `I’d treat this as “${command.label}” and prepare a dry-run payload before actually executing anything. `
        : "") +
      "In a real integration this is where we’d stream logs, confirmations, and any safety checks back into the command center."
    );
  }

  return (
    `Here’s how I’d treat “${normalized}” inside the command center: ` +
    (command
      ? `it’s closest to the “${command.label}” pattern, but I’ll keep this in freeform chat so you can refine the request. `
      : "") +
    "This surface is meant to blur the line between search, navigation, and execution — you start with language, and I resolve it into intent."
  );
}

export default function SemanticCommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content:
        "Hi, I’m your semantic command center. Ask me to navigate, tweak settings, or run an action — I’ll classify the intent in real time.",
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [ghostText, setGhostText] = useState("");
  const [displayIntent, setDisplayIntent] = useState<Intent>("chat");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const streamIntervalRef = useRef<number | null>(null);

  const activeCommand = useMemo(
    () => pickCommandSuggestion(query),
    [query],
  );

  useEffect(() => {
    setDisplayIntent(detectIntentFromText(query));
  }, [query]);

  useEffect(() => {
    const baseLabel = activeCommand?.label ?? "";
    const trimmed = query.trim();
    const normalized = trimmed.toLowerCase();

    let suggestion = "";
    if (!baseLabel) {
      setGhostText("");
      return;
    }

    if (!normalized) {
      suggestion = baseLabel;
    } else if (baseLabel.toLowerCase().startsWith(normalized)) {
      suggestion = baseLabel.slice(trimmed.length);
    } else {
      suggestion = baseLabel;
    }

    setGhostText("");

    if (!suggestion) return;

    let index = 0;
    let timer: number;

    const step = () => {
      index += 1;
      setGhostText(suggestion.slice(0, index));
      if (index < suggestion.length) {
        timer = window.setTimeout(step, 22);
      }
    };

    timer = window.setTimeout(step, 60);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeCommand, query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (key === "escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isStreaming]);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current !== null) {
        window.clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const intent = detectIntentFromText(trimmed);
    const command = pickCommandSuggestion(trimmed);
    const assistantText = buildAssistantResponse(trimmed, intent, command);

    const userId = `user-${Date.now()}`;
    const assistantId = `assistant-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: trimmed },
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setQuery("");
    setGhostText("");
    setDisplayIntent(intent);

    if (streamIntervalRef.current !== null) {
      window.clearInterval(streamIntervalRef.current);
    }

    setIsStreaming(true);
    let index = 0;

    streamIntervalRef.current = window.setInterval(() => {
      index += 1;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: assistantText.slice(0, index) }
            : msg,
        ),
      );
      if (index >= assistantText.length) {
        if (streamIntervalRef.current !== null) {
          window.clearInterval(streamIntervalRef.current);
        }
        setIsStreaming(false);
      }
    }, 16);
  };

  const intentConfig = INTENT_CONFIG[displayIntent];

  const intentIcon =
    displayIntent === "navigation"
      ? Compass
      : displayIntent === "settings"
        ? Settings2
        : displayIntent === "action"
          ? Play
          : MessageSquare;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ai-command-center-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key="ai-command-center-shell"
              className="w-full max-w-3xl px-4"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <BioLuminescentGlow
                intensity={1.3}
                color={intentConfig.glowAccent}
                size={360}
                speed={1}
                className="rounded-[32px]"
              >
                <div className="relative rounded-[28px]">
                  <ElectricBorder
                    titleVisible={false}
                    descriptionVisible={false}
                    labelVisible={false}
                    borderColor={intentConfig.borderColor}
                    glowColor={intentConfig.glowColor}
                    gradientColor={intentConfig.gradientColor}
                    backgroundColor={intentConfig.backgroundColor}
                    shadowColor="rgba(15,23,42,0.9)"
                    borderRadius={28}
                    height="520px"
                    className="relative overflow-hidden"
                  >
                    <div className="relative z-10 flex h-full w-full flex-col items-stretch justify-between px-6 py-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/70 bg-slate-900/80 shadow-[0_0_25px_rgba(148,163,184,0.35)]">
                            <Command className="h-4 w-4 text-slate-100" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-sm font-semibold text-slate-100">
                              Semantic Command Center
                            </p>
                            <p className="text-xs text-slate-400">
                              One surface for navigation, settings, and actions —
                              driven entirely by language.
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-400 hover:text-slate-100 hover:border-slate-500 transition-colors"
                            aria-label="Close command center"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-1">
                              <span className="text-[9px]">⌘</span>
                              <span>K</span>
                            </span>
                            <span className="opacity-60">or</span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-1">
                              <span className="text-[9px]">Ctrl</span>
                              <span>K</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className="mt-5 rounded-2xl border border-slate-700/80 bg-slate-950/80 px-3.5 py-2.5 shadow-[0_0_0_1px_rgba(15,23,42,0.8),0_40px_120px_rgba(15,23,42,0.95)]"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/70 bg-slate-900/90"
                            style={{
                              boxShadow: `0 0 20px ${intentConfig.glowColor}33`,
                            }}
                          >
                            {React.createElement(intentIcon, {
                              className: "h-4 w-4 text-slate-100",
                            })}
                          </div>
                          <div className="relative flex-1 text-sm leading-relaxed">
                            <input
                              ref={inputRef}
                              value={query}
                              onChange={(event) => setQuery(event.target.value)}
                              placeholder=""
                              autoFocus
                              className="absolute inset-0 h-full w-full bg-transparent text-transparent caret-cyan-400 outline-none"
                            />
                            <div className="pointer-events-none font-mono text-[13px] text-slate-100">
                              <span
                                className={cn(
                                  query
                                    ? "text-slate-100"
                                    : "text-slate-500/80",
                                )}
                              >
                                {query ||
                                  "Ask AI to open, configure, or run anything…"}
                              </span>
                              {query && (
                                <span className="text-slate-500/70">
                                  {ghostText}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-600/80 bg-slate-900/80 px-3 py-1.5 text-[11px] font-medium text-slate-100 hover:border-cyan-400 hover:text-cyan-100 hover:bg-slate-900 transition-colors"
                          >
                            <CornerDownLeft className="h-3.5 w-3.5" />
                            <span>Send</span>
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                          <div className="flex items-center gap-2">
                            <span className="relative inline-flex h-2.5 w-2.5">
                              <span
                                className="absolute inline-flex h-full w-full rounded-full opacity-60"
                                style={{
                                  backgroundColor: intentConfig.glowColor,
                                  boxShadow: `0 0 18px ${intentConfig.glowColor}`,
                                }}
                              />
                              <span
                                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                                style={{
                                  backgroundColor: intentConfig.borderColor,
                                }}
                              />
                            </span>
                            <span className="tracking-[0.22em] uppercase text-[10px] text-slate-300">
                              {intentConfig.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            {activeCommand && (
                              <div className="hidden sm:flex items-center gap-1.5 text-slate-500">
                                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                                <span className="max-w-[220px] truncate">
                                  Suggestion: {activeCommand.label}
                                </span>
                                {activeCommand.shortcut && (
                                  <span className="ml-1 inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300">
                                    {activeCommand.shortcut}
                                  </span>
                                )}
                              </div>
                            )}
                            {isStreaming && (
                              <div className="flex items-center gap-1 text-cyan-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                <span>Streaming</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </form>

                      <div className="mt-4 flex-1 rounded-2xl border border-slate-800/80 bg-slate-950/85 px-3.5 py-3">
                        <div
                          ref={messagesRef}
                          className="h-full space-y-3 overflow-y-auto pr-1 text-sm"
                        >
                          {messages.map((message) => {
                            const isAssistant = message.role === "assistant";
                            return (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.18 }}
                                className={cn(
                                  "flex gap-2",
                                  isAssistant
                                    ? "items-start"
                                    : "items-start justify-end",
                                )}
                              >
                                {isAssistant && (
                                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[10px] font-medium text-slate-100">
                                    AI
                                  </div>
                                )}
                                <div
                                  className={cn(
                                    "max-w-[75%] rounded-2xl px-3 py-2 text-left",
                                    isAssistant
                                      ? "border border-slate-700/80 bg-slate-900/90 text-slate-100"
                                      : "ml-auto bg-cyan-500/90 text-slate-950",
                                  )}
                                >
                                  {message.content}
                                </div>
                                {!isAssistant && (
                                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-medium text-slate-950">
                                    You
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                          {!messages.length && (
                            <p className="text-xs text-slate-500">
                              No messages yet. Type a command above to begin.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
                        <span>
                          Semantic routing · Electric borders · Bio-luminescent
                          glow · Streaming tokens
                        </span>
                        <span className="hidden sm:inline">
                          Esc to close · Cmd/Ctrl + K to reopen
                        </span>
                      </div>
                    </div>
                  </ElectricBorder>
                </div>
              </BioLuminescentGlow>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
        <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-slate-800/80 bg-slate-950/90 px-3 py-1.5 text-[11px] text-slate-200 shadow-[0_18px_60px_rgba(15,23,42,0.85)] backdrop-blur-xl">
          <div className="hidden items-center gap-1 text-slate-400 md:flex">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            <span>Semantic AI Command Center</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-[11px] font-medium text-slate-100 hover:border-cyan-400 hover:text-cyan-100 hover:bg-slate-900 transition-colors"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Open (⌘K / Ctrl K)</span>
          </button>
        </div>
      </div>
    </>
  );
}