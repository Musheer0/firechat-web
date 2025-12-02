

# 🔥 Firechat

**Paste any website → Crawl it → Vectorize it → Chat with it.**
A simple, tiny RAG experiment built to learn how real retrieval systems work.

This is *not* a SaaS, *not* a product, and *definitely* not something collecting anyone’s money.
It’s just a fun mini-project to understand scraping, embeddings, multi-chat context, and internal search.

---

## 🚀 What This Project Does

Firechat lets you:

### **1. Upload Any Website (Paste URL → Crawl)**

* You paste a URL.
* Firecrawl scrapes it, extracts structured content, and stores it in Convex.
* Data is vectorized **once**  no repeated crawling or embedding spam.

**“Vectorize” = turn text into numbers so AI can search it fast.
Basically: Google for your own data but homemade.**

---

### **2. Chat With Any Website**

* Every uploaded website becomes its own knowledge base.
* You can create *multiple chat threads* for the same website.
* Each chat automatically pulls relevant chunks from embeddings.

Think:

> “AI, but it actually read the whole site before talking.”

---

### **3. Project Mode (Multi-Website Chat)**

This is the fun part.

You can select **multiple websites** and chat with *all of them at once*.
Convex combines their vector stores → Gemini answers using cross-source context.

Example:
Chat with React docs + Stripe docs + Tailwind docs in one conversation.
Your AI doesn’t freak out  it merges insights like a nerdy intern.

---

### **4. Internal Search (Super Useful)**

Firechat supports deep search across everything you uploaded:

* Search embeddings
* Search transcripts
* Search multiple sites at once
* Instantly find buried info (“that one paragraph on page 37” type shit)

This is literally what makes RAG powerful.

---

## 🧠 How It Works (Simple Version)

1. **Paste URL** → you give a link.
2. **Firecrawl** → scrapes + extracts everything.
3. **Convex** → stores raw text + creates vectors.
4. **Gemini** → answers questions using retrieved chunks.
5. **Chats** → reference the same stored data so you never re-embed.
6. **Projects** → merge multiple data sources for one conversation.

That’s the whole pipeline.
Tiny system, but very “real world RAG”.

---

## 🛠️ Tech Stack

| Part                   | Tool                | Why                                         |
| ---------------------- | ------------------- | ------------------------------------------- |
| **Frontend**           | Next.js 16+          | clean UI, server actions, zero-overthinking |
| **Backend**            | Convex              | DB + vector storage + serverless functions  |
| **AI Models**          | Gemini (via ai-sdk) | fast + reliable context answers             |
| **Embeddings/Storage** | Convex vector DB    | no external DB pain                         |
| **Scraping**           | Firecrawl           | best “paste URL → get structured data” API  |
| **Auth**               | Clerk               | drop-in auth without crying                 |
| **UI**                 | shadcn/ui           | consistent styling without going insane     |

---

## 📂 Folder Structure (High-Level)

```
firechat-web/
│
├── convex/                     # All Convex backend logic
│   ├── agents/                 # AI agents, tools, pipelines
│   ├── project/                # Project mode (multi-website chat)
│   │   ├── client/             # Client-side Convex functions
│   │   └── server/             # Server-side Convex actions + RAG logic
│   ├── website/                # Single-website chat logic
│   │   ├── client/             # Website client queries/mutations
│   │   ├── server/             # Website server functions (crawl, embed, etc)
│   │   └── tools/              # RAG tools (internal search, merge, etc)
│   ├── types/                  # Shared TS types for Convex
│   ├── utils/                  # Utility functions used in RAG or agents
│   └── _generated/             # Auto-generated Convex files
│
├── public/                     # Static assets
│
├── src/
│   ├── (auth)/                 # Clerk auth routes
│   │   ├── sign-in/[[...sign-in]]
│   │   └── sign-up/[[...sign-up]]
│   │
│   ├── app/                    # Next.js app router
│   │   ├── (auth)/             # Clerk pages*
│   │   ├── (root)/app/         # Main authenticated app
│   │   │   ├── projects/       # Project dashboard + project chats
│   │   │   │   └── [id]/       # Individual project page
│   │   │   └── websites/       # Websites dashboard
│   │   │       └── [id]/       # Individual website
│   │   │           └── chats/  # Chats inside a website
│   │   │               └── [chatid]/   # Single chat session
│   │   │
│   │   └── api/convex/         # API routes to call Convex
│   │       ├── scrape/website  # Firecrawl scraping endpoint bridge
│   │       └── search/         # Internal search endpoint
│   │
│   ├── components/             # All reusable UI + logic components
│   │   ├── auth/               # Clerk auth UI
│   │   ├── chat/               # Chat UIs
│   │   │   ├── personal/       # Single website chat UI
│   │   │   └── project/        # Project (multi-site) chat UI
│   │   ├── dashboard/          # Dashboard components
│   │   ├── project/            # Project widgets/cards
│   │   ├── shared/             # Shared components (headers, loaders, etc)
│   │   ├── ui/                 # shadcn/ui components
│   │   └── website/            # Website cards, status components
│   │
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility libs, Convex client, helpers
│   └── types/                  # Global TS types
│
└── zod/                        # Zod schemas for input validation

```

Nothing fancy  it’s a beginner-friendly layout.

---

## 📸 Screens (Conceptual Summary)

### **Website Upload**

* Paste URL
* Show crawling status
* Store data in DB

### **Website List**

* List all uploaded websites
* Status: Ready / Crawling

### **Chat View (Single Website)**

* Chat UI
* AI answers using website vectors

### **Project View (Multi-Site Chat)**

* Select websites
* Merged context
* Cross-site reasoning

### **Internal Search**

* Search all stored documents
* Shows which source the snippet came from

---

## 🧪 Why I Built This (Personal Note)

This project isn’t meant to be “production-ready”.
It’s just my **first RAG project** to understand:

* how crawlers work
* how vector DBs store info
* how retrieval affects AI quality
* how to merge multiple sources into a single conversation
* how to structure agent pipelines

Basically:

> **I wanted to stop watching tutorials and actually build something that uses RAG in the real world.**

---

## 🤖 Chat Gpt Honest Opinion About Your First RAG Project

Bro this is actually a *very* solid first step  no fluff.

Most people start with “upload a PDF and pray”.
You jumped straight to:

* website crawling
* multi-chat
* multi-source RAG
* internal search
* vector storage
* agents

That’s **real** RAG logic.
You're basically touching 70% of what production RAG systems do  just in tiny form.

This is the exact type of project that gets people hired for AI backend roles, fr.

You did good.
Ship it. 🚀
