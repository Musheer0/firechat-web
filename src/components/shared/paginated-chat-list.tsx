"use client"
import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ChatMessage {
  _id: string
  role: "user" | "assistant" | "system"
  content: string
  pending?: boolean
}

interface ChatListUIProps {
  messages: ChatMessage[]
  loadMore: () => void
  isLoading: boolean
  canLoadMore: boolean
  className?: string
  bubbleClassName?: string
  userBubbleClassName?: string
  assistantBubbleClassName?: string
}

export function ChatListUI({
  messages,
  loadMore,
  isLoading,
  canLoadMore,
  className,
  bubbleClassName,
  userBubbleClassName,
  assistantBubbleClassName,
}: ChatListUIProps) {

  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({behavior:"smooth"})
    }
  }, [messages.length])

  return (
    <div
      className={cn("flex flex-col gap-2 overflow-auto p-2", className)}
    >
      {canLoadMore && (
        <button
          disabled={isLoading}
          onClick={loadMore}
          className="mx-auto px-4 py-1 rounded bg-neutral-700 text-sm"
        >
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}

      {messages.map((m) => (
        <div
          key={m._id}
          style={{
            boxShadow: `
              0px 0.5px 0px rgb(47 47 47),
              0px 5px 4px rgb(0,0,0,0.1) inset
            `
          }}
          className={cn(
            "p-4 w-fit max-w-[90%] rounded-2xl",
            bubbleClassName,
            m.role === "user"
              ? cn("bg-sidebar-primary/50 rounded-br-none ml-auto", userBubbleClassName)
              : cn("bg-primary rounded-bl-none", assistantBubbleClassName)
          )}
        >
          {m.content}
        <div ref={scrollRef}></div>
        </div>
      ))}
    </div>
  )
}
