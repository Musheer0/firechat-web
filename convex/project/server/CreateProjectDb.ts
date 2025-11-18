import { internalMutation } from "../../_generated/server";
import { ConvexError, v } from "convex/values";

export default internalMutation({
    args:{
      name:v.string(),
    threadId:v.string(),
    websites:v.array(v.id("website")),
     initial_prompt:v.string() // title and description of all websites

    },
    handler:async(ctx,args)=>{
           const auth = await ctx.auth.getUserIdentity();
                if(!auth) throw new  ConvexError("Un authorized");
            const project_id = await ctx.db.insert("project",{
                ...args,
                entry_ids:[],
                user_id:auth.subject
            });
            return project_id
    }
})