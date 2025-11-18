import { v } from "convex/values";
import { action, mutation } from "../../_generated/server";
import { internal } from "../../_generated/api";
import { rag } from "../../rag";
import { EntryId } from "@convex-dev/rag";

export default action({
    args:{
        websiteId:v.id("website"),
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new Error("Unauthorized");
        const website = await ctx.runMutation(internal.website.server.DeleteWebsiteFromDb.default,{
            ...args
        });
        if(!website.rag_entry_id){
            return
        }
        await rag.delete(ctx,{
            entryId: website.rag_entry_id as EntryId
        });
        return 
    }
})