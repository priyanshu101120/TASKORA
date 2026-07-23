"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Bell,
  Trash2,
  ArrowRight,
  Rocket,
  Layers,
  Shield,
  Code2,
  Menu,
  X,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { Plan } from "@/hooks/types";

const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [yearly, setYearly] = useState(false);
  const router = useRouter();

  const plans: Plan[] = [
    {
      name: "Free",
      monthly: 0,
      yearly: 0,
      description: "Perfect to get started",
      features: [
        "3 Personal Boards",
        "Basic Task Management",
        "Standard Support",
        "Mobile Access",
      ],
      button: "Start Free",
    },
    {
      name: "Pro",
      monthly: 199,
      yearly: 1800,
      description: "For power users",
      features: [
        "Unlimited Boards",
        "Taskora AI Assistant",
        "Priority Support",
        "Custom Themes",
        "Auto-Delete Tasks",
      ],
      button: "Go Pro",
      highlight: true,
    },
    {
      name: "Max",
      monthly: 219,
      yearly: 1999,
      description: "For teams & businesses",
      features: [
        "Everything in Pro",
        "Team Collaboration",
        "Advanced AI Analytics",
        "SMS Notifications",
        "Admin Dashboard",
        "SSO & SAML",
      ],
      button: "Get Max",
    },
  ];

  const features = [
    {
      icon: <Layers className="size-5" />,
      title: "Smart Columns",
      desc: "Drag-and-drop columns like 'To Do', 'Doing', 'Done' with custom workflows.",
    },
    {
      icon: <Rocket className="size-5" />,
      title: "Lightning Fast",
      desc: "Built with Next.js for near-instant loads and buttery smooth UI.",
    },
    {
      icon: <Shield className="size-5" />,
      title: "Enterprise Security",
      desc: "Supabase-powered auth with row-level security and encrypted data.",
    },
    {
      icon: <Code2 className="size-5" />,
      title: "Modern Stack",
      desc: "Tailwind CSS + glassmorphism aesthetic with a premium developer feel.",
    },
    {
      icon: <Sparkles className="size-5" />,
      title: "AI Integrated",
      desc: "Taskora AI suggests sub-tasks, deadlines, and cleans your boards automatically.",
    },
    {
      icon: <Bell className="size-5" />,
      title: "Smart Notifications",
      desc: "Get reminders before deadlines slip — across email, push, and SMS.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Create Your Board",
      desc: "Sign up in seconds and create your first board with custom columns.",
    },
    {
      num: "02",
      title: "Add Tasks & Let AI Help",
      desc: "Add tasks manually or let Taskora AI generate them based on your goals.",
    },
    {
      num: "03",
      title: "Track & Ship",
      desc: "Move tasks through stages, get smart alerts, and finish projects faster.",
    },
  ];

  const faqs = [
    {
      q: "Is Taskora really free forever?",
      a: "Yes! Our Free plan includes 3 boards and core task management — no credit card required, no time limits.",
    },
    {
      q: "How does Taskora AI work?",
      a: "Taskora AI analyzes your tasks and goals to auto-generate sub-tasks, suggest deadlines, and clean up completed work — all powered by modern LLMs.",
    },
    {
      q: "Can I use Taskora with my team?",
      a: "Absolutely. Our Max plan supports unlimited team members with real-time collaboration, role permissions, and admin controls.",
    },
    {
      q: "Is my data secure?",
      a: "We use Supabase with enterprise-grade encryption, row-level security, and SOC2-compliant infrastructure. Your data is yours.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes — cancel with one click, no questions asked. You'll keep access until the end of your billing period.",
    },
    {
      q: "Do you offer student discounts?",
      a: "Yes! Students get Pro free with a valid .edu email. Just sign up and verify.",
    },
  ];

  const dotColors = [
    "bg-[#95d5b2]",
    "bg-[#74c8a4]",
    "bg-[#7ec8e3]",
    "bg-[#d4aaff]",
    "bg-[#ffd6a5]",
    "bg-[#c8f0a0]",
  ];

  return (
    <div className="relative min-h-screen bg-[#080d0b] text-white overflow-x-hidden font-[Inter,sans-serif]">
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
      <div
        className="pointer-events-none fixed top-[40%] left-[35%] w-70 h-70 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(180,230,160,0.04) 0%, transparent 65%)",
        }}
      />

      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/6 bg-[#080d0b]/70 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#c8f0a0] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#080d0b]" />
          </div>
          <h1
            className="text-lg font-bold text-[#c8f0a0] tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Taskora
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs text-white/40">
          <a
            href="#features"
            className="hover:text-[#c8f0a0] transition-colors tracking-wide"
          >
            Features
          </a>
          <a
            href="#how"
            className="hover:text-[#c8f0a0] transition-colors tracking-wide"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="hover:text-[#c8f0a0] transition-colors tracking-wide"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="hover:text-[#c8f0a0] transition-colors tracking-wide"
          >
            FAQ
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => router.push("/login")}
            className="text-[11px] text-white/40 border border-white/10 px-3 py-1.5 rounded-md bg-white/4 hover:bg-white/8 hover:text-white/70 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/login")}
            className="text-[11px] bg-[#c8f0a0] text-[#080d0b] font-bold px-3 py-1.5 rounded-md hover:bg-[#b8e580] active:scale-[0.98] transition-all"
          >
            Get Started
          </button>
        </div>

        <button
          className="md:hidden text-white/40"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-b border-white/6 px-6 py-4 flex flex-col gap-4 bg-[#080d0b]/95 backdrop-blur-xl z-40 relative">
          {["features", "how", "pricing", "faq"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setMobileOpen(false)}
              className="text-white/40 text-sm capitalize hover:text-[#c8f0a0] transition-colors"
            >
              {s === "how"
                ? "How it Works"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
          <button
            onClick={() => router.push("/login")}
            className="bg-[#c8f0a0] text-[#080d0b] font-bold py-2 rounded-xl text-sm"
          >
            Get Started
          </button>
        </div>
      )}

      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-6 text-center pt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full"
        >
          <div className="inline-flex items-center gap-1.5 mb-6 bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 text-[#c8f0a0] text-[10px] px-3 py-1.5 rounded-full tracking-widest uppercase">
            <Sparkles size={10} /> Now with Taskora AI Assistant
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.05] text-[#e8f5e0]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Manage Projects <br className="hidden md:block" />
            with <span className="text-[#c8f0a0] italic">Taskora</span>
          </h1>

          <p className="text-white/40 text-sm md:text-base mb-10 leading-relaxed max-w-xl mx-auto">
            The premium way to organize tasks. Smooth glassmorphism UI, powerful
            AI assistant, and full-stack speed — all in one beautiful workspace.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 bg-[#c8f0a0] text-[#080d0b] font-bold px-6 py-3 rounded-xl hover:bg-[#b8e580] active:scale-[0.98] transition-all text-sm"
            >
              Get Started — It&apos;s Free <ArrowRight size={15} />
            </button>
          </div>

          <p className="text-white/20 text-[11px] mt-5 tracking-wide">
            No credit card required · Free forever plan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 w-full max-w-4xl relative z-10"
        >
          <div
            className="relative rounded-2xl border border-white/8 backdrop-blur-md p-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              boxShadow:
                "0 1px 0 inset rgba(255,255,255,0.06), 0 24px 48px -12px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="absolute top-0 left-[10%] right-[10%] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
              }}
            />
            <div className="flex gap-1.5 mb-4 px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#c8f0a0]/50" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  name: "To Do",
                  dot: "bg-[#95d5b2]",
                  tasks: ["Design mockups", "Write docs"],
                },
                {
                  name: "In Progress",
                  dot: "bg-[#7ec8e3]",
                  tasks: ["Build API", "Fix auth"],
                },
                {
                  name: "Done",
                  dot: "bg-[#c8f0a0]",
                  tasks: ["Setup DB", "Deploy MVP"],
                },
              ].map((col) => (
                <div
                  key={col.name}
                  className="rounded-xl border border-white/8 p-3"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                    <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest">
                      {col.name}
                    </span>
                  </div>
                  {col.tasks.map((t) => (
                    <div
                      key={t}
                      className="bg-white/5 border border-white/8 rounded-lg p-2.5 mb-2"
                    >
                      <div className="h-1.5 w-3/4 bg-white/20 rounded mb-1.5" />
                      <div className="h-1.5 w-1/2 bg-white/10 rounded" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section
        id="features"
        className="relative z-10 py-24 px-6 max-w-6xl mx-auto"
      >
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 mb-4 bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 text-[#c8f0a0] text-[10px] px-3 py-1.5 rounded-full tracking-widest uppercase">
            Features
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-[#e8f5e0]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Everything you need,{" "}
            <span className="text-[#c8f0a0] italic">
              nothing you don&apos;t
            </span>
          </h2>
          <p className="text-white/30 text-sm max-w-xl mx-auto">
            Built for solo developers, small teams, and growing businesses
            alike.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div
                className="relative h-full rounded-2xl border border-white/8 backdrop-blur-md p-6 hover:border-[#c8f0a0]/25 transition-all group"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow:
                    "0 1px 0 inset rgba(255,255,255,0.04), 0 8px 24px -8px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="absolute top-0 left-[10%] right-[10%] h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                  }}
                />
                <div
                  className={`w-2 h-2 rounded-full ${dotColors[i % dotColors.length]} mb-4`}
                />
                <div className="w-9 h-9 rounded-xl bg-[#c8f0a0]/10 flex items-center justify-center text-[#c8f0a0] mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3
                  className="text-sm font-bold mb-2 text-[#e8f5e0]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-white/30 text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="how"
        className="relative z-10 py-24 px-6 border-y border-white/6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 mb-4 bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 text-[#c8f0a0] text-[10px] px-3 py-1.5 rounded-full tracking-widest uppercase">
              How it Works
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-[#e8f5e0]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Get started in{" "}
              <span className="text-[#c8f0a0] italic">3 simple steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div
                  className="h-full rounded-2xl border border-white/8 backdrop-blur-md p-6"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    boxShadow: "0 1px 0 inset rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    className="text-5xl font-bold text-[#c8f0a0]/20 mb-4"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {s.num}
                  </div>
                  <h3
                    className="text-sm font-bold mb-2 text-[#e8f5e0]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-white/30 text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight
                    className="hidden md:block absolute top-8 -right-3 text-[#c8f0a0]/20 z-10"
                    size={16}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 mb-4 bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 text-[#c8f0a0] text-[10px] px-3 py-1.5 rounded-full tracking-widest uppercase">
                AI Powered
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-[#e8f5e0]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Meet your{" "}
                <span className="text-[#c8f0a0] italic">AI Assistant</span>
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: <Sparkles size={14} />,
                    title: "Smart Task Generation",
                    desc: "AI auto-creates sub-tasks based on your goals.",
                  },
                  {
                    icon: <Trash2 size={14} />,
                    title: "Auto-Delete Management",
                    desc: "Finished tasks archived or deleted to keep boards clean.",
                  },
                  {
                    icon: <Bell size={14} />,
                    title: "Deadline Notifications",
                    desc: "Smart alerts before your tasks are overdue.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 flex items-center justify-center text-[#c8f0a0] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-0.5 text-[#e8f5e0]">
                        {item.title}
                      </h4>
                      <p className="text-white/30 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full">
              <div
                className="relative rounded-2xl border border-white/8 backdrop-blur-md p-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow:
                    "0 1px 0 inset rgba(255,255,255,0.06), 0 24px 48px -12px rgba(0,0,0,0.6)",
                }}
              >
                <div
                  className="absolute top-0 left-[10%] right-[10%] h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  }}
                />
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8f0a0] animate-pulse" />
                  <span className="text-[10px] text-white/30 tracking-widest uppercase">
                    Taskora AI · Live
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#c8f0a0]/8 border border-[#c8f0a0]/15 p-3 rounded-xl">
                    <p className="text-xs text-[#c8f0a0]/80 leading-relaxed">
                      👋 Hey! I noticed you completed 5 tasks yesterday. Should
                      I archive them?
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/8 p-3 rounded-xl ml-4">
                    <p className="text-xs text-white/50">Yes, archive them.</p>
                  </div>
                  <div className="bg-[#c8f0a0]/8 border border-[#c8f0a0]/15 p-3 rounded-xl">
                    <p className="text-xs text-[#c8f0a0]/80 leading-relaxed">
                      ✨ Done! Also, your &apos;Launch Landing Page&apos; task
                      is due tomorrow — want me to break it into sub-tasks?
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-white/20 text-[10px] pt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c8f0a0]/50 animate-pulse" />
                    Taskora is typing...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="relative z-10 py-24 px-6 max-w-6xl mx-auto"
      >
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 mb-4 bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 text-[#c8f0a0] text-[10px] px-3 py-1.5 rounded-full tracking-widest uppercase">
            Pricing
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold mb-3 tracking-tight text-[#e8f5e0]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Choose your <span className="text-[#c8f0a0] italic">plan</span>
          </h2>
          <p className="text-white/30 text-sm mb-8">
            Start free, upgrade when you need to.
          </p>

          <div className="inline-flex items-center gap-3 border border-white/8 bg-white/4 rounded-full px-4 py-2">
            <span
              className={`text-xs ${!yearly ? "text-[#c8f0a0] font-bold" : "text-white/30"}`}
            >
              Monthly
            </span>
            <Switch checked={yearly} onCheckedChange={setYearly} />
            <span
              className={`text-xs ${yearly ? "text-[#c8f0a0] font-bold" : "text-white/30"}`}
            >
              Yearly{" "}
              <span className="text-[#c8f0a0]/60 text-[10px] ml-1">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl border backdrop-blur-md p-6 flex flex-col transition-all hover:-translate-y-1"
              style={{
                background: plan.highlight
                  ? "linear-gradient(135deg, rgba(200,240,160,0.08) 0%, rgba(200,240,160,0.03) 100%)"
                  : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                borderColor: plan.highlight
                  ? "rgba(200,240,160,0.25)"
                  : "rgba(255,255,255,0.08)",
                boxShadow: plan.highlight
                  ? "0 1px 0 inset rgba(200,240,160,0.1), 0 24px 48px -12px rgba(0,0,0,0.5)"
                  : "0 1px 0 inset rgba(255,255,255,0.04), 0 8px 24px -8px rgba(0,0,0,0.4)",
              }}
            >
              {plan.highlight && (
                <div
                  className="absolute top-0 left-[10%] right-[10%] h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(200,240,160,0.4), transparent)",
                  }}
                />
              )}
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c8f0a0] text-[#080d0b] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </span>
              )}
              <h3
                className="text-base font-bold mb-1 text-[#e8f5e0]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {plan.name}
              </h3>
              <p className="text-white/30 text-xs mb-5">{plan.description}</p>
              <div className="mb-5">
                <span
                  className="text-4xl font-bold text-[#e8f5e0]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  ₹{yearly ? Math.floor(plan.yearly / 12) : plan.monthly}
                </span>
                <span className="text-white/30 text-xs ml-1">/month</span>
                {yearly && plan.monthly > 0 && (
                  <p className="text-[10px] text-[#c8f0a0]/60 mt-1">
                    Billed ₹{plan.yearly}/year
                  </p>
                )}
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs text-white/50"
                  >
                    <Check className="text-[#c8f0a0] shrink-0" size={12} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/login")}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all active:scale-[0.98] ${
                  plan.highlight
                    ? "bg-[#c8f0a0] text-[#080d0b] hover:bg-[#b8e580]"
                    : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="faq"
        className="relative z-10 py-24 px-6 border-t border-white/6"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 mb-4 bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 text-[#c8f0a0] text-[10px] px-3 py-1.5 rounded-full tracking-widest uppercase">
              FAQ
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-[#e8f5e0]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Frequently asked{" "}
              <span className="text-[#c8f0a0] italic">questions</span>
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <Accordion key={i} type="single" collapsible>
                <AccordionItem
                  value={`item-${i}`}
                  className="rounded-xl border border-white/8 px-5 mb-2"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <AccordionTrigger className="text-left text-sm font-semibold text-[#e8f5e0] hover:no-underline hover:text-[#c8f0a0] transition-colors py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/40 text-xs leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="relative rounded-2xl border border-white/8 backdrop-blur-md px-8 py-14"
            style={{
              background:
                "linear-gradient(135deg, rgba(200,240,160,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              boxShadow:
                "0 1px 0 inset rgba(200,240,160,0.1), 0 24px 48px -12px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="absolute top-0 left-[10%] right-[10%] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(200,240,160,0.3), transparent)",
              }}
            />
            <h2
              className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-[#e8f5e0]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Ready to transform your{" "}
              <span className="text-[#c8f0a0] italic">workflow?</span>
            </h2>
            <p className="text-white/30 text-sm mb-8 max-w-md mx-auto">
              Join 10,000+ users building better products with Taskora.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 mx-auto bg-[#c8f0a0] text-[#080d0b] font-bold px-6 py-3 rounded-xl hover:bg-[#b8e580] active:scale-[0.98] transition-all text-sm"
            >
              Build Your First Board <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/6 py-10 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-[#c8f0a0] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#080d0b]" />
              </div>
              <span
                className="font-bold text-[#c8f0a0] text-sm"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Taskora
              </span>
            </div>
            <p className="text-white/25 text-xs leading-relaxed max-w-xs">
              The premium way to organize tasks. Built for everyone, loved by
              teams.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "AI Assistant", "Changelog"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Security", "Cookies"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white/60 text-[11px] uppercase tracking-widest mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-white/25 text-xs hover:text-[#c8f0a0] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto pt-6 border-t border-white/6 flex flex-col md:flex-row justify-between gap-3 text-[10px] text-white/20">
          <p>© 2026 Taskora. All rights reserved.</p>
          <p>Made with 💚 for builders everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
