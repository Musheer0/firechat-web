"use client"

import ChatInput from "@/components/shared/ai-chat-input"
import { useAction } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"

const SendChatMessageInput = ({ id }: { id: Id<"personal_chat"> }) => {
  const sendMsg = useAction(
    api.website.client.SendPersonalChatMessage.default
  )

  return (
    <ChatInput
      placeholder="Ask anything about the website..."
      minRows={2}
      maxRows={6}
      className="bg-muted/30 border p-3 sm:p-4 rounded-2xl"
      onSend={(message) =>
        sendMsg({ chatId: id, messageText: message })
      }
    />
  )
}

export default SendChatMessageInput
