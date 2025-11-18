import { ConvexError, v } from "convex/values";
import { internalMutation } from "../../_generated/server";

export default internalMutation({
    args:{
       name: v.string(),
       url: v.string(),
       description: v.string(),
       faviconUrl: v.string(),
       ogBannerUrl: v.string(),
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth ) throw new ConvexError("Unauthorized");
        const website_id = await ctx.db.insert("website",{
            ...args,
            user_id:auth.subject
        });
        return website_id
    }
})