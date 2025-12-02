import { Button } from "@/components/ui/button"
import { ArrowRight, Check, FolderOpen, Globe, Sparkles } from "lucide-react"

export function ProjectMultiChat() {
  return (
    <section id="projects" className="border-t border-border bg-secondary/20 px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
              <FolderOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Project Mode</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Chat with multiple websites at once
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Create projects that combine multiple websites into a single conversation. Your AI agent merges insights
              across all sources—like having a research assistant that's read everything.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Select multiple uploaded websites for unified context",
                "Agent merges insights across all sources automatically",
                "Add new documents anytime—agent never forgets",
                "Works like traditional AI with long-term memory",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button className="mt-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Try Project Mode
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Frontend Research</span>
                </div>
                <span className="text-xs text-muted-foreground">3 websites</span>
              </div>

              {/* Selected websites */}
              <div className="border-b border-border bg-secondary/30 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Project Sources
                </div>
                <div className="flex flex-wrap gap-2">
                  {["react.dev", "nextjs.org", "tailwindcss.com"].map((site, i) => (
                    <div key={i} className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm">
                      <Globe className="h-3.5 w-3.5 text-primary" />
                      <span className="text-foreground">{site}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div className="p-4 space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <span className="text-sm font-medium text-foreground">U</span>
                  </div>
                  <div className="rounded-lg bg-secondary px-4 py-2 text-sm text-foreground">
                    Compare React Server Components with Next.js App Router. How does Tailwind fit in?
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground">
                    <p className="mb-2">Based on all three sources, here's how they work together:</p>
                    <p className="text-muted-foreground">
                      React Server Components (from react.dev) enable server-side rendering at the component level.
                      Next.js App Router (from nextjs.org) builds on this with file-based routing...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
