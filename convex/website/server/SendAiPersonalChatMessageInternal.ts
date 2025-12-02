import { ConvexError, v } from "convex/values";
import { internalMutation } from "../../_generated/server"

export default internalMutation({
      args:{
            messageId:v.id("personal_message"),
            messageText:v.string(),
        },
        handler: async (ctx, { messageId, messageText }) => {
            console.log('Hello')
            const auth = await ctx.auth.getUserIdentity();
            if(!auth ) throw new ConvexError("Unauthenticated");
            await ctx.db.patch(messageId,{
                content:messageText,
                pending:false
            })
           
        }
})