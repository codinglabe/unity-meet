"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Video,
  MessageSquare,
  Users,
  Calendar,
  Sparkles,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Play,
  Check,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggleSimple } from "@/components/theme-toggle";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">MeetFlow</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggleSimple />
            <Link href="/dashboard">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="gradient-primary text-white border-0 shadow-lg hover:opacity-90 transition-opacity">Get Started</Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-card border-b border-border"
        >
          <div className="px-4 py-4 space-y-4">
            <Link
              href="#features"
              className="block text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="block text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="block text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggleSimple />
              </div>
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-mesh-light dark:bg-mesh-dark" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="gradient-text font-semibold">AI-Powered Meeting Experience</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance"
          >
            Video meetings that{" "}
            <span className="gradient-text">work for you</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            Experience seamless video conferencing with AI-powered summaries,
            real-time transcription, and collaborative tools that keep your team
            connected.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/meeting">
              <Button size="lg" className="gap-2 text-base px-8 gradient-primary text-white border-0 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300">
                Start a Meeting
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-base px-8 hover:bg-primary/5 transition-all duration-300"
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              Free to start
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              No credit card
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              Cancel anytime
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="absolute -inset-4 gradient-primary opacity-20 blur-3xl rounded-3xl" />
          <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10 bg-card">
            <div className="aspect-video relative bg-muted">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UWYeKZ8sXuJMzXpi2japjYoysKrcVW.png"
                alt="MeetFlow video conferencing interface"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Video,
      title: "HD Video & Audio",
      description:
        "Crystal clear video and audio quality with automatic noise cancellation and background blur.",
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description:
        "Stay connected with integrated chat, reactions, and file sharing during your meetings.",
    },
    {
      icon: Sparkles,
      title: "AI Summaries",
      description:
        "Get automatic meeting summaries, action items, and transcriptions powered by AI.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Collaborate with shared notes, whiteboards, and screen sharing capabilities.",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description:
        "Integrate with your calendar and schedule meetings with automatic timezone detection.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "End-to-end encryption, SSO, and compliance certifications for peace of mind.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold"
          >
            Everything you need for better meetings
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Powerful features designed to make your video calls more productive
            and engaging.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-md shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "10M+", label: "Active Users" },
    { value: "50M+", label: "Meetings Hosted" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Countries" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="mt-2 text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for personal use",
      features: [
        "Up to 40 min meetings",
        "100 participants",
        "Chat & reactions",
        "Screen sharing",
        "Virtual backgrounds",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      description: "For small teams and professionals",
      features: [
        "Unlimited meeting duration",
        "300 participants",
        "AI meeting summaries",
        "Custom branding",
        "Cloud recording",
        "Priority support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited everything",
        "1000+ participants",
        "SSO & SCIM",
        "Dedicated support",
        "SLA guarantee",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Choose the plan that works best for you and your team.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`p-8 rounded-2xl border relative overflow-hidden ${
                plan.popular
                  ? "gradient-primary text-white border-transparent shadow-xl shadow-primary/20"
                  : "bg-background border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              }`}
            >
              {plan.popular && (
                <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span
                    className={
                      plan.popular
                        ? "text-white/70"
                        : "text-muted-foreground"
                    }
                  >
                    {plan.period}
                  </span>
                )}
              </div>
              <p
                className={`mt-2 ${plan.popular ? "text-white/80" : "text-muted-foreground"}`}
              >
                {plan.description}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-white/20" : "bg-primary/10"}`}>
                      <Check
                        className={`w-3 h-3 ${plan.popular ? "text-white" : "text-primary"}`}
                      />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full mt-8 ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-white/90 shadow-lg"
                    : "gradient-primary text-white border-0 hover:opacity-90"
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center p-12 rounded-3xl gradient-primary text-white relative overflow-hidden shadow-2xl shadow-primary/30"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to transform your meetings?
            </h2>
            <p className="mt-4 text-lg text-white/85 max-w-xl mx-auto">
              Join millions of teams who use MeetFlow for their daily standups,
              client calls, and team collaborations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get Started for Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/meeting">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 transition-all duration-300"
                >
                  Start Instant Meeting
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">MeetFlow</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Making video meetings simple, productive, and delightful.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2024 MeetFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <Zap className="w-5 h-5 text-muted-foreground" />
            <Shield className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
