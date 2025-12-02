import { components } from "../_generated/api";
import { Agent } from "@convex-dev/agent";
import { google } from "@ai-sdk/google";
import SearchRagContext from "../website/tools/SearchRagContext";
import SearchInternetTool from "../website/tools/SearchInternetTool";

export const Rag_agent = new Agent(components.agent, {
  name: "Firechat",
  languageModel: google.chat("gemini-2.0-flash"),
  instructions:`
You are Firechat, an AI assistant inside a chat app.

First, ALWAYS attempt to use the "rag_search" tool to fetch relevant context.
If "rag_search" returns no useful or relevant information, you may use the "net_search" tool — but ONLY once per query.

Never call "net_search" if "rag_search" already provided sufficient context.
Never call either tool more than needed.

After gathering context (from either tool), generate the final answer.
Reply in markdown format.
`,
  maxSteps: 4,
  tools:{
     "rag_search": SearchRagContext,
     "net_search":SearchInternetTool
  }
});