import { ArrowRight, Database, Globe, MessageSquare, Zap } from "lucide-react"

const steps = [
  {
    icon: Globe,
    title: "Paste Any URL",
    description: "Drop in any website URL. Landing pages, docs, blogs—anything.",
  },
  {
    icon: Zap,
    title: "Auto Crawl & Parse",
    description: "Firecrawl scrapes and structures the entire site automatically.",
  },
  {
    icon: Database,
    title: "Vectorize Once",
    description: "Your data is embedded and stored. Ready for unlimited queries.",
  },
  {
    icon: MessageSquare,
    title: "Chat Forever",
    description: "Start conversations that understand every page on the site.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-secondary/20 px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four steps to turn any website into an intelligent knowledge base.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 text-muted-foreground lg:block lg:absolute lg:right-0 lg:top-7 lg:translate-x-1/2" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
