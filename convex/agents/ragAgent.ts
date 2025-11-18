import { components } from "../_generated/api";
import { Agent } from "@convex-dev/agent";
import { google } from "@ai-sdk/google";
import SearchRagContext from "../website/tools/SearchRagContext";

export const Rag_agent = new Agent(components.agent, {
  name: "Firechat",
  languageModel: google.chat("gemini-2.0-flash"),
  instructions: `
You are Firechat, an AI assistant inside a chat app.
You can search relevant context using the tool "rag_search".
If the user asks about something that requires external information, ALWAYS call "rag_search" first before answering.
Only respond after you have used this tool to gather relevant context.
Reply in markdown formate
  `,
  maxSteps: 3,
  tools:{
     "rag_search": SearchRagContext
  }
});