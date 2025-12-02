import { Brain, Globe, MessageSquare, Search, Layers, Zap } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Single Website Chat",
    description: "Upload once, chat forever. Each website becomes its own AI agent with full context of every page.",
  },
  {
    icon: Layers,
    title: "Multi-Chat Sessions",
    description: "Start multiple independent chats on the same website. Different contexts, same knowledge base.",
  },
  {
    icon: Brain,
    title: "Long-Term Memory",
    description: "Your agent never forgets. New documents and updates are instantly available across all chats.",
  },
  {
    icon: Search,
    title: "Internal Search",
    description: "Search deep inside your knowledge base. Find buried info across all your uploaded sites.",
  },
  {
    icon: Zap,
    title: "Real-Time Sync",
    description: "Re-crawl websites anytime. Keep your knowledge base fresh and up-to-date automatically.",
  },
  {
    icon: MessageSquare,
    title: "Smart Responses",
    description: "Get accurate, contextual answers. Our AI understands structure, hierarchy, and relationships.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Everything you need to chat with the web
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed for research, automation, and deep analysis.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-card/80"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
