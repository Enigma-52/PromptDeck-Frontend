"use client";

import { useState } from "react";
import {
  ArrowRight,
  Code2,
  GitBranch,
  Zap,
  BarChart3,
  Package,
  Sparkles,
  Send,
  Workflow,
  Shield,
  Gauge,
  CheckCircle2,
  Lightbulb,
  Cpu,
  Globe,
  ZapIcon,
  Users,
  Maximize2,
  Mail,
  Check,
} from "lucide-react";

const demoPrompts = [
  {
    id: "sentiment",
    name: "Sentiment Analysis",
    template: "Analyze sentiment: {text}",
    variables: { text: "PromptOps makes managing AI prompts feel effortless" },
  },
  {
    id: "extraction",
    name: "Entity Extraction",
    template: "Extract entities from: {content}",
    variables: { content: "PromptOps is built for engineering precision" },
  },
  {
    id: "classification",
    name: "Classification",
    template: "Classify this: {input}",
    variables: { input: "The future of prompt management is here" },
  },
];

const sampleResponses = {
  openai:
    "Positive sentiment detected. Key entities: PromptOps, management, AI prompts.",
  claude:
    "Strong positive sentiment. Core concept: automation and developer efficiency.",
  gemini:
    "Classification: Developer tool announcement. Sentiment: 95% positive.",
};

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<string>("openai");
  const [activePrompt, setActivePrompt] = useState<string>("sentiment");
  const [email, setEmail] = useState("");
  const [waitlistMessage, setWaitlistMessage] = useState("");

  const handleWaitlistJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistMessage("🎉 You're on the list! We'll be in touch soon.");
    setEmail("");
    setTimeout(() => setWaitlistMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border/50 sticky top-0 z-40 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-background text-sm font-black tracking-wider">
              P
            </div>
            <span className="text-lg font-bold tracking-tight">PromptOps</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#demo"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors font-medium"
            >
              Demo
            </a>
            <a
              href="#features"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors font-medium"
            >
              Why Us
            </a>
            <button className="px-4 py-2 text-xs uppercase tracking-widest font-bold bg-accent text-background rounded-md hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero with gradient accent */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs uppercase tracking-widest text-accent font-bold">
                AI-Powered Orchestration
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter mb-6">
              Ship Prompts
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                Like Code
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              One schema. Multiple models. Standardized, comparable results. The
              Postman for prompts—stripped down for engineering precision.
            </p>
          </div>

          {/* Interactive Demo Section */}
          <div id="demo" className="mb-20 md:mb-32">
            <div className="max-w-5xl mx-auto">
              {/* Prompt selector tabs */}
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {demoPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => setActivePrompt(prompt.id)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest font-bold whitespace-nowrap rounded-md transition-all ${
                      activePrompt === prompt.id
                        ? "bg-accent text-background shadow-lg shadow-accent/30"
                        : "bg-card border border-border hover:border-accent/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {prompt.name}
                  </button>
                ))}
              </div>

              {/* Main demo container - modern split layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Input side - left */}
                <div className="bg-card border border-border rounded-xl p-8 hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="text-xs uppercase tracking-widest font-bold text-accent">
                      Input
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3 block">
                        Template
                      </label>
                      <div className="bg-background border border-border/50 rounded-lg p-4 font-mono text-sm text-foreground/80 leading-relaxed hover:border-accent/20 transition-colors">
                        <pre className="overflow-auto">
                          {
                            demoPrompts.find((p) => p.id === activePrompt)
                              ?.template
                          }
                        </pre>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3 block">
                        Variables
                      </label>
                      <div className="bg-background border border-border/50 rounded-lg p-4 font-mono text-xs text-foreground/70 overflow-auto max-h-24 hover:border-accent/20 transition-colors">
                        {JSON.stringify(
                          demoPrompts.find((p) => p.id === activePrompt)
                            ?.variables,
                          null,
                          2
                        )}
                      </div>
                    </div>

                    <button className="w-full px-6 py-3 bg-gradient-to-r from-accent to-accent-secondary text-background text-sm font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-6 shadow-lg shadow-accent/30">
                      Execute <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Output side - right */}
                <div className="bg-card border border-border rounded-xl p-8 hover:border-accent-secondary/30 transition-colors">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-accent-secondary"></div>
                    <span className="text-xs uppercase tracking-widest font-bold text-accent-secondary">
                      Responses
                    </span>
                  </div>

                  {/* Model tabs */}
                  <div className="flex gap-2 mb-6 border-b border-border/50">
                    {["openai", "claude", "gemini"].map((model) => (
                      <button
                        key={model}
                        onClick={() => setSelectedModel(model)}
                        className={`px-3 py-2 text-xs uppercase tracking-widest font-bold border-b-2 transition-all ${
                          selectedModel === model
                            ? "border-accent-secondary text-accent-secondary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>

                  {/* Response display */}
                  <div className="space-y-4">
                    <div className="bg-background border border-border/50 rounded-lg p-4 font-mono text-sm text-foreground/80 leading-relaxed min-h-24 flex items-center hover:border-accent-secondary/20 transition-colors">
                      {
                        sampleResponses[
                          selectedModel as keyof typeof sampleResponses
                        ]
                      }
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                          Latency
                        </span>
                        <span className="text-sm text-accent-secondary font-bold">
                          247ms
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
                          Tokens
                        </span>
                        <span className="text-sm text-accent-secondary font-bold">
                          127
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Model badges */}
              <div className="flex flex-wrap gap-2 justify-center">
                {["OpenAI", "Anthropic", "Google", "Groq", "xAI", "Cohere"].map(
                  (provider) => (
                    <div
                      key={provider}
                      className="px-3 py-1.5 rounded-full border border-border/50 text-xs font-mono text-muted-foreground hover:border-accent/50 hover:text-accent transition-colors bg-background"
                    >
                      {provider}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="text-center mb-20">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-accent to-accent-secondary text-background text-sm font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-accent/40">
                Start Free <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 border border-accent/50 text-accent text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-accent/10 transition-colors">
                View Docs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modernized with staggered layout */}
      <section
        id="features"
        className="border-t border-border/50 py-20 md:py-32 bg-background"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-tight">
              Built for Production
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed font-medium">
              PromptOps eliminates scattered scripts and inconsistent outputs.
              It's the orchestration layer your team needs when scaling prompt
              logic to production.
            </p>
          </div>

          <div className="space-y-12 md:space-y-20">
            {/* Feature 1 - Left align */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 w-fit">
                  <Code2 className="w-4 h-4 text-accent" />
                  <span className="text-xs uppercase tracking-widest text-accent font-bold">
                    Template Management
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                  Define Once, Execute Everywhere
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Define prompts in a single JSON schema. Store, version, and
                  organize them centrally. No more scattered files across Slack,
                  GitHub issues, or forgotten docs.
                </p>
                <ul className="space-y-3">
                  {[
                    "One consistent structure",
                    "Full version history",
                    "Search and organize",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-80 md:h-96 bg-card border border-border rounded-xl p-8 flex items-end overflow-hidden group hover:border-accent/50 transition-colors">
                <div className="relative z-10 w-full space-y-3">
                  {[
                    "template_v1.json",
                    "template_v2.json",
                    "template_v3.json (current)",
                  ].map((version, idx) => (
                    <div
                      key={version}
                      className={`p-3 rounded-lg border ${
                        idx === 2
                          ? "bg-accent/20 border-accent/50"
                          : "bg-background/60 border-border/50"
                      }`}
                    >
                      <span className="text-xs font-mono text-muted-foreground">
                        {version}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2 - Right align */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative h-80 md:h-96 bg-card border border-border rounded-xl p-8 flex items-center justify-center overflow-hidden group hover:border-accent-secondary/50 transition-colors order-last md:order-first">
                <div className="relative z-10 space-y-2 text-center">
                  <div className="inline-flex items-center justify-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-accent-secondary animate-pulse"></div>
                    <span className="text-xs uppercase tracking-widest text-accent-secondary font-bold">
                      Multi-Model
                    </span>
                  </div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {["OpenAI", "Claude", "Gemini", "Groq", "xAI"].map(
                      (model) => (
                        <div
                          key={model}
                          className="px-3 py-1 rounded-full bg-accent-secondary/20 border border-accent-secondary/40 text-xs font-mono text-accent-secondary"
                        >
                          {model}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-secondary/10 border border-accent-secondary/30 w-fit">
                  <Workflow className="w-4 h-4 text-accent-secondary" />
                  <span className="text-xs uppercase tracking-widest text-accent-secondary font-bold">
                    Multi-Model Orchestration
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                  One Prompt, Every Model
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Point any prompt at OpenAI, Anthropic, Google, or others. Use
                  your own API keys. Full control. Single standardized interface
                  for all responses.
                </p>
                <ul className="space-y-3">
                  {[
                    "Run simultaneously",
                    "Your API keys only",
                    "Standardized responses",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 3 - Left align */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 w-fit">
                  <BarChart3 className="w-4 h-4 text-accent" />
                  <span className="text-xs uppercase tracking-widest text-accent font-bold">
                    Evaluation
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                  Score & Benchmark at Scale
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Automatically score responses. Compare models.
                  Human-in-the-loop feedback. Track metrics over time. Build
                  confidence in your prompts before shipping.
                </p>
                <ul className="space-y-3">
                  {["Automatic scoring", "Model comparison", "Audit trail"].map(
                    (item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground">
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="relative h-80 md:h-96 bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center gap-6 overflow-hidden group hover:border-accent/50 transition-colors">
                <div className="relative z-10 space-y-4 w-full">
                  {[
                    { label: "Accuracy", value: "94%", color: "from-accent" },
                    {
                      label: "Relevance",
                      value: "87%",
                      color: "from-accent-secondary",
                    },
                    { label: "Latency", value: "234ms", color: "from-accent" },
                  ].map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                        <span className="text-muted-foreground">
                          {metric.label}
                        </span>
                        <span
                          className={`bg-gradient-to-r ${metric.color} to-transparent bg-clip-text text-transparent`}
                        >
                          {metric.value}
                        </span>
                      </div>
                      <div className="h-1.5 bg-border/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${metric.color} to-transparent`}
                          style={{
                            width:
                              metric.value === "234ms"
                                ? "78%"
                                : metric.value.slice(0, -1) + "%",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features Grid - compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {[
              {
                icon: GitBranch,
                title: "Version Control",
                description:
                  "Full audit trail. Compare versions. Rollback instantly.",
              },
              {
                icon: Shield,
                title: "CI/CD Ready",
                description:
                  "Push tested prompts to production. No manual steps.",
              },
              {
                icon: Gauge,
                title: "API First",
                description:
                  "Thin layer. No lock-in. Full programmatic control.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-border/50 bg-card hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/50 transition-all mb-3">
                  <feature.icon className="w-5 h-5 text-accent group-hover:text-accent-secondary transition-colors" />
                </div>
                <h3 className="font-bold text-base mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PromptOps Section - Modernized */}
      <section
        id="benefits"
        className="border-t border-border/50 py-20 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-tight">
              Why Teams Choose PromptOps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl font-medium">
              Built specifically for engineering teams scaling AI systems.
              Proven by teams shipping production LLM applications.
            </p>
          </div>

          {/* Interactive Why Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Lightbulb,
                step: "01",
                title: "Think Once",
                subtitle: "Define your prompts once",
                description:
                  "Write prompt templates in JSON. Version them. Organize them. No more scattered logic across codebases.",
                color: "from-accent",
              },
              {
                icon: Cpu,
                step: "02",
                title: "Execute Everywhere",
                subtitle: "Run against multiple models",
                description:
                  "Test the same prompt against OpenAI, Claude, Gemini simultaneously. Benchmark performance. Make data-driven decisions.",
                color: "from-accent-secondary",
              },
              {
                icon: CheckCircle2,
                step: "03",
                title: "Ship Confident",
                subtitle: "Deploy only tested prompts",
                description:
                  "Push tested prompts to production via CI/CD. Automatic versioning. Full audit trail. Rollback on demand.",
                color: "from-accent",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative p-8 rounded-xl border border-border/50 bg-card hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors`}
                    >
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div
                      className={`text-3xl font-black bg-gradient-to-br ${item.color} to-transparent bg-clip-text text-transparent group-hover:scale-110 transition-transform`}
                    >
                      {item.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1 tracking-tight group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-accent font-bold mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Flow */}
          <div className="bg-card border border-border/50 rounded-xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-8 tracking-tight">
              The PromptOps Advantage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "No More Scattered Scripts",
                  description:
                    "One source of truth for all prompts. Centralized. Versioned. Organized.",
                },
                {
                  title: "Observability Built In",
                  description:
                    "Every execution tracked. Latency measured. Tokens counted. Full visibility.",
                },
                {
                  title: "Team Collaboration Ready",
                  description:
                    "Share prompts. Review changes. Approve deployments. Audit everything.",
                },
                {
                  title: "Production Grade",
                  description:
                    "API-first design. CI/CD integration. Rollback support. SLA-ready infrastructure.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-6 md:pb-0 md:border-r md:last:border-r-0 md:pr-6 last:pb-0 last:border-b-0 border-b border-border/50"
                >
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 tracking-tight">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium">
              The PromptOps workflow: select your stack, write prompts
              naturally, test comprehensively, ship with confidence.
            </p>
          </div>

          {/* Step-by-step workflow visualization */}
          <div className="space-y-8">
            {/* Step 1: Select Provider & Model */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 w-fit">
                  <Code2 className="w-4 h-4 text-accent" />
                  <span className="text-xs uppercase tracking-widest text-accent font-bold">
                    Step 1
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                  Select Provider & AI Model
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Choose your LLM providers—OpenAI, Anthropic, Google, Groq,
                  xAI, or any you prefer. Add your API keys once. PromptOps
                  handles the rest.
                </p>
                <ul className="space-y-3">
                  {[
                    "Multiple providers supported",
                    "Use your own API keys",
                    "No vendor lock-in",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-8 h-full min-h-80 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-accent/50 transition-colors cursor-pointer group">
                    <div className="w-3 h-3 rounded-full bg-accent group-hover:scale-150 transition-transform"></div>
                    <span className="text-sm font-medium">
                      OpenAI (GPT-4, GPT-4 Turbo)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-accent/50 transition-colors cursor-pointer group">
                    <div className="w-3 h-3 rounded-full bg-accent group-hover:scale-150 transition-transform"></div>
                    <span className="text-sm font-medium">
                      Anthropic Claude (Opus, Sonnet)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-accent/50 transition-colors cursor-pointer group">
                    <div className="w-3 h-3 rounded-full bg-accent group-hover:scale-150 transition-transform"></div>
                    <span className="text-sm font-medium">
                      Google Gemini (Pro, Ultra)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-accent/50 transition-colors cursor-pointer group">
                    <div className="w-3 h-3 rounded-full bg-accent group-hover:scale-150 transition-transform"></div>
                    <span className="text-sm font-medium">
                      Groq, xAI Grok, and more...
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Write Prompts in Plain English */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="bg-card border border-border rounded-xl p-8 h-full min-h-80 flex flex-col justify-center order-last lg:order-first">
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 bg-background rounded-lg border border-border/50">
                    <div className="text-muted-foreground mb-2">{"{"}</div>
                    <div className="text-foreground pl-4">
                      "name": "product_recommendation",
                    </div>
                    <div className="text-foreground pl-4">
                      "template": "Recommend products for: {"{"}input{"}"}",
                    </div>
                    <div className="text-foreground pl-4">
                      "recommendations": {"{"}
                    </div>
                    <div className="text-muted-foreground pl-8 text-accent">
                      // Return top 3 products
                    </div>
                    <div className="text-foreground pl-4">{"}"},</div>
                    <div className="text-foreground pl-4">"version": "1.0"</div>
                    <div className="text-muted-foreground">{"}"}</div>
                  </div>
                  <div className="text-muted-foreground text-center py-2">
                    Plain English → JSON Structure
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 w-fit">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <span className="text-xs uppercase tracking-widest text-accent font-bold">
                    Step 2
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                  Write Prompts in Plain English
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Write naturally. No special syntax. PromptOps converts your
                  prompts into a structured schema with variables, constraints,
                  and examples. Version automatically.
                </p>
                <ul className="space-y-3">
                  {[
                    "Natural language prompts",
                    "Auto-structured",
                    "Full version history",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step 3: Test & Observe Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 w-fit">
                  <BarChart3 className="w-4 h-4 text-accent" />
                  <span className="text-xs uppercase tracking-widest text-accent font-bold">
                    Step 3
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                  Test Responses & Monitor Metrics
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Execute the same prompt across all selected models
                  simultaneously. Compare responses side-by-side. Track latency,
                  token usage, and costs in real-time.
                </p>
                <ul className="space-y-3">
                  {[
                    "Multi-model execution",
                    "Real-time metrics",
                    "Cost transparency",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-8 h-full min-h-80 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border/50">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Model
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Latency
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Tokens
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Cost
                    </span>
                  </div>
                  {[
                    {
                      model: "GPT-4",
                      latency: "287ms",
                      tokens: "345",
                      cost: "$0.014",
                    },
                    {
                      model: "Claude 3",
                      latency: "412ms",
                      tokens: "328",
                      cost: "$0.018",
                    },
                    {
                      model: "Gemini Pro",
                      latency: "156ms",
                      tokens: "312",
                      cost: "$0.008",
                    },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3 rounded-lg bg-background hover:bg-background/80 transition-colors"
                    >
                      <span className="text-sm font-medium">{row.model}</span>
                      <span className="text-xs text-muted-foreground">
                        {row.latency}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {row.tokens}
                      </span>
                      <span className="text-xs text-accent font-bold">
                        {row.cost}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Live Versioning & Deploy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="bg-card border border-border rounded-xl p-8 h-full min-h-80 flex flex-col justify-center order-last lg:order-first">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-background/60 border border-border/50">
                    <GitBranch className="w-4 h-4 text-accent" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-accent">
                        v1.0 (Current)
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Production
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-background/60 border border-border/50 hover:border-accent/50 transition-colors">
                    <GitBranch className="w-4 h-4 text-accent-secondary" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-accent-secondary">
                        v1.1 (Draft)
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Better tone, tested
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-background/60 border border-border/50 opacity-50">
                    <GitBranch className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        v0.9 (Archived)
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Previous version
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 w-fit">
                  <GitBranch className="w-4 h-4 text-accent" />
                  <span className="text-xs uppercase tracking-widest text-accent font-bold">
                    Step 4
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                  Live Versioning & Deploy
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Every change is a new version. Test drafts without affecting
                  production. Deploy to production or CI/CD pipelines with a
                  single click. Rollback instantly if needed.
                </p>
                <ul className="space-y-3">
                  {[
                    "Automatic versioning",
                    "Draft testing",
                    "One-click deployment",
                    "Instant rollback",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center pt-12 border-t border-border/50">
            <button className="px-8 py-4 bg-gradient-to-r from-accent to-accent-secondary text-background text-sm font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-lg shadow-accent/40">
              Start Your First Prompt <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="border-t border-border/50 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs uppercase tracking-widest text-accent font-bold">
              Early Access
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-tight">
            The Future of Prompt Ops
          </h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed font-medium">
            Join hundreds of engineering teams building the next generation of
            AI products. Early access available now for limited slots.
          </p>

          <form onSubmit={handleWaitlistJoin} className="max-w-md mx-auto mb-8">
            <div className="flex gap-3 p-2 rounded-lg border border-border/50 bg-card hover:border-accent/50 transition-colors">
              <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-transparent text-foreground placeholder-muted-foreground text-sm outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-accent to-accent-secondary text-background font-bold rounded-md hover:opacity-90 transition-opacity flex-shrink-0 flex items-center gap-2 text-xs uppercase tracking-widest whitespace-nowrap"
              >
                Join <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {waitlistMessage && (
            <div className="flex items-center justify-center gap-2 text-accent text-sm font-medium">
              <Check className="w-4 h-4" />
              {waitlistMessage}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            No spam. Early access updates only. Privacy matters.
          </p>

          <div className="mt-16 pt-12 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-6">
              Join teams from:
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                "Y Combinator",
                "Sequoia",
                "Stripe",
                "OpenAI",
                "Anthropic",
                "Google",
              ].map((org) => (
                <span
                  key={org}
                  className="text-xs font-mono text-muted-foreground"
                >
                  {org}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-background/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">
                Product
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Playground
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    DPA
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-background text-xs font-black">
                P
              </div>
              <span className="font-bold tracking-tight">PromptOps</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2025 PromptOps. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
