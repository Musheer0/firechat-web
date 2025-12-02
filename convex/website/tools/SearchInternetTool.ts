import { createTool } from "@convex-dev/agent";
import z from "zod";
import { Id } from "../../_generated/dataModel";

export default createTool({
  description: `
    A tool that lets the AI either:
    1) Search the internet using Firecrawl, or
    2) Scrape a website by URL.
    The AI must pass ONLY { query } OR { url } in the body.
  `,
  args: z.object({
    query: z.string().optional(),
    url: z.string().optional(),

  }).refine(
    (data) => data.query || data.url,
    "Either 'query' or 'url' must be provided."
  ),

  handler: async (ctx, args) => {
    try {
   
        const body = JSON.stringify(args);
    
      const req = await fetch(process.env.CONVEX_SEARCH_ENDPOINT!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X_CONVEX_TOKEN": process.env.CONVEX_TOKEN || "",
        },
        body,
      });

      if (!req.ok) {
        throw new Error(`Search tool failed: ${req.status} ${req.statusText}`);
      }

      return await req.json();
    } catch (err) {
      console.error("Convex Search Tool Error:", err);
      throw err;
    }
  },
});
