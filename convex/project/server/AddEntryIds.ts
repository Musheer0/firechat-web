import { internalMutation } from "../../_generated/server";
import { ConvexError, v } from "convex/values";

export default internalMutation({
    args:{
      entryIds:v.array(v.string()),
      id:v.id("project")

    },
    handler:async(ctx,args)=>{
           const auth = await ctx.auth.getUserIdentity();
                if(!auth) throw new  ConvexError("Un authorized");
           await ctx.db.patch(args.id,{
            entry_ids:args.entryIds
           })
    }
})