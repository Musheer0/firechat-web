import { v } from "convex/values";
import { internalMutation} from "../../_generated/server";

export default internalMutation({
    args:{
        websiteId:v.id("website"),
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new Error("Unauthorized");
        const website = await ctx.db.get(args.websiteId);
        if(!website) throw new Error("Website not found");
        if(website.user_id !== auth.subject) throw new Error("Forbidden");
        
        await ctx.db.delete(args.websiteId);
        const transcribes = await ctx.db.query("website_transcribe").withIndex("by_user_website",(q)=>q.eq("user_id",auth.subject).eq("website_id",args.websiteId)).first();
        if(transcribes){
            await ctx.db.delete(transcribes._id);
            
        }
        return website
    }
})