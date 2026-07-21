"use client";
import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Trash2,
  ArrowLeft,
  Zap,
  LayoutDashboard,
  FileText,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import useAI from "@/hooks/useAI";
import UseBoard from "@/hooks/useBoard";

const TaskoraAI = () => {
  const {
    messages,
    loading,
    error,
    sendMessage,
    suggestTasks,
    generateTaskDescription,
    summarizeBoard,
    clearChat,
  } = useAI();
  const { boards, columns } = UseBoard();
  const [input, setInput] = useState("");
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState("");
  const [activeTab, setActiveTab] = useState<
    "chat" | "suggest" | "describe" | "summary"
  >("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput("");
    await sendMessage(msg);
  };

  const handleSuggestTasks = async () => {
    const board = boards.find((b) => b.id === selectedBoard);
    if (!board) return;
    await suggestTasks(board.name, columns);
    setActiveTab("chat");
  };

  const handleDescribe = async () => {
    if (!taskTitle.trim()) return;
    await generateTaskDescription(taskTitle.trim());
    setTaskTitle("");
    setActiveTab("chat");
  };

  const handleSummary = async () => {
    const board = boards.find((b) => b.id === selectedBoard);
    if (!board) return;
    await summarizeBoard(board, columns);
    setActiveTab("chat");
  };

  const quickPrompts = [
    "How can I be more productive?",
    "Help me prioritize my tasks",
    "What's a good daily workflow?",
    "Tips for managing deadlines",
  ];

  return (
    <div className="relative min-h-screen bg-[#080d0b] font-[Inter,sans-serif] flex flex-col">
      <div
        className="pointer-events-none fixed inset-0 z-1 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="pointer-events-none fixed -top-20 -right-16 w-105 h-105 z-0"
        style={{
          background: "radial-gradient(circle, #1a3d2b 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed -bottom-24 -left-20 w-95 h-95 z-0"
        style={{
          background: "radial-gradient(circle, #0f2d1c 0%, transparent 70%)",
        }}
      />

      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/6 bg-[#080d0b]/70 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/boards"
            className="flex items-center gap-1.5 text-white/40 hover:text-[#c8f0a0] transition-colors text-xs border border-white/10 px-2.5 py-1.5 rounded-md bg-white/4 hover:bg-white/8"
          >
            <ArrowLeft size={12} /> Boards
          </Link>
          <span className="text-white/15">·</span>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#c8f0a0] flex items-center justify-center">
              <Zap size={11} className="text-[#080d0b]" />
            </div>
            <h1
              className="text-sm font-bold text-[#c8f0a0]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Taskora AI
            </h1>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center gap-1.5 text-white/25 hover:text-red-400 transition-colors text-[11px] border border-white/8 px-2.5 py-1.5 rounded-md hover:border-red-400/20"
        >
          <Trash2 size={11} /> Clear
        </button>
      </nav>

      <div className="relative z-10 flex flex-1 overflow-hidden">
        <aside className="hidden md:flex flex-col w-56 border-r border-white/6 px-3 py-4 gap-1 shrink-0">
          <p className="text-[10px] text-white/20 uppercase tracking-widest px-2 mb-2">
            Features
          </p>

          {[
            {
              id: "chat",
              label: "Chat",
              icon: <Sparkles size={13} />,
              desc: "General AI chat",
            },
            {
              id: "suggest",
              label: "Suggest Tasks",
              icon: <LayoutDashboard size={13} />,
              desc: "Get task ideas",
            },
            {
              id: "describe",
              label: "Describe Task",
              icon: <FileText size={13} />,
              desc: "Auto description",
            },
            {
              id: "summary",
              label: "Board Summary",
              icon: <BarChart2 size={13} />,
              desc: "Progress overview",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${
                activeTab === tab.id
                  ? "bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 text-[#c8f0a0]"
                  : "text-white/40 hover:bg-white/5 hover:text-white/70 border border-transparent"
              }`}
            >
              <div className="mt-0.5">{tab.icon}</div>
              <div>
                <p className="text-xs font-semibold">{tab.label}</p>
                <p className="text-[10px] opacity-60">{tab.desc}</p>
              </div>
            </button>
          ))}
        </aside>

        <div className="flex flex-col flex-1 overflow-hidden">
          {activeTab !== "chat" && (
            <div
              className="border-b border-white/6 px-6 py-4"
              style={{ background: "rgba(200,240,160,0.03)" }}
            >
              {activeTab === "suggest" && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#c8f0a0] mb-1">
                      Suggest Tasks for Board
                    </p>
                    <select
                      value={selectedBoard}
                      onChange={(e) => setSelectedBoard(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-[#c8f0a0]/40 [&>option]:bg-[#0d1a12] [&>option]:text-white"
                    >
                      <option value="">-- Select a board --</option>
                      {boards.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleSuggestTasks}
                    disabled={!selectedBoard || loading}
                    className="bg-[#c8f0a0] text-[#080d0b] font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#b8e580] disabled:opacity-40 transition-all whitespace-nowrap"
                  >
                    Get Suggestions
                  </button>
                </div>
              )}

              {activeTab === "describe" && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#c8f0a0] mb-1">
                      Generate Task Description
                    </p>
                    <input
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      placeholder="e.g. Design login page..."
                      onKeyDown={(e) => e.key === "Enter" && handleDescribe()}
                      className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-[#c8f0a0]/40 [&>option]:bg-[#0d1a12] [&>option]:text-white"
                    />
                  </div>
                  <button
                    onClick={handleDescribe}
                    disabled={!taskTitle.trim() || loading}
                    className="bg-[#c8f0a0] text-[#080d0b] font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#b8e580] disabled:opacity-40 transition-all whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>
              )}

              {activeTab === "summary" && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#c8f0a0] mb-1">
                      Board Progress Summary
                    </p>
                    <select
                      value={selectedBoard}
                      onChange={(e) => setSelectedBoard(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-lg px-3 py-2 outline-none focus:border-[#c8f0a0]/40 [&>option]:bg-[#0d1a12] [&>option]:text-white"
                    >
                      <option value="">-- Select a board --</option>
                      {boards.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleSummary}
                    disabled={!selectedBoard || loading}
                    className="bg-[#c8f0a0] text-[#080d0b] font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#b8e580] disabled:opacity-40 transition-all whitespace-nowrap"
                  >
                    Summarize
                  </button>
                </div>
              )}
            </div>
          )}

          <div
            className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4"
            style={{ scrollbarWidth: "none" }}
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 flex items-center justify-center">
                  <Sparkles className="text-[#c8f0a0]" size={24} />
                </div>
                <div>
                  <h2
                    className="text-lg font-bold text-[#e8f5e0] mb-1"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Taskora <span className="text-[#c8f0a0] italic">AI</span>
                  </h2>
                  <p className="text-white/30 text-xs max-w-xs">
                    Ask me anything about your tasks, get suggestions, or let me
                    summarize your board.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setInput(prompt);
                        setActiveTab("chat");
                      }}
                      className="text-left text-[11px] text-white/40 border border-white/8 bg-white/3 rounded-xl px-3 py-2.5 hover:bg-[#c8f0a0]/8 hover:border-[#c8f0a0]/20 hover:text-white/70 transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 flex items-center justify-center shrink-0 mr-2 mt-1">
                    <Sparkles size={10} className="text-[#c8f0a0]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 text-[#e8f5e0] rounded-tr-sm"
                      : "bg-white/5 border border-white/8 text-white/70 rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-lg bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 flex items-center justify-center shrink-0 mr-2 mt-1">
                  <Sparkles size={10} className="text-[#c8f0a0]" />
                </div>
                <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#c8f0a0]/40 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#c8f0a0]/40 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#c8f0a0]/40 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center">
                <p className="text-red-400/70 text-[11px] bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 inline-block">
                  ⚠️ {error}
                </p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="border-t border-white/6 px-4 md:px-8 py-4 bg-[#080d0b]/50 backdrop-blur-xl">
            <div
              className="flex md:hidden gap-2 mb-3 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              {[
                { id: "chat", label: "Chat" },
                { id: "suggest", label: "Suggest" },
                { id: "describe", label: "Describe" },
                { id: "summary", label: "Summary" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`shrink-0 text-[10px] px-3 py-1.5 rounded-full border transition-all ${
                    activeTab === tab.id
                      ? "bg-[#c8f0a0]/15 border-[#c8f0a0]/30 text-[#c8f0a0]"
                      : "border-white/8 text-white/30"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask TaskoraAI anything... (Enter to send)"
                rows={1}
                className="flex-1 bg-white/5 border border-white/10 text-white text-xs rounded-xl px-4 py-3 outline-none focus:border-[#c8f0a0]/40 placeholder:text-white/25 resize-none"
                style={{ scrollbarWidth: "none" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="w-9 h-9 bg-[#c8f0a0] text-[#080d0b] rounded-xl flex items-center justify-center hover:bg-[#b8e580] disabled:opacity-40 active:scale-95 transition-all shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-white/15 text-[10px] mt-2 text-center">
              Powered by Groq&apos;s Llama 3.3 (70B) model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskoraAI;
