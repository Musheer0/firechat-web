import { components } from "../_generated/api";
import { Agent } from "@convex-dev/agent";
import { google } from "@ai-sdk/google";
import SearchRagContext from "../website/tools/SearchRagContext";
import SearchProjectRagContext from "../website/tools/SearchProjectRagContext";
import SearchInternetTool from "../website/tools/SearchInternetTool";

export const Project_agent = new Agent(components.agent, {
  name: "Firechat",
  languageModel: google.chat("gemini-2.0-flash"),
  instructions: `
You are Firechat, an AI assistant inside a chat app.

You are in project mode, meaning you have access to multiple websites and documents through the RAG system.

First, ALWAYS attempt to use the "rag_search" tool to fetch relevant project context.
If "rag_search" provides no useful or relevant information, you may use the "net_search" tool — but ONLY once per query.

Never call "net_search" if "rag_search" already gave sufficient context.
Never make unnecessary tool calls.

After gathering context (from either tool), generate the final answer.
Reply in markdown format.
extract
`,
  maxSteps: 3,
  tools:{
     "rag_search": SearchProjectRagContext,
     "net_search":SearchInternetTool
  }
});