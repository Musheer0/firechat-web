"use client"

import React, { useCallback, useState, useTransition } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { Button } from "@/components/ui/button"
import { Loader2, SendIcon } from "lucide-react"
import { useAction } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { cn } from "@/lib/utils"

const CreateChatInput = ({ id }: { id: Id<"website"> }) => {
  const createChat = useAction(api.website.client.CreatePersonalChat.default)
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSend = useCallback(() => {
    setError(null)
    startTransition(async () => {
      try {
        if (!message.trim()) {
          setError("Message cannot be empty.")
          return
        }

        await createChat({ websiteId:id,initialMessage:message});
        setMessage("")
      } catch (err: any) {
        setError(err?.message || "Failed to send. Try again later.")
      }
    })
  }, [message, id])

  return (
    <div
      className={cn(
        "flex flex-col gap-2 w-full bg-muted/30 rounded-2xl border p-3 sm:p-4 transition-all duration-300",
        isPending ? "opacity-70 pointer-events-none" : "opacity-100"
      )}
    >
      <TextareaAutosize
        minRows={2}
        maxRows={6}
        placeholder="Ask anything about the selected website..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isPending}
        className={cn(
          "w-full resize-none bg-transparent outline-none text-base p-2 rounded-lg border",
          error
            ? "border-destructive focus-visible:ring-destructive"
            : "border-input focus-visible:ring-ring"
        )}
      />

      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error}</p>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleSend}
          disabled={isPending || !message.trim()}
          className={cn(
            "flex items-center gap-2 transition-all",
            isPending && "cursor-not-allowed opacity-75"
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Sending...
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4" />
              Send
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default CreateChatInput
