import { ConvexError, v } from "convex/values";
import { internalMutation } from "../../_generated/server";

export default internalMutation({
    args:{
        websites:v.array(v.id("website")),
        entry_ids:v.array(v.string()),
        project_id:v.id("project")
    },
    handler:async(ctx,args)=>{
      const auth = await ctx.auth.getUserIdentity();
      if(!auth) throw new ConvexError("Un authorized");
      const project = await ctx.db.get(args.project_id);
      if(!project) throw new ConvexError("Not found project")
     if(project.user_id!==auth.subject) throw  new ConvexError("Un authorized");
      const updated_websites = []
      const updated_entry_ids = project.entry_ids
      for (const website of project.websites){
           if(args.websites.includes(website)) 
            continue
          updated_websites.push(website)
          updated_entry_ids.filter((e,i)=>i!==project.websites.indexOf(website))
      }
      await ctx.db.patch(args.project_id,{
        websites:updated_websites,
        entry_ids:updated_entry_ids
      });
      return {success:true}
    }
})