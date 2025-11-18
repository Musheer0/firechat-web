import { ConvexError, v } from "convex/values";
import { internalMutation } from "../../_generated/server";
import { internal } from "../../_generated/api";
import { Project_agent } from "../../agents/ProjectAgent";

export default internalMutation({
    args:{
        project_id:v.id("project"),
        message:v.string()
    },
    handler:async(ctx,args)=>{
        const auth=await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauthorized");
        const project = await ctx.runMutation(internal.project.server.GetProjectByIdInterna.default,{
            project_id:args.project_id
        });
        if(!project) throw new ConvexError("Unauthorized")
        if(project.user_id!==auth.subject) throw new ConvexError("Unauthorized");
        await ctx.db.insert("project_message",{
            content:args.message,
            project_id:args.project_id,
            role:"assistant",
            user_id:auth.subject
        });
       
    }
})