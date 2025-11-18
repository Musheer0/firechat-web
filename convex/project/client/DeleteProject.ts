import { ConvexError, v } from "convex/values";
import { action, mutation } from "../../_generated/server";
import { internal } from "../../_generated/api";
import { EntryId } from "@convex-dev/rag";

export default action({
    args:{
        project_id:v.id("project")
    },
    handler:async(ctx,args)=>{
        const auth =await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauhorized");
        const project = await ctx.runMutation(internal.project.server.GetProjectByIdInterna.default,{
            project_id:args.project_id
        });
        if(!project) throw new ConvexError("Not found");
        if(project.user_id!==auth.subject) throw new ConvexError("Unauhorized");
        await ctx.runMutation(internal.project.server.DeleteProjectInternal.default,{
           id:args.project_id
        });
        for (const entry_id of project.entry_ids) {
           await ctx.runAction(internal.utils.deleteByEntryId.default,{
            entry_id:entry_id as EntryId
           })
        }
    }
})