import { v } from "convex/values";
import { internalMutation, mutation } from "../../_generated/server";

export default internalMutation({
    args:{
        initialMessage:v.optional(v.string()),
        websiteId:v.id("website"),
        title:v.string(),
        website:v.object({
             name: v.string(),
        url: v.string(),
        description: v.string(),
        faviconUrl: v.string(),
        ogBannerUrl: v.string(),
        user_id: v.string(),
        rag_entry_id: v.optional(v.string()),
        _id:v.id("website"),
        _creationTime:v.number()
        }),
        threadId:v.string()
    } ,
    handler:async(ctx,{website,...args})=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth){
            throw new Error("Not authenticated");
        }
        
        try {
        } catch (error) {
            console.error(`Error generating chat title: ${error}`);
        }
        const chat = await ctx.db.insert("personal_chat",{
            user_id:auth.subject,
            website_id:args.websiteId,
            faviconUrl:website.faviconUrl,
            name:args.title,
            threadId:args.threadId
    })
    return chat
}
})