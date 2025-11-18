import { ConvexError, v } from "convex/values";
import { query } from "../../_generated/server";

export default query({
    args: {
        website_id: v.id("website"),
    },
    handler: async (ctx, { website_id }) => {
        const auth = await ctx.auth.getUserIdentity();
        if(!auth){
            throw new ConvexError("Unauthorized");
        }
        const website = await ctx.db.get(website_id);
        if(!website || website.user_id !== auth.subject){
            throw new ConvexError("Not Found");
        }
        return website;
    }
});


export const getTranscribeDb = query({
     args: {
        website_id: v.id("website"),
    },
    handler: async (ctx, { website_id }) => {
        const auth = await ctx.auth.getUserIdentity();
        if(!auth){
            throw new ConvexError("Unauthorized");
        }
        const website_transcribe = await ctx.db.query("website_transcribe")
        .withIndex("by_user_website", q => 
            q.eq("user_id", auth.subject).eq("website_id", website_id)
        )
        .first();
        if(!website_transcribe){
            throw new ConvexError("Not Found");
        }
        return website_transcribe;
    }
})
