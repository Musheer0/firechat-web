import { v } from "convex/values";
import { internalMutation, mutation } from "../../_generated/server";

export default internalMutation({
    args:{
        entryId:v.string(),
        websiteId:v.id("website"),
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new Error("Unauthorized");
        await ctx.db.patch(args.websiteId,{
            rag_entry_id:args.entryId
        });
    }
})