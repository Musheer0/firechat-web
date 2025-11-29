import { query } from "../../_generated/server";
import { paginationOptsValidator } from "convex/server";

export default query({
  args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, { paginationOpts }) => {
        const auth = await ctx.auth.getUserIdentity();
        if(!auth){
            throw new Error("Unauthorized");
        }
        const websites = await ctx.db.query("website")
        .withIndex("by_user", q => 
            q.eq("user_id", auth.subject)
        )
        .order("desc")
        .paginate(paginationOpts);
        return websites;
    }
})