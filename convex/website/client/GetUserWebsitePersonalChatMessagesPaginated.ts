import { v } from "convex/values";
import { query } from "../../_generated/server";
import { paginationOptsValidator } from "convex/server";

export default query({
  args: { paginationOpts: paginationOptsValidator, chat_id:v.id("personal_chat") },
    handler: async (ctx, { paginationOpts, chat_id }) => {
        const auth = await ctx.auth.getUserIdentity();
        if(!auth){
            throw new Error("Unauthorized");
        }
        const websites = await ctx.db.query("personal_message")
        .withIndex("by_chat_user", q => 
            q.eq("chat_id",chat_id)
            .eq("user_id",auth.subject)
        )
        .order("asc")
        .paginate(paginationOpts);
        return websites;
    }
})