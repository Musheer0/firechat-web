"use client"

import React, { useCallback, useState, useTransition } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { Button } from "@/components/ui/button"
import { Loader2, SendIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => Promise<any>
  placeholder?: string
  minRows?: number
  maxRows?: number
  disabled?: boolean
  className?: string
}

const ChatInput = ({
  onSend,
  placeholder = "Type a message...",
  minRows = 3,
  maxRows = 6,
  disabled = false,
  className,
}: ChatInputProps) => {
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSend = useCallback(() => {
    if (!message.trim()) {
      setError("Message cannot be empty.")
      return
    }

    setError(null)

    startTransition(async () => {
      try {
        await onSend(message)
        setMessage("")
      } catch (err: any) {
        setError(err?.message || "Failed to send. Try again later.")
      }
    })
  }, [message, onSend])

  const isDisabled = disabled || isPending

  return (
    <div
      className={cn(
        "flex flex-col gap-2 relative w-full rounded-2xl bg-sidebar-primary transition-all duration-300",
        isPending ? "opacity-70 pointer-events-none" : "opacity-100",
        className
      )}
    >
      <TextareaAutosize
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isDisabled}
        className={cn(
          "w-full resize-none bg-transparent outline-none text-base p-2 rounded-lg",
          error
            ? "border-destructive focus-visible:ring-destructive"
            : "border-input focus-visible:ring-ring"
        )}
      />

      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error}</p>
      )}

      <div className="absolute bottom-2 right-2 flex justify-end">
        <Button
          size="icon"
          variant="csecondary"
          onClick={handleSend}
          disabled={isDisabled || !message.trim()}
          className="flex items-center gap-2 transition-all"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <SendIcon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default ChatInput
