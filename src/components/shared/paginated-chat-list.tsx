"use client"
import React, { useEffect, useRef } from "react"
import { usePaginatedQuery } from "convex/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Id } from "../../../../convex/_generated/dataModel"

interface ChatListProps {
  projectId: Id<"project">
  queryFn: any
  initialNumItems?: number
  className?: string
  bubbleClassName?: string
  userBubbleClassName?: string
  assistantBubbleClassName?: string
}

export function PaginatedChatList({
  projectId,
  queryFn,
  initialNumItems = 10,
  className,
  bubbleClassName,
  userBubbleClassName,
  assistantBubbleClassName,
}: ChatListProps) {
  const { loadMore, isLoading, results, status } = usePaginatedQuery(
    queryFn,
    { projectId },
    { initialNumItems }
  )

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [results.length])

  return (
    <div
      ref={scrollRef}
      className={cn("flex flex-col gap-3 overflow-auto p-2", className)}
    >

      {status === "CanLoadMore" && (
        <Button
          disabled={isLoading}
          onClick={() => loadMore(10)}
          className="mx-auto my-2"
        >
          {isLoading ? "Loading..." : "Load more"}
        </Button>
      )}

      {results.map((m) => (
        <div
          key={m._id}
          style={{
            boxShadow: `
              0px 0.5px 0px rgb(47 47 47),
              0px 5px 4px rgb(0,0,0,0.1) inset
            `,
          }}
          className={cn(
            "p-4 w-fit max-w-[85%] rounded-2xl",
            bubbleClassName,
            m.role === "user"
              ? cn(
                  "bg-sidebar-primary/50 rounded-br-none ml-auto",
                  userBubbleClassName
                )
              : cn(
                  "bg-primary rounded-bl-none",
                  assistantBubbleClassName
                )
          )}
        >
          {m.content}
          {m.pending && "r"}
        </div>
      ))}
    </div>
  )
}
