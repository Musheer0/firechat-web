import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Brain, FileText, Search } from "lucide-react"

export function MemorySearch() {
  return (
    <section id="memory" className="border-t border-border px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual */}
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {/* Search header */}
              <div className="border-b border-border bg-secondary/50 p-4">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Internal Search</span>
                </div>
                <div className="mt-3">
                  <Input
                    placeholder="Search across all your websites..."
                    defaultValue="authentication best practices"
                    className="bg-background"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="p-4 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Found in 4 sources
                </div>
                {[
                  {
                    site: "auth0.com/docs",
                    title: "Authentication Best Practices",
                    excerpt: "Always use HTTPS, implement proper session management...",
                  },
                  {
                    site: "nextjs.org/docs",
                    title: "NextAuth.js Integration",
                    excerpt: "Secure authentication with built-in providers and JWT...",
                  },
                  {
                    site: "supabase.com/docs",
                    title: "Row Level Security",
                    excerpt: "Implement fine-grained access control at the database...",
                  },
                ].map((result, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:border-primary/30"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{result.site}</span>
                    </div>
                    <h4 className="mt-1 font-medium text-foreground">{result.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{result.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Memory & Search</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Your AI that never forgets
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Firechat's internal search digs through your entire knowledge base. Find information buried deep inside
              transcripts, docs, and uploaded data—instantly.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Deep Search",
                  description: "Search semantically across all vectorized content",
                },
                {
                  title: "Instant Recall",
                  description: "Surface relevant info from any uploaded website",
                },
                {
                  title: "Cross-Reference",
                  description: "Find connections between different sources",
                },
                {
                  title: "Always Fresh",
                  description: "Re-crawl to keep knowledge base up-to-date",
                },
              ].map((item, index) => (
                <div key={index} className="rounded-lg border border-border bg-card p-4">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <Button className="mt-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
