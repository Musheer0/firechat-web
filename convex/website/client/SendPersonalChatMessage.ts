import { ConvexError, v } from "convex/values";
import { action} from "../../_generated/server";
import {  internal } from "../../_generated/api";
import { Rag_agent } from "../../agents/ragAgent";

export default action({
    args:{
        chatId:v.id("personal_chat"),
        messageText:v.string(),
    },
    handler: async (ctx, { chatId, messageText }) => {
        const auth = await ctx.auth.getUserIdentity();
        if(!auth ) throw new ConvexError("Unauthenticated");
       const chat = await ctx.runMutation(internal.website.server.SendUserPersonalChatMessageInternal.default,{
        chatId:chatId,
        messageText:messageText
       });
            const messageId = await ctx.runMutation(internal.website.server.CreateInitialPersonalAiMessage.default,{
            chatId:chatId
        })
      
         try {
              const {text} =await Rag_agent.generateText(ctx,{
            threadId:chat.threadId,
            userId:auth.subject,

        },{
            prompt:`
            <website_id>${chat.website_id}</website_id><user_message>${messageText}</user_message>
            `
        })
   
            await ctx.runMutation(internal.website.server.SendAiPersonalChatMessageInternal.default,{
            messageText:text,
            messageId
             })
         } catch (error) {
           await ctx.runMutation(internal.website.server.SendAiPersonalChatMessageInternal.default,{
            messageText:"error calling agent",
            messageId
             })
         }
        return {success:true}
    }
})