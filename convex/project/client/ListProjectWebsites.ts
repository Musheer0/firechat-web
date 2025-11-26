import { internal } from "../../_generated/api";
import { Id } from "../../_generated/dataModel";
import { query } from "../../_generated/server";
import { v } from "convex/values";

export default query({
      args: { 
        project_id:v.id("project")
           
       },
     handler:async(ctx,args)=>{
           const auth = await ctx.auth.getUserIdentity();
        if(!auth){
           return null;
        }
      const project = await ctx.db.get(args.project_id);
      if(!project) return [];
     if(project.user_id!==auth.subject) return [];
     const websites:{
    _id: Id<"website">;
    _creationTime: number;
    rag_entry_id?: string | undefined;
    name: string;
    url: string;
    description: string;
    faviconUrl: string;
    ogBannerUrl: string;
    user_id: string;
}[] = []
     for (const website of project.websites){
       const wb = await ctx.runQuery(internal.website.server.QueryUserWebsiteInternal.default,{
        website_id:website
       });
       websites.push(wb)
     }
     return websites
     }
})