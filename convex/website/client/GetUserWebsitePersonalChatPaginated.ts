import { v } from "convex/values";
import { query } from "../../_generated/server";
import { paginationOptsValidator } from "convex/server";

export default query({
  args: { paginationOpts: paginationOptsValidator, website_id:v.id("website") },
    handler: async (ctx, { paginationOpts,website_id }) => {
        const auth = await ctx.auth.getUserIdentity();
        if(!auth){
            throw new Error("Unauthorized");
        }
        const websites = await ctx.db.query("personal_chat")
        .withIndex("by_user_website", q => 
            q.eq("user_id", auth.subject)
            .eq("website_id",website_id)
        )
        .order("desc")
        .paginate(paginationOpts);
        return websites;
    }
})