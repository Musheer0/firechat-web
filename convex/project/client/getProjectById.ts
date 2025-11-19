import { ConvexError, v } from "convex/values";
import { query } from "../../_generated/server";

export default query({
    args:{
        project_id:v.id("project")
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauhtorized");
        const project = await ctx.db.get(args.project_id);
        if(!project) return null;
        if(project.user_id!==auth.subject) throw new ConvexError("Unauhtorized");
        const {entry_ids,initial_prompt,websites,...filtered} = project
        return filtered
    }
})