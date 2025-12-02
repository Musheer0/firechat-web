"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Flame, Globe, MessageSquare, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [url, setUrl] = useState("")

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <Flame className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by Firecrawl API</span>
          </div>

          {/* Main headline */}
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Chat With Websites.{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Build Multi-Site AI Agents.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Paste URL → Crawl → Vectorize → Chat Forever.{" "}
            <span className="text-foreground">Your AI agent that never forgets.</span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={'/app/websites'}>
            <Button size="lg" className="h-12 gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90">
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-12 gap-2 border-border px-8 text-foreground hover:bg-secondary bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Demo Mockup */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/5">
            {/* Browser header */}
            <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-background px-3 py-1.5">
                <span className="text-sm text-muted-foreground">firechat.app/dashboard</span>
              </div>
            </div>

            {/* App content */}
            <div className="grid gap-0 lg:grid-cols-[300px,1fr]">
              {/* Sidebar */}
              <div className="border-r border-border bg-secondary/30 p-4">
                <div className="mb-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Add Website
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Input
                      placeholder="Paste URL..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="h-9 bg-background text-sm"
                    />
                    <Button size="sm" className="h-9 shrink-0 bg-primary px-3 text-primary-foreground">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your Websites
                  </div>
                  {[
                    { name: "docs.stripe.com", status: "ready" },
                    { name: "react.dev", status: "ready" },
                    { name: "tailwindcss.com", status: "crawling" },
                  ].map((site, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-background/50 px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{site.name}</span>
                      </div>
                      <span className={`text-xs ${site.status === "ready" ? "text-green-400" : "text-primary"}`}>
                        {site.status === "ready" ? "● Ready" : "⟳ Crawling"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat area */}
              <div className="flex flex-col p-4">
                <div className="mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Chat with docs.stripe.com</span>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <span className="text-sm font-medium text-foreground">U</span>
                    </div>
                    <div className="rounded-lg bg-secondary px-4 py-2 text-sm text-foreground">
                      How do I implement Stripe webhooks in Next.js?
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="rounded-lg bg-card border border-border px-4 py-2 text-sm text-foreground">
                      Based on Stripe's docs, here's how to set up webhooks in Next.js App Router...
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Input placeholder="Ask anything about this website..." className="bg-background" />
                  <Button className="bg-primary text-primary-foreground">Send</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
