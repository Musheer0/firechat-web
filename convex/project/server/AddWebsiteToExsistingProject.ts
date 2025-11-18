import { ConvexError, v } from "convex/values";
import { internalMutation } from "../../_generated/server";

export default internalMutation({
    args:{
        websites:v.array(v.id("website")),
        entry_ids:v.array(v.string()),
        project_id:v.id("project")
    },
    handler:async(ctx,args)=>{
      const auth = await ctx.auth.getUserIdentity();
      if(!auth) throw new ConvexError("Un authorized");
      await ctx.db.patch(args.project_id,{
        websites:args.websites,
        entry_ids:args.entry_ids
      });
    }
})