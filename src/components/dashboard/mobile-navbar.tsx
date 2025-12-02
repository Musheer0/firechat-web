"use client"

import Link from "next/link"
import { BrowserIcon, AddressBookIcon } from "@hugeicons/core-free-icons"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useState } from "react"

const items = [
  { name: "websites", route: "/app/websites", icon: BrowserIcon },
  { name: "projects", route: "/app/projects", icon: AddressBookIcon },
]

import { usePathname } from "next/navigation"

export default function MobileBottomBar() {


  return (
        <SidebarTrigger className="scale-125 fixed bottom-5 left-3 rounded-md bg-sidebar-primary p-3 border border-zinc-800" />

  )
}
