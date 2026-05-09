'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check, Sparkles, Bell, Trash2, ArrowRight, Rocket, Layers,
  Shield, Code2, Menu, X, Star, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import AuthModal from "../components/AuthModal";


interface Plan {
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  features: string[];
  button: string;
  highlight?: boolean;
}

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [yearly, setYearly] = useState(false);
 

  const plans: Plan[] = [
    {
      name: "Free",
      monthly: 0,
      yearly: 0,
      description: "Perfect to get started",
      features: ["3 Personal Boards", "Basic Task Management", "Standard Support", "Mobile Access"],
      button: "Start Free",
    },
    {
      name: "Pro",
      monthly: 9,
      yearly: 86,
      description: "For power users",
      features: ["Unlimited Boards", "Taskora AI Assistant", "Priority Support", "Custom Themes", "Auto-Delete Tasks"],
      button: "Go Pro",
      highlight: true,
    },
    {
      name: "Max",
      monthly: 19,
      yearly: 137,
      description: "For teams & businesses",
      features: ["Everything in Pro", "Team Collaboration", "Advanced AI Analytics", "SMS Notifications", "Admin Dashboard", "SSO & SAML"],
      button: "Get Max",
    },
  ];

  const features = [
    { icon: <Layers className="size-6" />, title: "Smart Columns", desc: "Drag-and-drop columns like 'To Do', 'Doing', 'Done' with custom workflows." },
    { icon: <Rocket className="size-6" />, title: "Lightning Fast", desc: "Built with Vite + React for near-instant loads and buttery smooth UI." },
    { icon: <Shield className="size-6" />, title: "Enterprise Security", desc: "Supabase-powered auth with row-level security and encrypted data." },
    { icon: <Code2 className="size-6" />, title: "Modern Stack", desc: "Tailwind CSS + glassmorphism aesthetic with a premium developer feel." },
    { icon: <Sparkles className="size-6" />, title: "AI Integrated", desc: "Taskora AI suggests sub-tasks, deadlines, and cleans your boards automatically." },
    { icon: <Bell className="size-6" />, title: "Smart Notifications", desc: "Get reminders before deadlines slip — across email, push, and SMS." },
  ];

  const steps = [
    { num: "01", title: "Create Your Board", desc: "Sign up in seconds and create your first board with custom columns." },
    { num: "02", title: "Add Tasks & Let AI Help", desc: "Add tasks manually or let Taskora AI generate them based on your goals." },
    { num: "03", title: "Track & Ship", desc: "Move tasks through stages, get smart alerts, and finish projects faster." },
  ];

  const testimonials = [
    { name: "Aarav Sharma", role: "Indie Developer", text: "Taskora replaced 3 tools in my workflow. The AI auto-cleanup is genius.", rating: 5 },
    { name: "Priya Mehta", role: "Product Manager", text: "Finally a Kanban that doesn't feel bloated. The glassmorphism UI is gorgeous.", rating: 5 },
    { name: "Rohan Kapoor", role: "Startup Founder", text: "Our team of 8 switched from Trello. Zero regrets — the AI features are next level.", rating: 5 },
    { name: "Sneha Reddy", role: "Designer", text: "The smoothest task app I've used. Feels premium without being complicated.", rating: 5 },
  ];

  const faqs = [
    { q: "Is Taskora really free forever?", a: "Yes! Our Free plan includes 3 boards and core task management — no credit card required, no time limits." },
    { q: "How does Taskora AI work?", a: "Taskora AI analyzes your tasks and goals to auto-generate sub-tasks, suggest deadlines, and clean up completed work — all powered by modern LLMs." },
    { q: "Can I use Taskora with my team?", a: "Absolutely. Our Max plan supports unlimited team members with real-time collaboration, role permissions, and admin controls." },
    { q: "Is my data secure?", a: "We use Supabase with enterprise-grade encryption, row-level security, and SOC2-compliant infrastructure. Your data is yours." },
    { q: "Can I cancel anytime?", a: "Yes — cancel with one click, no questions asked. You'll keep access until the end of your billing period." },
    { q: "Do you offer student discounts?", a: "Yes! Students get Pro free with a valid .edu email. Just sign up and verify." },
  ];

  const companies = ["Vercel", "Supabase", "Linear", "Notion", "Stripe", "Figma"];

  return (
    <div className="min-h-screen bg-[#023020] text-white overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 bg-linear-to-br from-[#023020] via-[#054d33] to-[#023020] -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-[#cef19f]/10 rounded-full blur-[120px] -z-10" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#023020]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-[#cef19f] flex items-center justify-center">
              <Zap className="size-5 text-[#023020]" />
            </div>
            <span className="text-xl font-black tracking-tight">Taskora</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#features" className="hover:text-[#cef19f] transition">Features</a>
            <a href="#how" className="hover:text-[#cef19f] transition">How it Works</a>
            <a href="#pricing" className="hover:text-[#cef19f] transition">Pricing</a>
            <a href="#faq" className="hover:text-[#cef19f] transition">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" onClick={() => setShowModal(true)} className="text-white hover:bg-white/10 hover:text-white">
              Login
            </Button>
            <Button onClick={() => setShowModal(true)} className="bg-[#cef19f] text-[#023020] hover:bg-[#cef19f]/90 font-bold rounded-full">
              Get Started
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4 bg-[#023020]/95">
            <a href="#features" className="text-slate-300">Features</a>
            <a href="#how" className="text-slate-300">How it Works</a>
            <a href="#pricing" className="text-slate-300">Pricing</a>
            <a href="#faq" className="text-slate-300">FAQ</a>
            <Button onClick={() => setShowModal(true)} className="bg-[#cef19f] text-[#023020] font-bold rounded-full">
              Get Started
            </Button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center pt-20 pb-32">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl w-full"
        >
          <Badge className="mb-6 bg-[#cef19f]/10 text-[#cef19f] border border-[#cef19f]/30 hover:bg-[#cef19f]/20">
            <Sparkles className="size-3 mr-1.5" /> Now with Taskora AI Assistant
          </Badge>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-[1.05]">
            Manage Projects <br className="hidden md:block" />
            with <span className="text-[#cef19f]">Taskora</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            The premium way to organize tasks. Smooth glassmorphism UI, powerful AI assistant,
            and full-stack speed — all in one beautiful workspace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              onClick={() => setShowModal(true)}
              size="lg"
              className="bg-[#cef19f] text-[#023020] hover:bg-[#cef19f]/90 font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_40px_rgba(206,241,159,0.3)]"
            >
              Get Started — It&apos;s Free <ArrowRight className="ml-2 size-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white text-lg px-8 py-6 rounded-full"
            >
              Watch Demo
            </Button>
          </div>

          <p className="text-slate-500 text-sm mt-6">No credit card required • Free forever plan</p>
        </motion.div>

        {/* Hero Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 w-full max-w-6xl"
        >
          <div className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-2 shadow-2xl">
            <div className="rounded-xl bg-[#023020]/60 p-6">
              <div className="flex gap-2 mb-4">
                <div className="size-3 rounded-full bg-red-400/60" />
                <div className="size-3 rounded-full bg-yellow-400/60" />
                <div className="size-3 rounded-full bg-green-400/60" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {["To Do", "In Progress", "Done"].map((col) => (
                  <div key={col} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-sm font-bold mb-3 text-[#cef19f]">{col}</h4>
                    {[1, 2].map((t) => (
                      <div key={t} className="bg-white/5 rounded p-3 mb-2 border border-white/5">
                        <div className="h-2 w-3/4 bg-white/20 rounded mb-2" />
                        <div className="h-2 w-1/2 bg-white/10 rounded" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-slate-500 text-sm mb-8 uppercase tracking-widest">
            Trusted by teams using
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {companies.map((c) => (
              <span key={c} className="text-slate-400 text-xl font-bold opacity-60 hover:opacity-100 transition">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#cef19f]/10 text-[#cef19f] border-[#cef19f]/30">Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Everything you need, <span className="text-[#cef19f]">nothing you don&apos;t</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Built for solo developers, small teams, and growing businesses alike.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-8 bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#cef19f]/30 transition-all group h-full">
                <div className="size-12 rounded-xl bg-[#cef19f]/10 flex items-center justify-center text-[#cef19f] mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#cef19f]/10 text-[#cef19f] border-[#cef19f]/30">How it Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Get started in <span className="text-[#cef19f]">3 simple steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="text-7xl font-black text-[#cef19f]/20 mb-4">{s.num}</div>
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-slate-400">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 text-[#cef19f]/30 size-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI SHOWCASE */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <Badge className="mb-4 bg-[#cef19f]/10 text-[#cef19f] border-[#cef19f]/30">AI Powered</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Meet your <span className="text-[#cef19f]">AI Assistant</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: <Sparkles />, title: "Smart Task Generation", desc: "AI auto-creates sub-tasks based on your goals." },
                  { icon: <Trash2 />, title: "Auto-Delete Management", desc: "Finished tasks archived or deleted to keep boards clean." },
                  { icon: <Bell />, title: "Deadline Notifications", desc: "Smart alerts before your tasks are overdue." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-[#cef19f]/10 p-3 rounded-xl text-[#cef19f] h-fit shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full">
              <Card className="bg-white/5 border-white/10 p-6 backdrop-blur-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="size-2 rounded-full bg-[#cef19f] animate-pulse" />
                  <span className="text-xs text-slate-400 font-mono">TASKORA AI • LIVE</span>
                </div>
                <div className="bg-[#023020] p-4 rounded-xl border border-[#cef19f]/20 mb-3">
                  <p className="text-sm text-[#cef19f]">
                    👋 Hey! I noticed you completed 5 tasks yesterday. Should I archive them?
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-3">
                  <p className="text-sm text-slate-300">Yes, archive them.</p>
                </div>
                <div className="bg-[#023020] p-4 rounded-xl border border-[#cef19f]/20 mb-3">
                  <p className="text-sm text-[#cef19f]">
                    ✨ Done! Also, your &apos;Launch Landing Page&quot; task is due tomorrow — want me to break it into sub-tasks?
                  </p>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <div className="size-1.5 rounded-full bg-[#cef19f] animate-pulse" />
                  Taskora is typing...
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#cef19f]/10 text-[#cef19f] border-[#cef19f]/30">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Loved by <span className="text-[#cef19f]">10,000+ users</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="size-4 fill-[#cef19f] text-[#cef19f]" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">&apos;{t.text}&apos;</p>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#cef19f]/10 text-[#cef19f] border-[#cef19f]/30">Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Choose your plan</h2>
          <p className="text-slate-400 mb-8">Start free, upgrade when you need to.</p>

          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2">
            <span className={!yearly ? "text-white font-bold" : "text-slate-400"}>Monthly</span>
            <Switch checked={yearly} onCheckedChange={setYearly} />
            <span className={yearly ? "text-white font-bold" : "text-slate-400"}>
              Yearly <span className="text-[#cef19f] text-xs ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 rounded-3xl border flex flex-col hover:-translate-y-2 transition-all duration-300 backdrop-blur-lg relative overflow-hidden ${
                plan.highlight
                  ? "bg-[#cef19f]/10 border-[#cef19f]/40 shadow-[0_0_60px_rgba(206,241,159,0.15)]"
                  : "bg-white/5 border-white/10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-[#cef19f] text-[#023020] px-4 py-1 text-xs font-bold rounded-bl-xl uppercase">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-5xl font-black">
                  ${yearly ? Math.floor(plan.yearly / 12) : plan.monthly}
                </span>
                <span className="text-slate-400 ml-2">/month</span>
                {yearly && plan.monthly > 0 && (
                  <p className="text-xs text-[#cef19f] mt-1">Billed ${plan.yearly}/year</p>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="text-[#cef19f] size-4 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setShowModal(true)}
                className={`w-full rounded-xl font-bold ${
                  plan.highlight
                    ? "bg-[#cef19f] text-[#023020] hover:bg-[#cef19f]/90"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {plan.button}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-black/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#cef19f]/10 text-[#cef19f] border-[#cef19f]/30">FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white/5 border border-white/10 rounded-xl px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline font-bold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center bg-linear-to-br from-[#cef19f]/10 to-transparent border border-[#cef19f]/20 rounded-3xl p-12 backdrop-blur-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Ready to transform your <span className="text-[#cef19f]">workflow?</span>
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join 10,000+ users building better products with Taskora.
          </p>
          <Button
            onClick={() => setShowModal(true)}
            size="lg"
            className="bg-[#cef19f] text-[#023020] hover:bg-[#cef19f]/90 font-bold text-lg px-10 py-6 rounded-full"
          >
            Build Your First Board <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-[#cef19f] flex items-center justify-center">
                <Zap className="size-5 text-[#023020]" />
              </div>
              <span className="text-xl font-black">Taskora</span>
            </div>
            <p className="text-slate-400 text-sm mb-4 max-w-xs">
              The premium way to organize tasks. Built for everyone, loved by teams.
            </p>
            {/* <div className="flex gap-3">
              <a href="#" className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                <Twitter className="size-4" />
              </a>
              <a href="#" className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                <Github className="size-4" />
              </a>
              <a href="#" className="size-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                <Linkedin className="size-4" />
              </a>
            </div> */}
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "AI Assistant", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold mb-4 text-white">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-slate-400 text-sm hover:text-[#cef19f] transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 Taskora. All rights reserved.</p>
          <p>Made with 💚 for builders everywhere.</p>
        </div>
      </footer>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default LandingPage;
