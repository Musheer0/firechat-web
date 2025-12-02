import type { Metadata } from "next";
import { Geist, Geist_Mono ,Host_Grotesk} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {shadcn} from '@clerk/themes'
import { ThemeProvider } from "@/components/theme-provider";
const font = Host_Grotesk({
  subsets:['latin-ext']
})
export const metadata: Metadata = {
  title: "Firechat - Chat With Any Website",
  description: "Paste URL → Crawl → Vectorize → Chat Forever. Build multi-site AI agents with long-term memory.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
      <ClerkProvider
        appearance={{
              baseTheme: shadcn,
            }}
      >
      <body
        className={`${font.className} antialiased`}
      >
         {children}
      </body>
       </ClerkProvider>
       </ThemeProvider>
    </html>
  );
}
