"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Flame, Menu, X } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Firechat</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </a>
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#projects" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Projects
          </a>
          <a href="#memory" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Memory
          </a>
        </div>

        <div className="hidden items-center gap-4 md:flex">
         <Link href={'/sign-in'}>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Log in
          </Button>
         </Link>
        <Link href={'/app/websites'}>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Start Free</Button>
        </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#how-it-works" className="text-sm text-muted-foreground">
              How It Works
            </a>
            <a href="#features" className="text-sm text-muted-foreground">
              Features
            </a>
            <a href="#projects" className="text-sm text-muted-foreground">
              Projects
            </a>
            <a href="#memory" className="text-sm text-muted-foreground">
              Memory
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                Log in
              </Button>
              <Button className="w-full bg-primary text-primary-foreground">Start Free</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
