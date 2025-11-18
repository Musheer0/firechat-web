import { v } from "convex/values";
import { internalMutation } from "../../_generated/server";

/**
 * Warning this function should be called in ssr only 
 *this function has no auth checks just quick delete for instant rollbacks and stuff on failure
 */
export default internalMutation({
    args:{
        id:v.id("project")
    },
    handler:async (ctx,args)=>{
        await ctx.db.delete(args.id)
    }
})