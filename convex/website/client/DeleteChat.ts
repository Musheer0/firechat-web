import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export default mutation({
    args:{
        chatId:v.id("personal_chat"),
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth){
            throw new Error("Not authenticated");
        }
        const chat = await ctx.db.get(args.chatId);
        if(!chat){
            throw new Error("Chat not found");
        }
        if(chat.user_id !== auth.subject){
            throw new Error("Unauthorized");
        }
        await ctx.db.delete(args.chatId);
        
        return {success:true};
    }
})