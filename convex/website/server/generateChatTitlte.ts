import { v } from "convex/values";
import { internalAction } from "../../_generated/server";
import { Titleagent } from "../../agents/chatTitleGeneratorAgent";

export default internalAction({
    args:{
        title:v.string(),
        firstMessage:v.string(),
        userId:v.string()
    },
    handler:async(ctx,args)=>{
        const {text} = await Titleagent.generateText(ctx,{
            userId:args.userId
        },{
            prompt:`
            Website Title: ${args.title}
            First Message: ${args.firstMessage}`
        });
        return text
    }
})