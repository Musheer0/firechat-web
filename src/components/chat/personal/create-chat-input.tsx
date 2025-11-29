"use client"

import React, { useCallback, useState, useTransition } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { Button } from "@/components/ui/button"
import { Loader2, SendIcon } from "lucide-react"
import { useAction } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const CreateChatInput = ({ id }: { id: Id<"website"> }) => {
  const createChat = useAction(api.website.client.CreatePersonalChat.default)
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
 const router =useRouter()
  const handleSend = useCallback(() => {
    setError(null)
    startTransition(async () => {
      try {
        if (!message.trim()) {
          setError("Message cannot be empty.")
          return
        }

        const chatid = await createChat({ websiteId:id,initialMessage:message});
        router.push(`/app/websites/${id}/chats/${chatid.chatId}`)
        setMessage("")
      } catch (err: any) {
        setError(err?.message || "Failed to send. Try again later.")
      }
    })
  }, [message, id])

  return (
    <div
    style={
       {boxShadow:`
                                0px -1px 0px rgb(74 ,67,64),
                                0px 1px  2px rgb(22,22,22) 
                                `}
    }
      className={cn(
        "flex flex-col gap-2 shadow-2xl w-full max-w-xl bg-linear-180 from-sidebar-primary/50  to-sidebar-primary rounded-2xl p-2  transition-all duration-300",
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
          "w-full resize-none bg-transparent outline-none  text-base p-1 rounded-lg",
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
          size={'icon'}
          variant={"csecondary"}
          onClick={handleSend}
          disabled={isPending || !message.trim()}
          className={cn(
            "flex items-center rounded-full gap-2 transition-all",
            isPending && "cursor-not-allowed opacity-75"
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default CreateChatInput
