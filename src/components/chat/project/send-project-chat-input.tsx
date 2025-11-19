"use client"
import ChatInput from "@/components/shared/ai-chat-input"
import { useAction } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"

const SendProjectChatMessageInput = ({ id }: { id: Id<"project"> }) => {
  const sendMsg = useAction(api.project.client.SendProjectMessage.default)

  return (
    <ChatInput
      placeholder="Ask anything about the project"
      onSend={(message) =>sendMsg({ project_id: id, message })}
    />
  )
}

export default SendProjectChatMessageInput
