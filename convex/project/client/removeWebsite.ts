import { ConvexError, v } from "convex/values";
import { action } from "../../_generated/server";
import { internal } from "../../_generated/api";
import { rag } from "../../rag";
import { EntryId } from "@convex-dev/rag";

export default action({
    args:{
                websites:v.array(v.id("website")),
                entry_ids:v.array(v.string()),
                project_id:v.id("project")
    },
    handler:async(ctx,args)=>{
        const auth  = await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauthorized");
        await ctx.runMutation(internal.project.server.removeWebsiteInternal.default,{
            ...args
        });
        for (const entry_id of args.entry_ids){
            try {
                await rag.delete(ctx,{entryId:entry_id as EntryId});
            } catch (error) {
                console.error(`
                    
                    [error deleting entry id][${entry_id}]`,
                    error
                );
            }
        };
    }
})