import { ConvexError, v } from "convex/values";
import { internalMutation } from "../../_generated/server";

export default internalMutation({
    args:{
          website_id: v.id("website"),
                transcript: v.string(),
                metadata:v.object({  favicon: v.string(),
      og_banner: v.string(),
      title: v.string(),
      description: v.optional(v.string()),}),
                link:v.array(v.string()),
                images:v.array(v.string()),
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauthorized");
        const website_transcribe_id = await ctx.db.insert("website_transcribe",{
            ...args,
            user_id:auth.subject
        });
        return website_transcribe_id
    }
});
