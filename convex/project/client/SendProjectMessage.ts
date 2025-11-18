import { ConvexError, v } from "convex/values";
import { action } from "../../_generated/server";
import { internal } from "../../_generated/api";
import { Project_agent } from "../../agents/ProjectAgent";

export default action({
    args:{
   project_id:v.id("project"),
        message:v.string()
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauhtorized");
        const project = await ctx.runMutation(internal.project.server.GetProjectByIdInterna.default,{project_id:args.project_id})
        if(!project ||project.user_id!==auth.subject) throw new ConvexError("Unauhtorized");
        await ctx.runMutation(internal.project.server.SendProjectMessageInternal.default,args);
        const {text} = await Project_agent.generateText(ctx,{
            threadId:project.threadId,
            userId:project.user_id
        },{prompt:`
            <project_metadata>
            ${project.initial_prompt}
            </project_metadata>
               <project_id>${project._id}</project_id><user_message>${args.message}</user_message>
            `});
        await ctx.runMutation(internal.project.server.SendProjectAiMesssageInternal.default,{
            ...args,
            message:text
        });
    }
})