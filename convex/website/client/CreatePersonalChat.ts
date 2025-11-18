import { v } from "convex/values";
import { action, mutation } from "../../_generated/server";
import { internal } from "../../_generated/api";
import { Id } from "../../_generated/dataModel";
import { Rag_agent } from "../../agents/ragAgent";

export default action({
    args:{
        initialMessage:v.optional(v.string()),
        websiteId:v.id("website"),
    } ,
    handler:async(ctx,args):Promise<{chatId:Id<"personal_chat">}>=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth){
            throw new Error("Not authenticated");
        }
        // get website details
        const website = await ctx.runQuery(internal.website.server.QueryUserWebsiteInternal.default,{
            website_id:args.websiteId
        })
        // generate title
        const title = await ctx.runAction(internal.website.server.generateChatTitlte.default,{
            title:website.name,
            firstMessage:args.initialMessage||"",
            userId:auth.subject
        });
       // create ai thread
        const {threadId} = await Rag_agent.createThread(ctx,{
            userId: auth.subject
        })
        // finalyy create chat
        const chatId = await ctx.runMutation(internal.website.server.CreateChatInternalMutation.default,{
            initialMessage:args.initialMessage,
            websiteId:args.websiteId,
            title:title,
            website:website,
            threadId:threadId
        });
        //send initial message
       if(args.initialMessage){
         await ctx.runMutation(internal.website.server.SendUserPersonalChatMessageInternal.default,{
            chatId:chatId,messageText:args.initialMessage
        });
         const {text,...rest} =await Rag_agent.generateText(ctx,{
            threadId,
            userId:auth.subject,

        },{
            prompt:`
            <website_id>${args.websiteId}</website_id>
            <user_message>${args.initialMessage}</user_message>
            `
        });
             const messageId = await ctx.runMutation(internal.website.server.CreateInitialPersonalAiMessage.default,{
                    chatId:chatId,
                });
         await ctx.runMutation(internal.website.server.SendAiPersonalChatMessageInternal.default,{
                    messageId,
                    messageText:text
                });
       }
        return {chatId:chatId }
    }
})