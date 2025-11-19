import { query } from "../../_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

export default query({
  args: {
    projectId: v.id("project"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { projectId, paginationOpts }) => {
    const auth = await ctx.auth.getUserIdentity();
    if (!auth) throw new Error("Unauthorized");

    // Paginated messages for a specific project
    const messages = await ctx.db
      .query("project_message")
      .withIndex("by_project", (q) => q.eq("project_id", projectId))
      .order("asc")
      .paginate(paginationOpts);

    return messages;
  },
});
