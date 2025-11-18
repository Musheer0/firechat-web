import { components } from "../_generated/api";
import { Agent } from "@convex-dev/agent";
import { google } from "@ai-sdk/google";

export const Titleagent = new Agent(components.agent, {
  name: "My Agent",
  languageModel: google.chat("gemini-2.0-flash"),
  instructions: "You are a title generator that creates concise and relevant titles for chat conversations based on their first message and website title.Generate Single Line title no markdown",
  maxSteps: 1,
});