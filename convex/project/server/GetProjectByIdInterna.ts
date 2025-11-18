import { v } from "convex/values";
import { internalMutation } from "../../_generated/server";

/**
 * Warning no auth check just pull up quickly
 */
export default internalMutation({
    args:{
        project_id:v.id("project")
    },
    handler:async(ctx,args)=>{
        return ctx.db.get(args.project_id);
    }
})