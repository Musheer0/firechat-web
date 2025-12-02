import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { ProjectMultiChat } from "@/components/project-multi-chat"
import { MemorySearch } from "@/components/memory-search"
import { Footer } from "@/components/footer"

export default function page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <ProjectMultiChat />
      <MemorySearch />
      <Footer />
    </main>
  )
}
