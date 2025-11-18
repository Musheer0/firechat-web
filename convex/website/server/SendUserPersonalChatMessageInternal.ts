import { ConvexError, v } from "convex/values";
import { internalMutation } from "../../_generated/server"

export default internalMutation({
      args:{
            chatId:v.id("personal_chat"),
            messageText:v.string(),
        },
        handler: async (ctx, { chatId, messageText }) => {
            const auth = await ctx.auth.getUserIdentity();
            if(!auth ) throw new ConvexError("Unauthenticated");
            const chat = await ctx.db.get(chatId);
            if(!chat) throw new ConvexError("Chat not found");
            if(chat.user_id!== auth.subject) throw new ConvexError("Unauthorized");
            await ctx.db.insert("personal_message",{
                chat_id:chatId,
                content:messageText,
                role:"user",
                user_id:auth.subject
            });
           return chat
        }
})