import { ConvexError, v } from "convex/values";
import { internalMutation } from "../../_generated/server"

export default internalMutation({
      args:{
            chatId:v.id("personal_chat"),
        },
        handler: async (ctx, { chatId}) => {
            const auth = await ctx.auth.getUserIdentity();
            if(!auth ) throw new ConvexError("Unauthenticated");
           const messageId =  await ctx.db.insert("personal_message",{
                chat_id:chatId,
                content:'pending',
                role:"assistant",
                user_id:auth.subject,
                pending:true
            });
           return messageId
        }
})